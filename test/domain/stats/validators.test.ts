import { expect } from 'chai'
import 'mocha'
import { Medal } from '../../../src/domain/medal/Medal'
import { Stats } from '../../../src/domain/stats/Stats'
import { StatsValidator } from '../../../src/domain/stats/validators'
import Services from '../../../src/Services'
import { containsMisfit, create, tx } from '../../tools'

describe('stats/validators.ts', function() {
  describe('StatsValidator', function() {
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

      let validator = new StatsValidator(
        Services.get().matchLogic,
        Services.get().matchParticipationLogic,
        Services.get().playerLogic,
        Services.get().roundLogic,
        Services.get().serverLogic,
        Services.get().serverVisitLogic,
        tx()
      )

      let stats = new Stats
      stats.matchId = 2
      stats.matchParticipationId = 2
      stats.playerId = 2
      stats.roundId = 2
      stats.serverId = 2
      stats.serverVisitId = 2

      let misfits = await validator.validate(stats)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('matchParticipationId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.true
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.true
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
      await create('stats')

      await create('match')
      await create('match_participation')
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')

      let validator = new StatsValidator(
        Services.get().matchLogic,
        Services.get().matchParticipationLogic,
        Services.get().playerLogic,
        Services.get().roundLogic,
        Services.get().serverLogic,
        Services.get().serverVisitLogic,
        tx()
      )

      let medal = new Medal
      medal.matchId = 2
      medal.matchParticipationId = 2
      medal.playerId = 2
      medal.roundId = 2
      medal.serverId = 2
      medal.serverVisitId = 2

      let misfits = await validator.validate(medal)

      expect(containsMisfit('matchId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('matchParticipationId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('playerId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('roundId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverId', 'Exists', misfits)).to.be.false
      expect(containsMisfit('serverVisitId', 'Exists', misfits)).to.be.false
    })
  })
})