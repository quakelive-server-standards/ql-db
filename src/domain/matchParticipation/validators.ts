import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { MatchLogic } from '../match/MatchLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { StatsLogic } from '../stats/StatsLogic'
import { MatchParticipation } from './MatchParticipation'
import { MatchParticipationLogic } from './MatchParticipationLogic'

export class MatchParticipationValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic, 
    statsLogic: StatsLogic,
    tx: PgTransaction) {

    super()

    this.add('matchId', new TypeOf('number'))
    this.add('matchId', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await matchLogic.count({ id: matchParticipation.matchId }, tx)
      return result.count == 1
    }))

    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await playerLogic.count({ id: matchParticipation.playerId }, tx)
      return result.count == 1
    }))

    this.add('roundId', new TypeOf('number'))
    this.add('roundId', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await roundLogic.count({ id: matchParticipation.roundId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await serverLogic.count({ id: matchParticipation.serverId }, tx)
      return result.count == 1
    }))

    this.add('statsId', new TypeOf('number'))
    this.add('statsId', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await statsLogic.count({ id: matchParticipation.statsId }, tx)
      return result.count == 1
    }))

    this.add('finishDate', new TypeOf(Date))
    
    this.add('startDate', new Required)
    this.add('startDate', new TypeOf(Date))

    this.add('team', new Required)
    // this.add('team', new Enum(TeamType))
  }
}

export class MatchParticipationIdValidator extends Validator {

  matchParticipationLogic: MatchParticipationLogic

  constructor(matchParticipationLogic: MatchParticipationLogic, tx: PgTransaction) {
    super()
    
    this.matchParticipationLogic = matchParticipationLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (matchParticipation: MatchParticipation) => {
      let result = await this.matchParticipationLogic.count({ id: matchParticipation.id }, tx)
      return result.count == 1
    }))
  }
}

export class MatchParticipationCreateValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic, 
    statsLogic: StatsLogic,
    tx: PgTransaction) {

    super()

    this.add('id', new Absent)
    this.add(new MatchParticipationValidator(matchLogic, playerLogic, roundLogic, serverLogic, statsLogic, tx))
  }
}

export class MatchParticipationUpdateValidator extends Validator {

  constructor(
    matchParticipationLogic: MatchParticipationLogic,
    matchLogic: MatchLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic, 
    statsLogic: StatsLogic,
    tx: PgTransaction) {

    super()
    
    this.add(new MatchParticipationIdValidator(matchParticipationLogic, tx))
    this.add(new MatchParticipationValidator(matchLogic, playerLogic, roundLogic, serverLogic, statsLogic, tx))
  }
}

export class MatchParticipationDeleteValidator extends Validator {
  
  constructor(matchParticipationLogic: MatchParticipationLogic, tx: PgTransaction) {
    super()

    this.add(new MatchParticipationIdValidator(matchParticipationLogic, tx))
  }
}
