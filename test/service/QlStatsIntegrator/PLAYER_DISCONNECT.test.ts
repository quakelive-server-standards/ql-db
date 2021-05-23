import { expect } from 'chai'
import 'mocha'
import { PlayerConnectEvent, PlayerDisconnectEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_DISCONNECT', function() {
    it('should update the active server visit', async function() {
      await create('server_visit', { serverId: 1, playerId: 1, connectDate: new Date, disconnectDate: new Date, active: false })
      await create('server_visit', { serverId: 1, playerId: 2, connectDate: new Date, disconnectDate: new Date, active: false })
      await create('server_visit', { serverId: 2, playerId: 1, connectDate: new Date, disconnectDate: new Date, active: false })
      await create('server_visit', { serverId: 2, playerId: 2, connectDate: new Date, disconnectDate: new Date, active: false })
      await create('player', { steamId: '76561198170654797' })
      await create('player', { steamId: '76561198170654798' })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 8367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }
  
      let connectDate = new Date
      let connectEvent = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, connectEvent, tx(), connectDate)

      let qlDisconnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 9367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_DISCONNECT"
      }
  
      let disconnectDate = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
      let disconnectEvent = PlayerDisconnectEvent.fromQl(qlDisconnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, disconnectEvent, tx(), disconnectDate)
  
      let serverVisitsResult = await Services.get().serverVisitLogic.read({ id: 5 }, tx())
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(connectDate)
      expect(serverVisitsResult.entities[0].disconnectDate).to.deep.equal(disconnectDate)
      expect(serverVisitsResult.entities[0].active).to.equal(false)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
    })

    it('should use the latest server visit if there is more than one active one and set the other ones active to false', async function() {
      let date1 = new Date
      let date2 = new Date(new Date(date1).setSeconds(date1.getSeconds() + 1))
      
      await create('server_visit', { serverId: 1, playerId: 1, connectDate: date1, active: true })
      await create('server_visit', { serverId: 1, playerId: 1, connectDate: date2, active: true })
      await create('server_visit', { serverId: 1, playerId: 1, connectDate: date1, active: true })
      await create('player', { steamId: '76561198170654797' })

      let qlDisconnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 9367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_DISCONNECT"
      }
  
      let disconnectDate = new Date(new Date(date2).setSeconds(date2.getSeconds() + 1))
      let disconnectEvent = PlayerDisconnectEvent.fromQl(qlDisconnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, disconnectEvent, tx(), disconnectDate)
  
      let serverVisitsResult = await Services.get().serverVisitLogic.read({ id: 2 }, tx())
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date2)
      expect(serverVisitsResult.entities[0].disconnectDate).to.deep.equal(disconnectDate)
      expect(serverVisitsResult.entities[0].active).to.equal(false)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)

      let otherServerVisitsResult = await Services.get().serverVisitLogic.read({ id: { operator: '!=', value: 2 }}, tx())
      expect(otherServerVisitsResult.isValue()).to.be.true
      expect(otherServerVisitsResult.entities.length).to.equal(2)
      expect(otherServerVisitsResult.entities[0].active).to.equal(false)
      expect(otherServerVisitsResult.entities[1].active).to.equal(false)
    })

    it('should not consider server visits which do not have a connect date', async function() {
      let connectDate = new Date
      
      await create('server_visit', { serverId: 1, playerId: 1, active: true })
      await create('player', { steamId: '76561198170654797' })

      let qlDisconnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 9367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_DISCONNECT"
      }
  
      let disconnectDate = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
      let disconnectEvent = PlayerDisconnectEvent.fromQl(qlDisconnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, disconnectEvent, tx(), disconnectDate)
  
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(2)
      expect(serverVisitsResult.entities[0].id).to.equal(2)
      expect(serverVisitsResult.entities[0].connectDate).to.be.null
      expect(serverVisitsResult.entities[0].disconnectDate).to.deep.equal(disconnectDate)
      expect(serverVisitsResult.entities[0].active).to.equal(false)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      expect(serverVisitsResult.entities[1].id).to.equal(1)
      expect(serverVisitsResult.entities[1].connectDate).to.be.null
      expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[1].active).to.equal(false)
      expect(serverVisitsResult.entities[1].playerId).to.equal(1)
      expect(serverVisitsResult.entities[1].serverId).to.equal(1)
    })

    it('should create a new server visit with a new server and a new player if the PLAYER_CONNECT event was missing', async function() {
      let qlDisconnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 9367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_DISCONNECT"
      }
  
      let disconnectDate = new Date
      let disconnectEvent = PlayerDisconnectEvent.fromQl(qlDisconnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, disconnectEvent, tx(), disconnectDate)
  
      let serversResult = await Services.get().serverLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({}, tx())
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serversResult.isValue()).to.be.true
      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
  
      expect(playersResult.isValue()).to.be.true
      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].name).to.equal('garz')
      expect(playersResult.entities[0].steamId).to.equal('76561198170654797')
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.be.null
      expect(serverVisitsResult.entities[0].disconnectDate).to.deep.equal(disconnectDate)
      expect(serverVisitsResult.entities[0].active).to.equal(false)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
    })
  })
})
