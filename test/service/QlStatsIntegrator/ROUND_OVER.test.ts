import { expect } from 'chai'
import 'mocha'
import { RoundOverEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('ROUND_OVER', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }

        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
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
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
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
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }

        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })
    })

    describe('Match', function () {
      it('should create a new match', async function() {
        let qlEvent = {
          "DATA": {
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }
    
        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
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
          "DATA": {
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }
    
        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.count({}, tx())
  
        expect(matchesResult.count).to.equal(1)
      })

      it('should not create a new match if the current match is warmup', async function() {
        let qlEvent = {
          "DATA": {
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }
    
        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.count({}, tx())
  
        expect(result.count).to.equal(0)
      })      

      it('should inactivate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })
        
        let qlEvent = {
          "DATA": {
            "MATCH_GUID": "dad7e64b-c397-4984-b343-6943bdc070d0",
            "ROUND": 2,
            "TEAM_WON": "BLUE",
            "TIME": 56,
            "WARMUP": false
          },
          "TYPE": "ROUND_OVER"
        }
    
        let date = new Date
        let event = RoundOverEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })
    })
  })
})