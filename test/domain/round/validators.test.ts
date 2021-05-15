import { expect } from 'chai'
import 'mocha'
import { Round } from '../../../src/domain/round/Round'
import { RoundValidator } from '../../../src/domain/round/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('round/validators.ts', function() {
  describe('RoundValidator', function() {
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
      await create('stats')

      let validator = new RoundValidator(
        Services.get().matchLogic,
        Services.get().serverLogic,
        tx()
      )

      let round = new Round
      round.matchId = 2
      round.serverId = 2

      let misfits = await validator.validate(round)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.true
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
      await create('stats')

      await create('match')
      await create('server')

      let validator = new RoundValidator(
        Services.get().matchLogic,
        Services.get().serverLogic,
        tx()
      )

      let round = new Round
      round.matchId = 2
      round.serverId = 2

      let misfits = await validator.validate(round)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
    })
  })
})