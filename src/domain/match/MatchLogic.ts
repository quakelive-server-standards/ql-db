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
import { FactoryLogic } from '../factory/FactoryLogic'
import { MapLogic } from '../map/MapLogic'
import { CreateOrGetServerResult } from '../server/api'
import { ServerLogic } from '../server/ServerLogic'
import { txQuery } from '../txQuery'
import { Match } from './Match'
import { MatchCreateValidator, MatchDeleteValidator, MatchUpdateValidator } from './validators'

let log = new Log('MatchLogic.ts')

export class MatchLogic {

  changeLogic!: ChangeLogic
  factoryLogic!: FactoryLogic
  mapLogic!: MapLogic
  serverLogic!: ServerLogic

  create(match: Match, tx: PgTransaction): Promise<EntityResult<Match>> {
    let l = log.mt('create')
    l.param('match', match)

    return tx.runInTransaction(async () => {
      let validator = new MatchCreateValidator(this.factoryLogic, this.mapLogic, this.serverLogic, tx)
      let misfits = await validator.validate(match)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'match', 'postgres', txQuery(tx), match)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  createOrGet(guid: string, tx: PgTransaction): Promise<CreateOrGetResult<Match>> {
    let l = log.mt('createOrGet')
    l.param('guid', guid)

    return tx.runInTransaction(async () => {
      let readResult = await this.read({ guid: guid }, tx)

      if (readResult.entities.length == 1) {
        return new CreateOrGetResult(readResult.entities[0], false)
      }

      let match = new Match
      match.guid = guid

      let createResult = await this.create(match, tx)

      if (createResult.isMisfits()) {
        throw new MisfitsError(createResult.misfits)
      }

      return new CreateOrGetResult(createResult.entity, true)
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Match>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Match[] = await read(schema, 'match', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'match', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(match: Match, tx: PgTransaction): Promise<EntityResult<Match>> {
    let l = log.mt('update')
    l.param('match', match)

    return tx.runInTransaction(async () => {
      let validator = new MatchUpdateValidator(this.factoryLogic, this.mapLogic, this, this.serverLogic, tx)
      let misfits = await validator.validate(match)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'match', 'postgres', txQuery(tx), match)
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

  delete(match: Match, tx: PgTransaction): Promise<EntityResult<Match>> {
    let l = log.mt('delete')
    l.var('match', match)

    return tx.runInTransaction(async () => {
      let validator = new MatchDeleteValidator(this, tx)
      let misfits = await validator.validate(match)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'match', 'postgres', txQuery(tx), match)
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