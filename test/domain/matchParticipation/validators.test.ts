import { expect } from 'chai'
import 'mocha'
import { MatchParticipation } from '../../../src/domain/matchParticipation/MatchParticipation'
import { MatchParticipationValidator } from '../../../src/domain/matchParticipation/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('domain/matchParticipation/validators.ts', function() {
  describe('MatchParticipationValidator', function() {
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

      let validator = new MatchParticipationValidator(
        Services.get().matchLogic,
        Services.get().playerLogic,
        Services.get().roundLogic,
        Services.get().serverLogic,
        Services.get().serverVisitLogic,
        Services.get().statsLogic,
        tx()
      )

      let matchParticipation = new MatchParticipation
      matchParticipation.matchId = 2
      matchParticipation.playerId = 2
      matchParticipation.roundId = 2
      matchParticipation.serverId = 2
      matchParticipation.serverVisitId = 2
      matchParticipation.statsId = 2

      let misfits = await validator.validate(matchParticipation)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('serverVisitId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('statsId', 'Exists', misfits)).to.be.true
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
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')
      await create('stats')

      let validator = new MatchParticipationValidator(
        Services.get().matchLogic,
        Services.get().playerLogic,
        Services.get().roundLogic,
        Services.get().serverLogic,
        Services.get().serverVisitLogic,
        Services.get().statsLogic,
        tx()
      )

      let matchParticipation = new MatchParticipation
      matchParticipation.matchId = 2
      matchParticipation.playerId = 2
      matchParticipation.roundId = 2
      matchParticipation.serverId = 2
      matchParticipation.serverVisitId = 2
      matchParticipation.statsId = 2

      let misfits = await validator.validate(matchParticipation)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverVisitId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('statsId', 'Exists', misfits)).to.be.false
    })
  })
})