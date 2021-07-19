import { expect } from 'chai'
import 'mocha'
import { PlayerStatsEvent } from 'ql-stats-model'
import Services from '../../../src/Services'
import { create, tx } from '../../tools'

describe('service/QlStatsIntegrator.ts', function () {
  describe('PLAYER_STATS', function () {
    describe('Server', function () {
      it('should create a new server', async function () {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should not create a new server', async function () {
        let firstSeen = new Date
        await create('server', { ip: '127.0.0.1', port: 27960, firstSeen: firstSeen })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().serverLogic.read({}, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].ip).to.equal('127.0.0.1')
        expect(result.entities[0].port).to.equal(27960)
        expect(result.entities[0].title).to.be.null
      })

      it('should set the first seen date', async function () {
        await create('server', { ip: '127.0.0.1', port: 27960 })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
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
      it('should create a new player', async function() {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
  
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.isValue()).to.be.true
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
      })

      it('should not create a new player', async function() {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.be.null
      })  

      it('should update a players name', async function() {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'sarge' })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })
  
      it('should update a players model', async function() {
        let firstSeen = new Date
        await create('player', { name: 'Player', steamId: '11111111111111111', firstSeen: firstSeen, model: 'keel' })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
  
        let date = new Date(new Date(firstSeen).setSeconds(firstSeen.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(firstSeen)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })
  
      it('should update a players first seen date', async function() {
        await create('player', { name: 'Player', steamId: '11111111111111111', model: 'sarge' })
  
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
  
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
  
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
    
        let result = await Services.get().playerLogic.read({}, tx())
    
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].firstSeen).to.deep.equal(date)
        expect(result.entities[0].name).to.equal('Player')
        expect(result.entities[0].steamId).to.equal('11111111111111111')
        expect(result.entities[0].model).to.equal('sarge')
      })
    })

    describe('ServerVisit', function () {
      it('should create a new server visit', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1, active: false })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].connectDate).to.be.null
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].connectDate).to.deep.equal(date)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(true)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].serverId).to.equal(1)
      })

      it('should not create a new server visit', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({}, tx())
  
        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
      })  

      it('should inactivate any server visit of the same player on any other server', async function() {
        let connectDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 1, playerId: 2, active: true, connectDate: connectDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: connectDate })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().serverVisitLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].connectDate).to.deep.equal(connectDate)
        expect(result.entities[0].disconnectDate).to.be.null
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[1].connectDate).to.deep.equal(connectDate)
        expect(result.entities[1].disconnectDate).to.be.null
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].playerId).to.equal(1)
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[2].connectDate).to.deep.equal(connectDate)
        expect(result.entities[2].disconnectDate).to.be.null
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].playerId).to.equal(2)
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[3].connectDate).to.deep.equal(connectDate)
        expect(result.entities[3].disconnectDate).to.be.null
        expect(result.entities[3].active).to.equal(true)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].serverId).to.equal(2)
      })
    })

    describe('Match', function () {
      it('should create a new match', async function() {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
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
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
      })  

      it('should not create a new match', async function() {
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let matchesResult = await Services.get().matchLogic.count({}, tx())
  
        expect(matchesResult.count).to.equal(1)
      })

      it('should not create a new match if the current match is warmup', async function() {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.count({}, tx())
  
        expect(result.count).to.equal(0)
      })      

      it('should inactivate matches on the same server if they are not the current active match', async function() {
        await create('match', { active: true, guid: '111111111111111111111111111111111111', serverId: 1 })
        await create('match', { active: true, guid: '222222222222222222222222222222222222', serverId: 2 })
        
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 0,
            "DAMAGE": {
              "DEALT": 0,
              "TAKEN": 0
            },
            "DEATHS": 0,
            "HOLY_SHITS": 0,
            "KILLS": 0,
            "LOSE": 0,
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MAX_STREAK": 0,
            "MEDALS": {
              "ACCURACY": 0,
              "ASSISTS": 0,
              "CAPTURES": 0,
              "COMBOKILL": 0,
              "DEFENDS": 0,
              "EXCELLENT": 0,
              "FIRSTFRAG": 0,
              "HEADSHOT": 0,
              "HUMILIATION": 0,
              "IMPRESSIVE": 0,
              "MIDAIR": 0,
              "PERFECT": 0,
              "PERFORATED": 0,
              "QUADGOD": 0,
              "RAMPAGE": 0,
              "REVENGE": 0
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 0,
            "PICKUPS": {
              "AMMO": 0,
              "ARMOR": 0,
              "ARMOR_REGEN": 0,
              "BATTLESUIT": 0,
              "DOUBLER": 0,
              "FLIGHT": 0,
              "GREEN_ARMOR": 0,
              "GUARD": 0,
              "HASTE": 0,
              "HEALTH": 0,
              "INVIS": 0,
              "INVULNERABILITY": 0,
              "KAMIKAZE": 0,
              "MEDKIT": 0,
              "MEGA_HEALTH": 0,
              "OTHER_HOLDABLE": 0,
              "OTHER_POWERUP": 0,
              "PORTAL": 0,
              "QUAD": 0,
              "RED_ARMOR": 0,
              "REGEN": 0,
              "SCOUT": 0,
              "TELEPORTER": 0,
              "YELLOW_ARMOR": 0
            },
            "PLAY_TIME": 8,
            "QUIT": 1,
            "RANK": -1,
            "SCORE": 0,
            "STEAM_ID": "11111111111111111",
            "TEAM": 2,
            "TEAM_JOIN_TIME": 0,
            "TEAM_RANK": -1,
            "TIED_RANK": 1,
            "TIED_TEAM_RANK": 1,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "CHAINGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GAUNTLET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "GRENADE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "HMG": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "LIGHTNING": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "MACHINEGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 8
              },
              "NAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "OTHER_WEAPON": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PLASMA": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "PROXMINE": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "RAILGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "ROCKET": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              },
              "SHOTGUN": {
                "D": 0,
                "DG": 0,
                "DR": 0,
                "H": 0,
                "K": 0,
                "P": 0,
                "S": 0,
                "T": 0
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }
    
        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)
  
        let result = await Services.get().matchLogic.read({ '@orderBy': 'id' }, tx())
  
        expect(result.entities.length).to.equal(2)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[1].active).to.equal(true)
      })
    })

    describe('MatchParticipation', function () {

    })
  })
})