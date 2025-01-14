import { expect } from 'chai'
import 'mocha'
import { Frag, FragParticipant } from '../../../src/domain/frag/Frag'
import { FragParticipantValidator, FragValidator } from '../../../src/domain/frag/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('domain/frag/validators.ts', function() {
  describe('FragValidator', function() {
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

      let validator = new FragValidator(
        Services.get().matchLogic, 
        Services.get().matchParticipationLogic, 
        Services.get().playerLogic, 
        Services.get().roundLogic, 
        Services.get().serverLogic, 
        Services.get().serverVisitLogic, 
        tx()
      )

      let frag = new Frag
      frag.matchId = 2
      frag.roundId = 2
      frag.serverId = 2

      let misfits = await validator.validate(frag)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.true
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

      await create('match')
      await create('round')
      await create('server')

      let validator = new FragValidator(
        Services.get().matchLogic, 
        Services.get().matchParticipationLogic, 
        Services.get().playerLogic, 
        Services.get().roundLogic, 
        Services.get().serverLogic, 
        Services.get().serverVisitLogic, 
        tx()
      )

      let frag = new Frag
      frag.matchId = 2
      frag.roundId = 2
      frag.serverId = 2

      let misfits = await validator.validate(frag)
      
      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
    })
  })

  describe('FragParticipantValidator', function() {
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

      let validator = new FragParticipantValidator(
        Services.get().playerLogic, 
        Services.get().matchParticipationLogic, 
        Services.get().serverVisitLogic, 
        tx()
      )

      let fragParticipant = new FragParticipant
      fragParticipant.playerId = 2
      fragParticipant.matchParticipationId = 2
      fragParticipant.serverVisitId = 2

      let misfits = await validator.validate(fragParticipant)

      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('matchParticipationId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('serverVisitId', 'Exists', misfits)).to.be.true
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
      await create('match_participation')
      await create('server_visit')
      
      let validator = new FragParticipantValidator(
        Services.get().playerLogic, 
        Services.get().matchParticipationLogic, 
        Services.get().serverVisitLogic, 
        tx()
      )

      let fragParticipant = new FragParticipant
      fragParticipant.playerId = 2
      fragParticipant.matchParticipationId = 2
      fragParticipant.serverVisitId = 2

      let misfits = await validator.validate(fragParticipant)

      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('matchParticipationId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverVisitId', 'Exists', misfits)).to.be.false
    })
  })
})