import Log from 'knight-log'
import { PgTransaction } from 'knight-pg-transaction'
import { MisfitsError } from 'knight-validation'
import { GameType as StatsGameType, HoldableType as StatsHoldableType, MatchReportEvent, MatchStartedEvent, MedalType as StatsMedalType, ModType, PlayerConnectEvent, PlayerDeathEvent, PlayerDisconnectEvent, PlayerKillEvent, PlayerMedalEvent, PlayerStatsEvent, PlayerSwitchTeamEvent, PowerUpType as StatsPowerUpType, RoundOverEvent, TeamType as StatsTeamType, WeaponType as StatsWeaponType } from 'ql-stats-model'
import { GameType } from '../domain/enums/GameType'
import { HoldableType } from '../domain/enums/HoldableType'
import { MedalType } from '../domain/enums/MedalType'
import { PowerUpType } from '../domain/enums/PowerUpType'
import { ReasonType } from '../domain/enums/ReasonType'
import { TeamType } from '../domain/enums/TeamType'
import { WeaponType } from '../domain/enums/WeaponType'
import { FactoryLogic } from '../domain/factory/FactoryLogic'
import { Frag, FragParticipant } from '../domain/frag/Frag'
import { FragLogic } from '../domain/frag/FragLogic'
import { MapLogic } from '../domain/map/MapLogic'
import { Cvars } from '../domain/match/Cvars'
import { Match } from '../domain/match/Match'
import { MatchLogic } from '../domain/match/MatchLogic'
import { MatchParticipation } from '../domain/matchParticipation/MatchParticipation'
import { MatchParticipationLogic } from '../domain/matchParticipation/MatchParticipationLogic'
import { Medal } from '../domain/medal/Medal'
import { MedalLogic } from '../domain/medal/MedalLogic'
import { Player } from '../domain/player/Player'
import { PlayerLogic } from '../domain/player/PlayerLogic'
import { RoundLogic } from '../domain/round/RoundLogic'
import { ServerLogic } from '../domain/server/ServerLogic'
import { ServerVisit } from '../domain/serverVisit/ServerVisit'
import { ServerVisitLogic } from '../domain/serverVisit/ServerVisitLogic'
import { StatsLogic } from '../domain/stats/StatsLogic'

let log = new Log('QlStatsIntegrator.ts')

export class QlStatsIntegrator {

  factoryLogic!: FactoryLogic
  fragLogic!: FragLogic
  mapLogic!: MapLogic
  matchLogic!: MatchLogic
  matchParticipationLogic!: MatchParticipationLogic
  medalLogic!: MedalLogic
  playerLogic!: PlayerLogic
  roundLogic!: RoundLogic
  serverLogic!: ServerLogic
  serverVisitLogic!: ServerVisitLogic
  statsLogic!: StatsLogic

  async integrate(serverIp: string, serverPort: number, event: MatchReportEvent | MatchStartedEvent | PlayerConnectEvent | PlayerDeathEvent | PlayerDisconnectEvent | PlayerKillEvent | PlayerMedalEvent | PlayerStatsEvent | PlayerSwitchTeamEvent | RoundOverEvent, tx: PgTransaction, eventEmitDate: Date = utc()) {
    let l = log.mt('integrate')
    l.param('serverIp', serverIp)
    l.param('serverPort', serverPort)
    l.param('event', event)

    let serverResult = await this.serverLogic.createOrGet(serverIp, serverPort, eventEmitDate, tx)

    if (serverResult.isMisfits()) {
      throw new MisfitsError(serverResult.misfits)
    }

    let server = serverResult.entity

    /********************************************/
    /*               PLAYER_CONNECT             */
    /********************************************/
    if (event instanceof PlayerConnectEvent) {
      l.dev('Processing PlayerConnectEvent...')

      // at first we either create or get the player while also updating its name and
      // setting its first seen date if not present
      let player = await this.createOrGetPlayer(event.steamId, event.name, eventEmitDate, tx)

      // since the player is freshly connecting to the server, all other server visits
      // that are still active must be thus inactive
      let activeServerVisitsResult = await this.serverVisitLogic.read({ active: true, playerId: player.id }, tx)
  
      for (let serverVisit of activeServerVisitsResult.entities) {
        l.dev('Inactivating sever visit...', serverVisit)

        l.dev('Determining disconnect date by looking for the latest of frag, medal or match participation...')

        // FIND LAST FRAG, MEDAL OR MATCHPARTICIPATION AND USE THE LATEST DATE

        serverVisit.active = false
        let result = await this.serverVisitLogic.update(serverVisit, tx)
        l.dev('Result of update', result)
  
        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }  
  
      // when the player connects we know that it cannot be participating in any matches
      // right now, thus we can inactivate any active match participtions.
      let activeMatchParticipationsResult = await this.matchParticipationLogic.read({ active: true, playerId: player.id }, tx)

      for (let matchParticipation of activeMatchParticipationsResult.entities) {
        l.dev('Inactivating match participation...', matchParticipation)
        
        matchParticipation.active = false
        let result = await this.matchParticipationLogic.update(matchParticipation, tx)
        l.dev('Result of update', result)
  
        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }
  
      // when the player connects we get to know the match guid of the active match.
      // we can inactivate any active matches on the same server that have a different
      // match guid.
      let activeMatchesResult = await this.matchLogic.read({ active: true, serverId: server.id }, tx)
  
      for (let match of activeMatchesResult.entities) {
        if (match.guid != event.matchGuid) {
          l.dev('Inactivating match...', match)

          match.active = false
          let result = await this.matchLogic.update(match, tx)
          l.dev('Result of update...', result)
  
          if (result.isMisfits()) {
            throw new MisfitsError(result.misfits)
          }

          // TODO: INACTIVATE corresponding match participations and rounds
        }
      }
  
      // when the player connects we get to know the match guid of the active match.
      // we can now check if the active match is present. if it is not and the active
      // match is not warmup we can create it now.
      if (! event.warmup) {
        await this.createMissingMatch(server.id!, event.matchGuid, event.time, eventEmitDate, tx)
      }

      // create a new server visit which correctly starts with a player connect event
      let serverVisit = new ServerVisit

      serverVisit.playerId = player.id
      serverVisit.serverId = server.id
      serverVisit.active = true
      serverVisit.connectDate = eventEmitDate

      l.dev('Creating server visit...', serverVisit)
      let result = await this.serverVisitLogic.create(serverVisit, tx)
      l.dev('Result of creating', result)

      if (result.isMisfits()) {
        throw new MisfitsError(result.misfits)
      }
    }

    /********************************************/
    /*             PLAYER_DISCONNECT            */
    /********************************************/
    else if (event instanceof PlayerDisconnectEvent) {
      l.dev('Processing PlayerDisconnectEvent...')

      // at first we either create or get the player while also updating its name and
      // setting its first seen date if not present
      let player = await this.createOrGetPlayer(event.steamId, event.name, eventEmitDate, tx)

      // since we know the current match guid, we can check if there is any match marked as
      // active and associated to this server but with a different match guid
      let activeMatchesResult = await this.matchLogic.read({ active: true, serverId: server.id }, tx)
  
      for (let match of activeMatchesResult.entities) {
        if (match.guid != event.matchGuid) {
          l.dev('Inactivating match...', match)

          match.active = false
          let result = await this.matchLogic.update(match, tx)
          l.dev('Result of update', result)
  
          if (result.isMisfits()) {
            throw new MisfitsError(result.misfits)
          }

          // TODO: inactivate match participations and rounds
        }
      }
      
      // since we know that the player now disconnected, we can inactivate any active match
      // participations of that player on any server
      let activeMatchParticipationsResult = await this.matchParticipationLogic.read({ active: true, playerId: player.id }, tx)

      for (let matchParticipation of activeMatchParticipationsResult.entities) {
        l.dev('Inactivating match participation...', matchParticipation)
        
        matchParticipation.active = false
        let result = await this.matchParticipationLogic.update(matchParticipation, tx)
        l.dev('Result of update', result)
  
        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }

      // in the disconnect event we get to know the active match and thus we can check if this
      // match is warmup and if it is not warmup we can create it if it is missing.
      if (! event.warmup) {
        await this.createMissingMatch(server.id!, event.matchGuid, event.time, eventEmitDate, tx)
      }

      // then, with a good fault tolerance, we determine the last active server visit
      let activeServerVisitResult = await this.serverVisitLogic.getActive(server.id!, player.id!, tx)
      let activeServerVisit = activeServerVisitResult.entity

      // if we processed the correct server visit we can set all others that are still being
      // active to inactive
      let activeServerVisitsResult = await this.serverVisitLogic.read({
        id: { operator: '!=', value: activeServerVisit ? activeServerVisit.id : null },
        active: true,
        playerId: player.id
      }, tx)
  
      for (let serverVisit of activeServerVisitsResult.entities) {
        l.dev('Inactivating server visit...', serverVisit)

        serverVisit.active = false

        let result = await this.serverVisitLogic.update(serverVisit, tx)
        l.dev('Result of update', result)
  
        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }

      if (activeServerVisit) {
        // if there is an active server visit we can update it with the disconnect date
        // and set it to inactive

        activeServerVisit.active = false
        activeServerVisit.disconnectDate = eventEmitDate

        l.dev('Updating corresponding server visit...', activeServerVisit)
        let result = await this.serverVisitLogic.update(activeServerVisit, tx)
        l.dev('Result of update', result)

        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }
      else {
        // if there is no active server visit then we missed any opportunity to create one before
        // in that case we create one now and do what we can

        let serverVisit = new ServerVisit

        serverVisit.playerId = player.id
        serverVisit.serverId = server.id
        serverVisit.active = false
        serverVisit.connectDate = eventEmitDate
        serverVisit.disconnectDate = eventEmitDate

        l.dev('No corresponding active server visit. Creating new one...', serverVisit)
        let result = await this.serverVisitLogic.create(serverVisit, tx)
        l.dev('Result of create', result)

        if (result.isMisfits()) {
          throw new MisfitsError(result.misfits)
        }
      }
    }

    /********************************************/
    /*               MATCH_STARTED              */
    /********************************************/
    else if (event instanceof MatchStartedEvent) {
      l.dev('Processing MatchStartedEvent...')

      // update server title if its different
      if (server.title != event.serverTitle) {
        l.dev(`Server title stored in the database (${server.title}) is different than the current one (${event.serverTitle}). Updating...`)
        server.title = event.serverTitle
        let serverUpdateResult = await this.serverLogic.update(server, tx)
        l.var('serverUpdateResult', serverUpdateResult)
        
        if (serverUpdateResult.isMisfits()) {
          throw new MisfitsError(serverUpdateResult.misfits)
        }
      }

      // create or get the factory while simultaneously updating the factory title 
      let factoryResult = await this.factoryLogic.createOrGet(event.factory, event.factoryTitle, mapGameType(event.gameType), tx)

      if (factoryResult.isMisfits()) {
        throw new MisfitsError(factoryResult.misfits)
      }

      // create or get the map
      let mapResult = await this.mapLogic.createOrGet(event.map, tx)

      if (mapResult.isMisfits()) {
        throw new MisfitsError(mapResult.misfits)
      }

      let factory = factoryResult.entity
      let map = mapResult.entity

      l.dev('factory', factory)
      l.dev('map', map)

      // set any active match on the same server to inactive
      let activeMatchesResult = await this.matchLogic.read({ serverId: server.id, active: true }, tx)

      for (let activeMatch of activeMatchesResult.entities) {
        activeMatch.active = false

        let matchUpdateResult = await this.matchLogic.update(activeMatch, tx)

        if (matchUpdateResult.isMisfits()) {
          throw new MisfitsError(matchUpdateResult.misfits)
        }
      }

      // set any active match participation on the same server to inactive
      let activeMatchParticipationsResult = await this.matchParticipationLogic.read({ serverId: server.id, active: true }, tx)

      for (let activeMatchParticipation of activeMatchParticipationsResult.entities) {
        activeMatchParticipation.active = false

        let matchParticipationUpdateResult = await this.matchParticipationLogic.update(activeMatchParticipation, tx)

        if (matchParticipationUpdateResult.isMisfits()) {
          throw new MisfitsError(matchParticipationUpdateResult.misfits)
        }
      }

      // create the match
      let match = new Match

      match.active = true
      match.cvars = new Cvars
      match.factoryId = factory.id
      match.mapId = map.id
      match.serverId = server.id
      match.startDate = eventEmitDate

      match.cvars.capturelimit = event.captureLimit
      match.cvars.fraglimit = event.fragLimit
      match.cvars.g_instagib = event.instagib
      match.guid = event.matchGuid
      match.cvars.mercylimit = event.mercyLimit
      match.cvars.g_quadHog = event.quadHog
      match.cvars.roundlimit = event.roundLimit
      match.cvars.scorelimit = event.scoreLimit
      match.cvars.timelimit = event.timeLimit
      match.cvars.g_training = event.training

      l.dev('Creating match...', match)

      let matchCreateResult = await this.matchLogic.create(match, tx)
      l.var('matchResult', matchCreateResult)

      if (matchCreateResult.isMisfits()) {
        throw new MisfitsError(matchCreateResult.misfits)
      }
      
      let id = matchCreateResult.entity.id

      l.dev('Creating match participations...')
      for (let eventPlayer of event.players) {
        let playerResult = await this.playerLogic.createOrGet(eventPlayer.steamId, eventPlayer.name, eventEmitDate, tx)

        if (playerResult.isMisfits()) {
          throw new MisfitsError(playerResult.misfits)
        }

        let player = playerResult.entity

        // inactivate any server visit on other servers
        let activeServerVisitsResult = await this.serverVisitLogic.read({ serverId: { operator: '!=', value: server.id }, active: true }, tx)

        for (let activeServerVisit of activeServerVisitsResult.entities) {
          activeServerVisit.active = false

          let serverVisitUpdateResult = await this.serverVisitLogic.update(activeServerVisit, tx)

          if (serverVisitUpdateResult.isMisfits()) {
            throw new MisfitsError(serverVisitUpdateResult.misfits)
          }
        }

        // inactivate any match participation on other servers
        let activeMatchParticipationsResult = await this.matchParticipationLogic.read({ serverId: { operator: '!=', value: server.id }, active: true }, tx)

        for (let activeMatchParticipation of activeMatchParticipationsResult.entities) {
          activeMatchParticipation.active = false

          let matchParticipationUpdateResult = await this.matchParticipationLogic.update(activeMatchParticipation, tx)

          if (matchParticipationUpdateResult.isMisfits()) {
            throw new MisfitsError(matchParticipationUpdateResult.misfits)
          }
        }

        let activeServerVisitResult = await this.serverVisitLogic.getActive(server.id!, player.id!, tx)

        if (activeServerVisitResult.entity == undefined) {
          l.dev('There is no server visit for that player. Creating one...')
          let serverVisit = new ServerVisit
          serverVisit.connectDate = eventEmitDate
          serverVisit.active = true
          serverVisit.playerId = player.id
          serverVisit.serverId = server.id

          let serverVisitCreateResult = await this.serverVisitLogic.create(serverVisit, tx)
          l.var('serverVisitCreateResult', serverVisitCreateResult)

          if (serverVisitCreateResult.isMisfits()) {
            throw new MisfitsError(serverVisitCreateResult.misfits)
          }
        }
        
        let matchParticipation = new MatchParticipation
        matchParticipation.matchId = id
        matchParticipation.playerId = player.id
        matchParticipation.serverId = server.id
        matchParticipation.active = true
        matchParticipation.startDate = eventEmitDate
        matchParticipation.team = mapTeamType(eventPlayer.team)

        l.dev('Creating match participation...', matchParticipation)
        let matchParticipationResult = await this.matchParticipationLogic.create(matchParticipation, tx)
        l.dev('matchParticipationResult', matchParticipationResult)

        if (matchParticipationResult.isMisfits()) {
          throw new MisfitsError(matchParticipationResult.misfits)
        }
      }
    }

    /********************************************/
    /*               MATCH_REPORT               */
    /********************************************/
    else if (event instanceof MatchReportEvent) {
      l.dev('Processing MatchReportEvent...')
      
      let matchResult = await this.matchLogic.createOrGet(event.matchGuid, event.gameLength, eventEmitDate, tx)
      let match = matchResult.entity

      let factoryResult = await this.factoryLogic.createOrGet(event.factory, event.factoryTitle, mapGameType(event.gameType), tx)
      let mapResult = await this.mapLogic.createOrGet(event.map, tx)

      let factory = factoryResult.entity
      let map = mapResult.entity

      let finishDate = utc(match.startDate)
      finishDate.setSeconds(finishDate.getSeconds() + event.gameLength)

      match.cvars = new Cvars
      match.finishDate = finishDate
      match.factoryId = factory.id
      match.mapId = map.id
      match.serverId = server.id
      server.title = event.serverTitle

      match.aborted = event.aborted
      match.cvars.capturelimit = event.captureLimit
      match.exitMessage = event.exitMsg
      match.cvars.fraglimit = event.fragLimit
      match.length = event.gameLength
      match.cvars.g_instagib = event.instagib
      match.lastLeadChangeTime = event.lastLeadChangeTime
      match.guid = event.matchGuid
      match.cvars.mercylimit = event.mercyLimit
      match.cvars.g_quadHog = event.quadHog
      match.restarted = event.restarted
      match.cvars.roundlimit = event.roundLimit
      match.cvars.scorelimit = event.scoreLimit
      match.cvars.timelimit = event.timeLimit
      match.cvars.g_training = event.training
      match.score1 = event.teamScore0
      match.score2 = event.teamScore1

      await this.serverLogic.update(server, tx)
      await this.matchLogic.update(match, tx)
    }

    /********************************************/
    /*               PLAYER_KILL                */
    /********************************************/
    else if (event instanceof PlayerKillEvent) {
      let warmup = event.warmup
      let match

      if (! warmup) {
        let matchesResult = await this.matchLogic.read({ guid: event.matchGuid }, tx)
        match = matchesResult.entities.length == 1 ? matchesResult.entities[0] : undefined
      }

      if (match || warmup) {
        let killerResult = await this.playerLogic.createOrGet(event.killer.steamId, event.killer.name, eventEmitDate, tx)
        let victimResult = await this.playerLogic.createOrGet(event.victim.steamId, event.victim.name, eventEmitDate, tx)

        let killer = killerResult.entity
        let victim = victimResult.entity
  
        let frag = new Frag
  
        frag.date = eventEmitDate
        frag.killer = new FragParticipant
        frag.killer.playerId = killer.id
        frag.matchId = match ? match.id : null
        frag.victim = new FragParticipant
        frag.victim.playerId = victim.id
        frag.serverId = server.id
  
        frag.otherTeamAlive = event.otherTeamAlive
        frag.otherTeamDead = event.otherTeamDead
        frag.suicide = event.suicide
        // event.teamKill
        frag.teamAlive = event.teamAlive
        frag.teamDead = event.teamDead
        frag.time = event.time
        frag.warmup = warmup
  
        frag.killer.airborne = event.killer.airborne
        frag.killer.ammo = event.killer.ammo
        frag.killer.armor = event.killer.armor
        frag.killer.bot = event.killer.bot
        frag.killer.botSkill = event.killer.botSkill
        frag.killer.health = event.killer.health
        frag.killer.holdable = event.killer.holdable ? mapHoldableType(event.killer.holdable) : null
        frag.killer.position = {
          x: event.killer.position.x,
          y: event.killer.position.y,
          z: event.killer.position.z
        }
        frag.killer.powerUps = event.killer.powerUps ? mapPowerUpType(event.killer.powerUps) : null
        frag.killer.speed = event.killer.speed
        // event.killer.submerged
        frag.killer.team = mapTeamType(event.killer.team)
        frag.killer.view = {
          x: event.killer.view.x,
          y: event.killer.view.y,
          z: event.killer.view.z
        }
        frag.killer.weapon = mapWeaponType(event.killer.weapon)
  
        frag.victim.airborne = event.victim.airborne
        frag.victim.ammo = event.victim.ammo
        frag.victim.armor = event.victim.armor
        frag.victim.bot = event.victim.bot
        frag.victim.botSkill = event.victim.botSkill
        frag.victim.health = event.victim.health
        frag.victim.holdable = event.victim.holdable ? mapHoldableType(event.victim.holdable) : null
        frag.victim.position = {
          x: event.victim.position.x,
          y: event.victim.position.y,
          z: event.victim.position.z
        }
        frag.victim.powerUps = event.victim.powerUps ? mapPowerUpType(event.victim.powerUps) : null
        frag.victim.speed = event.victim.speed
        // event.victim.submerged
        frag.victim.team = mapTeamType(event.victim.team)
        frag.victim.view = {
          x: event.victim.view.x,
          y: event.victim.view.y,
          z: event.victim.view.z
        }
        frag.victim.weapon = mapWeaponType(event.victim.weapon)
  
        await this.fragLogic.create(frag, tx)
      }
    }

    /********************************************/
    /*               PLAYER_DEATH               */
    /********************************************/
    else if (event instanceof PlayerDeathEvent) {
      /**
       * Only handle death events that were not caused by another player because those are already
       * handled in the PlayerKillEvent section
       */
      if (event.killer == null) {
        let warump = event.warmup
        let matchesResult = await this.matchLogic.read({ guid: event.matchGuid }, tx)
        let match = matchesResult.entities.length == 1 ? matchesResult.entities[0] : undefined
  
        if (match || warump) {
          let victimResult = await this.playerLogic.createOrGet(event.victim.steamId, event.victim.name, eventEmitDate, tx)
          let victim = victimResult.entity

          let frag = new Frag
  
          frag.date = eventEmitDate
          frag.killer = new FragParticipant
          frag.matchId = match ? match.id : null
          frag.victim = new FragParticipant
          frag.victim.playerId = victim.id
          frag.serverId = server.id
  
          frag.reason = mapModType(event.mod)
          frag.otherTeamAlive = event.otherTeamAlive
          frag.otherTeamDead = event.otherTeamDead
          frag.suicide = event.suicide
          // event.teamKill
          frag.teamAlive = event.teamAlive
          frag.teamDead = event.teamDead
          frag.time = event.time
          frag.warmup = event.warmup

          frag.victim.airborne = event.victim.airborne
          frag.victim.ammo = event.victim.ammo
          frag.victim.armor = event.victim.armor
          frag.victim.bot = event.victim.bot
          frag.victim.botSkill = event.victim.botSkill
          frag.victim.health = event.victim.health
          frag.victim.holdable = event.victim.holdable ? mapHoldableType(event.victim.holdable) : null
          frag.victim.position = {
            x: event.victim.position.x,
            y: event.victim.position.y,
            z: event.victim.position.z
          }
          frag.victim.powerUps = event.victim.powerUps ? mapPowerUpType(event.victim.powerUps) : null
          frag.victim.speed = event.victim.speed
          // event.victim.submerged
          frag.victim.team = mapTeamType(event.victim.team)
          frag.victim.view = {
            x: event.victim.view.x,
            y: event.victim.view.y,
            z: event.victim.view.z
          }
          frag.victim.weapon = mapWeaponType(event.victim.weapon)
  
          await this.fragLogic.create(frag, tx)  
        }
      }
    }

    /********************************************/
    /*               PLAYER_MEDAL               */
    /********************************************/
    else if (event instanceof PlayerMedalEvent) {
      l.dev('Processing PlayerMedalEvent...')

      // at first we either create or get the player while also updating its name and
      // setting its first seen date if not present
      let player = await this.createOrGetPlayer(event.steamId, event.name, eventEmitDate, tx)

      /* Fix any inconsistencies which will occur when we missed events */

      let activeServerVisitResult = await this.serverVisitLogic.getActive(server.id!, player.id!, tx)
      let activeServerVisit = activeServerVisitResult.entity

      if (activeServerVisit == undefined) {
        l.dev('Did not found any active server visit. Creating one...')
        let serverVisit = new ServerVisit

        serverVisit.playerId = player.id
        serverVisit.serverId = server.id
        serverVisit.active = true
        serverVisit.connectDate = eventEmitDate
  
        await this.serverVisitLogic.create(serverVisit, tx)
      }
      else {
        l.dev('Found active server visit', activeServerVisit)
      }

      // we can inactivate any server visit on all other servers since we know for sure
      // that the player is on this server
      let activeServerVisitsOnOtherServersResult = await this.serverVisitLogic.read({ serverId: { operator: '!=', value: server.id }, playerId: player.id }, tx)

      for (let activeServerVisit of activeServerVisitsOnOtherServersResult.entities) {
        activeServerVisit.active = false
        let serverVisitUpdateResult = await this.serverVisitLogic.update(activeServerVisit, tx)

        if (serverVisitUpdateResult.isMisfits()) {
          throw new MisfitsError(serverVisitUpdateResult.misfits)
        }
      }

      // if we are not in warmup, create or get the match
      let match
      if (! event.warmup) {
        match = await this.createMissingMatch(server.id!, event.matchGuid, event.time, eventEmitDate, tx)
      }

      // find all active matches on the server and inactivate them if they are not the current active match
      let activeMatchesResult = await this.matchLogic.read({ serverId: server.id, active: true }, tx)

      for (let activeMatch of activeMatchesResult.entities) {
        if (activeMatch.guid != event.matchGuid) {
          l.dev('Inactivating match', activeMatch)

          activeMatch.active = false
          let matchUpdateResult = await this.matchLogic.update(activeMatch, tx)

          if (matchUpdateResult.isMisfits()) {
            throw new MisfitsError(matchUpdateResult.misfits)
          }
        }
        else {
          l.dev('Not inactivating match', activeMatch)
        }
      }

      // if we have a match then we can try to get the corresponding match participation for the player
      let matchParticipation
      if (match) {
        let matchParticipationsResult = await this.matchParticipationLogic.read({ matchId: match.id }, tx)

        if (matchParticipationsResult.entities.length == 0) {
          matchParticipation = new MatchParticipation
          matchParticipation.active = true
          matchParticipation.matchId = match.id
          matchParticipation.playerId = player.id
          matchParticipation.serverId = server.id
          // we cannot know the start date thus we just take the date of the medal itself
          matchParticipation.startDate = eventEmitDate

          let matchParticipationCreateResult = await this.matchParticipationLogic.create(matchParticipation, tx)

          if (matchParticipationCreateResult.isMisfits()) {
            throw new MisfitsError(matchParticipationCreateResult.misfits)
          }

          matchParticipation = matchParticipationCreateResult.entity
        }
        else {
          matchParticipation = matchParticipationsResult.entities[0]
        }
      }

      // inactivate any match participation on this server which does not reference the current match
      let activeMatchParticipationsResult = await this.matchParticipationLogic.read({
        serverId: server.id,
        active: true,
        match: {
          '@filterGlobally': true,
          guid: { operator: '!=', value: event.matchGuid }
        }
      }, tx)

      l.var('activeMatchParticipationsResult', activeMatchParticipationsResult)

      for (let activeMatchParticipation of activeMatchParticipationsResult.entities) {
        activeMatchParticipation.active = false
        let matchParticipationUpdateResult = await this.matchParticipationLogic.update(activeMatchParticipation, tx)

        if (matchParticipationUpdateResult.isMisfits()) {
          throw new MisfitsError(matchParticipationUpdateResult.misfits)
        }
      }

      // inactivate any match participation of that player on any other servers
      let activeMatchParticipationsOnOtherServersResult = await this.matchParticipationLogic.read({
        serverId: { operator: '!=', value: server.id },
        playerId: player.id,
        active: true
      }, tx)

      for (let activeMatchParticipation of activeMatchParticipationsOnOtherServersResult.entities) {
        activeMatchParticipation.active = false
        let matchParticipationUpdateResult = await this.matchParticipationLogic.update(activeMatchParticipation, tx)

        if (matchParticipationUpdateResult.isMisfits()) {
          throw new MisfitsError(matchParticipationUpdateResult.misfits)
        }
      }

      let medal = new Medal

      medal.matchId = match ? match.id : null
      medal.matchParticipationId = matchParticipation ? matchParticipation.id : null
      medal.playerId = player.id
      medal.serverId = server.id

      medal.date = eventEmitDate
      medal.medal = mapMedalType(event.medal)
      medal.warmup = event.warmup

      await this.medalLogic.create(medal, tx)
    }

    /********************************************/
    /*               PLAYER_STATS               */
    /********************************************/
    else if (event instanceof PlayerStatsEvent) {
      // let warmup = event.warmup
      // let matchesResult = await this.matchLogic.read({ guid: event.matchGuid }, tx)
      // let match = matchesResult.entities.length == 1 ? matchesResult.entities[0] : undefined
      // let matchParticipation = await this.matchParticipationLogic.getActiveMatchParticipation(event.steamId, event.matchGuid)

      // if (match && matchParticipation || warmup) {
      //   let playerResult = await this.playerLogic.createOrGet(event.steamId, event.name, eventEmitDate, tx)
      //   let player = playerResult.entity

      //   let stats = new Stats

      //   stats.matchId = match ? match.id : null
      //   stats.matchParticipationId = matchParticipation ? matchParticipation.id : null
      //   stats.playerId = player.id
      //   stats.serverId = server.id
  
      //   stats.aborted = event.aborted
      //   stats.blueFlagPickups = event.blueFlagPickups
      //   stats.deaths = event.deaths
      //   stats.holyShits = event.holyShits
      //   stats.kills = event.kills
      //   // event.lose
      //   stats.maxStreak = event.maxStreak
      //   // event.model
      //   stats.neutralFlagPickups = event.neutralFlagPickups
      //   stats.playTime = event.playTime
      //   // event.quit
      //   stats.rank = event.rank
      //   stats.redFlagPickups = event.redFlagPickups
      //   stats.score = event.score
      //   // event.team
      //   stats.teamJoinTime = event.teamJoinTime
      //   stats.teamRank = event.teamRank
      //   stats.tiedRank = event.tiedRank
      //   stats.tiedTeamRank = event.tiedTeamRank
      //   stats.warmup = event.warmup
      //   // event.win
      //   stats.damageDealt = event.damage.dealt
      //   stats.damageTaken = event.damage.taken
        
      //   stats.medals = {
      //     accuracy: event.medals.accuracy,
      //     assists: event.medals.assists,
      //     captures: event.medals.captures,
      //     comboKill: event.medals.comboKill,
      //     defends: event.medals.defends,
      //     excellent: event.medals.excellent,
      //     firstFrag: event.medals.firstFrag,
      //     headshot: event.medals.headshot,
      //     humiliation: event.medals.humiliation,
      //     impressive: event.medals.impressive,
      //     midair: event.medals.midair,
      //     perfect: event.medals.perfect,
      //     perforated: event.medals.perforated,
      //     quadGod: event.medals.quadGod,
      //     rampage: event.medals.rampage,
      //     revenge: event.medals.revenge
      //   }

      //   stats.pickups = {
      //     ammo: event.pickups.ammo,
      //     armor: event.pickups.armor,
      //     armorRegeneration: event.pickups.armorRegeneration,
      //     battleSuit: event.pickups.battleSuit,
      //     doubler: event.pickups.doubler,
      //     flight: event.pickups.flight,
      //     greenArmor: event.pickups.greenArmor,
      //     guard: event.pickups.guard,
      //     haste: event.pickups.haste,
      //     health: event.pickups.health,
      //     invisibility: event.pickups.invisibility,
      //     invulnerability: event.pickups.invulnerability,
      //     kamikaze: event.pickups.kamikaze,
      //     medkit: event.pickups.medkit,
      //     megaHealth: event.pickups.megaHealth,
      //     otherHoldable: event.pickups.otherHoldable,
      //     otherPowerUp: event.pickups.otherPowerUp,
      //     portal: event.pickups.portal,
      //     quadDamage: event.pickups.quadDamage,
      //     redArmor: event.pickups.redArmor,
      //     regeneration: event.pickups.regeneration,
      //     scout: event.pickups.scout,
      //     teleporter: event.pickups.teleporter,
      //     yellowArmor: event.pickups.yellowArmor,
      //   }

      //   stats.bfg = {
      //     deaths: event.weapons.bfg.deaths,
      //     damageGiven: event.weapons.bfg.damageGiven,
      //     damageReceived: event.weapons.bfg.damageReceived,
      //     hits: event.weapons.bfg.hits,
      //     kills: event.weapons.bfg.kills,
      //     p: event.weapons.bfg.p,
      //     shots: event.weapons.bfg.shots,
      //     t: event.weapons.bfg.t
      //   }

      //   stats.chainGun = {
      //     deaths: event.weapons.chainGun.deaths,
      //     damageGiven: event.weapons.chainGun.damageGiven,
      //     damageReceived: event.weapons.chainGun.damageReceived,
      //     hits: event.weapons.chainGun.hits,
      //     kills: event.weapons.chainGun.kills,
      //     p: event.weapons.chainGun.p,
      //     shots: event.weapons.chainGun.shots,
      //     t: event.weapons.chainGun.t
      //   }

      //   stats.gauntlet = {
      //     deaths: event.weapons.gauntlet.deaths,
      //     damageGiven: event.weapons.gauntlet.damageGiven,
      //     damageReceived: event.weapons.gauntlet.damageReceived,
      //     hits: event.weapons.gauntlet.hits,
      //     kills: event.weapons.gauntlet.kills,
      //     p: event.weapons.gauntlet.p,
      //     shots: event.weapons.gauntlet.shots,
      //     t: event.weapons.gauntlet.t
      //   }

      //   stats.grenadeLauncher = {
      //     deaths: event.weapons.grenadeLauncher.deaths,
      //     damageGiven: event.weapons.grenadeLauncher.damageGiven,
      //     damageReceived: event.weapons.grenadeLauncher.damageReceived,
      //     hits: event.weapons.grenadeLauncher.hits,
      //     kills: event.weapons.grenadeLauncher.kills,
      //     p: event.weapons.grenadeLauncher.p,
      //     shots: event.weapons.grenadeLauncher.shots,
      //     t: event.weapons.grenadeLauncher.t
      //   }

      //   stats.heavyMachineGun = {
      //     deaths: event.weapons.heavyMachineGun.deaths,
      //     damageGiven: event.weapons.heavyMachineGun.damageGiven,
      //     damageReceived: event.weapons.heavyMachineGun.damageReceived,
      //     hits: event.weapons.heavyMachineGun.hits,
      //     kills: event.weapons.heavyMachineGun.kills,
      //     p: event.weapons.heavyMachineGun.p,
      //     shots: event.weapons.heavyMachineGun.shots,
      //     t: event.weapons.heavyMachineGun.t
      //   }

      //   stats.lightningGun = {
      //     deaths: event.weapons.lightningGun.deaths,
      //     damageGiven: event.weapons.lightningGun.damageGiven,
      //     damageReceived: event.weapons.lightningGun.damageReceived,
      //     hits: event.weapons.lightningGun.hits,
      //     kills: event.weapons.lightningGun.kills,
      //     p: event.weapons.lightningGun.p,
      //     shots: event.weapons.lightningGun.shots,
      //     t: event.weapons.lightningGun.t
      //   }

      //   stats.machineGun = {
      //     deaths: event.weapons.machineGun.deaths,
      //     damageGiven: event.weapons.machineGun.damageGiven,
      //     damageReceived: event.weapons.machineGun.damageReceived,
      //     hits: event.weapons.machineGun.hits,
      //     kills: event.weapons.machineGun.kills,
      //     p: event.weapons.machineGun.p,
      //     shots: event.weapons.machineGun.shots,
      //     t: event.weapons.machineGun.t
      //   }

      //   stats.nailGun = {
      //     deaths: event.weapons.nailGun.deaths,
      //     damageGiven: event.weapons.nailGun.damageGiven,
      //     damageReceived: event.weapons.nailGun.damageReceived,
      //     hits: event.weapons.nailGun.hits,
      //     kills: event.weapons.nailGun.kills,
      //     p: event.weapons.nailGun.p,
      //     shots: event.weapons.nailGun.shots,
      //     t: event.weapons.nailGun.t
      //   }

      //   stats.otherWeapon = {
      //     deaths: event.weapons.otherWeapon.deaths,
      //     damageGiven: event.weapons.otherWeapon.damageGiven,
      //     damageReceived: event.weapons.otherWeapon.damageReceived,
      //     hits: event.weapons.otherWeapon.hits,
      //     kills: event.weapons.otherWeapon.kills,
      //     p: event.weapons.otherWeapon.p,
      //     shots: event.weapons.otherWeapon.shots,
      //     t: event.weapons.otherWeapon.t
      //   }

      //   stats.plasmaGun = {
      //     deaths: event.weapons.plasmaGun.deaths,
      //     damageGiven: event.weapons.plasmaGun.damageGiven,
      //     damageReceived: event.weapons.plasmaGun.damageReceived,
      //     hits: event.weapons.plasmaGun.hits,
      //     kills: event.weapons.plasmaGun.kills,
      //     p: event.weapons.plasmaGun.p,
      //     shots: event.weapons.plasmaGun.shots,
      //     t: event.weapons.plasmaGun.t
      //   }

      //   stats.proximityLauncher = {
      //     deaths: event.weapons.proximityLauncher.deaths,
      //     damageGiven: event.weapons.proximityLauncher.damageGiven,
      //     damageReceived: event.weapons.proximityLauncher.damageReceived,
      //     hits: event.weapons.proximityLauncher.hits,
      //     kills: event.weapons.proximityLauncher.kills,
      //     p: event.weapons.proximityLauncher.p,
      //     shots: event.weapons.proximityLauncher.shots,
      //     t: event.weapons.proximityLauncher.t
      //   }

      //   stats.railgun = {
      //     deaths: event.weapons.railgun.deaths,
      //     damageGiven: event.weapons.railgun.damageGiven,
      //     damageReceived: event.weapons.railgun.damageReceived,
      //     hits: event.weapons.railgun.hits,
      //     kills: event.weapons.railgun.kills,
      //     p: event.weapons.railgun.p,
      //     shots: event.weapons.railgun.shots,
      //     t: event.weapons.railgun.t
      //   }

      //   stats.rocketLauncher = {
      //     deaths: event.weapons.rocketLauncher.deaths,
      //     damageGiven: event.weapons.rocketLauncher.damageGiven,
      //     damageReceived: event.weapons.rocketLauncher.damageReceived,
      //     hits: event.weapons.rocketLauncher.hits,
      //     kills: event.weapons.rocketLauncher.kills,
      //     p: event.weapons.rocketLauncher.p,
      //     shots: event.weapons.rocketLauncher.shots,
      //     t: event.weapons.rocketLauncher.t
      //   }

      //   stats.shotgun = {
      //     deaths: event.weapons.shotgun.deaths,
      //     damageGiven: event.weapons.shotgun.damageGiven,
      //     damageReceived: event.weapons.shotgun.damageReceived,
      //     hits: event.weapons.shotgun.hits,
      //     kills: event.weapons.shotgun.kills,
      //     p: event.weapons.shotgun.p,
      //     shots: event.weapons.shotgun.shots,
      //     t: event.weapons.shotgun.t
      //   }

      //   if (matchParticipation) {
      //     let finishDate = utc(matchParticipation.startDate)
      //     finishDate.setSeconds(finishDate.getSeconds() + event.playTime)
  
      //     matchParticipation.finishDate = finishDate
      //     await this.matchParticipationLogic.update(matchParticipation, tx)
      //   }

      //   await this.statsLogic.create(stats, tx)
      // }
    }

    /********************************************/
    /*            PLAYER_SWITCH_TEAM            */
    /********************************************/
    else if (event instanceof PlayerSwitchTeamEvent) {
      // if (event.newTeam != StatsTeamType.SPECTATOR) {
      //   let match = await this.getMatch(event.matchGuid)

      //   if (match) {
      //     let playerResult = await this.playerLogic.createOrGet(event.steamId, event.name, eventEmitDate, tx)
      //     let player = playerResult.entity

      //     let matchParticipation = new MatchParticipation
      //     matchParticipation.matchId = match.id
      //     matchParticipation.playerId = player.id
      //     matchParticipation.serverId = server.id
      //     matchParticipation.startDate = now
          
      //     await this.matchParticipationLogic.create(matchParticipation, tx)
      //   }
      // }
    }

    /********************************************/
    /*               ROUND_OVER                 */
    /********************************************/
    else if (event instanceof RoundOverEvent) {
      // let match = await this.getMatch(event.matchGuid)

      // if (match) {
      //   let medals = await this.getMedalsWithMissingRound(event.matchGuid)
      //   let frags = await this.getFragsWithMissingRound(event.matchGuid)
      //   let stats = await this.getStatsWithMissingRound(event.matchGuid)
  
      //   let round = new Round
  
      //   round.matchId = match.id
      //   round.serverId = server.id
  
      //   round.round = event.round
      //   round.teamWon = mapTeamType(event.teamWon)
      //   round.time = event.time
      //   // event.warmup
  
      //   let roundId = await this.roundLogic.create(round, tx)
  
      //   for (let frag of frags) {
      //     frag.roundId = roundId
      //     await this.fragLogic.update(frag, tx)
      //   }
  
      //   for (let medal of medals) {
      //     medal.roundId = roundId
      //     await this.medalLogic.update(medal, tx)
      //   }
  
      //   for (let stat of stats) {
      //     stat.roundId = roundId
      //     await this.statsLogic.update(stat, tx)
      //   }  
      // }
    }
  }

  async createOrGetPlayer(steamId: string, name: string, eventEmitDate: Date, tx: PgTransaction): Promise<Player> {
    let l = log.mt('createOrGetPlayer')
    l.param('steamId', steamId)
    l.param('name', name)
    l.param('eventEmitDate', eventEmitDate)

    let playerResult = await this.playerLogic.createOrGet(steamId, name, eventEmitDate, tx)
    l.var('playerResult', playerResult)
      
    if (playerResult.isMisfits()) {
      throw new MisfitsError(playerResult.misfits)
    }

    let player = playerResult.entity
    
    if (playerResult.created) {
      l.returning('Returning newly created player...', player)
    }
    else {
      l.returning('Returning existing player...', player)
    }

    return player
  }

  async createMissingMatch(serverId: number, matchGuid: string, time: number, eventEmitDate: Date, tx: PgTransaction): Promise<Match> {
    let l = log.mt('createMissingMatch')
    l.param('serverId', serverId)
    l.param('matchGuid', matchGuid)
    l.param('time', time)
    l.param('eventEmitDate', eventEmitDate)

    let matchesResult = await this.matchLogic.read({ guid: matchGuid }, tx)

    if (matchesResult.entities.length == 0) {
      l.dev('Creating match...')

      let match = new Match

      match.active = true
      match.guid = matchGuid
      match.startDate = new Date(new Date(eventEmitDate).setSeconds(eventEmitDate.getSeconds() - time))
      match.serverId = serverId

      let result = await this.matchLogic.create(match, tx)

      if (result.isMisfits()) {
        throw new MisfitsError(result.misfits)
      }

      l.returning('Returning match...', result.entity)
      return result.entity
    }

    l.returning('Returning existing match...', matchesResult.entities[0])
    return matchesResult.entities[0]
  }
}


function utc(date: Date = new Date): Date {
  let utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
  return new Date(utc)
}

export function mapGameType(statsGameType: StatsGameType): GameType {
  switch (statsGameType) {
    case StatsGameType.AD: return GameType.AttackAndDefense
    case StatsGameType.CA: return GameType.ClanArena
    case StatsGameType.CTF: return GameType.CaptureTheFlag
    case StatsGameType.DOM: return GameType.Domination
    case StatsGameType.DUEL: return GameType.Duel
    case StatsGameType.FFA: return GameType.FreeForAll
    case StatsGameType.FT: return GameType.FreezeTag
    case StatsGameType.HAR: return GameType.Harvester
    case StatsGameType.ONEFLAG: return GameType.OneFlagCtf
    case StatsGameType.RACE: return GameType.Race
    case StatsGameType.RR: return GameType.RedRover
    case StatsGameType.TDM: return GameType.TeamDeathmatch
  }
}

export function mapHoldableType(statsHoldableType: StatsHoldableType): HoldableType {
  switch (statsHoldableType) {
    case StatsHoldableType.KAMIKAZE: return HoldableType.Kamikaze
    case StatsHoldableType.MEDKIT: return HoldableType.Medkit
    case StatsHoldableType.OTHER_HOLDABLE: return HoldableType.OtherHoldable
    case StatsHoldableType.PORTAL: return HoldableType.Portal
    case StatsHoldableType.SCOUT: return HoldableType.Scout
    case StatsHoldableType.TELEPORTER: return HoldableType.Teleporter
  }
}

export function mapMedalType(statsMedalType: StatsMedalType): MedalType {
  switch (statsMedalType) {
    case StatsMedalType.ACCURACY: return MedalType.Accuracy
    case StatsMedalType.ASSISTS: return MedalType.Assists
    case StatsMedalType.CAPTURES: return MedalType.Captures
    case StatsMedalType.COMBOKILL: return MedalType.ComboKill
    case StatsMedalType.DEFENDS: return MedalType.Defends
    case StatsMedalType.EXCELLENT: return MedalType.Excellent
    case StatsMedalType.FIRSTFRAG: return MedalType.FirstFrag
    case StatsMedalType.HEADSHOT: return MedalType.Headshot
    case StatsMedalType.HUMILIATION: return MedalType.Humiliation
    case StatsMedalType.IMPRESSIVE: return MedalType.Impressive
    case StatsMedalType.MIDAIR: return MedalType.Midair
    case StatsMedalType.PERFECT: return MedalType.Perfect
    case StatsMedalType.PERFORATED: return MedalType.Perforated
    case StatsMedalType.QUADGOD: return MedalType.QuadGod
    case StatsMedalType.RAMPAGE: return MedalType.Rampage
    case StatsMedalType.REVENGE: return MedalType.Revenge
  }
}

export function mapPowerUpType(statsPowerUps: StatsPowerUpType[]): PowerUpType[] {
  let powerUps: PowerUpType[] = []

  for (let statsPowerUp of statsPowerUps) {
    switch (statsPowerUp) {
      case StatsPowerUpType.ARMOR_REGEN: powerUps.push(PowerUpType.ArmorRegeneration); break
      case StatsPowerUpType.BATTLESUIT: powerUps.push(PowerUpType.BattleSuit); break
      case StatsPowerUpType.DOUBLER: powerUps.push(PowerUpType.Doubler); break
      case StatsPowerUpType.FLIGHT: powerUps.push(PowerUpType.Flight); break
      case StatsPowerUpType.GUARD: powerUps.push(PowerUpType.Guard); break
      case StatsPowerUpType.HASTE: powerUps.push(PowerUpType.Haste); break
      case StatsPowerUpType.INVIS: powerUps.push(PowerUpType.Invisibility); break
      case StatsPowerUpType.INVULNERABILITY: powerUps.push(PowerUpType.Invulnerability); break
      case StatsPowerUpType.OTHER_POWERUP: powerUps.push(PowerUpType.OtherPowerup); break
      case StatsPowerUpType.QUAD: powerUps.push(PowerUpType.QuadDamage); break
      case StatsPowerUpType.REGEN: powerUps.push(PowerUpType.Regeneration); break
    }  
  }

  return powerUps
}

export function mapModType(modType: ModType): ReasonType {
  switch (modType) {
    case ModType.LAVA: return ReasonType.Lava
    case ModType.LIGHTNING: return ReasonType.Lightning
    case ModType.PLASMA: return ReasonType.Plasma
    case ModType.ROCKET: return ReasonType.Rocket
    case ModType.ROCKET_SPLASH: return ReasonType.RocketSplash
    case ModType.SLIME: return ReasonType.Slime
    case ModType.SWITCHTEAM: return ReasonType.SwitchTeam
  }
}

export function mapTeamType(statsTeamType: StatsTeamType): TeamType {
  switch (statsTeamType) {
    case StatsTeamType.BLUE: return TeamType.Blue
    case StatsTeamType.FREE: return TeamType.Free
    case StatsTeamType.RED: return TeamType.Red
    case StatsTeamType.SPECTATOR: return TeamType.Spectator
  }
}

export function mapWeaponType(statsWeaponType: StatsWeaponType): WeaponType {
  switch (statsWeaponType) {
    case StatsWeaponType.BFG: return WeaponType.Bfg
    case StatsWeaponType.CHAINGUN: return WeaponType.ChainGun
    case StatsWeaponType.GAUNTLET: return WeaponType.Gauntlet
    case StatsWeaponType.GRENADE: return WeaponType.GrenadeLauncher
    case StatsWeaponType.HMG: return WeaponType.HeavyMachineGun
    case StatsWeaponType.LIGHTNING: return WeaponType.LightningGun
    case StatsWeaponType.MACHINEGUN: return WeaponType.MachineGun
    case StatsWeaponType.NAILGUN: return WeaponType.Nailgun
    case StatsWeaponType.OTHER_WEAPON: return WeaponType.OtherWeapon
    case StatsWeaponType.PLASMA: return WeaponType.PlasmaGun
    case StatsWeaponType.PROXMINE: return WeaponType.ProximityLauncher
    case StatsWeaponType.RAILGUN: return WeaponType.Railgun
    case StatsWeaponType.ROCKET: return WeaponType.RocketLauncher
    case StatsWeaponType.SHOTGUN: return WeaponType.Shotgun
  }
}