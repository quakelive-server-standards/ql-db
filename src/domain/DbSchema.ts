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
      'cause': 'cause',
      'date': 'date',
      'environment': 'environment',
      'killer_airborne': 'killer.airborne',
      'killer_ammo': 'killer.ammo',
      'killer_armor': 'killer.armor',
      'killer_bot': 'killer.bot',
      'killer_bot_skill': 'killer.botSkill',
      'killer_health': 'killer.health',
      'killer_holdable': 'killer.holdable',
      'killer_match_participation_id': 'killer.matchParticipationId',
      'killer_player_id': 'killer.playerId',
      'killer_power_ups': 'killer.powerUps',
      'killer_position_x': 'killer.position.x',
      'killer_position_y': 'killer.position.y',
      'killer_position_z': 'killer.position.z',
      'killer_server_visit_id': 'killer.serverVisitId',
      'killer_speed': 'killer.speed',
      'killer_team': 'killer.team',
      'killer_view_x': 'killer.view.x',
      'killer_view_y': 'killer.view.y',
      'killer_view_z': 'killer.view.z',
      'killer_weapon': 'killer.weapon',
      'match_id': 'matchId',
      'other_team_alive': 'otherTeamAlive',
      'other_team_dead': 'otherTeamDead',
      'round_id': 'roundId',
      'server_id': 'serverId',
      'suicide': 'suicide',
      'team_alive': 'teamAlive',
      'team_dead': 'teamDead',
      'team_kill': 'teamKill',
      'time': 'time',
      'victim_airborne': 'victim.airborne',
      'victim_ammo': 'victim.ammo',
      'victim_armor': 'victim.armor',
      'victim_bot': 'victim.bot',
      'victim_bot_skill': 'victim.botSkill',
      'victim_health': 'victim.health',
      'victim_holdable': 'victim.holdable',
      'victim_match_participation_id': 'victim.matchParticipationId',
      'victim_player_id': 'victim.playerId',
      'victim_power_ups': 'victim.powerUps',
      'victim_position_x': 'victim.position.x',
      'victim_position_y': 'victim.position.y',
      'victim_position_z': 'victim.position.z',
      'victim_server_visit_id': 'victim.serverVisitId',
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
      'killer.serverVisit': {
        manyToOne: true,
        thisId: 'killer_server_visit_id',
        otherTable: 'server_visit',
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
      },
      'victim.serverVisit': {
        manyToOne: true,
        thisId: 'victim_server_visit_id',
        otherTable: 'server_visit',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let frag = new Frag

      frag.id = row['id']
      frag.cause = row['cause']
      frag.date = row['date']
      frag.environment = row['environment']

      if (row['killer_airborne'] != null || 
          row['killer_ammo'] != null ||
          row['killer_armor'] != null ||
          row['killer_bot'] != null ||
          row['killer_bot_skill'] != null ||
          row['killer_health'] != null ||
          row['killer_holdable'] != null ||
          row['killer_match_participation_id'] != null ||
          row['killer_player_id'] != null ||
          row['killer_position_x'] != null ||
          row['killer_position_y'] != null ||
          row['killer_position_z'] != null ||
          row['killer_power_ups'] != null ||
          row['killer_speed'] != null ||
          row['killer_team'] != null ||
          row['killer_view_x'] != null ||
          row['killer_view_y'] != null ||
          row['killer_view_z'] != null ||
          row['killer_weapon'] != null
        ) {

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
          z: row['killer_position_z'],
        }
        frag.killer.powerUps = row['killer_power_ups'] ? JSON.parse(row['killer_power_ups']) : row['killer_power_ups'],
        frag.killer.serverVisitId = row['killer_server_visit_id']
        frag.killer.speed = row['killer_speed'],
        frag.killer.team = row['killer_team'],
        frag.killer.view = {
          x: row['killer_view_x'],
          y: row['killer_view_y'],
          z: row['killer_view_z'],
        }
        frag.killer.weapon = row['killer_weapon']
      }
      else {
        frag.killer = null
      }

      frag.matchId = row['match_id']
      frag.otherTeamAlive = row['other_team_alive']
      frag.otherTeamDead = row['other_team_dead']
      frag.roundId = row['round_id']
      frag.serverId = row['server_id']      
      frag.suicide = row['suicide']
      frag.teamAlive = row['team_alive']
      frag.teamDead = row['team_dead']
      frag.teamKill = row['team_kill']
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
      frag.victim.serverVisitId = row['victim_server_visit_id']
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
        'environment': frag.environment,
        'cause': frag.cause,
        'date': frag.date,
        'killer_player_id': frag.killer?.playerId,
        'killer_match_participation_id': frag.killer?.matchParticipationId,
        'killer_server_visit_id': frag.killer?.serverVisitId,
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
        'match_id': frag.matchId,
        'other_team_alive': frag.otherTeamAlive,
        'other_team_dead': frag.otherTeamDead,
        'round_id': frag.roundId,
        'server_id': frag.serverId,
        'suicide': frag.suicide,
        'team_alive': frag.teamAlive,
        'team_dead': frag.teamDead,
        'team_kill': frag.teamKill,
        'time': frag.time,
        'victim_player_id': frag.victim?.playerId,
        'victim_match_participation_id': frag.victim?.matchParticipationId,
        'victim_server_visit_id': frag.victim?.serverVisitId,
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
      'aborted': 'aborted',
      'active': 'active',
      'blue_flag_pickups': 'blueFlagPickups',
      'damage_dealt': 'damageDealt',
      'damage_taken': 'damageTaken',
      'death_count': 'deathCount',
      'finish_date': 'finishDate',
      'holy_shits': 'holyShits',
      'kill_count': 'killCount',
      'match_id': 'matchId',
      'max_streak': 'maxStreak',
      'medal_stats_accuracy': 'medalsStats.accuracy',
      'medal_stats_assists': 'medalsStats.assists',
      'medal_stats_captures': 'medalsStats.captures',
      'medal_stats_combo_kill': 'medalsStats.comboKill',
      'medal_stats_defends': 'medalsStats.defends',
      'medal_stats_excellent': 'medalsStats.excellent',
      'medal_stats_first_frag': 'medalsStats.firstFrag',
      'medal_stats_headshot': 'medalsStats.headshot',
      'medal_stats_humiliation': 'medalsStats.humiliation',
      'medal_stats_impressive': 'medalsStats.impressive',
      'medal_stats_midair': 'medalsStats.midair',
      'medal_stats_perfect': 'medalsStats.perfect',
      'medal_stats_perforated': 'medalsStats.perforated',
      'medal_stats_quad_god': 'medalsStats.quadGod',
      'medal_stats_rampage': 'medalsStats.rampage',
      'medal_stats_revenge': 'medalsStats.revenge',
      'neutral_flag_pickups': 'neutralFlagPickups',
      'pickup_stats_ammo': 'pickupStats.ammo',
      'pickup_stats_armor': 'pickupStats.armor',
      'pickup_stats_armor_regeneration': 'pickupStats.armorRegeneration',
      'pickup_stats_battle_suit': 'pickupStats.battleSuit',
      'pickup_stats_doubler': 'pickupStats.doubler',
      'pickup_stats_flight': 'pickupStats.flight',
      'pickup_stats_green_armor': 'pickupStats.greenArmor',
      'pickup_stats_guard': 'pickupStats.guard',
      'pickup_stats_haste': 'pickupStats.haste',
      'pickup_stats_health': 'pickupStats.health',
      'pickup_stats_invisibility': 'pickupStats.invisibility',
      'pickup_stats_invulnerability': 'pickupStats.invulnerability',
      'pickup_stats_kamikaze': 'pickupStats.kamikaze',
      'pickup_stats_medkit': 'pickupStats.medkit',
      'pickup_stats_mega_health': 'pickupStats.megaHealth',
      'pickup_stats_other_holdable': 'pickupStats.otherHoldable',
      'pickup_stats_other_power_up': 'pickupStats.otherPowerUp',
      'pickup_stats_portal': 'pickupStats.portal',
      'pickup_stats_quad_damage': 'pickupStats.quadDamage',
      'pickup_stats_red_armor': 'pickupStats.redArmor',
      'pickup_stats_regeneration': 'pickupStats.regeneration',
      'pickup_stats_scout': 'pickupStats.scout',
      'pickup_stats_teleporter': 'pickupStats.teleporter',
      'pickup_stats_yellow_armor': 'pickupStats.yellowArmor',
      'play_time': 'playTime',
      'player_id': 'playerId',
      'rank': 'rank',
      'red_flag_pickups': 'redFlagPickups',
      'round_id': 'roundId',
      'score': 'score',
      'server_id': 'serverId',
      'server_visit_id': 'serverVisitId',
      'start_date': 'startDate',
      'team': 'team',
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
      'serverVisit': {
        manyToOne: true,
        thisId: 'server_visit_id',
        otherTable: 'server_visit',
        otherId: 'id'
      }
    },
    rowToInstance: (row: any) => {
      let matchParticipation = new MatchParticipation

      matchParticipation.id = row['id']
      matchParticipation.aborted = row['aborted']
      matchParticipation.active = row['active']
      matchParticipation.blueFlagPickups = row['blue_flag_pickups']
      matchParticipation.damageDealt = row['damage_dealt']
      matchParticipation.damageTaken = row['damage_taken']
      matchParticipation.deathCount = row['death_count']
      matchParticipation.finishDate = row['finish_date']
      matchParticipation.holyShits = row['holy_shits']
      matchParticipation.killCount = row['kill_count']
      matchParticipation.matchId = row['match_id']
      matchParticipation.maxStreak = row['max_streak']
      matchParticipation.neutralFlagPickups = row['neutral_flag_pickups']
      matchParticipation.playTime = row['play_time']
      matchParticipation.playerId = row['player_id']
      matchParticipation.rank = row['rank']
      matchParticipation.redFlagPickups = row['red_flag_pickups']
      matchParticipation.roundId = row['round_id']
      matchParticipation.score = row['score']
      matchParticipation.serverId = row['server_id']
      matchParticipation.serverVisitId = row['server_visit_id']
      matchParticipation.startDate = row['start_date']
      matchParticipation.teamJoinTime = row['team_join_time']
      matchParticipation.team = row['team']
      matchParticipation.teamRank = row['team_rank']
      matchParticipation.tiedRank = row['tied_rank']
      matchParticipation.tiedTeamRank = row['tied_team_rank']
      matchParticipation.warmup = row['warmup']

      matchParticipation.medalStats =  {
        'accuracy': row['medal_stats_accuracy'],
        'assists': row['medal_stats_assists'],
        'captures': row['medal_stats_captures'],
        'comboKill': row['medal_stats_combo_kill'],
        'defends': row['medal_stats_defends'],
        'excellent': row['medal_stats_excellent'],
        'firstFrag': row['medal_stats_first_frag'],
        'headshot': row['medal_stats_headshot'],
        'humiliation': row['medal_stats_humiliation'],
        'impressive': row['medal_stats_impressive'],
        'midair': row['medal_stats_midair'],
        'perfect': row['medal_stats_perfect'],
        'perforated': row['medal_stats_perforated'],
        'quadGod': row['medal_stats_quad_god'],
        'rampage': row['medal_stats_rampage'],
        'revenge': row['medal_stats_revenge']
      }
      
      matchParticipation.pickupStats = {
        'ammo': row['pickup_stats_ammo'],
        'armor': row['pickup_stats_armor'],
        'armorRegeneration': row['pickup_stats_armor_regeneration'],
        'battleSuit': row['pickup_stats_battle_suit'],
        'doubler': row['pickup_stats_doubler'],
        'flight': row['pickup_stats_flight'],
        'greenArmor': row['pickup_stats_green_armor'],
        'guard': row['pickup_stats_guard'],
        'haste': row['pickup_stats_haste'],
        'health': row['pickup_stats_health'],
        'invisibility': row['pickup_stats_invisibility'],
        'invulnerability': row['pickup_stats_invulnerability'],
        'kamikaze': row['pickup_stats_kamikaze'],
        'medkit': row['pickup_stats_medkit'],
        'megaHealth': row['pickup_stats_mega_health'],
        'otherHoldable': row['pickup_stats_other_holdable'],
        'otherPowerUp': row['pickup_stats_other_power_up'],
        'portal': row['pickup_stats_portal'],
        'quadDamage': row['pickup_stats_quad_damage'],
        'redArmor': row['pickup_stats_red_armor'],
        'regeneration': row['pickup_stats_regeneration'],
        'scout': row['pickup_stats_scout'],
        'teleporter': row['pickup_stats_teleporter'],
        'yellowArmor': row['pickup_stats_yellow_armor']
      }

      matchParticipation.bfg = {
        'damageGiven': row['bfg_damage_given'],
        'damageReceived': row['bfg_damage_received'],
        'deaths': row['bfg_deaths'],
        'hits': row['bfg_hits'],
        'kills': row['bfg_kills'],
        'p': row['bfg_p'],
        'shots': row['bfg_shots'],
        't': row['bfg_t']
      }

      matchParticipation.chainGun = {
        'damageGiven': row['chain_gun_damage_given'],
        'damageReceived': row['chain_gun_damage_received'],
        'deaths': row['chain_gun_deaths'],
        'hits': row['chain_gun_hits'],
        'kills': row['chain_gun_kills'],
        'p': row['chain_gun_p'],
        'shots': row['chain_gun_shots'],
        't': row['chain_gun_t']
      }

      matchParticipation.gauntlet = {
        'damageGiven': row['gauntlet_damage_given'],
        'damageReceived': row['gauntlet_damage_received'],
        'deaths': row['gauntlet_deaths'],
        'hits': row['gauntlet_hits'],
        'kills': row['gauntlet_kills'],
        'p': row['gauntlet_p'],
        'shots': row['gauntlet_shots'],
        't': row['gauntlet_t']
      }

      matchParticipation.grenadeLauncher = {
        'damageGiven': row['grenade_launcher_damage_given'],
        'damageReceived': row['grenade_launcher_damage_received'],
        'deaths': row['grenade_launcher_deaths'],
        'hits': row['grenade_launcher_hits'],
        'kills': row['grenade_launcher_kills'],
        'p': row['grenade_launcher_p'],
        'shots': row['grenade_launcher_shots'],
        't': row['grenade_launcher_t']
      }

      matchParticipation.heavyMachineGun = {
        'damageGiven': row['heavy_machine_gun_damage_given'],
        'damageReceived': row['heavy_machine_gun_damage_received'],
        'deaths': row['heavy_machine_gun_deaths'],
        'hits': row['heavy_machine_gun_hits'],
        'kills': row['heavy_machine_gun_kills'],
        'p': row['heavy_machine_gun_p'],
        'shots': row['heavy_machine_gun_shots'],
        't': row['heavy_machine_gun_t']
      }

      matchParticipation.lightningGun = {
        'damageGiven': row['lightning_gun_damage_given'],
        'damageReceived': row['lightning_gun_damage_received'],
        'deaths': row['lightning_gun_deaths'],
        'hits': row['lightning_gun_hits'],
        'kills': row['lightning_gun_kills'],
        'p': row['lightning_gun_p'],
        'shots': row['lightning_gun_shots'],
        't': row['lightning_gun_t']
      }

      matchParticipation.machineGun = {
        'damageGiven': row['machine_gun_damage_given'],
        'damageReceived': row['machine_gun_damage_received'],
        'deaths': row['machine_gun_deaths'],
        'hits': row['machine_gun_hits'],
        'kills': row['machine_gun_kills'],
        'p': row['machine_gun_p'],
        'shots': row['machine_gun_shots'],
        't': row['machine_gun_t']
      }

      matchParticipation.nailGun = {
        'damageGiven': row['nail_gun_damage_given'],
        'damageReceived': row['nail_gun_damage_received'],
        'deaths': row['nail_gun_deaths'],
        'hits': row['nail_gun_hits'],
        'kills': row['nail_gun_kills'],
        'p': row['nail_gun_p'],
        'shots': row['nail_gun_shots'],
        't': row['nail_gun_t']
      }

      matchParticipation.otherWeapon = {
        'damageGiven': row['other_weapon_damage_given'],
        'damageReceived': row['other_weapon_damage_received'],
        'deaths': row['other_weapon_deaths'],
        'hits': row['other_weapon_hits'],
        'kills': row['other_weapon_kills'],
        'p': row['other_weapon_p'],
        'shots': row['other_weapon_shots'],
        't': row['other_weapon_t']
      }

      matchParticipation.plasmaGun = {
        'damageGiven': row['plasma_gun_damage_given'],
        'damageReceived': row['plasma_gun_damage_received'],
        'deaths': row['plasma_gun_deaths'],
        'hits': row['plasma_gun_hits'],
        'kills': row['plasma_gun_kills'],
        'p': row['plasma_gun_p'],
        'shots': row['plasma_gun_shots'],
        't': row['plasma_gun_t']
      }

      matchParticipation.proximityLauncher = {
        'damageGiven': row['proximity_launcher_damage_given'],
        'damageReceived': row['proximity_launcher_damage_received'],
        'deaths': row['proximity_launcher_deaths'],
        'hits': row['proximity_launcher_hits'],
        'kills': row['proximity_launcher_kills'],
        'p': row['proximity_launcher_p'],
        'shots': row['proximity_launcher_shots'],
        't': row['proximity_launcher_t']
      }

      matchParticipation.railgun = {
        'damageGiven': row['railgun_damage_given'],
        'damageReceived': row['railgun_damage_received'],
        'deaths': row['railgun_deaths'],
        'hits': row['railgun_hits'],
        'kills': row['railgun_kills'],
        'p': row['railgun_p'],
        'shots': row['railgun_shots'],
        't': row['railgun_t']
      }

      matchParticipation.rocketLauncher = {
        'damageGiven': row['rocket_launcher_damage_given'],
        'damageReceived': row['rocket_launcher_damage_received'],
        'deaths': row['rocket_launcher_deaths'],
        'hits': row['rocket_launcher_hits'],
        'kills': row['rocket_launcher_kills'],
        'p': row['rocket_launcher_p'],
        'shots': row['rocket_launcher_shots'],
        't': row['rocket_launcher_t']
      }

      matchParticipation.shotgun = {
        'damageGiven': row['shotgun_damage_given'],
        'damageReceived': row['shotgun_damage_received'],
        'deaths': row['shotgun_deaths'],
        'hits': row['shotgun_hits'],
        'kills': row['shotgun_kills'],
        'p': row['shotgun_p'],
        'shots': row['shotgun_shots'],
        't': row['shotgun_t']
      }

      return matchParticipation
    },
    instanceToRow: (matchParticipation: MatchParticipation) => {
      return {
        'id': matchParticipation.id,

        'aborted': matchParticipation.aborted,
        'active': matchParticipation.active,
        'blue_flag_pickups': matchParticipation.blueFlagPickups,
        'damage_dealt': matchParticipation.damageDealt,
        'damage_taken': matchParticipation.damageTaken,
        'death_count': matchParticipation.deathCount,
        'finish_date': matchParticipation.finishDate,
        'holy_shits': matchParticipation.holyShits,
        'kill_count': matchParticipation.killCount,
        'match_id': matchParticipation.matchId,
        'max_streak': matchParticipation.maxStreak,
        'neutral_flag_pickups': matchParticipation.neutralFlagPickups,
        'other_weapon': matchParticipation.otherWeapon,
        'play_time': matchParticipation.playTime,
        'player_id': matchParticipation.playerId,
        'rank': matchParticipation.rank,
        'red_flag_pickups': matchParticipation.redFlagPickups,
        'round_id': matchParticipation.roundId,
        'score': matchParticipation.score,
        'server_id': matchParticipation.serverId,
        'server_visit_id': matchParticipation.serverVisitId,
        'start_date': matchParticipation.startDate,
        'team': matchParticipation.team,
        'team_join_time': matchParticipation.teamJoinTime,
        'team_rank': matchParticipation.teamRank,
        'tied_rank': matchParticipation.tiedRank,
        'tied_team_rank': matchParticipation.tiedTeamRank,
        'warmup': matchParticipation.warmup,

        'medal_stats_accuracy': matchParticipation.medalStats?.accuracy,
        'medal_stats_assists': matchParticipation.medalStats?.assists,
        'medal_stats_captures': matchParticipation.medalStats?.captures,
        'medal_stats_combo_kill': matchParticipation.medalStats?.comboKill,
        'medal_stats_defends': matchParticipation.medalStats?.defends,
        'medal_stats_excellent': matchParticipation.medalStats?.excellent,
        'medal_stats_first_frag': matchParticipation.medalStats?.firstFrag,
        'medal_stats_headshot': matchParticipation.medalStats?.headshot,
        'medal_stats_humiliation': matchParticipation.medalStats?.humiliation,
        'medal_stats_impressive': matchParticipation.medalStats?.impressive,
        'medal_stats_midair': matchParticipation.medalStats?.midair,
        'medal_stats_perfect': matchParticipation.medalStats?.perfect,
        'medal_stats_perforated': matchParticipation.medalStats?.perforated,
        'medal_stats_quad_god': matchParticipation.medalStats?.quadGod,
        'medal_stats_rampage': matchParticipation.medalStats?.rampage,
        'medal_stats_revenge': matchParticipation.medalStats?.revenge,

        'pickup_stats_ammo': matchParticipation.pickupStats?.ammo,
        'pickup_stats_armor': matchParticipation.pickupStats?.armor,
        'pickup_stats_armor_regeneration': matchParticipation.pickupStats?.armorRegeneration,
        'pickup_stats_battle_suit': matchParticipation.pickupStats?.battleSuit,
        'pickup_stats_doubler': matchParticipation.pickupStats?.doubler,
        'pickup_stats_flight': matchParticipation.pickupStats?.flight,
        'pickup_stats_green_armor': matchParticipation.pickupStats?.greenArmor,
        'pickup_stats_guard': matchParticipation.pickupStats?.guard,
        'pickup_stats_haste': matchParticipation.pickupStats?.haste,
        'pickup_stats_health': matchParticipation.pickupStats?.health,
        'pickup_stats_invisibility': matchParticipation.pickupStats?.invisibility,
        'pickup_stats_invulnerability': matchParticipation.pickupStats?.invulnerability,
        'pickup_stats_kamikaze': matchParticipation.pickupStats?.kamikaze,
        'pickup_stats_medkit': matchParticipation.pickupStats?.medkit,
        'pickup_stats_mega_health': matchParticipation.pickupStats?.megaHealth,
        'pickup_stats_other_holdable': matchParticipation.pickupStats?.otherHoldable,
        'pickup_stats_other_power_up': matchParticipation.pickupStats?.otherPowerUp,
        'pickup_stats_portal': matchParticipation.pickupStats?.portal,
        'pickup_stats_quad_damage': matchParticipation.pickupStats?.quadDamage,
        'pickup_stats_red_armor': matchParticipation.pickupStats?.redArmor,
        'pickup_stats_regeneration': matchParticipation.pickupStats?.regeneration,
        'pickup_stats_scout': matchParticipation.pickupStats?.scout,
        'pickup_stats_teleporter': matchParticipation.pickupStats?.teleporter,
        'pickup_stats_yellow_armor': matchParticipation.pickupStats?.yellowArmor,

        'bfg_damage_given': matchParticipation.bfg?.damageGiven,
        'bfg_damage_received': matchParticipation.bfg?.damageReceived,
        'bfg_deaths': matchParticipation.bfg?.deaths,
        'bfg_hits': matchParticipation.bfg?.hits,
        'bfg_kills': matchParticipation.bfg?.kills,
        'bfg_p': matchParticipation.bfg?.p,
        'bfg_shots': matchParticipation.bfg?.shots,
        'bfg_t': matchParticipation.bfg?.t,

        'chain_gun_damage_given': matchParticipation.chainGun?.damageGiven,
        'chain_gun_damage_received': matchParticipation.chainGun?.damageReceived,
        'chain_gun_deaths': matchParticipation.chainGun?.deaths,
        'chain_gun_hits': matchParticipation.chainGun?.hits,
        'chain_gun_kills': matchParticipation.chainGun?.kills,
        'chain_gun_p': matchParticipation.chainGun?.p,
        'chain_gun_shots': matchParticipation.chainGun?.shots,
        'chain_gun_t': matchParticipation.chainGun?.t,

        'gauntlet_damage_given': matchParticipation.gauntlet?.damageGiven,
        'gauntlet_damage_received': matchParticipation.gauntlet?.damageReceived,
        'gauntlet_deaths': matchParticipation.gauntlet?.deaths,
        'gauntlet_hits': matchParticipation.gauntlet?.hits,
        'gauntlet_kills': matchParticipation.gauntlet?.kills,
        'gauntlet_p': matchParticipation.gauntlet?.p,
        'gauntlet_shots': matchParticipation.gauntlet?.shots,
        'gauntlet_t': matchParticipation.gauntlet?.t,

        'grenade_launcher_damage_given': matchParticipation.grenadeLauncher?.damageGiven,
        'grenade_launcher_damage_received': matchParticipation.grenadeLauncher?.damageReceived,
        'grenade_launcher_deaths': matchParticipation.grenadeLauncher?.deaths,
        'grenade_launcher_hits': matchParticipation.grenadeLauncher?.hits,
        'grenade_launcher_kills': matchParticipation.grenadeLauncher?.kills,
        'grenade_launcher_p': matchParticipation.grenadeLauncher?.p,
        'grenade_launcher_shots': matchParticipation.grenadeLauncher?.shots,
        'grenade_launcher_t': matchParticipation.grenadeLauncher?.t,

        'heavy_machine_gun_damage_given': matchParticipation.heavyMachineGun?.damageGiven,
        'heavy_machine_gun_damage_received': matchParticipation.heavyMachineGun?.damageReceived,
        'heavy_machine_gun_deaths': matchParticipation.heavyMachineGun?.deaths,
        'heavy_machine_gun_hits': matchParticipation.heavyMachineGun?.hits,
        'heavy_machine_gun_kills': matchParticipation.heavyMachineGun?.kills,
        'heavy_machine_gun_p': matchParticipation.heavyMachineGun?.p,
        'heavy_machine_gun_shots': matchParticipation.heavyMachineGun?.shots,
        'heavy_machine_gun_t': matchParticipation.heavyMachineGun?.t,

        'lightning_gun_damage_given': matchParticipation.lightningGun?.damageGiven,
        'lightning_gun_damage_received': matchParticipation.lightningGun?.damageReceived,
        'lightning_gun_deaths': matchParticipation.lightningGun?.deaths,
        'lightning_gun_hits': matchParticipation.lightningGun?.hits,
        'lightning_gun_kills': matchParticipation.lightningGun?.kills,
        'lightning_gun_p': matchParticipation.lightningGun?.p,
        'lightning_gun_shots': matchParticipation.lightningGun?.shots,
        'lightning_gun_t': matchParticipation.lightningGun?.t,

        'machine_gun_damage_given': matchParticipation.machineGun?.damageGiven,
        'machine_gun_damage_received': matchParticipation.machineGun?.damageReceived,
        'machine_gun_deaths': matchParticipation.machineGun?.deaths,
        'machine_gun_hits': matchParticipation.machineGun?.hits,
        'machine_gun_kills': matchParticipation.machineGun?.kills,
        'machine_gun_p': matchParticipation.machineGun?.p,
        'machine_gun_shots': matchParticipation.machineGun?.shots,
        'machine_gun_t': matchParticipation.machineGun?.t,

        'nail_gun_damage_given': matchParticipation.nailGun?.damageGiven,
        'nail_gun_damage_received': matchParticipation.nailGun?.damageReceived,
        'nail_gun_deaths': matchParticipation.nailGun?.deaths,
        'nail_gun_hits': matchParticipation.nailGun?.hits,
        'nail_gun_kills': matchParticipation.nailGun?.kills,
        'nail_gun_p': matchParticipation.nailGun?.p,
        'nail_gun_shots': matchParticipation.nailGun?.shots,
        'nail_gun_t': matchParticipation.nailGun?.t,

        'other_weapon_damage_given': matchParticipation.otherWeapon?.damageGiven,
        'other_weapon_damage_received': matchParticipation.otherWeapon?.damageReceived,
        'other_weapon_deaths': matchParticipation.otherWeapon?.deaths,
        'other_weapon_hits': matchParticipation.otherWeapon?.hits,
        'other_weapon_kills': matchParticipation.otherWeapon?.kills,
        'other_weapon_p': matchParticipation.otherWeapon?.p,
        'other_weapon_shots': matchParticipation.otherWeapon?.shots,
        'other_weapon_t': matchParticipation.otherWeapon?.t,

        'plasma_gun_damage_given': matchParticipation.plasmaGun?.damageGiven,
        'plasma_gun_damage_received': matchParticipation.plasmaGun?.damageReceived,
        'plasma_gun_deaths': matchParticipation.plasmaGun?.deaths,
        'plasma_gun_hits': matchParticipation.plasmaGun?.hits,
        'plasma_gun_kills': matchParticipation.plasmaGun?.kills,
        'plasma_gun_p': matchParticipation.plasmaGun?.p,
        'plasma_gun_shots': matchParticipation.plasmaGun?.shots,
        'plasma_gun_t': matchParticipation.plasmaGun?.t,

        'proximity_launcher_damage_given': matchParticipation.proximityLauncher?.damageGiven,
        'proximity_launcher_damage_received': matchParticipation.proximityLauncher?.damageReceived,
        'proximity_launcher_deaths': matchParticipation.proximityLauncher?.deaths,
        'proximity_launcher_hits': matchParticipation.proximityLauncher?.hits,
        'proximity_launcher_kills': matchParticipation.proximityLauncher?.kills,
        'proximity_launcher_p': matchParticipation.proximityLauncher?.p,
        'proximity_launcher_shots': matchParticipation.proximityLauncher?.shots,
        'proximity_launcher_t': matchParticipation.proximityLauncher?.t,

        'railgun_damage_given': matchParticipation.railgun?.damageGiven,
        'railgun_damage_received': matchParticipation.railgun?.damageReceived,
        'railgun_deaths': matchParticipation.railgun?.deaths,
        'railgun_hits': matchParticipation.railgun?.hits,
        'railgun_kills': matchParticipation.railgun?.kills,
        'railgun_p': matchParticipation.railgun?.p,
        'railgun_shots': matchParticipation.railgun?.shots,
        'railgun_t': matchParticipation.railgun?.t,

        'rocket_launcher_damage_given': matchParticipation.rocketLauncher?.damageGiven,
        'rocket_launcher_damage_received': matchParticipation.rocketLauncher?.damageReceived,
        'rocket_launcher_deaths': matchParticipation.rocketLauncher?.deaths,
        'rocket_launcher_hits': matchParticipation.rocketLauncher?.hits,
        'rocket_launcher_kills': matchParticipation.rocketLauncher?.kills,
        'rocket_launcher_p': matchParticipation.rocketLauncher?.p,
        'rocket_launcher_shots': matchParticipation.rocketLauncher?.shots,
        'rocket_launcher_t': matchParticipation.rocketLauncher?.t,

        'shotgun_damage_given': matchParticipation.shotgun?.damageGiven,
        'shotgun_damage_received': matchParticipation.shotgun?.damageReceived,
        'shotgun_deaths': matchParticipation.shotgun?.deaths,
        'shotgun_hits': matchParticipation.shotgun?.hits,
        'shotgun_kills': matchParticipation.shotgun?.kills,
        'shotgun_p': matchParticipation.shotgun?.p,
        'shotgun_shots': matchParticipation.shotgun?.shots,
        'shotgun_t': matchParticipation.shotgun?.t
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
      'server_visit_id': 'serverVisitId',
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
      },
      'serverVisit': {
        manyToOne: true,
        thisId: 'server_visit_id',
        otherTable: 'server_visit',
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
      medal.serverVisitId = row['server_visit_id']
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
        'server_visit_id': medal.serverVisitId,
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
      'deaths': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'victim_server_visit_id'
      },
      'kills': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'frag',
        otherId: 'killer_server_visit_id'
      },
      'matchParticipations': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'match_participation',
        otherId: 'server_visit_id'
      },
      'medals': {
        oneToMany: true,
        thisId: 'id',
        otherTable: 'medal',
        otherId: 'server_visit_id'
      },
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
  }
} as Schema
