import { PgTransaction } from 'knight-pg-transaction'
import { Absent, Exists, Required, TypeOf, Validator } from 'knight-validation'
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

    this.add('serverId', new TypeOf('number'))
    this.add('serverId', new Exists(async (frag: Frag) => {
      let result = await serverLogic.count({ id: frag.serverId }, tx)
      return result.count == 1
    }))

    this.add('date', new Required)
    this.add('date', new TypeOf(Date))

    this.add('killer', new FragParticipantValidator(playerLogic, matchParticipationLogic, serverVisitLogic, tx))
    this.add('otherTeamAlive', new TypeOf('number'))
    this.add('otherTeamDead', new TypeOf('number'))
    this.add('suicide', new TypeOf('boolean'))
    this.add('teamAlive', new TypeOf('number'))
    this.add('teamDead', new TypeOf('number'))
    this.add('time', new TypeOf('number'))
    this.add('victim', new FragParticipantValidator(playerLogic, matchParticipationLogic, serverVisitLogic, tx))
    this.add('warmup', new TypeOf('boolean'))
  }
}

export class FragParticipantValidator extends Validator {

  constructor(playerLogic: PlayerLogic, matchParticipationLogic: MatchParticipationLogic, serverVisitLogic: ServerVisitLogic, tx: PgTransaction) {
    super()

    this.add('playerId', new TypeOf('number'))
    this.add('playerId', new Exists(async (fragParticipant: FragParticipant) => {
      let result = await playerLogic.count({ id: fragParticipant.playerId }, tx)
      return result.count == 1
    }))

    this.add('matchParticipationId', new TypeOf('number'))
    this.add('matchParticipationId', new Exists(async (fragParticipant: FragParticipant) => {
      let result = await matchParticipationLogic.count({ id: fragParticipant.playerId }, tx)
      return result.count == 1
    }))

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
    this.add('position.x', new TypeOf('number'))
    this.add('position.y', new TypeOf('number'))
    this.add('position.z', new TypeOf('number'))
    this.add('speed', new TypeOf('number'))
    // this.add('team', new Enum(TeamType))
    this.add('view.x', new TypeOf('number'))
    this.add('view.y', new TypeOf('number'))
    this.add('view.z', new TypeOf('number'))
    // this.add('weapon', new Enum(WeaponType))
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
