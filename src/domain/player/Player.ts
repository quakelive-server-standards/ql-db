import { Frag } from '../frag/Frag'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Medal } from '../medal/Medal'
import { ServerVisit } from '../serverVisit/ServerVisit'

export class Player {
  
  id?: number
  
  firstSeen?: Date
  model?: string
  name?: string
  steamId?: string

  deaths?: Frag[]
  kills?: Frag[]
  matchParticipations?: MatchParticipation[]
  medals?: Medal[]
  serverVisits?: ServerVisit[]
}