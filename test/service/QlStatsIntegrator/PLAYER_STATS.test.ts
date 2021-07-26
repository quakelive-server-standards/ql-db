import { expect } from 'chai'
import 'mocha'
import { PlayerStatsEvent } from 'ql-stats-model'
import { TeamType } from '../../../src/domain/enums/TeamType'
import { ResultType } from '../../../src/domain/matchParticipation/MatchParticipation'
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
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true, startDate: startDate })

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
    
        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
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
        expect(result.entities[0].startDate).to.deep.equal(startDate)
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
      it('should create a new match participation', async function () {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "11111111111111111",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].id).to.equal(1) 
        expect(result.entities[0].aborted).to.equal(false)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].blueFlagPickups).to.equal(1)
        expect(result.entities[0].damageDealt).to.equal(2)
        expect(result.entities[0].damageTaken).to.equal(3)
        expect(result.entities[0].deathCount).to.equal(4)
        expect(result.entities[0].finishDate).to.deep.equal(date)
        expect(result.entities[0].holyShits).to.equal(5)
        expect(result.entities[0].killCount).to.equal(6)
        expect(result.entities[0].matchId).to.equal(1)
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
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].playTime).to.equal(49)
        expect(result.entities[0].rank).to.equal(50)
        expect(result.entities[0].redFlagPickups).to.equal(51)
        expect(result.entities[0].result).to.equal(ResultType.Quit)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].score).to.equal(52)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].serverVisitId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[0].teamJoinTime).to.equal(53)
        expect(result.entities[0].teamRank).to.equal(54)
        expect(result.entities[0].tiedRank).to.equal(55)
        expect(result.entities[0].tiedTeamRank).to.equal(56)
        expect(result.entities[0].warmup).to.equal(false)
        expect(result.entities[0].bfg.damageGiven).to.equal(58)
        expect(result.entities[0].bfg.damageReceived).to.equal(59)
        expect(result.entities[0].bfg.deaths).to.equal(57)
        expect(result.entities[0].bfg.hits).to.equal(60)
        expect(result.entities[0].bfg.kills).to.equal(61)
        expect(result.entities[0].bfg.p).to.equal(62)
        expect(result.entities[0].bfg.shots).to.equal(63)
        expect(result.entities[0].bfg.t).to.equal(64)
        expect(result.entities[0].chainGun.damageGiven).to.equal(66)
        expect(result.entities[0].chainGun.damageReceived).to.equal(67)
        expect(result.entities[0].chainGun.deaths).to.equal(65)
        expect(result.entities[0].chainGun.hits).to.equal(68)
        expect(result.entities[0].chainGun.kills).to.equal(69)
        expect(result.entities[0].chainGun.p).to.equal(70)
        expect(result.entities[0].chainGun.shots).to.equal(71)
        expect(result.entities[0].chainGun.t).to.equal(72)
        expect(result.entities[0].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[0].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[0].gauntlet.deaths).to.equal(73)
        expect(result.entities[0].gauntlet.hits).to.equal(76)
        expect(result.entities[0].gauntlet.kills).to.equal(77)
        expect(result.entities[0].gauntlet.p).to.equal(78)
        expect(result.entities[0].gauntlet.shots).to.equal(79)
        expect(result.entities[0].gauntlet.t).to.equal(80)
        expect(result.entities[0].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[0].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[0].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[0].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[0].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[0].grenadeLauncher.p).to.equal(86)
        expect(result.entities[0].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[0].grenadeLauncher.t).to.equal(88)
        expect(result.entities[0].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[0].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[0].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[0].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[0].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[0].heavyMachineGun.p).to.equal(94)
        expect(result.entities[0].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[0].heavyMachineGun.t).to.equal(96)
        expect(result.entities[0].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[0].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[0].lightningGun.deaths).to.equal(97)
        expect(result.entities[0].lightningGun.hits).to.equal(100)
        expect(result.entities[0].lightningGun.kills).to.equal(101)
        expect(result.entities[0].lightningGun.p).to.equal(102)
        expect(result.entities[0].lightningGun.shots).to.equal(103)
        expect(result.entities[0].lightningGun.t).to.equal(104)
        expect(result.entities[0].machineGun.damageGiven).to.equal(106)
        expect(result.entities[0].machineGun.damageReceived).to.equal(107)
        expect(result.entities[0].machineGun.deaths).to.equal(105)
        expect(result.entities[0].machineGun.hits).to.equal(108)
        expect(result.entities[0].machineGun.kills).to.equal(109)
        expect(result.entities[0].machineGun.p).to.equal(110)
        expect(result.entities[0].machineGun.shots).to.equal(111)
        expect(result.entities[0].machineGun.t).to.equal(112)
        expect(result.entities[0].nailGun.damageGiven).to.equal(114)
        expect(result.entities[0].nailGun.damageReceived).to.equal(115)
        expect(result.entities[0].nailGun.deaths).to.equal(113)
        expect(result.entities[0].nailGun.hits).to.equal(116)
        expect(result.entities[0].nailGun.kills).to.equal(117)
        expect(result.entities[0].nailGun.p).to.equal(118)
        expect(result.entities[0].nailGun.shots).to.equal(119)
        expect(result.entities[0].nailGun.t).to.equal(120)
        expect(result.entities[0].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[0].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[0].otherWeapon.deaths).to.equal(121)
        expect(result.entities[0].otherWeapon.hits).to.equal(124)
        expect(result.entities[0].otherWeapon.kills).to.equal(125)
        expect(result.entities[0].otherWeapon.p).to.equal(126)
        expect(result.entities[0].otherWeapon.shots).to.equal(127)
        expect(result.entities[0].otherWeapon.t).to.equal(128)
        expect(result.entities[0].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[0].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[0].plasmaGun.deaths).to.equal(129)
        expect(result.entities[0].plasmaGun.hits).to.equal(132)
        expect(result.entities[0].plasmaGun.kills).to.equal(133)
        expect(result.entities[0].plasmaGun.p).to.equal(134)
        expect(result.entities[0].plasmaGun.shots).to.equal(135)
        expect(result.entities[0].plasmaGun.t).to.equal(136)
        expect(result.entities[0].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[0].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[0].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[0].proximityLauncher.hits).to.equal(140)
        expect(result.entities[0].proximityLauncher.kills).to.equal(141)
        expect(result.entities[0].proximityLauncher.p).to.equal(142)
        expect(result.entities[0].proximityLauncher.shots).to.equal(143)
        expect(result.entities[0].proximityLauncher.t).to.equal(144)
        expect(result.entities[0].railgun.damageGiven).to.equal(146)
        expect(result.entities[0].railgun.damageReceived).to.equal(147)
        expect(result.entities[0].railgun.deaths).to.equal(145)
        expect(result.entities[0].railgun.hits).to.equal(148)
        expect(result.entities[0].railgun.kills).to.equal(149)
        expect(result.entities[0].railgun.p).to.equal(150)
        expect(result.entities[0].railgun.shots).to.equal(151)
        expect(result.entities[0].railgun.t).to.equal(152)
        expect(result.entities[0].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[0].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[0].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[0].rocketLauncher.hits).to.equal(156)
        expect(result.entities[0].rocketLauncher.kills).to.equal(157)
        expect(result.entities[0].rocketLauncher.p).to.equal(158)
        expect(result.entities[0].rocketLauncher.shots).to.equal(159)
        expect(result.entities[0].rocketLauncher.t).to.equal(160)
        expect(result.entities[0].shotgun.damageGiven).to.equal(162)
        expect(result.entities[0].shotgun.damageReceived).to.equal(163)
        expect(result.entities[0].shotgun.deaths).to.equal(161)
        expect(result.entities[0].shotgun.hits).to.equal(164)
        expect(result.entities[0].shotgun.kills).to.equal(165)
        expect(result.entities[0].shotgun.p).to.equal(166)
        expect(result.entities[0].shotgun.shots).to.equal(167)
        expect(result.entities[0].shotgun.t).to.equal(168)
      })

      it('should create a new match participation if the existing one for that match is inactive', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1, active: true })
        await create('server_visit', { serverId: 1, playerId: 2, active: true })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: false, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: false, startDate: startDate, team: TeamType.Blue })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "22222222222222222",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(3)
        expect(result.entities[0].id).to.equal(1)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].serverVisitId).to.equal(1)
        expect(result.entities[1].id).to.equal(2)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].serverVisitId).to.equal(2)
        expect(result.entities[2].id).to.equal(3)
        expect(result.entities[2].aborted).to.equal(false)
        expect(result.entities[2].active).to.equal(false)
        expect(result.entities[2].blueFlagPickups).to.equal(1)
        expect(result.entities[2].damageDealt).to.equal(2)
        expect(result.entities[2].damageTaken).to.equal(3)
        expect(result.entities[2].deathCount).to.equal(4)
        expect(result.entities[2].finishDate).to.deep.equal(date)
        expect(result.entities[2].holyShits).to.equal(5)
        expect(result.entities[2].killCount).to.equal(6)
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].maxStreak).to.equal(7)
        expect(result.entities[2].medalStats.accuracy).to.equal(8)
        expect(result.entities[2].medalStats.assists).to.equal(9)
        expect(result.entities[2].medalStats.captures).to.equal(10)
        expect(result.entities[2].medalStats.comboKill).to.equal(11)
        expect(result.entities[2].medalStats.defends).to.equal(12)
        expect(result.entities[2].medalStats.excellent).to.equal(13)
        expect(result.entities[2].medalStats.firstFrag).to.equal(14)
        expect(result.entities[2].medalStats.headshot).to.equal(15)
        expect(result.entities[2].medalStats.humiliation).to.equal(16)
        expect(result.entities[2].medalStats.impressive).to.equal(17)
        expect(result.entities[2].medalStats.midair).to.equal(18)
        expect(result.entities[2].medalStats.perfect).to.equal(19)
        expect(result.entities[2].medalStats.perforated).to.equal(20)
        expect(result.entities[2].medalStats.quadGod).to.equal(21)
        expect(result.entities[2].medalStats.rampage).to.equal(22)
        expect(result.entities[2].medalStats.revenge).to.equal(23)
        expect(result.entities[2].neutralFlagPickups).to.equal(24)
        expect(result.entities[2].pickupStats.ammo).to.equal(25)
        expect(result.entities[2].pickupStats.armor).to.equal(26)
        expect(result.entities[2].pickupStats.armorRegeneration).to.equal(27)
        expect(result.entities[2].pickupStats.battleSuit).to.equal(28)
        expect(result.entities[2].pickupStats.doubler).to.equal(29)
        expect(result.entities[2].pickupStats.flight).to.equal(30)
        expect(result.entities[2].pickupStats.greenArmor).to.equal(31)
        expect(result.entities[2].pickupStats.guard).to.equal(32)
        expect(result.entities[2].pickupStats.haste).to.equal(33)
        expect(result.entities[2].pickupStats.health).to.equal(34)
        expect(result.entities[2].pickupStats.invisibility).to.equal(35)
        expect(result.entities[2].pickupStats.invulnerability).to.equal(36)
        expect(result.entities[2].pickupStats.kamikaze).to.equal(37)
        expect(result.entities[2].pickupStats.medkit).to.equal(38)
        expect(result.entities[2].pickupStats.megaHealth).to.equal(39)
        expect(result.entities[2].pickupStats.otherHoldable).to.equal(40)
        expect(result.entities[2].pickupStats.otherPowerUp).to.equal(41)
        expect(result.entities[2].pickupStats.portal).to.equal(42)
        expect(result.entities[2].pickupStats.quadDamage).to.equal(43)
        expect(result.entities[2].pickupStats.redArmor).to.equal(44)
        expect(result.entities[2].pickupStats.regeneration).to.equal(45)
        expect(result.entities[2].pickupStats.scout).to.equal(46)
        expect(result.entities[2].pickupStats.teleporter).to.equal(47)
        expect(result.entities[2].pickupStats.yellowArmor).to.equal(48)
        expect(result.entities[2].playerId).to.equal(2)
        expect(result.entities[2].playTime).to.equal(49)
        expect(result.entities[2].rank).to.equal(50)
        expect(result.entities[2].redFlagPickups).to.equal(51)
        expect(result.entities[2].result).to.equal(ResultType.Quit)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].score).to.equal(52)
        expect(result.entities[2].serverId).to.equal(1)
        expect(result.entities[2].serverVisitId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[2].teamJoinTime).to.equal(53)
        expect(result.entities[2].teamRank).to.equal(54)
        expect(result.entities[2].tiedRank).to.equal(55)
        expect(result.entities[2].tiedTeamRank).to.equal(56)
        expect(result.entities[2].warmup).to.equal(false)
        expect(result.entities[2].bfg.damageGiven).to.equal(58)
        expect(result.entities[2].bfg.damageReceived).to.equal(59)
        expect(result.entities[2].bfg.deaths).to.equal(57)
        expect(result.entities[2].bfg.hits).to.equal(60)
        expect(result.entities[2].bfg.kills).to.equal(61)
        expect(result.entities[2].bfg.p).to.equal(62)
        expect(result.entities[2].bfg.shots).to.equal(63)
        expect(result.entities[2].bfg.t).to.equal(64)
        expect(result.entities[2].chainGun.damageGiven).to.equal(66)
        expect(result.entities[2].chainGun.damageReceived).to.equal(67)
        expect(result.entities[2].chainGun.deaths).to.equal(65)
        expect(result.entities[2].chainGun.hits).to.equal(68)
        expect(result.entities[2].chainGun.kills).to.equal(69)
        expect(result.entities[2].chainGun.p).to.equal(70)
        expect(result.entities[2].chainGun.shots).to.equal(71)
        expect(result.entities[2].chainGun.t).to.equal(72)
        expect(result.entities[2].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[2].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[2].gauntlet.deaths).to.equal(73)
        expect(result.entities[2].gauntlet.hits).to.equal(76)
        expect(result.entities[2].gauntlet.kills).to.equal(77)
        expect(result.entities[2].gauntlet.p).to.equal(78)
        expect(result.entities[2].gauntlet.shots).to.equal(79)
        expect(result.entities[2].gauntlet.t).to.equal(80)
        expect(result.entities[2].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[2].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[2].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[2].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[2].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[2].grenadeLauncher.p).to.equal(86)
        expect(result.entities[2].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[2].grenadeLauncher.t).to.equal(88)
        expect(result.entities[2].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[2].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[2].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[2].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[2].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[2].heavyMachineGun.p).to.equal(94)
        expect(result.entities[2].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[2].heavyMachineGun.t).to.equal(96)
        expect(result.entities[2].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[2].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[2].lightningGun.deaths).to.equal(97)
        expect(result.entities[2].lightningGun.hits).to.equal(100)
        expect(result.entities[2].lightningGun.kills).to.equal(101)
        expect(result.entities[2].lightningGun.p).to.equal(102)
        expect(result.entities[2].lightningGun.shots).to.equal(103)
        expect(result.entities[2].lightningGun.t).to.equal(104)
        expect(result.entities[2].machineGun.damageGiven).to.equal(106)
        expect(result.entities[2].machineGun.damageReceived).to.equal(107)
        expect(result.entities[2].machineGun.deaths).to.equal(105)
        expect(result.entities[2].machineGun.hits).to.equal(108)
        expect(result.entities[2].machineGun.kills).to.equal(109)
        expect(result.entities[2].machineGun.p).to.equal(110)
        expect(result.entities[2].machineGun.shots).to.equal(111)
        expect(result.entities[2].machineGun.t).to.equal(112)
        expect(result.entities[2].nailGun.damageGiven).to.equal(114)
        expect(result.entities[2].nailGun.damageReceived).to.equal(115)
        expect(result.entities[2].nailGun.deaths).to.equal(113)
        expect(result.entities[2].nailGun.hits).to.equal(116)
        expect(result.entities[2].nailGun.kills).to.equal(117)
        expect(result.entities[2].nailGun.p).to.equal(118)
        expect(result.entities[2].nailGun.shots).to.equal(119)
        expect(result.entities[2].nailGun.t).to.equal(120)
        expect(result.entities[2].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[2].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[2].otherWeapon.deaths).to.equal(121)
        expect(result.entities[2].otherWeapon.hits).to.equal(124)
        expect(result.entities[2].otherWeapon.kills).to.equal(125)
        expect(result.entities[2].otherWeapon.p).to.equal(126)
        expect(result.entities[2].otherWeapon.shots).to.equal(127)
        expect(result.entities[2].otherWeapon.t).to.equal(128)
        expect(result.entities[2].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[2].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[2].plasmaGun.deaths).to.equal(129)
        expect(result.entities[2].plasmaGun.hits).to.equal(132)
        expect(result.entities[2].plasmaGun.kills).to.equal(133)
        expect(result.entities[2].plasmaGun.p).to.equal(134)
        expect(result.entities[2].plasmaGun.shots).to.equal(135)
        expect(result.entities[2].plasmaGun.t).to.equal(136)
        expect(result.entities[2].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[2].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[2].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[2].proximityLauncher.hits).to.equal(140)
        expect(result.entities[2].proximityLauncher.kills).to.equal(141)
        expect(result.entities[2].proximityLauncher.p).to.equal(142)
        expect(result.entities[2].proximityLauncher.shots).to.equal(143)
        expect(result.entities[2].proximityLauncher.t).to.equal(144)
        expect(result.entities[2].railgun.damageGiven).to.equal(146)
        expect(result.entities[2].railgun.damageReceived).to.equal(147)
        expect(result.entities[2].railgun.deaths).to.equal(145)
        expect(result.entities[2].railgun.hits).to.equal(148)
        expect(result.entities[2].railgun.kills).to.equal(149)
        expect(result.entities[2].railgun.p).to.equal(150)
        expect(result.entities[2].railgun.shots).to.equal(151)
        expect(result.entities[2].railgun.t).to.equal(152)
        expect(result.entities[2].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[2].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[2].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[2].rocketLauncher.hits).to.equal(156)
        expect(result.entities[2].rocketLauncher.kills).to.equal(157)
        expect(result.entities[2].rocketLauncher.p).to.equal(158)
        expect(result.entities[2].rocketLauncher.shots).to.equal(159)
        expect(result.entities[2].rocketLauncher.t).to.equal(160)
        expect(result.entities[2].shotgun.damageGiven).to.equal(162)
        expect(result.entities[2].shotgun.damageReceived).to.equal(163)
        expect(result.entities[2].shotgun.deaths).to.equal(161)
        expect(result.entities[2].shotgun.hits).to.equal(164)
        expect(result.entities[2].shotgun.kills).to.equal(165)
        expect(result.entities[2].shotgun.p).to.equal(166)
        expect(result.entities[2].shotgun.shots).to.equal(167)
        expect(result.entities[2].shotgun.t).to.equal(168)
      })

      it('should not create a new match participation', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('server_visit', { serverId: 1, playerId: 1 })
        await create('server_visit', { serverId: 1, playerId: 2 })
        await create('match', { serverId: 1, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "22222222222222222",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
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
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].id).to.equal(2)
        expect(result.entities[1].aborted).to.equal(false)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].blueFlagPickups).to.equal(1)
        expect(result.entities[1].damageDealt).to.equal(2)
        expect(result.entities[1].damageTaken).to.equal(3)
        expect(result.entities[1].deathCount).to.equal(4)
        expect(result.entities[1].finishDate).to.deep.equal(date)
        expect(result.entities[1].holyShits).to.equal(5)
        expect(result.entities[1].killCount).to.equal(6)
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].maxStreak).to.equal(7)
        expect(result.entities[1].medalStats.accuracy).to.equal(8)
        expect(result.entities[1].medalStats.assists).to.equal(9)
        expect(result.entities[1].medalStats.captures).to.equal(10)
        expect(result.entities[1].medalStats.comboKill).to.equal(11)
        expect(result.entities[1].medalStats.defends).to.equal(12)
        expect(result.entities[1].medalStats.excellent).to.equal(13)
        expect(result.entities[1].medalStats.firstFrag).to.equal(14)
        expect(result.entities[1].medalStats.headshot).to.equal(15)
        expect(result.entities[1].medalStats.humiliation).to.equal(16)
        expect(result.entities[1].medalStats.impressive).to.equal(17)
        expect(result.entities[1].medalStats.midair).to.equal(18)
        expect(result.entities[1].medalStats.perfect).to.equal(19)
        expect(result.entities[1].medalStats.perforated).to.equal(20)
        expect(result.entities[1].medalStats.quadGod).to.equal(21)
        expect(result.entities[1].medalStats.rampage).to.equal(22)
        expect(result.entities[1].medalStats.revenge).to.equal(23)
        expect(result.entities[1].neutralFlagPickups).to.equal(24)
        expect(result.entities[1].pickupStats.ammo).to.equal(25)
        expect(result.entities[1].pickupStats.armor).to.equal(26)
        expect(result.entities[1].pickupStats.armorRegeneration).to.equal(27)
        expect(result.entities[1].pickupStats.battleSuit).to.equal(28)
        expect(result.entities[1].pickupStats.doubler).to.equal(29)
        expect(result.entities[1].pickupStats.flight).to.equal(30)
        expect(result.entities[1].pickupStats.greenArmor).to.equal(31)
        expect(result.entities[1].pickupStats.guard).to.equal(32)
        expect(result.entities[1].pickupStats.haste).to.equal(33)
        expect(result.entities[1].pickupStats.health).to.equal(34)
        expect(result.entities[1].pickupStats.invisibility).to.equal(35)
        expect(result.entities[1].pickupStats.invulnerability).to.equal(36)
        expect(result.entities[1].pickupStats.kamikaze).to.equal(37)
        expect(result.entities[1].pickupStats.medkit).to.equal(38)
        expect(result.entities[1].pickupStats.megaHealth).to.equal(39)
        expect(result.entities[1].pickupStats.otherHoldable).to.equal(40)
        expect(result.entities[1].pickupStats.otherPowerUp).to.equal(41)
        expect(result.entities[1].pickupStats.portal).to.equal(42)
        expect(result.entities[1].pickupStats.quadDamage).to.equal(43)
        expect(result.entities[1].pickupStats.redArmor).to.equal(44)
        expect(result.entities[1].pickupStats.regeneration).to.equal(45)
        expect(result.entities[1].pickupStats.scout).to.equal(46)
        expect(result.entities[1].pickupStats.teleporter).to.equal(47)
        expect(result.entities[1].pickupStats.yellowArmor).to.equal(48)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].playTime).to.equal(49)
        expect(result.entities[1].rank).to.equal(50)
        expect(result.entities[1].redFlagPickups).to.equal(51)
        expect(result.entities[1].result).to.equal(ResultType.Quit)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].score).to.equal(52)
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].serverVisitId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[1].teamJoinTime).to.equal(53)
        expect(result.entities[1].teamRank).to.equal(54)
        expect(result.entities[1].tiedRank).to.equal(55)
        expect(result.entities[1].tiedTeamRank).to.equal(56)
        expect(result.entities[1].warmup).to.equal(false)
        expect(result.entities[1].bfg.damageGiven).to.equal(58)
        expect(result.entities[1].bfg.damageReceived).to.equal(59)
        expect(result.entities[1].bfg.deaths).to.equal(57)
        expect(result.entities[1].bfg.hits).to.equal(60)
        expect(result.entities[1].bfg.kills).to.equal(61)
        expect(result.entities[1].bfg.p).to.equal(62)
        expect(result.entities[1].bfg.shots).to.equal(63)
        expect(result.entities[1].bfg.t).to.equal(64)
        expect(result.entities[1].chainGun.damageGiven).to.equal(66)
        expect(result.entities[1].chainGun.damageReceived).to.equal(67)
        expect(result.entities[1].chainGun.deaths).to.equal(65)
        expect(result.entities[1].chainGun.hits).to.equal(68)
        expect(result.entities[1].chainGun.kills).to.equal(69)
        expect(result.entities[1].chainGun.p).to.equal(70)
        expect(result.entities[1].chainGun.shots).to.equal(71)
        expect(result.entities[1].chainGun.t).to.equal(72)
        expect(result.entities[1].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[1].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[1].gauntlet.deaths).to.equal(73)
        expect(result.entities[1].gauntlet.hits).to.equal(76)
        expect(result.entities[1].gauntlet.kills).to.equal(77)
        expect(result.entities[1].gauntlet.p).to.equal(78)
        expect(result.entities[1].gauntlet.shots).to.equal(79)
        expect(result.entities[1].gauntlet.t).to.equal(80)
        expect(result.entities[1].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[1].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[1].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[1].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[1].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[1].grenadeLauncher.p).to.equal(86)
        expect(result.entities[1].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[1].grenadeLauncher.t).to.equal(88)
        expect(result.entities[1].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[1].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[1].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[1].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[1].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[1].heavyMachineGun.p).to.equal(94)
        expect(result.entities[1].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[1].heavyMachineGun.t).to.equal(96)
        expect(result.entities[1].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[1].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[1].lightningGun.deaths).to.equal(97)
        expect(result.entities[1].lightningGun.hits).to.equal(100)
        expect(result.entities[1].lightningGun.kills).to.equal(101)
        expect(result.entities[1].lightningGun.p).to.equal(102)
        expect(result.entities[1].lightningGun.shots).to.equal(103)
        expect(result.entities[1].lightningGun.t).to.equal(104)
        expect(result.entities[1].machineGun.damageGiven).to.equal(106)
        expect(result.entities[1].machineGun.damageReceived).to.equal(107)
        expect(result.entities[1].machineGun.deaths).to.equal(105)
        expect(result.entities[1].machineGun.hits).to.equal(108)
        expect(result.entities[1].machineGun.kills).to.equal(109)
        expect(result.entities[1].machineGun.p).to.equal(110)
        expect(result.entities[1].machineGun.shots).to.equal(111)
        expect(result.entities[1].machineGun.t).to.equal(112)
        expect(result.entities[1].nailGun.damageGiven).to.equal(114)
        expect(result.entities[1].nailGun.damageReceived).to.equal(115)
        expect(result.entities[1].nailGun.deaths).to.equal(113)
        expect(result.entities[1].nailGun.hits).to.equal(116)
        expect(result.entities[1].nailGun.kills).to.equal(117)
        expect(result.entities[1].nailGun.p).to.equal(118)
        expect(result.entities[1].nailGun.shots).to.equal(119)
        expect(result.entities[1].nailGun.t).to.equal(120)
        expect(result.entities[1].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[1].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[1].otherWeapon.deaths).to.equal(121)
        expect(result.entities[1].otherWeapon.hits).to.equal(124)
        expect(result.entities[1].otherWeapon.kills).to.equal(125)
        expect(result.entities[1].otherWeapon.p).to.equal(126)
        expect(result.entities[1].otherWeapon.shots).to.equal(127)
        expect(result.entities[1].otherWeapon.t).to.equal(128)
        expect(result.entities[1].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[1].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[1].plasmaGun.deaths).to.equal(129)
        expect(result.entities[1].plasmaGun.hits).to.equal(132)
        expect(result.entities[1].plasmaGun.kills).to.equal(133)
        expect(result.entities[1].plasmaGun.p).to.equal(134)
        expect(result.entities[1].plasmaGun.shots).to.equal(135)
        expect(result.entities[1].plasmaGun.t).to.equal(136)
        expect(result.entities[1].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[1].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[1].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[1].proximityLauncher.hits).to.equal(140)
        expect(result.entities[1].proximityLauncher.kills).to.equal(141)
        expect(result.entities[1].proximityLauncher.p).to.equal(142)
        expect(result.entities[1].proximityLauncher.shots).to.equal(143)
        expect(result.entities[1].proximityLauncher.t).to.equal(144)
        expect(result.entities[1].railgun.damageGiven).to.equal(146)
        expect(result.entities[1].railgun.damageReceived).to.equal(147)
        expect(result.entities[1].railgun.deaths).to.equal(145)
        expect(result.entities[1].railgun.hits).to.equal(148)
        expect(result.entities[1].railgun.kills).to.equal(149)
        expect(result.entities[1].railgun.p).to.equal(150)
        expect(result.entities[1].railgun.shots).to.equal(151)
        expect(result.entities[1].railgun.t).to.equal(152)
        expect(result.entities[1].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[1].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[1].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[1].rocketLauncher.hits).to.equal(156)
        expect(result.entities[1].rocketLauncher.kills).to.equal(157)
        expect(result.entities[1].rocketLauncher.p).to.equal(158)
        expect(result.entities[1].rocketLauncher.shots).to.equal(159)
        expect(result.entities[1].rocketLauncher.t).to.equal(160)
        expect(result.entities[1].shotgun.damageGiven).to.equal(162)
        expect(result.entities[1].shotgun.damageReceived).to.equal(163)
        expect(result.entities[1].shotgun.deaths).to.equal(161)
        expect(result.entities[1].shotgun.hits).to.equal(164)
        expect(result.entities[1].shotgun.kills).to.equal(165)
        expect(result.entities[1].shotgun.p).to.equal(166)
        expect(result.entities[1].shotgun.shots).to.equal(167)
        expect(result.entities[1].shotgun.t).to.equal(168)
      })

      it('should create a new match participation for warmup', async function () {
        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "11111111111111111",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(1)
        expect(result.entities[0].id).to.equal(1)
        expect(result.entities[0].aborted).to.equal(false)
        expect(result.entities[0].active).to.equal(false)
        expect(result.entities[0].blueFlagPickups).to.equal(1)
        expect(result.entities[0].damageDealt).to.equal(2)
        expect(result.entities[0].damageTaken).to.equal(3)
        expect(result.entities[0].deathCount).to.equal(4)
        expect(result.entities[0].finishDate).to.deep.equal(date)
        expect(result.entities[0].holyShits).to.equal(5)
        expect(result.entities[0].killCount).to.equal(6)
        expect(result.entities[0].matchId).to.be.null
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
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].playTime).to.equal(49)
        expect(result.entities[0].rank).to.equal(50)
        expect(result.entities[0].redFlagPickups).to.equal(51)
        expect(result.entities[0].result).to.equal(ResultType.Quit)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].score).to.equal(52)
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].serverVisitId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[0].teamJoinTime).to.equal(53)
        expect(result.entities[0].teamRank).to.equal(54)
        expect(result.entities[0].tiedRank).to.equal(55)
        expect(result.entities[0].tiedTeamRank).to.equal(56)
        expect(result.entities[0].warmup).to.equal(true)
        expect(result.entities[0].bfg.damageGiven).to.equal(58)
        expect(result.entities[0].bfg.damageReceived).to.equal(59)
        expect(result.entities[0].bfg.deaths).to.equal(57)
        expect(result.entities[0].bfg.hits).to.equal(60)
        expect(result.entities[0].bfg.kills).to.equal(61)
        expect(result.entities[0].bfg.p).to.equal(62)
        expect(result.entities[0].bfg.shots).to.equal(63)
        expect(result.entities[0].bfg.t).to.equal(64)
        expect(result.entities[0].chainGun.damageGiven).to.equal(66)
        expect(result.entities[0].chainGun.damageReceived).to.equal(67)
        expect(result.entities[0].chainGun.deaths).to.equal(65)
        expect(result.entities[0].chainGun.hits).to.equal(68)
        expect(result.entities[0].chainGun.kills).to.equal(69)
        expect(result.entities[0].chainGun.p).to.equal(70)
        expect(result.entities[0].chainGun.shots).to.equal(71)
        expect(result.entities[0].chainGun.t).to.equal(72)
        expect(result.entities[0].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[0].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[0].gauntlet.deaths).to.equal(73)
        expect(result.entities[0].gauntlet.hits).to.equal(76)
        expect(result.entities[0].gauntlet.kills).to.equal(77)
        expect(result.entities[0].gauntlet.p).to.equal(78)
        expect(result.entities[0].gauntlet.shots).to.equal(79)
        expect(result.entities[0].gauntlet.t).to.equal(80)
        expect(result.entities[0].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[0].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[0].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[0].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[0].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[0].grenadeLauncher.p).to.equal(86)
        expect(result.entities[0].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[0].grenadeLauncher.t).to.equal(88)
        expect(result.entities[0].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[0].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[0].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[0].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[0].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[0].heavyMachineGun.p).to.equal(94)
        expect(result.entities[0].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[0].heavyMachineGun.t).to.equal(96)
        expect(result.entities[0].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[0].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[0].lightningGun.deaths).to.equal(97)
        expect(result.entities[0].lightningGun.hits).to.equal(100)
        expect(result.entities[0].lightningGun.kills).to.equal(101)
        expect(result.entities[0].lightningGun.p).to.equal(102)
        expect(result.entities[0].lightningGun.shots).to.equal(103)
        expect(result.entities[0].lightningGun.t).to.equal(104)
        expect(result.entities[0].machineGun.damageGiven).to.equal(106)
        expect(result.entities[0].machineGun.damageReceived).to.equal(107)
        expect(result.entities[0].machineGun.deaths).to.equal(105)
        expect(result.entities[0].machineGun.hits).to.equal(108)
        expect(result.entities[0].machineGun.kills).to.equal(109)
        expect(result.entities[0].machineGun.p).to.equal(110)
        expect(result.entities[0].machineGun.shots).to.equal(111)
        expect(result.entities[0].machineGun.t).to.equal(112)
        expect(result.entities[0].nailGun.damageGiven).to.equal(114)
        expect(result.entities[0].nailGun.damageReceived).to.equal(115)
        expect(result.entities[0].nailGun.deaths).to.equal(113)
        expect(result.entities[0].nailGun.hits).to.equal(116)
        expect(result.entities[0].nailGun.kills).to.equal(117)
        expect(result.entities[0].nailGun.p).to.equal(118)
        expect(result.entities[0].nailGun.shots).to.equal(119)
        expect(result.entities[0].nailGun.t).to.equal(120)
        expect(result.entities[0].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[0].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[0].otherWeapon.deaths).to.equal(121)
        expect(result.entities[0].otherWeapon.hits).to.equal(124)
        expect(result.entities[0].otherWeapon.kills).to.equal(125)
        expect(result.entities[0].otherWeapon.p).to.equal(126)
        expect(result.entities[0].otherWeapon.shots).to.equal(127)
        expect(result.entities[0].otherWeapon.t).to.equal(128)
        expect(result.entities[0].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[0].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[0].plasmaGun.deaths).to.equal(129)
        expect(result.entities[0].plasmaGun.hits).to.equal(132)
        expect(result.entities[0].plasmaGun.kills).to.equal(133)
        expect(result.entities[0].plasmaGun.p).to.equal(134)
        expect(result.entities[0].plasmaGun.shots).to.equal(135)
        expect(result.entities[0].plasmaGun.t).to.equal(136)
        expect(result.entities[0].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[0].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[0].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[0].proximityLauncher.hits).to.equal(140)
        expect(result.entities[0].proximityLauncher.kills).to.equal(141)
        expect(result.entities[0].proximityLauncher.p).to.equal(142)
        expect(result.entities[0].proximityLauncher.shots).to.equal(143)
        expect(result.entities[0].proximityLauncher.t).to.equal(144)
        expect(result.entities[0].railgun.damageGiven).to.equal(146)
        expect(result.entities[0].railgun.damageReceived).to.equal(147)
        expect(result.entities[0].railgun.deaths).to.equal(145)
        expect(result.entities[0].railgun.hits).to.equal(148)
        expect(result.entities[0].railgun.kills).to.equal(149)
        expect(result.entities[0].railgun.p).to.equal(150)
        expect(result.entities[0].railgun.shots).to.equal(151)
        expect(result.entities[0].railgun.t).to.equal(152)
        expect(result.entities[0].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[0].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[0].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[0].rocketLauncher.hits).to.equal(156)
        expect(result.entities[0].rocketLauncher.kills).to.equal(157)
        expect(result.entities[0].rocketLauncher.p).to.equal(158)
        expect(result.entities[0].rocketLauncher.shots).to.equal(159)
        expect(result.entities[0].rocketLauncher.t).to.equal(160)
        expect(result.entities[0].shotgun.damageGiven).to.equal(162)
        expect(result.entities[0].shotgun.damageReceived).to.equal(163)
        expect(result.entities[0].shotgun.deaths).to.equal(161)
        expect(result.entities[0].shotgun.hits).to.equal(164)
        expect(result.entities[0].shotgun.kills).to.equal(165)
        expect(result.entities[0].shotgun.p).to.equal(166)
        expect(result.entities[0].shotgun.shots).to.equal(167)
        expect(result.entities[0].shotgun.t).to.equal(168)
      })

      it('should inactivate any former match participations on the same server if the current game is another one', async function () {
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
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "333333333333333333333333333333333333",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "22222222222222222",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
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
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].team).to.equal(TeamType.Blue)
        expect(result.entities[3].id).to.equal(4)
        expect(result.entities[3].aborted).to.equal(false)
        expect(result.entities[3].active).to.equal(false)
        expect(result.entities[3].blueFlagPickups).to.equal(1)
        expect(result.entities[3].damageDealt).to.equal(2)
        expect(result.entities[3].damageTaken).to.equal(3)
        expect(result.entities[3].deathCount).to.equal(4)
        expect(result.entities[3].finishDate).to.deep.equal(date)
        expect(result.entities[3].holyShits).to.equal(5)
        expect(result.entities[3].killCount).to.equal(6)
        expect(result.entities[3].matchId).to.be.null
        expect(result.entities[3].maxStreak).to.equal(7)
        expect(result.entities[3].medalStats.accuracy).to.equal(8)
        expect(result.entities[3].medalStats.assists).to.equal(9)
        expect(result.entities[3].medalStats.captures).to.equal(10)
        expect(result.entities[3].medalStats.comboKill).to.equal(11)
        expect(result.entities[3].medalStats.defends).to.equal(12)
        expect(result.entities[3].medalStats.excellent).to.equal(13)
        expect(result.entities[3].medalStats.firstFrag).to.equal(14)
        expect(result.entities[3].medalStats.headshot).to.equal(15)
        expect(result.entities[3].medalStats.humiliation).to.equal(16)
        expect(result.entities[3].medalStats.impressive).to.equal(17)
        expect(result.entities[3].medalStats.midair).to.equal(18)
        expect(result.entities[3].medalStats.perfect).to.equal(19)
        expect(result.entities[3].medalStats.perforated).to.equal(20)
        expect(result.entities[3].medalStats.quadGod).to.equal(21)
        expect(result.entities[3].medalStats.rampage).to.equal(22)
        expect(result.entities[3].medalStats.revenge).to.equal(23)
        expect(result.entities[3].neutralFlagPickups).to.equal(24)
        expect(result.entities[3].pickupStats.ammo).to.equal(25)
        expect(result.entities[3].pickupStats.armor).to.equal(26)
        expect(result.entities[3].pickupStats.armorRegeneration).to.equal(27)
        expect(result.entities[3].pickupStats.battleSuit).to.equal(28)
        expect(result.entities[3].pickupStats.doubler).to.equal(29)
        expect(result.entities[3].pickupStats.flight).to.equal(30)
        expect(result.entities[3].pickupStats.greenArmor).to.equal(31)
        expect(result.entities[3].pickupStats.guard).to.equal(32)
        expect(result.entities[3].pickupStats.haste).to.equal(33)
        expect(result.entities[3].pickupStats.health).to.equal(34)
        expect(result.entities[3].pickupStats.invisibility).to.equal(35)
        expect(result.entities[3].pickupStats.invulnerability).to.equal(36)
        expect(result.entities[3].pickupStats.kamikaze).to.equal(37)
        expect(result.entities[3].pickupStats.medkit).to.equal(38)
        expect(result.entities[3].pickupStats.megaHealth).to.equal(39)
        expect(result.entities[3].pickupStats.otherHoldable).to.equal(40)
        expect(result.entities[3].pickupStats.otherPowerUp).to.equal(41)
        expect(result.entities[3].pickupStats.portal).to.equal(42)
        expect(result.entities[3].pickupStats.quadDamage).to.equal(43)
        expect(result.entities[3].pickupStats.redArmor).to.equal(44)
        expect(result.entities[3].pickupStats.regeneration).to.equal(45)
        expect(result.entities[3].pickupStats.scout).to.equal(46)
        expect(result.entities[3].pickupStats.teleporter).to.equal(47)
        expect(result.entities[3].pickupStats.yellowArmor).to.equal(48)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].playTime).to.equal(49)
        expect(result.entities[3].rank).to.equal(50)
        expect(result.entities[3].redFlagPickups).to.equal(51)
        expect(result.entities[3].result).to.equal(ResultType.Quit)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].score).to.equal(52)
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].serverVisitId).to.equal(2)
        expect(result.entities[3].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[3].team).to.equal(TeamType.Red)
        expect(result.entities[3].teamJoinTime).to.equal(53)
        expect(result.entities[3].teamRank).to.equal(54)
        expect(result.entities[3].tiedRank).to.equal(55)
        expect(result.entities[3].tiedTeamRank).to.equal(56)
        expect(result.entities[3].warmup).to.equal(true)
        expect(result.entities[3].bfg.damageGiven).to.equal(58)
        expect(result.entities[3].bfg.damageReceived).to.equal(59)
        expect(result.entities[3].bfg.deaths).to.equal(57)
        expect(result.entities[3].bfg.hits).to.equal(60)
        expect(result.entities[3].bfg.kills).to.equal(61)
        expect(result.entities[3].bfg.p).to.equal(62)
        expect(result.entities[3].bfg.shots).to.equal(63)
        expect(result.entities[3].bfg.t).to.equal(64)
        expect(result.entities[3].chainGun.damageGiven).to.equal(66)
        expect(result.entities[3].chainGun.damageReceived).to.equal(67)
        expect(result.entities[3].chainGun.deaths).to.equal(65)
        expect(result.entities[3].chainGun.hits).to.equal(68)
        expect(result.entities[3].chainGun.kills).to.equal(69)
        expect(result.entities[3].chainGun.p).to.equal(70)
        expect(result.entities[3].chainGun.shots).to.equal(71)
        expect(result.entities[3].chainGun.t).to.equal(72)
        expect(result.entities[3].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[3].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[3].gauntlet.deaths).to.equal(73)
        expect(result.entities[3].gauntlet.hits).to.equal(76)
        expect(result.entities[3].gauntlet.kills).to.equal(77)
        expect(result.entities[3].gauntlet.p).to.equal(78)
        expect(result.entities[3].gauntlet.shots).to.equal(79)
        expect(result.entities[3].gauntlet.t).to.equal(80)
        expect(result.entities[3].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[3].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[3].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[3].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[3].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[3].grenadeLauncher.p).to.equal(86)
        expect(result.entities[3].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[3].grenadeLauncher.t).to.equal(88)
        expect(result.entities[3].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[3].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[3].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[3].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[3].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[3].heavyMachineGun.p).to.equal(94)
        expect(result.entities[3].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[3].heavyMachineGun.t).to.equal(96)
        expect(result.entities[3].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[3].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[3].lightningGun.deaths).to.equal(97)
        expect(result.entities[3].lightningGun.hits).to.equal(100)
        expect(result.entities[3].lightningGun.kills).to.equal(101)
        expect(result.entities[3].lightningGun.p).to.equal(102)
        expect(result.entities[3].lightningGun.shots).to.equal(103)
        expect(result.entities[3].lightningGun.t).to.equal(104)
        expect(result.entities[3].machineGun.damageGiven).to.equal(106)
        expect(result.entities[3].machineGun.damageReceived).to.equal(107)
        expect(result.entities[3].machineGun.deaths).to.equal(105)
        expect(result.entities[3].machineGun.hits).to.equal(108)
        expect(result.entities[3].machineGun.kills).to.equal(109)
        expect(result.entities[3].machineGun.p).to.equal(110)
        expect(result.entities[3].machineGun.shots).to.equal(111)
        expect(result.entities[3].machineGun.t).to.equal(112)
        expect(result.entities[3].nailGun.damageGiven).to.equal(114)
        expect(result.entities[3].nailGun.damageReceived).to.equal(115)
        expect(result.entities[3].nailGun.deaths).to.equal(113)
        expect(result.entities[3].nailGun.hits).to.equal(116)
        expect(result.entities[3].nailGun.kills).to.equal(117)
        expect(result.entities[3].nailGun.p).to.equal(118)
        expect(result.entities[3].nailGun.shots).to.equal(119)
        expect(result.entities[3].nailGun.t).to.equal(120)
        expect(result.entities[3].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[3].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[3].otherWeapon.deaths).to.equal(121)
        expect(result.entities[3].otherWeapon.hits).to.equal(124)
        expect(result.entities[3].otherWeapon.kills).to.equal(125)
        expect(result.entities[3].otherWeapon.p).to.equal(126)
        expect(result.entities[3].otherWeapon.shots).to.equal(127)
        expect(result.entities[3].otherWeapon.t).to.equal(128)
        expect(result.entities[3].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[3].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[3].plasmaGun.deaths).to.equal(129)
        expect(result.entities[3].plasmaGun.hits).to.equal(132)
        expect(result.entities[3].plasmaGun.kills).to.equal(133)
        expect(result.entities[3].plasmaGun.p).to.equal(134)
        expect(result.entities[3].plasmaGun.shots).to.equal(135)
        expect(result.entities[3].plasmaGun.t).to.equal(136)
        expect(result.entities[3].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[3].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[3].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[3].proximityLauncher.hits).to.equal(140)
        expect(result.entities[3].proximityLauncher.kills).to.equal(141)
        expect(result.entities[3].proximityLauncher.p).to.equal(142)
        expect(result.entities[3].proximityLauncher.shots).to.equal(143)
        expect(result.entities[3].proximityLauncher.t).to.equal(144)
        expect(result.entities[3].railgun.damageGiven).to.equal(146)
        expect(result.entities[3].railgun.damageReceived).to.equal(147)
        expect(result.entities[3].railgun.deaths).to.equal(145)
        expect(result.entities[3].railgun.hits).to.equal(148)
        expect(result.entities[3].railgun.kills).to.equal(149)
        expect(result.entities[3].railgun.p).to.equal(150)
        expect(result.entities[3].railgun.shots).to.equal(151)
        expect(result.entities[3].railgun.t).to.equal(152)
        expect(result.entities[3].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[3].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[3].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[3].rocketLauncher.hits).to.equal(156)
        expect(result.entities[3].rocketLauncher.kills).to.equal(157)
        expect(result.entities[3].rocketLauncher.p).to.equal(158)
        expect(result.entities[3].rocketLauncher.shots).to.equal(159)
        expect(result.entities[3].rocketLauncher.t).to.equal(160)
        expect(result.entities[3].shotgun.damageGiven).to.equal(162)
        expect(result.entities[3].shotgun.damageReceived).to.equal(163)
        expect(result.entities[3].shotgun.deaths).to.equal(161)
        expect(result.entities[3].shotgun.hits).to.equal(164)
        expect(result.entities[3].shotgun.kills).to.equal(165)
        expect(result.entities[3].shotgun.p).to.equal(166)
        expect(result.entities[3].shotgun.shots).to.equal(167)
        expect(result.entities[3].shotgun.t).to.equal(168)
      })

      it('should inactivate any former match participation of the same player on any other servers', async function () {
        let startDate = new Date
        await create('server', { ip: '127.0.0.1', port: 27960 })
        await create('server', { ip: '127.0.0.1', port: 27961 })
        await create('player', { steamId: '11111111111111111' })
        await create('player', { steamId: '22222222222222222' })
        await create('player', { steamId: '33333333333333333' })
        await create('server_visit', { serverId: 2, playerId: 1, active: true, connectDate: startDate })
        await create('server_visit', { serverId: 2, playerId: 2, active: true, connectDate: startDate })
        await create('server_visit', { serverId: 2, playerId: 3, active: true, connectDate: startDate })
        await create('match', { serverId: 2, guid: '111111111111111111111111111111111111', active: true })
        await create('match_participation', { serverId: 2, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "222222222222222222222222222222222222",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "22222222222222222",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": true,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(true)
        expect(result.entities[0].finishDate).to.be.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(2)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Blue)
        expect(result.entities[1].active).to.equal(false)
        expect(result.entities[1].finishDate).to.be.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(2)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Red)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(1)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].id).to.equal(4)
        expect(result.entities[3].aborted).to.equal(false)
        expect(result.entities[3].active).to.equal(false)
        expect(result.entities[3].blueFlagPickups).to.equal(1)
        expect(result.entities[3].damageDealt).to.equal(2)
        expect(result.entities[3].damageTaken).to.equal(3)
        expect(result.entities[3].deathCount).to.equal(4)
        expect(result.entities[3].finishDate).to.deep.equal(date)
        expect(result.entities[3].holyShits).to.equal(5)
        expect(result.entities[3].killCount).to.equal(6)
        expect(result.entities[3].matchId).to.be.null
        expect(result.entities[3].maxStreak).to.equal(7)
        expect(result.entities[3].medalStats.accuracy).to.equal(8)
        expect(result.entities[3].medalStats.assists).to.equal(9)
        expect(result.entities[3].medalStats.captures).to.equal(10)
        expect(result.entities[3].medalStats.comboKill).to.equal(11)
        expect(result.entities[3].medalStats.defends).to.equal(12)
        expect(result.entities[3].medalStats.excellent).to.equal(13)
        expect(result.entities[3].medalStats.firstFrag).to.equal(14)
        expect(result.entities[3].medalStats.headshot).to.equal(15)
        expect(result.entities[3].medalStats.humiliation).to.equal(16)
        expect(result.entities[3].medalStats.impressive).to.equal(17)
        expect(result.entities[3].medalStats.midair).to.equal(18)
        expect(result.entities[3].medalStats.perfect).to.equal(19)
        expect(result.entities[3].medalStats.perforated).to.equal(20)
        expect(result.entities[3].medalStats.quadGod).to.equal(21)
        expect(result.entities[3].medalStats.rampage).to.equal(22)
        expect(result.entities[3].medalStats.revenge).to.equal(23)
        expect(result.entities[3].neutralFlagPickups).to.equal(24)
        expect(result.entities[3].pickupStats.ammo).to.equal(25)
        expect(result.entities[3].pickupStats.armor).to.equal(26)
        expect(result.entities[3].pickupStats.armorRegeneration).to.equal(27)
        expect(result.entities[3].pickupStats.battleSuit).to.equal(28)
        expect(result.entities[3].pickupStats.doubler).to.equal(29)
        expect(result.entities[3].pickupStats.flight).to.equal(30)
        expect(result.entities[3].pickupStats.greenArmor).to.equal(31)
        expect(result.entities[3].pickupStats.guard).to.equal(32)
        expect(result.entities[3].pickupStats.haste).to.equal(33)
        expect(result.entities[3].pickupStats.health).to.equal(34)
        expect(result.entities[3].pickupStats.invisibility).to.equal(35)
        expect(result.entities[3].pickupStats.invulnerability).to.equal(36)
        expect(result.entities[3].pickupStats.kamikaze).to.equal(37)
        expect(result.entities[3].pickupStats.medkit).to.equal(38)
        expect(result.entities[3].pickupStats.megaHealth).to.equal(39)
        expect(result.entities[3].pickupStats.otherHoldable).to.equal(40)
        expect(result.entities[3].pickupStats.otherPowerUp).to.equal(41)
        expect(result.entities[3].pickupStats.portal).to.equal(42)
        expect(result.entities[3].pickupStats.quadDamage).to.equal(43)
        expect(result.entities[3].pickupStats.redArmor).to.equal(44)
        expect(result.entities[3].pickupStats.regeneration).to.equal(45)
        expect(result.entities[3].pickupStats.scout).to.equal(46)
        expect(result.entities[3].pickupStats.teleporter).to.equal(47)
        expect(result.entities[3].pickupStats.yellowArmor).to.equal(48)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].playTime).to.equal(49)
        expect(result.entities[3].rank).to.equal(50)
        expect(result.entities[3].redFlagPickups).to.equal(51)
        expect(result.entities[3].result).to.equal(ResultType.Quit)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].score).to.equal(52)
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].serverVisitId).to.equal(4)
        expect(result.entities[3].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[3].team).to.equal(TeamType.Red)
        expect(result.entities[3].teamJoinTime).to.equal(53)
        expect(result.entities[3].teamRank).to.equal(54)
        expect(result.entities[3].tiedRank).to.equal(55)
        expect(result.entities[3].tiedTeamRank).to.equal(56)
        expect(result.entities[3].warmup).to.equal(true)
        expect(result.entities[3].bfg.damageGiven).to.equal(58)
        expect(result.entities[3].bfg.damageReceived).to.equal(59)
        expect(result.entities[3].bfg.deaths).to.equal(57)
        expect(result.entities[3].bfg.hits).to.equal(60)
        expect(result.entities[3].bfg.kills).to.equal(61)
        expect(result.entities[3].bfg.p).to.equal(62)
        expect(result.entities[3].bfg.shots).to.equal(63)
        expect(result.entities[3].bfg.t).to.equal(64)
        expect(result.entities[3].chainGun.damageGiven).to.equal(66)
        expect(result.entities[3].chainGun.damageReceived).to.equal(67)
        expect(result.entities[3].chainGun.deaths).to.equal(65)
        expect(result.entities[3].chainGun.hits).to.equal(68)
        expect(result.entities[3].chainGun.kills).to.equal(69)
        expect(result.entities[3].chainGun.p).to.equal(70)
        expect(result.entities[3].chainGun.shots).to.equal(71)
        expect(result.entities[3].chainGun.t).to.equal(72)
        expect(result.entities[3].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[3].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[3].gauntlet.deaths).to.equal(73)
        expect(result.entities[3].gauntlet.hits).to.equal(76)
        expect(result.entities[3].gauntlet.kills).to.equal(77)
        expect(result.entities[3].gauntlet.p).to.equal(78)
        expect(result.entities[3].gauntlet.shots).to.equal(79)
        expect(result.entities[3].gauntlet.t).to.equal(80)
        expect(result.entities[3].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[3].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[3].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[3].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[3].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[3].grenadeLauncher.p).to.equal(86)
        expect(result.entities[3].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[3].grenadeLauncher.t).to.equal(88)
        expect(result.entities[3].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[3].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[3].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[3].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[3].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[3].heavyMachineGun.p).to.equal(94)
        expect(result.entities[3].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[3].heavyMachineGun.t).to.equal(96)
        expect(result.entities[3].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[3].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[3].lightningGun.deaths).to.equal(97)
        expect(result.entities[3].lightningGun.hits).to.equal(100)
        expect(result.entities[3].lightningGun.kills).to.equal(101)
        expect(result.entities[3].lightningGun.p).to.equal(102)
        expect(result.entities[3].lightningGun.shots).to.equal(103)
        expect(result.entities[3].lightningGun.t).to.equal(104)
        expect(result.entities[3].machineGun.damageGiven).to.equal(106)
        expect(result.entities[3].machineGun.damageReceived).to.equal(107)
        expect(result.entities[3].machineGun.deaths).to.equal(105)
        expect(result.entities[3].machineGun.hits).to.equal(108)
        expect(result.entities[3].machineGun.kills).to.equal(109)
        expect(result.entities[3].machineGun.p).to.equal(110)
        expect(result.entities[3].machineGun.shots).to.equal(111)
        expect(result.entities[3].machineGun.t).to.equal(112)
        expect(result.entities[3].nailGun.damageGiven).to.equal(114)
        expect(result.entities[3].nailGun.damageReceived).to.equal(115)
        expect(result.entities[3].nailGun.deaths).to.equal(113)
        expect(result.entities[3].nailGun.hits).to.equal(116)
        expect(result.entities[3].nailGun.kills).to.equal(117)
        expect(result.entities[3].nailGun.p).to.equal(118)
        expect(result.entities[3].nailGun.shots).to.equal(119)
        expect(result.entities[3].nailGun.t).to.equal(120)
        expect(result.entities[3].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[3].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[3].otherWeapon.deaths).to.equal(121)
        expect(result.entities[3].otherWeapon.hits).to.equal(124)
        expect(result.entities[3].otherWeapon.kills).to.equal(125)
        expect(result.entities[3].otherWeapon.p).to.equal(126)
        expect(result.entities[3].otherWeapon.shots).to.equal(127)
        expect(result.entities[3].otherWeapon.t).to.equal(128)
        expect(result.entities[3].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[3].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[3].plasmaGun.deaths).to.equal(129)
        expect(result.entities[3].plasmaGun.hits).to.equal(132)
        expect(result.entities[3].plasmaGun.kills).to.equal(133)
        expect(result.entities[3].plasmaGun.p).to.equal(134)
        expect(result.entities[3].plasmaGun.shots).to.equal(135)
        expect(result.entities[3].plasmaGun.t).to.equal(136)
        expect(result.entities[3].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[3].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[3].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[3].proximityLauncher.hits).to.equal(140)
        expect(result.entities[3].proximityLauncher.kills).to.equal(141)
        expect(result.entities[3].proximityLauncher.p).to.equal(142)
        expect(result.entities[3].proximityLauncher.shots).to.equal(143)
        expect(result.entities[3].proximityLauncher.t).to.equal(144)
        expect(result.entities[3].railgun.damageGiven).to.equal(146)
        expect(result.entities[3].railgun.damageReceived).to.equal(147)
        expect(result.entities[3].railgun.deaths).to.equal(145)
        expect(result.entities[3].railgun.hits).to.equal(148)
        expect(result.entities[3].railgun.kills).to.equal(149)
        expect(result.entities[3].railgun.p).to.equal(150)
        expect(result.entities[3].railgun.shots).to.equal(151)
        expect(result.entities[3].railgun.t).to.equal(152)
        expect(result.entities[3].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[3].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[3].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[3].rocketLauncher.hits).to.equal(156)
        expect(result.entities[3].rocketLauncher.kills).to.equal(157)
        expect(result.entities[3].rocketLauncher.p).to.equal(158)
        expect(result.entities[3].rocketLauncher.shots).to.equal(159)
        expect(result.entities[3].rocketLauncher.t).to.equal(160)
        expect(result.entities[3].shotgun.damageGiven).to.equal(162)
        expect(result.entities[3].shotgun.damageReceived).to.equal(163)
        expect(result.entities[3].shotgun.deaths).to.equal(161)
        expect(result.entities[3].shotgun.hits).to.equal(164)
        expect(result.entities[3].shotgun.kills).to.equal(165)
        expect(result.entities[3].shotgun.p).to.equal(166)
        expect(result.entities[3].shotgun.shots).to.equal(167)
        expect(result.entities[3].shotgun.t).to.equal(168)
      })

      it('should create a new match participation if the player is in a different team than expected', async function () {
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
        await create('match_participation', { serverId: 1, playerId: 1, serverVisitId: 1, matchId: 1, active: true, startDate: startDate, team: TeamType.Red, warmup: false })
        await create('match_participation', { serverId: 1, playerId: 2, serverVisitId: 2, matchId: 1, active: true, startDate: startDate, team: TeamType.Blue, warmup: false })
        await create('match_participation', { serverId: 2, playerId: 3, serverVisitId: 3, matchId: 2, active: true, startDate: startDate, team: TeamType.Red, warmup: false })

        let qlEvent = {
          "DATA": {
            "ABORTED": false,
            "BLUE_FLAG_PICKUPS": 1,
            "DAMAGE": {
              "DEALT": 2,
              "TAKEN": 3
            },
            "DEATHS": 4,
            "HOLY_SHITS": 5,
            "KILLS": 6,
            "LOSE": 0,
            "MATCH_GUID": "111111111111111111111111111111111111",
            "MAX_STREAK": 7,
            "MEDALS": {
              "ACCURACY": 8,
              "ASSISTS": 9,
              "CAPTURES": 10,
              "COMBOKILL": 11,
              "DEFENDS": 12,
              "EXCELLENT": 13,
              "FIRSTFRAG": 14,
              "HEADSHOT": 15,
              "HUMILIATION": 16,
              "IMPRESSIVE": 17,
              "MIDAIR": 18,
              "PERFECT": 19,
              "PERFORATED": 20,
              "QUADGOD": 21,
              "RAMPAGE": 22,
              "REVENGE": 23
            },
            "MODEL": "sarge",
            "NAME": "Player",
            "NEUTRAL_FLAG_PICKUPS": 24,
            "PICKUPS": {
              "AMMO": 25,
              "ARMOR": 26,
              "ARMOR_REGEN": 27,
              "BATTLESUIT": 28,
              "DOUBLER": 29,
              "FLIGHT": 30,
              "GREEN_ARMOR": 31,
              "GUARD": 32,
              "HASTE": 33,
              "HEALTH": 34,
              "INVIS": 35,
              "INVULNERABILITY": 36,
              "KAMIKAZE": 37,
              "MEDKIT": 38,
              "MEGA_HEALTH": 39,
              "OTHER_HOLDABLE": 40,
              "OTHER_POWERUP": 41,
              "PORTAL": 42,
              "QUAD": 43,
              "RED_ARMOR": 44,
              "REGEN": 45,
              "SCOUT": 46,
              "TELEPORTER": 47,
              "YELLOW_ARMOR": 48
            },
            "PLAY_TIME": 49,
            "QUIT": 1,
            "RANK": 50,
            "RED_FLAG_PICKUPS": 51,
            "SCORE": 52,
            "STEAM_ID": "22222222222222222",
            "TEAM": 1,
            "TEAM_JOIN_TIME": 53,
            "TEAM_RANK": 54,
            "TIED_RANK": 55,
            "TIED_TEAM_RANK": 56,
            "WARMUP": false,
            "WEAPONS": {
              "BFG": {
                "D": 57,
                "DG": 58,
                "DR": 59,
                "H": 60,
                "K": 61,
                "P": 62,
                "S": 63,
                "T": 64
              },
              "CHAINGUN": {
                "D": 65,
                "DG": 66,
                "DR": 67,
                "H": 68,
                "K": 69,
                "P": 70,
                "S": 71,
                "T": 72
              },
              "GAUNTLET": {
                "D": 73,
                "DG": 74,
                "DR": 75,
                "H": 76,
                "K": 77,
                "P": 78,
                "S": 79,
                "T": 80
              },
              "GRENADE": {
                "D": 81,
                "DG": 82,
                "DR": 83,
                "H": 84,
                "K": 85,
                "P": 86,
                "S": 87,
                "T": 88
              },
              "HMG": {
                "D": 89,
                "DG": 90,
                "DR": 91,
                "H": 92,
                "K": 93,
                "P": 94,
                "S": 95,
                "T": 96
              },
              "LIGHTNING": {
                "D": 97,
                "DG": 98,
                "DR": 99,
                "H": 100,
                "K": 101,
                "P": 102,
                "S": 103,
                "T": 104
              },
              "MACHINEGUN": {
                "D": 105,
                "DG": 106,
                "DR": 107,
                "H": 108,
                "K": 109,
                "P": 110,
                "S": 111,
                "T": 112
              },
              "NAILGUN": {
                "D": 113,
                "DG": 114,
                "DR": 115,
                "H": 116,
                "K": 117,
                "P": 118,
                "S": 119,
                "T": 120
              },
              "OTHER_WEAPON": {
                "D": 121,
                "DG": 122,
                "DR": 123,
                "H": 124,
                "K": 125,
                "P": 126,
                "S": 127,
                "T": 128
              },
              "PLASMA": {
                "D": 129,
                "DG": 130,
                "DR": 131,
                "H": 132,
                "K": 133,
                "P": 134,
                "S": 135,
                "T": 136
              },
              "PROXMINE": {
                "D": 137,
                "DG": 138,
                "DR": 139,
                "H": 140,
                "K": 141,
                "P": 142,
                "S": 143,
                "T": 144
              },
              "RAILGUN": {
                "D": 145,
                "DG": 146,
                "DR": 147,
                "H": 148,
                "K": 149,
                "P": 150,
                "S": 151,
                "T": 152
              },
              "ROCKET": {
                "D": 153,
                "DG": 154,
                "DR": 155,
                "H": 156,
                "K": 157,
                "P": 158,
                "S": 159,
                "T": 160
              },
              "SHOTGUN": {
                "D": 161,
                "DG": 162,
                "DR": 163,
                "H": 164,
                "K": 165,
                "P": 166,
                "S": 167,
                "T": 168
              }
            },
            "WIN": 0
          },
          "TYPE": "PLAYER_STATS"
        }

        let date = new Date(new Date(startDate).setSeconds(startDate.getSeconds() + 1))
        let event = PlayerStatsEvent.fromQl(qlEvent['DATA'])
        await Services.get().qlStatsIntegrator.integrate('127.0.0.1', 27960, event, tx(), date)

        let result = await Services.get().matchParticipationLogic.read({ '@orderBy': 'id' }, tx())

        expect(result.entities.length).to.equal(4)
        expect(result.entities[0].active).to.equal(true)
        // expect(result.entities[0].finishDate).to.be.not.null
        expect(result.entities[0].matchId).to.equal(1)
        expect(result.entities[0].playerId).to.equal(1)
        expect(result.entities[0].roundId).to.be.null
        expect(result.entities[0].serverId).to.equal(1)
        expect(result.entities[0].startDate).to.deep.equal(startDate)
        expect(result.entities[0].team).to.equal(TeamType.Red)
        expect(result.entities[1].active).to.equal(false)
        // expect(result.entities[1].finishDate).to.be.not.null
        expect(result.entities[1].matchId).to.equal(1)
        expect(result.entities[1].playerId).to.equal(2)
        expect(result.entities[1].roundId).to.be.null
        expect(result.entities[1].serverId).to.equal(1)
        expect(result.entities[1].startDate).to.deep.equal(startDate)
        expect(result.entities[1].team).to.equal(TeamType.Blue)
        expect(result.entities[2].active).to.equal(true)
        expect(result.entities[2].finishDate).to.be.null
        expect(result.entities[2].matchId).to.equal(2)
        expect(result.entities[2].playerId).to.equal(3)
        expect(result.entities[2].roundId).to.be.null
        expect(result.entities[2].serverId).to.equal(2)
        expect(result.entities[2].startDate).to.deep.equal(startDate)
        expect(result.entities[2].team).to.equal(TeamType.Red)
        expect(result.entities[3].id).to.equal(4)
        expect(result.entities[3].aborted).to.equal(false)
        expect(result.entities[3].active).to.equal(false)
        expect(result.entities[3].blueFlagPickups).to.equal(1)
        expect(result.entities[3].damageDealt).to.equal(2)
        expect(result.entities[3].damageTaken).to.equal(3)
        expect(result.entities[3].deathCount).to.equal(4)
        expect(result.entities[3].finishDate).to.deep.equal(date)
        expect(result.entities[3].holyShits).to.equal(5)
        expect(result.entities[3].killCount).to.equal(6)
        expect(result.entities[3].matchId).to.equal(1)
        expect(result.entities[3].maxStreak).to.equal(7)
        expect(result.entities[3].medalStats.accuracy).to.equal(8)
        expect(result.entities[3].medalStats.assists).to.equal(9)
        expect(result.entities[3].medalStats.captures).to.equal(10)
        expect(result.entities[3].medalStats.comboKill).to.equal(11)
        expect(result.entities[3].medalStats.defends).to.equal(12)
        expect(result.entities[3].medalStats.excellent).to.equal(13)
        expect(result.entities[3].medalStats.firstFrag).to.equal(14)
        expect(result.entities[3].medalStats.headshot).to.equal(15)
        expect(result.entities[3].medalStats.humiliation).to.equal(16)
        expect(result.entities[3].medalStats.impressive).to.equal(17)
        expect(result.entities[3].medalStats.midair).to.equal(18)
        expect(result.entities[3].medalStats.perfect).to.equal(19)
        expect(result.entities[3].medalStats.perforated).to.equal(20)
        expect(result.entities[3].medalStats.quadGod).to.equal(21)
        expect(result.entities[3].medalStats.rampage).to.equal(22)
        expect(result.entities[3].medalStats.revenge).to.equal(23)
        expect(result.entities[3].neutralFlagPickups).to.equal(24)
        expect(result.entities[3].pickupStats.ammo).to.equal(25)
        expect(result.entities[3].pickupStats.armor).to.equal(26)
        expect(result.entities[3].pickupStats.armorRegeneration).to.equal(27)
        expect(result.entities[3].pickupStats.battleSuit).to.equal(28)
        expect(result.entities[3].pickupStats.doubler).to.equal(29)
        expect(result.entities[3].pickupStats.flight).to.equal(30)
        expect(result.entities[3].pickupStats.greenArmor).to.equal(31)
        expect(result.entities[3].pickupStats.guard).to.equal(32)
        expect(result.entities[3].pickupStats.haste).to.equal(33)
        expect(result.entities[3].pickupStats.health).to.equal(34)
        expect(result.entities[3].pickupStats.invisibility).to.equal(35)
        expect(result.entities[3].pickupStats.invulnerability).to.equal(36)
        expect(result.entities[3].pickupStats.kamikaze).to.equal(37)
        expect(result.entities[3].pickupStats.medkit).to.equal(38)
        expect(result.entities[3].pickupStats.megaHealth).to.equal(39)
        expect(result.entities[3].pickupStats.otherHoldable).to.equal(40)
        expect(result.entities[3].pickupStats.otherPowerUp).to.equal(41)
        expect(result.entities[3].pickupStats.portal).to.equal(42)
        expect(result.entities[3].pickupStats.quadDamage).to.equal(43)
        expect(result.entities[3].pickupStats.redArmor).to.equal(44)
        expect(result.entities[3].pickupStats.regeneration).to.equal(45)
        expect(result.entities[3].pickupStats.scout).to.equal(46)
        expect(result.entities[3].pickupStats.teleporter).to.equal(47)
        expect(result.entities[3].pickupStats.yellowArmor).to.equal(48)
        expect(result.entities[3].playerId).to.equal(2)
        expect(result.entities[3].playTime).to.equal(49)
        expect(result.entities[3].rank).to.equal(50)
        expect(result.entities[3].redFlagPickups).to.equal(51)
        expect(result.entities[3].result).to.equal(ResultType.Quit)
        expect(result.entities[3].roundId).to.be.null
        expect(result.entities[3].score).to.equal(52)
        expect(result.entities[3].serverId).to.equal(1)
        expect(result.entities[3].serverVisitId).to.equal(2)
        expect(result.entities[3].startDate).to.deep.equal(new Date(new Date(date).setSeconds(date.getSeconds() - event.playTime)))
        expect(result.entities[3].team).to.equal(TeamType.Red)
        expect(result.entities[3].teamJoinTime).to.equal(53)
        expect(result.entities[3].teamRank).to.equal(54)
        expect(result.entities[3].tiedRank).to.equal(55)
        expect(result.entities[3].tiedTeamRank).to.equal(56)
        expect(result.entities[3].warmup).to.equal(false)
        expect(result.entities[3].bfg.damageGiven).to.equal(58)
        expect(result.entities[3].bfg.damageReceived).to.equal(59)
        expect(result.entities[3].bfg.deaths).to.equal(57)
        expect(result.entities[3].bfg.hits).to.equal(60)
        expect(result.entities[3].bfg.kills).to.equal(61)
        expect(result.entities[3].bfg.p).to.equal(62)
        expect(result.entities[3].bfg.shots).to.equal(63)
        expect(result.entities[3].bfg.t).to.equal(64)
        expect(result.entities[3].chainGun.damageGiven).to.equal(66)
        expect(result.entities[3].chainGun.damageReceived).to.equal(67)
        expect(result.entities[3].chainGun.deaths).to.equal(65)
        expect(result.entities[3].chainGun.hits).to.equal(68)
        expect(result.entities[3].chainGun.kills).to.equal(69)
        expect(result.entities[3].chainGun.p).to.equal(70)
        expect(result.entities[3].chainGun.shots).to.equal(71)
        expect(result.entities[3].chainGun.t).to.equal(72)
        expect(result.entities[3].gauntlet.damageGiven).to.equal(74)
        expect(result.entities[3].gauntlet.damageReceived).to.equal(75)
        expect(result.entities[3].gauntlet.deaths).to.equal(73)
        expect(result.entities[3].gauntlet.hits).to.equal(76)
        expect(result.entities[3].gauntlet.kills).to.equal(77)
        expect(result.entities[3].gauntlet.p).to.equal(78)
        expect(result.entities[3].gauntlet.shots).to.equal(79)
        expect(result.entities[3].gauntlet.t).to.equal(80)
        expect(result.entities[3].grenadeLauncher.damageGiven).to.equal(82)
        expect(result.entities[3].grenadeLauncher.damageReceived).to.equal(83)
        expect(result.entities[3].grenadeLauncher.deaths).to.equal(81)
        expect(result.entities[3].grenadeLauncher.hits).to.equal(84)
        expect(result.entities[3].grenadeLauncher.kills).to.equal(85)
        expect(result.entities[3].grenadeLauncher.p).to.equal(86)
        expect(result.entities[3].grenadeLauncher.shots).to.equal(87)
        expect(result.entities[3].grenadeLauncher.t).to.equal(88)
        expect(result.entities[3].heavyMachineGun.damageGiven).to.equal(90)
        expect(result.entities[3].heavyMachineGun.damageReceived).to.equal(91)
        expect(result.entities[3].heavyMachineGun.deaths).to.equal(89)
        expect(result.entities[3].heavyMachineGun.hits).to.equal(92)
        expect(result.entities[3].heavyMachineGun.kills).to.equal(93)
        expect(result.entities[3].heavyMachineGun.p).to.equal(94)
        expect(result.entities[3].heavyMachineGun.shots).to.equal(95)
        expect(result.entities[3].heavyMachineGun.t).to.equal(96)
        expect(result.entities[3].lightningGun.damageGiven).to.equal(98)
        expect(result.entities[3].lightningGun.damageReceived).to.equal(99)
        expect(result.entities[3].lightningGun.deaths).to.equal(97)
        expect(result.entities[3].lightningGun.hits).to.equal(100)
        expect(result.entities[3].lightningGun.kills).to.equal(101)
        expect(result.entities[3].lightningGun.p).to.equal(102)
        expect(result.entities[3].lightningGun.shots).to.equal(103)
        expect(result.entities[3].lightningGun.t).to.equal(104)
        expect(result.entities[3].machineGun.damageGiven).to.equal(106)
        expect(result.entities[3].machineGun.damageReceived).to.equal(107)
        expect(result.entities[3].machineGun.deaths).to.equal(105)
        expect(result.entities[3].machineGun.hits).to.equal(108)
        expect(result.entities[3].machineGun.kills).to.equal(109)
        expect(result.entities[3].machineGun.p).to.equal(110)
        expect(result.entities[3].machineGun.shots).to.equal(111)
        expect(result.entities[3].machineGun.t).to.equal(112)
        expect(result.entities[3].nailGun.damageGiven).to.equal(114)
        expect(result.entities[3].nailGun.damageReceived).to.equal(115)
        expect(result.entities[3].nailGun.deaths).to.equal(113)
        expect(result.entities[3].nailGun.hits).to.equal(116)
        expect(result.entities[3].nailGun.kills).to.equal(117)
        expect(result.entities[3].nailGun.p).to.equal(118)
        expect(result.entities[3].nailGun.shots).to.equal(119)
        expect(result.entities[3].nailGun.t).to.equal(120)
        expect(result.entities[3].otherWeapon.damageGiven).to.equal(122)
        expect(result.entities[3].otherWeapon.damageReceived).to.equal(123)
        expect(result.entities[3].otherWeapon.deaths).to.equal(121)
        expect(result.entities[3].otherWeapon.hits).to.equal(124)
        expect(result.entities[3].otherWeapon.kills).to.equal(125)
        expect(result.entities[3].otherWeapon.p).to.equal(126)
        expect(result.entities[3].otherWeapon.shots).to.equal(127)
        expect(result.entities[3].otherWeapon.t).to.equal(128)
        expect(result.entities[3].plasmaGun.damageGiven).to.equal(130)
        expect(result.entities[3].plasmaGun.damageReceived).to.equal(131)
        expect(result.entities[3].plasmaGun.deaths).to.equal(129)
        expect(result.entities[3].plasmaGun.hits).to.equal(132)
        expect(result.entities[3].plasmaGun.kills).to.equal(133)
        expect(result.entities[3].plasmaGun.p).to.equal(134)
        expect(result.entities[3].plasmaGun.shots).to.equal(135)
        expect(result.entities[3].plasmaGun.t).to.equal(136)
        expect(result.entities[3].proximityLauncher.damageGiven).to.equal(138)
        expect(result.entities[3].proximityLauncher.damageReceived).to.equal(139)
        expect(result.entities[3].proximityLauncher.deaths).to.equal(137)
        expect(result.entities[3].proximityLauncher.hits).to.equal(140)
        expect(result.entities[3].proximityLauncher.kills).to.equal(141)
        expect(result.entities[3].proximityLauncher.p).to.equal(142)
        expect(result.entities[3].proximityLauncher.shots).to.equal(143)
        expect(result.entities[3].proximityLauncher.t).to.equal(144)
        expect(result.entities[3].railgun.damageGiven).to.equal(146)
        expect(result.entities[3].railgun.damageReceived).to.equal(147)
        expect(result.entities[3].railgun.deaths).to.equal(145)
        expect(result.entities[3].railgun.hits).to.equal(148)
        expect(result.entities[3].railgun.kills).to.equal(149)
        expect(result.entities[3].railgun.p).to.equal(150)
        expect(result.entities[3].railgun.shots).to.equal(151)
        expect(result.entities[3].railgun.t).to.equal(152)
        expect(result.entities[3].rocketLauncher.damageGiven).to.equal(154)
        expect(result.entities[3].rocketLauncher.damageReceived).to.equal(155)
        expect(result.entities[3].rocketLauncher.deaths).to.equal(153)
        expect(result.entities[3].rocketLauncher.hits).to.equal(156)
        expect(result.entities[3].rocketLauncher.kills).to.equal(157)
        expect(result.entities[3].rocketLauncher.p).to.equal(158)
        expect(result.entities[3].rocketLauncher.shots).to.equal(159)
        expect(result.entities[3].rocketLauncher.t).to.equal(160)
        expect(result.entities[3].shotgun.damageGiven).to.equal(162)
        expect(result.entities[3].shotgun.damageReceived).to.equal(163)
        expect(result.entities[3].shotgun.deaths).to.equal(161)
        expect(result.entities[3].shotgun.hits).to.equal(164)
        expect(result.entities[3].shotgun.kills).to.equal(165)
        expect(result.entities[3].shotgun.p).to.equal(166)
        expect(result.entities[3].shotgun.shots).to.equal(167)
        expect(result.entities[3].shotgun.t).to.equal(168)
      })
    })
  })
})