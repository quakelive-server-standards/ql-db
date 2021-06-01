import { expect } from 'chai'
import 'mocha'
import { ServerVisit } from '../../../src/domain/serverVisit/ServerVisit'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/ServerVisitLogic.ts', function() {
  describe('create', function() {
    it('should create a serverVisit with all its rows', async function() {
      await create('player')
      await create('server')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
      let serverVisit = new ServerVisit

      serverVisit.connectDate = date1
      serverVisit.disconnectDate = date2
      serverVisit.active = true
      serverVisit.playerId = 1
      serverVisit.serverId = 1

      let result = await Services.get().serverVisitLogic.create(serverVisit, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.connectDate).to.deep.equal(date1)
      expect(result.entity.disconnectDate).to.deep.equal(date2)
      expect(result.entity.active).to.equal(true)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
    })
  })

  describe('read', function() {
    it('should read a serverVisit with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('server_visit', {
        connectDate: date1,
        disconnectDate: date2,
        active: true,
        playerId: 1,
        serverId: 1,
      })
      
      let result = await Services.get().serverVisitLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].connectDate).to.deep.equal(date1)
      expect(result.entities[0].disconnectDate).to.deep.equal(date2)
      expect(result.entities[0].active).to.equal(true)
      expect(result.entities[0].playerId).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
    })

    it('should load all deaths', async function() {
      await create('server_visit')
      await create('frag', { victim: { serverVisitId: 1 }})
      await create('frag', { victim: { serverVisitId: 1 }})
      await create('frag', { victim: { serverVisitId: 2 }})

      let result = await Services.get().serverVisitLogic.read({ deaths: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].deaths).to.be.not.undefined
      expect(result.entities[0].deaths.length).to.equal(2)
      expect(result.entities[0].deaths[0].id).to.equal(2)
      expect(result.entities[0].deaths[1].id).to.equal(1)
    })

    it('should load all kills', async function() {
      await create('server_visit')
      await create('frag', { killer: { serverVisitId: 1 }})
      await create('frag', { killer: { serverVisitId: 1 }})
      await create('frag', { killer: { serverVisitId: 2 }})

      let result = await Services.get().serverVisitLogic.read({ kills: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].kills).to.be.not.undefined
      expect(result.entities[0].kills.length).to.equal(2)
      expect(result.entities[0].kills[0].id).to.equal(2)
      expect(result.entities[0].kills[1].id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('server_visit')
      await create('medal', { serverVisitId: 1 })
      await create('medal', { serverVisitId: 1 })
      await create('medal', { serverVisitId: 2 })

      let result = await Services.get().serverVisitLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].medals).to.be.not.undefined
      expect(result.entities[0].medals.length).to.equal(2)
      expect(result.entities[0].medals[0].id).to.equal(1)
      expect(result.entities[0].medals[1].id).to.equal(2)
    })

    it('should load the player', async function() {
      await create('server_visit', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().serverVisitLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].player).to.be.not.undefined
      expect(result.entities[0].player.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('server_visit', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().serverVisitLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })    
  })

  describe('update', function() {
    it('should update a serverVisit with all its rows', async function() {
      await create('player')
      await create('player')
      await create('server')
      await create('server')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('server_visit', {
        connectDate: date1,
        disconnectDate: date2,
        active: true,
        playerId: 1,
        serverId: 1,
      })

      let serverVisit = new ServerVisit
      serverVisit.id = 1
      serverVisit.connectDate = date2
      serverVisit.disconnectDate = date1
      serverVisit.active = false
      serverVisit.playerId = 2
      serverVisit.serverId = 2

      let result = await Services.get().serverVisitLogic.update(serverVisit, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.connectDate).to.deep.equal(date2)
      expect(result.entity.disconnectDate).to.deep.equal(date1)
      expect(result.entity.active).to.equal(false)
      expect(result.entity.playerId).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
    })
  })

  describe('delete', function() {
    it('should delete a serverVisit', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
  
      await create('server_visit', {
        connectDate: date1,
        disconnectDate: date2,
        active: true,
        playerId: 1,
        serverId: 1,
        })

      let serverVisit = new ServerVisit
      serverVisit.id = 1

      let result = await Services.get().serverVisitLogic.delete(serverVisit, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.connectDate).to.deep.equal(date1)
      expect(result.entity.disconnectDate).to.deep.equal(date2)
      expect(result.entity.active).to.equal(true)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
    })
  })
})