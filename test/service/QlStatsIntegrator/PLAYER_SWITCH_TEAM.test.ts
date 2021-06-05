import { expect } from 'chai'
import 'mocha'
import { PlayerSwitchTeamEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('PLAYER_SWITCH_TEAM', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }

        let date = new Date
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
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
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
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
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }

        let date = new Date
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
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
      it('should create a new player', async function() {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }
  
        let date = new Date
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
  
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
          "DATA": {
            "KILLER": {
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
  
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
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
  
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
  
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
          "DATA": {
            "KILLER": {
              "NAME": "Player",
              "OLD_TEAM": "FREE",
              "STEAM_ID": "11111111111111111",
              "TEAM": "SPECTATOR"
            },
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
            "TIME": 2222,
            "WARMUP": true
          },
          "TYPE": "PLAYER_SWITCHTEAM"
        }
  
        let date = new Date
        let event = PlayerSwitchTeamEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
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