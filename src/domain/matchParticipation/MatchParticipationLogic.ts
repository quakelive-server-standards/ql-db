import { Result } from 'coderitter-api-remote-method-call'
import { Criteria, ReadCriteria } from 'knight-criteria'
import Log from 'knight-log'
import { count, create, delete_, read, update } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
import { MisfitsError } from 'knight-validation'
import { CountResult, EntitiesVersionResult, EntityOrNullResult, EntityResult } from '../api'
import Change from '../change/Change'
import ChangeLogic from '../change/ChangeLogic'
import schema from '../DbSchema'
import { MatchLogic } from '../match/MatchLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { ServerVisitLogic } from '../serverVisit/ServerVisitLogic'
import { txQuery } from '../txQuery'
import { MatchParticipation } from './MatchParticipation'
import { MatchParticipationCreateValidator, MatchParticipationDeleteValidator, MatchParticipationUpdateValidator } from './validators'

let log = new Log('MatchParticipationLogic.ts')

export class MatchParticipationLogic {

  changeLogic!: ChangeLogic
  matchLogic!: MatchLogic
  playerLogic!: PlayerLogic
  roundLogic!: RoundLogic
  serverLogic!: ServerLogic
  serverVisitLogic!: ServerVisitLogic

  create(matchParticipation: MatchParticipation, tx: PgTransaction): Promise<EntityResult<MatchParticipation>> {
    let l = log.mt('create')
    l.param('matchParticipation', matchParticipation)

    return tx.runInTransaction(async () => {
      let validator = new MatchParticipationCreateValidator(this.matchLogic, this.playerLogic, this.roundLogic, this.serverLogic, this.serverVisitLogic, tx)
      let misfits = await validator.validate(matchParticipation)
      l.var('Validation resulted in the following misfits', misfits)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let created = await create(schema, 'match_participation', 'postgres', txQuery(tx), matchParticipation)
      l.dev('Created entity', created)

      let result = new EntityResult(created)
      l.returning('Returning result...', result)
      return result
    })
  }

  read(criteria: ReadCriteria, tx: PgTransaction): Promise<EntitiesVersionResult<MatchParticipation>> {
    let l = log.mt('read')
    l.param('criteria', criteria)

    return tx.runInTransaction(async () => {
      let readed: MatchParticipation[] = await read(schema, 'match_participation', 'postgres', txQuery(tx), criteria)
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
      let counted = await count(schema, 'match_participation', 'postgres', txQuery(tx), criteria)
      l.dev('Counted entities', counted)

      // fetching version
      let version = await this.changeLogic.latestVersion(tx)
      l.var('version', version)

      return new CountResult(counted)
    })
  }

  update(matchParticipation: MatchParticipation, tx: PgTransaction): Promise<EntityResult<MatchParticipation>> {
    let l = log.mt('update')
    l.param('matchParticipation', matchParticipation)

    return tx.runInTransaction(async () => {
      let validator = new MatchParticipationUpdateValidator(this, this.matchLogic, this.playerLogic, this.roundLogic, this.serverLogic, this.serverVisitLogic, tx)
      let misfits = await validator.validate(matchParticipation)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let updated = await update(schema, 'match_participation', 'postgres', txQuery(tx), matchParticipation)
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

  delete(matchParticipation: MatchParticipation, tx: PgTransaction): Promise<EntityResult<MatchParticipation>> {
    let l = log.mt('delete')
    l.var('matchParticipation', matchParticipation)

    return tx.runInTransaction(async () => {
      let validator = new MatchParticipationDeleteValidator(this, tx)
      let misfits = await validator.validate(matchParticipation)

      if (misfits.length > 0) {
        let result = Result.misfits(misfits)
        l.returning('There were misfits. Rolling back transaction and returning result containing misfits...', result)
        await tx.rollback()
        return result as any
      }

      let deleted = await delete_(schema, 'match_participation', 'postgres', txQuery(tx), matchParticipation)
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

  async getActive(serverId: number, playerId: number, tx: PgTransaction): Promise<EntityOrNullResult<MatchParticipation>> {
    let l = log.mt('getActive')
    l.param('serverId', serverId)
    l.param('playerId', playerId)

    return tx.runInTransaction(async () => {
      let readResult = await this.read({
        serverId: serverId,
        playerId: playerId,
        active: true,
        finishDate: null
      }, tx)

      l.var('readResult', readResult)

      if (readResult.entities.length == 0) {
        let result: EntityOrNullResult<MatchParticipation> = new EntityOrNullResult
        l.returning('Did not found any active server visits. Returning result...', result)
        return result
      }

      if (readResult.entities.length == 1) {
        let result = new EntityOrNullResult(readResult.entities[0])
        l.returning('Found exactly one active server visit. Returning result...', result)
        return result
      }

      l.dev('Found more than one active match participation. Determining latest...')

      let latestParticipation
      for (let participation of readResult.entities) {
        if (latestParticipation == null) {
          latestParticipation = participation
        }
        else if (latestParticipation.startDate!.getTime() < participation.startDate!.getTime()) {
          latestParticipation = participation
        }
      }

      let result = new EntityOrNullResult(latestParticipation)
      l.returning('Determined latest match participation. Returning result...', result)
      return result
    })
  }
}
