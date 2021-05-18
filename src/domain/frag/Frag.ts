import { HoldableType } from '../enums/HoldableType'
import { PowerUpType } from '../enums/PowerUpType'
import { ReasonType } from '../enums/ReasonType'
import { TeamType } from '../enums/TeamType'
import { WeaponType } from '../enums/WeaponType'
import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'

/**
 * Quake Live stats event property 'teamkill' is left out because it can be determined.
 * 
 * Quake Live stats event property 'warmup' is left out because it is not known
 * how it works and if this information is not already on another place.
 */
export class Frag {
  
  id?: number
  matchId?: number | null
  roundId?: number | null
  serverId?: number

  date?: Date
  killer?: FragParticipant
  otherTeamAlive?: number | null
  otherTeamDead?: number | null
  reason?: ReasonType
  suicide?: boolean
  teamAlive?: number | null
  teamDead?: number | null
  time?: number
  victim?: FragParticipant
  warmup?: boolean

  match?: Match
  round?: Round
  server?: Server
}

/**
 * Quake Live server stats property 'submerged' is missing because this information is already
 * inside the property 'reason' of class 'Frag'.
 */
export class FragParticipant {

  playerId?: number
  matchParticipationId?: number

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

}