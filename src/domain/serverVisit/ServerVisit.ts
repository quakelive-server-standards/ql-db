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

  connectDate?: Date
  disconnectDate?: Date

  player?: Player
  server?: Server

}