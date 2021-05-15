import { expect } from 'chai'
import 'mocha'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { MatchParticipation } from '../../../src/domain/matchParticipation/MatchParticipation'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/MatchParticipationLogic.ts', function() {
  describe('create', function() {
    it('should create a matchParticipation with all its rows', async function() {
      await create('match')
      await create('player')
      await create('round')
      await create('server')
      await create('stats')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      let matchParticipation = new MatchParticipation

      matchParticipation.finishDate = date1
      matchParticipation.matchId = 1
      matchParticipation.playerId = 1
      matchParticipation.roundId = 1
      matchParticipation.serverId = 1
      matchParticipation.startDate = date2
      matchParticipation.statsId = 1
      matchParticipation.team = TeamType.Blue
      matchParticipation.warmup = true

      let result = await Services.get().matchParticipationLogic.create(matchParticipation, tx())

      expect(result.isValue()).to.be.true
      expect(result.created.id).to.equal(1)
      expect(matchParticipation.finishDate).to.deep.equal(date1)
      expect(matchParticipation.matchId).to.equal(1)
      expect(matchParticipation.playerId).to.equal(1)
      expect(matchParticipation.roundId).to.equal(1)
      expect(matchParticipation.serverId).to.equal(1)
      expect(matchParticipation.startDate).to.deep.equal(date2)
      expect(matchParticipation.statsId).to.equal(1)
      expect(matchParticipation.team).to.equal(TeamType.Blue)
      expect(matchParticipation.warmup).to.equal(true)
    })
  })

  describe('read', function() {
    it('should read a matchParticipation with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        finishDate: date1,
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        startDate: date2,
        statsId: 1,
        team: TeamType.Blue,
        warmup: true,
      })
      
      let result = await Services.get().matchParticipationLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.read.length).to.equal(1)
      expect(result.read[0].id).to.equal(1)
      expect(result.read[0].finishDate).to.deep.equal(date1)
      expect(result.read[0].matchId).to.equal(1)
      expect(result.read[0].playerId).to.equal(1)
      expect(result.read[0].roundId).to.equal(1)
      expect(result.read[0].serverId).to.equal(1)
      expect(result.read[0].startDate).to.deep.equal(date2)
      expect(result.read[0].statsId).to.equal(1)
      expect(result.read[0].team).to.equal(TeamType.Blue)
      expect(result.read[0].warmup).to.equal(true)
    })

    it('should load all deaths', async function() {
      await create('match_participation')
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ deaths: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].deaths).to.be.not.undefined
      expect(result.read[0].deaths.length).to.equal(2)
      expect(result.read[0].deaths[0].id).to.equal(2)
      expect(result.read[0].deaths[1].id).to.equal(1)
    })

    it('should load all kills', async function() {
      await create('match_participation')
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ kills: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].kills).to.be.not.undefined
      expect(result.read[0].kills.length).to.equal(2)
      expect(result.read[0].kills[0].id).to.equal(2)
      expect(result.read[0].kills[1].id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('match_participation', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().matchParticipationLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].match).to.be.not.undefined
      expect(result.read[0].match.id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('match_participation')
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 2 })

      let result = await Services.get().matchParticipationLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].medals).to.be.not.undefined
      expect(result.read[0].medals.length).to.equal(2)
      expect(result.read[0].medals[0].id).to.equal(1)
      expect(result.read[0].medals[1].id).to.equal(2)
    })

    it('should load the player', async function() {
      await create('match_participation', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().matchParticipationLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].player).to.be.not.undefined
      expect(result.read[0].player.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('match_participation', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().matchParticipationLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].round).to.be.not.undefined
      expect(result.read[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('match_participation', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().matchParticipationLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].server).to.be.not.undefined
      expect(result.read[0].server.id).to.equal(1)
    })

    it('should load the stats', async function() {
      await create('match_participation', { statsId: 1 })
      await create('stats')
      await create('stats')

      let result = await Services.get().matchParticipationLogic.read({ stats: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].stats).to.be.not.undefined
      expect(result.read[0].stats.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a matchParticipation with all its rows', async function() {
      await create('match')
      await create('match')
      await create('player')
      await create('player')
      await create('round')
      await create('round')
      await create('server')
      await create('server')
      await create('stats')
      await create('stats')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        finishDate: date1,
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        startDate: date2,
        statsId: 1,
        team: TeamType.Blue,
        warmup: true,
      })

      let matchParticipation = new MatchParticipation
      matchParticipation.id = 1
      matchParticipation.finishDate = date2
      matchParticipation.matchId = 2
      matchParticipation.playerId = 2
      matchParticipation.roundId = 2
      matchParticipation.serverId = 2
      matchParticipation.startDate = date1
      matchParticipation.statsId = 2
      matchParticipation.team = TeamType.Red
      matchParticipation.warmup = false

      let result = await Services.get().matchParticipationLogic.update(matchParticipation, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.updated.id).to.equal(1)
      expect(result.updated.finishDate).to.deep.equal(date2)
      expect(result.updated.matchId).to.equal(2)
      expect(result.updated.playerId).to.equal(2)
      expect(result.updated.roundId).to.equal(2)
      expect(result.updated.serverId).to.equal(2)
      expect(result.updated.startDate).to.deep.equal(date1)
      expect(result.updated.statsId).to.equal(2)
      expect(result.updated.team).to.equal(TeamType.Red)
      expect(result.updated.warmup).to.equal(false)
    })
  })

  describe('delete', function() {
    it('should delete a matchParticipation', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        finishDate: date1,
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        startDate: date2,
        statsId: 1,
        team: TeamType.Blue,
        warmup: true,
      })

      let matchParticipation = new MatchParticipation
      matchParticipation.id = 1

      let result = await Services.get().matchParticipationLogic.delete(matchParticipation, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.deleted.id).to.equal(1)
      expect(result.deleted.finishDate).to.deep.equal(date1)
      expect(result.deleted.matchId).to.equal(1)
      expect(result.deleted.playerId).to.equal(1)
      expect(result.deleted.roundId).to.equal(1)
      expect(result.deleted.serverId).to.equal(1)
      expect(result.deleted.startDate).to.deep.equal(date2)
      expect(result.deleted.statsId).to.equal(1)
      expect(result.deleted.team).to.equal(TeamType.Blue)
      expect(result.deleted.warmup).to.equal(true)
    })
  })
})