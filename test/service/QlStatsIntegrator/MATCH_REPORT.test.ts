import { expect } from 'chai'
import 'mocha'
import { MatchReportEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('MATCH_REPORT', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 8,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "stdduel",
            "FACTORY_TITLE": "Standard Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 0,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 0,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "kaos",
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MERCY_LIMIT": 0,
            "QUADHOG": 0,
            "RESTARTED": 0,
            "ROUND_LIMIT": 10,
            "SCORE_LIMIT": 150,
            "SERVER_TITLE": "QL Fight Club - Fresh Maps",
            "TIME_LIMIT": 10,
            "TRAINING": 0,
            "TSCORE0": 0,
            "TSCORE1": 0
          },
          "TYPE": "MATCH_REPORT"
        }

        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('QL Fight Club - Fresh Maps')
      })

      it('should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 8,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "stdduel",
            "FACTORY_TITLE": "Standard Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 0,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 0,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "kaos",
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MERCY_LIMIT": 0,
            "QUADHOG": 0,
            "RESTARTED": 0,
            "ROUND_LIMIT": 10,
            "SCORE_LIMIT": 150,
            "SERVER_TITLE": "QL Fight Club - Fresh Maps",
            "TIME_LIMIT": 10,
            "TRAINING": 0,
            "TSCORE0": 0,
            "TSCORE1": 0
          },
          "TYPE": "MATCH_REPORT"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('QL Fight Club - Fresh Maps')
      })

      it('should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 8,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "stdduel",
            "FACTORY_TITLE": "Standard Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 0,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 0,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "kaos",
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MERCY_LIMIT": 0,
            "QUADHOG": 0,
            "RESTARTED": 0,
            "ROUND_LIMIT": 10,
            "SCORE_LIMIT": 150,
            "SERVER_TITLE": "QL Fight Club - Fresh Maps",
            "TIME_LIMIT": 10,
            "TRAINING": 0,
            "TSCORE0": 0,
            "TSCORE1": 0
          },
          "TYPE": "MATCH_REPORT"
        }

        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('QL Fight Club - Fresh Maps')
      })

      it('should update the server title', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, title: 'QL Fight Club', firstSeen: firstSeen })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 8,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "stdduel",
            "FACTORY_TITLE": "Standard Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 0,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 0,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "kaos",
            "MATCH_GUID": "d23d30e4-2137-4a33-b085-9db594e67d5a",
            "MERCY_LIMIT": 0,
            "QUADHOG": 0,
            "RESTARTED": 0,
            "ROUND_LIMIT": 10,
            "SCORE_LIMIT": 150,
            "SERVER_TITLE": "QL Fight Club - Fresh Maps",
            "TIME_LIMIT": 10,
            "TRAINING": 0,
            "TSCORE0": 0,
            "TSCORE1": 0
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().serverLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.equal('QL Fight Club - Fresh Maps')
      })
    })

    describe('Match', function () {

    })
  })
})