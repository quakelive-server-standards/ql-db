import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Unique, Validator } from 'knight-validation'
import { Server } from './Server'
import { ServerLogic } from './ServerLogic'

export class ServerValidator extends Validator {

  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('ip', new Required)
    this.add('ip', new TypeOf('string'))
    
    this.add('port', new Required)
    this.add('port', new TypeOf('number'))
    
    this.add('title', new TypeOf('string'))

    this.add(['ip', 'port'], new Unique(async (server: Server) => {
      let result = await serverLogic.count({ ip: server.ip, port: server.port }, tx)
      return result.count == 0
    }))
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

  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add('id', new Absent)
    this.add(new ServerValidator(serverLogic, tx))
  }
}

export class ServerUpdateValidator extends Validator {

  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()
    
    this.add(new ServerIdValidator(serverLogic, tx))
    this.add(new ServerValidator(serverLogic, tx))
  }
}

export class ServerDeleteValidator extends Validator {
  
  constructor(serverLogic: ServerLogic, tx: PgTransaction) {
    super()

    this.add(new ServerIdValidator(serverLogic, tx))
  }
}
