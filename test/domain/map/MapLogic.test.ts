import { expect } from 'chai'
import 'mocha'
import { Map } from '../../../src/domain/map/Map'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/MapLogic.ts', function() {
  describe('create', function() {
    it('should create a map with all its rows', async function() {
      let map = new Map

      map.name = 'aerowalk'

      let result = await Services.get().mapLogic.create(map, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.name).to.equal('aerowalk')
    })
  })

  describe('read', function() {
    it('should read a map with all its rows', async function() {
      await create('map', {
        name: 'aerowalk',
      })
      
      let result = await Services.get().mapLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].name).to.equal('aerowalk')
    })

    it('should load all matches', async function() {
      await create('map')
      await create('match', { factoryId: 1 })
      await create('match', { factoryId: 1 })
      await create('match', { factoryId: 2 })

      let result = await Services.get().mapLogic.read({ matches: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].matches).to.be.not.undefined
      expect(result.entities[0].matches.length).to.equal(2)
      expect(result.entities[0].matches[0].id).to.equal(1)
      expect(result.entities[0].matches[1].id).to.equal(2)
    })
  })

  describe('update', function() {
    it('should update a map with all its rows', async function() {
      await create('map', {
        name: 'aerowalk'
      })

      let map = new Map
      map.id = 1
      map.name = 'bloodrun'

      let result = await Services.get().mapLogic.update(map, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.name).to.equal('bloodrun')
    })
  })

  describe('delete', function() {
    it('should delete a map', async function() {
      await create('map', {
        name: 'aerowalk'
      })

      let map = new Map
      map.id = 1

      let result = await Services.get().mapLogic.delete(map, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.name).to.equal('aerowalk')
    })
  })
})