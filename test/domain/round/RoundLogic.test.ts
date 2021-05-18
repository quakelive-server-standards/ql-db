import { expect } from 'chai'
import 'mocha'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { Round } from '../../../src/domain/round/Round'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/RoundLogic.ts', function() {
  describe('create', function() {
    it('should create a round with all its rows', async function() {
      await create('match')
      await create('server')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
      let round = new Round

      round.finishDate = date1
      round.matchId = 1
      round.round = 1
      round.serverId = 1
      round.startDate = date2
      round.teamWon = TeamType.Blue
      round.time = 2

      let result = await Services.get().roundLogic.create(round, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.finishDate).to.deep.equal(date1)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.round).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.startDate).to.deep.equal(date2)
      expect(result.entity.teamWon).to.equal(TeamType.Blue)
      expect(result.entity.time).to.equal(2)
    })
  })

  describe('read', function() {
    it('should read a round with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('round', {
        finishDate: date1,
        matchId: 1,
        round: 1,
        serverId: 1,
        startDate: date2,
        teamWon: TeamType.Blue,
        time: 2,
      })
      
      let result = await Services.get().roundLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].finishDate).to.deep.equal(date1)
      expect(result.entities[0].matchId).to.equal(1)
      expect(result.entities[0].round).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
      expect(result.entities[0].startDate).to.deep.equal(date2)
      expect(result.entities[0].teamWon).to.equal(TeamType.Blue)
      expect(result.entities[0].time).to.equal(2)
    })

    it('should load all frags', async function() {
      await create('round')
      await create('frag', { roundId: 1 })
      await create('frag', { roundId: 1 })
      await create('frag', { roundId: 2 })

      let result = await Services.get().roundLogic.read({ frags: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].frags).to.be.not.undefined
      expect(result.entities[0].frags.length).to.equal(2)
      expect(result.entities[0].frags[0].id).to.equal(2)
      expect(result.entities[0].frags[1].id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('round', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().roundLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].match).to.be.not.undefined
      expect(result.entities[0].match.id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('round')
      await create('medal', { roundId: 1 })
      await create('medal', { roundId: 1 })
      await create('medal', { roundId: 2 })

      let result = await Services.get().roundLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].medals).to.be.not.undefined
      expect(result.entities[0].medals.length).to.equal(2)
      expect(result.entities[0].medals[0].id).to.equal(1)
      expect(result.entities[0].medals[1].id).to.equal(2)
    })

    it('should load all match participations', async function() {
      await create('round')
      await create('match_participation', { roundId: 1 })
      await create('match_participation', { roundId: 1 })
      await create('match_participation', { roundId: 2 })

      let result = await Services.get().roundLogic.read({ participations: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].participations).to.be.not.undefined
      expect(result.entities[0].participations.length).to.equal(2)
      expect(result.entities[0].participations[0].id).to.equal(1)
      expect(result.entities[0].participations[1].id).to.equal(2)
    })

    it('should load the server', async function() {
      await create('round', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().roundLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a round with all its rows', async function() {
      await create('match')
      await create('match')
      await create('server')
      await create('server')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('round', {
        finishDate: date1,
        matchId: 1,
        round: 1,
        serverId: 1,
        startDate: date2,
        teamWon: TeamType.Blue,
        time: 2,
      })

      let round = new Round
      round.id = 1
      round.finishDate = date2
      round.matchId = 2
      round.round = 2
      round.serverId = 2
      round.startDate = date1
      round.teamWon = TeamType.Red
      round.time = 3

      let result = await Services.get().roundLogic.update(round, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.finishDate).to.deep.equal(date2)
      expect(result.entity.matchId).to.equal(2)
      expect(result.entity.round).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
      expect(result.entity.startDate).to.deep.equal(date1)
      expect(result.entity.teamWon).to.equal(TeamType.Red)
      expect(result.entity.time).to.equal(3)
    })
  })

  describe('delete', function() {
    it('should delete a round', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
  
      await create('round', {
        finishDate: date1,
        matchId: 1,
        round: 1,
        serverId: 1,
        startDate: date2,
        teamWon: TeamType.Blue,
        time: 2,
      })

      let round = new Round
      round.id = 1

      let result = await Services.get().roundLogic.delete(round, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.finishDate).to.deep.equal(date1)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.round).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.startDate).to.deep.equal(date2)
      expect(result.entity.teamWon).to.equal(TeamType.Blue)
      expect(result.entity.time).to.equal(2)
    })
  })
})