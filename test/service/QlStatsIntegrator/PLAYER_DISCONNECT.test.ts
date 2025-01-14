import { expect } from 'chai'
import 'mocha'
import { PlayerConnectEvent, PlayerDisconnectEvent } from 'ql-stats-model'
import { TeamType } from '../../../src/domain/enums/TeamType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_DISCONNECT', function() {
    describe('Server', function() {
      it('should create a new server', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
    
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
    
        expect(result.isValue()).to.be.true
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should not create a new server', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
        
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should update the fist seen date', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
    
        expect(result.isValue()).to.be.true
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })
    })

    describe('Player', function() {
      it('should create a new player', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerConnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.be.null
      })

      it('should not create a new player', async function() {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerConnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })  

      it('should update a players name', async function() {
        let firstSeen = new Date
        await create('player', { name: 'OldPlayerName', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerConnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })
  
      it('should update a players first seen date', async function() {
        await create('player', { name: 'Player', steamId: '11111111111111111', model: 'sarge' })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerConnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })  
    })

    describe('ServerVisit', function() {
      it('should update the active server visit', async function() {
        await create('server_visit', { serverId: 1, playerId: 1, connectDate: new Date, disconnectDate: new Date, active: false })
        await create('server_visit', { serverId: 1, playerId: 2, connectDate: new Date, disconnectDate: new Date, active: false })
        await create('server_visit', { serverId: 2, playerId: 1, connectDate: new Date, disconnectDate: new Date, active: false })
        await create('server_visit', { serverId: 2, playerId: 2, connectDate: new Date, disconnectDate: new Date, active: false })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
  
        let qlConnectEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 8367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_CONNECT"
        }
    
        let connectDate = new Date
        let connectEvent = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, connectEvent, tx(), connectDate)
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
    
        let disconnectDate = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
        let disconnectEvent = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
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
        await create('player', { steamId: '11111111111111111' })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
    
        let disconnectDate = new Date(new Date(date2).setSeconds(date2.getSeconds() + 1))
        let disconnectEvent = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
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
  
      it('should create a new server visit', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
    
        let disconnectDate = new Date
        let disconnectEvent = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, disconnectEvent, tx(), disconnectDate)
    
        let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
    
        expect(serverVisitsResult.isValue()).to.be.true
        expect(serverVisitsResult.entities.length).to.equal(1)
        expect(serverVisitsResult.entities[0].active).to.equal(false)
        expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(disconnectDate)
        expect(serverVisitsResult.entities[0].disconnectDate).to.deep.equal(disconnectDate)
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      })

      it('should set active on all former server visit to false', async function() {
        let qlConnectEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fb",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 7,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_CONNECT"
        }
  
        let date1 = new Date
        let event1 = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event1, tx(), date1)
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date2 = new Date
        let event2 = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)
    
        let serverVisitsResult = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(serverVisitsResult.entities.length).to.equal(2)
        expect(serverVisitsResult.entities[0].id).to.equal(1)
        expect(serverVisitsResult.entities[0].active).to.equal(false)
        expect(serverVisitsResult.entities[1].id).to.equal(2)
        expect(serverVisitsResult.entities[1].active).to.equal(false)
      })  
    })

    describe('Match', function() {
      it('should create the match if it is not warmup and was not already created', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].active).to.equal(true)
        expect(matchesResult.entities[0].startDate).to.deep.equal(new Date(date.setSeconds(date.getSeconds() - qlEvent['DATA']['TIME'])))
        expect(matchesResult.entities[0].guid).to.equal('95d60017-6adb-43bf-a146-c1757194d5fc')
      })
  
      it('should not create the match if it is warmup', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(0)
      })
  
      it('should set activate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fb', serverId: 1 })
  
        let qlConnectEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlConnectEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].active).to.equal(false)
      })
  
      it('should not inactivate a match if the current active match is the same', async function() {
        await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fc', serverId: 1 })
  
        let qlConnectEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].active).to.equal(true)
      })
  
      it('should not inactivate a match if it is on a different server', async function() {
        await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fb', serverId: 2 })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].active).to.equal(true)
      })  
    })

    describe('MatchParticipation', function() {
      it('should set inactivate all match participation of the disconnecting player', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('server_visit')
        await create('server_visit')
        await create('server_visit')
        await create('server_visit')
        await create('match')
        await create('match')
        await create('match')
        await create('match')
        await create('match_participation', { active: true, playerId: 1, serverId: 1, serverVisitId: 1, matchId: 1, startDate: new Date, team: TeamType.Free, warmup: false })
        await create('match_participation', { active: true, playerId: 1, serverId: 2, serverVisitId: 2, matchId: 2, startDate: new Date, team: TeamType.Free, warmup: false })
        await create('match_participation', { active: true, playerId: 2, serverId: 1, serverVisitId: 3, matchId: 3, startDate: new Date, team: TeamType.Free, warmup: false })
        await create('match_participation', { active: true, playerId: 2, serverId: 2, serverVisitId: 4, matchId: 4, startDate: new Date, team: TeamType.Free, warmup: false })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 9367,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_DISCONNECT"
        }
  
        let date = new Date
        let event = PlayerDisconnectEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(matchParticipationsResult.entities.length).to.equal(4)
        expect(matchParticipationsResult.entities[0].id).to.equal(1)
        expect(matchParticipationsResult.entities[0].active).to.equal(false)
        expect(matchParticipationsResult.entities[1].id).to.equal(2)
        expect(matchParticipationsResult.entities[1].active).to.equal(false)
        expect(matchParticipationsResult.entities[2].id).to.equal(3)
        expect(matchParticipationsResult.entities[2].active).to.equal(true)
        expect(matchParticipationsResult.entities[3].id).to.equal(4)
        expect(matchParticipationsResult.entities[3].active).to.equal(true)
      })  
    })
  })
})
