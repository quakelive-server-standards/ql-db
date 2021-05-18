import { expect } from 'chai'
import 'mocha'
import { GameType } from '../../../src/domain/enums/GameType'
import { Factory } from '../../../src/domain/factory/Factory'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/FactoryLogic.ts', function() {
  describe('create', function() {
    it('should create a factory with all its rows', async function() {
      let factory = new Factory

      factory.gameType = GameType.Duel
      factory.name = 'stdduel'
      factory.title = 'Standard Duel'

      let result = await Services.get().factoryLogic.create(factory, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.gameType).to.equal(GameType.Duel)
      expect(result.entity.name).to.equal('stdduel')
      expect(result.entity.title).to.equal('Standard Duel')
    })
  })

  describe('read', function() {
    it('should read a factory with all its rows', async function() {
      await create('factory', {
        gameType: GameType.Duel,
        name: 'stdduel',
        title: 'Standard Duel'
      })
      
      let result = await Services.get().factoryLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].gameType).to.equal(GameType.Duel)
      expect(result.entities[0].name).to.equal('stdduel')
      expect(result.entities[0].title).to.equal('Standard Duel')
    })

    it('should load all matches', async function() {
      await create('factory')
      await create('match', { factoryId: 1 })
      await create('match', { factoryId: 1 })
      await create('match', { factoryId: 2 })

      let result = await Services.get().factoryLogic.read({ matches: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].matches).to.be.not.undefined
      expect(result.entities[0].matches.length).to.equal(2)
      expect(result.entities[0].matches[0].id).to.equal(1)
      expect(result.entities[0].matches[1].id).to.equal(2)
    })
  })

  describe('update', function() {
    it('should update a factory with all its rows', async function() {
      await create('factory', {
        gameType: GameType.AttackAndDefense,
        name: 'duel',
        title: 'Duel'
      })

      let factory = new Factory
      factory.id = 1
      factory.gameType = GameType.Duel
      factory.name = 'stdduel'
      factory.title = 'Standard Duel'

      let result = await Services.get().factoryLogic.update(factory, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.gameType).to.equal(GameType.Duel)
      expect(result.entity.name).to.equal('stdduel')
      expect(result.entity.title).to.equal('Standard Duel')
    })
  })

  describe('delete', function() {
    it('should delete a factory', async function() {
      await create('factory', {
        gameType: GameType.Duel,
        name: 'stdduel',
        title: 'Standard Duel'
      })

      let factory = new Factory
      factory.id = 1

      let result = await Services.get().factoryLogic.delete(factory, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.gameType).to.equal(GameType.Duel)
      expect(result.entity.name).to.equal('stdduel')
      expect(result.entity.title).to.equal('Standard Duel')
    })
  })
})