import { expect } from 'chai'
import 'mocha'
import { MatchStartedEvent, PlayerConnectEvent, PlayerMedalEvent } from 'ql-stats-model'
import { MedalType } from '../../../src/domain/enums/MedalType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe.only('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_MEDAL', function() {
    it.only('should create a new medal', async function() {
      let qlConnectEvent1 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date1 = new Date
      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event1, tx(), date1)

      let qlConnectEvent2 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "goromir",
           "STEAM_ID" : "76561198145690430",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date2 = new Date
      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)

      let qlMatchStartedEvent = {
        "DATA": {
          "CAPTURE_LIMIT": 8,
          "FACTORY": "duel",
          "FACTORY_TITLE": "Duel",
          "FRAG_LIMIT": 0,
          "GAME_TYPE": "DUEL",
          "INFECTED": 0,
          "INSTAGIB": 0,
          "MAP": "toxicity",
          "MATCH_GUID": "66fe025a-63ff-4852-96bd-9102411e9fb0",
          "MERCY_LIMIT": 0,
          "PLAYERS": [
            {
              "NAME": "Play_ua",
              "STEAM_ID": "76561198157458366",
              "TEAM": 0
            },
            {
              "NAME": "goromir",
              "STEAM_ID": "76561198145690430",
              "TEAM": 0
            }
          ],
          "QUADHOG": 0,
          "ROUND_LIMIT": 10,
          "SCORE_LIMIT": 150,
          "SERVER_TITLE": ".de #topdog.io Ranked Duel #4",
          "TIME_LIMIT": 10,
          "TRAINING": 0
        },
        "TYPE": "MATCH_STARTED"
      }

      let date3 = new Date
      let event3 = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event3, tx(), date3)

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
  
      let date4 = new Date
      let event4 = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event4, tx(), date4)

      let medalsResult = await Services.get().medalLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({ steamId: '76561198157458366' }, tx())
      let player = playersResult.entities[0]
      let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ playerId: player.id }, tx())
      let matchParticipation = matchParticipationsResult.entities[0]

      expect(medalsResult.entities.length).to.equal(1)
      expect(medalsResult.entities[0].date).to.deep.equal(date4)
      expect(medalsResult.entities[0].matchId).to.equal(1)
      expect(medalsResult.entities[0].matchParticipationId).to.equal(matchParticipation.id)
      expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
      expect(medalsResult.entities[0].playerId).to.equal(player.id)
      expect(medalsResult.entities[0].roundId).to.be.null
      expect(medalsResult.entities[0].serverId).to.equal(1)
      expect(medalsResult.entities[0].warmup).to.equal(false)
    })

    it('should create a new medal for warmup', async function() {
      let qlConnectEvent1 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "Play_ua",
           "STEAM_ID" : "76561198157458366",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date1 = new Date
      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event1, tx(), date1)

      let qlConnectEvent2 = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "goromir",
           "STEAM_ID" : "76561198145690430",
           "TIME" : 7,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date2 = new Date
      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx(), date2)

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
  
      let date3 = new Date
      let event3 = PlayerMedalEvent.fromQl(qlPlayerMedalEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event3, tx(), date3)

      let medalsResult = await Services.get().medalLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({ steamId: '76561198157458366' }, tx())
      let player = playersResult.entities[0]

      expect(medalsResult.entities.length).to.equal(1)
      expect(medalsResult.entities[0].date).to.deep.equal(date3)
      expect(medalsResult.entities[0].matchId).to.equal(1)
      expect(medalsResult.entities[0].matchParticipationId).to.be.null
      expect(medalsResult.entities[0].medal).to.equal(MedalType.FirstFrag)
      expect(medalsResult.entities[0].playerId).to.equal(player.id)
      expect(medalsResult.entities[0].roundId).to.be.null
      expect(medalsResult.entities[0].serverId).to.equal(1)
      expect(medalsResult.entities[0].warmup).to.equal(true)

      let matchesResult = await Services.get().matchLogic.count({}, tx())
      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())

      expect(matchesResult.count).to.equal(0)
      expect(matchParticipationsResult.count).to.equal(0)
    })

    it('should create a new medal with a new server, a new player, a new server visit, a new match and a new match participation while setting former match participations active state to false', async function() {
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

      let serversResult = await Services.get().serverLogic.read({}, tx())

      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].firstSeen).to.deep.equal(date)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
      expect(serversResult.entities[0].title).to.be.null

      let playersResult = await Services.get().playerLogic.read({}, tx())

      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].model).to.be.null
      expect(playersResult.entities[0].name).to.equal('Play_ua')
      expect(playersResult.entities[0].steamId).to.equal('76561198157458366')

      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())

      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].active).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)

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

      let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ matchId: 1 }, tx())
      
      expect(matchParticipationsResult.entities.length).to.equal(1)
      expect(matchParticipationsResult.entities[0].finishDate).to.be.null
      expect(matchParticipationsResult.entities[0].matchId).to.equal(1)
      expect(matchParticipationsResult.entities[0].playerId).to.equal(1)
      expect(matchParticipationsResult.entities[0].roundId).to.be.null
      expect(matchParticipationsResult.entities[0].serverId).to.equal(1)
      expect(matchParticipationsResult.entities[0].startDate).to.be.null
      expect(matchParticipationsResult.entities[0].statsId).to.be.null
      expect(matchParticipationsResult.entities[0].team).to.be.null

      let otherMatchParticipationsResult = await Services.get().matchParticipationLogic.read({ matchId: { operator: '!=', value: 1 }}, tx())

      expect(otherMatchParticipationsResult.entities.length).to.equal(1)
      expect(otherMatchParticipationsResult.entities[0].active).to.equal(false)

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

    it('should create a new medal for warmup with a new server, a new player and a new server visit', async function() {
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

      let playersResult = await Services.get().playerLogic.read({}, tx())

      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].model).to.be.null
      expect(playersResult.entities[0].name).to.equal('Play_ua')
      expect(playersResult.entities[0].steamId).to.equal('76561198157458366')

      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())

      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].active).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)

      let matchesResult = await Services.get().matchLogic.count({}, tx())

      expect(matchesResult.count).to.equal(0)

      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())
      
      expect(matchParticipationsResult.count).to.equal(0)

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
  })
})