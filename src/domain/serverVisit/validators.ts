import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { PlayerLogic } from '../player/PlayerLogic'
import { ServerLogic } from '../server/ServerLogic'
import { ServerVisit } from './ServerVisit'
import { ServerVisitLogic } from './ServerVisitLogic'

export class ServerVisitValidator extends Validator {

  constructor(playerLogic: PlayerLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (serverVisit: ServerVisit) => {
      let result = await playerLogic.count({ id: serverVisit.playerId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (serverVisit: ServerVisit) => {
      let result = await serverLogic.count({ id: serverVisit.serverId }, tx)
      return result.count == 1
    }))

    this.add('active', new Required)
    this.add('active', new TypeOf('boolean'))

    this.add('connectDate', new TypeOf(Date))
    this.add('disconnectDate', new TypeOf(Date))
  }
}

export class ServerVisitIdValidator extends Validator {

  serverVisitLogic: ServerVisitLogic

  constructor(serverVisitLogic: ServerVisitLogic, tx: PgTransaction) {
    super()
    
    this.serverVisitLogic = serverVisitLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (serverVisit: ServerVisit) => {
      let result = await this.serverVisitLogic.count({ id: serverVisit.id }, tx)
      return result.count == 1
    }))
  }
}

export class ServerVisitCreateValidator extends Validator {

  constructor(playerLogic: PlayerLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('id', new Absent)
    this.add(new ServerVisitValidator(playerLogic, serverLogic, tx))
  }
}

export class ServerVisitUpdateValidator extends Validator {

  constructor(serverVisitLogic: ServerVisitLogic, playerLogic: PlayerLogic, serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.add(new ServerVisitIdValidator(serverVisitLogic, tx))
    this.add(new ServerVisitValidator(playerLogic, serverLogic, tx))
  }
}

export class ServerVisitDeleteValidator extends Validator {
  
  constructor(serverVisitLogic: ServerVisitLogic, tx: PgTransaction) {
    super()

    this.add(new ServerVisitIdValidator(serverVisitLogic, tx))
  }
}
