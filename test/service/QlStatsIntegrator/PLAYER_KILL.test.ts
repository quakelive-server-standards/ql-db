import { expect } from 'chai'
import 'mocha'
import { MatchStartedEvent, PlayerConnectEvent, PlayerMedalEvent } from 'ql-stats-model'
import { MedalType } from '../../../src/domain/enums/MedalType'
import { ReasonType } from '../../../src/domain/enums/ReasonType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { WeaponType } from '../../../src/domain/enums/WeaponType'
import Services from '../../../src/Services'
import { tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_KILL', function() {
    describe('Server', function() {

    })

    describe('Player', function() {

    })

    describe('ServerVisit', function() {

    })

    describe('Match', function() {

    })

    describe('MatchParticipation', function() {

    })

    describe('Frag', function() {
      
    })

    it('should create a new frag', async function() {
      let qlConnectEvent1 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date1 = new Date
      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event1, tx(), date1)

      let qlConnectEvent2 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "goromir",
           "STEAM_ID" : "76561198145690430",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date2 = new Date
      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)

      let qlMatchStartedEvent = {
        "DATA": {
          "CAPTURE_LIMIT": 8,
          "FACTORY": "duel",
          "FACTORY_TITLE": "Duel",
          "FRAG_LIMIT": 0,
          "GAME_TYPE": "DUEL",
          "INFECTED": 0,
          "INSTAGIB": 0,
          "MAP": "toxicity",
          "MATCH_GUID": "66fe025a-63ff-4852-96bd-9102411e9fb0",
          "MERCY_LIMIT": 0,
          "PLAYERS": [
            {
              "NAME": "Play_ua",
              "STEAM_ID": "76561198157458366",
              "TEAM": 0
            },
            {
              "NAME": "goromir",
              "STEAM_ID": "76561198145690430",
              "TEAM": 0
            }
          ],
          "QUADHOG": 0,
          "ROUND_LIMIT": 10,
          "SCORE_LIMIT": 150,
          "SERVER_TITLE": ".de #topdog.io Ranked Duel #4",
          "TIME_LIMIT": 10,
          "TRAINING": 0
        },
        "TYPE": "MATCH_STARTED"
      }

      let date3 = new Date
      let event3 = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event3, tx(), date3)

      let qlPlayerKillEvent = {
        "DATA" : {
          "KILLER" : {
             "AIRBORNE" : false,
             "AMMO" : 0,
             "ARMOR" : 0,
             "BOT" : false,
             "BOT_SKILL" : null,
             "HEALTH" : 0,
             "HOLDABLE" : null,
             "NAME" : "Play_ua",
             "POSITION" : {
                "X" : 314.9967346191406,
                "Y" : 427.2147827148438,
                "Z" : 264.2636413574219
             },
             "POWERUPS" : null,
             "SPEED" : 0,
             "STEAM_ID" : "76561198157458366",
             "SUBMERGED" : false,
             "TEAM" : 0,
             "VIEW" : {
                "X" : 20.01708984375,
                "Y" : -23.70849609375,
                "Z" : 0
             },
             "WEAPON" : "ROCKET"
          },
          "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
          "MOD" : "ROCKET_SPLASH",
          "OTHER_TEAM_ALIVE" : null,
          "OTHER_TEAM_DEAD" : null,
          "ROUND" : null,
          "SUICIDE" : true,
          "TEAMKILL" : false,
          "TEAM_ALIVE" : null,
          "TEAM_DEAD" : null,
          "TIME" : 108,
          "VICTIM" : {
             "AIRBORNE" : false,
             "AMMO" : 23,
             "ARMOR" : 0,
             "BOT" : false,
             "BOT_SKILL" : null,
             "HEALTH" : 100,
             "HOLDABLE" : null,
             "NAME" : "goromir",
             "POSITION" : {
                "X" : 314.9967346191406,
                "Y" : 427.2147827148438,
                "Z" : 264.2636413574219
             },
             "POWERUPS" : null,
             "SPEED" : 0,
             "STEAM_ID" : "76561198145690430",
             "STREAK" : 0,
             "SUBMERGED" : false,
             "TEAM" : 0,
             "VIEW" : {
                "X" : 20.01708984375,
                "Y" : -23.70849609375,
                "Z" : 0
             },
             "WEAPON" : "ROCKET"
          },
          "WARMUP" : false
        },
        "TYPE" : "PLAYER_KILL"
      }
  
      let date4 = new Date
      let event4 = PlayerMedalEvent.fromQl(qlPlayerKillEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event4, tx(), date4)

      let fragsResult = await Services.get().fragLogic.read({}, tx())
      let killersResult = await Services.get().playerLogic.read({ steamId: '76561198157458366' }, tx())
      let killer = killersResult.entities[0]
      let killerMatchParticipationsResult = await Services.get().matchParticipationLogic.read({ playerId: killer.id }, tx())
      let killerMatchParticipation = killerMatchParticipationsResult.entities[0]
      let victimsResult = await Services.get().playerLogic.read({ steamId: '76561198145690430' }, tx())
      let victim = victimsResult.entities[0]
      let victimMatchParticipationsResult = await Services.get().matchParticipationLogic.read({ playerId: victim.id }, tx())
      let victimMatchParticipation = victimMatchParticipationsResult.entities[0]

      expect(fragsResult.entities.length).to.equal(1)
      expect(fragsResult.entities[0].date).to.deep.equal(date4)
      expect(fragsResult.entities[0].killer.airborne).to.equal(false)
      expect(fragsResult.entities[0].killer.ammo).to.equal(0)
      expect(fragsResult.entities[0].killer.armor).to.equal(0)
      expect(fragsResult.entities[0].killer.bot).to.equal(false)
      expect(fragsResult.entities[0].killer.botSkill).to.be.null
      expect(fragsResult.entities[0].killer.health).to.equal(0)
      expect(fragsResult.entities[0].killer.holdable).to.be.null
      expect(fragsResult.entities[0].killer.matchParticipationId).to.equal(killerMatchParticipation.id)
      expect(fragsResult.entities[0].killer.playerId).to.equal(killer.id)
      expect(fragsResult.entities[0].killer.position).to.be.not.null
      expect(fragsResult.entities[0].killer.position.x).to.equal(314.9967346191406)
      expect(fragsResult.entities[0].killer.position.y).to.equal(427.2147827148438)
      expect(fragsResult.entities[0].killer.position.z).to.equal(264.2636413574219)
      expect(fragsResult.entities[0].killer.powerUps).to.be.null
      expect(fragsResult.entities[0].killer.speed).to.equal(0)
      expect(fragsResult.entities[0].killer.team).to.equal(TeamType.Free)
      expect(fragsResult.entities[0].killer.view).to.be.not.null
      expect(fragsResult.entities[0].killer.view.x).to.equal(20.01708984375)
      expect(fragsResult.entities[0].killer.view.y).to.equal(-23.70849609375)
      expect(fragsResult.entities[0].killer.view.z).to.equal(0)
      expect(fragsResult.entities[0].killer.weapon).to.equal(WeaponType.RocketLauncher)
      expect(fragsResult.entities[0].matchId).to.equal(1)
      expect(fragsResult.entities[0].otherTeamAlive).to.be.null
      expect(fragsResult.entities[0].otherTeamDead).to.be.null
      expect(fragsResult.entities[0].reason).to.equal(ReasonType.RocketSplash)
      expect(fragsResult.entities[0].roundId).to.be.null
      expect(fragsResult.entities[0].serverId).to.equal(1)
      expect(fragsResult.entities[0].suicide).to.equal(true)
      expect(fragsResult.entities[0].teamAlive).to.be.null
      expect(fragsResult.entities[0].teamDead).to.be.null
      expect(fragsResult.entities[0].time).to.equal(108)
      expect(fragsResult.entities[0].victim).to.be.not.null
      expect(fragsResult.entities[0].victim.airborne).to.equal(false)
      expect(fragsResult.entities[0].victim.ammo).to.equal(23)
      expect(fragsResult.entities[0].victim.armor).to.equal(0)
      expect(fragsResult.entities[0].victim.bot).to.equal(false)
      expect(fragsResult.entities[0].victim.botSkill).to.be.null
      expect(fragsResult.entities[0].victim.health).to.equal(100)
      expect(fragsResult.entities[0].victim.holdable).to.be.null
      expect(fragsResult.entities[0].victim.matchParticipationId).to.equal(victimMatchParticipation.id)
      expect(fragsResult.entities[0].victim.playerId).to.equal(victim.id)
      expect(fragsResult.entities[0].victim.position).to.be.not.null
      expect(fragsResult.entities[0].victim.position.x).to.equal(314.9967346191406)
      expect(fragsResult.entities[0].victim.position.y).to.equal(427.2147827148438)
      expect(fragsResult.entities[0].victim.position.z).to.equal(264.2636413574219)
      expect(fragsResult.entities[0].victim.powerUps).to.be.null
      expect(fragsResult.entities[0].victim.speed).to.equal(0)
      expect(fragsResult.entities[0].victim.team).to.equal(TeamType.Free)
      expect(fragsResult.entities[0].victim.view).to.equal(false)
      expect(fragsResult.entities[0].victim.view.x).to.equal(20.01708984375)
      expect(fragsResult.entities[0].victim.view.y).to.equal(-23.70849609375)
      expect(fragsResult.entities[0].victim.view.z).to.equal(0)
      expect(fragsResult.entities[0].victim.weapon).to.equal(WeaponType.RocketLauncher)
      expect(fragsResult.entities[0].warmup).to.equal(false)
    })

    it('should create a new medal for warmup', async function() {
      let qlConnectEvent1 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date1 = new Date
      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event1, tx(), date1)

      let qlConnectEvent2 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "goromir",
           "STEAM_ID" : "76561198145690430",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date2 = new Date
      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)

      let qlPlayerMedalEvent = {
        "DATA" : {
           "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
           "MEDAL" : "FIRSTFRAG",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 23,
           "TOTAL" : 1,
           "WARMUP" : false
        },
        "TYPE" : "PLAYER_MEDAL"
      }
  
      let date3 = new Date
      let event3 = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event3, tx(), date3)

      let medalsResult = await Services.get().medalLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({ steamId: '76561198157458366' }, tx())
      let player = playersResult.entities[0]

      expect(medalsResult.entities.length).to.equal(1)
      expect(medalsResult.entities[0].date).to.deep.equal(date3)
      expect(medalsResult.entities[0].matchId).to.equal(1)
      expect(medalsResult.entities[0].matchParticipationId).to.be.null
      expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
      expect(medalsResult.entities[0].playerId).to.equal(player.id)
      expect(medalsResult.entities[0].roundId).to.be.null
      expect(medalsResult.entities[0].serverId).to.equal(1)
      expect(medalsResult.entities[0].warmup).to.equal(true)

      let matchesResult = await Services.get().matchLogic.count({}, tx())
      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())

      expect(matchesResult.count).to.equal(0)
      expect(matchParticipationsResult.count).to.equal(0)
    })

    it('should create a new medal with a new server, a new player, a new server visit, a new match and a new match participation', async function() {
      let qlPlayerMedalEvent = {
        "DATA" : {
           "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
           "MEDAL" : "FIRSTFRAG",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 23,
           "TOTAL" : 1,
           "WARMUP" : false
        },
        "TYPE" : "PLAYER_MEDAL"
      }
  
      let date = new Date
      let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

      let serversResult = await Services.get().serverLogic.read({}, tx())

      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].firstSeen).to.deep.equal(date)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
      expect(serversResult.entities[0].title).to.be.null

      let playersResult = await Services.get().playerLogic.read({}, tx())

      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].model).to.be.null
      expect(playersResult.entities[0].name).to.equal('Play_ua')
      expect(playersResult.entities[0].steamId).to.equal('76561198157458366')

      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())

      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].active).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)

      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].aborted).to.be.null
      expect(matchesResult.entities[0].cvars).to.be.not.null
      expect(matchesResult.entities[0].cvars.capturelimit).to.be.null
      expect(matchesResult.entities[0].cvars.fraglimit).to.be.null
      expect(matchesResult.entities[0].cvars.g_instagib).to.be.null
      expect(matchesResult.entities[0].cvars.g_quadHog).to.be.null
      expect(matchesResult.entities[0].cvars.g_training).to.be.null
      expect(matchesResult.entities[0].cvars.mercylimit).to.be.null
      expect(matchesResult.entities[0].cvars.roundlimit).to.be.null
      expect(matchesResult.entities[0].cvars.scorelimit).to.be.null
      expect(matchesResult.entities[0].cvars.timelimit).to.be.null
      expect(matchesResult.entities[0].exitMessage).to.be.null
      expect(matchesResult.entities[0].factoryId).to.be.null
      expect(matchesResult.entities[0].finishDate).to.be.null
      expect(matchesResult.entities[0].guid).to.equal('66fe025a-63ff-4852-96bd-9102411e9fb0')
      expect(matchesResult.entities[0].lastLeadChangeTime).to.be.null
      expect(matchesResult.entities[0].length).to.be.null
      expect(matchesResult.entities[0].mapId).to.be.null
      expect(matchesResult.entities[0].restarted).to.be.null
      expect(matchesResult.entities[0].score1).to.be.null
      expect(matchesResult.entities[0].score2).to.be.null
      expect(matchesResult.entities[0].serverId).to.be.null
      expect(matchesResult.entities[0].startDate).to.deep.equal(date)

      let matchParticipationsResult = await Services.get().matchParticipationLogic.read({}, tx())
      
      expect(matchParticipationsResult.entities.length).to.equal(1)
      expect(matchParticipationsResult.entities[0].finishDate).to.be.null
      expect(matchParticipationsResult.entities[0].matchId).to.equal(1)
      expect(matchParticipationsResult.entities[0].playerId).to.equal(1)
      expect(matchParticipationsResult.entities[0].roundId).to.be.null
      expect(matchParticipationsResult.entities[0].serverId).to.equal(1)
      expect(matchParticipationsResult.entities[0].startDate).to.be.null
      expect(matchParticipationsResult.entities[0].statsId).to.be.null
      expect(matchParticipationsResult.entities[0].team).to.be.null

      let medalsResult = await Services.get().medalLogic.read({}, tx())

      expect(medalsResult.entities.length).to.equal(1)
      expect(medalsResult.entities[0].date).to.deep.equal(date)
      expect(medalsResult.entities[0].matchId).to.equal(1)
      expect(medalsResult.entities[0].matchParticipationId).to.equal(1)
      expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
      expect(medalsResult.entities[0].playerId).to.equal(1)
      expect(medalsResult.entities[0].roundId).to.be.null
      expect(medalsResult.entities[0].serverId).to.equal(1)
      expect(medalsResult.entities[0].warmup).to.equal(false)
    })

    it('should create a new medal for warmup with a new server, a new player and a new server visit', async function() {
      let qlPlayerMedalEvent = {
        "DATA" : {
           "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
           "MEDAL" : "FIRSTFRAG",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 23,
           "TOTAL" : 1,
           "WARMUP" : false
        },
        "TYPE" : "PLAYER_MEDAL"
      }
  
      let date = new Date
      let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

      let serversResult = await Services.get().serverLogic.read({}, tx())

      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].firstSeen).to.deep.equal(date)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
      expect(serversResult.entities[0].title).to.be.null

      let playersResult = await Services.get().playerLogic.read({}, tx())

      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].model).to.be.null
      expect(playersResult.entities[0].name).to.equal('Play_ua')
      expect(playersResult.entities[0].steamId).to.equal('76561198157458366')

      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())

      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].active).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)

      let matchesResult = await Services.get().matchLogic.count({}, tx())

      expect(matchesResult.count).to.equal(0)

      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())
      
      expect(matchParticipationsResult.count).to.equal(0)

      let medalsResult = await Services.get().medalLogic.read({}, tx())

      expect(medalsResult.entities.length).to.equal(1)
      expect(medalsResult.entities[0].date).to.deep.equal(date)
      expect(medalsResult.entities[0].matchId).to.equal(1)
      expect(medalsResult.entities[0].matchParticipationId).to.equal(1)
      expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
      expect(medalsResult.entities[0].playerId).to.equal(1)
      expect(medalsResult.entities[0].roundId).to.be.null
      expect(medalsResult.entities[0].serverId).to.equal(1)
      expect(medalsResult.entities[0].warmup).to.equal(false)
    })
  })
})