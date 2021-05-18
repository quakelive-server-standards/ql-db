import { Criteria, ReadCriteria } from 'knight-criteria'
import { count as crudCount, create as crudCreate, read as crudRead } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
import { Misfit } from 'knight-validation'
import schema from '../src/domain/DbSchema'
import Services from '../src/Services'

export function tx() {
  return new PgTransaction(Services.get().pool)
}

export function create(tableName: string, instance: any = {}) {
  return crudCreate(schema, tableName, 'postgres', queryFn, instance)
}
    
export function read<T>(tableName: string, criteria: ReadCriteria = {}) {
  return crudRead<T>(schema, tableName, 'postgres', queryFn, criteria)
}
    
export function count(tableName: string, criteria: Criteria = {}) {
  return crudCount(schema, tableName, 'postgres', queryFn, criteria)
}

export async function queryFn(sqlString: string, values?: any[]) {
  let tx = new PgTransaction(Services.get().pool)
  let result = await tx.query(sqlString, values)
  return result.rows
}

export function containsMisfit(fieldOrFields: string|string[], misfitType: string, misfits: Misfit[]): boolean {
  for (let misfit of misfits) {
    if (typeof fieldOrFields == 'string' && misfit.field == fieldOrFields && misfit.name == misfitType) {
      return true
    }
    else if (fieldOrFields instanceof Array && misfit.fields != undefined && misfit.fields.length == fieldOrFields.length) {
      let fieldsMatch = true
      for (let field of fieldOrFields) {
        if (! (field in misfit.fields)) {
          fieldsMatch = false
          break
        }
      }

      if (fieldsMatch) {
        return true
      }
    }
  }

  return false
}