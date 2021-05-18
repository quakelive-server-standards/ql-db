import { Result } from 'coderitter-api-remote-method-call'
import { Criteria, ReadCriteria } from 'knight-criteria'
import Log from 'knight-log'
import { count, create, delete_, read, update } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
import { MisfitsError } from 'knight-validation'
import { CountResult, EntitiesVersionResult, EntityResult } from '../api'
import Change from '../change/Change'
import ChangeLogic from '../change/ChangeLogic'
import schema from '../DbSchema'
import { txQuery } from '../txQuery'
import { CreateOrGetServerResult } from './api'
import { Server } from './Server'
import { ServerCreateValidator, ServerDeleteValidator, ServerUpdateValidator } from './validators'

let log = new Log('ServerLogic.ts')

export class ServerLogic {

  changeLogic!: ChangeLogic

  create(server: Server, tx: PgTransaction): Promise<EntityResult<Server>> {
    let l = log.mt('create')
    l.param('server', server)

    return tx.runInTransaction(async () => {
      let validator = new ServerCreateValidator(this, tx)
      let misfits = await validator.validate(server)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'server', 'postgres', txQuery(tx), server)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  createOrGet(ip: string, port: number, tx: PgTransaction): Promise<CreateOrGetServerResult> {
    let l = log.mt('createOrGet')
    l.param('ip', ip)
    l.param('port', port)

    return tx.runInTransaction(async () => {
      let readResult = await this.read({ ip: ip, port: port}, tx)

      if (readResult.entities.length == 1) {
        return new CreateOrGetServerResult(readResult.entities[0], false)
      }

      let server = new Server
      server.ip = ip
      server.port = port

      let createResult = await this.create(server, tx)

      if (createResult.isMisfits()) {
        throw new MisfitsError(createResult.misfits)
      }

      return new CreateOrGetServerResult(createResult.entity, true)
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Server>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Server[] = await read(schema, 'server', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'server', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(server: Server, tx: PgTransaction): Promise<EntityResult<Server>> {
    let l = log.mt('update')
    l.param('server', server)

    return tx.runInTransaction(async () => {
      let validator = new ServerUpdateValidator(this, tx)
      let misfits = await validator.validate(server)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'server', 'postgres', txQuery(tx), server)
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

  delete(server: Server, tx: PgTransaction): Promise<EntityResult<Server>> {
    let l = log.mt('delete')
    l.var('server', server)

    return tx.runInTransaction(async () => {
      let validator = new ServerDeleteValidator(this, tx)
      let misfits = await validator.validate(server)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'server', 'postgres', txQuery(tx), server)
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