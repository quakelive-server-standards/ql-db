import { Result } from 'coderitter-api-remote-method-call'
import { Criteria, ReadCriteria } from 'knight-criteria'
import Log from 'knight-log'
import { count, create, delete_, read, update } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
import { MisfitsError } from 'knight-validation'
import { CountResult, CreateResult, DeleteResult, UpdateResult, VersionReadResult } from '../api'
import Change from '../change/Change'
import ChangeLogic from '../change/ChangeLogic'
import schema from '../DbSchema'
import { MatchLogic } from '../match/MatchLogic'
import { ServerLogic } from '../server/ServerLogic'
import { txQuery } from '../txQuery'
import { Round } from './Round'
import { RoundCreateValidator, RoundDeleteValidator, RoundUpdateValidator } from './validators'

let log = new Log('RoundLogic.ts')

export class RoundLogic {

  changeLogic!: ChangeLogic
  matchLogic!: MatchLogic
  serverLogic!: ServerLogic

  create(round: Round, tx: PgTransaction): Promise<CreateResult<Round>> {
    let l = log.mt('create')
    l.param('round', round)

    return tx.runInTransaction(async () => {
      let validator = new RoundCreateValidator(this.matchLogic, this.serverLogic, tx)
      let misfits = await validator.validate(round)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'round', 'postgres', txQuery(tx), round)
      l.dev('Created entity', created)

      let result = new CreateResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<VersionReadResult<Round>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Round[] = await read(schema, 'round', 'postgres', txQuery(tx), criteria)
      l.dev('Read entities', readed)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new VersionReadResult(readed, version)
    })
  }

  count(criteria: Criteria, tx: PgTransaction): Promise<CountResult> {
    let l = log.mt('count')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let counted = await count(schema, 'round', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(round: Round, tx: PgTransaction): Promise<UpdateResult<Round>> {
    let l = log.mt('update')
    l.param('round', round)

    return tx.runInTransaction(async () => {
      let validator = new RoundUpdateValidator(this, this.matchLogic, this.serverLogic, tx)
      let misfits = await validator.validate(round)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'round', 'postgres', txQuery(tx), round)
      l.dev('Updated entity', updated)

      // create change
      let change = new Change(updated, 'update')
      l.var('change', change)

      let changeCreateResult = await this.changeLogic.create(change, tx)
      l.user('changeCreateResult', changeCreateResult)

      if (changeCreateResult.isMisfits()) {
        throw new MisfitsError(changeCreateResult.misfits)
      }

      let result = new UpdateResult(updated)
      l.returning('Returning result...', result)
      return result
    })
  }

  delete(round: Round, tx: PgTransaction): Promise<DeleteResult<Round>> {
    let l = log.mt('delete')
    l.var('round', round)

    return tx.runInTransaction(async () => {
      let validator = new RoundDeleteValidator(this, tx)
      let misfits = await validator.validate(round)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'round', 'postgres', txQuery(tx), round)
      l.dev('Deleted entity', deleted)

      // create change
      let change = new Change(deleted, 'delete')
      l.var('change', change)

      let changeCreateResult = await this.changeLogic.create(change, tx)
      l.user('changeCreateResult', changeCreateResult)

      if (changeCreateResult.isMisfits()) {
        throw new MisfitsError(changeCreateResult.misfits)
      }

      let result = new DeleteResult(deleted)
      l.returning('Returning result...', result)
      return result      
    })
  }
}