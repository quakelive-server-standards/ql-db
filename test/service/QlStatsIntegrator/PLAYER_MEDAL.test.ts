import { expect } from 'chai'
import 'mocha'
import { MatchStartedEvent, PlayerConnectEvent, PlayerMedalEvent } from 'ql-stats-model'
import { MedalType } from '../../../src/domain/enums/MedalType'
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
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
    })

    describe('Player', function() {
      it('should create a new player', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
        expect(playersResult.entities[0].name).to.equal('Play_ua')
        expect(playersResult.entities[0].steamId).to.equal('76561198157458366')
      })  
    })

    describe('ServerVisit', function() {
      it('should create a new server visit', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
        expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[0].active).to.equal(true)
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      })  
    })

    describe('Match', function() {
      it('should create a new match', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
        expect(matchesResult.entities[0].serverId).to.be.null
        expect(matchesResult.entities[0].startDate).to.deep.equal(date)
      })  
    })

    describe('MatchParticipation', function() {
      it('should create a new new match participation', async function() {
        await create('match_participation', { active: true })
  
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
        expect(matchParticipationsResult.entities[0].startDate).to.be.null
        expect(matchParticipationsResult.entities[0].statsId).to.be.null
        expect(matchParticipationsResult.entities[0].team).to.be.null
      })  
    })

    describe('Medal', function() {
      it('should create a new medal', async function() {
        let qlPlayerMedalEvent = {
          "DATA" : {
             "MATCH_GUID" : "66fe025a-63ff-4852-96bd-9102411e9fb0",
             "MEDAL" : "FIRSTFRAG",
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
             "NAME" : "Play_ua",
             "STEAM_ID" : "76561198157458366",
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
        expect(medalsResult.entities[0].matchId).to.equal(1)
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