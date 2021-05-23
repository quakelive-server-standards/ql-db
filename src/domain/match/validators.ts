import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { FactoryLogic } from '../factory/FactoryLogic'
import { MapLogic } from '../map/MapLogic'
import { ServerLogic } from '../server/ServerLogic'
import { Match } from './Match'
import { MatchLogic } from './MatchLogic'

export class MatchValidator extends Validator {

  constructor(factoryLogic: FactoryLogic, mapLogic: MapLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('factoryId', new TypeOf('number'))
    this.add('factoryId', new Exists(async (match: Match) => {
      let result = await factoryLogic.count({ id: match.factoryId }, tx)
      return result.count == 1
    }))

    this.add('mapId', new TypeOf('number'))
    this.add('mapId', new Exists(async (match: Match) => {
      let result = await mapLogic.count({ id: match.mapId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (match: Match) => {
      let result = await serverLogic.count({ id: match.serverId }, tx)
      return result.count == 1
    }))

    this.add('aborted', new TypeOf('boolean'))

    this.add('active', new Required)
    this.add('active', new TypeOf('boolean'))

    this.add('cvars', new TypeOf('object'))
    this.add('exitMessage', new TypeOf('string'))
    this.add('finishDate', new TypeOf(Date))
    
    this.add('guid', new Required)
    this.add('guid', new TypeOf('string'))
    
    this.add('lastLeadChangeTime', new TypeOf('number'))
    this.add('length', new TypeOf('number'))
    this.add('restarted', new TypeOf('boolean'))
    this.add('score1', new TypeOf('number'))
    this.add('score2', new TypeOf('number'))
    this.add('startDate', new TypeOf(Date))
  }
}

export class MatchIdValidator extends Validator {

  matchLogic: MatchLogic

  constructor(matchLogic: MatchLogic, tx: PgTransaction) {
    super()
    
    this.matchLogic = matchLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (match: Match) => {
      let result = await this.matchLogic.count({ id: match.id }, tx)
      return result.count == 1
    }))
  }
}

export class MatchCreateValidator extends Validator {

  constructor(factoryLogic: FactoryLogic, mapLogic: MapLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('id', new Absent)
    this.add(new MatchValidator(factoryLogic, mapLogic, serverLogic, tx))
  }
}

export class MatchUpdateValidator extends Validator {

  constructor(factoryLogic: FactoryLogic, mapLogic: MapLogic, matchLogic: MatchLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.add(new MatchIdValidator(matchLogic, tx))
    this.add(new MatchValidator(factoryLogic, mapLogic, serverLogic, tx))
  }
}

export class MatchDeleteValidator extends Validator {
  
  constructor(matchLogic: MatchLogic, tx: PgTransaction) {
    super()

    this.add(new MatchIdValidator(matchLogic, tx))
  }
}
