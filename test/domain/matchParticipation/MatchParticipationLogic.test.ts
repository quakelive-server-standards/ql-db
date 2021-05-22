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

      let result = await Services.get().matchParticipationLogic.create(matchParticipation, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(matchParticipation.finishDate).to.deep.equal(date1)
      expect(matchParticipation.matchId).to.equal(1)
      expect(matchParticipation.playerId).to.equal(1)
      expect(matchParticipation.roundId).to.equal(1)
      expect(matchParticipation.serverId).to.equal(1)
      expect(matchParticipation.startDate).to.deep.equal(date2)
      expect(matchParticipation.statsId).to.equal(1)
      expect(matchParticipation.team).to.equal(TeamType.Blue)
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
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].finishDate).to.deep.equal(date1)
      expect(result.entities[0].matchId).to.equal(1)
      expect(result.entities[0].playerId).to.equal(1)
      expect(result.entities[0].roundId).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
      expect(result.entities[0].startDate).to.deep.equal(date2)
      expect(result.entities[0].statsId).to.equal(1)
      expect(result.entities[0].team).to.equal(TeamType.Blue)
    })

    it('should load all deaths', async function() {
      await create('match_participation')
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ deaths: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].deaths).to.be.not.undefined
      expect(result.entities[0].deaths.length).to.equal(2)
      expect(result.entities[0].deaths[0].id).to.equal(2)
      expect(result.entities[0].deaths[1].id).to.equal(1)
    })

    it('should load all kills', async function() {
      await create('match_participation')
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ kills: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].kills).to.be.not.undefined
      expect(result.entities[0].kills.length).to.equal(2)
      expect(result.entities[0].kills[0].id).to.equal(2)
      expect(result.entities[0].kills[1].id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('match_participation', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().matchParticipationLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].match).to.be.not.undefined
      expect(result.entities[0].match.id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('match_participation')
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 2 })

      let result = await Services.get().matchParticipationLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].medals).to.be.not.undefined
      expect(result.entities[0].medals.length).to.equal(2)
      expect(result.entities[0].medals[0].id).to.equal(1)
      expect(result.entities[0].medals[1].id).to.equal(2)
    })

    it('should load the player', async function() {
      await create('match_participation', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().matchParticipationLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].player).to.be.not.undefined
      expect(result.entities[0].player.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('match_participation', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().matchParticipationLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].round).to.be.not.undefined
      expect(result.entities[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('match_participation', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().matchParticipationLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })

    it('should load the stats', async function() {
      await create('match_participation', { statsId: 1 })
      await create('stats')
      await create('stats')

      let result = await Services.get().matchParticipationLogic.read({ stats: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].stats).to.be.not.undefined
      expect(result.entities[0].stats.id).to.equal(1)
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

      let result = await Services.get().matchParticipationLogic.update(matchParticipation, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.finishDate).to.deep.equal(date2)
      expect(result.entity.matchId).to.equal(2)
      expect(result.entity.playerId).to.equal(2)
      expect(result.entity.roundId).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
      expect(result.entity.startDate).to.deep.equal(date1)
      expect(result.entity.statsId).to.equal(2)
      expect(result.entity.team).to.equal(TeamType.Red)
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
      expect(result.entity.id).to.equal(1)
      expect(result.entity.finishDate).to.deep.equal(date1)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.startDate).to.deep.equal(date2)
      expect(result.entity.statsId).to.equal(1)
      expect(result.entity.team).to.equal(TeamType.Blue)
    })
  })
})