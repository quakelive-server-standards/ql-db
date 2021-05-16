import { Result } from 'coderitter-api-remote-method-call'
import { Changes } from 'knight-change'
import { CountResult, CreateResult, DeleteResult, ReadResult, UpdateResult, VersionReadResult } from './domain/api'
import Change from './domain/change/Change'

export default {
  // change
  'Changes': () => new Changes,
  'Change': () => new Change,

  // Common results
  'Result': () => new Result,
  'CreateResult': () => new CreateResult,
  'ReadResult': () => new ReadResult,
  'CountResult': () => new CountResult,
  'UpdateResult': () => new UpdateResult,
  'DeleteResult': () => new DeleteResult,
  'VersionReadResult': () => new VersionReadResult
} as {[ className: string ]: () => any }