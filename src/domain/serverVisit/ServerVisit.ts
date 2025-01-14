import { Frag } from '../frag/Frag'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Medal } from '../medal/Medal'
import { Player } from '../player/Player'
import { Server } from '../server/Server'

/**
 * Represents a 
 * 
 * Quake Live server stats event property 'warmup' is left out because it is not known
 * how it works and if this information is not already on another place.
 */
export class ServerVisit {

  id?: number
  playerId?: number
  serverId?: number

  active?: boolean
  connectDate?: Date
  disconnectDate?: Date

  deaths?: Frag[]
  kills?: Frag[]
  matchParticipations?: MatchParticipation[]
  medals?: Medal[]
  player?: Player
  server?: Server

}