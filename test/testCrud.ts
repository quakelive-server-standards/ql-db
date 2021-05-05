import { Criteria, ReadCriteria } from 'knight-criteria'
import { count as crudCount, create as crudCreate, read as crudRead } from 'knight-orm'
import { PgTransaction } from 'knight-pg-transaction'
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