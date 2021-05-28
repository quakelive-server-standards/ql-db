import { expect } from 'chai'
import 'mocha'
import { PlayerConnectEvent } from 'ql-stats-model'
import { TeamType } from '../../../src/domain/enums/TeamType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe.only('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_CONNECT', function() {
    it('should create a new server visit together with a new server and a new player', async function() {
      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({}, tx())
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serversResult.isValue()).to.be.true
      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
  
      expect(playersResult.isValue()).to.be.true
      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].name).to.equal('garz')
      expect(playersResult.entities[0].steamId).to.equal('76561198170654797')
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].active).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
    })

    it('should not create a new server', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let result = await Services.get().serverLogic.count({}, tx())
  
      expect(result.isValue()).to.be.true
      expect(result.count).to.equal(1)
    })

    it('should not create a new player', async function() {
      await create('player', { steamId: '76561198170654797' })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let result = await Services.get().playerLogic.count({}, tx())
  
      expect(result.isValue()).to.be.true
      expect(result.count).to.equal(1)
    })

    it('should update a players name', async function() {
      await create('player', { name: 'garz', steamId: '76561198170654797' })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz2",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let result = await Services.get().playerLogic.read({}, tx())
  
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].name).to.equal('garz2')
    })

    it('should update a players firstSeen date', async function() {
      await create('player', { name: 'garz', steamId: '76561198170654797' })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let result = await Services.get().playerLogic.read({}, tx())
  
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].firstSeen).to.deep.equal(date)
    })

    it('should set active on all former server visit to false', async function() {
      let qlConnectEvent1 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date1 = new Date
      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event1, tx(), date1)

      let qlConnectEvent2 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date2 = new Date
      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)
  
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())

      expect(serverVisitsResult.entities.length).to.equal(2)
      expect(serverVisitsResult.entities[0].id).to.equal(1)
      expect(serverVisitsResult.entities[0].active).to.equal(false)
      expect(serverVisitsResult.entities[1].id).to.equal(2)
      expect(serverVisitsResult.entities[1].active).to.equal(true)
    })

    it('should create the match if it is not warmup and was not already created', async function() {
      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : false
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].active).to.equal(true)
      expect(matchesResult.entities[0].startDate).to.deep.equal(new Date(date.setSeconds(date.getSeconds() - qlConnectEvent['DATA']['TIME'])))
      expect(matchesResult.entities[0].guid).to.equal('95d60017-6adb-43bf-a146-c1757194d5fc')
    })

    it('should not create the match if it is warmup', async function() {
      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(0)
    })

    it('should set an active on a match to false if the match is not active anymore', async function() {
      await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fb', serverId: 1 })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].active).to.equal(false)
    })

    it('should not set an active on a match to false if the match is still active', async function() {
      await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fc', serverId: 1 })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : false
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].active).to.equal(true)
    })

    it('should not set an active on a match to false if the match is on a different server', async function() {
      await create('match', { active: true, guid: '95d60017-6adb-43bf-a146-c1757194d5fc', serverId: 2 })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchesResult = await Services.get().matchLogic.read({}, tx())

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].active).to.equal(true)
    })

    it('should set active on all match participation of the connecting player to false', async function() {
      await create('match_participation', { active: true, playerId: 1, startDate: new Date, team: TeamType.Free })
      await create('match_participation', { active: true, playerId: 2, startDate: new Date, team: TeamType.Free })

      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let matchParticipationsResult = await Services.get().matchParticipationLogic.read({}, tx())

      expect(matchParticipationsResult.entities.length).to.equal(2)
      expect(matchParticipationsResult.entities[0].id).to.equal(2)
      expect(matchParticipationsResult.entities[0].active).to.equal(true)
      expect(matchParticipationsResult.entities[1].id).to.equal(1)
      expect(matchParticipationsResult.entities[1].active).to.equal(false)
    })
  })
})