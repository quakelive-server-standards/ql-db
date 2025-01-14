import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Enum, Exists, Required, TypeOf, Validator } from 'knight-validation'
import { TeamType } from '../enums/TeamType'
import { WeaponType } from '../enums/WeaponType'
import { MatchLogic } from '../match/MatchLogic'
import { MatchParticipationLogic } from '../matchParticipation/MatchParticipationLogic'
import { PlayerLogic } from '../player/PlayerLogic'
import { RoundLogic } from '../round/RoundLogic'
import { ServerLogic } from '../server/ServerLogic'
import { ServerVisitLogic } from '../serverVisit/ServerVisitLogic'
import { Frag, FragParticipant } from './Frag'
import { FragLogic } from './FragLogic'

export class FragValidator extends Validator {

  constructor(
      matchLogic: MatchLogic,
      matchParticipationLogic: MatchParticipationLogic,
      playerLogic: PlayerLogic,
      roundLogic: RoundLogic,
      serverLogic: ServerLogic,
      serverVisitLogic: ServerVisitLogic,
      tx: PgTransaction) {

    super()

    this.add('matchId', new Required, async (frag: Frag) => ! frag.warmup)
    this.add('matchId', new TypeOf('number'))
    this.add('matchId', new Exists(async (frag: Frag) => {
      let result = await matchLogic.count({ id: frag.matchId }, tx)
      return result.count == 1
    }))
    
    this.add('roundId', new TypeOf('number'))
    this.add('roundId', new Exists(async (frag: Frag) => {
      let result = await roundLogic.count({ id: frag.roundId }, tx)
      return result.count == 1
    }))

    this.add('serverId', new Required)
    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (frag: Frag) => {
      let result = await serverLogic.count({ id: frag.serverId }, tx)
      return result.count == 1
    }))
    
    this.add('cause', new Required)
    // this.add('cause', new Enum(CauseType))

    this.add('date', new Required)
    this.add('date', new TypeOf(Date))

    this.add('environment', new Required)
    this.add('environment', new TypeOf('boolean'))

    this.add('killer', new FragParticipantValidator(playerLogic, matchParticipationLogic, serverVisitLogic, tx))
    this.add('otherTeamAlive', new TypeOf('number'))
    this.add('otherTeamDead', new TypeOf('number'))
    
    this.add('suicide', new Required)
    this.add('suicide', new TypeOf('boolean'))
    
    this.add('teamAlive', new TypeOf('number'))
    this.add('teamDead', new TypeOf('number'))
    
    this.add('teamKill', new Required)
    this.add('teamKill', new TypeOf('boolean'))
    
    this.add('time', new Required)
    this.add('time', new TypeOf('number'))

    this.add('victim', new Required)
    this.add('victim', new FragParticipantValidator(playerLogic, matchParticipationLogic, serverVisitLogic, tx))
    
    this.add('warmup', new Required)
    this.add('warmup', new TypeOf('boolean'))
  }
}

export class FragParticipantValidator extends Validator {

  constructor(playerLogic: PlayerLogic, matchParticipationLogic: MatchParticipationLogic, serverVisitLogic: ServerVisitLogic, tx: PgTransaction) {
    super()

    this.add('playerId', new Required)
    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (fragParticipant: FragParticipant) => {
      let result = await playerLogic.count({ id: fragParticipant.playerId }, tx)
      return result.count == 1
    }))

    this.add('matchParticipationId', new TypeOf('number'))
    this.add('matchParticipationId', new Exists(async (fragParticipant: FragParticipant) => {
      let result = await matchParticipationLogic.count({ id: fragParticipant.matchParticipationId }, tx)
      return result.count == 1
    }))

    this.add('serverVisitId', new Required)
    this.add('serverVisitId', new TypeOf('number'))
    this.add('serverVisitId', new Exists(async (fragParticipant: FragParticipant) => {
      let result = await serverVisitLogic.count({ id: fragParticipant.serverVisitId }, tx)
      return result.count == 1
    }))

    this.add('airborn', new TypeOf('boolean'))
    this.add('ammo', new TypeOf('number'))
    this.add('armor', new TypeOf('number'))
    this.add('bot', new TypeOf('boolean'))
    this.add('botSkill', new TypeOf('number'))
    this.add('health', new TypeOf('number'))
    // this.add('holdable', new Enum(HoldableType))
    // this.add('powerUps')

    this.add('position', new Required)
    this.add('position', new CoordinateValidator)

    this.add('speed', new TypeOf('number'))
    this.add('team', new Enum(TeamType))
    
    this.add('view', new Required)
    this.add('view', new CoordinateValidator)

    this.add('weapon', new Enum(WeaponType))
  }
}

export class FragIdValidator extends Validator {

  fragLogic: FragLogic

  constructor(fragLogic: FragLogic, tx: PgTransaction) {
    super()
    
    this.fragLogic = fragLogic

    this.add('id', new Required)
    this.add('id', new TypeOf('number'))
    this.add('id', new Exists(async (frag: Frag) => {
      let result = await this.fragLogic.count({ id: frag.id }, tx)
      return result.count == 1
    }))
  }
}

export class FragCreateValidator extends Validator {

  constructor(
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic,
    roundLogic: RoundLogic,
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()

    this.add('id', new Absent)
    this.add(new FragValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class FragUpdateValidator extends Validator {

  constructor(
    fragLogic: FragLogic,
    matchLogic: MatchLogic,
    matchParticipationLogic: MatchParticipationLogic,
    playerLogic: PlayerLogic,
    roundLogic: RoundLogic,
    serverLogic: ServerLogic,
    serverVisitLogic: ServerVisitLogic,
    tx: PgTransaction) {

    super()
    
    this.add(new FragIdValidator(fragLogic, tx))
    this.add(new FragValidator(matchLogic, matchParticipationLogic, playerLogic, roundLogic, serverLogic, serverVisitLogic, tx))
  }
}

export class FragDeleteValidator extends Validator {
  
  constructor(fragLogic: FragLogic, tx: PgTransaction) {
    super()

    this.add(new FragIdValidator(fragLogic, tx))
  }
}

class CoordinateValidator extends Validator {
  constructor() {
    super()

    this.add('x', new Required)
    this.add('x', new TypeOf('number'))

    this.add('y', new Required)
    this.add('y', new TypeOf('number'))

    this.add('z', new Required)
    this.add('z', new TypeOf('number'))
  }
}