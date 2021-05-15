import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { Player } from './Player'
import { PlayerLogic } from './PlayerLogic'

export class PlayerValidator extends Validator {

  constructor() {
    super()

    this.add('model', new TypeOf('string'))
    this.add('name', new TypeOf('string'))

    this.add('steamId', new Required)
    this.add('steamId', new TypeOf('string'))
  }
}

export class PlayerIdValidator extends Validator {

  playerLogic: PlayerLogic

  constructor(playerLogic: PlayerLogic, tx: PgTransaction) {
    super()
    
    this.playerLogic = playerLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (player: Player) => {
      let result = await this.playerLogic.count({ id: player.id }, tx)
      return result.count == 1
    }))
  }
}

export class PlayerCreateValidator extends Validator {

  constructor() {
    super()

    this.add('id', new Absent)
    this.add(new PlayerValidator)
  }
}

export class PlayerUpdateValidator extends Validator {

  constructor(playerLogic: PlayerLogic, tx: PgTransaction) {
    super()
    
    this.add(new PlayerIdValidator(playerLogic, tx))
    this.add(new PlayerValidator)
  }
}

export class PlayerDeleteValidator extends Validator {
  
  constructor(playerLogic: PlayerLogic, tx: PgTransaction) {
    super()

    this.add(new PlayerIdValidator(playerLogic, tx))
  }
}
