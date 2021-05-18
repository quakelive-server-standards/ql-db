import { expect } from 'chai'
import 'mocha'
import { PlayerConnectEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { tx } from '../../tools'

describe.only('service/QlStatsIntegrator.ts', function() {
  describe('PLAYER_CONNECT', function() {
    it('should create a new ServerVisit together with a new server and a new player', async function() {
      let qlConnectEvent = {
        "DATA" : {
           "MATCH_GUID" : "95d60017-6adb-43bf-a146-c1757194d5fc",
           "NAME" : "garz",
           "STEAM_ID" : "76561198170654797",
           "TIME" : 8367,
           "WARMUP" : true
        },
        "TYPE" : "PLAYER_CONNECT"
      }

      let date = new Date
      let event = PlayerConnectEvent.fromQl(qlConnectEvent['DATA'])

      await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
      let serversResult = await Services.get().serverLogic.read({}, tx())
      let playersResult = await Services.get().playerLogic.read({}, tx())
      let serverVisitsResult = await Services.get().serverVisitLogic.read({}, tx())
  
      expect(serversResult.isValue()).to.be.true
      expect(serversResult.entities.length).to.equal(1)
      expect(serversResult.entities[0].ip).to.equal('127.0.0.1')
      expect(serversResult.entities[0].port).to.equal(27960)
  
      expect(playersResult.isValue()).to.be.true
      expect(playersResult.entities.length).to.equal(1)
      expect(playersResult.entities[0].name).to.equal('garz')
      expect(playersResult.entities[0].steamId).to.equal('76561198170654797')
  
      expect(serverVisitsResult.isValue()).to.be.true
      expect(serverVisitsResult.entities.length).to.equal(1)
      expect(serverVisitsResult.entities[0].connectDate).to.deep.equal(date)
      expect(serverVisitsResult.entities[0].playerId).to.equal(1)
      expect(serverVisitsResult.entities[0].serverId).to.equal(1)
    })
  })
})
