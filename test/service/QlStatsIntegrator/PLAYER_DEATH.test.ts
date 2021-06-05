import { expect } from 'chai'
import 'mocha'
import { PlayerDeathEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('PLAYER_DEATH', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })
    })

    describe('Player', function () {
      it('should create new players', async function() {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }
  
        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should not create new players', async function() {
        let firstSeen = new Date
        await create('player', { name: 'Player1', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
        await create('player', { name: 'Player1', steamId: '22222222222222222', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should update the player names', async function() {
        let firstSeen = new Date
        await create('player', { name: 'OldPlayer1Name', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
        await create('player', { name: 'OldPlayer2Name', steamId: '22222222222222222', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('should set the first seen dates', async function() {
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -48,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 582,
            "VICTIM": {
              "AIRBORNE": true,
              "AMMO": 20,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 439.7825927734375,
                "Y": -175.0157318115234,
                "Z": 452.6065673828125
              },
              "POWERUPS": ["QUAD"],
              "SPEED": 823.2783551144777,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 16.36962890625,
                "Y": -27.57568359375,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }
  
        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())
  
        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })
    })

    describe('ServerVisit', function () {

    })

    describe('Match', function () {

    })

    describe('MatchParticipation', function () {

    })

    describe('Frag', function () {

    })
  })
})