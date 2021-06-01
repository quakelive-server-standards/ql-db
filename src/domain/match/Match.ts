import { Factory } from '../factory/Factory'
import { Frag } from '../frag/Frag'
import { Map } from '../map/Map'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Medal } from '../medal/Medal'
import { Round } from '../round/Round'
import { Server } from '../server/Server'
import { Cvars } from './Cvars'

/**
 * Quake Live stats event properties 'firstScorer', 'lastScrorer' and 'lastTeamScorer' are 
 * omitted because they can be determined.
 * 
 * Quake Live stats event property 'infected' was left out because it is the game type 
 * 'Red Rover' which can be determined by the referenced factory.
 */
export class Match {

  id?: number
  factoryId?: number | null
  mapId?: number | null
  serverId?: number

  aborted?: boolean
  active?: boolean
  cvars?: Cvars
  exitMessage?: string
  finishDate?: Date
  guid?: string
  lastLeadChangeTime?: number
  length?: number
  restarted?: boolean
  score1?: number
  score2?: number
  startDate?: Date
  
  factory?: Factory
  frags?: Frag[]
  map?: Map
  medals?: Medal[]
  participations?: MatchParticipation[]
  rounds?: Round[]
  server?: Server

}