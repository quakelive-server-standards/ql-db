import { expect } from 'chai'
import 'mocha'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { MatchParticipation, MedalStats, PickupStats, WeaponStats } from '../../../src/domain/matchParticipation/MatchParticipation'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/matchParticipation/MatchParticipationLogic.ts', function() {
  describe('create', function() {
    it('should create a matchParticipation with all its rows', async function() {
      await create('match')
      await create('player')
      await create('round')
      await create('server')
      await create('server_visit')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      let matchParticipation = new MatchParticipation

      matchParticipation.finishDate = date1
      matchParticipation.matchId = 1
      matchParticipation.playerId = 1
      matchParticipation.roundId = 1
      matchParticipation.serverId = 1
      matchParticipation.serverVisitId = 1
      matchParticipation.startDate = date2

      matchParticipation.aborted = true
      matchParticipation.active = true
      matchParticipation.blueFlagPickups = 1
      matchParticipation.damageDealt = 2
      matchParticipation.damageTaken = 3
      matchParticipation.deathCount = 4
      matchParticipation.holyShits = 5
      matchParticipation.killCount = 6
      matchParticipation.maxStreak = 7
      matchParticipation.medalStats = new MedalStats
      matchParticipation.medalStats.accuracy = 8
      matchParticipation.medalStats.assists = 9
      matchParticipation.medalStats.captures = 10
      matchParticipation.medalStats.comboKill = 11
      matchParticipation.medalStats.defends = 12
      matchParticipation.medalStats.excellent = 13
      matchParticipation.medalStats.firstFrag = 14
      matchParticipation.medalStats.headshot = 15
      matchParticipation.medalStats.humiliation = 16
      matchParticipation.medalStats.impressive = 17
      matchParticipation.medalStats.midair = 18
      matchParticipation.medalStats.perfect = 19
      matchParticipation.medalStats.perforated = 20
      matchParticipation.medalStats.quadGod = 21
      matchParticipation.medalStats.rampage = 22
      matchParticipation.medalStats.revenge = 23
      matchParticipation.neutralFlagPickups = 24
      matchParticipation.pickupStats = new PickupStats
      matchParticipation.pickupStats.ammo = 25
      matchParticipation.pickupStats.armor = 26
      matchParticipation.pickupStats.armorRegeneration = 27
      matchParticipation.pickupStats.battleSuit = 28
      matchParticipation.pickupStats.doubler = 29
      matchParticipation.pickupStats.flight = 30
      matchParticipation.pickupStats.greenArmor = 31
      matchParticipation.pickupStats.guard = 32
      matchParticipation.pickupStats.haste = 33
      matchParticipation.pickupStats.health = 34
      matchParticipation.pickupStats.invisibility = 35
      matchParticipation.pickupStats.invulnerability = 36
      matchParticipation.pickupStats.kamikaze = 37
      matchParticipation.pickupStats.medkit = 38
      matchParticipation.pickupStats.megaHealth = 39
      matchParticipation.pickupStats.otherHoldable = 40
      matchParticipation.pickupStats.otherPowerUp = 41
      matchParticipation.pickupStats.portal = 42
      matchParticipation.pickupStats.quadDamage = 43
      matchParticipation.pickupStats.redArmor = 44
      matchParticipation.pickupStats.regeneration = 45
      matchParticipation.pickupStats.scout = 46
      matchParticipation.pickupStats.teleporter = 47
      matchParticipation.pickupStats.yellowArmor = 48
      matchParticipation.playTime = 49
      matchParticipation.rank = 50
      matchParticipation.redFlagPickups = 51
      matchParticipation.score = 52
      matchParticipation.team = TeamType.Blue
      matchParticipation.teamJoinTime = 53
      matchParticipation.teamRank = 54
      matchParticipation.tiedRank = 55
      matchParticipation.tiedTeamRank = 56
      matchParticipation.warmup = true
      matchParticipation.bfg = new WeaponStats
      matchParticipation.bfg.damageGiven = 57
      matchParticipation.bfg.damageReceived = 58
      matchParticipation.bfg.deaths = 59
      matchParticipation.bfg.hits = 60
      matchParticipation.bfg.kills = 61
      matchParticipation.bfg.p = 62
      matchParticipation.bfg.shots = 63
      matchParticipation.bfg.t = 64
      matchParticipation.chainGun = new WeaponStats
      matchParticipation.chainGun.damageGiven = 65
      matchParticipation.chainGun.damageReceived = 66
      matchParticipation.chainGun.deaths = 67
      matchParticipation.chainGun.hits = 68
      matchParticipation.chainGun.kills = 69
      matchParticipation.chainGun.p = 70
      matchParticipation.chainGun.shots = 71
      matchParticipation.chainGun.t = 72
      matchParticipation.gauntlet = new WeaponStats
      matchParticipation.gauntlet.damageGiven = 73
      matchParticipation.gauntlet.damageReceived = 74
      matchParticipation.gauntlet.deaths = 75
      matchParticipation.gauntlet.hits = 76
      matchParticipation.gauntlet.kills = 77
      matchParticipation.gauntlet.p = 78
      matchParticipation.gauntlet.shots = 79
      matchParticipation.gauntlet.t = 80
      matchParticipation.grenadeLauncher = new WeaponStats
      matchParticipation.grenadeLauncher.damageGiven = 81
      matchParticipation.grenadeLauncher.damageReceived = 82
      matchParticipation.grenadeLauncher.deaths = 83
      matchParticipation.grenadeLauncher.hits = 84
      matchParticipation.grenadeLauncher.kills = 85
      matchParticipation.grenadeLauncher.p = 86
      matchParticipation.grenadeLauncher.shots = 87
      matchParticipation.grenadeLauncher.t = 88
      matchParticipation.heavyMachineGun = new WeaponStats
      matchParticipation.heavyMachineGun.damageGiven = 89
      matchParticipation.heavyMachineGun.damageReceived = 90
      matchParticipation.heavyMachineGun.deaths = 91
      matchParticipation.heavyMachineGun.hits = 92
      matchParticipation.heavyMachineGun.kills = 93
      matchParticipation.heavyMachineGun.p = 94
      matchParticipation.heavyMachineGun.shots = 95
      matchParticipation.heavyMachineGun.t = 96
      matchParticipation.lightningGun = new WeaponStats
      matchParticipation.lightningGun.damageGiven = 97
      matchParticipation.lightningGun.damageReceived = 98
      matchParticipation.lightningGun.deaths = 99
      matchParticipation.lightningGun.hits = 100
      matchParticipation.lightningGun.kills = 101
      matchParticipation.lightningGun.p = 102
      matchParticipation.lightningGun.shots = 103
      matchParticipation.lightningGun.t = 104
      matchParticipation.machineGun = new WeaponStats
      matchParticipation.machineGun.damageGiven = 105
      matchParticipation.machineGun.damageReceived = 106
      matchParticipation.machineGun.deaths = 107
      matchParticipation.machineGun.hits = 108
      matchParticipation.machineGun.kills = 109
      matchParticipation.machineGun.p = 110
      matchParticipation.machineGun.shots = 111
      matchParticipation.machineGun.t = 112
      matchParticipation.nailGun = new WeaponStats
      matchParticipation.nailGun.damageGiven = 113
      matchParticipation.nailGun.damageReceived = 114
      matchParticipation.nailGun.deaths = 115
      matchParticipation.nailGun.hits = 116
      matchParticipation.nailGun.kills = 117
      matchParticipation.nailGun.p = 118
      matchParticipation.nailGun.shots = 119
      matchParticipation.nailGun.t = 120
      matchParticipation.otherWeapon = new WeaponStats
      matchParticipation.otherWeapon.damageGiven = 121
      matchParticipation.otherWeapon.damageReceived = 122
      matchParticipation.otherWeapon.deaths = 123
      matchParticipation.otherWeapon.hits = 124
      matchParticipation.otherWeapon.kills = 125
      matchParticipation.otherWeapon.p = 126
      matchParticipation.otherWeapon.shots = 127
      matchParticipation.otherWeapon.t = 128
      matchParticipation.plasmaGun = new WeaponStats
      matchParticipation.plasmaGun.damageGiven = 129
      matchParticipation.plasmaGun.damageReceived = 130
      matchParticipation.plasmaGun.deaths = 131
      matchParticipation.plasmaGun.hits = 132
      matchParticipation.plasmaGun.kills = 133
      matchParticipation.plasmaGun.p = 134
      matchParticipation.plasmaGun.shots = 135
      matchParticipation.plasmaGun.t = 136
      matchParticipation.proximityLauncher = new WeaponStats
      matchParticipation.proximityLauncher.damageGiven = 137
      matchParticipation.proximityLauncher.damageReceived = 138
      matchParticipation.proximityLauncher.deaths = 139
      matchParticipation.proximityLauncher.hits = 140
      matchParticipation.proximityLauncher.kills = 141
      matchParticipation.proximityLauncher.p = 142
      matchParticipation.proximityLauncher.shots = 143
      matchParticipation.proximityLauncher.t = 144
      matchParticipation.railgun = new WeaponStats
      matchParticipation.railgun.damageGiven = 145
      matchParticipation.railgun.damageReceived = 146
      matchParticipation.railgun.deaths = 147
      matchParticipation.railgun.hits = 148
      matchParticipation.railgun.kills = 149
      matchParticipation.railgun.p = 150
      matchParticipation.railgun.shots = 151
      matchParticipation.railgun.t = 152
      matchParticipation.rocketLauncher = new WeaponStats
      matchParticipation.rocketLauncher.damageGiven = 153
      matchParticipation.rocketLauncher.damageReceived = 154
      matchParticipation.rocketLauncher.deaths = 155
      matchParticipation.rocketLauncher.hits = 156
      matchParticipation.rocketLauncher.kills = 157
      matchParticipation.rocketLauncher.p = 158
      matchParticipation.rocketLauncher.shots = 159
      matchParticipation.rocketLauncher.t = 160
      matchParticipation.shotgun = new WeaponStats
      matchParticipation.shotgun.damageGiven = 161
      matchParticipation.shotgun.damageReceived = 162
      matchParticipation.shotgun.deaths = 163
      matchParticipation.shotgun.hits = 164
      matchParticipation.shotgun.kills = 165
      matchParticipation.shotgun.p = 166
      matchParticipation.shotgun.shots = 167
      matchParticipation.shotgun.t = 168

      let result = await Services.get().matchParticipationLogic.create(matchParticipation, tx())

      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.serverVisitId).to.equal(1)
      
      expect(result.entity.aborted).to.equal(true)
      expect(result.entity.active).to.equal(true)
      expect(result.entity.blueFlagPickups).to.equal(1)
      expect(result.entity.damageDealt).to.equal(2)
      expect(result.entity.damageTaken).to.equal(3)
      expect(result.entity.deathCount).to.equal(4)
      expect(result.entity.finishDate).to.deep.equal(date1)
      expect(result.entity.holyShits).to.equal(5)
      expect(result.entity.killCount).to.equal(6)
      expect(result.entity.maxStreak).to.equal(7)
      expect(result.entity.medalStats.accuracy).to.equal(8)
      expect(result.entity.medalStats.assists).to.equal(9)
      expect(result.entity.medalStats.captures).to.equal(10)
      expect(result.entity.medalStats.comboKill).to.equal(11)
      expect(result.entity.medalStats.defends).to.equal(12)
      expect(result.entity.medalStats.excellent).to.equal(13)
      expect(result.entity.medalStats.firstFrag).to.equal(14)
      expect(result.entity.medalStats.headshot).to.equal(15)
      expect(result.entity.medalStats.humiliation).to.equal(16)
      expect(result.entity.medalStats.impressive).to.equal(17)
      expect(result.entity.medalStats.midair).to.equal(18)
      expect(result.entity.medalStats.perfect).to.equal(19)
      expect(result.entity.medalStats.perforated).to.equal(20)
      expect(result.entity.medalStats.quadGod).to.equal(21)
      expect(result.entity.medalStats.rampage).to.equal(22)
      expect(result.entity.medalStats.revenge).to.equal(23)
      expect(result.entity.neutralFlagPickups).to.equal(24)
      expect(result.entity.pickupStats.ammo).to.equal(25)
      expect(result.entity.pickupStats.armor).to.equal(26)
      expect(result.entity.pickupStats.armorRegeneration).to.equal(27)
      expect(result.entity.pickupStats.battleSuit).to.equal(28)
      expect(result.entity.pickupStats.doubler).to.equal(29)
      expect(result.entity.pickupStats.flight).to.equal(30)
      expect(result.entity.pickupStats.greenArmor).to.equal(31)
      expect(result.entity.pickupStats.guard).to.equal(32)
      expect(result.entity.pickupStats.haste).to.equal(33)
      expect(result.entity.pickupStats.health).to.equal(34)
      expect(result.entity.pickupStats.invisibility).to.equal(35)
      expect(result.entity.pickupStats.invulnerability).to.equal(36)
      expect(result.entity.pickupStats.kamikaze).to.equal(37)
      expect(result.entity.pickupStats.medkit).to.equal(38)
      expect(result.entity.pickupStats.megaHealth).to.equal(39)
      expect(result.entity.pickupStats.otherHoldable).to.equal(40)
      expect(result.entity.pickupStats.otherPowerUp).to.equal(41)
      expect(result.entity.pickupStats.portal).to.equal(42)
      expect(result.entity.pickupStats.quadDamage).to.equal(43)
      expect(result.entity.pickupStats.redArmor).to.equal(44)
      expect(result.entity.pickupStats.regeneration).to.equal(45)
      expect(result.entity.pickupStats.scout).to.equal(46)
      expect(result.entity.pickupStats.teleporter).to.equal(47)
      expect(result.entity.pickupStats.yellowArmor).to.equal(48)
      expect(result.entity.playTime).to.equal(49)
      expect(result.entity.rank).to.equal(50)
      expect(result.entity.redFlagPickups).to.equal(51)
      expect(result.entity.score).to.equal(52)
      expect(result.entity.startDate).to.deep.equal(date2)
      expect(result.entity.team).to.equal(TeamType.Blue)
      expect(result.entity.teamJoinTime).to.equal(53)
      expect(result.entity.teamRank).to.equal(54)
      expect(result.entity.tiedRank).to.equal(55)
      expect(result.entity.tiedTeamRank).to.equal(56)
      expect(result.entity.warmup).to.equal(true)
      expect(result.entity.bfg.damageGiven).to.equal(57)
      expect(result.entity.bfg.damageReceived).to.equal(58)
      expect(result.entity.bfg.deaths).to.equal(59)
      expect(result.entity.bfg.hits).to.equal(60)
      expect(result.entity.bfg.kills).to.equal(61)
      expect(result.entity.bfg.p).to.equal(62)
      expect(result.entity.bfg.shots).to.equal(63)
      expect(result.entity.bfg.t).to.equal(64)
      expect(result.entity.chainGun.damageGiven).to.equal(65)
      expect(result.entity.chainGun.damageReceived).to.equal(66)
      expect(result.entity.chainGun.deaths).to.equal(67)
      expect(result.entity.chainGun.hits).to.equal(68)
      expect(result.entity.chainGun.kills).to.equal(69)
      expect(result.entity.chainGun.p).to.equal(70)
      expect(result.entity.chainGun.shots).to.equal(71)
      expect(result.entity.chainGun.t).to.equal(72)
      expect(result.entity.gauntlet.damageGiven).to.equal(73)
      expect(result.entity.gauntlet.damageReceived).to.equal(74)
      expect(result.entity.gauntlet.deaths).to.equal(75)
      expect(result.entity.gauntlet.hits).to.equal(76)
      expect(result.entity.gauntlet.kills).to.equal(77)
      expect(result.entity.gauntlet.p).to.equal(78)
      expect(result.entity.gauntlet.shots).to.equal(79)
      expect(result.entity.gauntlet.t).to.equal(80)
      expect(result.entity.grenadeLauncher.damageGiven).to.equal(81)
      expect(result.entity.grenadeLauncher.damageReceived).to.equal(82)
      expect(result.entity.grenadeLauncher.deaths).to.equal(83)
      expect(result.entity.grenadeLauncher.hits).to.equal(84)
      expect(result.entity.grenadeLauncher.kills).to.equal(85)
      expect(result.entity.grenadeLauncher.p).to.equal(86)
      expect(result.entity.grenadeLauncher.shots).to.equal(87)
      expect(result.entity.grenadeLauncher.t).to.equal(88)
      expect(result.entity.heavyMachineGun.damageGiven).to.equal(89)
      expect(result.entity.heavyMachineGun.damageReceived).to.equal(90)
      expect(result.entity.heavyMachineGun.deaths).to.equal(91)
      expect(result.entity.heavyMachineGun.hits).to.equal(92)
      expect(result.entity.heavyMachineGun.kills).to.equal(93)
      expect(result.entity.heavyMachineGun.p).to.equal(94)
      expect(result.entity.heavyMachineGun.shots).to.equal(95)
      expect(result.entity.heavyMachineGun.t).to.equal(96)
      expect(result.entity.lightningGun.damageGiven).to.equal(97)
      expect(result.entity.lightningGun.damageReceived).to.equal(98)
      expect(result.entity.lightningGun.deaths).to.equal(99)
      expect(result.entity.lightningGun.hits).to.equal(100)
      expect(result.entity.lightningGun.kills).to.equal(101)
      expect(result.entity.lightningGun.p).to.equal(102)
      expect(result.entity.lightningGun.shots).to.equal(103)
      expect(result.entity.lightningGun.t).to.equal(104)
      expect(result.entity.machineGun.damageGiven).to.equal(105)
      expect(result.entity.machineGun.damageReceived).to.equal(106)
      expect(result.entity.machineGun.deaths).to.equal(107)
      expect(result.entity.machineGun.hits).to.equal(108)
      expect(result.entity.machineGun.kills).to.equal(109)
      expect(result.entity.machineGun.p).to.equal(110)
      expect(result.entity.machineGun.shots).to.equal(111)
      expect(result.entity.machineGun.t).to.equal(112)
      expect(result.entity.nailGun.damageGiven).to.equal(113)
      expect(result.entity.nailGun.damageReceived).to.equal(114)
      expect(result.entity.nailGun.deaths).to.equal(115)
      expect(result.entity.nailGun.hits).to.equal(116)
      expect(result.entity.nailGun.kills).to.equal(117)
      expect(result.entity.nailGun.p).to.equal(118)
      expect(result.entity.nailGun.shots).to.equal(119)
      expect(result.entity.nailGun.t).to.equal(120)
      expect(result.entity.otherWeapon.damageGiven).to.equal(121)
      expect(result.entity.otherWeapon.damageReceived).to.equal(122)
      expect(result.entity.otherWeapon.deaths).to.equal(123)
      expect(result.entity.otherWeapon.hits).to.equal(124)
      expect(result.entity.otherWeapon.kills).to.equal(125)
      expect(result.entity.otherWeapon.p).to.equal(126)
      expect(result.entity.otherWeapon.shots).to.equal(127)
      expect(result.entity.otherWeapon.t).to.equal(128)
      expect(result.entity.plasmaGun.damageGiven).to.equal(129)
      expect(result.entity.plasmaGun.damageReceived).to.equal(130)
      expect(result.entity.plasmaGun.deaths).to.equal(131)
      expect(result.entity.plasmaGun.hits).to.equal(132)
      expect(result.entity.plasmaGun.kills).to.equal(133)
      expect(result.entity.plasmaGun.p).to.equal(134)
      expect(result.entity.plasmaGun.shots).to.equal(135)
      expect(result.entity.plasmaGun.t).to.equal(136)
      expect(result.entity.proximityLauncher.damageGiven).to.equal(137)
      expect(result.entity.proximityLauncher.damageReceived).to.equal(138)
      expect(result.entity.proximityLauncher.deaths).to.equal(139)
      expect(result.entity.proximityLauncher.hits).to.equal(140)
      expect(result.entity.proximityLauncher.kills).to.equal(141)
      expect(result.entity.proximityLauncher.p).to.equal(142)
      expect(result.entity.proximityLauncher.shots).to.equal(143)
      expect(result.entity.proximityLauncher.t).to.equal(144)
      expect(result.entity.railgun.damageGiven).to.equal(145)
      expect(result.entity.railgun.damageReceived).to.equal(146)
      expect(result.entity.railgun.deaths).to.equal(147)
      expect(result.entity.railgun.hits).to.equal(148)
      expect(result.entity.railgun.kills).to.equal(149)
      expect(result.entity.railgun.p).to.equal(150)
      expect(result.entity.railgun.shots).to.equal(151)
      expect(result.entity.railgun.t).to.equal(152)
      expect(result.entity.rocketLauncher.damageGiven).to.equal(153)
      expect(result.entity.rocketLauncher.damageReceived).to.equal(154)
      expect(result.entity.rocketLauncher.deaths).to.equal(155)
      expect(result.entity.rocketLauncher.hits).to.equal(156)
      expect(result.entity.rocketLauncher.kills).to.equal(157)
      expect(result.entity.rocketLauncher.p).to.equal(158)
      expect(result.entity.rocketLauncher.shots).to.equal(159)
      expect(result.entity.rocketLauncher.t).to.equal(160)
      expect(result.entity.shotgun.damageGiven).to.equal(161)
      expect(result.entity.shotgun.damageReceived).to.equal(162)
      expect(result.entity.shotgun.deaths).to.equal(163)
      expect(result.entity.shotgun.hits).to.equal(164)
      expect(result.entity.shotgun.kills).to.equal(165)
      expect(result.entity.shotgun.p).to.equal(166)
      expect(result.entity.shotgun.shots).to.equal(167)
      expect(result.entity.shotgun.t).to.equal(168)
    })
  })

  describe('read', function() {
    it('should read a matchParticipation with all its rows', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,

        aborted: true,
        active: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        deathCount: 4,
        finishDate: date1,
        holyShits: 5,
        killCount: 6,
        maxStreak: 7,
        medalStats: {
          accuracy: 8,
          assists: 9,
          captures: 10,
          comboKill: 11,
          defends: 12,
          excellent: 13,
          firstFrag: 14,
          headshot: 15,
          humiliation: 16,
          impressive: 17,
          midair: 18,
          perfect: 19,
          perforated: 20,
          quadGod: 21,
          rampage: 22,
          revenge: 23,
        },
        neutralFlagPickups: 24,
        pickupStats: {
          ammo: 25,
          armor: 26,
          armorRegeneration: 27,
          battleSuit: 28,
          doubler: 29,
          flight: 30,
          greenArmor: 31,
          guard: 32,
          haste: 33,
          health: 34,
          invisibility: 35,
          invulnerability: 36,
          kamikaze: 37,
          medkit: 38,
          megaHealth: 39,
          otherHoldable: 40,
          otherPowerUp: 41,
          portal: 42,
          quadDamage: 43,
          redArmor: 44,
          regeneration: 45,
          scout: 46,
          teleporter: 47,
          yellowArmor: 48,
        },
        playTime: 49,
        rank: 50,
        redFlagPickups: 51,
        score: 52,
        startDate: date2,
        team: TeamType.Blue,
        teamJoinTime: 53,
        teamRank: 54,
        tiedRank: 55,
        tiedTeamRank: 56,
        warmup: true,
        bfg: {
          damageGiven: 57,
          damageReceived: 58,
          deaths: 59,
          hits: 60,
          kills: 61,
          p: 62,
          shots: 63,
          t: 64,
        },
        chainGun: {
          damageGiven: 65,
          damageReceived: 66,
          deaths: 67,
          hits: 68,
          kills: 69,
          p: 70,
          shots: 71,
          t: 72,
        },
        gauntlet: {
          damageGiven: 73,
          damageReceived: 74,
          deaths: 75,
          hits: 76,
          kills: 77,
          p: 78,
          shots: 79,
          t: 80,
        },
        grenadeLauncher: {
          damageGiven: 81,
          damageReceived: 82,
          deaths: 83,
          hits: 84,
          kills: 85,
          p: 86,
          shots: 87,
          t: 88,
        },
        heavyMachineGun: {
          damageGiven: 89,
          damageReceived: 90,
          deaths: 91,
          hits: 92,
          kills: 93,
          p: 94,
          shots: 95,
          t: 96,
        },
        lightningGun: {
          damageGiven: 97,
          damageReceived: 98,
          deaths: 99,
          hits: 100,
          kills: 101,
          p: 102,
          shots: 103,
          t: 104,
        },
        machineGun: {
          damageGiven: 105,
          damageReceived: 106,
          deaths: 107,
          hits: 108,
          kills: 109,
          p: 110,
          shots: 111,
          t: 112,
        },
        nailGun: {
          damageGiven: 113,
          damageReceived: 114,
          deaths: 115,
          hits: 116,
          kills: 117,
          p: 118,
          shots: 119,
          t: 120,
        },
        otherWeapon: {
          damageGiven: 121,
          damageReceived: 122,
          deaths: 123,
          hits: 124,
          kills: 125,
          p: 126,
          shots: 127,
          t: 128,
        },
        plasmaGun: {
          damageGiven: 129,
          damageReceived: 130,
          deaths: 131,
          hits: 132,
          kills: 133,
          p: 134,
          shots: 135,
          t: 136,
        },
        proximityLauncher: {
          damageGiven: 137,
          damageReceived: 138,
          deaths: 139,
          hits: 140,
          kills: 141,
          p: 142,
          shots: 143,
          t: 144,
        },
        railgun: {
          damageGiven: 145,
          damageReceived: 146,
          deaths: 147,
          hits: 148,
          kills: 149,
          p: 150,
          shots: 151,
          t: 152,
        },
        rocketLauncher: {
          damageGiven: 153,
          damageReceived: 154,
          deaths: 155,
          hits: 156,
          kills: 157,
          p: 158,
          shots: 159,
          t: 160,
        },
        shotgun: {
          damageGiven: 161,
          damageReceived: 162,
          deaths: 163,
          hits: 164,
          kills: 165,
          p: 166,
          shots: 167,
          t: 168,
        }
      })
      
      let result = await Services.get().matchParticipationLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entities.length).to.equal(1)
      expect(result.entities[0].id).to.equal(1)
      expect(result.entities[0].matchId).to.equal(1)
      expect(result.entities[0].playerId).to.equal(1)
      expect(result.entities[0].roundId).to.equal(1)
      expect(result.entities[0].serverId).to.equal(1)
      expect(result.entities[0].serverVisitId).to.equal(1)
      
      expect(result.entities[0].aborted).to.equal(true)
      expect(result.entities[0].active).to.equal(true)
      expect(result.entities[0].blueFlagPickups).to.equal(1)
      expect(result.entities[0].damageDealt).to.equal(2)
      expect(result.entities[0].damageTaken).to.equal(3)
      expect(result.entities[0].deathCount).to.equal(4)
      expect(result.entities[0].finishDate).to.deep.equal(date1)
      expect(result.entities[0].holyShits).to.equal(5)
      expect(result.entities[0].killCount).to.equal(6)
      expect(result.entities[0].maxStreak).to.equal(7)
      expect(result.entities[0].medalStats.accuracy).to.equal(8)
      expect(result.entities[0].medalStats.assists).to.equal(9)
      expect(result.entities[0].medalStats.captures).to.equal(10)
      expect(result.entities[0].medalStats.comboKill).to.equal(11)
      expect(result.entities[0].medalStats.defends).to.equal(12)
      expect(result.entities[0].medalStats.excellent).to.equal(13)
      expect(result.entities[0].medalStats.firstFrag).to.equal(14)
      expect(result.entities[0].medalStats.headshot).to.equal(15)
      expect(result.entities[0].medalStats.humiliation).to.equal(16)
      expect(result.entities[0].medalStats.impressive).to.equal(17)
      expect(result.entities[0].medalStats.midair).to.equal(18)
      expect(result.entities[0].medalStats.perfect).to.equal(19)
      expect(result.entities[0].medalStats.perforated).to.equal(20)
      expect(result.entities[0].medalStats.quadGod).to.equal(21)
      expect(result.entities[0].medalStats.rampage).to.equal(22)
      expect(result.entities[0].medalStats.revenge).to.equal(23)
      expect(result.entities[0].neutralFlagPickups).to.equal(24)
      expect(result.entities[0].pickupStats.ammo).to.equal(25)
      expect(result.entities[0].pickupStats.armor).to.equal(26)
      expect(result.entities[0].pickupStats.armorRegeneration).to.equal(27)
      expect(result.entities[0].pickupStats.battleSuit).to.equal(28)
      expect(result.entities[0].pickupStats.doubler).to.equal(29)
      expect(result.entities[0].pickupStats.flight).to.equal(30)
      expect(result.entities[0].pickupStats.greenArmor).to.equal(31)
      expect(result.entities[0].pickupStats.guard).to.equal(32)
      expect(result.entities[0].pickupStats.haste).to.equal(33)
      expect(result.entities[0].pickupStats.health).to.equal(34)
      expect(result.entities[0].pickupStats.invisibility).to.equal(35)
      expect(result.entities[0].pickupStats.invulnerability).to.equal(36)
      expect(result.entities[0].pickupStats.kamikaze).to.equal(37)
      expect(result.entities[0].pickupStats.medkit).to.equal(38)
      expect(result.entities[0].pickupStats.megaHealth).to.equal(39)
      expect(result.entities[0].pickupStats.otherHoldable).to.equal(40)
      expect(result.entities[0].pickupStats.otherPowerUp).to.equal(41)
      expect(result.entities[0].pickupStats.portal).to.equal(42)
      expect(result.entities[0].pickupStats.quadDamage).to.equal(43)
      expect(result.entities[0].pickupStats.redArmor).to.equal(44)
      expect(result.entities[0].pickupStats.regeneration).to.equal(45)
      expect(result.entities[0].pickupStats.scout).to.equal(46)
      expect(result.entities[0].pickupStats.teleporter).to.equal(47)
      expect(result.entities[0].pickupStats.yellowArmor).to.equal(48)
      expect(result.entities[0].playTime).to.equal(49)
      expect(result.entities[0].rank).to.equal(50)
      expect(result.entities[0].redFlagPickups).to.equal(51)
      expect(result.entities[0].score).to.equal(52)
      expect(result.entities[0].startDate).to.deep.equal(date2)
      expect(result.entities[0].team).to.equal(TeamType.Blue)
      expect(result.entities[0].teamJoinTime).to.equal(53)
      expect(result.entities[0].teamRank).to.equal(54)
      expect(result.entities[0].tiedRank).to.equal(55)
      expect(result.entities[0].tiedTeamRank).to.equal(56)
      expect(result.entities[0].warmup).to.equal(true)
      expect(result.entities[0].bfg.damageGiven).to.equal(57)
      expect(result.entities[0].bfg.damageReceived).to.equal(58)
      expect(result.entities[0].bfg.deaths).to.equal(59)
      expect(result.entities[0].bfg.hits).to.equal(60)
      expect(result.entities[0].bfg.kills).to.equal(61)
      expect(result.entities[0].bfg.p).to.equal(62)
      expect(result.entities[0].bfg.shots).to.equal(63)
      expect(result.entities[0].bfg.t).to.equal(64)
      expect(result.entities[0].chainGun.damageGiven).to.equal(65)
      expect(result.entities[0].chainGun.damageReceived).to.equal(66)
      expect(result.entities[0].chainGun.deaths).to.equal(67)
      expect(result.entities[0].chainGun.hits).to.equal(68)
      expect(result.entities[0].chainGun.kills).to.equal(69)
      expect(result.entities[0].chainGun.p).to.equal(70)
      expect(result.entities[0].chainGun.shots).to.equal(71)
      expect(result.entities[0].chainGun.t).to.equal(72)
      expect(result.entities[0].gauntlet.damageGiven).to.equal(73)
      expect(result.entities[0].gauntlet.damageReceived).to.equal(74)
      expect(result.entities[0].gauntlet.deaths).to.equal(75)
      expect(result.entities[0].gauntlet.hits).to.equal(76)
      expect(result.entities[0].gauntlet.kills).to.equal(77)
      expect(result.entities[0].gauntlet.p).to.equal(78)
      expect(result.entities[0].gauntlet.shots).to.equal(79)
      expect(result.entities[0].gauntlet.t).to.equal(80)
      expect(result.entities[0].grenadeLauncher.damageGiven).to.equal(81)
      expect(result.entities[0].grenadeLauncher.damageReceived).to.equal(82)
      expect(result.entities[0].grenadeLauncher.deaths).to.equal(83)
      expect(result.entities[0].grenadeLauncher.hits).to.equal(84)
      expect(result.entities[0].grenadeLauncher.kills).to.equal(85)
      expect(result.entities[0].grenadeLauncher.p).to.equal(86)
      expect(result.entities[0].grenadeLauncher.shots).to.equal(87)
      expect(result.entities[0].grenadeLauncher.t).to.equal(88)
      expect(result.entities[0].heavyMachineGun.damageGiven).to.equal(89)
      expect(result.entities[0].heavyMachineGun.damageReceived).to.equal(90)
      expect(result.entities[0].heavyMachineGun.deaths).to.equal(91)
      expect(result.entities[0].heavyMachineGun.hits).to.equal(92)
      expect(result.entities[0].heavyMachineGun.kills).to.equal(93)
      expect(result.entities[0].heavyMachineGun.p).to.equal(94)
      expect(result.entities[0].heavyMachineGun.shots).to.equal(95)
      expect(result.entities[0].heavyMachineGun.t).to.equal(96)
      expect(result.entities[0].lightningGun.damageGiven).to.equal(97)
      expect(result.entities[0].lightningGun.damageReceived).to.equal(98)
      expect(result.entities[0].lightningGun.deaths).to.equal(99)
      expect(result.entities[0].lightningGun.hits).to.equal(100)
      expect(result.entities[0].lightningGun.kills).to.equal(101)
      expect(result.entities[0].lightningGun.p).to.equal(102)
      expect(result.entities[0].lightningGun.shots).to.equal(103)
      expect(result.entities[0].lightningGun.t).to.equal(104)
      expect(result.entities[0].machineGun.damageGiven).to.equal(105)
      expect(result.entities[0].machineGun.damageReceived).to.equal(106)
      expect(result.entities[0].machineGun.deaths).to.equal(107)
      expect(result.entities[0].machineGun.hits).to.equal(108)
      expect(result.entities[0].machineGun.kills).to.equal(109)
      expect(result.entities[0].machineGun.p).to.equal(110)
      expect(result.entities[0].machineGun.shots).to.equal(111)
      expect(result.entities[0].machineGun.t).to.equal(112)
      expect(result.entities[0].nailGun.damageGiven).to.equal(113)
      expect(result.entities[0].nailGun.damageReceived).to.equal(114)
      expect(result.entities[0].nailGun.deaths).to.equal(115)
      expect(result.entities[0].nailGun.hits).to.equal(116)
      expect(result.entities[0].nailGun.kills).to.equal(117)
      expect(result.entities[0].nailGun.p).to.equal(118)
      expect(result.entities[0].nailGun.shots).to.equal(119)
      expect(result.entities[0].nailGun.t).to.equal(120)
      expect(result.entities[0].otherWeapon.damageGiven).to.equal(121)
      expect(result.entities[0].otherWeapon.damageReceived).to.equal(122)
      expect(result.entities[0].otherWeapon.deaths).to.equal(123)
      expect(result.entities[0].otherWeapon.hits).to.equal(124)
      expect(result.entities[0].otherWeapon.kills).to.equal(125)
      expect(result.entities[0].otherWeapon.p).to.equal(126)
      expect(result.entities[0].otherWeapon.shots).to.equal(127)
      expect(result.entities[0].otherWeapon.t).to.equal(128)
      expect(result.entities[0].plasmaGun.damageGiven).to.equal(129)
      expect(result.entities[0].plasmaGun.damageReceived).to.equal(130)
      expect(result.entities[0].plasmaGun.deaths).to.equal(131)
      expect(result.entities[0].plasmaGun.hits).to.equal(132)
      expect(result.entities[0].plasmaGun.kills).to.equal(133)
      expect(result.entities[0].plasmaGun.p).to.equal(134)
      expect(result.entities[0].plasmaGun.shots).to.equal(135)
      expect(result.entities[0].plasmaGun.t).to.equal(136)
      expect(result.entities[0].proximityLauncher.damageGiven).to.equal(137)
      expect(result.entities[0].proximityLauncher.damageReceived).to.equal(138)
      expect(result.entities[0].proximityLauncher.deaths).to.equal(139)
      expect(result.entities[0].proximityLauncher.hits).to.equal(140)
      expect(result.entities[0].proximityLauncher.kills).to.equal(141)
      expect(result.entities[0].proximityLauncher.p).to.equal(142)
      expect(result.entities[0].proximityLauncher.shots).to.equal(143)
      expect(result.entities[0].proximityLauncher.t).to.equal(144)
      expect(result.entities[0].railgun.damageGiven).to.equal(145)
      expect(result.entities[0].railgun.damageReceived).to.equal(146)
      expect(result.entities[0].railgun.deaths).to.equal(147)
      expect(result.entities[0].railgun.hits).to.equal(148)
      expect(result.entities[0].railgun.kills).to.equal(149)
      expect(result.entities[0].railgun.p).to.equal(150)
      expect(result.entities[0].railgun.shots).to.equal(151)
      expect(result.entities[0].railgun.t).to.equal(152)
      expect(result.entities[0].rocketLauncher.damageGiven).to.equal(153)
      expect(result.entities[0].rocketLauncher.damageReceived).to.equal(154)
      expect(result.entities[0].rocketLauncher.deaths).to.equal(155)
      expect(result.entities[0].rocketLauncher.hits).to.equal(156)
      expect(result.entities[0].rocketLauncher.kills).to.equal(157)
      expect(result.entities[0].rocketLauncher.p).to.equal(158)
      expect(result.entities[0].rocketLauncher.shots).to.equal(159)
      expect(result.entities[0].rocketLauncher.t).to.equal(160)
      expect(result.entities[0].shotgun.damageGiven).to.equal(161)
      expect(result.entities[0].shotgun.damageReceived).to.equal(162)
      expect(result.entities[0].shotgun.deaths).to.equal(163)
      expect(result.entities[0].shotgun.hits).to.equal(164)
      expect(result.entities[0].shotgun.kills).to.equal(165)
      expect(result.entities[0].shotgun.p).to.equal(166)
      expect(result.entities[0].shotgun.shots).to.equal(167)
      expect(result.entities[0].shotgun.t).to.equal(168)
    })

    it('should load all deaths', async function() {
      await create('match_participation')
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 1 }})
      await create('frag', { victim: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ deaths: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].deaths).to.be.not.undefined
      expect(result.entities[0].deaths.length).to.equal(2)
      expect(result.entities[0].deaths[0].id).to.equal(2)
      expect(result.entities[0].deaths[1].id).to.equal(1)
    })

    it('should load all kills', async function() {
      await create('match_participation')
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 1 }})
      await create('frag', { killer: { matchParticipationId: 2 }})

      let result = await Services.get().matchParticipationLogic.read({ kills: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].kills).to.be.not.undefined
      expect(result.entities[0].kills.length).to.equal(2)
      expect(result.entities[0].kills[0].id).to.equal(2)
      expect(result.entities[0].kills[1].id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('match_participation', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().matchParticipationLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].match).to.be.not.undefined
      expect(result.entities[0].match.id).to.equal(1)
    })

    it('should load all medals', async function() {
      await create('match_participation')
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 1 })
      await create('medal', { matchParticipationId: 2 })

      let result = await Services.get().matchParticipationLogic.read({ medals: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].medals).to.be.not.undefined
      expect(result.entities[0].medals.length).to.equal(2)
      expect(result.entities[0].medals[0].id).to.equal(1)
      expect(result.entities[0].medals[1].id).to.equal(2)
    })

    it('should load the player', async function() {
      await create('match_participation', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().matchParticipationLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].player).to.be.not.undefined
      expect(result.entities[0].player.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('match_participation', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().matchParticipationLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].round).to.be.not.undefined
      expect(result.entities[0].round.id).to.equal(1)
    })

    it('should load the server', async function() {
      await create('match_participation', { serverId: 1 })
      await create('server')
      await create('server')

      let result = await Services.get().matchParticipationLogic.read({ server: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].server).to.be.not.undefined
      expect(result.entities[0].server.id).to.equal(1)
    })

    it('should load the server visit', async function() {
      await create('match_participation', { serverVisitId: 1 })
      await create('server_visit')
      await create('server_visit')

      let result = await Services.get().matchParticipationLogic.read({ serverVisit: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.entities[0].serverVisit).to.be.not.undefined
      expect(result.entities[0].serverVisit.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a matchParticipation with all its rows', async function() {
      await create('match')
      await create('match')
      await create('player')
      await create('player')
      await create('round')
      await create('round')
      await create('server')
      await create('server')
      await create('server_visit')
      await create('server_visit')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,

        aborted: true,
        active: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        finishDate: date1,
        deathCount: 4,
        holyShits: 5,
        killCount: 6,
        maxStreak: 7,
        medalStats: {
          accuracy: 8,
          assists: 9,
          captures: 10,
          comboKill: 11,
          defends: 12,
          excellent: 13,
          firstFrag: 14,
          headshot: 15,
          humiliation: 16,
          impressive: 17,
          midair: 18,
          perfect: 19,
          perforated: 20,
          quadGod: 21,
          rampage: 22,
          revenge: 23,
        },
        neutralFlagPickups: 24,
        pickupStats: {
          ammo: 25,
          armor: 26,
          armorRegeneration: 27,
          battleSuit: 28,
          doubler: 29,
          flight: 30,
          greenArmor: 31,
          guard: 32,
          haste: 33,
          health: 34,
          invisibility: 35,
          invulnerability: 36,
          kamikaze: 37,
          medkit: 38,
          megaHealth: 39,
          otherHoldable: 40,
          otherPowerUp: 41,
          portal: 42,
          quadDamage: 43,
          redArmor: 44,
          regeneration: 45,
          scout: 46,
          teleporter: 47,
          yellowArmor: 48,
        },
        playTime: 49,
        rank: 50,
        redFlagPickups: 51,
        score: 52,
        startDate: date2,
        team: TeamType.Blue,
        teamJoinTime: 53,
        teamRank: 54,
        tiedRank: 55,
        tiedTeamRank: 56,
        warmup: true,
        bfg: {
          damageGiven: 57,
          damageReceived: 58,
          deaths: 59,
          hits: 60,
          kills: 61,
          p: 62,
          shots: 63,
          t: 64,
        },
        chainGun: {
          damageGiven: 65,
          damageReceived: 66,
          deaths: 67,
          hits: 68,
          kills: 69,
          p: 70,
          shots: 71,
          t: 72,
        },
        gauntlet: {
          damageGiven: 73,
          damageReceived: 74,
          deaths: 75,
          hits: 76,
          kills: 77,
          p: 78,
          shots: 79,
          t: 80,
        },
        grenadeLauncher: {
          damageGiven: 81,
          damageReceived: 82,
          deaths: 83,
          hits: 84,
          kills: 85,
          p: 86,
          shots: 87,
          t: 88,
        },
        heavyMachineGun: {
          damageGiven: 89,
          damageReceived: 90,
          deaths: 91,
          hits: 92,
          kills: 93,
          p: 94,
          shots: 95,
          t: 96,
        },
        lightningGun: {
          damageGiven: 97,
          damageReceived: 98,
          deaths: 99,
          hits: 100,
          kills: 101,
          p: 102,
          shots: 103,
          t: 104,
        },
        machineGun: {
          damageGiven: 105,
          damageReceived: 106,
          deaths: 107,
          hits: 108,
          kills: 109,
          p: 110,
          shots: 111,
          t: 112,
        },
        nailGun: {
          damageGiven: 113,
          damageReceived: 114,
          deaths: 115,
          hits: 116,
          kills: 117,
          p: 118,
          shots: 119,
          t: 120,
        },
        otherWeapon: {
          damageGiven: 121,
          damageReceived: 122,
          deaths: 123,
          hits: 124,
          kills: 125,
          p: 126,
          shots: 127,
          t: 128,
        },
        plasmaGun: {
          damageGiven: 129,
          damageReceived: 130,
          deaths: 131,
          hits: 132,
          kills: 133,
          p: 134,
          shots: 135,
          t: 136,
        },
        proximityLauncher: {
          damageGiven: 137,
          damageReceived: 138,
          deaths: 139,
          hits: 140,
          kills: 141,
          p: 142,
          shots: 143,
          t: 144,
        },
        railgun: {
          damageGiven: 145,
          damageReceived: 146,
          deaths: 147,
          hits: 148,
          kills: 149,
          p: 150,
          shots: 151,
          t: 152,
        },
        rocketLauncher: {
          damageGiven: 153,
          damageReceived: 154,
          deaths: 155,
          hits: 156,
          kills: 157,
          p: 158,
          shots: 159,
          t: 160,
        },
        shotgun: {
          damageGiven: 161,
          damageReceived: 162,
          deaths: 163,
          hits: 164,
          kills: 165,
          p: 166,
          shots: 167,
          t: 168,
        }
      })

      let matchParticipation = new MatchParticipation
      matchParticipation.id = 1
      matchParticipation.matchId = 2
      matchParticipation.playerId = 2
      matchParticipation.roundId = 2
      matchParticipation.serverId = 2
      matchParticipation.serverVisitId = 2

      matchParticipation.aborted = false
      matchParticipation.active = false
      matchParticipation.blueFlagPickups = 2
      matchParticipation.damageDealt = 3
      matchParticipation.damageTaken = 4
      matchParticipation.deathCount = 5
      matchParticipation.finishDate = date2
      matchParticipation.holyShits = 6
      matchParticipation.killCount = 7
      matchParticipation.maxStreak = 8
      matchParticipation.medalStats = new MedalStats
      matchParticipation.medalStats.accuracy = 9
      matchParticipation.medalStats.assists = 10
      matchParticipation.medalStats.captures = 11
      matchParticipation.medalStats.comboKill = 12
      matchParticipation.medalStats.defends = 13
      matchParticipation.medalStats.excellent = 14
      matchParticipation.medalStats.firstFrag = 15
      matchParticipation.medalStats.headshot = 16
      matchParticipation.medalStats.humiliation = 17
      matchParticipation.medalStats.impressive = 18
      matchParticipation.medalStats.midair = 19
      matchParticipation.medalStats.perfect = 20
      matchParticipation.medalStats.perforated = 21
      matchParticipation.medalStats.quadGod = 22
      matchParticipation.medalStats.rampage = 23
      matchParticipation.medalStats.revenge = 24
      matchParticipation.neutralFlagPickups = 25
      matchParticipation.pickupStats = new PickupStats
      matchParticipation.pickupStats.ammo = 26
      matchParticipation.pickupStats.armor = 27
      matchParticipation.pickupStats.armorRegeneration = 28
      matchParticipation.pickupStats.battleSuit = 29
      matchParticipation.pickupStats.doubler = 30
      matchParticipation.pickupStats.flight = 31
      matchParticipation.pickupStats.greenArmor = 32
      matchParticipation.pickupStats.guard = 33
      matchParticipation.pickupStats.haste = 34
      matchParticipation.pickupStats.health = 35
      matchParticipation.pickupStats.invisibility = 36
      matchParticipation.pickupStats.invulnerability = 37
      matchParticipation.pickupStats.kamikaze = 38
      matchParticipation.pickupStats.medkit = 39
      matchParticipation.pickupStats.megaHealth = 40
      matchParticipation.pickupStats.otherHoldable = 41
      matchParticipation.pickupStats.otherPowerUp = 42
      matchParticipation.pickupStats.portal = 43
      matchParticipation.pickupStats.quadDamage = 44
      matchParticipation.pickupStats.redArmor = 45
      matchParticipation.pickupStats.regeneration = 46
      matchParticipation.pickupStats.scout = 47
      matchParticipation.pickupStats.teleporter = 48
      matchParticipation.pickupStats.yellowArmor = 49
      matchParticipation.playTime = 50
      matchParticipation.rank = 51
      matchParticipation.redFlagPickups = 52
      matchParticipation.score = 53
      matchParticipation.startDate = date1
      matchParticipation.team = TeamType.Red
      matchParticipation.teamJoinTime = 54
      matchParticipation.teamRank = 55
      matchParticipation.tiedRank = 56
      matchParticipation.tiedTeamRank = 57
      matchParticipation.warmup = false
      matchParticipation.bfg = new WeaponStats
      matchParticipation.bfg.damageGiven = 58
      matchParticipation.bfg.damageReceived = 59
      matchParticipation.bfg.deaths = 60
      matchParticipation.bfg.hits = 61
      matchParticipation.bfg.kills = 62
      matchParticipation.bfg.p = 63
      matchParticipation.bfg.shots = 64
      matchParticipation.bfg.t = 65
      matchParticipation.chainGun = new WeaponStats
      matchParticipation.chainGun.damageGiven = 66
      matchParticipation.chainGun.damageReceived = 67
      matchParticipation.chainGun.deaths = 68
      matchParticipation.chainGun.hits = 69
      matchParticipation.chainGun.kills = 70
      matchParticipation.chainGun.p = 71
      matchParticipation.chainGun.shots = 72
      matchParticipation.chainGun.t = 73
      matchParticipation.gauntlet = new WeaponStats
      matchParticipation.gauntlet.damageGiven = 74
      matchParticipation.gauntlet.damageReceived = 75
      matchParticipation.gauntlet.deaths = 76
      matchParticipation.gauntlet.hits = 77
      matchParticipation.gauntlet.kills = 78
      matchParticipation.gauntlet.p = 79
      matchParticipation.gauntlet.shots = 80
      matchParticipation.gauntlet.t = 81
      matchParticipation.grenadeLauncher = new WeaponStats
      matchParticipation.grenadeLauncher.damageGiven = 82
      matchParticipation.grenadeLauncher.damageReceived = 83
      matchParticipation.grenadeLauncher.deaths = 84
      matchParticipation.grenadeLauncher.hits = 85
      matchParticipation.grenadeLauncher.kills = 86
      matchParticipation.grenadeLauncher.p = 87
      matchParticipation.grenadeLauncher.shots = 88
      matchParticipation.grenadeLauncher.t = 89
      matchParticipation.heavyMachineGun = new WeaponStats
      matchParticipation.heavyMachineGun.damageGiven = 90
      matchParticipation.heavyMachineGun.damageReceived = 91
      matchParticipation.heavyMachineGun.deaths = 92
      matchParticipation.heavyMachineGun.hits = 93
      matchParticipation.heavyMachineGun.kills = 94
      matchParticipation.heavyMachineGun.p = 95
      matchParticipation.heavyMachineGun.shots = 96
      matchParticipation.heavyMachineGun.t = 97
      matchParticipation.lightningGun = new WeaponStats
      matchParticipation.lightningGun.damageGiven = 98
      matchParticipation.lightningGun.damageReceived = 99
      matchParticipation.lightningGun.deaths = 100
      matchParticipation.lightningGun.hits = 101
      matchParticipation.lightningGun.kills = 102
      matchParticipation.lightningGun.p = 103
      matchParticipation.lightningGun.shots = 104
      matchParticipation.lightningGun.t = 105
      matchParticipation.machineGun = new WeaponStats
      matchParticipation.machineGun.damageGiven = 106
      matchParticipation.machineGun.damageReceived = 107
      matchParticipation.machineGun.deaths = 108
      matchParticipation.machineGun.hits = 109
      matchParticipation.machineGun.kills = 110
      matchParticipation.machineGun.p = 111
      matchParticipation.machineGun.shots = 112
      matchParticipation.machineGun.t = 113
      matchParticipation.nailGun = new WeaponStats
      matchParticipation.nailGun.damageGiven = 114
      matchParticipation.nailGun.damageReceived = 115
      matchParticipation.nailGun.deaths = 116
      matchParticipation.nailGun.hits = 117
      matchParticipation.nailGun.kills = 118
      matchParticipation.nailGun.p = 119
      matchParticipation.nailGun.shots = 120
      matchParticipation.nailGun.t = 121
      matchParticipation.otherWeapon = new WeaponStats
      matchParticipation.otherWeapon.damageGiven = 122
      matchParticipation.otherWeapon.damageReceived = 123
      matchParticipation.otherWeapon.deaths = 124
      matchParticipation.otherWeapon.hits = 125
      matchParticipation.otherWeapon.kills = 126
      matchParticipation.otherWeapon.p = 127
      matchParticipation.otherWeapon.shots = 128
      matchParticipation.otherWeapon.t = 129
      matchParticipation.plasmaGun = new WeaponStats
      matchParticipation.plasmaGun.damageGiven = 130
      matchParticipation.plasmaGun.damageReceived = 131
      matchParticipation.plasmaGun.deaths = 132
      matchParticipation.plasmaGun.hits = 133
      matchParticipation.plasmaGun.kills = 134
      matchParticipation.plasmaGun.p = 135
      matchParticipation.plasmaGun.shots = 136
      matchParticipation.plasmaGun.t = 137
      matchParticipation.proximityLauncher = new WeaponStats
      matchParticipation.proximityLauncher.damageGiven = 138
      matchParticipation.proximityLauncher.damageReceived = 139
      matchParticipation.proximityLauncher.deaths = 140
      matchParticipation.proximityLauncher.hits = 141
      matchParticipation.proximityLauncher.kills = 142
      matchParticipation.proximityLauncher.p = 143
      matchParticipation.proximityLauncher.shots = 144
      matchParticipation.proximityLauncher.t = 145
      matchParticipation.railgun = new WeaponStats
      matchParticipation.railgun.damageGiven = 146
      matchParticipation.railgun.damageReceived = 147
      matchParticipation.railgun.deaths = 148
      matchParticipation.railgun.hits = 149
      matchParticipation.railgun.kills = 150
      matchParticipation.railgun.p = 151
      matchParticipation.railgun.shots = 152
      matchParticipation.railgun.t = 153
      matchParticipation.rocketLauncher = new WeaponStats
      matchParticipation.rocketLauncher.damageGiven = 154
      matchParticipation.rocketLauncher.damageReceived = 155
      matchParticipation.rocketLauncher.deaths = 156
      matchParticipation.rocketLauncher.hits = 157
      matchParticipation.rocketLauncher.kills = 158
      matchParticipation.rocketLauncher.p = 159
      matchParticipation.rocketLauncher.shots = 160
      matchParticipation.rocketLauncher.t = 161
      matchParticipation.shotgun = new WeaponStats
      matchParticipation.shotgun.damageGiven = 162
      matchParticipation.shotgun.damageReceived = 163
      matchParticipation.shotgun.deaths = 164
      matchParticipation.shotgun.hits = 165
      matchParticipation.shotgun.kills = 166
      matchParticipation.shotgun.p = 167
      matchParticipation.shotgun.shots = 168
      matchParticipation.shotgun.t = 169

      let result = await Services.get().matchParticipationLogic.update(matchParticipation, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.matchId).to.equal(2)
      expect(result.entity.playerId).to.equal(2)
      expect(result.entity.roundId).to.equal(2)
      expect(result.entity.serverId).to.equal(2)
      expect(result.entity.serverVisitId).to.equal(2)
      
      expect(result.entity.aborted).to.equal(false)
      expect(result.entity.active).to.equal(false)
      expect(result.entity.blueFlagPickups).to.equal(2)
      expect(result.entity.damageDealt).to.equal(3)
      expect(result.entity.damageTaken).to.equal(4)
      expect(result.entity.deathCount).to.equal(5)
      expect(result.entity.finishDate).to.deep.equal(date2)
      expect(result.entity.holyShits).to.equal(6)
      expect(result.entity.killCount).to.equal(7)
      expect(result.entity.maxStreak).to.equal(8)
      expect(result.entity.medalStats.accuracy).to.equal(9)
      expect(result.entity.medalStats.assists).to.equal(10)
      expect(result.entity.medalStats.captures).to.equal(11)
      expect(result.entity.medalStats.comboKill).to.equal(12)
      expect(result.entity.medalStats.defends).to.equal(13)
      expect(result.entity.medalStats.excellent).to.equal(14)
      expect(result.entity.medalStats.firstFrag).to.equal(15)
      expect(result.entity.medalStats.headshot).to.equal(16)
      expect(result.entity.medalStats.humiliation).to.equal(17)
      expect(result.entity.medalStats.impressive).to.equal(18)
      expect(result.entity.medalStats.midair).to.equal(19)
      expect(result.entity.medalStats.perfect).to.equal(20)
      expect(result.entity.medalStats.perforated).to.equal(21)
      expect(result.entity.medalStats.quadGod).to.equal(22)
      expect(result.entity.medalStats.rampage).to.equal(23)
      expect(result.entity.medalStats.revenge).to.equal(24)
      expect(result.entity.neutralFlagPickups).to.equal(25)
      expect(result.entity.pickupStats.ammo).to.equal(26)
      expect(result.entity.pickupStats.armor).to.equal(27)
      expect(result.entity.pickupStats.armorRegeneration).to.equal(28)
      expect(result.entity.pickupStats.battleSuit).to.equal(29)
      expect(result.entity.pickupStats.doubler).to.equal(30)
      expect(result.entity.pickupStats.flight).to.equal(31)
      expect(result.entity.pickupStats.greenArmor).to.equal(32)
      expect(result.entity.pickupStats.guard).to.equal(33)
      expect(result.entity.pickupStats.haste).to.equal(34)
      expect(result.entity.pickupStats.health).to.equal(35)
      expect(result.entity.pickupStats.invisibility).to.equal(36)
      expect(result.entity.pickupStats.invulnerability).to.equal(37)
      expect(result.entity.pickupStats.kamikaze).to.equal(38)
      expect(result.entity.pickupStats.medkit).to.equal(39)
      expect(result.entity.pickupStats.megaHealth).to.equal(40)
      expect(result.entity.pickupStats.otherHoldable).to.equal(41)
      expect(result.entity.pickupStats.otherPowerUp).to.equal(42)
      expect(result.entity.pickupStats.portal).to.equal(43)
      expect(result.entity.pickupStats.quadDamage).to.equal(44)
      expect(result.entity.pickupStats.redArmor).to.equal(45)
      expect(result.entity.pickupStats.regeneration).to.equal(46)
      expect(result.entity.pickupStats.scout).to.equal(47)
      expect(result.entity.pickupStats.teleporter).to.equal(48)
      expect(result.entity.pickupStats.yellowArmor).to.equal(49)
      expect(result.entity.playTime).to.equal(50)
      expect(result.entity.rank).to.equal(51)
      expect(result.entity.redFlagPickups).to.equal(52)
      expect(result.entity.score).to.equal(53)
      expect(result.entity.startDate).to.deep.equal(date1)
      expect(result.entity.team).to.equal(TeamType.Red)
      expect(result.entity.teamJoinTime).to.equal(54)
      expect(result.entity.teamRank).to.equal(55)
      expect(result.entity.tiedRank).to.equal(56)
      expect(result.entity.tiedTeamRank).to.equal(57)
      expect(result.entity.warmup).to.equal(false)
      expect(result.entity.bfg.damageGiven).to.equal(58)
      expect(result.entity.bfg.damageReceived).to.equal(59)
      expect(result.entity.bfg.deaths).to.equal(60)
      expect(result.entity.bfg.hits).to.equal(61)
      expect(result.entity.bfg.kills).to.equal(62)
      expect(result.entity.bfg.p).to.equal(63)
      expect(result.entity.bfg.shots).to.equal(64)
      expect(result.entity.bfg.t).to.equal(65)
      expect(result.entity.chainGun.damageGiven).to.equal(66)
      expect(result.entity.chainGun.damageReceived).to.equal(67)
      expect(result.entity.chainGun.deaths).to.equal(68)
      expect(result.entity.chainGun.hits).to.equal(69)
      expect(result.entity.chainGun.kills).to.equal(70)
      expect(result.entity.chainGun.p).to.equal(71)
      expect(result.entity.chainGun.shots).to.equal(72)
      expect(result.entity.chainGun.t).to.equal(73)
      expect(result.entity.gauntlet.damageGiven).to.equal(74)
      expect(result.entity.gauntlet.damageReceived).to.equal(75)
      expect(result.entity.gauntlet.deaths).to.equal(76)
      expect(result.entity.gauntlet.hits).to.equal(77)
      expect(result.entity.gauntlet.kills).to.equal(78)
      expect(result.entity.gauntlet.p).to.equal(79)
      expect(result.entity.gauntlet.shots).to.equal(80)
      expect(result.entity.gauntlet.t).to.equal(81)
      expect(result.entity.grenadeLauncher.damageGiven).to.equal(82)
      expect(result.entity.grenadeLauncher.damageReceived).to.equal(83)
      expect(result.entity.grenadeLauncher.deaths).to.equal(84)
      expect(result.entity.grenadeLauncher.hits).to.equal(85)
      expect(result.entity.grenadeLauncher.kills).to.equal(86)
      expect(result.entity.grenadeLauncher.p).to.equal(87)
      expect(result.entity.grenadeLauncher.shots).to.equal(88)
      expect(result.entity.grenadeLauncher.t).to.equal(89)
      expect(result.entity.heavyMachineGun.damageGiven).to.equal(90)
      expect(result.entity.heavyMachineGun.damageReceived).to.equal(91)
      expect(result.entity.heavyMachineGun.deaths).to.equal(92)
      expect(result.entity.heavyMachineGun.hits).to.equal(93)
      expect(result.entity.heavyMachineGun.kills).to.equal(94)
      expect(result.entity.heavyMachineGun.p).to.equal(95)
      expect(result.entity.heavyMachineGun.shots).to.equal(96)
      expect(result.entity.heavyMachineGun.t).to.equal(97)
      expect(result.entity.lightningGun.damageGiven).to.equal(98)
      expect(result.entity.lightningGun.damageReceived).to.equal(99)
      expect(result.entity.lightningGun.deaths).to.equal(100)
      expect(result.entity.lightningGun.hits).to.equal(101)
      expect(result.entity.lightningGun.kills).to.equal(102)
      expect(result.entity.lightningGun.p).to.equal(103)
      expect(result.entity.lightningGun.shots).to.equal(104)
      expect(result.entity.lightningGun.t).to.equal(105)
      expect(result.entity.machineGun.damageGiven).to.equal(106)
      expect(result.entity.machineGun.damageReceived).to.equal(107)
      expect(result.entity.machineGun.deaths).to.equal(108)
      expect(result.entity.machineGun.hits).to.equal(109)
      expect(result.entity.machineGun.kills).to.equal(110)
      expect(result.entity.machineGun.p).to.equal(111)
      expect(result.entity.machineGun.shots).to.equal(112)
      expect(result.entity.machineGun.t).to.equal(113)
      expect(result.entity.nailGun.damageGiven).to.equal(114)
      expect(result.entity.nailGun.damageReceived).to.equal(115)
      expect(result.entity.nailGun.deaths).to.equal(116)
      expect(result.entity.nailGun.hits).to.equal(117)
      expect(result.entity.nailGun.kills).to.equal(118)
      expect(result.entity.nailGun.p).to.equal(119)
      expect(result.entity.nailGun.shots).to.equal(120)
      expect(result.entity.nailGun.t).to.equal(121)
      expect(result.entity.otherWeapon.damageGiven).to.equal(122)
      expect(result.entity.otherWeapon.damageReceived).to.equal(123)
      expect(result.entity.otherWeapon.deaths).to.equal(124)
      expect(result.entity.otherWeapon.hits).to.equal(125)
      expect(result.entity.otherWeapon.kills).to.equal(126)
      expect(result.entity.otherWeapon.p).to.equal(127)
      expect(result.entity.otherWeapon.shots).to.equal(128)
      expect(result.entity.otherWeapon.t).to.equal(129)
      expect(result.entity.plasmaGun.damageGiven).to.equal(130)
      expect(result.entity.plasmaGun.damageReceived).to.equal(131)
      expect(result.entity.plasmaGun.deaths).to.equal(132)
      expect(result.entity.plasmaGun.hits).to.equal(133)
      expect(result.entity.plasmaGun.kills).to.equal(134)
      expect(result.entity.plasmaGun.p).to.equal(135)
      expect(result.entity.plasmaGun.shots).to.equal(136)
      expect(result.entity.plasmaGun.t).to.equal(137)
      expect(result.entity.proximityLauncher.damageGiven).to.equal(138)
      expect(result.entity.proximityLauncher.damageReceived).to.equal(139)
      expect(result.entity.proximityLauncher.deaths).to.equal(140)
      expect(result.entity.proximityLauncher.hits).to.equal(141)
      expect(result.entity.proximityLauncher.kills).to.equal(142)
      expect(result.entity.proximityLauncher.p).to.equal(143)
      expect(result.entity.proximityLauncher.shots).to.equal(144)
      expect(result.entity.proximityLauncher.t).to.equal(145)
      expect(result.entity.railgun.damageGiven).to.equal(146)
      expect(result.entity.railgun.damageReceived).to.equal(147)
      expect(result.entity.railgun.deaths).to.equal(148)
      expect(result.entity.railgun.hits).to.equal(149)
      expect(result.entity.railgun.kills).to.equal(150)
      expect(result.entity.railgun.p).to.equal(151)
      expect(result.entity.railgun.shots).to.equal(152)
      expect(result.entity.railgun.t).to.equal(153)
      expect(result.entity.rocketLauncher.damageGiven).to.equal(154)
      expect(result.entity.rocketLauncher.damageReceived).to.equal(155)
      expect(result.entity.rocketLauncher.deaths).to.equal(156)
      expect(result.entity.rocketLauncher.hits).to.equal(157)
      expect(result.entity.rocketLauncher.kills).to.equal(158)
      expect(result.entity.rocketLauncher.p).to.equal(159)
      expect(result.entity.rocketLauncher.shots).to.equal(160)
      expect(result.entity.rocketLauncher.t).to.equal(161)
      expect(result.entity.shotgun.damageGiven).to.equal(162)
      expect(result.entity.shotgun.damageReceived).to.equal(163)
      expect(result.entity.shotgun.deaths).to.equal(164)
      expect(result.entity.shotgun.hits).to.equal(165)
      expect(result.entity.shotgun.kills).to.equal(166)
      expect(result.entity.shotgun.p).to.equal(167)
      expect(result.entity.shotgun.shots).to.equal(168)
      expect(result.entity.shotgun.t).to.equal(169)
    })
  })

  describe('delete', function() {
    it('should delete a matchParticipation', async function() {
      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('match_participation', {
        matchId: 1,
        playerId: 1,
        roundId: 1,
        serverId: 1,
        serverVisitId: 1,

        aborted: true,
        active: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        deathCount: 4,
        finishDate: date1,
        holyShits: 5,
        killCount: 6,
        maxStreak: 7,
        medalStats: {
          accuracy: 8,
          assists: 9,
          captures: 10,
          comboKill: 11,
          defends: 12,
          excellent: 13,
          firstFrag: 14,
          headshot: 15,
          humiliation: 16,
          impressive: 17,
          midair: 18,
          perfect: 19,
          perforated: 20,
          quadGod: 21,
          rampage: 22,
          revenge: 23,
        },
        neutralFlagPickups: 24,
        pickupStats: {
          ammo: 25,
          armor: 26,
          armorRegeneration: 27,
          battleSuit: 28,
          doubler: 29,
          flight: 30,
          greenArmor: 31,
          guard: 32,
          haste: 33,
          health: 34,
          invisibility: 35,
          invulnerability: 36,
          kamikaze: 37,
          medkit: 38,
          megaHealth: 39,
          otherHoldable: 40,
          otherPowerUp: 41,
          portal: 42,
          quadDamage: 43,
          redArmor: 44,
          regeneration: 45,
          scout: 46,
          teleporter: 47,
          yellowArmor: 48,
        },
        playTime: 49,
        rank: 50,
        redFlagPickups: 51,
        score: 52,
        startDate: date2,
        team: TeamType.Blue,
        teamJoinTime: 53,
        teamRank: 54,
        tiedRank: 55,
        tiedTeamRank: 56,
        warmup: true,
        bfg: {
          damageGiven: 57,
          damageReceived: 58,
          deaths: 59,
          hits: 60,
          kills: 61,
          p: 62,
          shots: 63,
          t: 64,
        },
        chainGun: {
          damageGiven: 65,
          damageReceived: 66,
          deaths: 67,
          hits: 68,
          kills: 69,
          p: 70,
          shots: 71,
          t: 72,
        },
        gauntlet: {
          damageGiven: 73,
          damageReceived: 74,
          deaths: 75,
          hits: 76,
          kills: 77,
          p: 78,
          shots: 79,
          t: 80,
        },
        grenadeLauncher: {
          damageGiven: 81,
          damageReceived: 82,
          deaths: 83,
          hits: 84,
          kills: 85,
          p: 86,
          shots: 87,
          t: 88,
        },
        heavyMachineGun: {
          damageGiven: 89,
          damageReceived: 90,
          deaths: 91,
          hits: 92,
          kills: 93,
          p: 94,
          shots: 95,
          t: 96,
        },
        lightningGun: {
          damageGiven: 97,
          damageReceived: 98,
          deaths: 99,
          hits: 100,
          kills: 101,
          p: 102,
          shots: 103,
          t: 104,
        },
        machineGun: {
          damageGiven: 105,
          damageReceived: 106,
          deaths: 107,
          hits: 108,
          kills: 109,
          p: 110,
          shots: 111,
          t: 112,
        },
        nailGun: {
          damageGiven: 113,
          damageReceived: 114,
          deaths: 115,
          hits: 116,
          kills: 117,
          p: 118,
          shots: 119,
          t: 120,
        },
        otherWeapon: {
          damageGiven: 121,
          damageReceived: 122,
          deaths: 123,
          hits: 124,
          kills: 125,
          p: 126,
          shots: 127,
          t: 128,
        },
        plasmaGun: {
          damageGiven: 129,
          damageReceived: 130,
          deaths: 131,
          hits: 132,
          kills: 133,
          p: 134,
          shots: 135,
          t: 136,
        },
        proximityLauncher: {
          damageGiven: 137,
          damageReceived: 138,
          deaths: 139,
          hits: 140,
          kills: 141,
          p: 142,
          shots: 143,
          t: 144,
        },
        railgun: {
          damageGiven: 145,
          damageReceived: 146,
          deaths: 147,
          hits: 148,
          kills: 149,
          p: 150,
          shots: 151,
          t: 152,
        },
        rocketLauncher: {
          damageGiven: 153,
          damageReceived: 154,
          deaths: 155,
          hits: 156,
          kills: 157,
          p: 158,
          shots: 159,
          t: 160,
        },
        shotgun: {
          damageGiven: 161,
          damageReceived: 162,
          deaths: 163,
          hits: 164,
          kills: 165,
          p: 166,
          shots: 167,
          t: 168,
        }
      })

      let matchParticipation = new MatchParticipation
      matchParticipation.id = 1

      let result = await Services.get().matchParticipationLogic.delete(matchParticipation, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.entity.id).to.equal(1)
      expect(result.entity.matchId).to.equal(1)
      expect(result.entity.playerId).to.equal(1)
      expect(result.entity.roundId).to.equal(1)
      expect(result.entity.serverId).to.equal(1)
      expect(result.entity.serverVisitId).to.equal(1)

      expect(result.entity.aborted).to.equal(true)
      expect(result.entity.active).to.equal(true)
      expect(result.entity.blueFlagPickups).to.equal(1)
      expect(result.entity.damageDealt).to.equal(2)
      expect(result.entity.damageTaken).to.equal(3)
      expect(result.entity.deathCount).to.equal(4)
      expect(result.entity.finishDate).to.deep.equal(date1)
      expect(result.entity.holyShits).to.equal(5)
      expect(result.entity.killCount).to.equal(6)
      expect(result.entity.maxStreak).to.equal(7)
      expect(result.entity.medalStats.accuracy).to.equal(8)
      expect(result.entity.medalStats.assists).to.equal(9)
      expect(result.entity.medalStats.captures).to.equal(10)
      expect(result.entity.medalStats.comboKill).to.equal(11)
      expect(result.entity.medalStats.defends).to.equal(12)
      expect(result.entity.medalStats.excellent).to.equal(13)
      expect(result.entity.medalStats.firstFrag).to.equal(14)
      expect(result.entity.medalStats.headshot).to.equal(15)
      expect(result.entity.medalStats.humiliation).to.equal(16)
      expect(result.entity.medalStats.impressive).to.equal(17)
      expect(result.entity.medalStats.midair).to.equal(18)
      expect(result.entity.medalStats.perfect).to.equal(19)
      expect(result.entity.medalStats.perforated).to.equal(20)
      expect(result.entity.medalStats.quadGod).to.equal(21)
      expect(result.entity.medalStats.rampage).to.equal(22)
      expect(result.entity.medalStats.revenge).to.equal(23)
      expect(result.entity.neutralFlagPickups).to.equal(24)
      expect(result.entity.pickupStats.ammo).to.equal(25)
      expect(result.entity.pickupStats.armor).to.equal(26)
      expect(result.entity.pickupStats.armorRegeneration).to.equal(27)
      expect(result.entity.pickupStats.battleSuit).to.equal(28)
      expect(result.entity.pickupStats.doubler).to.equal(29)
      expect(result.entity.pickupStats.flight).to.equal(30)
      expect(result.entity.pickupStats.greenArmor).to.equal(31)
      expect(result.entity.pickupStats.guard).to.equal(32)
      expect(result.entity.pickupStats.haste).to.equal(33)
      expect(result.entity.pickupStats.health).to.equal(34)
      expect(result.entity.pickupStats.invisibility).to.equal(35)
      expect(result.entity.pickupStats.invulnerability).to.equal(36)
      expect(result.entity.pickupStats.kamikaze).to.equal(37)
      expect(result.entity.pickupStats.medkit).to.equal(38)
      expect(result.entity.pickupStats.megaHealth).to.equal(39)
      expect(result.entity.pickupStats.otherHoldable).to.equal(40)
      expect(result.entity.pickupStats.otherPowerUp).to.equal(41)
      expect(result.entity.pickupStats.portal).to.equal(42)
      expect(result.entity.pickupStats.quadDamage).to.equal(43)
      expect(result.entity.pickupStats.redArmor).to.equal(44)
      expect(result.entity.pickupStats.regeneration).to.equal(45)
      expect(result.entity.pickupStats.scout).to.equal(46)
      expect(result.entity.pickupStats.teleporter).to.equal(47)
      expect(result.entity.pickupStats.yellowArmor).to.equal(48)
      expect(result.entity.playTime).to.equal(49)
      expect(result.entity.rank).to.equal(50)
      expect(result.entity.redFlagPickups).to.equal(51)
      expect(result.entity.score).to.equal(52)
      expect(result.entity.startDate).to.deep.equal(date2)
      expect(result.entity.team).to.equal(TeamType.Blue)
      expect(result.entity.teamJoinTime).to.equal(53)
      expect(result.entity.teamRank).to.equal(54)
      expect(result.entity.tiedRank).to.equal(55)
      expect(result.entity.tiedTeamRank).to.equal(56)
      expect(result.entity.warmup).to.equal(true)
      expect(result.entity.bfg.damageGiven).to.equal(57)
      expect(result.entity.bfg.damageReceived).to.equal(58)
      expect(result.entity.bfg.deaths).to.equal(59)
      expect(result.entity.bfg.hits).to.equal(60)
      expect(result.entity.bfg.kills).to.equal(61)
      expect(result.entity.bfg.p).to.equal(62)
      expect(result.entity.bfg.shots).to.equal(63)
      expect(result.entity.bfg.t).to.equal(64)
      expect(result.entity.chainGun.damageGiven).to.equal(65)
      expect(result.entity.chainGun.damageReceived).to.equal(66)
      expect(result.entity.chainGun.deaths).to.equal(67)
      expect(result.entity.chainGun.hits).to.equal(68)
      expect(result.entity.chainGun.kills).to.equal(69)
      expect(result.entity.chainGun.p).to.equal(70)
      expect(result.entity.chainGun.shots).to.equal(71)
      expect(result.entity.chainGun.t).to.equal(72)
      expect(result.entity.gauntlet.damageGiven).to.equal(73)
      expect(result.entity.gauntlet.damageReceived).to.equal(74)
      expect(result.entity.gauntlet.deaths).to.equal(75)
      expect(result.entity.gauntlet.hits).to.equal(76)
      expect(result.entity.gauntlet.kills).to.equal(77)
      expect(result.entity.gauntlet.p).to.equal(78)
      expect(result.entity.gauntlet.shots).to.equal(79)
      expect(result.entity.gauntlet.t).to.equal(80)
      expect(result.entity.grenadeLauncher.damageGiven).to.equal(81)
      expect(result.entity.grenadeLauncher.damageReceived).to.equal(82)
      expect(result.entity.grenadeLauncher.deaths).to.equal(83)
      expect(result.entity.grenadeLauncher.hits).to.equal(84)
      expect(result.entity.grenadeLauncher.kills).to.equal(85)
      expect(result.entity.grenadeLauncher.p).to.equal(86)
      expect(result.entity.grenadeLauncher.shots).to.equal(87)
      expect(result.entity.grenadeLauncher.t).to.equal(88)
      expect(result.entity.heavyMachineGun.damageGiven).to.equal(89)
      expect(result.entity.heavyMachineGun.damageReceived).to.equal(90)
      expect(result.entity.heavyMachineGun.deaths).to.equal(91)
      expect(result.entity.heavyMachineGun.hits).to.equal(92)
      expect(result.entity.heavyMachineGun.kills).to.equal(93)
      expect(result.entity.heavyMachineGun.p).to.equal(94)
      expect(result.entity.heavyMachineGun.shots).to.equal(95)
      expect(result.entity.heavyMachineGun.t).to.equal(96)
      expect(result.entity.lightningGun.damageGiven).to.equal(97)
      expect(result.entity.lightningGun.damageReceived).to.equal(98)
      expect(result.entity.lightningGun.deaths).to.equal(99)
      expect(result.entity.lightningGun.hits).to.equal(100)
      expect(result.entity.lightningGun.kills).to.equal(101)
      expect(result.entity.lightningGun.p).to.equal(102)
      expect(result.entity.lightningGun.shots).to.equal(103)
      expect(result.entity.lightningGun.t).to.equal(104)
      expect(result.entity.machineGun.damageGiven).to.equal(105)
      expect(result.entity.machineGun.damageReceived).to.equal(106)
      expect(result.entity.machineGun.deaths).to.equal(107)
      expect(result.entity.machineGun.hits).to.equal(108)
      expect(result.entity.machineGun.kills).to.equal(109)
      expect(result.entity.machineGun.p).to.equal(110)
      expect(result.entity.machineGun.shots).to.equal(111)
      expect(result.entity.machineGun.t).to.equal(112)
      expect(result.entity.nailGun.damageGiven).to.equal(113)
      expect(result.entity.nailGun.damageReceived).to.equal(114)
      expect(result.entity.nailGun.deaths).to.equal(115)
      expect(result.entity.nailGun.hits).to.equal(116)
      expect(result.entity.nailGun.kills).to.equal(117)
      expect(result.entity.nailGun.p).to.equal(118)
      expect(result.entity.nailGun.shots).to.equal(119)
      expect(result.entity.nailGun.t).to.equal(120)
      expect(result.entity.otherWeapon.damageGiven).to.equal(121)
      expect(result.entity.otherWeapon.damageReceived).to.equal(122)
      expect(result.entity.otherWeapon.deaths).to.equal(123)
      expect(result.entity.otherWeapon.hits).to.equal(124)
      expect(result.entity.otherWeapon.kills).to.equal(125)
      expect(result.entity.otherWeapon.p).to.equal(126)
      expect(result.entity.otherWeapon.shots).to.equal(127)
      expect(result.entity.otherWeapon.t).to.equal(128)
      expect(result.entity.plasmaGun.damageGiven).to.equal(129)
      expect(result.entity.plasmaGun.damageReceived).to.equal(130)
      expect(result.entity.plasmaGun.deaths).to.equal(131)
      expect(result.entity.plasmaGun.hits).to.equal(132)
      expect(result.entity.plasmaGun.kills).to.equal(133)
      expect(result.entity.plasmaGun.p).to.equal(134)
      expect(result.entity.plasmaGun.shots).to.equal(135)
      expect(result.entity.plasmaGun.t).to.equal(136)
      expect(result.entity.proximityLauncher.damageGiven).to.equal(137)
      expect(result.entity.proximityLauncher.damageReceived).to.equal(138)
      expect(result.entity.proximityLauncher.deaths).to.equal(139)
      expect(result.entity.proximityLauncher.hits).to.equal(140)
      expect(result.entity.proximityLauncher.kills).to.equal(141)
      expect(result.entity.proximityLauncher.p).to.equal(142)
      expect(result.entity.proximityLauncher.shots).to.equal(143)
      expect(result.entity.proximityLauncher.t).to.equal(144)
      expect(result.entity.railgun.damageGiven).to.equal(145)
      expect(result.entity.railgun.damageReceived).to.equal(146)
      expect(result.entity.railgun.deaths).to.equal(147)
      expect(result.entity.railgun.hits).to.equal(148)
      expect(result.entity.railgun.kills).to.equal(149)
      expect(result.entity.railgun.p).to.equal(150)
      expect(result.entity.railgun.shots).to.equal(151)
      expect(result.entity.railgun.t).to.equal(152)
      expect(result.entity.rocketLauncher.damageGiven).to.equal(153)
      expect(result.entity.rocketLauncher.damageReceived).to.equal(154)
      expect(result.entity.rocketLauncher.deaths).to.equal(155)
      expect(result.entity.rocketLauncher.hits).to.equal(156)
      expect(result.entity.rocketLauncher.kills).to.equal(157)
      expect(result.entity.rocketLauncher.p).to.equal(158)
      expect(result.entity.rocketLauncher.shots).to.equal(159)
      expect(result.entity.rocketLauncher.t).to.equal(160)
      expect(result.entity.shotgun.damageGiven).to.equal(161)
      expect(result.entity.shotgun.damageReceived).to.equal(162)
      expect(result.entity.shotgun.deaths).to.equal(163)
      expect(result.entity.shotgun.hits).to.equal(164)
      expect(result.entity.shotgun.kills).to.equal(165)
      expect(result.entity.shotgun.p).to.equal(166)
      expect(result.entity.shotgun.shots).to.equal(167)
      expect(result.entity.shotgun.t).to.equal(168)
    })
  })
})