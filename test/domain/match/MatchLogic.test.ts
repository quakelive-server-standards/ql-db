import { expect } from 'chai'
import 'mocha'
import { Cvars } from '../../../src/domain/match/Cvars'
import { Match } from '../../../src/domain/match/Match'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/MatchLogic.ts', function() {
  describe('create', function() {
    it('should create a match with all its rows', async function() {
      await create('server')
      await create('factory')
      await create('map')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
      let match = new Match

      match.aborted = true
      match.cvars = new Cvars
      match.cvars.capturelimit = 1
      match.cvars.fraglimit = 2
      match.cvars.g_instagib = true
      match.cvars.g_quadHog = true
      match.cvars.g_training = true
      match.cvars.mercylimit = 3
      match.cvars.roundlimit = 4
      match.cvars.scorelimit = 5
      match.cvars.timelimit = 6
      match.exitMessage = 'Exit'
      match.factoryId = 1
      match.finishDate = date1
      match.guid = '012345678901234567890123456789012345'
      match.lastLeadChangeTime = 7
      match.length = 8
      match.mapId = 1
      match.restarted = true
      match.score1 = 9
      match.score2 = 10
      match.serverId = 1
      match.startDate = date2

      let result = await Services.get().matchLogic.create(match, tx())

      expect(result.isValue()).to.be.true
      expect(result.created.id).to.equal(1)
      expect(result.created.aborted).to.equal(true)
      expect(result.created.cvars.capturelimit).to.equal(1)
      expect(result.created.cvars.fraglimit).to.equal(2)
      expect(result.created.cvars.g_instagib).to.equal(true)
      expect(result.created.cvars.g_quadHog).to.equal(true)
      expect(result.created.cvars.g_training).to.equal(true)
      expect(result.created.cvars.mercylimit).to.equal(3)
      expect(result.created.cvars.roundlimit).to.equal(4)
      expect(result.created.cvars.scorelimit).to.equal(5)
      expect(result.created.cvars.timelimit).to.equal(6)
      expect(result.created.exitMessage).to.equal('Exit')
      expect(result.created.factoryId).to.equal(1)
      expect(result.created.finishDate).to.deep.equal(date1)
      expect(result.created.guid).to.equal('012345678901234567890123456789012345')
      expect(result.created.lastLeadChangeTime).to.equal(7)
      expect(result.created.length).to.equal(8)
      expect(result.created.mapId).to.equal(1)
      expect(result.created.restarted).to.equal(true)
      expect(result.created.score1).to.equal(9)
      expect(result.created.score2).to.equal(10)
      expect(result.created.serverId).to.equal(1)
      expect(result.created.startDate).to.deep.equal(date2)
    })
  })

  describe('read', function() {
    it('should read a match with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match', {
        aborted: true,
        cvars: {
          capturelimit: 1,
          fraglimit: 2,
          g_instagib: true,
          g_quadHog: true,
          g_training: true,
          mercylimit: 3,
          roundlimit: 4,
          scorelimit: 5,
          timelimit: 6,
        },
        exitMessage: 'Exit',
        factoryId: 1,
        finishDate: date1,
        guid: '012345678901234567890123456789012345',
        lastLeadChangeTime: 7,
        length: 8,
        mapId: 1,
        restarted: true,
        score1: 9,
        score2: 10,
        serverId: 1,
        startDate: date2,
      })
      
      let result = await Services.get().matchLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.read[0].id).to.equal(1)
      expect(result.read[0].aborted).to.equal(true)
      expect(result.read[0].cvars.capturelimit).to.equal(1)
      expect(result.read[0].cvars.fraglimit).to.equal(2)
      expect(result.read[0].cvars.g_instagib).to.equal(true)
      expect(result.read[0].cvars.g_quadHog).to.equal(true)
      expect(result.read[0].cvars.g_training).to.equal(true)
      expect(result.read[0].cvars.mercylimit).to.equal(3)
      expect(result.read[0].cvars.roundlimit).to.equal(4)
      expect(result.read[0].cvars.scorelimit).to.equal(5)
      expect(result.read[0].cvars.timelimit).to.equal(6)
      expect(result.read[0].exitMessage).to.equal('Exit')
      expect(result.read[0].factoryId).to.equal(1)
      expect(result.read[0].finishDate).to.deep.equal(date1)
      expect(result.read[0].guid).to.equal('012345678901234567890123456789012345')
      expect(result.read[0].lastLeadChangeTime).to.equal(7)
      expect(result.read[0].length).to.equal(8)
      expect(result.read[0].mapId).to.equal(1)
      expect(result.read[0].restarted).to.equal(true)
      expect(result.read[0].score1).to.equal(9)
      expect(result.read[0].score2).to.equal(10)
      expect(result.read[0].serverId).to.equal(1)
      expect(result.read[0].startDate).to.deep.equal(date2)
    })

    it('should load the factory', async function() {
      await create('match', { factoryId: 1 })
      await create('factory')
      await create('factory')

      let result = await Services.get().matchLogic.read({ factory: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].factory).to.be.not.undefined
      expect(result.read[0].factory.id).to.equal(1)
    })

    it('should load all frags', async function() {
      await create('match')
      await create('frag', { matchId: 1 })
      await create('frag', { matchId: 1 })
      await create('frag', { matchId: 2 })

      let result = await Services.get().matchLogic.read({ frags: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].frags).to.be.not.undefined
      expect(result.read[0].frags.length).to.equal(2)
      expect(result.read[0].frags[0].id).to.equal(2)
      expect(result.read[0].frags[1].id).to.equal(1)
    })

    it('should load the map', async function() {
      await create('match', { mapId: 1 })
      await create('map')
      await create('map')

      let result = await Services.get().matchLogic.read({ map: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].map).to.be.not.undefined
      expect(result.read[0].map.id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('match')
      await create('medal', { matchId: 1 })
      await create('medal', { matchId: 1 })
      await create('medal', { matchId: 2 })

      let result = await Services.get().matchLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].medals).to.be.not.undefined
      expect(result.read[0].medals.length).to.equal(2)
      expect(result.read[0].medals[0].id).to.equal(1)
      expect(result.read[0].medals[1].id).to.equal(2)
    })

    it('should load all match participations', async function() {
      await create('match')
      await create('match_participation', { matchId: 1 })
      await create('match_participation', { matchId: 1 })
      await create('match_participation', { matchId: 2 })

      let result = await Services.get().matchLogic.read({ participations: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].participations).to.be.not.undefined
      expect(result.read[0].participations.length).to.equal(2)
      expect(result.read[0].participations[0].id).to.equal(1)
      expect(result.read[0].participations[1].id).to.equal(2)
    })

    it('should load all rounds', async function() {
      await create('match')
      await create('round', { matchId: 1 })
      await create('round', { matchId: 1 })
      await create('round', { matchId: 2 })

      let result = await Services.get().matchLogic.read({ rounds: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].rounds).to.be.not.undefined
      expect(result.read[0].rounds.length).to.equal(2)
      expect(result.read[0].rounds[0].id).to.equal(1)
      expect(result.read[0].rounds[1].id).to.equal(2)
    })

    it('should load the server', async function() {
      await create('match', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().matchLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].server).to.be.not.undefined
      expect(result.read[0].server.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a match with all its rows', async function() {
      await create('server')
      await create('server')
      await create('factory')
      await create('factory')
      await create('map')
      await create('map')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match', {
        aborted: true,
        cvars: {
          capturelimit: 1,
          fraglimit: 2,
          g_instagib: true,
          g_quadHog: true,
          g_training: true,
          mercylimit: 3,
          roundlimit: 4,
          scorelimit: 5,
          timelimit: 6,
        },
        exitMessage: 'Exit',
        factoryId: 1,
        finishDate: date1,
        guid: '012345678901234567890123456789012345',
        lastLeadChangeTime: 7,
        length: 8,
        mapId: 1,
        restarted: true,
        score1: 9,
        score2: 10,
        serverId: 1,
        startDate: date2,
      })

      let match = new Match
      match.id = 1
      match.aborted = false
      match.cvars = {
        capturelimit: 2,
        fraglimit: 3,
        g_instagib: false,
        g_quadHog: false,
        g_training: false,
        mercylimit: 4,
        roundlimit: 5,
        scorelimit: 6,
        timelimit: 7,
      }
      match.exitMessage = 'Enter'
      match.factoryId = 2
      match.finishDate = date2
      match.guid = '123456789012345678901234567890123456'
      match.lastLeadChangeTime = 8
      match.length = 9
      match.mapId = 2
      match.restarted = false
      match.score1 = 10
      match.score2 = 11
      match.serverId = 2
      match.startDate = date1

      let result = await Services.get().matchLogic.update(match, tx())

      expect(result.isValue()).to.be.true
      expect(result.updated.id).to.equal(1)
      expect(result.updated.aborted).to.equal(false)
      expect(result.updated.cvars.capturelimit).to.equal(2)
      expect(result.updated.cvars.fraglimit).to.equal(3)
      expect(result.updated.cvars.g_instagib).to.equal(false)
      expect(result.updated.cvars.g_quadHog).to.equal(false)
      expect(result.updated.cvars.g_training).to.equal(false)
      expect(result.updated.cvars.mercylimit).to.equal(4)
      expect(result.updated.cvars.roundlimit).to.equal(5)
      expect(result.updated.cvars.scorelimit).to.equal(6)
      expect(result.updated.cvars.timelimit).to.equal(7)
      expect(result.updated.exitMessage).to.equal('Enter')
      expect(result.updated.factoryId).to.equal(2)
      expect(result.updated.finishDate).to.deep.equal(date2)
      expect(result.updated.guid).to.equal('123456789012345678901234567890123456')
      expect(result.updated.lastLeadChangeTime).to.equal(8)
      expect(result.updated.length).to.equal(9)
      expect(result.updated.mapId).to.equal(2)
      expect(result.updated.restarted).to.equal(false)
      expect(result.updated.score1).to.equal(10)
      expect(result.updated.score2).to.equal(11)
      expect(result.updated.serverId).to.equal(2)
      expect(result.updated.startDate).to.deep.equal(date1)
    })
  })

  describe('delete', function() {
    it('should delete a match', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match', {
        aborted: true,
        cvars: {
          capturelimit: 1,
          fraglimit: 2,
          g_instagib: true,
          g_quadHog: true,
          g_training: true,
          mercylimit: 3,
          roundlimit: 4,
          scorelimit: 5,
          timelimit: 6,
        },
        exitMessage: 'Exit',
        factoryId: 1,
        finishDate: date1,
        guid: '012345678901234567890123456789012345',
        lastLeadChangeTime: 7,
        length: 8,
        mapId: 1,
        restarted: true,
        score1: 9,
        score2: 10,
        serverId: 1,
        startDate: date2,
      })

      let match = new Match
      match.id = 1

      let result = await Services.get().matchLogic.delete(match, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.deleted.id).to.equal(1)
      expect(result.deleted.aborted).to.equal(true)
      expect(result.deleted.cvars.capturelimit).to.equal(1)
      expect(result.deleted.cvars.fraglimit).to.equal(2)
      expect(result.deleted.cvars.g_instagib).to.equal(true)
      expect(result.deleted.cvars.g_quadHog).to.equal(true)
      expect(result.deleted.cvars.g_training).to.equal(true)
      expect(result.deleted.cvars.mercylimit).to.equal(3)
      expect(result.deleted.cvars.roundlimit).to.equal(4)
      expect(result.deleted.cvars.scorelimit).to.equal(5)
      expect(result.deleted.cvars.timelimit).to.equal(6)
      expect(result.deleted.exitMessage).to.equal('Exit')
      expect(result.deleted.factoryId).to.equal(1)
      expect(result.deleted.finishDate).to.deep.equal(date1)
      expect(result.deleted.guid).to.equal('012345678901234567890123456789012345')
      expect(result.deleted.lastLeadChangeTime).to.equal(7)
      expect(result.deleted.length).to.equal(8)
      expect(result.deleted.mapId).to.equal(1)
      expect(result.deleted.restarted).to.equal(true)
      expect(result.deleted.score1).to.equal(9)
      expect(result.deleted.score2).to.equal(10)
      expect(result.deleted.serverId).to.equal(1)
      expect(result.deleted.startDate).to.deep.equal(date2)
    })
  })
})