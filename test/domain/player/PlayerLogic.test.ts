import { expect } from 'chai'
import 'mocha'
import { Player } from '../../../src/domain/player/Player'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/player/PlayerLogic.ts', function() {
  describe('create', function() {
    it('should create a player with all its rows', async function() {
      let now = new Date
      let player = new Player

      player.firstSeen = now
      player.model = 'Keel'
      player.name = 'Player1'
      player.steamId = '01234567890123456'

      let result = await Services.get().playerLogic.create(player, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.firstSeen).to.deep.equal(now)
      expect(result.entity.model).to.equal('Keel')
      expect(result.entity.name).to.equal('Player1')
      expect(result.entity.steamId).to.equal('01234567890123456')
    })
  })

  describe('read', function() {
    it('should read a player with all its rows', async function() {
      let now = new Date

      await create('player', {
        firstSeen: now,
        model: 'Keel',
        name: 'Player1',
        steamId: '01234567890123456',
      })
      
      let result = await Services.get().playerLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].firstSeen).to.deep.equal(now)
      expect(result.entities[0].model).to.equal('Keel')
      expect(result.entities[0].name).to.equal('Player1')
      expect(result.entities[0].steamId).to.equal('01234567890123456')
    })

    it('should load all deaths', async function() {
      await create('player')
      await create('frag', { victim: { playerId: 1 }})
      await create('frag', { victim: { playerId: 1 }})
      await create('frag', { victim: { playerId: 2 }})

      let result = await Services.get().playerLogic.read({ deaths: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].deaths).to.be.not.undefined
      expect(result.entities[0].deaths.length).to.equal(2)
      expect(result.entities[0].deaths[0].id).to.equal(2)
      expect(result.entities[0].deaths[1].id).to.equal(1)
    })

    it('should load all kills', async function() {
      await create('player')
      await create('frag', { killer: { playerId: 1 }})
      await create('frag', { killer: { playerId: 1 }})
      await create('frag', { killer: { playerId: 2 }})

      let result = await Services.get().playerLogic.read({ kills: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].kills).to.be.not.undefined
      expect(result.entities[0].kills.length).to.equal(2)
      expect(result.entities[0].kills[0].id).to.equal(2)
      expect(result.entities[0].kills[1].id).to.equal(1)
    })

    it('should load all match participations', async function() {
      await create('player')
      await create('match_participation', { playerId: 1 })
      await create('match_participation', { playerId: 1 })
      await create('match_participation', { playerId: 2 })

      let result = await Services.get().playerLogic.read({ matchParticipations: { '@orderBy': 'id'} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].matchParticipations).to.be.not.undefined
      expect(result.entities[0].matchParticipations.length).to.equal(2)
      expect(result.entities[0].matchParticipations[0].id).to.equal(1)
      expect(result.entities[0].matchParticipations[1].id).to.equal(2)
    })

    it('should load all medals', async function() {
      await create('player')
      await create('medal', { playerId: 1 })
      await create('medal', { playerId: 1 })
      await create('medal', { playerId: 2 })

      let result = await Services.get().playerLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].medals).to.be.not.undefined
      expect(result.entities[0].medals.length).to.equal(2)
      expect(result.entities[0].medals[0].id).to.equal(1)
      expect(result.entities[0].medals[1].id).to.equal(2)
    })

    it('should load all server visits', async function() {
      await create('player')
      await create('server_visit', { playerId: 1 })
      await create('server_visit', { playerId: 1 })
      await create('server_visit', { playerId: 2 })

      let result = await Services.get().playerLogic.read({ serverVisits: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].serverVisits).to.be.not.undefined
      expect(result.entities[0].serverVisits.length).to.equal(2)
      expect(result.entities[0].serverVisits[0].id).to.equal(1)
      expect(result.entities[0].serverVisits[1].id).to.equal(2)
    })
  })

  describe('update', function() {
    it('should update a player with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('player', {
        firstSeen: date1,
        model: 'Keel',
        name: 'Player1',
        steamId: '01234567890123456',
      })

      let player = new Player
      player.id = 1
      player.firstSeen = date2
      player.model = 'Sarge'
      player.name = 'Player2'
      player.steamId = '12345678901234567'

      let result = await Services.get().playerLogic.update(player, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.firstSeen).to.deep.equal(date2)
      expect(result.entity.model).to.equal('Sarge')
      expect(result.entity.name).to.equal('Player2')
      expect(result.entity.steamId).to.equal('12345678901234567')
    })
  })

  describe('delete', function() {
    it('should delete a player', async function() {
      let now = new Date

      await create('player', {
        firstSeen: now,
        model: 'Keel',
        name: 'Player1',
        steamId: '01234567890123456',
      })

      let player = new Player
      player.id = 1

      let result = await Services.get().playerLogic.delete(player, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.firstSeen).to.deep.equal(now)
      expect(result.entity.model).to.equal('Keel')
      expect(result.entity.name).to.equal('Player1')
      expect(result.entity.steamId).to.equal('01234567890123456')
    })
  })
})