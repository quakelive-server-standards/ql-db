import { MedalType } from '../enums/MedalType'
import { Match } from '../match/Match'
import { MatchParticipation } from '../matchParticipation/MatchParticipation'
import { Player } from '../player/Player'
import { Round } from '../round/Round'
import { Server } from '../server/Server'

export class Medal {
  
  id?: number
  matchId?: number | null
  matchParticipationId?: number | null
  playerId?: number
  roundId?: number | null
  serverId?: number

  date?: Date
  medal?: MedalType
  warmup?: boolean

  match?: Match
  matchParticipation?: MatchParticipation
  player?: Player
  round?: Round
  server?: Server
  
}