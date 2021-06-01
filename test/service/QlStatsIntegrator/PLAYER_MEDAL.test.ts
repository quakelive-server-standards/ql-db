import { expect } from 'chai'
import 'mocha'
import { PlayerMedalEvent } from 'ql-stats-model'
import { MedalType } from '../../../src/domain/enums/MedalType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_MEDAL', function() {
    describe('Server', function() {
      it('should create a new server', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serversResult = await Services.get().serverLogic.read({}, tx())
  
        expect(serversResult.entities.length).to.equal(1)
        expect(serversResult.entities[0].firstSeen).to.deep.equal(date)
        expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
        expect(serversResult.entities[0].port).to.equal(27960)
        expect(serversResult.entities[0].title).to.be.null
      })

      it('should not create a new server', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serversResult = await Services.get().serverLogic.read({}, tx())
  
        expect(serversResult.entities.length).to.equal(1)
        expect(serversResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
        expect(serversResult.entities[0].port).to.equal(27960)
        expect(serversResult.entities[0].title).to.be.null
      })

      it('should set the first seen date', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serversResult = await Services.get().serverLogic.read({}, tx())
  
        expect(serversResult.entities.length).to.equal(1)
        expect(serversResult.entities[0].firstSeen).to.deep.equal(date)
      })
    })

    describe('Player', function() {
      it('should create a new player', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let playersResult = await Services.get().playerLogic.read({}, tx())
  
        expect(playersResult.entities.length).to.equal(1)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('UnnamedPlayer')
        expect(playersResult.entities[0].steamId).to.equal('77777777777777777')
      })  

      it('should not create a new player', async function() {
        let firstSeen = new Date
        await create('player', { steamId: '77777777777777777', name: 'UnnamedPlayer', firstSeen: firstSeen })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let playersResult = await Services.get().playerLogic.read({}, tx())
  
        expect(playersResult.entities.length).to.equal(1)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('UnnamedPlayer')
        expect(playersResult.entities[0].steamId).to.equal('77777777777777777')
      })  

      it('should update the player name', async function() {
        let firstSeen = new Date
        await create('player', { steamId: '77777777777777777', name: 'UnnamedPlayer', firstSeen: firstSeen })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer1",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let playersResult = await Services.get().playerLogic.read({}, tx())
  
        expect(playersResult.entities.length).to.equal(1)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('UnnamedPlayer1')
        expect(playersResult.entities[0].steamId).to.equal('77777777777777777')
      })  

      it('should set the first seen date', async function() {
        await create('player', { steamId: '77777777777777777', name: 'UnnamedPlayer' })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer1",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let playersResult = await Services.get().playerLogic.read({}, tx())
  
        expect(playersResult.entities.length).to.equal(1)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('UnnamedPlayer1')
        expect(playersResult.entities[0].steamId).to.equal('77777777777777777')
      })  
    })

    describe('ServerVisit', function() {
      it('should create a new server visit', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '77777777777777777' })
        await create('server_visit', { serverId: 1, playerId: 1, active: false })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serverVisitsResult = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(serverVisitsResult.entities.length).to.equal(2)
        expect(serverVisitsResult.entities[0].connectDate).to.be.null
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[0].active).to.equal(false)
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
        expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[1].active).to.equal(true)
        expect(serverVisitsResult.entities[1].playerId).to.equal(1)
        expect(serverVisitsResult.entities[1].serverId).to.equal(1)
      })

      it('should not create a new server visit', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '77777777777777777' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(serverVisitsResult.entities.length).to.equal(1)
        expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(connectDate)
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[0].active).to.equal(true)
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      })  

      it('should inactivate any server visit of the same player on any other server', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '77777777777777777' })
        await create('player', { steamId: '88888888888888888' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 2, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: connectDate })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let serverVisitsResult = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(serverVisitsResult.entities.length).to.equal(4)
        expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(connectDate)
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[0].active).to.equal(true)
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
        expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(connectDate)
        expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[1].active).to.equal(false)
        expect(serverVisitsResult.entities[1].playerId).to.equal(1)
        expect(serverVisitsResult.entities[1].serverId).to.equal(2)
        expect(serverVisitsResult.entities[2].connectDate).to.deep.equal(connectDate)
        expect(serverVisitsResult.entities[2].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[2].active).to.equal(true)
        expect(serverVisitsResult.entities[2].playerId).to.equal(2)
        expect(serverVisitsResult.entities[2].serverId).to.equal(1)
        expect(serverVisitsResult.entities[3].connectDate).to.deep.equal(connectDate)
        expect(serverVisitsResult.entities[3].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[3].active).to.equal(true)
        expect(serverVisitsResult.entities[3].playerId).to.equal(2)
        expect(serverVisitsResult.entities[3].serverId).to.equal(2)
      })  
    })

    describe('Match', function() {
      it('should create a new match', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.read({}, tx())
  
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].aborted).to.be.null
        expect(matchesResult.entities[0].active).to.equal(true)
        expect(matchesResult.entities[0].cvars).to.be.not.null
        expect(matchesResult.entities[0].cvars.capturelimit).to.be.null
        expect(matchesResult.entities[0].cvars.fraglimit).to.be.null
        expect(matchesResult.entities[0].cvars.g_instagib).to.be.null
        expect(matchesResult.entities[0].cvars.g_quadHog).to.be.null
        expect(matchesResult.entities[0].cvars.g_training).to.be.null
        expect(matchesResult.entities[0].cvars.mercylimit).to.be.null
        expect(matchesResult.entities[0].cvars.roundlimit).to.be.null
        expect(matchesResult.entities[0].cvars.scorelimit).to.be.null
        expect(matchesResult.entities[0].cvars.timelimit).to.be.null
        expect(matchesResult.entities[0].exitMessage).to.be.null
        expect(matchesResult.entities[0].factoryId).to.be.null
        expect(matchesResult.entities[0].finishDate).to.be.null
        expect(matchesResult.entities[0].guid).to.equal('66fe025a-63ff-4852-96bd-9102411e9fb0')
        expect(matchesResult.entities[0].lastLeadChangeTime).to.be.null
        expect(matchesResult.entities[0].length).to.be.null
        expect(matchesResult.entities[0].mapId).to.be.null
        expect(matchesResult.entities[0].restarted).to.be.null
        expect(matchesResult.entities[0].score1).to.be.null
        expect(matchesResult.entities[0].score2).to.be.null
        expect(matchesResult.entities[0].serverId).to.equal(1)
        expect(matchesResult.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })  

      it('should not create a new match', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '66fe025a-63ff-4852-96bd-9102411e9fb0', active: true })

        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.count({}, tx())
  
        expect(matchesResult.count).to.equal(1)
      })

      it('should not create a new match if the current match is warmup', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.count({}, tx())
  
        expect(matchesResult.count).to.equal(0)
      })      

      it('should inactivate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '66fe025a-63ff-4852-96bd-9102411e9fa0', serverId: 1 })
        await create('match', { active: true, guid: '66fe025a-63ff-4852-96bd-9102411e9fb0', serverId: 2 })
        
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fc0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(matchesResult.entities.length).to.equal(2)
        expect(matchesResult.entities[0].active).to.equal(false)
        expect(matchesResult.entities[1].active).to.equal(true)
      })
    })

    describe('MatchParticipation', function() {
      it('should create a new new match participation', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({}, tx())
        
        expect(matchParticipationsResult.entities.length).to.equal(1)
        expect(matchParticipationsResult.entities[0].finishDate).to.be.null
        expect(matchParticipationsResult.entities[0].matchId).to.equal(1)
        expect(matchParticipationsResult.entities[0].playerId).to.equal(1)
        expect(matchParticipationsResult.entities[0].roundId).to.be.null
        expect(matchParticipationsResult.entities[0].serverId).to.equal(1)
        expect(matchParticipationsResult.entities[0].startDate).to.deep.equal(date)
        expect(matchParticipationsResult.entities[0].statsId).to.be.null
        expect(matchParticipationsResult.entities[0].team).to.be.null
      })  

      it('should not create a new match participation', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '77777777777777777' })
        await create('match', { serverId: 1, guid: '66fe025a-63ff-4852-96bd-9102411e9fb0', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, matchId: 1, active: true, team: TeamType.Blue })
  
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())
        
        expect(matchParticipationsResult.count).to.equal(1)
      })  

      it('should inactivate any former match participations on the same server if the current game is another one', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '77777777777777777' })
        await create('player', { steamId: '88888888888888888' })
        await create('match', { serverId: 1, guid: '66fe025a-63ff-4852-96bd-9102411e9fa0', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, matchId: 1, active: true, startDate: new Date, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, playerId: 2, matchId: 1, active: true, startDate: new Date, team: TeamType.Red })
  
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
        
        expect(matchParticipationsResult.entities.length).to.equal(3)
        expect(matchParticipationsResult.entities[0].active).to.equal(false)
        expect(matchParticipationsResult.entities[1].active).to.equal(false)
        expect(matchParticipationsResult.entities[2].active).to.equal(true)
      })  

      it('should inactivate any former match participation of the same player on any other servers', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '77777777777777777' })
        await create('match', { serverId: 2, guid: '66fe025a-63ff-4852-96bd-9102411e9fa0', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, matchId: 1, active: true, startDate: new Date, team: TeamType.Blue })
  
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
        
        expect(matchParticipationsResult.entities.length).to.equal(2)
        expect(matchParticipationsResult.entities[0].active).to.equal(false)
        expect(matchParticipationsResult.entities[1].active).to.equal(true)
      })  
    })

    describe('Medal', function() {
      it('should create a new medal', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let medalsResult = await Services.get().medalLogic.read({}, tx())
  
        expect(medalsResult.entities.length).to.equal(1)
        expect(medalsResult.entities[0].date).to.deep.equal(date)
        expect(medalsResult.entities[0].matchId).to.equal(1)
        expect(medalsResult.entities[0].matchParticipationId).to.equal(1)
        expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
        expect(medalsResult.entities[0].playerId).to.equal(1)
        expect(medalsResult.entities[0].roundId).to.be.null
        expect(medalsResult.entities[0].serverId).to.equal(1)
        expect(medalsResult.entities[0].warmup).to.equal(false)
      })

      it('should create a new medal for warmup', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "UnnamedPlayer",
             "STEAM_ID" : "77777777777777777",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let medalsResult = await Services.get().medalLogic.read({}, tx())
  
        expect(medalsResult.entities.length).to.equal(1)
        expect(medalsResult.entities[0].date).to.deep.equal(date)
        expect(medalsResult.entities[0].matchId).to.be.null
        expect(medalsResult.entities[0].matchParticipationId).to.be.null
        expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
        expect(medalsResult.entities[0].playerId).to.equal(1)
        expect(medalsResult.entities[0].roundId).to.be.null
        expect(medalsResult.entities[0].serverId).to.equal(1)
        expect(medalsResult.entities[0].warmup).to.equal(true)
      })
    })
  })
})