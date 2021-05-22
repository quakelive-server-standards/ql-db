import { expect } from 'chai'
import 'mocha'
import { MatchStartedEvent, PlayerConnectEvent } from 'ql-stats-model'
import { GameType } from '../../../src/domain/enums/GameType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('MATCH_STARTED', function() {
    it('should create a new match with match participations and a new factory and a new map', async function() {
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

      let event1 = PlayerConnectEvent.fromQl(qlConnectEvent1['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event1, tx())

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

      let event2 = PlayerConnectEvent.fromQl(qlConnectEvent2['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event2, tx())

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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.count({}, tx())
      let playersResult = await Services.get().playerLogic.count({}, tx())
      let serverVisitsResult = await Services.get().serverVisitLogic.count({}, tx())
      let factoriesResult = await Services.get().factoryLogic.read({}, tx())
      let mapsResult = await Services.get().mapLogic.read({}, tx())
      let matchesResult = await Services.get().matchLogic.read({}, tx())
      let matchParticipationsResult = await Services.get().matchParticipationLogic.read({}, tx())
  
      expect(serversResult.count).to.equal(1)
      expect(playersResult.count).to.equal(2)
      expect(serverVisitsResult.count).to.equal(2)

      expect(factoriesResult.entities.length).to.equal(1)
      expect(factoriesResult.entities[0].gameType).to.equal(GameType.Duel)
      expect(factoriesResult.entities[0].name).to.equal('duel')
      expect(factoriesResult.entities[0].title).to.equal('Duel')

      expect(mapsResult.entities.length).to.equal(1)
      expect(mapsResult.entities[0].name).to.equal('toxicity')

      expect(matchesResult.entities.length).to.equal(1)
      expect(matchesResult.entities[0].aborted).to.be.null
      expect(matchesResult.entities[0].cvars).to.be.not.null
      expect(matchesResult.entities[0].cvars.capturelimit).to.equal(8)
      expect(matchesResult.entities[0].cvars.fraglimit).to.equal(0)
      expect(matchesResult.entities[0].cvars.g_instagib).to.equal(false)
      expect(matchesResult.entities[0].cvars.g_quadHog).to.equal(false)
      expect(matchesResult.entities[0].cvars.g_training).to.equal(false)
      expect(matchesResult.entities[0].cvars.mercylimit).to.equal(0)
      expect(matchesResult.entities[0].cvars.roundlimit).to.equal(10)
      expect(matchesResult.entities[0].cvars.scorelimit).to.equal(150)
      expect(matchesResult.entities[0].cvars.timelimit).to.equal(10)
      expect(matchesResult.entities[0].exitMessage).to.be.null
      expect(matchesResult.entities[0].factoryId).to.equal(1)
      expect(matchesResult.entities[0].finishDate).to.be.null
      expect(matchesResult.entities[0].guid).to.equal('66fe025a-63ff-4852-96bd-9102411e9fb0')
      expect(matchesResult.entities[0].length).to.be.null
      expect(matchesResult.entities[0].mapId).to.equal(1)
      expect(matchesResult.entities[0].restarted).to.be.null
      expect(matchesResult.entities[0].score1).to.be.null
      expect(matchesResult.entities[0].score2).to.be.null
      expect(matchesResult.entities[0].serverId).to.equal(1)
      expect(matchesResult.entities[0].startDate).to.deep.equal(date)

      expect(matchParticipationsResult.entities.length).to.equal(2)
      expect(matchParticipationsResult.entities[0].id).to.equal(1)
      expect(matchParticipationsResult.entities[0].finishDate).to.be.null
      expect(matchParticipationsResult.entities[0].matchId).to.equal(1)
      expect(matchParticipationsResult.entities[0].playerId).to.equal(1)
      expect(matchParticipationsResult.entities[0].roundId).to.be.null
      expect(matchParticipationsResult.entities[0].serverId).to.equal(1)
      expect(matchParticipationsResult.entities[0].startDate).to.deep.equal(date)
      expect(matchParticipationsResult.entities[0].statsId).to.be.null
      expect(matchParticipationsResult.entities[0].team).to.equal(TeamType.Free)
      expect(matchParticipationsResult.entities[1].id).to.equal(2)
      expect(matchParticipationsResult.entities[1].finishDate).to.be.null
      expect(matchParticipationsResult.entities[1].matchId).to.equal(1)
      expect(matchParticipationsResult.entities[1].playerId).to.equal(2)
      expect(matchParticipationsResult.entities[1].roundId).to.be.null
      expect(matchParticipationsResult.entities[1].serverId).to.equal(1)
      expect(matchParticipationsResult.entities[1].startDate).to.deep.equal(date)
      expect(matchParticipationsResult.entities[1].statsId).to.be.null
      expect(matchParticipationsResult.entities[1].team).to.equal(TeamType.Free)
    })

    it('should create the server visits if the PLAYER_CONNECT events were missing', async function() {
      await create('player', { name: 'Play_ua', steamId: '76561198157458366' })
      await create('player', { name: 'goromir', steamId: '76561198145690430' })

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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.count({}, tx())
      let factoriesResult = await Services.get().factoryLogic.count({}, tx())
      let mapsResult = await Services.get().mapLogic.count({}, tx())
      let matchesResult = await Services.get().matchLogic.count({}, tx())
      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())
      let playersResult = await Services.get().playerLogic.count({}, tx())

      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serversResult.count).to.equal(1)
      expect(factoriesResult.count).to.equal(1)
      expect(mapsResult.count).to.equal(1)
      expect(matchesResult.count).to.equal(1)
      expect(matchParticipationsResult.count).to.equal(2)
      expect(playersResult.count).to.equal(2)

      expect(serverVisitsResult.entities.length).to.equal(2)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].justNow).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[1].justNow).to.equal(true)
      expect(serverVisitsResult.entities[1].playerId).to.equal(2)
      expect(serverVisitsResult.entities[1].serverId).to.equal(1)
    })

    it('should create the server visits and the players if the PLAYER_CONNECT events were missing', async function() {
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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.count({}, tx())
      let factoriesResult = await Services.get().factoryLogic.count({}, tx())
      let mapsResult = await Services.get().mapLogic.count({}, tx())
      let matchesResult = await Services.get().matchLogic.count({}, tx())
      let matchParticipationsResult = await Services.get().matchParticipationLogic.count({}, tx())

      let playersResult = await Services.get().playerLogic.read({}, tx())
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serversResult.count).to.equal(1)
      expect(factoriesResult.count).to.equal(1)
      expect(mapsResult.count).to.equal(1)
      expect(matchesResult.count).to.equal(1)
      expect(matchParticipationsResult.count).to.equal(2)

      expect(playersResult.entities.length).to.equal(2)
      expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[0].name).to.equal('Play_ua')
      expect(playersResult.entities[0].steamId).to.equal('76561198157458366')
      expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
      expect(playersResult.entities[1].name).to.equal('goromir')
      expect(playersResult.entities[1].steamId).to.equal('76561198145690430')

      expect(serverVisitsResult.entities.length).to.equal(2)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[0].justNow).to.equal(true)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
      expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
      expect(serverVisitsResult.entities[1].justNow).to.equal(true)
      expect(serverVisitsResult.entities[1].playerId).to.equal(2)
      expect(serverVisitsResult.entities[1].serverId).to.equal(1)
    })

    it('should update the factory title', async function() {
      await create('factory', { gameType: GameType.Duel, name: 'duel', title: 'Duel' })

      let qlMatchStartedEvent = {
        "DATA": {
          "CAPTURE_LIMIT": 8,
          "FACTORY": "duel",
          "FACTORY_TITLE": "Duel1",
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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let factoriesResult = await Services.get().factoryLogic.read({}, tx())

      expect(factoriesResult.entities.length).to.equal(1)
      expect(factoriesResult.entities[0].name).to.equal('duel')
      expect(factoriesResult.entities[0].title).to.equal('Duel1')
    })

    it('should not update the factory title if the game type is different', async function() {
      await create('factory', { gameType: GameType.Domination, name: 'duel', title: 'Duel' })

      let qlMatchStartedEvent = {
        "DATA": {
          "CAPTURE_LIMIT": 8,
          "FACTORY": "duel",
          "FACTORY_TITLE": "Duel1",
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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let factoriesResult = await Services.get().factoryLogic.read({}, tx())

      expect(factoriesResult.entities.length).to.equal(2)
      expect(factoriesResult.entities[0].gameType).to.equal(GameType.Domination)
      expect(factoriesResult.entities[0].name).to.equal('duel')
      expect(factoriesResult.entities[0].title).to.equal('Duel')
      expect(factoriesResult.entities[1].gameType).to.equal(GameType.Duel)
      expect(factoriesResult.entities[1].name).to.equal('duel')
      expect(factoriesResult.entities[1].title).to.equal('Duel1')
    })

    it('should not create a new map', async function() {
      await create('map', { name: 'toxicity' })

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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let mapsResult = await Services.get().mapLogic.count({}, tx())

      expect(mapsResult.count).to.equal(1)
    })

    it('should not create a new server', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960 })

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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.count({}, tx())

      expect(serversResult.count).to.equal(1)
    })

    it('should update the server title', async function() {
      await create('server', { ip: '127.0.0.1', port: 27960, title: '.de #topdog.io Ranked Duel #3' })

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

      let date = new Date
      let event = MatchStartedEvent.fromQl(qlMatchStartedEvent['DATA'])
      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.read({}, tx())

      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
      expect(serversResult.entities[0].title).to.equal('.de #topdog.io Ranked Duel #4')
    })
  })
})
