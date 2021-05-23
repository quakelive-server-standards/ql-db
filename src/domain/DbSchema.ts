import { fromJson, toJson } from 'knight-json'
import { Schema } from 'knight-orm'
import instantiator from '../Instantiator'
import Change from './change/Change'
import { Factory } from './factory/Factory'
import { Frag, FragParticipant } from './frag/Frag'
import { Map } from './map/Map'
import { Cvars } from './match/Cvars'
import { Match } from './match/Match'
import { MatchParticipation } from './matchParticipation/MatchParticipation'
import { Medal } from './medal/Medal'
import { Player } from './player/Player'
import { Round } from './round/Round'
import { Server } from './server/Server'
import { ServerVisit } from './serverVisit/ServerVisit'
import { Stats } from './stats/Stats'

export default {
  'change': {
    columns: {
      'version': { property: 'version', id: true },
      'entityname': 'entityName',
      'method': 'method',
      'entity': 'entity'
    },
    rowToInstance: (row: any) => {
      let change = new Change

      change.version = row['version']
      change.entityName = row['entityname']
      change.method = row['method'] != null ? JSON.parse(row['method']) : row['method']

      if (row['entity'] != null) {
        change.entity = fromJson(row['entity'], { instantiator: instantiator })
      }
    
      return change
    },
    instanceToRow: (change: Change) => {
      return {
        version: change.version,
        entityname: change.entityName,
        method: change.method != undefined ? JSON.stringify(change.method) : undefined,
        entity: toJson(change.entity)
      }
    }
  },

  'factory': {
    columns: {
      'id': { property: 'id', id: true},
      'name': 'name',
      'title': 'title',
      'game_type': 'gameType'
    },
    relationships: {
      'matches': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match',
        otherId: 'factory_id'
      }
    },
    rowToInstance: (row: any) => {
      let factory = new Factory

      factory.id = row['id']
      factory.gameType = row['game_type']
      factory.name = row['name']
      factory.title = row['title']

      return factory
    },
    instanceToRow: (factory: Factory) => {
      return {
        'id': factory.id,
        'game_type': factory.gameType,
        'name': factory.name,
        'title': factory.title
      }
    }
  },

  'frag': {
    columns: {
      'id': { property: 'id', id: true},
      'match_id': 'matchId',
      'round_id': 'roundId',
      'server_id': 'serverId',
      'date': 'date',
      'killer_player_id': 'killer.playerId',
      'killer_match_participation_id': 'killer.matchParticipationId',
      'killer_airborne': 'killer.airborne',
      'killer_ammo': 'killer.ammo',
      'killer_armor': 'killer.armor',
      'killer_bot': 'killer.bot',
      'killer_bot_skill': 'killer.botSkill',
      'killer_health': 'killer.health',
      'killer_holdable': 'killer.holdable',
      'killer_power_ups': 'killer.powerUps',
      'killer_position_x': 'killer.position.x',
      'killer_position_y': 'killer.position.y',
      'killer_position_z': 'killer.position.z',
      'killer_speed': 'killer.speed',
      'killer_team': 'killer.team',
      'killer_view_x': 'killer.view.x',
      'killer_view_y': 'killer.view.y',
      'killer_view_z': 'killer.view.z',
      'killer_weapon': 'killer.weapon',
      'other_team_alive': 'otherTeamAlive',
      'other_team_dead': 'otherTeamDead',
      'reason': 'reason',
      'suicide': 'suicide',
      'team_alive': 'teamAlive',
      'team_dead': 'teamDead',
      'time': 'time',
      'victim_player_id': 'victim.playerId',
      'victim_match_participation_id': 'victim.matchParticipationId',
      'victim_airborne': 'victim.airborne',
      'victim_ammo': 'victim.ammo',
      'victim_armor': 'victim.armor',
      'victim_bot': 'victim.bot',
      'victim_bot_skill': 'victim.botSkill',
      'victim_health': 'victim.health',
      'victim_holdable': 'victim.holdable',
      'victim_power_ups': 'victim.powerUps',
      'victim_position_x': 'victim.position.x',
      'victim_position_y': 'victim.position.y',
      'victim_position_z': 'victim.position.z',
      'victim_speed': 'victim.speed',
      'victim_team': 'victim.team',
      'victim_view_x': 'victim.view.x',
      'victim_view_y': 'victim.view.y',
      'victim_view_z': 'victim.view.z',
      'victim_weapon': 'victim.weapon',
      'warmup': 'warmup',
    },
    relationships: {
      'killer.player': {
        manyToOne: true,
        thisId: 'killer_player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'killer.matchParticipation': {
        manyToOne: true,
        thisId: 'killer_match_participation_id',
        otherTable: 'match_participation',
        otherId: 'id'
      },
      'match': {
        manyToOne: true,
        thisId: 'match_id',
        otherTable: 'match',
        otherId: 'id'
      },
      'round': {
        manyToOne: true,
        thisId: 'round_id',
        otherTable: 'round',
        otherId: 'id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      },
      'victim.player': {
        manyToOne: true,
        thisId: 'victim_player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'victim.matchParticipation': {
        manyToOne: true,
        thisId: 'victim_match_participation_id',
        otherTable: 'match_participation',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let frag = new Frag

      frag.id = row['id']
      frag.date = row['date']
      frag.killer = new FragParticipant
      frag.killer.airborne = row['killer_airborne'],
      frag.killer.ammo = row['killer_ammo'],
      frag.killer.armor = row['killer_armor'],
      frag.killer.bot = row['killer_bot'],
      frag.killer.botSkill = row['killer_bot_skill'],
      frag.killer.health = row['killer_health'],
      frag.killer.holdable = row['killer_holdable'],
      frag.killer.matchParticipationId = row['killer_match_participation_id'],
      frag.killer.playerId = row['killer_player_id'],
      frag.killer.position = {
        x: row['killer_position_x'],
        y: row['killer_position_y'],
        z: row['killer_position_z']
      }
      frag.killer.powerUps = row['killer_power_ups'] ? JSON.parse(row['killer_power_ups']) : row['killer_power_ups'],
      frag.killer.speed = row['killer_speed'],
      frag.killer.team = row['killer_team'],
      frag.killer.view = {
        x: row['killer_view_x'],
        y: row['killer_view_y'],
        z: row['killer_view_z']
      }
      frag.killer.weapon = row['killer_weapon']
      frag.matchId = row['match_id']
      frag.otherTeamAlive = row['other_team_alive']
      frag.otherTeamDead = row['other_team_dead']
      frag.reason = row['reason']
      frag.roundId = row['round_id']
      frag.serverId = row['server_id']
      frag.suicide = row['suicide']
      frag.teamAlive = row['team_alive']
      frag.teamDead = row['team_dead']
      frag.time = row['time']
      frag.victim = new FragParticipant
      frag.victim.airborne = row['victim_airborne'],
      frag.victim.ammo = row['victim_ammo'],
      frag.victim.armor = row['victim_armor'],
      frag.victim.bot = row['victim_bot'],
      frag.victim.botSkill = row['victim_bot_skill'],
      frag.victim.health = row['victim_health'],
      frag.victim.holdable = row['victim_holdable'],
      frag.victim.matchParticipationId = row['victim_match_participation_id'],
      frag.victim.playerId = row['victim_player_id'],
      frag.victim.position = {
        x: row['victim_position_x'],
        y: row['victim_position_y'],
        z: row['victim_position_z']
      }
      frag.victim.powerUps = row['victim_power_ups'] ? JSON.parse(row['victim_power_ups']) : row['victim_power_ups'],
      frag.victim.speed = row['victim_speed'],
      frag.victim.team = row['victim_team'],
      frag.victim.view = {
        x: row['victim_view_x'],
        y: row['victim_view_y'],
        z: row['victim_view_z']
      }
      frag.victim.weapon = row['victim_weapon']
      frag.warmup = row['warmup']

      return frag
    },
    instanceToRow: (frag: Frag) => {
      return {
        'id': frag.id,
        'match_id': frag.matchId,
        'round_id': frag.roundId,
        'server_id': frag.serverId,
        'date': frag.date,
        'killer_player_id': frag.killer?.playerId,
        'killer_match_participation_id': frag.killer?.matchParticipationId,
        'killer_airborne': frag.killer?.airborne,
        'killer_ammo': frag.killer?.ammo,
        'killer_armor': frag.killer?.armor,
        'killer_bot': frag.killer?.bot,
        'killer_bot_skill': frag.killer?.botSkill,
        'killer_health': frag.killer?.health,
        'killer_holdable': frag.killer?.holdable,
        'killer_power_ups': frag.killer ? JSON.stringify(frag.killer.powerUps) : null,
        'killer_position_x': frag.killer?.position?.x,
        'killer_position_y': frag.killer?.position?.y,
        'killer_position_z': frag.killer?.position?.z,
        'killer_speed': frag.killer?.speed,
        'killer_team': frag.killer?.team,
        'killer_view_x': frag.killer?.view?.x,
        'killer_view_y': frag.killer?.view?.y,
        'killer_view_z': frag.killer?.view?.z,
        'killer_weapon': frag.killer?.weapon,
        'other_team_alive': frag.otherTeamAlive,
        'other_team_dead': frag.otherTeamDead,
        'reason': frag.reason,
        'suicide': frag.suicide,
        'team_alive': frag.teamAlive,
        'team_dead': frag.teamDead,
        'time': frag.time,
        'victim_player_id': frag.victim?.playerId,
        'victim_match_participation_id': frag.victim?.matchParticipationId,
        'victim_airborne': frag.victim?.airborne,
        'victim_ammo': frag.victim?.ammo,
        'victim_armor': frag.victim?.armor,
        'victim_bot': frag.victim?.bot,
        'victim_bot_skill': frag.victim?.botSkill,
        'victim_health': frag.victim?.health,
        'victim_holdable': frag.victim?.holdable,
        'victim_power_ups': frag.victim ? JSON.stringify(frag.victim.powerUps) : null,
        'victim_position_x': frag.victim?.position?.x,
        'victim_position_y': frag.victim?.position?.y,
        'victim_position_z': frag.victim?.position?.z,
        'victim_speed': frag.victim?.speed,
        'victim_team': frag.victim?.team,
        'victim_view_x': frag.victim?.view?.x,
        'victim_view_y': frag.victim?.view?.y,
        'victim_view_z': frag.victim?.view?.z,
        'victim_weapon': frag.victim?.weapon,
        'warmup': frag.warmup
      }
    }
  },

  'map': {
    columns: {
      'id': { property: 'id', id: true},
      'name': 'name'
    },
    relationships: {
      'matches': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match',
        otherId: 'factory_id'
      }
    },
    rowToInstance: (row: any) => {
      let map = new Map

      map.id = row['id']
      map.name = row['name']

      return map
    },
    instanceToRow: (map: Map) => {
      return {
        'id': map.id,
        'name': map.name
      }
    }
  },

  'match': {
    columns: {
      'id': { property: 'id', id: true},
      'factory_id': 'factoryId',
      'map_id': 'mapId',
      'server_id': 'serverId',
      'aborted': 'aborted',
      'active': 'active',
      'cvar_capturelimit': 'cvars.capturelimit',
      'cvar_fraglimit': 'cvars.fraglimit',
      'cvar_g_instagib': 'cvars.g_instagib',
      'cvar_g_quadhog': 'cvars.g_quadHog',
      'cvar_g_training': 'cvars.g_training',
      'cvar_mercylimit': 'cvars.mercylimit',
      'cvar_roundlimit': 'cvars.roundlimit',
      'cvar_scorelimit': 'cvars.scorelimit',
      'cvar_timelimit': 'cvars.timelimit',
      'exit_message': 'exitMessage',
      'finish_date': 'finishDate',
      'guid': 'guid',
      'last_lead_change_time': 'lastLeadChangeTime',
      'length': 'length',
      'restarted': 'restarted',
      'score1': 'score1',
      'score2': 'score2',
      'start_date': 'startDate'
    },
    relationships: {
      'factory': {
        manyToOne: true,
        thisId: 'factory_id',
        otherTable: 'factory',
        otherId: 'id'
      },
      'frags': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'match_id'
      },
      'map': {
        manyToOne: true,
        thisId: 'map_id',
        otherTable: 'map',
        otherId: 'id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'match_id'
      },
      'participations': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match_participation',
        otherId: 'match_id'
      },
      'rounds': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'round',
        otherId: 'match_id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let match = new Match

      match.id = row['id']
      match.aborted = row['aborted']
      match.active = row['active']
      match.cvars = new Cvars
      match.cvars.capturelimit = row['cvar_capturelimit']
      match.cvars.fraglimit = row['cvar_fraglimit']
      match.cvars.g_instagib = row['cvar_g_instagib']
      match.cvars.g_quadHog = row['cvar_g_quadhog']
      match.cvars.g_training = row['cvar_g_training']
      match.cvars.mercylimit = row['cvar_mercylimit']
      match.cvars.roundlimit = row['cvar_roundlimit']
      match.cvars.scorelimit = row['cvar_scorelimit']
      match.cvars.timelimit = row['cvar_timelimit']
      match.exitMessage = row['exit_message']
      match.factoryId = row['factory_id']
      match.finishDate = row['finish_date']
      match.guid = row['guid']
      match.lastLeadChangeTime = row['last_lead_change_time']
      match.length = row['length']
      match.mapId = row['map_id']
      match.restarted = row['restarted']
      match.score1 = row['score1']
      match.score2 = row['score2']
      match.serverId = row['server_id']
      match.startDate = row['start_date']

      return match
    },
    instanceToRow: (match: Match) => {
      return {
        'id': match.id,
        'aborted': match.aborted,
        'active': match.active,
        'cvar_capturelimit': match.cvars?.capturelimit,
        'cvar_fraglimit': match.cvars?.fraglimit,
        'cvar_g_instagib': match.cvars?.g_instagib,
        'cvar_g_quadhog': match.cvars?.g_quadHog,
        'cvar_g_training': match.cvars?.g_training,
        'cvar_mercylimit': match.cvars?.mercylimit,
        'cvar_roundlimit': match.cvars?.roundlimit,
        'cvar_scorelimit': match.cvars?.scorelimit,
        'cvar_timelimit': match.cvars?.timelimit,
        'exit_message': match.exitMessage,
        'factory_id': match.factoryId,
        'finish_date': match.finishDate,
        'guid': match.guid,
        'last_lead_change_time': match.lastLeadChangeTime,
        'length': match.length,
        'map_id': match.mapId,
        'restarted': match.restarted,
        'score1': match.score1,
        'score2': match.score2,
        'server_id': match.serverId,
        'start_date': match.startDate,
      }
    }
  },

  'match_participation': {
    columns: {
      'id': { property: 'id', id: true},
      'match_id': 'matchId',
      'player_id': 'playerId',
      'round_id': 'roundId',
      'server_id': 'serverId',
      'stats_id': 'statsId',
      'finish_date': 'finishDate',
      'start_date': 'startDate',
      'team': 'team'
    },
    relationships: {
      'deaths': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'victim_match_participation_id'
      },
      'kills': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'killer_match_participation_id'
      },
      'match': {
        manyToOne: true,
        thisId: 'match_id',
        otherTable: 'match',
        otherId: 'id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'match_participation_id'
      },
      'player': {
        manyToOne: true,
        thisId: 'player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'round': {
        manyToOne: true,
        thisId: 'round_id',
        otherTable: 'round',
        otherId: 'id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      },
      'stats': {
        manyToOne: true,
        thisId: 'stats_id',
        otherTable: 'stats',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let matchParticipation = new MatchParticipation

      matchParticipation.id = row['id']
      matchParticipation.active = row['active']
      matchParticipation.finishDate = row['finish_date']
      matchParticipation.matchId = row['match_id']
      matchParticipation.playerId = row['player_id']
      matchParticipation.roundId = row['round_id']
      matchParticipation.serverId = row['server_id']
      matchParticipation.startDate = row['start_date']
      matchParticipation.statsId = row['stats_id']
      matchParticipation.team = row['team']

      return matchParticipation
    },
    instanceToRow: (matchParticipation: MatchParticipation) => {
      return {
        'id': matchParticipation.id,
        'active': matchParticipation.active,
        'finish_date': matchParticipation.finishDate,
        'match_id': matchParticipation.matchId,
        'player_id': matchParticipation.playerId,
        'round_id': matchParticipation.roundId,
        'server_id': matchParticipation.serverId,
        'start_date': matchParticipation.startDate,
        'stats_id': matchParticipation.statsId,
        'team': matchParticipation.team
      }
    }
  },

  'medal': {
    columns: {
      'id': { property: 'id', id: true},
      'match_id': 'matchId',
      'match_participation_id': 'matchParticipationId',
      'player_id': 'playerId',
      'round_id': 'roundId',
      'server_id': 'serverId',
      'date': 'date',
      'medal': 'medal',
      'warmup': 'warmup'
    },
    relationships: {
      'match': {
        manyToOne: true,
        thisId: 'match_id',
        otherTable: 'match',
        otherId: 'id'
      },
      'matchParticipation': {
        manyToOne: true,
        thisId: 'match_participation_id',
        otherTable: 'match_participation',
        otherId: 'id'
      },
      'player': {
        manyToOne: true,
        thisId: 'player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'round': {
        manyToOne: true,
        thisId: 'round_id',
        otherTable: 'round',
        otherId: 'id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let medal = new Medal

      medal.id = row['id']
      medal.date = row['date']
      medal.matchId = row['match_id']
      medal.matchParticipationId = row['match_participation_id']
      medal.medal = row['medal']
      medal.playerId = row['player_id']
      medal.roundId = row['round_id']
      medal.serverId = row['server_id']
      medal.warmup = row['warmup']

      return medal
    },
    instanceToRow: (medal: Medal) => {
      return {
        'id': medal.id,
        'date': medal.date,
        'match_id': medal.matchId,
        'match_participation_id': medal.matchParticipationId,
        'medal': medal.medal,
        'player_id': medal.playerId,
        'round_id': medal.roundId,
        'server_id': medal.serverId,
        'warmup': medal.warmup,
      }
    }
  },

  'player': {
    columns: {
      'id': { property: 'id', id: true},
      'first_seen': 'firstSeen',
      'name': 'name',
      'model': 'model',
      'steam_id': 'steamId'
    },
    relationships: {
      'deaths': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'victim_player_id'
      },
      'kills': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'killer_player_id'
      },
      'matchParticipations': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match_participation',
        otherId: 'player_id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'player_id'
      },
      'serverVisits': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'server_visit',
        otherId: 'player_id'
      }
    },
    rowToInstance: (row: any) => {
      let player = new Player

      player.id = row['id']
      player.firstSeen = row['first_seen']
      player.model = row['model']
      player.name = row['name']
      player.steamId = row['steam_id']

      return player
    },
    instanceToRow: (player: Player) => {
      return {
        'id': player.id,
        'first_seen': player.firstSeen,
        'model': player.model,
        'name': player.name,
        'steam_id': player.steamId
      }
    }
  },

  'round': {
    columns: {
      'id': { property: 'id', id: true},
      'match_id': 'matchId',
      'server_id': 'serverId',
      'finish_date': 'finishDate',
      'round': 'round',
      'team_won': 'teamWon',
      'time': 'time',
      'start_date': 'startDate'
    },
    relationships: {
      'frags': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'round_id'
      },
      'match': {
        manyToOne: true,
        thisId: 'match_id',
        otherTable: 'match',
        otherId: 'id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'round_id'
      },
      'participations': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match_participation',
        otherId: 'round_id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let round = new Round

      round.id = row['id']
      round.finishDate = row['finish_date']
      round.matchId = row['match_id']
      round.round = row['round']
      round.serverId = row['server_id']
      round.startDate = row['start_date']
      round.teamWon = row['team_won']
      round.time = row['time']

      return round
    },
    instanceToRow: (round: Round) => {
      return {
        'id': round.id,
        'finish_date': round.finishDate,
        'match_id': round.matchId,
        'round': round.round,
        'server_id': round.serverId,
        'start_date': round.startDate,
        'team_won': round.teamWon,
        'time': round.time
      }
    }
  },

  'server': {
    columns: {
      'id': { property: 'id', id: true},
      'first_seen': 'firstSeen',
      'ip': 'ip',
      'port': 'port',
      'title': 'title'
    },
    relationships: {
      'frags': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'server_id'
      },
      'matches': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match',
        otherId: 'server_id'
      },
      'matchParticipations': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match_participation',
        otherId: 'server_id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'server_id'
      },
      'rounds': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'round',
        otherId: 'server_id'
      },
      'visits': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'server_visit',
        otherId: 'server_id'
      },
      'stats': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'stats',
        otherId: 'server_id'
      }
    },
    rowToInstance: (row: any) => {
      let server = new Server

      server.id = row['id']
      server.firstSeen = row['first_seen']
      server.ip = row['ip']
      server.port = row['port']
      server.title = row['title']

      return server
    },
    instanceToRow: (server: Server) => {
      return {
        'id': server.id,
        'first_seen': server.firstSeen,
        'ip': server.ip,
        'port': server.port,
        'title': server.title
      }
    }
  },

  'server_visit': {
    columns: {
      'id': { property: 'id', id: true},
      'player_id': 'playerId',
      'server_id': 'serverId',
      'connect_date': 'connectDate',
      'disconnect_date': 'disconnectDate',
      'active': 'active'
    },
    relationships: {
      'player': {
        manyToOne: true,
        thisId: 'player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let serverVisit = new ServerVisit

      serverVisit.id = row['id']
      serverVisit.connectDate = row['connect_date']
      serverVisit.disconnectDate = row['disconnect_date']
      serverVisit.active = row['active']
      serverVisit.playerId = row['player_id']
      serverVisit.serverId = row['server_id']

      return serverVisit
    },
    instanceToRow: (serverVisit: ServerVisit) => {
      return {
        'id': serverVisit.id,
        'connect_date': serverVisit.connectDate,
        'disconnect_date': serverVisit.disconnectDate,
        'active': serverVisit.active,
        'player_id': serverVisit.playerId,
        'server_id': serverVisit.serverId,
      }
    }
  },

  'stats': {
    columns: {
      'id': { property: 'id', id: true},
      'match_id': 'matchId',
      'match_participation_id': 'matchParticipationId',
      'player_id': 'playerId',
      'round_id': 'roundId',
      'server_id': 'serverId',
      'aborted': 'aborted',
      'blue_flag_pickups': 'blueFlagPickups',
      'damage_dealt': 'damageDealt',
      'damage_taken': 'damageTaken',
      'date': 'date',
      'deaths': 'deaths',
      'holy_shits': 'holyShits',
      'kills': 'kills',
      'max_streak': 'maxStreak',
      'medal_accuracy': 'medals.accuracy',
      'medal_assists': 'medals.assists',
      'medal_captures': 'medals.captures',
      'medal_combo_kill': 'medals.comboKill',
      'medal_defends': 'medals.defends',
      'medal_excellent': 'medals.excellent',
      'medal_first_frag': 'medals.firstFrag',
      'medal_headshot': 'medals.headshot',
      'medal_humiliation': 'medals.humiliation',
      'medal_impressive': 'medals.impressive',
      'medal_midair': 'medals.midair',
      'medal_perfect': 'medals.perfect',
      'medal_perforated': 'medals.perforated',
      'medal_quad_god': 'medals.quadGod',
      'medal_rampage': 'medals.rampage',
      'medal_revenge': 'medals.revenge',
      'neutral_flag_pickups': 'neutralFlagPickups',
      'pickup_ammo': 'pickup.ammo',
      'pickup_armor': 'pickup.armor',
      'pickup_armor_regeneration': 'pickup.armorRegeneration',
      'pickup_battle_suit': 'pickup.battleSuit',
      'pickup_doubler': 'pickup.doubler',
      'pickup_flight': 'pickup.flight',
      'pickup_green_armor': 'pickup.greenArmor',
      'pickup_guard': 'pickup.guard',
      'pickup_haste': 'pickup.haste',
      'pickup_health': 'pickup.health',
      'pickup_invisibility': 'pickup.invisibility',
      'pickup_invulnerability': 'pickup.invulnerability',
      'pickup_kamikaze': 'pickup.kamikaze',
      'pickup_medkit': 'pickup.medkit',
      'pickup_mega_health': 'pickup.megaHealth',
      'pickup_other_holdable': 'pickup.otherHoldable',
      'pickup_other_power_up': 'pickup.otherPowerUp',
      'pickup_portal': 'pickup.portal',
      'pickup_quad_damage': 'pickup.quadDamage',
      'pickup_red_armor': 'pickup.redArmor',
      'pickup_regeneration': 'pickup.regeneration',
      'pickup_scout': 'pickup.scout',
      'pickup_teleporter': 'pickup.teleporter',
      'pickup_yellow_armor': 'pickup.yellowArmor',
      'play_time': 'playTime',
      'rank': 'rank',
      'red_flag_pickups': 'redFlagPickups',
      'score': 'score',
      'team_join_time': 'teamJoinTime',
      'team_rank': 'teamRank',
      'tied_rank': 'tiedRank',
      'tied_team_rank': 'tiedTeamRank',
      'warmup': 'warmup',
      'bfg_deaths': 'bfg.deaths',
      'bfg_damage_given': 'bfg.damageGiven',
      'bfg_damage_received': 'bfg.damageReceived',
      'bfg_hits': 'bfg.hits',
      'bfg_kills': 'bfg.kills',
      'bfg_p': 'bfg.p',
      'bfg_shots': 'bfg.shots',
      'bfg_t': 'bfg.t',
      'chain_gun_deaths': 'chainGun.deaths',
      'chain_gun_damage_given': 'chainGun.damageGiven',
      'chain_gun_damage_received': 'chainGun.damageReceived',
      'chain_gun_hits': 'chainGun.hits',
      'chain_gun_kills': 'chainGun.kills',
      'chain_gun_p': 'chainGun.p',
      'chain_gun_shots': 'chainGun.shots',
      'chain_gun_t': 'chainGun.t',
      'gauntlet_deaths': 'gauntlet.deaths',
      'gauntlet_damage_given': 'gauntlet.damageGiven',
      'gauntlet_damage_received': 'gauntlet.damageReceived',
      'gauntlet_hits': 'gauntlet.hits',
      'gauntlet_kills': 'gauntlet.kills',
      'gauntlet_p': 'gauntlet.p',
      'gauntlet_shots': 'gauntlet.shots',
      'gauntlet_t': 'gauntlet.t',
      'grenade_launcher_deaths': 'grenadeLauncher.deaths',
      'grenade_launcher_damage_given': 'grenadeLauncher.damageGiven',
      'grenade_launcher_damage_received': 'grenadeLauncher.damageReceived',
      'grenade_launcher_hits': 'grenadeLauncher.hits',
      'grenade_launcher_kills': 'grenadeLauncher.kills',
      'grenade_launcher_p': 'grenadeLauncher.p',
      'grenade_launcher_shots': 'grenadeLauncher.shots',
      'grenade_launcher_t': 'grenadeLauncher.t',
      'heavy_machine_gun_deaths': 'heavyMachineGun.deaths',
      'heavy_machine_gun_damage_given': 'heavyMachineGun.damageGiven',
      'heavy_machine_gun_damage_received': 'heavyMachineGun.damageReceived',
      'heavy_machine_gun_hits': 'heavyMachineGun.hits',
      'heavy_machine_gun_kills': 'heavyMachineGun.kills',
      'heavy_machine_gun_p': 'heavyMachineGun.p',
      'heavy_machine_gun_shots': 'heavyMachineGun.shots',
      'heavy_machine_gun_t': 'heavyMachineGun.t',
      'lightning_gun_deaths': 'lightningGun.deaths',
      'lightning_gun_damage_given': 'lightningGun.damageGiven',
      'lightning_gun_damage_received': 'lightningGun.damageReceived',
      'lightning_gun_hits': 'lightningGun.hits',
      'lightning_gun_kills': 'lightningGun.kills',
      'lightning_gun_p': 'lightningGun.p',
      'lightning_gun_shots': 'lightningGun.shots',
      'lightning_gun_t': 'lightningGun.t',
      'machine_gun_deaths': 'machineGun.deaths',
      'machine_gun_damage_given': 'machineGun.damageGiven',
      'machine_gun_damage_received': 'machineGun.damageReceived',
      'machine_gun_hits': 'machineGun.hits',
      'machine_gun_kills': 'machineGun.kills',
      'machine_gun_p': 'machineGun.p',
      'machine_gun_shots': 'machineGun.shots',
      'machine_gun_t': 'machineGun.t',
      'nail_gun_deaths': 'nailGun.deaths',
      'nail_gun_damage_given': 'nailGun.damageGiven',
      'nail_gun_damage_received': 'nailGun.damageReceived',
      'nail_gun_hits': 'nailGun.hits',
      'nail_gun_kills': 'nailGun.kills',
      'nail_gun_p': 'nailGun.p',
      'nail_gun_shots': 'nailGun.shots',
      'nail_gun_t': 'nailGun.t',
      'other_weapon_deaths': 'otherWeapon.deaths',
      'other_weapon_damage_given': 'otherWeapon.damageGiven',
      'other_weapon_damage_received': 'otherWeapon.damageReceived',
      'other_weapon_hits': 'otherWeapon.hits',
      'other_weapon_kills': 'otherWeapon.kills',
      'other_weapon_p': 'otherWeapon.p',
      'other_weapon_shots': 'otherWeapon.shots',
      'other_weapon_t': 'otherWeapon.t',
      'plasma_gun_deaths': 'plasmaGun.deaths',
      'plasma_gun_damage_given': 'plasmaGun.damageGiven',
      'plasma_gun_damage_received': 'plasmaGun.damageReceived',
      'plasma_gun_hits': 'plasmaGun.hits',
      'plasma_gun_kills': 'plasmaGun.kills',
      'plasma_gun_p': 'plasmaGun.p',
      'plasma_gun_shots': 'plasmaGun.shots',
      'plasma_gun_t': 'plasmaGun.t',
      'proximity_launcher_deaths': 'proximityLauncher.deaths',
      'proximity_launcher_damage_given': 'proximityLauncher.damageGiven',
      'proximity_launcher_damage_received': 'proximityLauncher.damageReceived',
      'proximity_launcher_hits': 'proximityLauncher.hits',
      'proximity_launcher_kills': 'proximityLauncher.kills',
      'proximity_launcher_p': 'proximityLauncher.p',
      'proximity_launcher_shots': 'proximityLauncher.shots',
      'proximity_launcher_t': 'proximityLauncher.t',
      'railgun_deaths': 'railgun.deaths',
      'railgun_damage_given': 'railgun.damageGiven',
      'railgun_damage_received': 'railgun.damageReceived',
      'railgun_hits': 'railgun.hits',
      'railgun_kills': 'railgun.kills',
      'railgun_p': 'railgun.p',
      'railgun_shots': 'railgun.shots',
      'railgun_t': 'railgun.t',
      'rocket_launcher_deaths': 'rocketLauncher.deaths',
      'rocket_launcher_damage_given': 'rocketLauncher.damageGiven',
      'rocket_launcher_damage_received': 'rocketLauncher.damageReceived',
      'rocket_launcher_hits': 'rocketLauncher.hits',
      'rocket_launcher_kills': 'rocketLauncher.kills',
      'rocket_launcher_p': 'rocketLauncher.p',
      'rocket_launcher_shots': 'rocketLauncher.shots',
      'rocket_launcher_t': 'rocketLauncher.t',
      'shotgun_deaths': 'shotgun.deaths',
      'shotgun_damage_given': 'shotgun.damageGiven',
      'shotgun_damage_received': 'shotgun.damageReceived',
      'shotgun_hits': 'shotgun.hits',
      'shotgun_kills': 'shotgun.kills',
      'shotgun_p': 'shotgun.p',
      'shotgun_shots': 'shotgun.shots',
      'shotgun_t': 'shotgun.t',
    },
    relationships: {
      'match': {
        manyToOne: true,
        thisId: 'match_id',
        otherTable: 'match',
        otherId: 'id'
      },
      'matchParticipation': {
        manyToOne: true,
        thisId: 'match_participation_id',
        otherTable: 'match_participation',
        otherId: 'id'
      },
      'player': {
        manyToOne: true,
        thisId: 'player_id',
        otherTable: 'player',
        otherId: 'id'
      },
      'round': {
        manyToOne: true,
        thisId: 'round_id',
        otherTable: 'round',
        otherId: 'id'
      },
      'server': {
        manyToOne: true,
        thisId: 'server_id',
        otherTable: 'server',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let stats = new Stats

      stats.id = row['id']
      stats.aborted = row['aborted']
      stats.blueFlagPickups = row['blue_flag_pickups']
      stats.damageDealt = row['damage_dealt']
      stats.damageTaken = row['damage_taken']
      stats.date = row['date']
      stats.deaths = row['deaths']
      stats.holyShits = row['holy_shits']
      stats.kills = row['kills']
      stats.matchId = row['match_id']
      stats.matchParticipationId = row['match_participation_id']
      stats.maxStreak = row['max_streak']
      stats.neutralFlagPickups = row['neutral_flag_pickups']
      stats.playTime = row['play_time']
      stats.playerId = row['player_id']
      stats.rank = row['rank']
      stats.redFlagPickups = row['red_flag_pickups']
      stats.roundId = row['round_id']
      stats.score = row['score']
      stats.serverId = row['server_id']
      stats.teamJoinTime = row['team_join_time']
      stats.teamRank = row['team_rank']
      stats.tiedRank = row['tied_rank']
      stats.tiedTeamRank = row['tied_team_rank']
      stats.warmup = row['warmup']
      
      stats.medals =  {
        'accuracy': row['medal_accuracy'],
        'assists': row['medal_assists'],
        'captures': row['medal_captures'],
        'comboKill': row['medal_combo_kill'],
        'defends': row['medal_defends'],
        'excellent': row['medal_excellent'],
        'firstFrag': row['medal_first_frag'],
        'headshot': row['medal_headshot'],
        'humiliation': row['medal_humiliation'],
        'impressive': row['medal_impressive'],
        'midair': row['medal_midair'],
        'perfect': row['medal_perfect'],
        'perforated': row['medal_perforated'],
        'quadGod': row['medal_quad_god'],
        'rampage': row['medal_rampage'],
        'revenge': row['medal_revenge']
      }
      
      stats.pickups = {
        'ammo': row['pickup_ammo'],
        'armor': row['pickup_armor'],
        'armorRegeneration': row['pickup_armor_regeneration'],
        'battleSuit': row['pickup_battle_suit'],
        'doubler': row['pickup_doubler'],
        'flight': row['pickup_flight'],
        'greenArmor': row['pickup_green_armor'],
        'guard': row['pickup_guard'],
        'haste': row['pickup_haste'],
        'health': row['pickup_health'],
        'invisibility': row['pickup_invisibility'],
        'invulnerability': row['pickup_invulnerability'],
        'kamikaze': row['pickup_kamikaze'],
        'medkit': row['pickup_medkit'],
        'megaHealth': row['pickup_mega_health'],
        'otherHoldable': row['pickup_other_holdable'],
        'otherPowerUp': row['pickup_other_power_up'],
        'portal': row['pickup_portal'],
        'quadDamage': row['pickup_quad_damage'],
        'redArmor': row['pickup_red_armor'],
        'regeneration': row['pickup_regeneration'],
        'scout': row['pickup_scout'],
        'teleporter': row['pickup_teleporter'],
        'yellowArmor': row['pickup_yellow_armor']
      }

      stats.bfg = {
        'damageGiven': row['bfg_damage_given'],
        'damageReceived': row['bfg_damage_received'],
        'deaths': row['bfg_deaths'],
        'hits': row['bfg_hits'],
        'kills': row['bfg_kills'],
        'p': row['bfg_p'],
        'shots': row['bfg_shots'],
        't': row['bfg_t']
      }

      stats.chainGun = {
        'damageGiven': row['chain_gun_damage_given'],
        'damageReceived': row['chain_gun_damage_received'],
        'deaths': row['chain_gun_deaths'],
        'hits': row['chain_gun_hits'],
        'kills': row['chain_gun_kills'],
        'p': row['chain_gun_p'],
        'shots': row['chain_gun_shots'],
        't': row['chain_gun_t']
      }

      stats.gauntlet = {
        'damageGiven': row['gauntlet_damage_given'],
        'damageReceived': row['gauntlet_damage_received'],
        'deaths': row['gauntlet_deaths'],
        'hits': row['gauntlet_hits'],
        'kills': row['gauntlet_kills'],
        'p': row['gauntlet_p'],
        'shots': row['gauntlet_shots'],
        't': row['gauntlet_t']
      }

      stats.grenadeLauncher = {
        'damageGiven': row['grenade_launcher_damage_given'],
        'damageReceived': row['grenade_launcher_damage_received'],
        'deaths': row['grenade_launcher_deaths'],
        'hits': row['grenade_launcher_hits'],
        'kills': row['grenade_launcher_kills'],
        'p': row['grenade_launcher_p'],
        'shots': row['grenade_launcher_shots'],
        't': row['grenade_launcher_t']
      }

      stats.heavyMachineGun = {
        'damageGiven': row['heavy_machine_gun_damage_given'],
        'damageReceived': row['heavy_machine_gun_damage_received'],
        'deaths': row['heavy_machine_gun_deaths'],
        'hits': row['heavy_machine_gun_hits'],
        'kills': row['heavy_machine_gun_kills'],
        'p': row['heavy_machine_gun_p'],
        'shots': row['heavy_machine_gun_shots'],
        't': row['heavy_machine_gun_t']
      }

      stats.lightningGun = {
        'damageGiven': row['lightning_gun_damage_given'],
        'damageReceived': row['lightning_gun_damage_received'],
        'deaths': row['lightning_gun_deaths'],
        'hits': row['lightning_gun_hits'],
        'kills': row['lightning_gun_kills'],
        'p': row['lightning_gun_p'],
        'shots': row['lightning_gun_shots'],
        't': row['lightning_gun_t']
      }

      stats.machineGun = {
        'damageGiven': row['machine_gun_damage_given'],
        'damageReceived': row['machine_gun_damage_received'],
        'deaths': row['machine_gun_deaths'],
        'hits': row['machine_gun_hits'],
        'kills': row['machine_gun_kills'],
        'p': row['machine_gun_p'],
        'shots': row['machine_gun_shots'],
        't': row['machine_gun_t']
      }

      stats.nailGun = {
        'damageGiven': row['nail_gun_damage_given'],
        'damageReceived': row['nail_gun_damage_received'],
        'deaths': row['nail_gun_deaths'],
        'hits': row['nail_gun_hits'],
        'kills': row['nail_gun_kills'],
        'p': row['nail_gun_p'],
        'shots': row['nail_gun_shots'],
        't': row['nail_gun_t']
      }

      stats.otherWeapon = {
        'damageGiven': row['other_weapon_damage_given'],
        'damageReceived': row['other_weapon_damage_received'],
        'deaths': row['other_weapon_deaths'],
        'hits': row['other_weapon_hits'],
        'kills': row['other_weapon_kills'],
        'p': row['other_weapon_p'],
        'shots': row['other_weapon_shots'],
        't': row['other_weapon_t']
      }

      stats.plasmaGun = {
        'damageGiven': row['plasma_gun_damage_given'],
        'damageReceived': row['plasma_gun_damage_received'],
        'deaths': row['plasma_gun_deaths'],
        'hits': row['plasma_gun_hits'],
        'kills': row['plasma_gun_kills'],
        'p': row['plasma_gun_p'],
        'shots': row['plasma_gun_shots'],
        't': row['plasma_gun_t']
      }

      stats.proximityLauncher = {
        'damageGiven': row['proximity_launcher_damage_given'],
        'damageReceived': row['proximity_launcher_damage_received'],
        'deaths': row['proximity_launcher_deaths'],
        'hits': row['proximity_launcher_hits'],
        'kills': row['proximity_launcher_kills'],
        'p': row['proximity_launcher_p'],
        'shots': row['proximity_launcher_shots'],
        't': row['proximity_launcher_t']
      }

      stats.railgun = {
        'damageGiven': row['railgun_damage_given'],
        'damageReceived': row['railgun_damage_received'],
        'deaths': row['railgun_deaths'],
        'hits': row['railgun_hits'],
        'kills': row['railgun_kills'],
        'p': row['railgun_p'],
        'shots': row['railgun_shots'],
        't': row['railgun_t']
      }

      stats.rocketLauncher = {
        'damageGiven': row['rocket_launcher_damage_given'],
        'damageReceived': row['rocket_launcher_damage_received'],
        'deaths': row['rocket_launcher_deaths'],
        'hits': row['rocket_launcher_hits'],
        'kills': row['rocket_launcher_kills'],
        'p': row['rocket_launcher_p'],
        'shots': row['rocket_launcher_shots'],
        't': row['rocket_launcher_t']
      }

      stats.shotgun = {
        'damageGiven': row['shotgun_damage_given'],
        'damageReceived': row['shotgun_damage_received'],
        'deaths': row['shotgun_deaths'],
        'hits': row['shotgun_hits'],
        'kills': row['shotgun_kills'],
        'p': row['shotgun_p'],
        'shots': row['shotgun_shots'],
        't': row['shotgun_t']
      }

      return stats
    },
    instanceToRow: (stats: Stats) => {
      return {
        'id': stats.id,
        'aborted': stats.aborted,
        'blue_flag_pickups': stats.blueFlagPickups,
        'damage_dealt': stats.damageDealt,
        'damage_taken': stats.damageTaken,
        'date': stats.date,
        'deaths': stats.deaths,
        'holy_shits': stats.holyShits,
        'kills': stats.kills,
        'match_id': stats.matchId,
        'match_participation_id': stats.matchParticipationId,
        'max_streak': stats.maxStreak,
        'neutral_flag_pickups': stats.neutralFlagPickups,
        'other_weapon': stats.otherWeapon,
        'play_time': stats.playTime,
        'player_id': stats.playerId,
        'rank': stats.rank,
        'red_flag_pickups': stats.redFlagPickups,
        'round_id': stats.roundId,
        'score': stats.score,
        'server_id': stats.serverId,
        'team_join_time': stats.teamJoinTime,
        'team_rank': stats.teamRank,
        'tied_rank': stats.tiedRank,
        'tied_team_rank': stats.tiedTeamRank,
        'warmup': stats.warmup,

        'medal_accuracy': stats.medals?.accuracy,
        'medal_assists': stats.medals?.assists,
        'medal_captures': stats.medals?.captures,
        'medal_combo_kill': stats.medals?.comboKill,
        'medal_defends': stats.medals?.defends,
        'medal_excellent': stats.medals?.excellent,
        'medal_first_frag': stats.medals?.firstFrag,
        'medal_headshot': stats.medals?.headshot,
        'medal_humiliation': stats.medals?.humiliation,
        'medal_impressive': stats.medals?.impressive,
        'medal_midair': stats.medals?.midair,
        'medal_perfect': stats.medals?.perfect,
        'medal_perforated': stats.medals?.perforated,
        'medal_quad_god': stats.medals?.quadGod,
        'medal_rampage': stats.medals?.rampage,
        'medal_revenge': stats.medals?.revenge,

        'pickup_ammo': stats.pickups?.ammo,
        'pickup_armor': stats.pickups?.armor,
        'pickup_armor_regeneration': stats.pickups?.armorRegeneration,
        'pickup_battle_suit': stats.pickups?.battleSuit,
        'pickup_doubler': stats.pickups?.doubler,
        'pickup_flight': stats.pickups?.flight,
        'pickup_green_armor': stats.pickups?.greenArmor,
        'pickup_guard': stats.pickups?.guard,
        'pickup_haste': stats.pickups?.haste,
        'pickup_health': stats.pickups?.health,
        'pickup_invisibility': stats.pickups?.invisibility,
        'pickup_invulnerability': stats.pickups?.invulnerability,
        'pickup_kamikaze': stats.pickups?.kamikaze,
        'pickup_medkit': stats.pickups?.medkit,
        'pickup_mega_health': stats.pickups?.megaHealth,
        'pickup_other_holdable': stats.pickups?.otherHoldable,
        'pickup_other_power_up': stats.pickups?.otherPowerUp,
        'pickup_portal': stats.pickups?.portal,
        'pickup_quad_damage': stats.pickups?.quadDamage,
        'pickup_red_armor': stats.pickups?.redArmor,
        'pickup_regeneration': stats.pickups?.regeneration,
        'pickup_scout': stats.pickups?.scout,
        'pickup_teleporter': stats.pickups?.teleporter,
        'pickup_yellow_armor': stats.pickups?.yellowArmor,

        'bfg_damage_given': stats.bfg?.damageGiven,
        'bfg_damage_received': stats.bfg?.damageReceived,
        'bfg_deaths': stats.bfg?.deaths,
        'bfg_hits': stats.bfg?.hits,
        'bfg_kills': stats.bfg?.kills,
        'bfg_p': stats.bfg?.p,
        'bfg_shots': stats.bfg?.shots,
        'bfg_t': stats.bfg?.t,

        'chain_gun_damage_given': stats.chainGun?.damageGiven,
        'chain_gun_damage_received': stats.chainGun?.damageReceived,
        'chain_gun_deaths': stats.chainGun?.deaths,
        'chain_gun_hits': stats.chainGun?.hits,
        'chain_gun_kills': stats.chainGun?.kills,
        'chain_gun_p': stats.chainGun?.p,
        'chain_gun_shots': stats.chainGun?.shots,
        'chain_gun_t': stats.chainGun?.t,

        'gauntlet_damage_given': stats.gauntlet?.damageGiven,
        'gauntlet_damage_received': stats.gauntlet?.damageReceived,
        'gauntlet_deaths': stats.gauntlet?.deaths,
        'gauntlet_hits': stats.gauntlet?.hits,
        'gauntlet_kills': stats.gauntlet?.kills,
        'gauntlet_p': stats.gauntlet?.p,
        'gauntlet_shots': stats.gauntlet?.shots,
        'gauntlet_t': stats.gauntlet?.t,

        'grenade_launcher_damage_given': stats.grenadeLauncher?.damageGiven,
        'grenade_launcher_damage_received': stats.grenadeLauncher?.damageReceived,
        'grenade_launcher_deaths': stats.grenadeLauncher?.deaths,
        'grenade_launcher_hits': stats.grenadeLauncher?.hits,
        'grenade_launcher_kills': stats.grenadeLauncher?.kills,
        'grenade_launcher_p': stats.grenadeLauncher?.p,
        'grenade_launcher_shots': stats.grenadeLauncher?.shots,
        'grenade_launcher_t': stats.grenadeLauncher?.t,

        'heavy_machine_gun_damage_given': stats.heavyMachineGun?.damageGiven,
        'heavy_machine_gun_damage_received': stats.heavyMachineGun?.damageReceived,
        'heavy_machine_gun_deaths': stats.heavyMachineGun?.deaths,
        'heavy_machine_gun_hits': stats.heavyMachineGun?.hits,
        'heavy_machine_gun_kills': stats.heavyMachineGun?.kills,
        'heavy_machine_gun_p': stats.heavyMachineGun?.p,
        'heavy_machine_gun_shots': stats.heavyMachineGun?.shots,
        'heavy_machine_gun_t': stats.heavyMachineGun?.t,

        'lightning_gun_damage_given': stats.lightningGun?.damageGiven,
        'lightning_gun_damage_received': stats.lightningGun?.damageReceived,
        'lightning_gun_deaths': stats.lightningGun?.deaths,
        'lightning_gun_hits': stats.lightningGun?.hits,
        'lightning_gun_kills': stats.lightningGun?.kills,
        'lightning_gun_p': stats.lightningGun?.p,
        'lightning_gun_shots': stats.lightningGun?.shots,
        'lightning_gun_t': stats.lightningGun?.t,

        'machine_gun_damage_given': stats.machineGun?.damageGiven,
        'machine_gun_damage_received': stats.machineGun?.damageReceived,
        'machine_gun_deaths': stats.machineGun?.deaths,
        'machine_gun_hits': stats.machineGun?.hits,
        'machine_gun_kills': stats.machineGun?.kills,
        'machine_gun_p': stats.machineGun?.p,
        'machine_gun_shots': stats.machineGun?.shots,
        'machine_gun_t': stats.machineGun?.t,

        'nail_gun_damage_given': stats.nailGun?.damageGiven,
        'nail_gun_damage_received': stats.nailGun?.damageReceived,
        'nail_gun_deaths': stats.nailGun?.deaths,
        'nail_gun_hits': stats.nailGun?.hits,
        'nail_gun_kills': stats.nailGun?.kills,
        'nail_gun_p': stats.nailGun?.p,
        'nail_gun_shots': stats.nailGun?.shots,
        'nail_gun_t': stats.nailGun?.t,

        'other_weapon_damage_given': stats.otherWeapon?.damageGiven,
        'other_weapon_damage_received': stats.otherWeapon?.damageReceived,
        'other_weapon_deaths': stats.otherWeapon?.deaths,
        'other_weapon_hits': stats.otherWeapon?.hits,
        'other_weapon_kills': stats.otherWeapon?.kills,
        'other_weapon_p': stats.otherWeapon?.p,
        'other_weapon_shots': stats.otherWeapon?.shots,
        'other_weapon_t': stats.otherWeapon?.t,

        'plasma_gun_damage_given': stats.plasmaGun?.damageGiven,
        'plasma_gun_damage_received': stats.plasmaGun?.damageReceived,
        'plasma_gun_deaths': stats.plasmaGun?.deaths,
        'plasma_gun_hits': stats.plasmaGun?.hits,
        'plasma_gun_kills': stats.plasmaGun?.kills,
        'plasma_gun_p': stats.plasmaGun?.p,
        'plasma_gun_shots': stats.plasmaGun?.shots,
        'plasma_gun_t': stats.plasmaGun?.t,

        'proximity_launcher_damage_given': stats.proximityLauncher?.damageGiven,
        'proximity_launcher_damage_received': stats.proximityLauncher?.damageReceived,
        'proximity_launcher_deaths': stats.proximityLauncher?.deaths,
        'proximity_launcher_hits': stats.proximityLauncher?.hits,
        'proximity_launcher_kills': stats.proximityLauncher?.kills,
        'proximity_launcher_p': stats.proximityLauncher?.p,
        'proximity_launcher_shots': stats.proximityLauncher?.shots,
        'proximity_launcher_t': stats.proximityLauncher?.t,

        'railgun_damage_given': stats.railgun?.damageGiven,
        'railgun_damage_received': stats.railgun?.damageReceived,
        'railgun_deaths': stats.railgun?.deaths,
        'railgun_hits': stats.railgun?.hits,
        'railgun_kills': stats.railgun?.kills,
        'railgun_p': stats.railgun?.p,
        'railgun_shots': stats.railgun?.shots,
        'railgun_t': stats.railgun?.t,

        'rocket_launcher_damage_given': stats.rocketLauncher?.damageGiven,
        'rocket_launcher_damage_received': stats.rocketLauncher?.damageReceived,
        'rocket_launcher_deaths': stats.rocketLauncher?.deaths,
        'rocket_launcher_hits': stats.rocketLauncher?.hits,
        'rocket_launcher_kills': stats.rocketLauncher?.kills,
        'rocket_launcher_p': stats.rocketLauncher?.p,
        'rocket_launcher_shots': stats.rocketLauncher?.shots,
        'rocket_launcher_t': stats.rocketLauncher?.t,

        'shotgun_damage_given': stats.shotgun?.damageGiven,
        'shotgun_damage_received': stats.shotgun?.damageReceived,
        'shotgun_deaths': stats.shotgun?.deaths,
        'shotgun_hits': stats.shotgun?.hits,
        'shotgun_kills': stats.shotgun?.kills,
        'shotgun_p': stats.shotgun?.p,
        'shotgun_shots': stats.shotgun?.shots,
        'shotgun_t': stats.shotgun?.t
      }
    }
  }
} as Schema
