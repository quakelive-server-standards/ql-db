import { GameType } from '../enums/GameType'
import { Match } from '../match/Match'

export class Factory {
  id?: number
  name?: string
  title?: string
  gameType?: GameType

  matches?: Match[]
}