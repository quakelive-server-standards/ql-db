import { Result } from 'coderitter-api-remote-method-call'

export class VersionResult extends Result {
  
  version?: number

  constructor(version?: number) {
    super()
    this.version = version
  } 
}

export class CreateResult<T> extends Result {
  created: T

  constructor(created: T) {
    super()
    this.created = created
  }
}

export class ReadResult<T> extends Result {
  read: T[]

  constructor(read: T[]) {
    super()
    this.read = read
  }
}

export class VersionReadResult<T> extends VersionResult {
  read: T[]

  constructor(read: T[], version: number) {
    super(version)
    this.read = read
  }
}

export class CountResult extends Result {
  count: number

  constructor(count?: number) {
    super()
    this.count = count as any
  }
}

export class UpdateResult<T> extends Result {
  updated: T

  constructor(updated: T) {
    super()
    this.updated = updated
  }
}

export class DeleteResult<T> extends Result {
  deleted: T

  constructor(deleted: T) {
    super()
    this.deleted = deleted
  }
}