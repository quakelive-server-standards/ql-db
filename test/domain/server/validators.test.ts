import { expect } from 'chai'
import 'mocha'
import { Server } from '../../../src/domain/server/Server'
import { ServerVisitValidator } from '../../../src/domain/serverVisit/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('server/validators.ts', function() {
  describe('ServerValidator', function() {
    it('should return a misfit if a server with the same ip and port already exists', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })

      let validator = new ServerVisitValidator(
        Services.get().playerLogic,
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
      let validator = new ServerVisitValidator(
        Services.get().playerLogic,
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
})