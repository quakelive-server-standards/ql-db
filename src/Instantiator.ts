import { Result } from 'coderitter-api-remote-method-call'
import { Changes } from 'knight-change'
import { CountResult } from './domain/api'
import Change from './domain/change/Change'

export default {
  // knight-change & knight-change
  'Changes': () => new Changes,
  'Change': () => new Change,

  // coderitter-api-remote-method-call
  'Result': () => new Result,

  // general API results
  'CountResult': () => new CountResult
} as {[ className: string ]: () => any }