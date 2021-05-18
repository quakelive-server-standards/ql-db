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
import { MatchLogic } from '../match/MatchLogic'
import { MatchParticipationLogic } from '../matchParticipation/MatchParticipationLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { txQuery } from '../txQuery'
import { Medal } from './Medal'
import { MedalCreateValidator, MedalDeleteValidator, MedalUpdateValidator } from './validators'

let log = new Log('MedalLogic.ts')

export class MedalLogic {

  changeLogic!: ChangeLogic
  matchLogic!: MatchLogic
  matchParticipationLogic!: MatchParticipationLogic
  playerLogic!: PlayerLogic
  roundLogic!: RoundLogic
  serverLogic!: ServerLogic

  create(medal: Medal, tx: PgTransaction): Promise<EntityResult<Medal>> {
    let l = log.mt('create')
    l.param('medal', medal)

    return tx.runInTransaction(async () => {
      let validator = new MedalCreateValidator(this.matchLogic, this.matchParticipationLogic, this.playerLogic, this.roundLogic, this.serverLogic, tx)
      let misfits = await validator.validate(medal)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'medal', 'postgres', txQuery(tx), medal)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Medal>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Medal[] = await read(schema, 'medal', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'medal', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(medal: Medal, tx: PgTransaction): Promise<EntityResult<Medal>> {
    let l = log.mt('update')
    l.param('medal', medal)

    return tx.runInTransaction(async () => {
      let validator = new MedalUpdateValidator(this, this.matchLogic, this.matchParticipationLogic, this.playerLogic, this.roundLogic, this.serverLogic, tx)
      let misfits = await validator.validate(medal)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'medal', 'postgres', txQuery(tx), medal)
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

  delete(medal: Medal, tx: PgTransaction): Promise<EntityResult<Medal>> {
    let l = log.mt('delete')
    l.var('medal', medal)

    return tx.runInTransaction(async () => {
      let validator = new MedalDeleteValidator(this, tx)
      let misfits = await validator.validate(medal)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'medal', 'postgres', txQuery(tx), medal)
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