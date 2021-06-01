import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { MatchLogic } from '../match/MatchLogic'
import { ServerLogic } from '../server/ServerLogic'
import { Round } from './Round'
import { RoundLogic } from './RoundLogic'

export class RoundValidator extends Validator {

  constructor(matchLogic: MatchLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('matchId', new Required)
    this.add('matchId', new TypeOf('number'))
    this.add('matchId', new Exists(async (round: Round) => {
      let result = await matchLogic.count({ id: round.matchId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new Required)
    this.add('serverId', new Exists(async (round: Round) => {
      let result = await serverLogic.count({ id: round.serverId }, tx)
      return result.count == 1
    }))
    
    this.add('finishDate', new Required)
    this.add('finishDate', new TypeOf(Date))

    this.add('round', new Required)
    this.add('round', new TypeOf('number'))

    // this.add('teamWon', new Enum(TeamType))
    
    this.add('time', new Required)
    this.add('time', new TypeOf('number'))

    this.add('startDate', new Required)
    this.add('startDate', new TypeOf(Date))
  }
}

export class RoundIdValidator extends Validator {

  roundLogic: RoundLogic

  constructor(roundLogic: RoundLogic, tx: PgTransaction) {
    super()
    
    this.roundLogic = roundLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (round: Round) => {
      let result = await this.roundLogic.count({ id: round.id }, tx)
      return result.count == 1
    }))
  }
}

export class RoundCreateValidator extends Validator {

  constructor(matchLogic: MatchLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('id', new Absent)
    this.add(new RoundValidator(matchLogic, serverLogic, tx))
  }
}

export class RoundUpdateValidator extends Validator {

  constructor(roundLogic: RoundLogic, matchLogic: MatchLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.add(new RoundIdValidator(roundLogic, tx))
    this.add(new RoundValidator(matchLogic, serverLogic, tx))
  }
}

export class RoundDeleteValidator extends Validator {
  
  constructor(roundLogic: RoundLogic, tx: PgTransaction) {
    super()

    this.add(new RoundIdValidator(roundLogic, tx))
  }
}
