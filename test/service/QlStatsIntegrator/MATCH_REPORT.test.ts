import { expect } from 'chai'
import 'mocha'
import { MatchReportEvent } from 'ql-stats-model'
import { GameType } from '../../../src/domain/enums/GameType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('MATCH_REPORT', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
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
        expect(result.entities[0].title).to.equal('Server Title')
      })

      it('should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
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
        expect(result.entities[0].title).to.equal('Server Title')
      })

      it('should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
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
        expect(result.entities[0].title).to.equal('Server Title')
      })

      it('should update the server title', async function() {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, title: 'QL Fight Club', firstSeen: firstSeen })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
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
        expect(result.entities[0].title).to.equal('Server Title')
      })
    })

    describe('Factory', function() {
      it('should create a new factory', async function() {
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
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
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
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
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel1",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
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
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel1",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
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
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().mapLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].name).to.equal('toxicity')
      })

      it('should not create a new map', async function() {
        await create('map', { name: 'toxicity' })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
  
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().mapLogic.count({}, tx())
  
        expect(result.count).to.equal(1)
      })  
    })

    describe('Match', function () {
      it('should create a new match', async function() {
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
    
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.equal(true)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.equal(1)
        expect(result.entities[0].cvars.fraglimit).to.equal(2)
        expect(result.entities[0].cvars.g_instagib).to.equal(true)
        expect(result.entities[0].cvars.g_quadHog).to.equal(false)
        expect(result.entities[0].cvars.g_training).to.equal(false)
        expect(result.entities[0].cvars.mercylimit).to.equal(3)
        expect(result.entities[0].cvars.roundlimit).to.equal(4)
        expect(result.entities[0].cvars.scorelimit).to.equal(5)
        expect(result.entities[0].cvars.timelimit).to.equal(6)
        expect(result.entities[0].exitMessage).to.equal('Shutdown')
        expect(result.entities[0].factoryId).to.equal(1)
        expect(result.entities[0].finishDate).to.deep.equal(date)
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.equal(6350)
        expect(result.entities[0].length).to.equal(727)
        expect(result.entities[0].mapId).to.equal(1)
        expect(result.entities[0].restarted).to.equal(true)
        expect(result.entities[0].score1).to.equal(7)
        expect(result.entities[0].score2).to.equal(8)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.gameLength)))
      })  

      it('should not create a new match', async function() {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true, startDate: startDate })

        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.equal(true)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.equal(1)
        expect(result.entities[0].cvars.fraglimit).to.equal(2)
        expect(result.entities[0].cvars.g_instagib).to.equal(true)
        expect(result.entities[0].cvars.g_quadHog).to.equal(false)
        expect(result.entities[0].cvars.g_training).to.equal(false)
        expect(result.entities[0].cvars.mercylimit).to.equal(3)
        expect(result.entities[0].cvars.roundlimit).to.equal(4)
        expect(result.entities[0].cvars.scorelimit).to.equal(5)
        expect(result.entities[0].cvars.timelimit).to.equal(6)
        expect(result.entities[0].exitMessage).to.equal('Shutdown')
        expect(result.entities[0].factoryId).to.equal(1)
        expect(result.entities[0].finishDate).to.deep.equal(date)
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.equal(6350)
        expect(result.entities[0].length).to.equal(727)
        expect(result.entities[0].mapId).to.equal(1)
        expect(result.entities[0].restarted).to.equal(true)
        expect(result.entities[0].score1).to.equal(7)
        expect(result.entities[0].score2).to.equal(8)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.gameLength)))
      })

      it('should inactivate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })
        
        let qlEvent = {
          "DATA": {
            "ABORTED": true,
            "CAPTURE_LIMIT": 1,
            "EXIT_MSG": "Shutdown",
            "FACTORY": "duel",
            "FACTORY_TITLE": "Duel",
            "FIRST_SCORER": "none",
            "FRAG_LIMIT": 2,
            "GAME_LENGTH": 727,
            "GAME_TYPE": "DUEL",
            "INFECTED": 0,
            "INSTAGIB": 1,
            "LAST_LEAD_CHANGE_TIME": 6350,
            "LAST_SCORER": "none",
            "LAST_TEAMSCORER": "none",
            "MAP": "toxicity",
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MERCY_LIMIT": 3,
            "QUADHOG": 0,
            "RESTARTED": 1,
            "ROUND_LIMIT": 4,
            "SCORE_LIMIT": 5,
            "SERVER_TITLE": "Server Title",
            "TIME_LIMIT": 6,
            "TRAINING": 0,
            "TSCORE0": 7,
            "TSCORE1": 8
          },
          "TYPE": "MATCH_REPORT"
        }
    
        let date = new Date
        let event = MatchReportEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[2].aborted).to.equal(true)
        expect(result.entities[2].active).to.equal(false)
        expect(result.entities[2].cvars).to.be.not.null
        expect(result.entities[2].cvars.capturelimit).to.equal(1)
        expect(result.entities[2].cvars.fraglimit).to.equal(2)
        expect(result.entities[2].cvars.g_instagib).to.equal(true)
        expect(result.entities[2].cvars.g_quadHog).to.equal(false)
        expect(result.entities[2].cvars.g_training).to.equal(false)
        expect(result.entities[2].cvars.mercylimit).to.equal(3)
        expect(result.entities[2].cvars.roundlimit).to.equal(4)
        expect(result.entities[2].cvars.scorelimit).to.equal(5)
        expect(result.entities[2].cvars.timelimit).to.equal(6)
        expect(result.entities[2].exitMessage).to.equal('Shutdown')
        expect(result.entities[2].factoryId).to.equal(1)
        expect(result.entities[2].finishDate).to.deep.equal(date)
        expect(result.entities[2].guid).to.equal('333333333333333333333333333333333333')
        expect(result.entities[2].lastLeadChangeTime).to.equal(6350)
        expect(result.entities[2].length).to.equal(727)
        expect(result.entities[2].mapId).to.equal(1)
        expect(result.entities[2].restarted).to.equal(true)
        expect(result.entities[2].score1).to.equal(7)
        expect(result.entities[2].score2).to.equal(8)
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[2].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.gameLength)))
      })
    })
  })
})