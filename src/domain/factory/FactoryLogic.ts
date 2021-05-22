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
import { GameType } from '../enums/GameType'
import { txQuery } from '../txQuery'
import { Factory } from './Factory'
import { FactoryCreateValidator, FactoryDeleteValidator, FactoryUpdateValidator } from './validators'

let log = new Log('FactoryLogic.ts')

export class FactoryLogic {

  changeLogic!: ChangeLogic

  create(factory: Factory, tx: PgTransaction): Promise<EntityResult<Factory>> {
    let l = log.mt('create')
    l.param('factory', factory)

    return tx.runInTransaction(async () => {
      let validator = new FactoryCreateValidator()
      let misfits = await validator.validate(factory)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'factory', 'postgres', txQuery(tx), factory)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  createOrGet(name: string, title: string, gameType: GameType, tx: PgTransaction): Promise<CreateOrGetResult<Factory>> {
    let l = log.mt('createOrGet')
    l.param('name', name)
    l.param('title', title)
    l.param('gameType', gameType)

    return tx.runInTransaction(async () => {
      let readResult = await this.read({ name: name, gameType: gameType }, tx)

      if (readResult.entities.length == 1) {
        let existingFactory = readResult.entities[0]

        if (existingFactory.title != title) {
          existingFactory.title = title

          let factoryUpdateResult = await this.update(existingFactory, tx)

          if (factoryUpdateResult.isMisfits()) {
            throw new MisfitsError(factoryUpdateResult.misfits)
          }
        }

        return new CreateOrGetResult(existingFactory, false)
      }

      let factory = new Factory
      factory.name = name
      factory.title = title
      factory.gameType = gameType

      let createResult = await this.create(factory, tx)

      if (createResult.isMisfits()) {
        throw new MisfitsError(createResult.misfits)
      }

      return new CreateOrGetResult(createResult.entity, true)
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Factory>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Factory[] = await read(schema, 'factory', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'factory', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(factory: Factory, tx: PgTransaction): Promise<EntityResult<Factory>> {
    let l = log.mt('update')
    l.param('factory', factory)

    return tx.runInTransaction(async () => {
      let validator = new FactoryUpdateValidator(this, tx)
      let misfits = await validator.validate(factory)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'factory', 'postgres', txQuery(tx), factory)
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

  delete(factory: Factory, tx: PgTransaction): Promise<EntityResult<Factory>> {
    let l = log.mt('delete')
    l.var('factory', factory)

    return tx.runInTransaction(async () => {
      let validator = new FactoryDeleteValidator(this, tx)
      let misfits = await validator.validate(factory)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'factory', 'postgres', txQuery(tx), factory)
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