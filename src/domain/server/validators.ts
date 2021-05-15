import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { Server } from './Server'
import { ServerLogic } from './ServerLogic'

export class ServerValidator extends Validator {

  constructor() {
    super()

    this.add('ip', new Required)
    this.add('ip', new TypeOf('string'))
    
    this.add('port', new Required)
    this.add('port', new TypeOf('number'))
    
    this.add('title', new TypeOf('string'))
  }
}

export class ServerIdValidator extends Validator {

  serverLogic: ServerLogic

  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.serverLogic = serverLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (server: Server) => {
      let result = await this.serverLogic.count({ id: server.id }, tx)
      return result.count == 1
    }))
  }
}

export class ServerCreateValidator extends Validator {

  constructor() {
    super()

    this.add('id', new Absent)
    this.add(new ServerValidator)
  }
}

export class ServerUpdateValidator extends Validator {

  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.add(new ServerIdValidator(serverLogic, tx))
    this.add(new ServerValidator)
  }
}

export class ServerDeleteValidator extends Validator {
  
  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add(new ServerIdValidator(serverLogic, tx))
  }
}
