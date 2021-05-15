import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Max, Required, TypeOf, Validator } from 'knight-validation'
import { Factory } from './Factory'
import { FactoryLogic } from './FactoryLogic'

export class FactoryValidator extends Validator {

  constructor() {
    super()

    this.add('gameType', new Required)
    this.add('gameType', new TypeOf('string'))
    this.add('gameType', new Max(20))

    this.add('name', new Required)
    this.add('name', new TypeOf('string'))
    this.add('name', new Max(100))

    this.add('title', new Required)
    this.add('title', new TypeOf('string'))
    this.add('title', new Max(200))
  }
}

export class FactoryIdValidator extends Validator {

  factoryLogic: FactoryLogic

  constructor(factoryLogic: FactoryLogic, tx: PgTransaction) {
    super()
    
    this.factoryLogic = factoryLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (factory: Factory) => {
      let result = await this.factoryLogic.count({ id: factory.id }, tx)
      return result.count == 1
    }))
  }
}

export class FactoryCreateValidator extends Validator {

  constructor() {
    super()

    this.add('id', new Absent)
    this.add(new FactoryValidator)
  }
}

export class FactoryUpdateValidator extends Validator {

  constructor(factoryLogic: FactoryLogic, tx: PgTransaction) {
    super()
    
    this.add(new FactoryIdValidator(factoryLogic, tx))
    this.add(new FactoryValidator)
  }
}

export class FactoryDeleteValidator extends Validator {
  
  constructor(factoryLogic: FactoryLogic, tx: PgTransaction) {
    super()

    this.add(new FactoryIdValidator(factoryLogic, tx))
  }
}
