import { Result } from 'coderitter-api-remote-method-call'
import Change from './Change'

export class ChangeCreateResult extends Result {
  change: Change

  constructor(change?: Change) {
    super()
    this.change = change as any
  }
}

export class ChangeReadResult extends Result {
  changes: Change[]

  constructor(changes?: Change[]) {
    super()
    this.changes = changes as any
  }
}