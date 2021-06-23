import { CauseType } from '../enums/CauseType'
import { HoldableType } from '../enums/HoldableType'
import { PowerUpType } from '../enums/PowerUpType'
import { TeamType } from '../enums/TeamType'
import { WeaponType } from '../enums/WeaponType'
import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'
import { ServerVisit } from '../serverVisit/ServerVisit'

export class Frag {
  
  id?: number
  matchId?: number | null
  roundId?: number | null
  serverId?: number

  cause?: CauseType
  date?: Date
  /**
   * Is true for the following CauseType values: Crush, Falling, Hurt, Lava, Slime, TriggerHurt, Water, Unknown
   */
  environment?: boolean
  killer?: FragParticipant | null
  otherTeamAlive?: number | null
  otherTeamDead?: number | null
  /**
   * Is true for the CauseType and if the player killed itself either through a weapon
   * or by entering the console command kill.
   */
  suicide?: boolean
  teamAlive?: number | null
  teamDead?: number | null
  teamKill?: boolean
  time?: number
  victim?: FragParticipant
  warmup?: boolean

  match?: Match
  round?: Round
  server?: Server
}

/**
 * Quake Live server stats property 'submerged' is left out because this information is already
 * inside the property 'reason' of class 'Frag'.
 */
export class FragParticipant {

  playerId?: number
  matchParticipationId?: number | null
  serverVisitId?: number

  airborne?: boolean
  ammo?: number
  armor?: number
  bot?: boolean
  botSkill?: number | null
  health?: number
  holdable?: HoldableType | null
  powerUps?: PowerUpType[] | null
  position?: {
    x?: number
    y?: number
    z?: number
  }
  speed?: number
  team?: TeamType
  view?: {
    x?: number
    y?: number
    z?: number
  }
  weapon?: WeaponType

  player?: Player
  matchParticipation?: MatchParticipation
  serverVisit?: ServerVisit

}