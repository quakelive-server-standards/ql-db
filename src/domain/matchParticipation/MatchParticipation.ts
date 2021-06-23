import { TeamType } from '../enums/TeamType'
import { Frag } from '../frag/Frag'
import { Match } from '../match/Match'
import { Medal } from '../medal/Medal'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'
import { ServerVisit } from '../serverVisit/ServerVisit'

export class MatchParticipation {
  
  id?: number
  matchId?: number | null
  playerId?: number
  roundId?: number | null
  serverId?: number
  serverVisitId?: number
  
  aborted?: boolean
  active?: boolean
  blueFlagPickups?: number
  damageDealt?: number
  damageTaken?: number
  deathCount?: number
  finishDate?: Date
  holyShits?: number
  killCount?: number
  maxStreak?: number
  medalStats?: MedalStats
  neutralFlagPickups?: number
  pickupStats?: PickupStats
  playTime?: number
  rank?: number
  redFlagPickups?: number
  score?: number
  startDate?: Date
  team?: TeamType
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

  deaths?: Frag[]
  kills?: Frag[]
  match?: Match
  medals?: Medal[]
  player?: Player
  round?: Round
  server?: Server
  serverVisit?: ServerVisit
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