import { expect } from 'chai'
import 'mocha'
import { Match } from '../../../src/domain/match/Match'
import { MatchValidator } from '../../../src/domain/match/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('match/validators.ts', function() {
  describe('MatchValidator', function() {
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

      let validator = new MatchValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.factoryId = 2
      match.mapId = 2
      match.serverId = 2

      let misfits = await validator.validate(match)

      expect(containsMisfit('factoryId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('mapId', 'Exists', misfits)).to.be.true
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

      await create('factory')
      await create('map')
      await create('server')

      let validator = new MatchValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.factoryId = 2
      match.mapId = 2
      match.serverId = 2

      let misfits = await validator.validate(match)

      expect(containsMisfit('factoryId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('mapId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
    })
  })
})