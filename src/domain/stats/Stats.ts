import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'

export class Stats {
  
  id?: number
  matchId?: number
  matchParticipationId?: number
  playerId?: number
  roundId?: number
  serverId?: number

  aborted?: boolean
  blueFlagPickups?: number
  damageDealt?: number
  damageTaken?: number
  date?: Date
  deaths?: number
  holyShits?: number
  kills?: number
  maxStreak?: number
  medals?: MedalStats
  neutralFlagPickups?: number
  pickups?: PickupStats
  playTime?: number
  rank?: number
  redFlagPickups?: number
  score?: number
  teamJoinTime?: number
  teamRank?: number
  tiedRank?: number
  tiedTeamRank?: number
  warmup?: boolean
  
  bfg?: WeaponStats
  chainGun?: WeaponStats
  gauntlet?: WeaponStats
  grenadeLauncher?: WeaponStats
  heavyMachineGun?: WeaponStats
  lightningGun?: WeaponStats
  machineGun?: WeaponStats
  nailGun?: WeaponStats
  otherWeapon?: WeaponStats
  plasmaGun?: WeaponStats
  proximityLauncher?: WeaponStats
  railgun?: WeaponStats
  rocketLauncher?: WeaponStats
  shotgun?: WeaponStats

  match?: Match
  matchParticipation?: MatchParticipation
  player?: Player
  server?: Server
  round?: Round
}

export class MedalStats {
  accuracy?: number
  assists?: number
  captures?: number
  comboKill?: number
  defends?: number
  excellent?: number
  firstFrag?: number
  headshot?: number
  humiliation?: number
  impressive?: number
  midair?: number
  perfect?: number
  perforated?: number
  quadGod?: number
  rampage?: number
  revenge?: number
}

export class PickupStats {
  ammo?: number
  armor?: number
  armorRegeneration?: number
  battleSuit?: number
  doubler?: number
  flight?: number
  greenArmor?: number
  guard?: number
  haste?: number
  health?: number
  invisibility?: number
  invulnerability?: number
  kamikaze?: number
  medkit?: number
  megaHealth?: number
  otherHoldable?: number
  otherPowerUp?: number
  portal?: number
  quadDamage?: number
  redArmor?: number
  regeneration?: number
  scout?: number
  teleporter?: number
  yellowArmor?: number
}

export class WeaponStats {
  deaths?: number
  damageGiven?: number
  damageReceived?: number
  hits?: number
  kills?: number
  p?: number
  shots?: number
  t?: number
}