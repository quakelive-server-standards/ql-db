import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { MatchLogic } from '../match/MatchLogic'
import { MatchParticipationLogic } from '../matchParticipation/MatchParticipationLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { ServerVisitLogic } from '../serverVisit/ServerVisitLogic'
import { Medal } from './Medal'
import { MedalLogic } from './MedalLogic'

export class MedalValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()

    this.add('matchId', new TypeOf('number'))
    this.add('matchId', new Exists(async (medal: Medal) => {
      let result = await matchLogic.count({ id: medal.matchId }, tx)
      return result.count == 1
    }))

    this.add('matchParticipationId', new TypeOf('number'))
    this.add('matchParticipationId', new Exists(async (medal: Medal) => {
      let result = await matchParticipationLogic.count({ id: medal.matchParticipationId }, tx)
      return result.count == 1
    }))

    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (medal: Medal) => {
      let result = await playerLogic.count({ id: medal.playerId }, tx)
      return result.count == 1
    }))

    this.add('roundId', new TypeOf('number'))
    this.add('roundId', new Exists(async (medal: Medal) => {
      let result = await roundLogic.count({ id: medal.roundId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (medal: Medal) => {
      let result = await serverLogic.count({ id: medal.serverId }, tx)
      return result.count == 1
    }))

    this.add('serverVisitId', new TypeOf('number'))
    this.add('serverVisitId', new Exists(async (medal: Medal) => {
      let result = await serverVisitLogic.count({ id: medal.serverVisitId }, tx)
      return result.count == 1
    }))

    this.add('date', new Required)
    this.add('date', new TypeOf(Date))

    this.add('medal', new Required)
    // this.add('medal', new Enum(MedalType))

    this.add('warmup', new Required)
    this.add('warmup', new TypeOf('boolean'))
  }
}

export class MedalIdValidator extends Validator {

  medalLogic: MedalLogic

  constructor(medalLogic: MedalLogic, tx: PgTransaction) {
    super()
    
    this.medalLogic = medalLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (medal: Medal) => {
      let result = await this.medalLogic.count({ id: medal.id }, tx)
      return result.count == 1
    }))
  }
}

export class MedalCreateValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()

    this.add('id', new Absent)
    this.add(new MedalValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class MedalUpdateValidator extends Validator {

  constructor(
    medalLogic: MedalLogic,
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic, 
    roundLogic: RoundLogic, 
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {
    super()
    
    this.add(new MedalIdValidator(medalLogic, tx))
    this.add(new MedalValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class MedalDeleteValidator extends Validator {
  
  constructor(medalLogic: MedalLogic, tx: PgTransaction) {
    super()

    this.add(new MedalIdValidator(medalLogic, tx))
  }
}
