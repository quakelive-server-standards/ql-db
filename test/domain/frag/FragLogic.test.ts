import { expect } from 'chai'
import 'mocha'
import { CauseType } from '../../../src/domain/enums/CauseType'
import { HoldableType } from '../../../src/domain/enums/HoldableType'
import { PowerUpType } from '../../../src/domain/enums/PowerUpType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { WeaponType } from '../../../src/domain/enums/WeaponType'
import { Frag, FragParticipant } from '../../../src/domain/frag/Frag'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/frag/FragLogic.ts', function() {
  describe('create', function() {
    it('should create a frag with all its rows', async function() {
      await create('server')
      await create('server_visit')
      await create('player')
      await create('player')
      await create('match')
      await create('match_participation')
      await create('match_participation')
      await create('round')

      let now = new Date
      let frag = new Frag

      frag.cause = CauseType.Lava
      frag.date = now
      frag.environment = false
      frag.matchId = 1
      frag.otherTeamAlive = 1
      frag.otherTeamDead = 2
      frag.roundId = 1
      frag.serverId = 1
      frag.suicide = true
      frag.teamAlive = 3
      frag.teamDead = 4
      frag.teamKill = false
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
      frag.killer.serverVisitId = 1
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
      frag.victim.serverVisitId = 1
      frag.victim.speed = 24
      frag.victim.team = TeamType.Blue
      frag.victim.view = {
        x: 25,
        y: 26,
        z: 27
      }
      frag.victim.weapon = WeaponType.HeavyMachineGun

      let result = await Services.get().fragLogic.create(frag, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.cause).to.equal(CauseType.Lava)
      expect(result.entity.date).to.deep.equal(now)
      expect(result.entity.environment).to.equal(false)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.otherTeamAlive).to.equal(1)
      expect(result.entity.otherTeamDead).to.equal(2)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.suicide).to.equal(true)
      expect(result.entity.teamAlive).to.equal(3)
      expect(result.entity.teamDead).to.equal(4)
      expect(result.entity.teamKill).to.equal(false)
      expect(result.entity.time).to.equal(5)
      expect(result.entity.warmup).to.equal(false)
      
      expect(result.entity.killer.airborne).to.equal(true)
      expect(result.entity.killer.ammo).to.equal(6)
      expect(result.entity.killer.armor).to.equal(7)
      expect(result.entity.killer.bot).to.equal(false)
      expect(result.entity.killer.botSkill).to.equal(8)
      expect(result.entity.killer.health).to.equal(9)
      expect(result.entity.killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.entity.killer.matchParticipationId).to.equal(1)
      expect(result.entity.killer.playerId).to.equal(1)
      expect(result.entity.killer.position.x).to.equal(10)
      expect(result.entity.killer.position.y).to.equal(11)
      expect(result.entity.killer.position.z).to.equal(12)
      expect(result.entity.killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.entity.killer.serverVisitId).to.equal(1)
      expect(result.entity.killer.speed).to.equal(13)
      expect(result.entity.killer.team).to.equal(TeamType.Blue)
      expect(result.entity.killer.view.x).to.equal(14)
      expect(result.entity.killer.view.y).to.equal(15)
      expect(result.entity.killer.view.z).to.equal(16)
      expect(result.entity.killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.entity.victim.airborne).to.equal(false)
      expect(result.entity.victim.ammo).to.equal(17)
      expect(result.entity.victim.armor).to.equal(18)
      expect(result.entity.victim.bot).to.equal(true)
      expect(result.entity.victim.botSkill).to.equal(19)
      expect(result.entity.victim.health).to.equal(20)
      expect(result.entity.victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.entity.victim.matchParticipationId).to.equal(2)
      expect(result.entity.victim.playerId).to.equal(2)
      expect(result.entity.victim.position.x).to.equal(21)
      expect(result.entity.victim.position.y).to.equal(22)
      expect(result.entity.victim.position.z).to.equal(23)
      expect(result.entity.victim.powerUps).to.deep.equal([ ])
      expect(result.entity.victim.serverVisitId).to.equal(1)
      expect(result.entity.victim.speed).to.equal(24)
      expect(result.entity.victim.team).to.equal(TeamType.Blue)
      expect(result.entity.victim.view.x).to.equal(25)
      expect(result.entity.victim.view.y).to.equal(26)
      expect(result.entity.victim.view.z).to.equal(27)
      expect(result.entity.victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })
  })

  describe('read', function() {
    it('should read a frag with all its rows', async function() {
      let now = new Date

      await create('frag', {
        cause: CauseType.Lava,
        date: now,
        environment: false,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        teamKill: false,
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
          serverVisitId: 1,
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
          serverVisitId: 1,
          speed: 24,
          team: TeamType.Blue,
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
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].cause).to.equal(CauseType.Lava)
      expect(result.entities[0].date).to.deep.equal(now)
      expect(result.entities[0].environment).to.equal(false)
      expect(result.entities[0].matchId).to.equal(1)
      expect(result.entities[0].otherTeamAlive).to.equal(1)
      expect(result.entities[0].otherTeamDead).to.equal(2)
      expect(result.entities[0].roundId).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
      expect(result.entities[0].suicide).to.equal(true)
      expect(result.entities[0].teamAlive).to.equal(3)
      expect(result.entities[0].teamDead).to.equal(4)
      expect(result.entities[0].teamKill).to.equal(false)
      expect(result.entities[0].time).to.equal(5)
      expect(result.entities[0].warmup).to.equal(false)
      
      expect(result.entities[0].killer.airborne).to.equal(true)
      expect(result.entities[0].killer.ammo).to.equal(6)
      expect(result.entities[0].killer.armor).to.equal(7)
      expect(result.entities[0].killer.bot).to.equal(false)
      expect(result.entities[0].killer.botSkill).to.equal(8)
      expect(result.entities[0].killer.health).to.equal(9)
      expect(result.entities[0].killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.entities[0].killer.matchParticipationId).to.equal(1)
      expect(result.entities[0].killer.playerId).to.equal(1)
      expect(result.entities[0].killer.position.x).to.equal(10)
      expect(result.entities[0].killer.position.y).to.equal(11)
      expect(result.entities[0].killer.position.z).to.equal(12)
      expect(result.entities[0].killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.entities[0].killer.serverVisitId).to.equal(1)
      expect(result.entities[0].killer.speed).to.equal(13)
      expect(result.entities[0].killer.team).to.equal(TeamType.Blue)
      expect(result.entities[0].killer.view.x).to.equal(14)
      expect(result.entities[0].killer.view.y).to.equal(15)
      expect(result.entities[0].killer.view.z).to.equal(16)
      expect(result.entities[0].killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.entities[0].victim.airborne).to.equal(false)
      expect(result.entities[0].victim.ammo).to.equal(17)
      expect(result.entities[0].victim.armor).to.equal(18)
      expect(result.entities[0].victim.bot).to.equal(true)
      expect(result.entities[0].victim.botSkill).to.equal(19)
      expect(result.entities[0].victim.health).to.equal(20)
      expect(result.entities[0].victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.entities[0].victim.matchParticipationId).to.equal(2)
      expect(result.entities[0].victim.playerId).to.equal(2)
      expect(result.entities[0].victim.position.x).to.equal(21)
      expect(result.entities[0].victim.position.y).to.equal(22)
      expect(result.entities[0].victim.position.z).to.equal(23)
      expect(result.entities[0].victim.powerUps).to.deep.equal([ ])
      expect(result.entities[0].victim.serverVisitId).to.equal(1)
      expect(result.entities[0].victim.speed).to.equal(24)
      expect(result.entities[0].victim.team).to.equal(TeamType.Blue)
      expect(result.entities[0].victim.view.x).to.equal(25)
      expect(result.entities[0].victim.view.y).to.equal(26)
      expect(result.entities[0].victim.view.z).to.equal(27)
      expect(result.entities[0].victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })

    it('should load the killer player', async function() {
      await create('frag', { killer: { playerId: 1 }})
      await create('player')
      await create('player')

      let result = await Services.get().fragLogic.read({ 'killer.player': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].killer).to.be.not.undefined
      expect(result.entities[0].killer.player).to.be.not.undefined
      expect(result.entities[0].killer.player.id).to.equal(1)
    })

    it('should load the killer match participation', async function() {
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().fragLogic.read({ 'killer.matchParticipation': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].killer).to.be.not.undefined
      expect(result.entities[0].killer.matchParticipation).to.be.not.undefined
      expect(result.entities[0].killer.matchParticipation.id).to.equal(1)
    })

    it('should load the killer server visit', async function() {
      await create('frag', { killer: { serverVisitId: 1 }})
      await create('server_visit')
      await create('server_visit')

      let result = await Services.get().fragLogic.read({ 'killer.serverVisit': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].killer).to.be.not.undefined
      expect(result.entities[0].killer.serverVisit).to.be.not.undefined
      expect(result.entities[0].killer.serverVisit.id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('frag', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().fragLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].match).to.be.not.undefined
      expect(result.entities[0].match.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('frag', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().fragLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].round).to.be.not.undefined
      expect(result.entities[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('frag', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().fragLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })

    it('should load the victim player', async function() {
      await create('frag', { victim: { playerId: 1 }})
      await create('player')
      await create('player')

      let result = await Services.get().fragLogic.read({ 'victim.player': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].victim).to.be.not.undefined
      expect(result.entities[0].victim.player).to.be.not.undefined
      expect(result.entities[0].victim.player.id).to.equal(1)
    })

    it('should load the victim match participation', async function() {
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().fragLogic.read({ 'victim.matchParticipation': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].victim).to.be.not.undefined
      expect(result.entities[0].victim.matchParticipation).to.be.not.undefined
      expect(result.entities[0].victim.matchParticipation.id).to.equal(1)
    })

    it('should load the victim server visit', async function() {
      await create('frag', { victim: { serverVisitId: 1 }})
      await create('server_visit')
      await create('server_visit')

      let result = await Services.get().fragLogic.read({ 'victim.serverVisit': {}}, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].victim).to.be.not.undefined
      expect(result.entities[0].victim.serverVisit).to.be.not.undefined
      expect(result.entities[0].victim.serverVisit.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a frag with all its rows', async function() {
      await create('server')
      await create('server')
      await create('server_visit')
      await create('server_visit')
      await create('server_visit')
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
        cause: CauseType.Lava,
        date: date1,
        environment: false,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        teamKill: false,
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
          serverVisitId: 1,
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
          serverVisitId: 2,
          speed: 24,
          team: TeamType.Blue,
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
      frag.environment = true
      frag.matchId = 2
      frag.otherTeamAlive = 2
      frag.otherTeamDead = 3
      frag.cause = CauseType.Projectile
      frag.roundId = 2
      frag.serverId = 2
      frag.suicide = false
      frag.teamAlive = 4
      frag.teamDead = 5
      frag.teamKill = true
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
      frag.killer.serverVisitId = 2
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
      frag.victim.serverVisitId = 3
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
      expect(result.entity.id).to.equal(1)
      expect(result.entity.cause).to.equal(CauseType.Projectile)
      expect(result.entity.date).to.deep.equal(date2)
      expect(result.entity.environment).to.equal(true)
      expect(result.entity.matchId).to.equal(2)
      expect(result.entity.otherTeamAlive).to.equal(2)
      expect(result.entity.otherTeamDead).to.equal(3)
      expect(result.entity.roundId).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
      expect(result.entity.suicide).to.equal(false)
      expect(result.entity.teamAlive).to.equal(4)
      expect(result.entity.teamDead).to.equal(5)
      expect(result.entity.teamKill).to.equal(true)
      expect(result.entity.time).to.equal(6)
      expect(result.entity.warmup).to.equal(true)

      expect(result.entity.killer.airborne).to.equal(false)
      expect(result.entity.killer.ammo).to.equal(7)
      expect(result.entity.killer.armor).to.equal(8)
      expect(result.entity.killer.bot).to.equal(true)
      expect(result.entity.killer.botSkill).to.equal(9)
      expect(result.entity.killer.health).to.equal(10)
      expect(result.entity.killer.holdable).to.equal(HoldableType.Medkit)
      expect(result.entity.killer.matchParticipationId).to.equal(2)
      expect(result.entity.killer.playerId).to.equal(2)
      expect(result.entity.killer.position.x).to.equal(11)
      expect(result.entity.killer.position.y).to.equal(12)
      expect(result.entity.killer.position.z).to.equal(13)
      expect(result.entity.killer.powerUps).to.deep.equal([ PowerUpType.Flight, PowerUpType.Guard, PowerUpType.Haste ])
      expect(result.entity.killer.serverVisitId).to.equal(2)
      expect(result.entity.killer.speed).to.equal(14)
      expect(result.entity.killer.team).to.equal(TeamType.Red)
      expect(result.entity.killer.view.x).to.equal(15)
      expect(result.entity.killer.view.y).to.equal(16)
      expect(result.entity.killer.view.z).to.equal(17)
      expect(result.entity.killer.weapon).to.equal(WeaponType.Nailgun)

      expect(result.entity.victim.airborne).to.equal(true)
      expect(result.entity.victim.ammo).to.equal(18)
      expect(result.entity.victim.armor).to.equal(19)
      expect(result.entity.victim.bot).to.equal(false)
      expect(result.entity.victim.botSkill).to.equal(20)
      expect(result.entity.victim.health).to.equal(21)
      expect(result.entity.victim.holdable).to.equal(HoldableType.Portal)
      expect(result.entity.victim.matchParticipationId).to.equal(3)
      expect(result.entity.victim.playerId).to.equal(3)
      expect(result.entity.victim.position.x).to.equal(22)
      expect(result.entity.victim.position.y).to.equal(23)
      expect(result.entity.victim.position.z).to.equal(24)
      expect(result.entity.victim.powerUps).to.deep.equal([ ])
      expect(result.entity.victim.serverVisitId).to.equal(3)
      expect(result.entity.victim.speed).to.equal(25)
      expect(result.entity.victim.team).to.equal(TeamType.Free)
      expect(result.entity.victim.view.x).to.equal(26)
      expect(result.entity.victim.view.y).to.equal(27)
      expect(result.entity.victim.view.z).to.equal(28)
      expect(result.entity.victim.weapon).to.equal(WeaponType.ProximityLauncher)
    })
  })

  describe('delete', function() {
    it('should delete a frag', async function() {
      let now = new Date

      await create('frag', {
        cause: CauseType.Lava,
        date: now,
        environment: false,
        matchId: 1,
        otherTeamAlive: 1,
        otherTeamDead: 2,
        roundId: 1,
        serverId: 1,
        suicide: true,
        teamAlive: 3,
        teamDead: 4,
        teamKill: false,
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
          serverVisitId: 1,
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
          serverVisitId: 2,
          speed: 24,
          team: TeamType.Blue,
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
      expect(result.entity.id).to.equal(1)
      expect(result.entity.date).to.deep.equal(now)
      expect(result.entity.environment).to.equal(false)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.otherTeamAlive).to.equal(1)
      expect(result.entity.otherTeamDead).to.equal(2)
      expect(result.entity.cause).to.equal(CauseType.Lava)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.suicide).to.equal(true)
      expect(result.entity.teamAlive).to.equal(3)
      expect(result.entity.teamDead).to.equal(4)
      expect(result.entity.teamKill).to.equal(false)
      expect(result.entity.time).to.equal(5)
      expect(result.entity.warmup).to.equal(false)
      
      expect(result.entity.killer.airborne).to.equal(true)
      expect(result.entity.killer.ammo).to.equal(6)
      expect(result.entity.killer.armor).to.equal(7)
      expect(result.entity.killer.bot).to.equal(false)
      expect(result.entity.killer.botSkill).to.equal(8)
      expect(result.entity.killer.health).to.equal(9)
      expect(result.entity.killer.holdable).to.equal(HoldableType.Kamikaze)
      expect(result.entity.killer.matchParticipationId).to.equal(1)
      expect(result.entity.killer.playerId).to.equal(1)
      expect(result.entity.killer.position.x).to.equal(10)
      expect(result.entity.killer.position.y).to.equal(11)
      expect(result.entity.killer.position.z).to.equal(12)
      expect(result.entity.killer.powerUps).to.deep.equal([ PowerUpType.ArmorRegeneration, PowerUpType.BattleSuit, PowerUpType.Doubler ])
      expect(result.entity.killer.serverVisitId).to.equal(1)
      expect(result.entity.killer.speed).to.equal(13)
      expect(result.entity.killer.team).to.equal(TeamType.Blue)
      expect(result.entity.killer.view.x).to.equal(14)
      expect(result.entity.killer.view.y).to.equal(15)
      expect(result.entity.killer.view.z).to.equal(16)
      expect(result.entity.killer.weapon).to.equal(WeaponType.Bfg)

      expect(result.entity.victim.airborne).to.equal(false)
      expect(result.entity.victim.ammo).to.equal(17)
      expect(result.entity.victim.armor).to.equal(18)
      expect(result.entity.victim.bot).to.equal(true)
      expect(result.entity.victim.botSkill).to.equal(19)
      expect(result.entity.victim.health).to.equal(20)
      expect(result.entity.victim.holdable).to.equal(HoldableType.Medkit)
      expect(result.entity.victim.matchParticipationId).to.equal(2)
      expect(result.entity.victim.playerId).to.equal(2)
      expect(result.entity.victim.position.x).to.equal(21)
      expect(result.entity.victim.position.y).to.equal(22)
      expect(result.entity.victim.position.z).to.equal(23)
      expect(result.entity.victim.powerUps).to.deep.equal([ ])
      expect(result.entity.victim.serverVisitId).to.equal(2)
      expect(result.entity.victim.speed).to.equal(24)
      expect(result.entity.victim.team).to.equal(TeamType.Blue)
      expect(result.entity.victim.view.x).to.equal(25)
      expect(result.entity.victim.view.y).to.equal(26)
      expect(result.entity.victim.view.z).to.equal(27)
      expect(result.entity.victim.weapon).to.equal(WeaponType.HeavyMachineGun)
    })
  })
})