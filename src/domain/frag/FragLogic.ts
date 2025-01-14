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
import { ServerVisitLogic } from '../serverVisit/ServerVisitLogic'
import { txQuery } from '../txQuery'
import { Frag } from './Frag'
import { FragCreateValidator, FragDeleteValidator, FragUpdateValidator } from './validators'

let log = new Log('FragLogic.ts')

export class FragLogic {

  changeLogic!: ChangeLogic
  matchLogic!: MatchLogic
  matchParticipationLogic!: MatchParticipationLogic
  playerLogic!: PlayerLogic
  roundLogic!: RoundLogic
  serverLogic!: ServerLogic
  serverVisitLogic!: ServerVisitLogic

  create(frag: Frag, tx: PgTransaction): Promise<EntityResult<Frag>> {
    let l = log.mt('create')
    l.param('frag', frag)

    return tx.runInTransaction(async () => {
      let validator = new FragCreateValidator(this.matchLogic, this.matchParticipationLogic, this.playerLogic, this.roundLogic, this.serverLogic, this.serverVisitLogic, tx)
      let misfits = await validator.validate(frag)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'frag', 'postgres', txQuery(tx), frag)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<Frag>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: Frag[] = await read(schema, 'frag', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'frag', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(frag: Frag, tx: PgTransaction): Promise<EntityResult<Frag>> {
    let l = log.mt('update')
    l.param('frag', frag)

    return tx.runInTransaction(async () => {
      let validator = new FragUpdateValidator(this, this.matchLogic, this.matchParticipationLogic, this.playerLogic, this.roundLogic, this.serverLogic, this.serverVisitLogic, tx)
      let misfits = await validator.validate(frag)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'frag', 'postgres', txQuery(tx), frag)
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

  delete(frag: Frag, tx: PgTransaction): Promise<EntityResult<Frag>> {
    let l = log.mt('delete')
    l.var('frag', frag)

    return tx.runInTransaction(async () => {
      let validator = new FragDeleteValidator(this, tx)
      let misfits = await validator.validate(frag)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'frag', 'postgres', txQuery(tx), frag)
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