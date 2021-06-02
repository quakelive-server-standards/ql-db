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

    describe('Player', function () {

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