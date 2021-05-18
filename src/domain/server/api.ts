import { Result } from 'coderitter-api-remote-method-call'
import { Server } from './Server'

export class CreateOrGetServerResult extends Result {

  server: Server
  created: boolean

  constructor(server?: Server, created?: boolean) {
    super()

    this.server = server as any
    this.created = created as any
  }
}