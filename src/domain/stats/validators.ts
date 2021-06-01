import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { MatchLogic } from '../match/MatchLogic'
import { MatchParticipationLogic } from '../matchParticipation/MatchParticipationLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { ServerVisitLogic } from '../serverVisit/ServerVisitLogic'
import { Stats } from './Stats'
import { StatsLogic } from './StatsLogic'

export class StatsValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()

    this.add('matchId', new Required, async (stats: Stats) => ! stats.warmup)
    this.add('matchId', new TypeOf('number'))
    this.add('matchId', new Exists(async (stats: Stats) => {
      let result = await matchLogic.count({ id: stats.matchId }, tx)
      return result.count == 1
    }))

    this.add('matchParticipationId', new Required, async (stats: Stats) => ! stats.warmup)
    this.add('matchParticipationId', new TypeOf('number'))
    this.add('matchParticipationId', new Exists(async (stats: Stats) => {
      let result = await matchParticipationLogic.count({ id: stats.matchParticipationId }, tx)
      return result.count == 1
    }))

    this.add('playerId', new Required)
    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (stats: Stats) => {
      let result = await playerLogic.count({ id: stats.playerId }, tx)
      return result.count == 1
    }))

    this.add('roundId', new TypeOf('number'))
    this.add('roundId', new Exists(async (stats: Stats) => {
      let result = await roundLogic.count({ id: stats.roundId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new Required)
    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (stats: Stats) => {
      let result = await serverLogic.count({ id: stats.serverId }, tx)
      return result.count == 1
    }))

    this.add('serverVisitId', new Required)
    this.add('serverVisitId', new TypeOf('number'))
    this.add('serverVisitId', new Exists(async (stats: Stats) => {
      let result = await serverVisitLogic.count({ id: stats.serverVisitId }, tx)
      return result.count == 1
    }))

    this.add('aborted', new TypeOf('boolean'))
    this.add('blueFlagPickups', new TypeOf('number'))
    this.add('damageDealt', new TypeOf('number'))
    this.add('damageTaken', new TypeOf('number'))
    
    this.add('date', new Required)
    this.add('date', new TypeOf(Date))
    
    this.add('deaths', new TypeOf('number'))
    this.add('holyShits', new TypeOf('number'))
    this.add('kills', new TypeOf('number'))
    this.add('maxStreak', new TypeOf('number'))
    this.add('medals', new MedalStatsValidator)
    this.add('neutralFlagPickups', new TypeOf('number'))
    this.add('pickups', new PickupStatsValidator)
    this.add('playTime', new TypeOf('number'))
    this.add('rank', new TypeOf('number'))
    this.add('redFlagPickups', new TypeOf('number'))
    this.add('score', new TypeOf('number'))
    this.add('teamJoinTime', new TypeOf('number'))
    this.add('teamRank', new TypeOf('number'))
    this.add('tiedRank', new TypeOf('number'))
    this.add('tiedTeamRank', new TypeOf('number'))
    
    this.add('warmup', new Required)
    this.add('warmup', new TypeOf('boolean'))
    
    this.add('bfg', new WeaponStatsValidator)
    this.add('chainGun', new WeaponStatsValidator)
    this.add('gauntlet', new WeaponStatsValidator)
    this.add('grenadeLauncher', new WeaponStatsValidator)
    this.add('heavyMachineGun', new WeaponStatsValidator)
    this.add('lightningGun', new WeaponStatsValidator)
    this.add('machineGun', new WeaponStatsValidator)
    this.add('nailGun', new WeaponStatsValidator)
    this.add('otherWeapon', new WeaponStatsValidator)
    this.add('plasmaGun', new WeaponStatsValidator)
    this.add('proximityLauncher', new WeaponStatsValidator)
    this.add('railgun', new WeaponStatsValidator)
    this.add('rocketLauncher', new WeaponStatsValidator)
    this.add('shotgun', new WeaponStatsValidator)
  }
}

export class MedalStatsValidator extends Validator {

  constructor() {
    super()

    this.add('accuracy', new TypeOf('number'))
    this.add('assists', new TypeOf('number'))
    this.add('captures', new TypeOf('number'))
    this.add('comboKill', new TypeOf('number'))
    this.add('defends', new TypeOf('number'))
    this.add('excellent', new TypeOf('number'))
    this.add('firstFrag', new TypeOf('number'))
    this.add('headshot', new TypeOf('number'))
    this.add('humiliation', new TypeOf('number'))
    this.add('impressive', new TypeOf('number'))
    this.add('midair', new TypeOf('number'))
    this.add('perfect', new TypeOf('number'))
    this.add('perforated', new TypeOf('number'))
    this.add('quadGod', new TypeOf('number'))
    this.add('rampage', new TypeOf('number'))
    this.add('revenge', new TypeOf('number'))
  }
}

export class PickupStatsValidator extends Validator {

  constructor() {
    super()

    this.add('ammo', new TypeOf('number'))
    this.add('armor', new TypeOf('number'))
    this.add('armorRegeneration', new TypeOf('number'))
    this.add('battleSuit', new TypeOf('number'))
    this.add('doubler', new TypeOf('number'))
    this.add('flight', new TypeOf('number'))
    this.add('greenArmor', new TypeOf('number'))
    this.add('guard', new TypeOf('number'))
    this.add('haste', new TypeOf('number'))
    this.add('health', new TypeOf('number'))
    this.add('invisibility', new TypeOf('number'))
    this.add('invulnerability', new TypeOf('number'))
    this.add('kamikaze', new TypeOf('number'))
    this.add('medkit', new TypeOf('number'))
    this.add('megaHealth', new TypeOf('number'))
    this.add('otherHoldable', new TypeOf('number'))
    this.add('otherPowerUp', new TypeOf('number'))
    this.add('portal', new TypeOf('number'))
    this.add('quadDamage', new TypeOf('number'))
    this.add('redArmor', new TypeOf('number'))
    this.add('regeneration', new TypeOf('number'))
    this.add('scout', new TypeOf('number'))
    this.add('teleporter', new TypeOf('number'))
    this.add('yellowArmor', new TypeOf('number'))
  }
}

export class WeaponStatsValidator extends Validator {

  constructor() {
    super()

    this.add('deaths', new TypeOf('number'))
    this.add('damageGiven', new TypeOf('number'))
    this.add('damageReceived', new TypeOf('number'))
    this.add('hits', new TypeOf('number'))
    this.add('kills', new TypeOf('number'))
    this.add('p', new TypeOf('number'))
    this.add('shots', new TypeOf('number'))
    this.add('t', new TypeOf('number'))
  }
}

export class StatsIdValidator extends Validator {

  statsLogic: StatsLogic

  constructor(statsLogic: StatsLogic, tx: PgTransaction) {
    super()
    
    this.statsLogic = statsLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (stats: Stats) => {
      let result = await this.statsLogic.count({ id: stats.id }, tx)
      return result.count == 1
    }))
  }
}

export class StatsCreateValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()

    this.add('id', new Absent)
    this.add(new StatsValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class StatsUpdateValidator extends Validator {

  constructor(
    statsLogic: StatsLogic,
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {
    super()
    
    this.add(new StatsIdValidator(statsLogic, tx))
    this.add(new StatsValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class StatsDeleteValidator extends Validator {
  
  constructor(statsLogic: StatsLogic, tx: PgTransaction) {
    super()

    this.add(new StatsIdValidator(statsLogic, tx))
  }
}
