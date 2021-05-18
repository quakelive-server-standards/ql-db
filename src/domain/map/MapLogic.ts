import { Result } from 'coderitter-api-remote-method-call'
import { Criteria, ReadCriteria } from 'knight-criteria'
import Log from 'knight-log'
import { count, create, delete_, read, update } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
import { MisfitsError } from 'knight-validation'
import { CountResult, CreateOrGetResult, EntitiesVersionResult, EntityResult } from '../api'
import Change from '../change/Change'
import ChangeLogic from '../change/ChangeLogic'
import schema from '../DbSchema'
import { txQuery } from '../txQuery'
import { Map } from './Map'
import { MapCreateValidator, MapDeleteValidator, MapUpdateValidator } from './validators'

let log = new Log('MapLogic.ts')

export class MapLogic {

  changeLogic!: ChangeLogic

  create(map: Map, tx: PgTransaction): Promise<EntityResult<Map>> {
    let l = log.mt('create')
    l.param('map', map)

    return tx.runInTransaction(async () => {
      let validator = new MapCreateValidator(this, tx)
      let misfits = await validator.validate(map)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'map', 'postgres', txQuery(tx), map)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  createOrGet(name: string, tx: PgTransaction): Promise<CreateOrGetResult<Map>> {
    let l = log.mt('createOrGet')
    l.param('name', name)

    return tx.runInTransaction(async () => {
      let readResult = await this.read({ name: name }, tx)

      if (readResult.entities.length == 1) {
        return new CreateOrGetResult(readResult.entities[0], false)
      }

      let map = new Map
      map.name = name

      let createResult = await this.create(map, tx)

      if (createResult.isMisfits()) {
        throw new MisfitsError(createResult.misfits)
      }

      return new CreateOrGetResult(createResult.entity, true)
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Map>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Map[] = await read(schema, 'map', 'postgres', txQuery(tx), criteria)
      l.dev('Read entities', readed)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new EntitiesVersionResult(readed, version)
    })
  }

  count(criteria: Criteria, tx: PgTransaction): Promise<CountResult> {
    let l = log.mt('count')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let counted = await count(schema, 'map', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(map: Map, tx: PgTransaction): Promise<EntityResult<Map>> {
    let l = log.mt('update')
    l.param('map', map)

    return tx.runInTransaction(async () => {
      let validator = new MapUpdateValidator(this, tx)
      let misfits = await validator.validate(map)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'map', 'postgres', txQuery(tx), map)
      l.dev('Updated entity', updated)

      // create change
      let change = new Change(updated, 'update')
      l.var('change', change)

      let changeCreateResult = await this.changeLogic.create(change, tx)
      l.user('changeCreateResult', changeCreateResult)

      if (changeCreateResult.isMisfits()) {
        throw new MisfitsError(changeCreateResult.misfits)
      }

      let result = new EntityResult(updated)
      l.returning('Returning result...', result)
      return result
    })
  }

  delete(map: Map, tx: PgTransaction): Promise<EntityResult<Map>> {
    let l = log.mt('delete')
    l.var('map', map)

    return tx.runInTransaction(async () => {
      let validator = new MapDeleteValidator(this, tx)
      let misfits = await validator.validate(map)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'map', 'postgres', txQuery(tx), map)
      l.dev('Deleted entity', deleted)

      // create change
      let change = new Change(deleted, 'delete')
      l.var('change', change)

      let changeCreateResult = await this.changeLogic.create(change, tx)
      l.user('changeCreateResult', changeCreateResult)

      if (changeCreateResult.isMisfits()) {
        throw new MisfitsError(changeCreateResult.misfits)
      }

      let result = new EntityResult(deleted)
      l.returning('Returning result...', result)
      return result      
    })
  }
}