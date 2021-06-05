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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
        expect(result.entities[0].name).to.equal('garz')
        expect(result.entities[0].steamId).to.equal('76561198170654797')
      })

      it('should not create a new player', async function() {
        let firstSeen = new Date
        await create('player', { name: 'garz', steamId: '76561198170654797', firstSeen: firstSeen })
  
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
        expect(result.entities[0].name).to.equal('garz')
        expect(result.entities[0].steamId).to.equal('76561198170654797')
        expect(result.entities[0].model).to.be.null
      })  

      it('should update a players name', async function() {
        let firstSeen = new Date
        await create('player', { name: 'garz', steamId: '76561198170654797', firstSeen: firstSeen, model: 'sarge' })
  
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
        expect(result.entities[0].name).to.equal('garz')
        expect(result.entities[0].steamId).to.equal('76561198170654797')
        expect(result.entities[0].model).to.equal('sarge')
      })
  
      it('should update a players model', async function() {
        let firstSeen = new Date
        await create('player', { name: 'garz', steamId: '76561198170654797', firstSeen: firstSeen, model: 'keel' })
  
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
        expect(result.entities[0].name).to.equal('garz')
        expect(result.entities[0].steamId).to.equal('76561198170654797')
        expect(result.entities[0].model).to.equal('sarge')
      })
  
      it('should update a players first seen date', async function() {
        await create('player', { name: 'garz', steamId: '76561198170654797', model: 'sarge' })
  
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
            "MATCH_GUID": "1a8bd0a8-f819-4245-b873-4235ffa1607e",
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
            "NAME": "garz",
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
            "STEAM_ID": "76561198170654797",
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
        expect(result.entities[0].name).to.equal('garz')
        expect(result.entities[0].steamId).to.equal('76561198170654797')
        expect(result.entities[0].model).to.equal('sarge')
      })
    })

    describe('ServerVisit', function () {

    })

    describe('Match', function () {

    })

    describe('MatchParticipation', function () {

    })

    describe('Frag', function () {

    })
  })
})