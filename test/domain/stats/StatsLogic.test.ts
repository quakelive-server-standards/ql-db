import { expect } from 'chai'
import 'mocha'
import { MedalStats, PickupStats, Stats, WeaponStats } from '../../../src/domain/stats/Stats'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('domain/StatsLogic.ts', function() {
  describe('create', function() {
    it('should create a stats with all its rows', async function() {
      await create('match')
      await create('match_participation')
      await create('player')
      await create('round')
      await create('server')

      let now = new Date
      let stats = new Stats

      stats.aborted = true
      stats.blueFlagPickups = 1
      stats.damageDealt = 2
      stats.damageTaken = 3
      stats.date = now
      stats.deaths = 4
      stats.holyShits = 5
      stats.kills = 6
      stats.matchId = 1
      stats.matchParticipationId = 1
      stats.maxStreak = 7
      stats.medals = new MedalStats
      stats.medals.accuracy = 8
      stats.medals.assists = 9
      stats.medals.captures = 10
      stats.medals.comboKill = 11
      stats.medals.defends = 12
      stats.medals.excellent = 13
      stats.medals.firstFrag = 14
      stats.medals.headshot = 15
      stats.medals.humiliation = 16
      stats.medals.impressive = 17
      stats.medals.midair = 18
      stats.medals.perfect = 19
      stats.medals.perforated = 20
      stats.medals.quadGod = 21
      stats.medals.rampage = 22
      stats.medals.revenge = 23
      stats.neutralFlagPickups = 24
      stats.pickups = new PickupStats
      stats.pickups.ammo = 25
      stats.pickups.armor = 26
      stats.pickups.armorRegeneration = 27
      stats.pickups.battleSuit = 28
      stats.pickups.doubler = 29
      stats.pickups.flight = 30
      stats.pickups.greenArmor = 31
      stats.pickups.guard = 32
      stats.pickups.haste = 33
      stats.pickups.health = 34
      stats.pickups.invisibility = 35
      stats.pickups.invulnerability = 36
      stats.pickups.kamikaze = 37
      stats.pickups.medkit = 38
      stats.pickups.megaHealth = 39
      stats.pickups.otherHoldable = 40
      stats.pickups.otherPowerUp = 41
      stats.pickups.portal = 42
      stats.pickups.quadDamage = 43
      stats.pickups.redArmor = 44
      stats.pickups.regeneration = 45
      stats.pickups.scout = 46
      stats.pickups.teleporter = 47
      stats.pickups.yellowArmor = 48
      stats.playTime = 49
      stats.playerId = 1
      stats.rank = 50
      stats.redFlagPickups = 51
      stats.roundId = 1
      stats.score = 52
      stats.serverId = 1
      stats.teamJoinTime = 53
      stats.teamRank = 54
      stats.tiedRank = 55
      stats.tiedTeamRank = 56
      stats.warmup = true
      stats.bfg = new WeaponStats
      stats.bfg.damageGiven = 57
      stats.bfg.damageReceived = 58
      stats.bfg.deaths = 59
      stats.bfg.hits = 60
      stats.bfg.kills = 61
      stats.bfg.p = 62
      stats.bfg.shots = 63
      stats.bfg.t = 64
      stats.chainGun = new WeaponStats
      stats.chainGun.damageGiven = 65
      stats.chainGun.damageReceived = 66
      stats.chainGun.deaths = 67
      stats.chainGun.hits = 68
      stats.chainGun.kills = 69
      stats.chainGun.p = 70
      stats.chainGun.shots = 71
      stats.chainGun.t = 72
      stats.gauntlet = new WeaponStats
      stats.gauntlet.damageGiven = 73
      stats.gauntlet.damageReceived = 74
      stats.gauntlet.deaths = 75
      stats.gauntlet.hits = 76
      stats.gauntlet.kills = 77
      stats.gauntlet.p = 78
      stats.gauntlet.shots = 79
      stats.gauntlet.t = 80
      stats.grenadeLauncher = new WeaponStats
      stats.grenadeLauncher.damageGiven = 81
      stats.grenadeLauncher.damageReceived = 82
      stats.grenadeLauncher.deaths = 83
      stats.grenadeLauncher.hits = 84
      stats.grenadeLauncher.kills = 85
      stats.grenadeLauncher.p = 86
      stats.grenadeLauncher.shots = 87
      stats.grenadeLauncher.t = 88
      stats.heavyMachineGun = new WeaponStats
      stats.heavyMachineGun.damageGiven = 89
      stats.heavyMachineGun.damageReceived = 90
      stats.heavyMachineGun.deaths = 91
      stats.heavyMachineGun.hits = 92
      stats.heavyMachineGun.kills = 93
      stats.heavyMachineGun.p = 94
      stats.heavyMachineGun.shots = 95
      stats.heavyMachineGun.t = 96
      stats.lightningGun = new WeaponStats
      stats.lightningGun.damageGiven = 97
      stats.lightningGun.damageReceived = 98
      stats.lightningGun.deaths = 99
      stats.lightningGun.hits = 100
      stats.lightningGun.kills = 101
      stats.lightningGun.p = 102
      stats.lightningGun.shots = 103
      stats.lightningGun.t = 104
      stats.machineGun = new WeaponStats
      stats.machineGun.damageGiven = 105
      stats.machineGun.damageReceived = 106
      stats.machineGun.deaths = 107
      stats.machineGun.hits = 108
      stats.machineGun.kills = 109
      stats.machineGun.p = 110
      stats.machineGun.shots = 111
      stats.machineGun.t = 112
      stats.nailGun = new WeaponStats
      stats.nailGun.damageGiven = 113
      stats.nailGun.damageReceived = 114
      stats.nailGun.deaths = 115
      stats.nailGun.hits = 116
      stats.nailGun.kills = 117
      stats.nailGun.p = 118
      stats.nailGun.shots = 119
      stats.nailGun.t = 120
      stats.otherWeapon = new WeaponStats
      stats.otherWeapon.damageGiven = 121
      stats.otherWeapon.damageReceived = 122
      stats.otherWeapon.deaths = 123
      stats.otherWeapon.hits = 124
      stats.otherWeapon.kills = 125
      stats.otherWeapon.p = 126
      stats.otherWeapon.shots = 127
      stats.otherWeapon.t = 128
      stats.plasmaGun = new WeaponStats
      stats.plasmaGun.damageGiven = 129
      stats.plasmaGun.damageReceived = 130
      stats.plasmaGun.deaths = 131
      stats.plasmaGun.hits = 132
      stats.plasmaGun.kills = 133
      stats.plasmaGun.p = 134
      stats.plasmaGun.shots = 135
      stats.plasmaGun.t = 136
      stats.proximityLauncher = new WeaponStats
      stats.proximityLauncher.damageGiven = 137
      stats.proximityLauncher.damageReceived = 138
      stats.proximityLauncher.deaths = 139
      stats.proximityLauncher.hits = 140
      stats.proximityLauncher.kills = 141
      stats.proximityLauncher.p = 142
      stats.proximityLauncher.shots = 143
      stats.proximityLauncher.t = 144
      stats.railgun = new WeaponStats
      stats.railgun.damageGiven = 145
      stats.railgun.damageReceived = 146
      stats.railgun.deaths = 147
      stats.railgun.hits = 148
      stats.railgun.kills = 149
      stats.railgun.p = 150
      stats.railgun.shots = 151
      stats.railgun.t = 152
      stats.rocketLauncher = new WeaponStats
      stats.rocketLauncher.damageGiven = 153
      stats.rocketLauncher.damageReceived = 154
      stats.rocketLauncher.deaths = 155
      stats.rocketLauncher.hits = 156
      stats.rocketLauncher.kills = 157
      stats.rocketLauncher.p = 158
      stats.rocketLauncher.shots = 159
      stats.rocketLauncher.t = 160
      stats.shotgun = new WeaponStats
      stats.shotgun.damageGiven = 161
      stats.shotgun.damageReceived = 162
      stats.shotgun.deaths = 163
      stats.shotgun.hits = 164
      stats.shotgun.kills = 165
      stats.shotgun.p = 166
      stats.shotgun.shots = 167
      stats.shotgun.t = 168

      let result = await Services.get().statsLogic.create(stats, tx())

      expect(result.isValue()).to.be.true
      expect(result.created.id).to.equal(1)
      expect(result.created.aborted).to.equal(true)
      expect(result.created.blueFlagPickups).to.equal(1)
      expect(result.created.damageDealt).to.equal(2)
      expect(result.created.damageTaken).to.equal(3)
      expect(result.created.date).to.deep.equal(now)
      expect(result.created.deaths).to.equal(4)
      expect(result.created.holyShits).to.equal(5)
      expect(result.created.kills).to.equal(6)
      expect(result.created.matchId).to.equal(1)
      expect(result.created.matchParticipationId).to.equal(1)
      expect(result.created.maxStreak).to.equal(7)
      expect(result.created.medals.accuracy).to.equal(8)
      expect(result.created.medals.assists).to.equal(9)
      expect(result.created.medals.captures).to.equal(10)
      expect(result.created.medals.comboKill).to.equal(11)
      expect(result.created.medals.defends).to.equal(12)
      expect(result.created.medals.excellent).to.equal(13)
      expect(result.created.medals.firstFrag).to.equal(14)
      expect(result.created.medals.headshot).to.equal(15)
      expect(result.created.medals.humiliation).to.equal(16)
      expect(result.created.medals.impressive).to.equal(17)
      expect(result.created.medals.midair).to.equal(18)
      expect(result.created.medals.perfect).to.equal(19)
      expect(result.created.medals.perforated).to.equal(20)
      expect(result.created.medals.quadGod).to.equal(21)
      expect(result.created.medals.rampage).to.equal(22)
      expect(result.created.medals.revenge).to.equal(23)
      expect(result.created.neutralFlagPickups).to.equal(24)
      expect(result.created.pickups.ammo).to.equal(25)
      expect(result.created.pickups.armor).to.equal(26)
      expect(result.created.pickups.armorRegeneration).to.equal(27)
      expect(result.created.pickups.battleSuit).to.equal(28)
      expect(result.created.pickups.doubler).to.equal(29)
      expect(result.created.pickups.flight).to.equal(30)
      expect(result.created.pickups.greenArmor).to.equal(31)
      expect(result.created.pickups.guard).to.equal(32)
      expect(result.created.pickups.haste).to.equal(33)
      expect(result.created.pickups.health).to.equal(34)
      expect(result.created.pickups.invisibility).to.equal(35)
      expect(result.created.pickups.invulnerability).to.equal(36)
      expect(result.created.pickups.kamikaze).to.equal(37)
      expect(result.created.pickups.medkit).to.equal(38)
      expect(result.created.pickups.megaHealth).to.equal(39)
      expect(result.created.pickups.otherHoldable).to.equal(40)
      expect(result.created.pickups.otherPowerUp).to.equal(41)
      expect(result.created.pickups.portal).to.equal(42)
      expect(result.created.pickups.quadDamage).to.equal(43)
      expect(result.created.pickups.redArmor).to.equal(44)
      expect(result.created.pickups.regeneration).to.equal(45)
      expect(result.created.pickups.scout).to.equal(46)
      expect(result.created.pickups.teleporter).to.equal(47)
      expect(result.created.pickups.yellowArmor).to.equal(48)
      expect(result.created.playTime).to.equal(49)
      expect(result.created.playerId).to.equal(1)
      expect(result.created.rank).to.equal(50)
      expect(result.created.redFlagPickups).to.equal(51)
      expect(result.created.roundId).to.equal(1)
      expect(result.created.score).to.equal(52)
      expect(result.created.serverId).to.equal(1)
      expect(result.created.teamJoinTime).to.equal(53)
      expect(result.created.teamRank).to.equal(54)
      expect(result.created.tiedRank).to.equal(55)
      expect(result.created.tiedTeamRank).to.equal(56)
      expect(result.created.warmup).to.equal(true)
      expect(result.created.bfg.damageGiven).to.equal(57)
      expect(result.created.bfg.damageReceived).to.equal(58)
      expect(result.created.bfg.deaths).to.equal(59)
      expect(result.created.bfg.hits).to.equal(60)
      expect(result.created.bfg.kills).to.equal(61)
      expect(result.created.bfg.p).to.equal(62)
      expect(result.created.bfg.shots).to.equal(63)
      expect(result.created.bfg.t).to.equal(64)
      expect(result.created.chainGun.damageGiven).to.equal(65)
      expect(result.created.chainGun.damageReceived).to.equal(66)
      expect(result.created.chainGun.deaths).to.equal(67)
      expect(result.created.chainGun.hits).to.equal(68)
      expect(result.created.chainGun.kills).to.equal(69)
      expect(result.created.chainGun.p).to.equal(70)
      expect(result.created.chainGun.shots).to.equal(71)
      expect(result.created.chainGun.t).to.equal(72)
      expect(result.created.gauntlet.damageGiven).to.equal(73)
      expect(result.created.gauntlet.damageReceived).to.equal(74)
      expect(result.created.gauntlet.deaths).to.equal(75)
      expect(result.created.gauntlet.hits).to.equal(76)
      expect(result.created.gauntlet.kills).to.equal(77)
      expect(result.created.gauntlet.p).to.equal(78)
      expect(result.created.gauntlet.shots).to.equal(79)
      expect(result.created.gauntlet.t).to.equal(80)
      expect(result.created.grenadeLauncher.damageGiven).to.equal(81)
      expect(result.created.grenadeLauncher.damageReceived).to.equal(82)
      expect(result.created.grenadeLauncher.deaths).to.equal(83)
      expect(result.created.grenadeLauncher.hits).to.equal(84)
      expect(result.created.grenadeLauncher.kills).to.equal(85)
      expect(result.created.grenadeLauncher.p).to.equal(86)
      expect(result.created.grenadeLauncher.shots).to.equal(87)
      expect(result.created.grenadeLauncher.t).to.equal(88)
      expect(result.created.heavyMachineGun.damageGiven).to.equal(89)
      expect(result.created.heavyMachineGun.damageReceived).to.equal(90)
      expect(result.created.heavyMachineGun.deaths).to.equal(91)
      expect(result.created.heavyMachineGun.hits).to.equal(92)
      expect(result.created.heavyMachineGun.kills).to.equal(93)
      expect(result.created.heavyMachineGun.p).to.equal(94)
      expect(result.created.heavyMachineGun.shots).to.equal(95)
      expect(result.created.heavyMachineGun.t).to.equal(96)
      expect(result.created.lightningGun.damageGiven).to.equal(97)
      expect(result.created.lightningGun.damageReceived).to.equal(98)
      expect(result.created.lightningGun.deaths).to.equal(99)
      expect(result.created.lightningGun.hits).to.equal(100)
      expect(result.created.lightningGun.kills).to.equal(101)
      expect(result.created.lightningGun.p).to.equal(102)
      expect(result.created.lightningGun.shots).to.equal(103)
      expect(result.created.lightningGun.t).to.equal(104)
      expect(result.created.machineGun.damageGiven).to.equal(105)
      expect(result.created.machineGun.damageReceived).to.equal(106)
      expect(result.created.machineGun.deaths).to.equal(107)
      expect(result.created.machineGun.hits).to.equal(108)
      expect(result.created.machineGun.kills).to.equal(109)
      expect(result.created.machineGun.p).to.equal(110)
      expect(result.created.machineGun.shots).to.equal(111)
      expect(result.created.machineGun.t).to.equal(112)
      expect(result.created.nailGun.damageGiven).to.equal(113)
      expect(result.created.nailGun.damageReceived).to.equal(114)
      expect(result.created.nailGun.deaths).to.equal(115)
      expect(result.created.nailGun.hits).to.equal(116)
      expect(result.created.nailGun.kills).to.equal(117)
      expect(result.created.nailGun.p).to.equal(118)
      expect(result.created.nailGun.shots).to.equal(119)
      expect(result.created.nailGun.t).to.equal(120)
      expect(result.created.otherWeapon.damageGiven).to.equal(121)
      expect(result.created.otherWeapon.damageReceived).to.equal(122)
      expect(result.created.otherWeapon.deaths).to.equal(123)
      expect(result.created.otherWeapon.hits).to.equal(124)
      expect(result.created.otherWeapon.kills).to.equal(125)
      expect(result.created.otherWeapon.p).to.equal(126)
      expect(result.created.otherWeapon.shots).to.equal(127)
      expect(result.created.otherWeapon.t).to.equal(128)
      expect(result.created.plasmaGun.damageGiven).to.equal(129)
      expect(result.created.plasmaGun.damageReceived).to.equal(130)
      expect(result.created.plasmaGun.deaths).to.equal(131)
      expect(result.created.plasmaGun.hits).to.equal(132)
      expect(result.created.plasmaGun.kills).to.equal(133)
      expect(result.created.plasmaGun.p).to.equal(134)
      expect(result.created.plasmaGun.shots).to.equal(135)
      expect(result.created.plasmaGun.t).to.equal(136)
      expect(result.created.proximityLauncher.damageGiven).to.equal(137)
      expect(result.created.proximityLauncher.damageReceived).to.equal(138)
      expect(result.created.proximityLauncher.deaths).to.equal(139)
      expect(result.created.proximityLauncher.hits).to.equal(140)
      expect(result.created.proximityLauncher.kills).to.equal(141)
      expect(result.created.proximityLauncher.p).to.equal(142)
      expect(result.created.proximityLauncher.shots).to.equal(143)
      expect(result.created.proximityLauncher.t).to.equal(144)
      expect(result.created.railgun.damageGiven).to.equal(145)
      expect(result.created.railgun.damageReceived).to.equal(146)
      expect(result.created.railgun.deaths).to.equal(147)
      expect(result.created.railgun.hits).to.equal(148)
      expect(result.created.railgun.kills).to.equal(149)
      expect(result.created.railgun.p).to.equal(150)
      expect(result.created.railgun.shots).to.equal(151)
      expect(result.created.railgun.t).to.equal(152)
      expect(result.created.rocketLauncher.damageGiven).to.equal(153)
      expect(result.created.rocketLauncher.damageReceived).to.equal(154)
      expect(result.created.rocketLauncher.deaths).to.equal(155)
      expect(result.created.rocketLauncher.hits).to.equal(156)
      expect(result.created.rocketLauncher.kills).to.equal(157)
      expect(result.created.rocketLauncher.p).to.equal(158)
      expect(result.created.rocketLauncher.shots).to.equal(159)
      expect(result.created.rocketLauncher.t).to.equal(160)
      expect(result.created.shotgun.damageGiven).to.equal(161)
      expect(result.created.shotgun.damageReceived).to.equal(162)
      expect(result.created.shotgun.deaths).to.equal(163)
      expect(result.created.shotgun.hits).to.equal(164)
      expect(result.created.shotgun.kills).to.equal(165)
      expect(result.created.shotgun.p).to.equal(166)
      expect(result.created.shotgun.shots).to.equal(167)
      expect(result.created.shotgun.t).to.equal(168)
    })
  })

  describe('read', function() {
    it('should read a stats with all its rows', async function() {
      let now = new Date

      await create('stats', {
        aborted: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        date: now,
        deaths: 4,
        holyShits: 5,
        kills: 6,
        matchId: 1,
        matchParticipationId: 1,
        maxStreak: 7,
        medals: {
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
        pickups: {
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
        playerId: 1,
        rank: 50,
        redFlagPickups: 51,
        roundId: 1,
        score: 52,
        serverId: 1,
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
      
      let result = await Services.get().statsLogic.read({}, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.read.length).to.equal(1)
      expect(result.read[0].id).to.equal(1)
      expect(result.read[0].aborted).to.equal(true)
      expect(result.read[0].blueFlagPickups).to.equal(1)
      expect(result.read[0].damageDealt).to.equal(2)
      expect(result.read[0].damageTaken).to.equal(3)
      expect(result.read[0].date).to.deep.equal(now)
      expect(result.read[0].deaths).to.equal(4)
      expect(result.read[0].holyShits).to.equal(5)
      expect(result.read[0].kills).to.equal(6)
      expect(result.read[0].matchId).to.equal(1)
      expect(result.read[0].matchParticipationId).to.equal(1)
      expect(result.read[0].maxStreak).to.equal(7)
      expect(result.read[0].medals.accuracy).to.equal(8)
      expect(result.read[0].medals.assists).to.equal(9)
      expect(result.read[0].medals.captures).to.equal(10)
      expect(result.read[0].medals.comboKill).to.equal(11)
      expect(result.read[0].medals.defends).to.equal(12)
      expect(result.read[0].medals.excellent).to.equal(13)
      expect(result.read[0].medals.firstFrag).to.equal(14)
      expect(result.read[0].medals.headshot).to.equal(15)
      expect(result.read[0].medals.humiliation).to.equal(16)
      expect(result.read[0].medals.impressive).to.equal(17)
      expect(result.read[0].medals.midair).to.equal(18)
      expect(result.read[0].medals.perfect).to.equal(19)
      expect(result.read[0].medals.perforated).to.equal(20)
      expect(result.read[0].medals.quadGod).to.equal(21)
      expect(result.read[0].medals.rampage).to.equal(22)
      expect(result.read[0].medals.revenge).to.equal(23)
      expect(result.read[0].neutralFlagPickups).to.equal(24)
      expect(result.read[0].pickups.ammo).to.equal(25)
      expect(result.read[0].pickups.armor).to.equal(26)
      expect(result.read[0].pickups.armorRegeneration).to.equal(27)
      expect(result.read[0].pickups.battleSuit).to.equal(28)
      expect(result.read[0].pickups.doubler).to.equal(29)
      expect(result.read[0].pickups.flight).to.equal(30)
      expect(result.read[0].pickups.greenArmor).to.equal(31)
      expect(result.read[0].pickups.guard).to.equal(32)
      expect(result.read[0].pickups.haste).to.equal(33)
      expect(result.read[0].pickups.health).to.equal(34)
      expect(result.read[0].pickups.invisibility).to.equal(35)
      expect(result.read[0].pickups.invulnerability).to.equal(36)
      expect(result.read[0].pickups.kamikaze).to.equal(37)
      expect(result.read[0].pickups.medkit).to.equal(38)
      expect(result.read[0].pickups.megaHealth).to.equal(39)
      expect(result.read[0].pickups.otherHoldable).to.equal(40)
      expect(result.read[0].pickups.otherPowerUp).to.equal(41)
      expect(result.read[0].pickups.portal).to.equal(42)
      expect(result.read[0].pickups.quadDamage).to.equal(43)
      expect(result.read[0].pickups.redArmor).to.equal(44)
      expect(result.read[0].pickups.regeneration).to.equal(45)
      expect(result.read[0].pickups.scout).to.equal(46)
      expect(result.read[0].pickups.teleporter).to.equal(47)
      expect(result.read[0].pickups.yellowArmor).to.equal(48)
      expect(result.read[0].playTime).to.equal(49)
      expect(result.read[0].playerId).to.equal(1)
      expect(result.read[0].rank).to.equal(50)
      expect(result.read[0].redFlagPickups).to.equal(51)
      expect(result.read[0].roundId).to.equal(1)
      expect(result.read[0].score).to.equal(52)
      expect(result.read[0].serverId).to.equal(1)
      expect(result.read[0].teamJoinTime).to.equal(53)
      expect(result.read[0].teamRank).to.equal(54)
      expect(result.read[0].tiedRank).to.equal(55)
      expect(result.read[0].tiedTeamRank).to.equal(56)
      expect(result.read[0].warmup).to.equal(true)
      expect(result.read[0].bfg.damageGiven).to.equal(57)
      expect(result.read[0].bfg.damageReceived).to.equal(58)
      expect(result.read[0].bfg.deaths).to.equal(59)
      expect(result.read[0].bfg.hits).to.equal(60)
      expect(result.read[0].bfg.kills).to.equal(61)
      expect(result.read[0].bfg.p).to.equal(62)
      expect(result.read[0].bfg.shots).to.equal(63)
      expect(result.read[0].bfg.t).to.equal(64)
      expect(result.read[0].chainGun.damageGiven).to.equal(65)
      expect(result.read[0].chainGun.damageReceived).to.equal(66)
      expect(result.read[0].chainGun.deaths).to.equal(67)
      expect(result.read[0].chainGun.hits).to.equal(68)
      expect(result.read[0].chainGun.kills).to.equal(69)
      expect(result.read[0].chainGun.p).to.equal(70)
      expect(result.read[0].chainGun.shots).to.equal(71)
      expect(result.read[0].chainGun.t).to.equal(72)
      expect(result.read[0].gauntlet.damageGiven).to.equal(73)
      expect(result.read[0].gauntlet.damageReceived).to.equal(74)
      expect(result.read[0].gauntlet.deaths).to.equal(75)
      expect(result.read[0].gauntlet.hits).to.equal(76)
      expect(result.read[0].gauntlet.kills).to.equal(77)
      expect(result.read[0].gauntlet.p).to.equal(78)
      expect(result.read[0].gauntlet.shots).to.equal(79)
      expect(result.read[0].gauntlet.t).to.equal(80)
      expect(result.read[0].grenadeLauncher.damageGiven).to.equal(81)
      expect(result.read[0].grenadeLauncher.damageReceived).to.equal(82)
      expect(result.read[0].grenadeLauncher.deaths).to.equal(83)
      expect(result.read[0].grenadeLauncher.hits).to.equal(84)
      expect(result.read[0].grenadeLauncher.kills).to.equal(85)
      expect(result.read[0].grenadeLauncher.p).to.equal(86)
      expect(result.read[0].grenadeLauncher.shots).to.equal(87)
      expect(result.read[0].grenadeLauncher.t).to.equal(88)
      expect(result.read[0].heavyMachineGun.damageGiven).to.equal(89)
      expect(result.read[0].heavyMachineGun.damageReceived).to.equal(90)
      expect(result.read[0].heavyMachineGun.deaths).to.equal(91)
      expect(result.read[0].heavyMachineGun.hits).to.equal(92)
      expect(result.read[0].heavyMachineGun.kills).to.equal(93)
      expect(result.read[0].heavyMachineGun.p).to.equal(94)
      expect(result.read[0].heavyMachineGun.shots).to.equal(95)
      expect(result.read[0].heavyMachineGun.t).to.equal(96)
      expect(result.read[0].lightningGun.damageGiven).to.equal(97)
      expect(result.read[0].lightningGun.damageReceived).to.equal(98)
      expect(result.read[0].lightningGun.deaths).to.equal(99)
      expect(result.read[0].lightningGun.hits).to.equal(100)
      expect(result.read[0].lightningGun.kills).to.equal(101)
      expect(result.read[0].lightningGun.p).to.equal(102)
      expect(result.read[0].lightningGun.shots).to.equal(103)
      expect(result.read[0].lightningGun.t).to.equal(104)
      expect(result.read[0].machineGun.damageGiven).to.equal(105)
      expect(result.read[0].machineGun.damageReceived).to.equal(106)
      expect(result.read[0].machineGun.deaths).to.equal(107)
      expect(result.read[0].machineGun.hits).to.equal(108)
      expect(result.read[0].machineGun.kills).to.equal(109)
      expect(result.read[0].machineGun.p).to.equal(110)
      expect(result.read[0].machineGun.shots).to.equal(111)
      expect(result.read[0].machineGun.t).to.equal(112)
      expect(result.read[0].nailGun.damageGiven).to.equal(113)
      expect(result.read[0].nailGun.damageReceived).to.equal(114)
      expect(result.read[0].nailGun.deaths).to.equal(115)
      expect(result.read[0].nailGun.hits).to.equal(116)
      expect(result.read[0].nailGun.kills).to.equal(117)
      expect(result.read[0].nailGun.p).to.equal(118)
      expect(result.read[0].nailGun.shots).to.equal(119)
      expect(result.read[0].nailGun.t).to.equal(120)
      expect(result.read[0].otherWeapon.damageGiven).to.equal(121)
      expect(result.read[0].otherWeapon.damageReceived).to.equal(122)
      expect(result.read[0].otherWeapon.deaths).to.equal(123)
      expect(result.read[0].otherWeapon.hits).to.equal(124)
      expect(result.read[0].otherWeapon.kills).to.equal(125)
      expect(result.read[0].otherWeapon.p).to.equal(126)
      expect(result.read[0].otherWeapon.shots).to.equal(127)
      expect(result.read[0].otherWeapon.t).to.equal(128)
      expect(result.read[0].plasmaGun.damageGiven).to.equal(129)
      expect(result.read[0].plasmaGun.damageReceived).to.equal(130)
      expect(result.read[0].plasmaGun.deaths).to.equal(131)
      expect(result.read[0].plasmaGun.hits).to.equal(132)
      expect(result.read[0].plasmaGun.kills).to.equal(133)
      expect(result.read[0].plasmaGun.p).to.equal(134)
      expect(result.read[0].plasmaGun.shots).to.equal(135)
      expect(result.read[0].plasmaGun.t).to.equal(136)
      expect(result.read[0].proximityLauncher.damageGiven).to.equal(137)
      expect(result.read[0].proximityLauncher.damageReceived).to.equal(138)
      expect(result.read[0].proximityLauncher.deaths).to.equal(139)
      expect(result.read[0].proximityLauncher.hits).to.equal(140)
      expect(result.read[0].proximityLauncher.kills).to.equal(141)
      expect(result.read[0].proximityLauncher.p).to.equal(142)
      expect(result.read[0].proximityLauncher.shots).to.equal(143)
      expect(result.read[0].proximityLauncher.t).to.equal(144)
      expect(result.read[0].railgun.damageGiven).to.equal(145)
      expect(result.read[0].railgun.damageReceived).to.equal(146)
      expect(result.read[0].railgun.deaths).to.equal(147)
      expect(result.read[0].railgun.hits).to.equal(148)
      expect(result.read[0].railgun.kills).to.equal(149)
      expect(result.read[0].railgun.p).to.equal(150)
      expect(result.read[0].railgun.shots).to.equal(151)
      expect(result.read[0].railgun.t).to.equal(152)
      expect(result.read[0].rocketLauncher.damageGiven).to.equal(153)
      expect(result.read[0].rocketLauncher.damageReceived).to.equal(154)
      expect(result.read[0].rocketLauncher.deaths).to.equal(155)
      expect(result.read[0].rocketLauncher.hits).to.equal(156)
      expect(result.read[0].rocketLauncher.kills).to.equal(157)
      expect(result.read[0].rocketLauncher.p).to.equal(158)
      expect(result.read[0].rocketLauncher.shots).to.equal(159)
      expect(result.read[0].rocketLauncher.t).to.equal(160)
      expect(result.read[0].shotgun.damageGiven).to.equal(161)
      expect(result.read[0].shotgun.damageReceived).to.equal(162)
      expect(result.read[0].shotgun.deaths).to.equal(163)
      expect(result.read[0].shotgun.hits).to.equal(164)
      expect(result.read[0].shotgun.kills).to.equal(165)
      expect(result.read[0].shotgun.p).to.equal(166)
      expect(result.read[0].shotgun.shots).to.equal(167)
      expect(result.read[0].shotgun.t).to.equal(168)
    })

    it('should load the match', async function() {
      await create('stats', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().statsLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].match).to.be.not.undefined
      expect(result.read[0].match.id).to.equal(1)
    })

    it('should load the match', async function() {
      await create('stats', { matchId: 1 })
      await create('match')
      await create('match')

      let result = await Services.get().statsLogic.read({ match: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].match).to.be.not.undefined
      expect(result.read[0].match.id).to.equal(1)
    })

    it('should load the match participation', async function() {
      await create('stats', { matchParticipationId: 1 })
      await create('match_participation')
      await create('match_participation')

      let result = await Services.get().statsLogic.read({ matchParticipation: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].matchParticipation).to.be.not.undefined
      expect(result.read[0].matchParticipation.id).to.equal(1)
    })

    it('should load the player', async function() {
      await create('stats', { playerId: 1 })
      await create('player')
      await create('player')

      let result = await Services.get().statsLogic.read({ player: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].player).to.be.not.undefined
      expect(result.read[0].player.id).to.equal(1)
    })

    it('should load the round', async function() {
      await create('stats', { roundId: 1 })
      await create('round')
      await create('round')

      let result = await Services.get().statsLogic.read({ round: {} }, tx())

      expect(result.isValue()).to.be.true
      expect(result.read[0].round).to.be.not.undefined
      expect(result.read[0].round.id).to.equal(1)
    })
  })

  describe('update', function() {
    it('should update a stats with all its rows', async function() {
      await create('match')
      await create('match')
      await create('match_participation')
      await create('match_participation')
      await create('player')
      await create('player')
      await create('round')
      await create('round')
      await create('server')
      await create('server')

      let date1 = new Date
      let date2 = new Date(date1.setSeconds(date1.getSeconds() + 1))

      await create('stats', {
        aborted: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        date: date1,
        deaths: 4,
        holyShits: 5,
        kills: 6,
        matchId: 1,
        matchParticipationId: 1,
        maxStreak: 7,
        medals: {
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
        pickups: {
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
        playerId: 1,
        rank: 50,
        redFlagPickups: 51,
        roundId: 1,
        score: 52,
        serverId: 1,
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

      let stats = new Stats
      stats.id = 1
      stats.aborted = false
      stats.blueFlagPickups = 2
      stats.damageDealt = 3
      stats.damageTaken = 4
      stats.date = date2
      stats.deaths = 5
      stats.holyShits = 6
      stats.kills = 7
      stats.matchId = 2
      stats.matchParticipationId = 2
      stats.maxStreak = 8
      stats.medals = new MedalStats
      stats.medals.accuracy = 9
      stats.medals.assists = 10
      stats.medals.captures = 11
      stats.medals.comboKill = 12
      stats.medals.defends = 13
      stats.medals.excellent = 14
      stats.medals.firstFrag = 15
      stats.medals.headshot = 16
      stats.medals.humiliation = 17
      stats.medals.impressive = 18
      stats.medals.midair = 19
      stats.medals.perfect = 20
      stats.medals.perforated = 21
      stats.medals.quadGod = 22
      stats.medals.rampage = 23
      stats.medals.revenge = 24
      stats.neutralFlagPickups = 25
      stats.pickups = new PickupStats
      stats.pickups.ammo = 26
      stats.pickups.armor = 27
      stats.pickups.armorRegeneration = 28
      stats.pickups.battleSuit = 29
      stats.pickups.doubler = 30
      stats.pickups.flight = 31
      stats.pickups.greenArmor = 32
      stats.pickups.guard = 33
      stats.pickups.haste = 34
      stats.pickups.health = 35
      stats.pickups.invisibility = 36
      stats.pickups.invulnerability = 37
      stats.pickups.kamikaze = 38
      stats.pickups.medkit = 39
      stats.pickups.megaHealth = 40
      stats.pickups.otherHoldable = 41
      stats.pickups.otherPowerUp = 42
      stats.pickups.portal = 43
      stats.pickups.quadDamage = 44
      stats.pickups.redArmor = 45
      stats.pickups.regeneration = 46
      stats.pickups.scout = 47
      stats.pickups.teleporter = 48
      stats.pickups.yellowArmor = 49
      stats.playTime = 50
      stats.playerId = 2
      stats.rank = 51
      stats.redFlagPickups = 52
      stats.roundId = 2
      stats.score = 53
      stats.serverId = 2
      stats.teamJoinTime = 54
      stats.teamRank = 55
      stats.tiedRank = 56
      stats.tiedTeamRank = 57
      stats.warmup = false
      stats.bfg = new WeaponStats
      stats.bfg.damageGiven = 58
      stats.bfg.damageReceived = 59
      stats.bfg.deaths = 60
      stats.bfg.hits = 61
      stats.bfg.kills = 62
      stats.bfg.p = 63
      stats.bfg.shots = 64
      stats.bfg.t = 65
      stats.chainGun = new WeaponStats
      stats.chainGun.damageGiven = 66
      stats.chainGun.damageReceived = 67
      stats.chainGun.deaths = 68
      stats.chainGun.hits = 69
      stats.chainGun.kills = 70
      stats.chainGun.p = 71
      stats.chainGun.shots = 72
      stats.chainGun.t = 73
      stats.gauntlet = new WeaponStats
      stats.gauntlet.damageGiven = 74
      stats.gauntlet.damageReceived = 75
      stats.gauntlet.deaths = 76
      stats.gauntlet.hits = 77
      stats.gauntlet.kills = 78
      stats.gauntlet.p = 79
      stats.gauntlet.shots = 80
      stats.gauntlet.t = 81
      stats.grenadeLauncher = new WeaponStats
      stats.grenadeLauncher.damageGiven = 82
      stats.grenadeLauncher.damageReceived = 83
      stats.grenadeLauncher.deaths = 84
      stats.grenadeLauncher.hits = 85
      stats.grenadeLauncher.kills = 86
      stats.grenadeLauncher.p = 87
      stats.grenadeLauncher.shots = 88
      stats.grenadeLauncher.t = 89
      stats.heavyMachineGun = new WeaponStats
      stats.heavyMachineGun.damageGiven = 90
      stats.heavyMachineGun.damageReceived = 91
      stats.heavyMachineGun.deaths = 92
      stats.heavyMachineGun.hits = 93
      stats.heavyMachineGun.kills = 94
      stats.heavyMachineGun.p = 95
      stats.heavyMachineGun.shots = 96
      stats.heavyMachineGun.t = 97
      stats.lightningGun = new WeaponStats
      stats.lightningGun.damageGiven = 98
      stats.lightningGun.damageReceived = 99
      stats.lightningGun.deaths = 100
      stats.lightningGun.hits = 101
      stats.lightningGun.kills = 102
      stats.lightningGun.p = 103
      stats.lightningGun.shots = 104
      stats.lightningGun.t = 105
      stats.machineGun = new WeaponStats
      stats.machineGun.damageGiven = 106
      stats.machineGun.damageReceived = 107
      stats.machineGun.deaths = 108
      stats.machineGun.hits = 109
      stats.machineGun.kills = 110
      stats.machineGun.p = 111
      stats.machineGun.shots = 112
      stats.machineGun.t = 113
      stats.nailGun = new WeaponStats
      stats.nailGun.damageGiven = 114
      stats.nailGun.damageReceived = 115
      stats.nailGun.deaths = 116
      stats.nailGun.hits = 117
      stats.nailGun.kills = 118
      stats.nailGun.p = 119
      stats.nailGun.shots = 120
      stats.nailGun.t = 121
      stats.otherWeapon = new WeaponStats
      stats.otherWeapon.damageGiven = 122
      stats.otherWeapon.damageReceived = 123
      stats.otherWeapon.deaths = 124
      stats.otherWeapon.hits = 125
      stats.otherWeapon.kills = 126
      stats.otherWeapon.p = 127
      stats.otherWeapon.shots = 128
      stats.otherWeapon.t = 129
      stats.plasmaGun = new WeaponStats
      stats.plasmaGun.damageGiven = 130
      stats.plasmaGun.damageReceived = 131
      stats.plasmaGun.deaths = 132
      stats.plasmaGun.hits = 133
      stats.plasmaGun.kills = 134
      stats.plasmaGun.p = 135
      stats.plasmaGun.shots = 136
      stats.plasmaGun.t = 137
      stats.proximityLauncher = new WeaponStats
      stats.proximityLauncher.damageGiven = 138
      stats.proximityLauncher.damageReceived = 139
      stats.proximityLauncher.deaths = 140
      stats.proximityLauncher.hits = 141
      stats.proximityLauncher.kills = 142
      stats.proximityLauncher.p = 143
      stats.proximityLauncher.shots = 144
      stats.proximityLauncher.t = 145
      stats.railgun = new WeaponStats
      stats.railgun.damageGiven = 146
      stats.railgun.damageReceived = 147
      stats.railgun.deaths = 148
      stats.railgun.hits = 149
      stats.railgun.kills = 150
      stats.railgun.p = 151
      stats.railgun.shots = 152
      stats.railgun.t = 153
      stats.rocketLauncher = new WeaponStats
      stats.rocketLauncher.damageGiven = 154
      stats.rocketLauncher.damageReceived = 155
      stats.rocketLauncher.deaths = 156
      stats.rocketLauncher.hits = 157
      stats.rocketLauncher.kills = 158
      stats.rocketLauncher.p = 159
      stats.rocketLauncher.shots = 160
      stats.rocketLauncher.t = 161
      stats.shotgun = new WeaponStats
      stats.shotgun.damageGiven = 162
      stats.shotgun.damageReceived = 163
      stats.shotgun.deaths = 164
      stats.shotgun.hits = 165
      stats.shotgun.kills = 166
      stats.shotgun.p = 167
      stats.shotgun.shots = 168
      stats.shotgun.t = 169

      let result = await Services.get().statsLogic.update(stats, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.updated.id).to.equal(1)
      expect(result.updated.aborted).to.equal(false)
      expect(result.updated.blueFlagPickups).to.equal(2)
      expect(result.updated.damageDealt).to.equal(3)
      expect(result.updated.damageTaken).to.equal(4)
      expect(result.updated.date).to.deep.equal(date2)
      expect(result.updated.deaths).to.equal(5)
      expect(result.updated.holyShits).to.equal(6)
      expect(result.updated.kills).to.equal(7)
      expect(result.updated.matchId).to.equal(2)
      expect(result.updated.matchParticipationId).to.equal(2)
      expect(result.updated.maxStreak).to.equal(8)
      expect(result.updated.medals.accuracy).to.equal(9)
      expect(result.updated.medals.assists).to.equal(10)
      expect(result.updated.medals.captures).to.equal(11)
      expect(result.updated.medals.comboKill).to.equal(12)
      expect(result.updated.medals.defends).to.equal(13)
      expect(result.updated.medals.excellent).to.equal(14)
      expect(result.updated.medals.firstFrag).to.equal(15)
      expect(result.updated.medals.headshot).to.equal(16)
      expect(result.updated.medals.humiliation).to.equal(17)
      expect(result.updated.medals.impressive).to.equal(18)
      expect(result.updated.medals.midair).to.equal(19)
      expect(result.updated.medals.perfect).to.equal(20)
      expect(result.updated.medals.perforated).to.equal(21)
      expect(result.updated.medals.quadGod).to.equal(22)
      expect(result.updated.medals.rampage).to.equal(23)
      expect(result.updated.medals.revenge).to.equal(24)
      expect(result.updated.neutralFlagPickups).to.equal(25)
      expect(result.updated.pickups.ammo).to.equal(26)
      expect(result.updated.pickups.armor).to.equal(27)
      expect(result.updated.pickups.armorRegeneration).to.equal(28)
      expect(result.updated.pickups.battleSuit).to.equal(29)
      expect(result.updated.pickups.doubler).to.equal(30)
      expect(result.updated.pickups.flight).to.equal(31)
      expect(result.updated.pickups.greenArmor).to.equal(32)
      expect(result.updated.pickups.guard).to.equal(33)
      expect(result.updated.pickups.haste).to.equal(34)
      expect(result.updated.pickups.health).to.equal(35)
      expect(result.updated.pickups.invisibility).to.equal(36)
      expect(result.updated.pickups.invulnerability).to.equal(37)
      expect(result.updated.pickups.kamikaze).to.equal(38)
      expect(result.updated.pickups.medkit).to.equal(39)
      expect(result.updated.pickups.megaHealth).to.equal(40)
      expect(result.updated.pickups.otherHoldable).to.equal(41)
      expect(result.updated.pickups.otherPowerUp).to.equal(42)
      expect(result.updated.pickups.portal).to.equal(43)
      expect(result.updated.pickups.quadDamage).to.equal(44)
      expect(result.updated.pickups.redArmor).to.equal(45)
      expect(result.updated.pickups.regeneration).to.equal(46)
      expect(result.updated.pickups.scout).to.equal(47)
      expect(result.updated.pickups.teleporter).to.equal(48)
      expect(result.updated.pickups.yellowArmor).to.equal(49)
      expect(result.updated.playTime).to.equal(50)
      expect(result.updated.playerId).to.equal(2)
      expect(result.updated.rank).to.equal(51)
      expect(result.updated.redFlagPickups).to.equal(52)
      expect(result.updated.roundId).to.equal(2)
      expect(result.updated.score).to.equal(53)
      expect(result.updated.serverId).to.equal(2)
      expect(result.updated.teamJoinTime).to.equal(54)
      expect(result.updated.teamRank).to.equal(55)
      expect(result.updated.tiedRank).to.equal(56)
      expect(result.updated.tiedTeamRank).to.equal(57)
      expect(result.updated.warmup).to.equal(false)
      expect(result.updated.bfg.damageGiven).to.equal(58)
      expect(result.updated.bfg.damageReceived).to.equal(59)
      expect(result.updated.bfg.deaths).to.equal(60)
      expect(result.updated.bfg.hits).to.equal(61)
      expect(result.updated.bfg.kills).to.equal(62)
      expect(result.updated.bfg.p).to.equal(63)
      expect(result.updated.bfg.shots).to.equal(64)
      expect(result.updated.bfg.t).to.equal(65)
      expect(result.updated.chainGun.damageGiven).to.equal(66)
      expect(result.updated.chainGun.damageReceived).to.equal(67)
      expect(result.updated.chainGun.deaths).to.equal(68)
      expect(result.updated.chainGun.hits).to.equal(69)
      expect(result.updated.chainGun.kills).to.equal(70)
      expect(result.updated.chainGun.p).to.equal(71)
      expect(result.updated.chainGun.shots).to.equal(72)
      expect(result.updated.chainGun.t).to.equal(73)
      expect(result.updated.gauntlet.damageGiven).to.equal(74)
      expect(result.updated.gauntlet.damageReceived).to.equal(75)
      expect(result.updated.gauntlet.deaths).to.equal(76)
      expect(result.updated.gauntlet.hits).to.equal(77)
      expect(result.updated.gauntlet.kills).to.equal(78)
      expect(result.updated.gauntlet.p).to.equal(79)
      expect(result.updated.gauntlet.shots).to.equal(80)
      expect(result.updated.gauntlet.t).to.equal(81)
      expect(result.updated.grenadeLauncher.damageGiven).to.equal(82)
      expect(result.updated.grenadeLauncher.damageReceived).to.equal(83)
      expect(result.updated.grenadeLauncher.deaths).to.equal(84)
      expect(result.updated.grenadeLauncher.hits).to.equal(85)
      expect(result.updated.grenadeLauncher.kills).to.equal(86)
      expect(result.updated.grenadeLauncher.p).to.equal(87)
      expect(result.updated.grenadeLauncher.shots).to.equal(88)
      expect(result.updated.grenadeLauncher.t).to.equal(89)
      expect(result.updated.heavyMachineGun.damageGiven).to.equal(90)
      expect(result.updated.heavyMachineGun.damageReceived).to.equal(91)
      expect(result.updated.heavyMachineGun.deaths).to.equal(92)
      expect(result.updated.heavyMachineGun.hits).to.equal(93)
      expect(result.updated.heavyMachineGun.kills).to.equal(94)
      expect(result.updated.heavyMachineGun.p).to.equal(95)
      expect(result.updated.heavyMachineGun.shots).to.equal(96)
      expect(result.updated.heavyMachineGun.t).to.equal(97)
      expect(result.updated.lightningGun.damageGiven).to.equal(98)
      expect(result.updated.lightningGun.damageReceived).to.equal(99)
      expect(result.updated.lightningGun.deaths).to.equal(100)
      expect(result.updated.lightningGun.hits).to.equal(101)
      expect(result.updated.lightningGun.kills).to.equal(102)
      expect(result.updated.lightningGun.p).to.equal(103)
      expect(result.updated.lightningGun.shots).to.equal(104)
      expect(result.updated.lightningGun.t).to.equal(105)
      expect(result.updated.machineGun.damageGiven).to.equal(106)
      expect(result.updated.machineGun.damageReceived).to.equal(107)
      expect(result.updated.machineGun.deaths).to.equal(108)
      expect(result.updated.machineGun.hits).to.equal(109)
      expect(result.updated.machineGun.kills).to.equal(110)
      expect(result.updated.machineGun.p).to.equal(111)
      expect(result.updated.machineGun.shots).to.equal(112)
      expect(result.updated.machineGun.t).to.equal(113)
      expect(result.updated.nailGun.damageGiven).to.equal(114)
      expect(result.updated.nailGun.damageReceived).to.equal(115)
      expect(result.updated.nailGun.deaths).to.equal(116)
      expect(result.updated.nailGun.hits).to.equal(117)
      expect(result.updated.nailGun.kills).to.equal(118)
      expect(result.updated.nailGun.p).to.equal(119)
      expect(result.updated.nailGun.shots).to.equal(120)
      expect(result.updated.nailGun.t).to.equal(121)
      expect(result.updated.otherWeapon.damageGiven).to.equal(122)
      expect(result.updated.otherWeapon.damageReceived).to.equal(123)
      expect(result.updated.otherWeapon.deaths).to.equal(124)
      expect(result.updated.otherWeapon.hits).to.equal(125)
      expect(result.updated.otherWeapon.kills).to.equal(126)
      expect(result.updated.otherWeapon.p).to.equal(127)
      expect(result.updated.otherWeapon.shots).to.equal(128)
      expect(result.updated.otherWeapon.t).to.equal(129)
      expect(result.updated.plasmaGun.damageGiven).to.equal(130)
      expect(result.updated.plasmaGun.damageReceived).to.equal(131)
      expect(result.updated.plasmaGun.deaths).to.equal(132)
      expect(result.updated.plasmaGun.hits).to.equal(133)
      expect(result.updated.plasmaGun.kills).to.equal(134)
      expect(result.updated.plasmaGun.p).to.equal(135)
      expect(result.updated.plasmaGun.shots).to.equal(136)
      expect(result.updated.plasmaGun.t).to.equal(137)
      expect(result.updated.proximityLauncher.damageGiven).to.equal(138)
      expect(result.updated.proximityLauncher.damageReceived).to.equal(139)
      expect(result.updated.proximityLauncher.deaths).to.equal(140)
      expect(result.updated.proximityLauncher.hits).to.equal(141)
      expect(result.updated.proximityLauncher.kills).to.equal(142)
      expect(result.updated.proximityLauncher.p).to.equal(143)
      expect(result.updated.proximityLauncher.shots).to.equal(144)
      expect(result.updated.proximityLauncher.t).to.equal(145)
      expect(result.updated.railgun.damageGiven).to.equal(146)
      expect(result.updated.railgun.damageReceived).to.equal(147)
      expect(result.updated.railgun.deaths).to.equal(148)
      expect(result.updated.railgun.hits).to.equal(149)
      expect(result.updated.railgun.kills).to.equal(150)
      expect(result.updated.railgun.p).to.equal(151)
      expect(result.updated.railgun.shots).to.equal(152)
      expect(result.updated.railgun.t).to.equal(153)
      expect(result.updated.rocketLauncher.damageGiven).to.equal(154)
      expect(result.updated.rocketLauncher.damageReceived).to.equal(155)
      expect(result.updated.rocketLauncher.deaths).to.equal(156)
      expect(result.updated.rocketLauncher.hits).to.equal(157)
      expect(result.updated.rocketLauncher.kills).to.equal(158)
      expect(result.updated.rocketLauncher.p).to.equal(159)
      expect(result.updated.rocketLauncher.shots).to.equal(160)
      expect(result.updated.rocketLauncher.t).to.equal(161)
      expect(result.updated.shotgun.damageGiven).to.equal(162)
      expect(result.updated.shotgun.damageReceived).to.equal(163)
      expect(result.updated.shotgun.deaths).to.equal(164)
      expect(result.updated.shotgun.hits).to.equal(165)
      expect(result.updated.shotgun.kills).to.equal(166)
      expect(result.updated.shotgun.p).to.equal(167)
      expect(result.updated.shotgun.shots).to.equal(168)
      expect(result.updated.shotgun.t).to.equal(169)
    })
  })

  describe('delete', function() {
    it('should delete a stats', async function() {
      let now = new Date

      await create('stats', {
        aborted: true,
        blueFlagPickups: 1,
        damageDealt: 2,
        damageTaken: 3,
        date: now,
        deaths: 4,
        holyShits: 5,
        kills: 6,
        matchId: 1,
        matchParticipationId: 1,
        maxStreak: 7,
        medals: {
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
        pickups: {
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
        playerId: 1,
        rank: 50,
        redFlagPickups: 51,
        roundId: 1,
        score: 52,
        serverId: 1,
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

      let stats = new Stats
      stats.id = 1

      let result = await Services.get().statsLogic.delete(stats, tx())
      
      expect(result.isValue()).to.be.true
      expect(result.deleted.id).to.equal(1)
      expect(result.deleted.aborted).to.equal(true)
      expect(result.deleted.blueFlagPickups).to.equal(1)
      expect(result.deleted.damageDealt).to.equal(2)
      expect(result.deleted.damageTaken).to.equal(3)
      expect(result.deleted.date).to.deep.equal(now)
      expect(result.deleted.deaths).to.equal(4)
      expect(result.deleted.holyShits).to.equal(5)
      expect(result.deleted.kills).to.equal(6)
      expect(result.deleted.matchId).to.equal(1)
      expect(result.deleted.matchParticipationId).to.equal(1)
      expect(result.deleted.maxStreak).to.equal(7)
      expect(result.deleted.medals.accuracy).to.equal(8)
      expect(result.deleted.medals.assists).to.equal(9)
      expect(result.deleted.medals.captures).to.equal(10)
      expect(result.deleted.medals.comboKill).to.equal(11)
      expect(result.deleted.medals.defends).to.equal(12)
      expect(result.deleted.medals.excellent).to.equal(13)
      expect(result.deleted.medals.firstFrag).to.equal(14)
      expect(result.deleted.medals.headshot).to.equal(15)
      expect(result.deleted.medals.humiliation).to.equal(16)
      expect(result.deleted.medals.impressive).to.equal(17)
      expect(result.deleted.medals.midair).to.equal(18)
      expect(result.deleted.medals.perfect).to.equal(19)
      expect(result.deleted.medals.perforated).to.equal(20)
      expect(result.deleted.medals.quadGod).to.equal(21)
      expect(result.deleted.medals.rampage).to.equal(22)
      expect(result.deleted.medals.revenge).to.equal(23)
      expect(result.deleted.neutralFlagPickups).to.equal(24)
      expect(result.deleted.pickups.ammo).to.equal(25)
      expect(result.deleted.pickups.armor).to.equal(26)
      expect(result.deleted.pickups.armorRegeneration).to.equal(27)
      expect(result.deleted.pickups.battleSuit).to.equal(28)
      expect(result.deleted.pickups.doubler).to.equal(29)
      expect(result.deleted.pickups.flight).to.equal(30)
      expect(result.deleted.pickups.greenArmor).to.equal(31)
      expect(result.deleted.pickups.guard).to.equal(32)
      expect(result.deleted.pickups.haste).to.equal(33)
      expect(result.deleted.pickups.health).to.equal(34)
      expect(result.deleted.pickups.invisibility).to.equal(35)
      expect(result.deleted.pickups.invulnerability).to.equal(36)
      expect(result.deleted.pickups.kamikaze).to.equal(37)
      expect(result.deleted.pickups.medkit).to.equal(38)
      expect(result.deleted.pickups.megaHealth).to.equal(39)
      expect(result.deleted.pickups.otherHoldable).to.equal(40)
      expect(result.deleted.pickups.otherPowerUp).to.equal(41)
      expect(result.deleted.pickups.portal).to.equal(42)
      expect(result.deleted.pickups.quadDamage).to.equal(43)
      expect(result.deleted.pickups.redArmor).to.equal(44)
      expect(result.deleted.pickups.regeneration).to.equal(45)
      expect(result.deleted.pickups.scout).to.equal(46)
      expect(result.deleted.pickups.teleporter).to.equal(47)
      expect(result.deleted.pickups.yellowArmor).to.equal(48)
      expect(result.deleted.playTime).to.equal(49)
      expect(result.deleted.playerId).to.equal(1)
      expect(result.deleted.rank).to.equal(50)
      expect(result.deleted.redFlagPickups).to.equal(51)
      expect(result.deleted.roundId).to.equal(1)
      expect(result.deleted.score).to.equal(52)
      expect(result.deleted.serverId).to.equal(1)
      expect(result.deleted.teamJoinTime).to.equal(53)
      expect(result.deleted.teamRank).to.equal(54)
      expect(result.deleted.tiedRank).to.equal(55)
      expect(result.deleted.tiedTeamRank).to.equal(56)
      expect(result.deleted.warmup).to.equal(true)
      expect(result.deleted.bfg.damageGiven).to.equal(57)
      expect(result.deleted.bfg.damageReceived).to.equal(58)
      expect(result.deleted.bfg.deaths).to.equal(59)
      expect(result.deleted.bfg.hits).to.equal(60)
      expect(result.deleted.bfg.kills).to.equal(61)
      expect(result.deleted.bfg.p).to.equal(62)
      expect(result.deleted.bfg.shots).to.equal(63)
      expect(result.deleted.bfg.t).to.equal(64)
      expect(result.deleted.chainGun.damageGiven).to.equal(65)
      expect(result.deleted.chainGun.damageReceived).to.equal(66)
      expect(result.deleted.chainGun.deaths).to.equal(67)
      expect(result.deleted.chainGun.hits).to.equal(68)
      expect(result.deleted.chainGun.kills).to.equal(69)
      expect(result.deleted.chainGun.p).to.equal(70)
      expect(result.deleted.chainGun.shots).to.equal(71)
      expect(result.deleted.chainGun.t).to.equal(72)
      expect(result.deleted.gauntlet.damageGiven).to.equal(73)
      expect(result.deleted.gauntlet.damageReceived).to.equal(74)
      expect(result.deleted.gauntlet.deaths).to.equal(75)
      expect(result.deleted.gauntlet.hits).to.equal(76)
      expect(result.deleted.gauntlet.kills).to.equal(77)
      expect(result.deleted.gauntlet.p).to.equal(78)
      expect(result.deleted.gauntlet.shots).to.equal(79)
      expect(result.deleted.gauntlet.t).to.equal(80)
      expect(result.deleted.grenadeLauncher.damageGiven).to.equal(81)
      expect(result.deleted.grenadeLauncher.damageReceived).to.equal(82)
      expect(result.deleted.grenadeLauncher.deaths).to.equal(83)
      expect(result.deleted.grenadeLauncher.hits).to.equal(84)
      expect(result.deleted.grenadeLauncher.kills).to.equal(85)
      expect(result.deleted.grenadeLauncher.p).to.equal(86)
      expect(result.deleted.grenadeLauncher.shots).to.equal(87)
      expect(result.deleted.grenadeLauncher.t).to.equal(88)
      expect(result.deleted.heavyMachineGun.damageGiven).to.equal(89)
      expect(result.deleted.heavyMachineGun.damageReceived).to.equal(90)
      expect(result.deleted.heavyMachineGun.deaths).to.equal(91)
      expect(result.deleted.heavyMachineGun.hits).to.equal(92)
      expect(result.deleted.heavyMachineGun.kills).to.equal(93)
      expect(result.deleted.heavyMachineGun.p).to.equal(94)
      expect(result.deleted.heavyMachineGun.shots).to.equal(95)
      expect(result.deleted.heavyMachineGun.t).to.equal(96)
      expect(result.deleted.lightningGun.damageGiven).to.equal(97)
      expect(result.deleted.lightningGun.damageReceived).to.equal(98)
      expect(result.deleted.lightningGun.deaths).to.equal(99)
      expect(result.deleted.lightningGun.hits).to.equal(100)
      expect(result.deleted.lightningGun.kills).to.equal(101)
      expect(result.deleted.lightningGun.p).to.equal(102)
      expect(result.deleted.lightningGun.shots).to.equal(103)
      expect(result.deleted.lightningGun.t).to.equal(104)
      expect(result.deleted.machineGun.damageGiven).to.equal(105)
      expect(result.deleted.machineGun.damageReceived).to.equal(106)
      expect(result.deleted.machineGun.deaths).to.equal(107)
      expect(result.deleted.machineGun.hits).to.equal(108)
      expect(result.deleted.machineGun.kills).to.equal(109)
      expect(result.deleted.machineGun.p).to.equal(110)
      expect(result.deleted.machineGun.shots).to.equal(111)
      expect(result.deleted.machineGun.t).to.equal(112)
      expect(result.deleted.nailGun.damageGiven).to.equal(113)
      expect(result.deleted.nailGun.damageReceived).to.equal(114)
      expect(result.deleted.nailGun.deaths).to.equal(115)
      expect(result.deleted.nailGun.hits).to.equal(116)
      expect(result.deleted.nailGun.kills).to.equal(117)
      expect(result.deleted.nailGun.p).to.equal(118)
      expect(result.deleted.nailGun.shots).to.equal(119)
      expect(result.deleted.nailGun.t).to.equal(120)
      expect(result.deleted.otherWeapon.damageGiven).to.equal(121)
      expect(result.deleted.otherWeapon.damageReceived).to.equal(122)
      expect(result.deleted.otherWeapon.deaths).to.equal(123)
      expect(result.deleted.otherWeapon.hits).to.equal(124)
      expect(result.deleted.otherWeapon.kills).to.equal(125)
      expect(result.deleted.otherWeapon.p).to.equal(126)
      expect(result.deleted.otherWeapon.shots).to.equal(127)
      expect(result.deleted.otherWeapon.t).to.equal(128)
      expect(result.deleted.plasmaGun.damageGiven).to.equal(129)
      expect(result.deleted.plasmaGun.damageReceived).to.equal(130)
      expect(result.deleted.plasmaGun.deaths).to.equal(131)
      expect(result.deleted.plasmaGun.hits).to.equal(132)
      expect(result.deleted.plasmaGun.kills).to.equal(133)
      expect(result.deleted.plasmaGun.p).to.equal(134)
      expect(result.deleted.plasmaGun.shots).to.equal(135)
      expect(result.deleted.plasmaGun.t).to.equal(136)
      expect(result.deleted.proximityLauncher.damageGiven).to.equal(137)
      expect(result.deleted.proximityLauncher.damageReceived).to.equal(138)
      expect(result.deleted.proximityLauncher.deaths).to.equal(139)
      expect(result.deleted.proximityLauncher.hits).to.equal(140)
      expect(result.deleted.proximityLauncher.kills).to.equal(141)
      expect(result.deleted.proximityLauncher.p).to.equal(142)
      expect(result.deleted.proximityLauncher.shots).to.equal(143)
      expect(result.deleted.proximityLauncher.t).to.equal(144)
      expect(result.deleted.railgun.damageGiven).to.equal(145)
      expect(result.deleted.railgun.damageReceived).to.equal(146)
      expect(result.deleted.railgun.deaths).to.equal(147)
      expect(result.deleted.railgun.hits).to.equal(148)
      expect(result.deleted.railgun.kills).to.equal(149)
      expect(result.deleted.railgun.p).to.equal(150)
      expect(result.deleted.railgun.shots).to.equal(151)
      expect(result.deleted.railgun.t).to.equal(152)
      expect(result.deleted.rocketLauncher.damageGiven).to.equal(153)
      expect(result.deleted.rocketLauncher.damageReceived).to.equal(154)
      expect(result.deleted.rocketLauncher.deaths).to.equal(155)
      expect(result.deleted.rocketLauncher.hits).to.equal(156)
      expect(result.deleted.rocketLauncher.kills).to.equal(157)
      expect(result.deleted.rocketLauncher.p).to.equal(158)
      expect(result.deleted.rocketLauncher.shots).to.equal(159)
      expect(result.deleted.rocketLauncher.t).to.equal(160)
      expect(result.deleted.shotgun.damageGiven).to.equal(161)
      expect(result.deleted.shotgun.damageReceived).to.equal(162)
      expect(result.deleted.shotgun.deaths).to.equal(163)
      expect(result.deleted.shotgun.hits).to.equal(164)
      expect(result.deleted.shotgun.kills).to.equal(165)
      expect(result.deleted.shotgun.p).to.equal(166)
      expect(result.deleted.shotgun.shots).to.equal(167)
      expect(result.deleted.shotgun.t).to.equal(168)
    })
  })
})