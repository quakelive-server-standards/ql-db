import { expect } from 'chai'
import 'mocha'
import { Server } from '../../../src/domain/server/Server'
import { ServerCreateValidator, ServerUpdateValidator } from '../../../src/domain/server/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('domain/server/validators.ts', function() {
  describe('ServerCreateValidator', function() {
    it('should return a misfit if a server with the same ip and port already exists', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })

      let validator = new ServerCreateValidator(
        Services.get().serverLogic,
        tx()
      )

      let server = new Server
      server.ip = '127.0.0.1'
      server.port = 27960

      let misfits = await validator.validate(server)

      expect(containsMisfit(['ip', 'port'], 'Unique', misfits)).to.be.true
    })

    it('should not return a misfit if no server with the same ip and port already exists', async function() {
      let validator = new ServerCreateValidator(
        Services.get().serverLogic,
        tx()
      )

      let server = new Server
      server.ip = '127.0.0.1'
      server.port = 27960

      let misfits = await validator.validate(server)

      expect(containsMisfit(['ip', 'port'], 'Unique', misfits)).to.be.false
    })
  })

  describe('ServerUpdateValidator', function() {
    it('should return a misfit if a server with the same ip and port already exists', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })
      await create('server', { ip: '127.0.0.1', port: 27961 })

      let validator = new ServerUpdateValidator(
        Services.get().serverLogic,
        tx()
      )

      let server = new Server
      server.id = 1
      server.ip = '127.0.0.1'
      server.port = 27961

      let misfits = await validator.validate(server)

      expect(containsMisfit(['ip', 'port'], 'Unique', misfits)).to.be.true
    })

    it('should not return a misfit if a server with the same ip and port does not already exist', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })
      await create('server', { ip: '127.0.0.1', port: 27961 })

      let validator = new ServerUpdateValidator(
        Services.get().serverLogic,
        tx()
      )

      let server = new Server
      server.id = 1
      server.ip = '127.0.0.1'
      server.port = 27962

      let misfits = await validator.validate(server)

      expect(containsMisfit(['ip', 'port'], 'Unique', misfits)).to.be.false
    })

    it('should not return a misfit if a server with the same ip and port is the server that is being updated', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })
      await create('server', { ip: '127.0.0.1', port: 27961 })

      let validator = new ServerUpdateValidator(
        Services.get().serverLogic,
        tx()
      )

      let server = new Server
      server.id = 1
      server.ip = '127.0.0.1'
      server.port = 27960

      let misfits = await validator.validate(server)

      expect(containsMisfit(['ip', 'port'], 'Unique', misfits)).to.be.false
    })
  })
})