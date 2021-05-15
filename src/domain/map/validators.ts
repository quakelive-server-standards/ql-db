import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Max, Required, TypeOf, Unique, Validator } from 'knight-validation'
import { Map } from './Map'
import { MapLogic } from './MapLogic'

export class MapValidator extends Validator {

  constructor(mapLogic: MapLogic, tx: PgTransaction) {
    super()

    this.add('name', new Required)
    this.add('name', new TypeOf('string'))
    this.add('name', new Max(100))
    this.add('name', new Unique(async (map: Map) => {
      let result = await mapLogic.count({ name: map.name }, tx)
      return result.count == 0
    }))
  }
}

export class MapIdValidator extends Validator {

  mapLogic: MapLogic

  constructor(mapLogic: MapLogic, tx: PgTransaction) {
    super()
    
    this.mapLogic = mapLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (map: Map) => {
      let result = await this.mapLogic.count({ id: map.id }, tx)
      return result.count == 1
    }))
  }
}

export class MapCreateValidator extends Validator {

  constructor(mapLogic: MapLogic, tx: PgTransaction) {
    super()

    this.add('id', new Absent)
    this.add(new MapValidator(mapLogic, tx))
  }
}

export class MapUpdateValidator extends Validator {

  constructor(mapLogic: MapLogic, tx: PgTransaction) {
    super()
    
    this.add(new MapIdValidator(mapLogic, tx))
    this.add(new MapValidator(mapLogic, tx))
  }
}

export class MapDeleteValidator extends Validator {
  
  constructor(mapLogic: MapLogic, tx: PgTransaction) {
    super()

    this.add(new MapIdValidator(mapLogic, tx))
  }
}
