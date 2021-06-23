import { expect } from 'chai'
import 'mocha'
import { Match } from '../../../src/domain/match/Match'
import { MatchCreateValidator, MatchUpdateValidator, MatchValidator } from '../../../src/domain/match/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('domain/match/validators.ts', function() {
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

  describe('MatchCreateValidator', function() {
    it('should return a misfit if the guid is not unique', async function() {
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fc' })

      let validator = new MatchCreateValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().matchLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.guid = '95d60017-6adb-43bf-a146-c1757194d5fc'

      let misfits = await validator.validate(match)

      expect(containsMisfit('guid', 'Unique', misfits)).to.be.true
    })

    it('should not return a misfit if the guid is unique', async function() {
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fb' })

      let validator = new MatchCreateValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().matchLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.guid = '95d60017-6adb-43bf-a146-c1757194d5fc'

      let misfits = await validator.validate(match)

      expect(containsMisfit('guid', 'Unique', misfits)).to.be.false
    })
  })

  describe('MatchUpdateValidator', function() {
    it('should return a misfit if the guid is not unique', async function() {
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fb' })
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fc' })

      let validator = new MatchUpdateValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().matchLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.id = 1
      match.guid = '95d60017-6adb-43bf-a146-c1757194d5fc'

      let misfits = await validator.validate(match)

      expect(containsMisfit('guid', 'Unique', misfits)).to.be.true
    })

    it('should not return a misfit if the guid is unique', async function() {
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fb' })
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fc' })

      let validator = new MatchUpdateValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().matchLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.id = 1
      match.guid = '95d60017-6adb-43bf-a146-c1757194d5fd'

      let misfits = await validator.validate(match)

      expect(containsMisfit('guid', 'Unique', misfits)).to.be.false
    })

    it('should not return a misfit if the only match with the same guid is the same', async function() {
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fb' })
      await create('match', { guid: '95d60017-6adb-43bf-a146-c1757194d5fc' })

      let validator = new MatchUpdateValidator(
        Services.get().factoryLogic, 
        Services.get().mapLogic, 
        Services.get().matchLogic, 
        Services.get().serverLogic, 
        tx()
      )

      let match = new Match
      match.id = 1
      match.guid = '95d60017-6adb-43bf-a146-c1757194d5fb'

      let misfits = await validator.validate(match)

      expect(containsMisfit('guid', 'Unique', misfits)).to.be.false
    })
  })
})