import { Frag } from '../frag/Frag'
import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Medal } from '../medal/Medal'
import { Round } from '../round/Round'
import { ServerVisit } from '../serverVisit/ServerVisit'

export class Server {
  id?: number
  firstSeen?: Date
  ip?: string
  port?: number
  title?: string

  frags?: Frag[]
  matches?: Match[]
  matchParticipations?: MatchParticipation[]
  medals?: Medal[]
  rounds?: Round[]
  visits?: ServerVisit[]

}