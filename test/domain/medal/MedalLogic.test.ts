import { expect } from 'chai'
import 'mocha'
import { MedalType } from '../../../src/domain/enums/MedalType'
import { Medal } from '../../../src/domain/medal/Medal'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/MedalLogic.ts', function() {
  describe('create', function() {
    it('should create a medal with all its rows', async function() {
      await create('match')
      await create('match_participation')
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')

      let now = new Date
      let medal = new Medal

      medal.date = now
      medal.matchId = 1
      medal.matchParticipationId = 1
      medal.medal = MedalType.Accuracy
      medal.playerId = 1
      medal.roundId = 1
      medal.serverId = 1
      medal.serverVisitId = 1
      medal.warmup = true

      let result = await Services.get().medalLogic.create(medal, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.date).to.deep.equal(now)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.matchParticipationId).to.equal(1)
      expect(result.entity.medal).to.equal(MedalType.Accuracy)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.serverVisitId).to.equal(1)
      expect(result.entity.warmup).to.equal(true)
    })
  })

  describe('read', function() {
    it('should read a medal with all its rows', async function() {
      let now = new Date

      await create('medal', {
        date: now,
        matchId: 1,
        matchParticipationId: 1,
        medal: MedalType.Accuracy,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,
        warmup: true,
      })
      
      let result = await Services.get().medalLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].date).to.deep.equal(now)
      expect(result.entities[0].matchId).to.equal(1)
      expect(result.entities[0].matchParticipationId).to.equal(1)
      expect(result.entities[0].medal).to.equal(MedalType.Accuracy)
      expect(result.entities[0].playerId).to.equal(1)
      expect(result.entities[0].roundId).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
      expect(result.entities[0].serverVisitId).to.equal(1)
      expect(result.entities[0].warmup).to.equal(true)
    })

    it('should load the match', async function() {
      await create('medal', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().medalLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].match).to.be.not.undefined
      expect(result.entities[0].match.id).to.equal(1)
    })

    it('should load the match participation', async function() {
      await create('medal', { matchParticipationId: 1 })
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().medalLogic.read({ matchParticipation: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].matchParticipation).to.be.not.undefined
      expect(result.entities[0].matchParticipation.id).to.equal(1)
    })

    it('should load the player', async function() {
      await create('medal', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().medalLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].player).to.be.not.undefined
      expect(result.entities[0].player.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('medal', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().medalLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].round).to.be.not.undefined
      expect(result.entities[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('medal', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().medalLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })

    it('should load the server visit', async function() {
      await create('medal', { serverVisitId: 1 })
      await create('server_visit')
      await create('server_visit')

      let result = await Services.get().medalLogic.read({ serverVisit: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].serverVisit).to.be.not.undefined
      expect(result.entities[0].serverVisit.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a medal with all its rows', async function() {
      await create('match')
      await create('match')
      await create('match_participation')
      await create('match_participation')
      await create('player')
      await create('player')
      await create('round')
      await create('round')
      await create('server')
      await create('server')
      await create('server_visit')
      await create('server_visit')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('medal', {
        date: date1,
        matchId: 1,
        matchParticipationId: 1,
        medal: MedalType.Accuracy,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,
        warmup: true,
      })

      let medal = new Medal
      medal.id = 1
      medal.date = date2
      medal.matchId = 2
      medal.matchParticipationId = 2
      medal.medal = MedalType.Assists
      medal.playerId = 2
      medal.roundId = 2
      medal.serverId = 2
      medal.serverVisitId = 2
      medal.warmup = false

      let result = await Services.get().medalLogic.update(medal, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.date).to.deep.equal(date2)
      expect(result.entity.matchId).to.equal(2)
      expect(result.entity.matchParticipationId).to.equal(2)
      expect(result.entity.medal).to.equal(MedalType.Assists)
      expect(result.entity.playerId).to.equal(2)
      expect(result.entity.roundId).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
      expect(result.entity.serverVisitId).to.equal(2)
      expect(result.entity.warmup).to.equal(false)
    })
  })

  describe('delete', function() {
    it('should delete a medal', async function() {
      let now = new Date

      await create('medal', {
        date: now,
        matchId: 1,
        matchParticipationId: 1,
        medal: MedalType.Accuracy,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,
        warmup: true,
      })

      let medal = new Medal
      medal.id = 1

      let result = await Services.get().medalLogic.delete(medal, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.date).to.deep.equal(now)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.matchParticipationId).to.equal(1)
      expect(result.entity.medal).to.equal(MedalType.Accuracy)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.serverVisitId).to.equal(1)
      expect(result.entity.warmup).to.equal(true)
    })
  })
})