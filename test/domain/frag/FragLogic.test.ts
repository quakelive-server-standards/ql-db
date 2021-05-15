import { expect } from 'chai'
import 'mocha'
import { HoldableType } from '../../../src/domain/enums/HoldableType'
import { PowerUpType } from '../../../src/domain/enums/PowerUpType'
import { ReasonType } from '../../../src/domain/enums/ReasonType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { WeaponType } from '../../../src/domain/enums/WeaponType'
import { Frag, FragParticipant } from '../../../src/domain/frag/Frag'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/FragLogic.ts', function() {
  describe('create', function() {
    it('should create a frag with all its rows', async function() {
      await create('server')
      await create('player')
      await create('player')
      await create('match')
      await create('match_participation')
      await create('match_participation')
      await create('round')

      let now = new Date
      let frag = new Frag

      frag.date = now
      frag.matchId = 1
      frag.otherTeamAlive = 1
      frag.otherTeamDead = 2
      frag.reason = ReasonType.Lava
      frag.roundId = 1
      frag.serverId = 1
      frag.suicide = true
      frag.teamAlive = 3
      frag.teamDead = 4
      frag.time = 5
      frag.warmup = false
      
      frag.killer = new FragParticipant
      frag.killer.airborne = true
      frag.killer.ammo = 6
      frag.killer.armor = 7
      frag.killer.bot = false
      frag.killer.botSkill = 8
      frag.killer.health = 9
      frag.killer.holdable = HoldableType.Kamikaze
      frag.killer.matchParticipationId = 1
      frag.killer.playerId = 1
      frag.killer.position = {
        x: 10,
        y: 11,
        z: 12
      }
      frag.killer.powerUps = [ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ]
      frag.killer.speed = 13
      frag.killer.team = TeamType.Blue
      frag.killer.view = {
        x: 14,
        y: 15,
        z: 16
      }
      frag.killer.weapon = WeaponType.Bfg

      frag.victim = new FragParticipant
      frag.victim.airborne =  false
      frag.victim.ammo =  17
      frag.victim.armor =  18
      frag.victim.bot =  true
      frag.victim.botSkill =  19
      frag.victim.health =  20
      frag.victim.holdable =  HoldableType.Medkit
      frag.victim.matchParticipationId =  2
      frag.victim.playerId =  2
      frag.victim.position = {
        x: 21,
        y: 22,
        z: 23
      }
      frag.victim.powerUps = [ ]
      frag.victim.speed = 24
      frag.victim.team = TeamType.Spectator
      frag.victim.view = {
        x: 25,
        y: 26,
        z: 27
      }
      frag.victim.weapon = WeaponType.HeavyMachineGun

      let result = await Services.get().fragLogic.create(frag, tx())

      expect(result.isValue()).to.be.true
      expect(result.created.id).to.equal(1)
      expect(result.created.date).to.deep.equal(now)
      expect(result.created.matchId).to.equal(1)
      expect(result.created.otherTeamAlive).to.equal(1)
      expect(result.created.otherTeamDead).to.equal(2)
      expect(result.created.reason).to.equal(ReasonType.Lava)
      expect(result.created.roundId).to.equal(1)
      expect(result.created.serverId).to.equal(1)
      expect(result.created.suicide).to.equal(true)
      expect(result.created.teamAlive).to.equal(3)
      expect(result.created.teamDead).to.equal(4)
      expect(result.created.time).to.equal(5)
      expect(result.created.warmup).to.equal(false)
      
      expect(result.created.killer.airborne).to.equal(true)
      expect(result.created.killer.ammo).to.equal(6)
      expect(result.created.killer.armor).to.equal(7)
      expect(result.created.killer.bot).to.equal(false)
      expect(result.created.killer.botSkill).to.equal(8)
      expect(result.created.killer.health).to.equal(9)
      expect(result.created.killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.created.killer.matchParticipationId).to.equal(1)
      expect(result.created.killer.playerId).to.equal(1)
      expect(result.created.killer.position.x).to.equal(10)
      expect(result.created.killer.position.y).to.equal(11)
      expect(result.created.killer.position.z).to.equal(12)
      expect(result.created.killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.created.killer.speed).to.equal(13)
      expect(result.created.killer.team).to.equal(TeamType.Blue)
      expect(result.created.killer.view.x).to.equal(14)
      expect(result.created.killer.view.y).to.equal(15)
      expect(result.created.killer.view.z).to.equal(16)
      expect(result.created.killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.created.victim.airborne).to.equal(false)
      expect(result.created.victim.ammo).to.equal(17)
      expect(result.created.victim.armor).to.equal(18)
      expect(result.created.victim.bot).to.equal(true)
      expect(result.created.victim.botSkill).to.equal(19)
      expect(result.created.victim.health).to.equal(20)
      expect(result.created.victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.created.victim.matchParticipationId).to.equal(2)
      expect(result.created.victim.playerId).to.equal(2)
      expect(result.created.victim.position.x).to.equal(21)
      expect(result.created.victim.position.y).to.equal(22)
      expect(result.created.victim.position.z).to.equal(23)
      expect(result.created.victim.powerUps).to.deep.equal([ ])
      expect(result.created.victim.speed).to.equal(24)
      expect(result.created.victim.team).to.equal(TeamType.Spectator)
      expect(result.created.victim.view.x).to.equal(25)
      expect(result.created.victim.view.y).to.equal(26)
      expect(result.created.victim.view.z).to.equal(27)
      expect(result.created.victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })
  })

  describe('read', function() {
    it('should read a frag with all its rows', async function() {
      let now = new Date

      await create('frag', {
        date: now,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        reason: ReasonType.Lava,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        time: 5,
        warmup: false,
        
        killer: {
          airborne: true,
          ammo: 6,
          armor: 7,
          bot: false,
          botSkill: 8,
          health: 9,
          holdable: HoldableType.Kamikaze,
          matchParticipationId: 1,
          playerId: 1,
          position: {
            x: 10,
            y: 11,
            z: 12
          },
          powerUps: [ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ],
          speed: 13,
          team: TeamType.Blue,
          view: {
            x: 14,
            y: 15,
            z: 16
          },
          weapon: WeaponType.Bfg
        },
  
        victim: {
          airborne: false,
          ammo: 17,
          armor: 18,
          bot: true,
          botSkill: 19,
          health: 20,
          holdable: HoldableType.Medkit,
          matchParticipationId: 2,
          playerId: 2,
          position: {
            x: 21,
            y: 22,
            z: 23
          },
          powerUps: [ ],
          speed: 24,
          team: TeamType.Spectator,
          view: {
            x: 25,
            y: 26,
            z: 27
          },
          weapon: WeaponType.HeavyMachineGun
        }
      })
      
      let result = await Services.get().fragLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.read.length).to.equal(1)
      expect(result.read[0].id).to.equal(1)
      expect(result.read[0].date).to.deep.equal(now)
      expect(result.read[0].matchId).to.equal(1)
      expect(result.read[0].otherTeamAlive).to.equal(1)
      expect(result.read[0].otherTeamDead).to.equal(2)
      expect(result.read[0].reason).to.equal(ReasonType.Lava)
      expect(result.read[0].roundId).to.equal(1)
      expect(result.read[0].serverId).to.equal(1)
      expect(result.read[0].suicide).to.equal(true)
      expect(result.read[0].teamAlive).to.equal(3)
      expect(result.read[0].teamDead).to.equal(4)
      expect(result.read[0].time).to.equal(5)
      expect(result.read[0].warmup).to.equal(false)
      
      expect(result.read[0].killer.airborne).to.equal(true)
      expect(result.read[0].killer.ammo).to.equal(6)
      expect(result.read[0].killer.armor).to.equal(7)
      expect(result.read[0].killer.bot).to.equal(false)
      expect(result.read[0].killer.botSkill).to.equal(8)
      expect(result.read[0].killer.health).to.equal(9)
      expect(result.read[0].killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.read[0].killer.matchParticipationId).to.equal(1)
      expect(result.read[0].killer.playerId).to.equal(1)
      expect(result.read[0].killer.position.x).to.equal(10)
      expect(result.read[0].killer.position.y).to.equal(11)
      expect(result.read[0].killer.position.z).to.equal(12)
      expect(result.read[0].killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.read[0].killer.speed).to.equal(13)
      expect(result.read[0].killer.team).to.equal(TeamType.Blue)
      expect(result.read[0].killer.view.x).to.equal(14)
      expect(result.read[0].killer.view.y).to.equal(15)
      expect(result.read[0].killer.view.z).to.equal(16)
      expect(result.read[0].killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.read[0].victim.airborne).to.equal(false)
      expect(result.read[0].victim.ammo).to.equal(17)
      expect(result.read[0].victim.armor).to.equal(18)
      expect(result.read[0].victim.bot).to.equal(true)
      expect(result.read[0].victim.botSkill).to.equal(19)
      expect(result.read[0].victim.health).to.equal(20)
      expect(result.read[0].victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.read[0].victim.matchParticipationId).to.equal(2)
      expect(result.read[0].victim.playerId).to.equal(2)
      expect(result.read[0].victim.position.x).to.equal(21)
      expect(result.read[0].victim.position.y).to.equal(22)
      expect(result.read[0].victim.position.z).to.equal(23)
      expect(result.read[0].victim.powerUps).to.deep.equal([ ])
      expect(result.read[0].victim.speed).to.equal(24)
      expect(result.read[0].victim.team).to.equal(TeamType.Spectator)
      expect(result.read[0].victim.view.x).to.equal(25)
      expect(result.read[0].victim.view.y).to.equal(26)
      expect(result.read[0].victim.view.z).to.equal(27)
      expect(result.read[0].victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })

    it('should load the killer', async function() {
      await create('frag', { killer: { playerId: 1 }})
      await create('player')
      await create('player')

      let result = await Services.get().fragLogic.read({ 'killer.player': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].killer).to.be.not.undefined
      expect(result.read[0].killer.player).to.be.not.undefined
      expect(result.read[0].killer.player.id).to.equal(1)
    })

    it('should load the killer match participation', async function() {
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().fragLogic.read({ 'killer.matchParticipation': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].killer).to.be.not.undefined
      expect(result.read[0].killer.matchParticipation).to.be.not.undefined
      expect(result.read[0].killer.matchParticipation.id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('frag', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().fragLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].match).to.be.not.undefined
      expect(result.read[0].match.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('frag', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().fragLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].round).to.be.not.undefined
      expect(result.read[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('frag', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().fragLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].server).to.be.not.undefined
      expect(result.read[0].server.id).to.equal(1)
    })

    it('should load the victim', async function() {
      await create('frag', { victim: { playerId: 1 }})
      await create('player')
      await create('player')

      let result = await Services.get().fragLogic.read({ 'victim.player': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].victim).to.be.not.undefined
      expect(result.read[0].victim.player).to.be.not.undefined
      expect(result.read[0].victim.player.id).to.equal(1)
    })

    it('should load the killer match participation', async function() {
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().fragLogic.read({ 'victim.matchParticipation': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].victim).to.be.not.undefined
      expect(result.read[0].victim.matchParticipation).to.be.not.undefined
      expect(result.read[0].victim.matchParticipation.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a frag with all its rows', async function() {
      await create('server')
      await create('server')
      await create('player')
      await create('player')
      await create('player')
      await create('match')
      await create('match')
      await create('match_participation')
      await create('match_participation')
      await create('match_participation')
      await create('round')
      await create('round')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))
      
      await create('frag', {
        date: date1,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        reason: ReasonType.Lava,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        time: 5,
        warmup: false,
        
        killer: {
          airborne: true,
          ammo: 6,
          armor: 7,
          bot: false,
          botSkill: 8,
          health: 9,
          holdable: HoldableType.Kamikaze,
          matchParticipationId: 1,
          playerId: 1,
          position: {
            x: 10,
            y: 11,
            z: 12
          },
          powerUps: [ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ],
          speed: 13,
          team: TeamType.Blue,
          view: {
            x: 14,
            y: 15,
            z: 16
          },
          weapon: WeaponType.Bfg
        },
  
        victim: {
          airborne: false,
          ammo: 17,
          armor: 18,
          bot: true,
          botSkill: 19,
          health: 20,
          holdable: HoldableType.Medkit,
          matchParticipationId: 2,
          playerId: 2,
          position: {
            x: 21,
            y: 22,
            z: 23
          },
          powerUps: [ ],
          speed: 24,
          team: TeamType.Spectator,
          view: {
            x: 25,
            y: 26,
            z: 27
          },
          weapon: WeaponType.HeavyMachineGun
        }
      })

      let frag = new Frag
      frag.id = 1
      frag.date = date2
      frag.matchId = 2
      frag.otherTeamAlive = 2
      frag.otherTeamDead = 3
      frag.reason = ReasonType.Lightning
      frag.roundId = 2
      frag.serverId = 2
      frag.suicide = false
      frag.teamAlive = 4
      frag.teamDead = 5
      frag.time = 6
      frag.warmup = true
      
      frag.killer = new FragParticipant
      frag.killer.airborne =  false
      frag.killer.ammo =  7
      frag.killer.armor =  8
      frag.killer.bot =  true
      frag.killer.botSkill =  9
      frag.killer.health =  10
      frag.killer.holdable =  HoldableType.Medkit
      frag.killer.matchParticipationId =  2
      frag.killer.playerId =  2
      frag.killer.position = {
        x: 11,
        y: 12,
        z: 13
      }
      frag.killer.powerUps = [ PowerUpType.Flight, PowerUpType.Guard, PowerUpType.Haste ]
      frag.killer.speed = 14
      frag.killer.team = TeamType.Red
      frag.killer.view = {
        x: 15,
        y: 16,
        z: 17
      }
      frag.killer.weapon = WeaponType.Nailgun

      frag.victim = new FragParticipant
      frag.victim.airborne = true
      frag.victim.ammo = 18
      frag.victim.armor = 19
      frag.victim.bot = false
      frag.victim.botSkill = 20
      frag.victim.health = 21
      frag.victim.holdable = HoldableType.Portal
      frag.victim.matchParticipationId = 3
      frag.victim.playerId = 3
      frag.victim.position = {
        x: 22,
        y: 23,
        z: 24
      }
      frag.victim.powerUps = [ ]
      frag.victim.speed = 25
      frag.victim.team = TeamType.Free
      frag.victim.view = {
        x: 26,
        y: 27,
        z: 28
      }
      frag.victim.weapon = WeaponType.ProximityLauncher

      let result = await Services.get().fragLogic.update(frag, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.updated.id).to.equal(1)
      expect(result.updated.date).to.deep.equal(date2)
      expect(result.updated.matchId).to.equal(2)
      expect(result.updated.otherTeamAlive).to.equal(2)
      expect(result.updated.otherTeamDead).to.equal(3)
      expect(result.updated.reason).to.equal(ReasonType.Lightning)
      expect(result.updated.roundId).to.equal(2)
      expect(result.updated.serverId).to.equal(2)
      expect(result.updated.suicide).to.equal(false)
      expect(result.updated.teamAlive).to.equal(4)
      expect(result.updated.teamDead).to.equal(5)
      expect(result.updated.time).to.equal(6)
      expect(result.updated.warmup).to.equal(true)

      expect(result.updated.killer.airborne).to.equal(false)
      expect(result.updated.killer.ammo).to.equal(7)
      expect(result.updated.killer.armor).to.equal(8)
      expect(result.updated.killer.bot).to.equal(true)
      expect(result.updated.killer.botSkill).to.equal(9)
      expect(result.updated.killer.health).to.equal(10)
      expect(result.updated.killer.holdable).to.equal(HoldableType.Medkit)
      expect(result.updated.killer.matchParticipationId).to.equal(2)
      expect(result.updated.killer.playerId).to.equal(2)
      expect(result.updated.killer.position.x).to.equal(11)
      expect(result.updated.killer.position.y).to.equal(12)
      expect(result.updated.killer.position.z).to.equal(13)
      expect(result.updated.killer.powerUps).to.deep.equal([ PowerUpType.Flight, PowerUpType.Guard, PowerUpType.Haste ])
      expect(result.updated.killer.speed).to.equal(14)
      expect(result.updated.killer.team).to.equal(TeamType.Red)
      expect(result.updated.killer.view.x).to.equal(15)
      expect(result.updated.killer.view.y).to.equal(16)
      expect(result.updated.killer.view.z).to.equal(17)
      expect(result.updated.killer.weapon).to.equal(WeaponType.Nailgun)

      expect(result.updated.victim.airborne).to.equal(true)
      expect(result.updated.victim.ammo).to.equal(18)
      expect(result.updated.victim.armor).to.equal(19)
      expect(result.updated.victim.bot).to.equal(false)
      expect(result.updated.victim.botSkill).to.equal(20)
      expect(result.updated.victim.health).to.equal(21)
      expect(result.updated.victim.holdable).to.equal(HoldableType.Portal)
      expect(result.updated.victim.matchParticipationId).to.equal(3)
      expect(result.updated.victim.playerId).to.equal(3)
      expect(result.updated.victim.position.x).to.equal(22)
      expect(result.updated.victim.position.y).to.equal(23)
      expect(result.updated.victim.position.z).to.equal(24)
      expect(result.updated.victim.powerUps).to.deep.equal([ ])
      expect(result.updated.victim.speed).to.equal(25)
      expect(result.updated.victim.team).to.equal(TeamType.Free)
      expect(result.updated.victim.view.x).to.equal(26)
      expect(result.updated.victim.view.y).to.equal(27)
      expect(result.updated.victim.view.z).to.equal(28)
      expect(result.updated.victim.weapon).to.equal(WeaponType.ProximityLauncher)
    })
  })

  describe('delete', function() {
    it('should delete a frag', async function() {
      let now = new Date

      await create('frag', {
        date: now,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        reason: ReasonType.Lava,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        time: 5,
        warmup: false,
        
        killer: {
          airborne: true,
          ammo: 6,
          armor: 7,
          bot: false,
          botSkill: 8,
          health: 9,
          holdable: HoldableType.Kamikaze,
          matchParticipationId: 1,
          playerId: 1,
          position: {
            x: 10,
            y: 11,
            z: 12
          },
          powerUps: [ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ],
          speed: 13,
          team: TeamType.Blue,
          view: {
            x: 14,
            y: 15,
            z: 16
          },
          weapon: WeaponType.Bfg
        },
  
        victim: {
          airborne: false,
          ammo: 17,
          armor: 18,
          bot: true,
          botSkill: 19,
          health: 20,
          holdable: HoldableType.Medkit,
          matchParticipationId: 2,
          playerId: 2,
          position: {
            x: 21,
            y: 22,
            z: 23
          },
          powerUps: [ ],
          speed: 24,
          team: TeamType.Spectator,
          view: {
            x: 25,
            y: 26,
            z: 27
          },
          weapon: WeaponType.HeavyMachineGun
        }
      })

      let frag = new Frag
      frag.id = 1

      let result = await Services.get().fragLogic.delete(frag, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.deleted.id).to.equal(1)
      expect(result.deleted.date).to.deep.equal(now)
      expect(result.deleted.matchId).to.equal(1)
      expect(result.deleted.otherTeamAlive).to.equal(1)
      expect(result.deleted.otherTeamDead).to.equal(2)
      expect(result.deleted.reason).to.equal(ReasonType.Lava)
      expect(result.deleted.roundId).to.equal(1)
      expect(result.deleted.serverId).to.equal(1)
      expect(result.deleted.suicide).to.equal(true)
      expect(result.deleted.teamAlive).to.equal(3)
      expect(result.deleted.teamDead).to.equal(4)
      expect(result.deleted.time).to.equal(5)
      expect(result.deleted.warmup).to.equal(false)
      
      expect(result.deleted.killer.airborne).to.equal(true)
      expect(result.deleted.killer.ammo).to.equal(6)
      expect(result.deleted.killer.armor).to.equal(7)
      expect(result.deleted.killer.bot).to.equal(false)
      expect(result.deleted.killer.botSkill).to.equal(8)
      expect(result.deleted.killer.health).to.equal(9)
      expect(result.deleted.killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.deleted.killer.matchParticipationId).to.equal(1)
      expect(result.deleted.killer.playerId).to.equal(1)
      expect(result.deleted.killer.position.x).to.equal(10)
      expect(result.deleted.killer.position.y).to.equal(11)
      expect(result.deleted.killer.position.z).to.equal(12)
      expect(result.deleted.killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.deleted.killer.speed).to.equal(13)
      expect(result.deleted.killer.team).to.equal(TeamType.Blue)
      expect(result.deleted.killer.view.x).to.equal(14)
      expect(result.deleted.killer.view.y).to.equal(15)
      expect(result.deleted.killer.view.z).to.equal(16)
      expect(result.deleted.killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.deleted.victim.airborne).to.equal(false)
      expect(result.deleted.victim.ammo).to.equal(17)
      expect(result.deleted.victim.armor).to.equal(18)
      expect(result.deleted.victim.bot).to.equal(true)
      expect(result.deleted.victim.botSkill).to.equal(19)
      expect(result.deleted.victim.health).to.equal(20)
      expect(result.deleted.victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.deleted.victim.matchParticipationId).to.equal(2)
      expect(result.deleted.victim.playerId).to.equal(2)
      expect(result.deleted.victim.position.x).to.equal(21)
      expect(result.deleted.victim.position.y).to.equal(22)
      expect(result.deleted.victim.position.z).to.equal(23)
      expect(result.deleted.victim.powerUps).to.deep.equal([ ])
      expect(result.deleted.victim.speed).to.equal(24)
      expect(result.deleted.victim.team).to.equal(TeamType.Spectator)
      expect(result.deleted.victim.view.x).to.equal(25)
      expect(result.deleted.victim.view.y).to.equal(26)
      expect(result.deleted.victim.view.z).to.equal(27)
      expect(result.deleted.victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })
  })
})