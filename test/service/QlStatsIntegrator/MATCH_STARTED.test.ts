import { expect } from 'chai'
import 'mocha'
import { MatchStartedEvent, PlayerConnectEvent } from 'ql-stats-model'
import { GameType } from '../../../src/domain/enums/GameType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function() {
  describe('MATCH_STARTED', function() {
    describe('Server', function() {
      it('should create a new server', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('.de #topdog.io Ranked Duel #4')
      })

      it('should not create a new server', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })
  
        let qlEvent = {
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
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('.de #topdog.io Ranked Duel #4')
      })

      it('should update the first seen date', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
  
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('.de #topdog.io Ranked Duel #4')
      })

      it('should update the server title', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, title: '.de #topdog.io Ranked Duel #3', firstSeen: firstSeen })
  
        let qlEvent = {
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
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('.de #topdog.io Ranked Duel #4')
      })
    })

    describe('Factory', function() {
      it('should create a new factory', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let factoriesResult = await Services.get().factoryLogic.read({}, tx())
    
        expect(factoriesResult.entities.length).to.equal(1)
        expect(factoriesResult.entities[0].gameType).to.equal(GameType.Duel)
        expect(factoriesResult.entities[0].name).to.equal('duel')
        expect(factoriesResult.entities[0].title).to.equal('Duel')
      })

      it('should not create a new factory', async function() {
        await create('factory', { gameType: GameType.Duel, name: 'duel', title: 'Duel' })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let factoriesResult = await Services.get().factoryLogic.read({}, tx())
    
        expect(factoriesResult.entities.length).to.equal(1)
        expect(factoriesResult.entities[0].gameType).to.equal(GameType.Duel)
        expect(factoriesResult.entities[0].name).to.equal('duel')
        expect(factoriesResult.entities[0].title).to.equal('Duel')
      })

      it('should update the factory title', async function() {
        await create('factory', { gameType: GameType.Duel, name: 'duel', title: 'Duel' })
  
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let factoriesResult = await Services.get().factoryLogic.read({}, tx())
  
        expect(factoriesResult.entities.length).to.equal(1)
        expect(factoriesResult.entities[0].name).to.equal('duel')
        expect(factoriesResult.entities[0].title).to.equal('Duel1')
      })
  
      it('should not update the factory title if the game type is different', async function() {
        await create('factory', { gameType: GameType.Domination, name: 'duel', title: 'Duel' })
  
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
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
    })

    describe('Map', function() {
      it('should create a new map', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let mapsResult = await Services.get().mapLogic.read({}, tx())

        expect(mapsResult.entities.length).to.equal(1)
        expect(mapsResult.entities[0].name).to.equal('toxicity')
      })

      it('should not create a new map', async function() {
        await create('map', { name: 'toxicity' })
  
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let mapsResult = await Services.get().mapLogic.count({}, tx())
  
        expect(mapsResult.count).to.equal(1)
      })  
    })

    describe('Player', function() {
      it('should create new players', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('goromir')
        expect(playersResult.entities[0].steamId).to.equal('76561198145690430')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Play_ua')
        expect(playersResult.entities[1].steamId).to.equal('76561198157458366')
      })

      it('should not create new players', async function() {
        await create('player', { steamId: '76561198157458366' })
        await create('player', { steamId: '76561198145690430' })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('goromir')
        expect(playersResult.entities[0].steamId).to.equal('76561198145690430')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Play_ua')
        expect(playersResult.entities[1].steamId).to.equal('76561198157458366')
      })

      it('should update the player names', async function() {
        await create('player', { steamId: '76561198157458366', name: 'a' })
        await create('player', { steamId: '76561198145690430', name: 'b' })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('goromir')
        expect(playersResult.entities[0].steamId).to.equal('76561198145690430')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Play_ua')
        expect(playersResult.entities[1].steamId).to.equal('76561198157458366')
      })

      it('should set the first seen dates', async function() {
        await create('player', { steamId: '76561198157458366' })
        await create('player', { steamId: '76561198145690430' })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('goromir')
        expect(playersResult.entities[0].steamId).to.equal('76561198145690430')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Play_ua')
        expect(playersResult.entities[1].steamId).to.equal('76561198157458366')
      })
    })

    describe('ServerVisit', function() {
      it('should create new server visits', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(serverVisitsResult.entities.length).to.equal(2)
        expect(serverVisitsResult.entities[0].active).to.equal(true)
        expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[0].playerId).to.equal(1)
        expect(serverVisitsResult.entities[0].serverId).to.equal(1)
        expect(serverVisitsResult.entities[1].active).to.equal(true)
        expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[1].playerId).to.equal(2)
        expect(serverVisitsResult.entities[1].serverId).to.equal(1)
      })
  
      it('should not create new server visits', async function() {
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
  
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let serverVisitsResult = await Services.get().serverVisitLogic.count({}, tx())
    
        expect(serverVisitsResult.count).to.equal(2)
      })

      it('should inactivate server visits on different servers', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server_visit', { active: true, serverId: 1 })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)
    
        let serverVisitsResult = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
    
        expect(serverVisitsResult.entities.length).to.equal(3)
        expect(serverVisitsResult.entities[0].active).to.equal(false)
        expect(serverVisitsResult.entities[0].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[1].active).to.equal(true)
        expect(serverVisitsResult.entities[1].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[1].disconnectDate).to.be.null
        expect(serverVisitsResult.entities[2].active).to.equal(true)
        expect(serverVisitsResult.entities[2].connectDate).to.deep.equal(date)
        expect(serverVisitsResult.entities[2].disconnectDate).to.be.null
      })
    })

    describe('Match', function() {
      it('should create a new match', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({}, tx())
    
        expect(matchesResult.entities.length).to.equal(1)
        expect(matchesResult.entities[0].aborted).to.be.null
        expect(matchesResult.entities[0].active).to.equal(true)
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
      })

      it('should inactivate any former matches on the same server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, active: true, guid: '66fe025a-63ff-4852-96bd-9102411e9fb1' })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchesResult = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
    
        expect(matchesResult.entities.length).to.equal(2)
        expect(matchesResult.entities[0].active).to.equal(false)
        expect(matchesResult.entities[1].active).to.equal(true)
      })
    })

    describe('MatchParticipation', function() {
      it('should create new match participations', async function() {
        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({}, tx())
    
        expect(matchParticipationsResult.entities.length).to.equal(2)
        expect(matchParticipationsResult.entities[0].id).to.equal(1)
        expect(matchParticipationsResult.entities[0].active).to.equal(true)
        expect(matchParticipationsResult.entities[0].finishDate).to.be.null
        expect(matchParticipationsResult.entities[0].matchId).to.equal(1)
        expect(matchParticipationsResult.entities[0].playerId).to.equal(1)
        expect(matchParticipationsResult.entities[0].roundId).to.be.null
        expect(matchParticipationsResult.entities[0].serverId).to.equal(1)
        expect(matchParticipationsResult.entities[0].startDate).to.deep.equal(date)
        expect(matchParticipationsResult.entities[0].statsId).to.be.null
        expect(matchParticipationsResult.entities[0].team).to.equal(TeamType.Free)
        expect(matchParticipationsResult.entities[1].id).to.equal(2)
        expect(matchParticipationsResult.entities[1].active).to.equal(true)
        expect(matchParticipationsResult.entities[1].finishDate).to.be.null
        expect(matchParticipationsResult.entities[1].matchId).to.equal(1)
        expect(matchParticipationsResult.entities[1].playerId).to.equal(2)
        expect(matchParticipationsResult.entities[1].roundId).to.be.null
        expect(matchParticipationsResult.entities[1].serverId).to.equal(1)
        expect(matchParticipationsResult.entities[1].startDate).to.deep.equal(date)
        expect(matchParticipationsResult.entities[1].statsId).to.be.null
        expect(matchParticipationsResult.entities[1].team).to.equal(TeamType.Free)
      })

      it('should inactivate any former match participations on the same server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match_participation', { serverId: 1, active: true, startDate: new Date, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, active: true, startDate: new Date, team: TeamType.Red })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(matchParticipationsResult.entities.length).to.equal(4)
        expect(matchParticipationsResult.entities[0].active).to.equal(false)
        expect(matchParticipationsResult.entities[1].active).to.equal(false)
        expect(matchParticipationsResult.entities[2].active).to.equal(true)
        expect(matchParticipationsResult.entities[3].active).to.equal(true)
      })

      it('should inactivate any former match participation of the same player on any other server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('server', { ip: '127.0.0.1', port: 27962 })
        await create('player', { steamId: '76561198157458366' })
        await create('player', { steamId: '76561198145690430' })
        await create('match_participation', { playerId: 1, serverId: 2, active: true, startDate: new Date, team: TeamType.Red })
        await create('match_participation', { playerId: 2, serverId: 3, active: true, startDate: new Date, team: TeamType.Blue })

        let qlEvent = {
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
        let event = MatchStartedEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let matchParticipationsResult = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(matchParticipationsResult.entities.length).to.equal(4)
        expect(matchParticipationsResult.entities[0].active).to.equal(false)
        expect(matchParticipationsResult.entities[1].active).to.equal(false)
        expect(matchParticipationsResult.entities[2].active).to.equal(true)
        expect(matchParticipationsResult.entities[3].active).to.equal(true)
      })
    })
  })
})
