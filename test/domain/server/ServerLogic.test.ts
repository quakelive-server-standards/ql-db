import { expect } from 'chai'
import 'mocha'
import { Server } from '../../../src/domain/server/Server'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/ServerLogic.ts', function() {
  describe('create', function() {
    it('should create a server with all its rows', async function() {
      let now = new Date
      let server = new Server

      server.firstSeen = now
      server.ip = '127.0.0.1'
      server.port = 27960
      server.title = 'Standard Duel Server'

      let result = await Services.get().serverLogic.create(server, tx())

      expect(result.isValue()).to.be.true
      expect(result.created.id).to.equal(1)
      expect(result.created.firstSeen).to.deep.equal(now)
      expect(result.created.ip).to.equal('127.0.0.1')
      expect(result.created.port).to.equal(27960)
      expect(result.created.title).to.equal('Standard Duel Server')
    })
  })

  describe('read', function() {
    it('should read a server with all its rows', async function() {
      let now = new Date

      await create('server', {
        firstSeen: now,
        ip: '127.0.0.1',
        port: 27960,
        title: 'Standard Duel Server',
      })
      
      let result = await Services.get().serverLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.read.length).to.equal(1)
      expect(result.read[0].id).to.equal(1)
      expect(result.read[0].firstSeen).to.deep.equal(now)
      expect(result.read[0].ip).to.equal('127.0.0.1')
      expect(result.read[0].port).to.equal(27960)
      expect(result.read[0].title).to.equal('Standard Duel Server')
    })

    it('should load all frags', async function() {
      await create('server')
      await create('frag', { serverId: 1 })
      await create('frag', { serverId: 1 })
      await create('frag', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ frags: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].frags).to.be.not.undefined
      expect(result.read[0].frags.length).to.equal(2)
      expect(result.read[0].frags[0].id).to.equal(2)
      expect(result.read[0].frags[1].id).to.equal(1)
    })

    it('should load all matches', async function() {
      await create('server')
      await create('match', { serverId: 1 })
      await create('match', { serverId: 1 })
      await create('match', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ matches: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].matches).to.be.not.undefined
      expect(result.read[0].matches.length).to.equal(2)
      expect(result.read[0].matches[0].id).to.equal(1)
      expect(result.read[0].matches[1].id).to.equal(2)
    })

    it('should load all match participations', async function() {
      await create('server')
      await create('match_participation', { serverId: 1 })
      await create('match_participation', { serverId: 1 })
      await create('match_participation', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ matchParticipations: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].matchParticipations).to.be.not.undefined
      expect(result.read[0].matchParticipations.length).to.equal(2)
      expect(result.read[0].matchParticipations[0].id).to.equal(1)
      expect(result.read[0].matchParticipations[1].id).to.equal(2)
    })

    it('should load all medals', async function() {
      await create('server')
      await create('medal', { serverId: 1 })
      await create('medal', { serverId: 1 })
      await create('medal', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].medals).to.be.not.undefined
      expect(result.read[0].medals.length).to.equal(2)
      expect(result.read[0].medals[0].id).to.equal(1)
      expect(result.read[0].medals[1].id).to.equal(2)
    })

    it('should load all rounds', async function() {
      await create('server')
      await create('round', { serverId: 1 })
      await create('round', { serverId: 1 })
      await create('round', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ rounds: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].rounds).to.be.not.undefined
      expect(result.read[0].rounds.length).to.equal(2)
      expect(result.read[0].rounds[0].id).to.equal(1)
      expect(result.read[0].rounds[1].id).to.equal(2)
    })

    it('should load all server visits', async function() {
      await create('server')
      await create('server_visit', { serverId: 1 })
      await create('server_visit', { serverId: 1 })
      await create('server_visit', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ visits: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].visits).to.be.not.undefined
      expect(result.read[0].visits.length).to.equal(2)
      expect(result.read[0].visits[0].id).to.equal(1)
      expect(result.read[0].visits[1].id).to.equal(2)
    })

    it('should load all stats', async function() {
      await create('server')
      await create('stats', { serverId: 1 })
      await create('stats', { serverId: 1 })
      await create('stats', { serverId: 2 })

      let result = await Services.get().serverLogic.read({ stats: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].stats).to.be.not.undefined
      expect(result.read[0].stats.length).to.equal(2)
      expect(result.read[0].stats[0].id).to.equal(1)
      expect(result.read[0].stats[1].id).to.equal(2)
    })
  })

  describe('update', function() {
    it('should update a server with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('server', {
        firstSeen: date1,
        ip: '127.0.0.1',
        port: 27960,
        title: 'Standard Duel Server',
      })

      let server = new Server
      server.id = 1
      server.firstSeen = date2
      server.ip = '127.0.0.2'
      server.port = 27961
      server.title = 'Standard Duel Server #2'

      let result = await Services.get().serverLogic.update(server, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.updated.id).to.equal(1)
      expect(result.updated.firstSeen).to.deep.equal(date2)
      expect(result.updated.ip).to.equal('127.0.0.2')
      expect(result.updated.port).to.equal(27961)
      expect(result.updated.title).to.equal('Standard Duel Server #2')
    })

    describe('delete', function() {
      it('should delete a server', async function() {
        let now = new Date
  
        await create('server', {
          firstSeen: now,
          ip: '127.0.0.1',
          port: 27960,
          title: 'Standard Duel Server',
        })

        let server = new Server
        server.id = 1
  
        let result = await Services.get().serverLogic.delete(server, tx())
        
        expect(result.isValue()).to.be.true
        expect(result.deleted.id).to.equal(1)
        expect(result.deleted.firstSeen).to.deep.equal(now)
        expect(result.deleted.ip).to.equal('127.0.0.1')
        expect(result.deleted.port).to.equal(27960)
        expect(result.deleted.title).to.equal('Standard Duel Server')
      })
    })
  })
})