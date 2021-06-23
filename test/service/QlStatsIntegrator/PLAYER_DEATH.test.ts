import { expect } from 'chai'
import 'mocha'
import { PlayerDeathEvent } from 'ql-stats-model'
import { CauseType } from '../../../src/domain/enums/CauseType'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { WeaponType } from '../../../src/domain/enums/WeaponType'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('PLAYER_DEATH', function () {
    describe('Server', function () {
      it('(player kills player) should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player kills player) should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player kills player) should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player kills itself) should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player kills itself) should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player kills itself) should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player killed by environment) should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player killed by environment) should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('(player killed by environment) should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })
    })

    describe('Player', function () {
      it('(player kills player) should create new players', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.be.null
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.be.null
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('(player kills player) should not create new players', async function () {
        let firstSeen = new Date
        await create('player', { name: 'Player1', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
        await create('player', { name: 'Player1', steamId: '22222222222222222', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('(player kills player) should update the player names', async function () {
        let firstSeen = new Date
        await create('player', { name: 'OldPlayer1Name', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
        await create('player', { name: 'OldPlayer2Name', steamId: '22222222222222222', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(firstSeen)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('(player kills player) should set the first seen dates', async function () {
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let playersResult = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(playersResult.entities.length).to.equal(2)
        expect(playersResult.entities[0].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[0].model).to.equal('sarge')
        expect(playersResult.entities[0].name).to.equal('Player1')
        expect(playersResult.entities[0].steamId).to.equal('11111111111111111')
        expect(playersResult.entities[1].firstSeen).to.deep.equal(date)
        expect(playersResult.entities[1].model).to.equal('sarge')
        expect(playersResult.entities[1].name).to.equal('Player2')
        expect(playersResult.entities[1].steamId).to.equal('22222222222222222')
      })

      it('(player kills itself) should create a new player', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player kills itself) should not create a new player', async function () {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player kills itself) should update the player name', async function () {
        let firstSeen = new Date
        await create('player', { name: 'OldPlayerName', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player kills itself) should set the first seen date', async function () {
        await create('player', { name: 'Player', steamId: '11111111111111111', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player killed by environment) should create a new player', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.be.null
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player killed by environment) should not create a new player', async function () {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player killed by environment) should update the player name', async function () {
        let firstSeen = new Date
        await create('player', { name: 'OldPlayerName', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('(player killed by environment) should set the first seen date', async function () {
        await create('player', { name: 'Player', steamId: '11111111111111111', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().playerLogic.read({ '@orderBy': 'name' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].model).to.equal('sarge')
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })
    })

    describe('ServerVisit', function () {
      it('(player kills player) should create new server visits', async function () {
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(date)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(date)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].serverId).to.equal(1)
      })

      it('(player kills player) should not create new server visits', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 2, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].serverId).to.equal(1)
      })

      it('(player kills player) should inactivate server visits on different servers', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player2', steamId: '22222222222222222', model: 'sarge' })
        await create('player', { name: 'Player3', steamId: '33333333333333333', model: 'sarge' })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 3, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 3, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(6)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].connectDate).to.deep.equal(connectDate)
        expect(result.entities[3].disconnectDate).to.be.null
        expect(result.entities[4].active).to.equal(true)
        expect(result.entities[4].connectDate).to.deep.equal(date)
        expect(result.entities[4].disconnectDate).to.be.null
        expect(result.entities[5].active).to.equal(true)
        expect(result.entities[5].connectDate).to.deep.equal(date)
        expect(result.entities[5].disconnectDate).to.be.null
      })

      it('(player kills itself) should create a new server visit', async function () {
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(date)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })

      it('(player kills itself) should not create new server visits', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })

      it('(player kills itself) should inactivate server visits on different servers', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player3', steamId: '33333333333333333', model: 'sarge' })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 3, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 3, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].connectDate).to.deep.equal(date)
        expect(result.entities[3].disconnectDate).to.be.null
      })

      it('(player killed by environment) should create a new server visit', async function () {
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(date)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })

      it('(player killed by environment) should not create new server visits', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(connectDate).setSeconds(connectDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ /*'@orderBy': 'playerId'*/ }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })

      it('(player killed by environment) should inactivate server visits on different servers', async function () {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { name: 'Player1', steamId: '11111111111111111', model: 'sarge' })
        await create('player', { name: 'Player3', steamId: '33333333333333333', model: 'sarge' })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 3, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 3, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].connectDate).to.deep.equal(date)
        expect(result.entities[3].disconnectDate).to.be.null
      })
    })

    describe('Match', function () {
      it('(player kills player) should create a new match', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.be.null
        expect(result.entities[0].cvars.fraglimit).to.be.null
        expect(result.entities[0].cvars.g_instagib).to.be.null
        expect(result.entities[0].cvars.g_quadHog).to.be.null
        expect(result.entities[0].cvars.g_training).to.be.null
        expect(result.entities[0].cvars.mercylimit).to.be.null
        expect(result.entities[0].cvars.roundlimit).to.be.null
        expect(result.entities[0].cvars.scorelimit).to.be.null
        expect(result.entities[0].cvars.timelimit).to.be.null
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.be.null
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.be.null
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.be.null
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })

      it('(player kills player) should not create a new match', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let matchesResult = await Services.get().matchLogic.count({}, tx())

        expect(matchesResult.count).to.equal(1)
      })

      it('(player kills player) should not create a new match if the current match is warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills player) should inactivate matches on the same server if they are not the current active match', async function () {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })

      it('(player kills itself) should create a new match', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.be.null
        expect(result.entities[0].cvars.fraglimit).to.be.null
        expect(result.entities[0].cvars.g_instagib).to.be.null
        expect(result.entities[0].cvars.g_quadHog).to.be.null
        expect(result.entities[0].cvars.g_training).to.be.null
        expect(result.entities[0].cvars.mercylimit).to.be.null
        expect(result.entities[0].cvars.roundlimit).to.be.null
        expect(result.entities[0].cvars.scorelimit).to.be.null
        expect(result.entities[0].cvars.timelimit).to.be.null
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.be.null
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.be.null
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.be.null
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })

      it('(player kills itself) should not create a new match', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let matchesResult = await Services.get().matchLogic.count({}, tx())

        expect(matchesResult.count).to.equal(1)
      })

      it('(player kills itself) should not create a new match if the current match is warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills itself) should inactivate matches on the same server if they are not the current active match', async function () {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })

      it('(player killed by environment) should create a new match', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].aborted).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].cvars).to.be.not.null
        expect(result.entities[0].cvars.capturelimit).to.be.null
        expect(result.entities[0].cvars.fraglimit).to.be.null
        expect(result.entities[0].cvars.g_instagib).to.be.null
        expect(result.entities[0].cvars.g_quadHog).to.be.null
        expect(result.entities[0].cvars.g_training).to.be.null
        expect(result.entities[0].cvars.mercylimit).to.be.null
        expect(result.entities[0].cvars.roundlimit).to.be.null
        expect(result.entities[0].cvars.scorelimit).to.be.null
        expect(result.entities[0].cvars.timelimit).to.be.null
        expect(result.entities[0].exitMessage).to.be.null
        expect(result.entities[0].factoryId).to.be.null
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].guid).to.equal('111111111111111111111111111111111111')
        expect(result.entities[0].lastLeadChangeTime).to.be.null
        expect(result.entities[0].length).to.be.null
        expect(result.entities[0].mapId).to.be.null
        expect(result.entities[0].restarted).to.be.null
        expect(result.entities[0].score1).to.be.null
        expect(result.entities[0].score2).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.time)))
      })

      it('(player killed by environment) should not create a new match', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let matchesResult = await Services.get().matchLogic.count({}, tx())

        expect(matchesResult.count).to.equal(1)
      })

      it('(player killed by environment) should not create a new match if the current match is warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player killed by environment) should inactivate matches on the same server if they are not the current active match', async function () {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })
    })

    describe('MatchParticipation', function () {
      it('(player kills player) should create new new match participations', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(date)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
      })

      it('(player kills player) should create new match participations if the existing ones for that match are inactive', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: false, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: false, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(1)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[2].startDate).to.deep.equal(date)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].finishDate).to.be.null
        expect(result.entities[3].matchId).to.equal(1)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].startDate).to.deep.equal(date)
        expect(result.entities[3].statsId).to.be.null
        expect(result.entities[3].team).to.equal(TeamType.Blue)
      })

      it('(player kills player) should not create a new match participation', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
      })

      it('(player kills player) should not create a new match participation for warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills player) should inactivate any former match participations on the same server if the current game is another one', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Blue)
      })

      it('(player kills player) should inactivate any former match participation of the same player on any other servers', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 2, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
      })

      it('(player kills player) should create a new match participation if the player is in a different team than expected', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true })
        await create('server_visit', { serverId: 1, playerId: 2, active: true })
        await create('server_visit', { serverId: 2, playerId: 3, active: true })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(5)
        expect(result.entities[0].active).to.equal(false)
        // expect(result.entities[0].finishDate).to.be.not.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(false)
        // expect(result.entities[1].finishDate).to.be.not.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].finishDate).to.be.null
        expect(result.entities[3].matchId).to.equal(1)
        expect(result.entities[3].playerId).to.equal(1)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].startDate).to.deep.equal(date)
        expect(result.entities[3].statsId).to.be.null
        expect(result.entities[3].team).to.equal(TeamType.Blue)
        expect(result.entities[4].active).to.equal(true)
        expect(result.entities[4].finishDate).to.be.null
        expect(result.entities[4].matchId).to.equal(1)
        expect(result.entities[4].playerId).to.equal(2)
        expect(result.entities[4].roundId).to.be.null
        expect(result.entities[4].serverId).to.equal(1)
        expect(result.entities[4].startDate).to.deep.equal(date)
        expect(result.entities[4].statsId).to.be.null
        expect(result.entities[4].team).to.equal(TeamType.Red)
      })

      it('(player kills itself) should create a new match participation', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Free)
      })

      it('(player kills itself) should create new match participations if the existing ones for that match are inactive', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: false, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(date)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
      })

      it('(player kills itself) should not create a new match participation', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Free })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Free)
      })

      it('(player kills itself) should not create a new match participation for warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills itself) should inactivate any former match participations on the same server if the current game is another one', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "22222222222222222",
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Blue)
      })

      it('(player kills itself) should inactivate any former match participation of the same player on any other servers', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 2, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
      })

      it('(player kills itself) should create a new match participation if the player is in a different team than expected', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true })
        await create('server_visit', { serverId: 1, playerId: 2, active: true })
        await create('server_visit', { serverId: 2, playerId: 3, active: true })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        // expect(result.entities[0].finishDate).to.be.not.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        // expect(result.entities[1].finishDate).to.be.not.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].finishDate).to.be.null
        expect(result.entities[3].matchId).to.equal(1)
        expect(result.entities[3].playerId).to.equal(1)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].startDate).to.deep.equal(date)
        expect(result.entities[3].statsId).to.be.null
        expect(result.entities[3].team).to.equal(TeamType.Blue)
      })

      it('(player killed by environment) should create a new match participation', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(date)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Free)
      })

      it('(player killed by environment) should create new match participations if the existing ones for that match are inactive', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: false, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(date)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
      })

      it('(player killed by environment) should not create a new match participation', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Free })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Free)
      })

      it('(player killed by environment) should not create a new match participation for warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player killed by environment) should inactivate any former match participations on the same server if the current game is another one', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Blue)
      })

      it('(player killed by environment) should inactivate any former match participation of the same player on any other servers', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 2, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
      })

      it('(player killed by environment) should create a new match participation if the player is in a different team than expected', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true })
        await create('server_visit', { serverId: 1, playerId: 2, active: true })
        await create('server_visit', { serverId: 2, playerId: 3, active: true })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 2,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(false)
        // expect(result.entities[0].finishDate).to.be.not.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].statsId).to.be.null
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(true)
        // expect(result.entities[1].finishDate).to.be.not.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].statsId).to.be.null
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].statsId).to.be.null
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].finishDate).to.be.null
        expect(result.entities[3].matchId).to.equal(1)
        expect(result.entities[3].playerId).to.equal(1)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].startDate).to.deep.equal(date)
        expect(result.entities[3].statsId).to.be.null
        expect(result.entities[3].team).to.equal(TeamType.Blue)
      })
    })

    describe('Frag', function () {
      it('(player kills player) should not create a new frag', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 4, serverVisitId: 4, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills player) should not create a new frag for warmup', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 13,
              "ARMOR": 35,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 110,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": 230.1467590332031,
                "Y": -1341.296630859375,
                "Z": 217.125
              },
              "POWERUPS": null,
              "SPEED": 296.3669732147966,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 13.5406494140625,
                "Y": -15.7818603515625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 60,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 32,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 16,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": 391.0954284667969,
                "Y": -1384.875,
                "Z": 217.1261596679688
              },
              "POWERUPS": null,
              "SPEED": 260.6889759608181,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 5.2349853515625,
                "Y": 144.1900634765625,
                "Z": 0
              },
              "WEAPON": "PLASMA"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills itself) should create a new frag', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 4, serverVisitId: 4, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player3",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "33333333333333333",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player3",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "33333333333333333",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].cause).to.equal(CauseType.RocketSplash)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].environment).to.equal(false)
        expect(result.entities[0].killer).to.be.null
        expect(result.entities[0].matchId).to.equal(2)
        expect(result.entities[0].otherTeamAlive).to.be.null
        expect(result.entities[0].otherTeamDead).to.be.null
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].suicide).to.equal(true)
        expect(result.entities[0].teamAlive).to.be.null
        expect(result.entities[0].teamDead).to.be.null
        expect(result.entities[0].teamKill).to.equal(false)
        expect(result.entities[0].time).to.equal(27376)
        expect(result.entities[0].victim).to.be.not.null
        expect(result.entities[0].victim.airborne).to.equal(false)
        expect(result.entities[0].victim.ammo).to.equal(22)
        expect(result.entities[0].victim.armor).to.equal(0)
        expect(result.entities[0].victim.bot).to.equal(false)
        expect(result.entities[0].victim.botSkill).to.be.null
        expect(result.entities[0].victim.health).to.equal(-14)
        expect(result.entities[0].victim.holdable).to.be.null
        expect(result.entities[0].victim.matchParticipationId).to.equal(3)
        expect(result.entities[0].victim.playerId).to.equal(3)
        expect(result.entities[0].victim.position).to.be.not.null
        expect(result.entities[0].victim.position.x).to.equal(-728.875)
        expect(result.entities[0].victim.position.y).to.equal(-663.1250610351562)
        expect(result.entities[0].victim.position.z).to.equal(64.125)
        expect(result.entities[0].victim.powerUps).to.be.null
        expect(result.entities[0].victim.speed).to.equal(531.7309587563997)
        expect(result.entities[0].victim.team).to.equal(TeamType.Red)
        expect(result.entities[0].victim.view).to.be.not.null
        expect(result.entities[0].victim.view.x).to.equal(20.885009765625)
        expect(result.entities[0].victim.view.y).to.equal(136.043701171875)
        expect(result.entities[0].victim.view.z).to.equal(0)
        expect(result.entities[0].victim.weapon).to.equal(WeaponType.RocketLauncher)
        expect(result.entities[0].warmup).to.equal(false)
      })

      it('(player kills itself) should create a new frag for warmup', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })

        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": -14,
              "HOLDABLE": null,
              "NAME": "Player3",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "33333333333333333",
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "ROCKET_SPLASH",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27376,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 22,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player3",
              "POSITION": {
                "X": -728.875,
                "Y": -663.1250610351562,
                "Z": 64.125
              },
              "POWERUPS": null,
              "SPEED": 531.7309587563997,
              "STEAM_ID": "33333333333333333",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 20.885009765625,
                "Y": 136.043701171875,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].cause).to.equal(CauseType.RocketSplash)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].environment).to.equal(false)
        expect(result.entities[0].killer).to.be.null
        expect(result.entities[0].matchId).to.be.null
        expect(result.entities[0].otherTeamAlive).to.be.null
        expect(result.entities[0].otherTeamDead).to.be.null
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].suicide).to.equal(true)
        expect(result.entities[0].teamAlive).to.be.null
        expect(result.entities[0].teamDead).to.be.null
        expect(result.entities[0].teamKill).to.equal(false)
        expect(result.entities[0].time).to.equal(27376)
        expect(result.entities[0].victim).to.be.not.null
        expect(result.entities[0].victim.airborne).to.equal(false)
        expect(result.entities[0].victim.ammo).to.equal(22)
        expect(result.entities[0].victim.armor).to.equal(0)
        expect(result.entities[0].victim.bot).to.equal(false)
        expect(result.entities[0].victim.botSkill).to.be.null
        expect(result.entities[0].victim.health).to.equal(-14)
        expect(result.entities[0].victim.holdable).to.be.null
        expect(result.entities[0].victim.matchParticipationId).to.be.null
        expect(result.entities[0].victim.playerId).to.equal(3)
        expect(result.entities[0].victim.position).to.be.not.null
        expect(result.entities[0].victim.position.x).to.equal(-728.875)
        expect(result.entities[0].victim.position.y).to.equal(-663.1250610351562)
        expect(result.entities[0].victim.position.z).to.equal(64.125)
        expect(result.entities[0].victim.powerUps).to.be.null
        expect(result.entities[0].victim.speed).to.equal(531.7309587563997)
        expect(result.entities[0].victim.team).to.equal(TeamType.Red)
        expect(result.entities[0].victim.view).to.be.not.null
        expect(result.entities[0].victim.view.x).to.equal(20.885009765625)
        expect(result.entities[0].victim.view.y).to.equal(136.043701171875)
        expect(result.entities[0].victim.view.z).to.equal(0)
        expect(result.entities[0].victim.weapon).to.equal(WeaponType.RocketLauncher)
        expect(result.entities[0].warmup).to.equal(true)
      })

      it('(player kills itself) should not create a new frag if the reason is switching the team', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 0,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": -366.9644470214844,
                "Y": -487.6138610839844,
                "Z": 416.125
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.5635986328125,
                "Y": -9.8931884765625,
                "Z": 0
              },
              "WEAPON": "OTHER_WEAPON"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "SWITCHTEAM",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27726,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 24,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 100,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": -366.9644470214844,
                "Y": -487.6138610839844,
                "Z": 416.125
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.5635986328125,
                "Y": -9.8931884765625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player kills itself) should not create a new frag if the reason is switching the team in warmup', async function () {
        let qlEvent = {
          "DATA": {
            "KILLER": {
              "AIRBORNE": false,
              "AMMO": 0,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 0,
              "HOLDABLE": null,
              "NAME": "Player1",
              "POSITION": {
                "X": -366.9644470214844,
                "Y": -487.6138610839844,
                "Z": 416.125
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "11111111111111111",
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.5635986328125,
                "Y": -9.8931884765625,
                "Z": 0
              },
              "WEAPON": "OTHER_WEAPON"
            },
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MOD": "SWITCHTEAM",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": true,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 27726,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 24,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 100,
              "HOLDABLE": null,
              "NAME": "Player2",
              "POSITION": {
                "X": -366.9644470214844,
                "Y": -487.6138610839844,
                "Z": 416.125
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "22222222222222222",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 0,
              "VIEW": {
                "X": 9.5635986328125,
                "Y": -9.8931884765625,
                "Z": 0
              },
              "WEAPON": "ROCKET"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.count({}, tx())

        expect(result.count).to.equal(0)
      })

      it('(player killed by environment) should create a new frag', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match', { serverId: 2, guid: '222222222222222222222222222222222222', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 2, playerId: 4, serverVisitId: 4, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "33333333333333333",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": false
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].cause).to.equal(CauseType.Lava)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].environment).to.equal(true)
        expect(result.entities[0].killer).to.be.null
        expect(result.entities[0].matchId).to.equal(2)
        expect(result.entities[0].otherTeamAlive).to.be.null
        expect(result.entities[0].otherTeamDead).to.be.null
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].suicide).to.equal(false)
        expect(result.entities[0].teamAlive).to.be.null
        expect(result.entities[0].teamDead).to.be.null
        expect(result.entities[0].teamKill).to.equal(false)
        expect(result.entities[0].time).to.equal(13)
        expect(result.entities[0].victim).to.be.not.null
        expect(result.entities[0].victim.airborne).to.equal(false)
        expect(result.entities[0].victim.ammo).to.equal(150)
        expect(result.entities[0].victim.armor).to.equal(0)
        expect(result.entities[0].victim.bot).to.equal(false)
        expect(result.entities[0].victim.botSkill).to.be.null
        expect(result.entities[0].victim.health).to.equal(25)
        expect(result.entities[0].victim.holdable).to.be.null
        expect(result.entities[0].victim.matchParticipationId).to.equal(3)
        expect(result.entities[0].victim.playerId).to.equal(3)
        expect(result.entities[0].victim.position).to.be.not.null
        expect(result.entities[0].victim.position.x).to.equal(311.6126098632812)
        expect(result.entities[0].victim.position.y).to.equal(-344.8745727539062)
        expect(result.entities[0].victim.position.z).to.equal(-143.875)
        expect(result.entities[0].victim.powerUps).to.be.null
        expect(result.entities[0].victim.speed).to.equal(0)
        expect(result.entities[0].victim.team).to.equal(TeamType.Red)
        expect(result.entities[0].victim.view).to.be.not.null
        expect(result.entities[0].victim.view.x).to.equal(9.920654296875)
        expect(result.entities[0].victim.view.y).to.equal(88.4014892578125)
        expect(result.entities[0].victim.view.z).to.equal(0)
        expect(result.entities[0].victim.weapon).to.equal(WeaponType.MachineGun)
        expect(result.entities[0].warmup).to.equal(false)
      })

      it('(player killed by environment) should create a new frag for warmup', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('player', { steamId: '44444444444444444' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 2, playerId: 2 })
        await create('server_visit', { serverId: 2, playerId: 3 })
        await create('server_visit', { serverId: 2, playerId: 4 })

        let qlEvent = {
          "DATA": {
            "KILLER": null,
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MOD": "LAVA",
            "OTHER_TEAM_ALIVE": null,
            "OTHER_TEAM_DEAD": null,
            "ROUND": null,
            "SUICIDE": false,
            "TEAMKILL": false,
            "TEAM_ALIVE": null,
            "TEAM_DEAD": null,
            "TIME": 13,
            "VICTIM": {
              "AIRBORNE": false,
              "AMMO": 150,
              "ARMOR": 0,
              "BOT": false,
              "BOT_SKILL": null,
              "HEALTH": 25,
              "HOLDABLE": null,
              "NAME": "Player",
              "POSITION": {
                "X": 311.6126098632812,
                "Y": -344.8745727539062,
                "Z": -143.875
              },
              "POWERUPS": null,
              "SPEED": 0,
              "STEAM_ID": "33333333333333333",
              "STREAK": 0,
              "SUBMERGED": false,
              "TEAM": 1,
              "VIEW": {
                "X": 9.920654296875,
                "Y": 88.4014892578125,
                "Z": 0
              },
              "WEAPON": "MACHINEGUN"
            },
            "WARMUP": true
          },
          "TYPE": "PLAYER_DEATH"
        }

        let date = new Date
        let event = PlayerDeathEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27961, event, tx(), date)

        let result = await Services.get().fragLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].cause).to.equal(CauseType.Lava)
        expect(result.entities[0].date).to.deep.equal(date)
        expect(result.entities[0].environment).to.equal(true)
        expect(result.entities[0].killer).to.be.null
        expect(result.entities[0].matchId).to.be.null
        expect(result.entities[0].otherTeamAlive).to.be.null
        expect(result.entities[0].otherTeamDead).to.be.null
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].suicide).to.equal(false)
        expect(result.entities[0].teamAlive).to.be.null
        expect(result.entities[0].teamDead).to.be.null
        expect(result.entities[0].teamKill).to.equal(false)
        expect(result.entities[0].time).to.equal(13)
        expect(result.entities[0].victim).to.be.not.null
        expect(result.entities[0].victim.airborne).to.equal(false)
        expect(result.entities[0].victim.ammo).to.equal(150)
        expect(result.entities[0].victim.armor).to.equal(0)
        expect(result.entities[0].victim.bot).to.equal(false)
        expect(result.entities[0].victim.botSkill).to.be.null
        expect(result.entities[0].victim.health).to.equal(25)
        expect(result.entities[0].victim.holdable).to.be.null
        expect(result.entities[0].victim.matchParticipationId).to.be.null
        expect(result.entities[0].victim.playerId).to.equal(3)
        expect(result.entities[0].victim.position).to.be.not.null
        expect(result.entities[0].victim.position.x).to.equal(311.6126098632812)
        expect(result.entities[0].victim.position.y).to.equal(-344.8745727539062)
        expect(result.entities[0].victim.position.z).to.equal(-143.875)
        expect(result.entities[0].victim.powerUps).to.be.null
        expect(result.entities[0].victim.speed).to.equal(0)
        expect(result.entities[0].victim.team).to.equal(TeamType.Red)
        expect(result.entities[0].victim.view).to.be.not.null
        expect(result.entities[0].victim.view.x).to.equal(9.920654296875)
        expect(result.entities[0].victim.view.y).to.equal(88.4014892578125)
        expect(result.entities[0].victim.view.z).to.equal(0)
        expect(result.entities[0].victim.weapon).to.equal(WeaponType.MachineGun)
        expect(result.entities[0].warmup).to.equal(true)
      })
    })
  })
})