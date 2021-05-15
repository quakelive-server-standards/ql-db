import { TeamType } from '../enums/TeamType'
import { Frag } from '../frag/Frag'
import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Medal } from '../medal/Medal'
import { Server } from '../server/Server'

export class Round {

  id?: number
  matchId?: number
  serverId?: number
  
  finishDate?: Date
  round?: number
  teamWon?: TeamType
  time?: number
  startDate?: Date

  frags?: Frag[]
  match?: Match
  medals?: Medal[]
  participations?: MatchParticipation[]
  server?: Server
  
}