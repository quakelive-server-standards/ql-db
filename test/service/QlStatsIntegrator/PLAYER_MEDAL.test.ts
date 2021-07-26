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
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverLogic.read({}, tx())
  
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
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should set the first seen date', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverLogic.read({}, tx())
  
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
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().playerLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })  

      it('should not create a new player', async function() {
        let firstSeen = new Date
        await create('player', { steamId: '11111111111111111', name: 'Player', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().playerLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })  

      it('should update the player name', async function() {
        let firstSeen = new Date
        await create('player', { steamId: '11111111111111111', name: 'OldPlayerName', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().playerLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })  

      it('should set the first seen date', async function() {
        await create('player', { steamId: '11111111111111111', name: 'Player', model: 'sarge' })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().playerLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })  
    })

    describe('ServerVisit', function() {
      it('should create a new server visit', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1, active: false })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].connectDate).to.be.null
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].connectDate).to.deep.equal(date)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].serverId).to.equal(1)
      })

      it('should not create a new server visit', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })  

      it('should inactivate any server visit of the same player on any other server', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 2, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].playerId).to.equal(2)
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[3].connectDate).to.deep.equal(connectDate)
        expect(result.entities[3].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].serverId).to.equal(2)
      })  
    })

    describe('Match', function() {
      it('should create a new match', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.be.null
        expect(result.entities[0].cvars.fraglimit).to.be.null
        expect(result.entities[0].cvars.g_instagib).to.be.null
        expect(result.entities[0].cvars.g_quadHog).to.be.null
        expect(result.entities[0].cvars.g_training).to.be.null
        expect(result.entities[0].cvars.mercylimit).to.be.null
        expect(result.entities[0].cvars.roundlimit).to.be.null
        expect(result.entities[0].cvars.scorelimit).to.be.null
        expect(result.entities[0].cvars.timelimit).to.be.null
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.be.null
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.be.null
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.be.null
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })  

      it('should not create a new match', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.be.null
        expect(result.entities[0].cvars.fraglimit).to.be.null
        expect(result.entities[0].cvars.g_instagib).to.be.null
        expect(result.entities[0].cvars.g_quadHog).to.be.null
        expect(result.entities[0].cvars.g_training).to.be.null
        expect(result.entities[0].cvars.mercylimit).to.be.null
        expect(result.entities[0].cvars.roundlimit).to.be.null
        expect(result.entities[0].cvars.scorelimit).to.be.null
        expect(result.entities[0].cvars.timelimit).to.be.null
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.be.null
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.be.null
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.be.null
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })

      it('should not create a new match if the current match is warmup', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.count({}, tx())
  
        expect(result.count).to.equal(0)
      })      

      it('should inactivate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })
        
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "333333333333333333333333333333333333",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })
    })

    describe('MatchParticipation', function() {
      it('should create a new new match participation', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchParticipationLogic.read({}, tx())
        
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].team).to.be.null
      })

      it('should not create a new match participation', async function() {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
        
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Blue)
      })

      it('should create a new match participation if the existing one for that match is inactive', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: false, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: false, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA" : {
            "MATCH_GUID" : "111111111111111111111111111111111111",
            "MEDAL" : "FIRSTFRAG",
            "NAME" : "Player",
            "STEAM_ID" : "22222222222222222",
            "TIME" : 23,
            "TOTAL" : 1,
            "WARMUP" : false
         },
         "TYPE" : "PLAYER_MEDAL"
       }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(2)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[2].startDate).to.deep.equal(date)
        expect(result.entities[2].team).to.be.null
      })

      it('should create a new match participation for warmup', async function() {
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchParticipationLogic.read({}, tx())
        
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].team).to.be.null
      })  

      it('should inactivate any former match participations on the same server if the current game is another one', async function() {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Free, warmup: false })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "333333333333333333333333333333333333",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
        
        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].team).to.equal(TeamType.Free)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].finishDate).to.be.null
        expect(result.entities[3].matchId).to.be.null
        expect(result.entities[3].playerId).to.equal(1)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].startDate).to.deep.equal(date)
        expect(result.entities[3].team).to.be.null
      })  

      it('should inactivate any former match participation of the same player on any other servers', async function() {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })
  
        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "222222222222222222222222222222222222",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "11111111111111111",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())
        
        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.be.null
        expect(result.entities[2].playerId).to.equal(1)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[2].startDate).to.deep.equal(date)
        expect(result.entities[2].team).to.be.null
      })  
    })

    describe('Medal', function() {
      it('should create a new medal', async function() {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "222222222222222222222222222222222222",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "33333333333333333",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : false
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)
  
        let result = await Services.get().medalLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].matchId).to.equal(2)
        expect(result.entities[0].matchParticipationId).to.equal(3)
        expect(result.entities[0].medal).to.equal(MedalType.FirstFrag)
        expect(result.entities[0].playerId).to.equal(3)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].warmup).to.equal(false)
      })

      it('should create a new medal for warmup', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })

        let qlEvent = {
          "DATA" : {
             "MATCH_GUID" : "111111111111111111111111111111111111",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Player",
             "STEAM_ID" : "22222222222222222",
             "TIME" : 23,
             "TOTAL" : 1,
             "WARMUP" : true
          },
          "TYPE" : "PLAYER_MEDAL"
        }
    
        let date = new Date
        let event = PlayerMedalEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)
  
        let result = await Services.get().medalLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].matchId).to.be.null
        expect(result.entities[0].matchParticipationId).to.equal(1)
        expect(result.entities[0].medal).to.equal(MedalType.FirstFrag)
        expect(result.entities[0].playerId).to.equal(2)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].warmup).to.equal(true)
      })
    })
  })
})