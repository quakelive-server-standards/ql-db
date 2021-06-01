import { TeamType } from '../enums/TeamType'
import { Frag } from '../frag/Frag'
import { Match } from '../match/Match'
import { Medal } from '../medal/Medal'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'
import { Stats } from '../stats/Stats'

export class MatchParticipation {
  
  id?: number
  matchId?: number
  playerId?: number
  roundId?: number | null
  serverId?: number
  statsId?: number | null
  
  active?: boolean
  finishDate?: Date
  startDate?: Date
  team?: TeamType

  deaths?: Frag[]
  kills?: Frag[]
  match?: Match
  medals?: Medal[]
  player?: Player
  round?: Round
  server?: Server
  stats?: Stats

}