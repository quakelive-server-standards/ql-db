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
import { ServerVisit } from '../serverVisit/ServerVisit'

/**
 * Quake Live stats event property 'teamKill' is left out because it can be determined.
 */
export class Frag {
  
  id?: number
  matchId?: number | null
  roundId?: number | null
  serverId?: number

  date?: Date
  killer?: FragParticipant | null
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