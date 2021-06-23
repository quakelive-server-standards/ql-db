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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().factoryLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].gameType).to.equal(GameType.Duel)
        expect(result.entities[0].name).to.equal('duel')
        expect(result.entities[0].title).to.equal('Duel')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().factoryLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].gameType).to.equal(GameType.Duel)
        expect(result.entities[0].name).to.equal('duel')
        expect(result.entities[0].title).to.equal('Duel')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().factoryLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].name).to.equal('duel')
        expect(result.entities[0].title).to.equal('Duel1')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().factoryLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].gameType).to.equal(GameType.Domination)
        expect(result.entities[0].name).to.equal('duel')
        expect(result.entities[0].title).to.equal('Duel')
        expect(result.entities[1].gameType).to.equal(GameType.Duel)
        expect(result.entities[1].name).to.equal('duel')
        expect(result.entities[1].title).to.equal('Duel1')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().mapLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].name).to.equal('toxicity')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().mapLogic.count({}, tx())
  
        expect(result.count).to.equal(1)
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player1')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[1].firstSeen).to.deep.equal(date)
        expect(result.entities[1].model).to.be.null
        expect(result.entities[1].name).to.equal('Player2')
        expect(result.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should not create new players', async function() {
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })

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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player1')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[1].firstSeen).to.deep.equal(date)
        expect(result.entities[1].model).to.be.null
        expect(result.entities[1].name).to.equal('Player2')
        expect(result.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should update the player names', async function() {
        await create('player', { steamId: '11111111111111111', name: 'a' })
        await create('player', { steamId: '22222222222222222', name: 'b' })

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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player1')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[1].firstSeen).to.deep.equal(date)
        expect(result.entities[1].model).to.be.null
        expect(result.entities[1].name).to.equal('Player2')
        expect(result.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should set the first seen dates', async function() {
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })

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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player1')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[1].firstSeen).to.deep.equal(date)
        expect(result.entities[1].model).to.be.null
        expect(result.entities[1].name).to.equal('Player2')
        expect(result.entities[1].steamId).to.equal('22222222222222222')
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(date)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(date)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].serverId).to.equal(1)
      })
  
      it('should not create new server visits', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 2, active: true, connectDate: connectDate })
  
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].serverId).to.equal(1)
      })

      it('should inactivate server visits of the players on different servers', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })
        await create('player', { name: 'Player3', steamId: '33333333333333333', model: 'sarge' })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 3, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 3, active: true, connectDate: connectDate })

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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
    
        expect(result.entities.length).to.equal(6)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].connectDate).to.deep.equal(connectDate)
        expect(result.entities[3].disconnectDate).to.be.null
        expect(result.entities[4].active).to.equal(true)
        expect(result.entities[4].connectDate).to.deep.equal(date)
        expect(result.entities[4].disconnectDate).to.be.null
        expect(result.entities[5].active).to.equal(true)
        expect(result.entities[5].connectDate).to.deep.equal(date)
        expect(result.entities[5].disconnectDate).to.be.null
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().matchLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.equal(8)
        expect(result.entities[0].cvars.fraglimit).to.equal(0)
        expect(result.entities[0].cvars.g_instagib).to.equal(false)
        expect(result.entities[0].cvars.g_quadHog).to.equal(false)
        expect(result.entities[0].cvars.g_training).to.equal(false)
        expect(result.entities[0].cvars.mercylimit).to.equal(0)
        expect(result.entities[0].cvars.roundlimit).to.equal(10)
        expect(result.entities[0].cvars.scorelimit).to.equal(150)
        expect(result.entities[0].cvars.timelimit).to.equal(10)
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.equal(1)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.equal(1)
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
      })

      it('should inactivate any former matches on the same server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, active: true, guid: '111111111111111111111111111111111111' })

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
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
    
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
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
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().matchParticipationLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].id).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Free)
        expect(result.entities[1].id).to.equal(2)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(date)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Free)
      })

      it('should inactivate any former match participations on the same server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: new Date, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 1, matchId: 1, active: true, startDate: new Date, team: TeamType.Red })

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
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[3].active).to.equal(true)
      })

      it('should inactivate any former match participation of the same player on any other server', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('server', { ip: '127.0.0.1', port: 27962 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 2, playerId: 1 })
        await create('server_visit', { serverId: 3, playerId: 2 })
        await create('server_visit', { serverId: 1, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 3, guid: '222222222222222222222222222222222222', active: true })
        await create('match', { serverId: 1, guid: '333333333333333333333333333333333333', active: true })
        await create('match_participation', { playerId: 1, serverId: 2, serverVisitId: 1, matchId: 1, active: true, startDate: new Date, team: TeamType.Red })
        await create('match_participation', { playerId: 2, serverId: 3, serverVisitId: 2, matchId: 2, active: true, startDate: new Date, team: TeamType.Blue })
        await create('match_participation', { playerId: 3, serverId: 1, serverVisitId: 3, matchId: 3, active: true, startDate: new Date, team: TeamType.Blue })
        await create('match_participation', { playerId: 3, serverId: 2, serverVisitId: 4, matchId: 1, active: true, startDate: new Date, team: TeamType.Blue })

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
            "MATCH_GUID": "444444444444444444444444444444444444",
            "MERCY_LIMIT": 0,
            "PLAYERS": [
              {
                "NAME": "Player1",
                "STEAM_ID": "11111111111111111",
                "TEAM": 0
              },
              {
                "NAME": "Player2",
                "STEAM_ID": "22222222222222222",
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
    
        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(6)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[2].active).to.equal(false)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[4].active).to.equal(true)
        expect(result.entities[5].active).to.equal(true)
      })
    })
  })
})
