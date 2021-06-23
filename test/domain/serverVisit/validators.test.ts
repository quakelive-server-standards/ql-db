import { expect } from 'chai'
import 'mocha'
import { ServerVisit } from '../../../src/domain/serverVisit/ServerVisit'
import { ServerVisitValidator } from '../../../src/domain/serverVisit/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('domain/serverVisit/validators.ts', function() {
  describe('ServerVisitValidator', function() {
    it('should return misfits for invalid relationship ids', async function() {
      await create('factory')
      await create('frag')
      await create('map')
      await create('match')
      await create('match_participation')
      await create('medal')
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')

      let validator = new ServerVisitValidator(
        Services.get().playerLogic,
        Services.get().serverLogic,
        tx()
      )

      let serverVisit = new ServerVisit
      serverVisit.playerId = 2
      serverVisit.serverId = 2

      let misfits = await validator.validate(serverVisit)

      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.true
    })

    it('should not return misfits for valid relationship ids', async function() {
      await create('factory')
      await create('frag')
      await create('map')
      await create('match')
      await create('match_participation')
      await create('medal')
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')

      await create('player')
      await create('server')

      let validator = new ServerVisitValidator(
        Services.get().playerLogic,
        Services.get().serverLogic,
        tx()
      )

      let serverVisit = new ServerVisit
      serverVisit.playerId = 2
      serverVisit.serverId = 2

      let misfits = await validator.validate(serverVisit)

      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
    })
  })
})