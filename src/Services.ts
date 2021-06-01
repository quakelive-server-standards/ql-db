import http from 'http'
import Log from 'knight-log'
import { Pool } from 'pg'
import WebSocket from 'ws'
import ApiV1 from './api/ApiV1'
import HttpApi from './api/HttpApi'
import WebSocketApi from './api/WebSocketApi'
import { getConfigByArgvOrEnvOrDefault, test } from './config'
import ChangeLogic from './domain/change/ChangeLogic'
import DbMigration from './domain/DbMigration'
import DemoData from './domain/DemoData'
import { FactoryLogic } from './domain/factory/FactoryLogic'
import { FragLogic } from './domain/frag/FragLogic'
import { MapLogic } from './domain/map/MapLogic'
import { MatchLogic } from './domain/match/MatchLogic'
import { MatchParticipationLogic } from './domain/matchParticipation/MatchParticipationLogic'
import { MedalLogic } from './domain/medal/MedalLogic'
import { PlayerLogic } from './domain/player/PlayerLogic'
import { RoundLogic } from './domain/round/RoundLogic'
import { ServerLogic } from './domain/server/ServerLogic'
import { ServerVisitLogic } from './domain/serverVisit/ServerVisitLogic'
import { StatsLogic } from './domain/stats/StatsLogic'
import instantiator from './Instantiator'
import { QlStatsIntegrator } from './service/QlStatsIntegrator'

let log = new Log('Services.ts')

/**
 * 
 */
export default class Services {

  private static instance: Services = new Services()

  static get(): Services {
    return Services.instance
  }
  
  config = getConfigByArgvOrEnvOrDefault()

  pool!: Pool

  httpServer!: http.Server
  webSocketServer!: WebSocket.Server

  apiV1 = new ApiV1
  httpApi!: HttpApi
  webSocketApi!: WebSocketApi

  changeLogic = new ChangeLogic

  factoryLogic = new FactoryLogic
  fragLogic = new FragLogic
  mapLogic = new MapLogic
  matchLogic = new MatchLogic
  matchParticipationLogic = new MatchParticipationLogic
  medalLogic = new MedalLogic
  playerLogic = new PlayerLogic
  roundLogic = new RoundLogic
  serverLogic = new ServerLogic
  serverVisitLogic = new ServerVisitLogic
  statsLogic = new StatsLogic

  qlStatsIntegrator = new QlStatsIntegrator

  async start() {
    log.admin('Starting services...')

    await this.startDb()
    await this.startServer()

    this.inject()
    this.startApis()
  }

  inject() {
    this.factoryLogic.changeLogic = this.changeLogic

    this.fragLogic.changeLogic = this.changeLogic
    this.fragLogic.matchLogic = this.matchLogic
    this.fragLogic.matchParticipationLogic = this.matchParticipationLogic
    this.fragLogic.playerLogic = this.playerLogic
    this.fragLogic.roundLogic = this.roundLogic
    this.fragLogic.serverLogic = this.serverLogic
    this.fragLogic.serverVisitLogic = this.serverVisitLogic

    this.mapLogic.changeLogic = this.changeLogic

    this.matchLogic.changeLogic = this.changeLogic
    this.matchLogic.factoryLogic = this.factoryLogic
    this.matchLogic.mapLogic = this.mapLogic
    this.matchLogic.serverLogic = this.serverLogic

    this.matchParticipationLogic.changeLogic = this.changeLogic
    this.matchParticipationLogic.matchLogic = this.matchLogic
    this.matchParticipationLogic.playerLogic = this.playerLogic
    this.matchParticipationLogic.roundLogic = this.roundLogic
    this.matchParticipationLogic.serverLogic = this.serverLogic
    this.matchParticipationLogic.statsLogic = this.statsLogic

    this.medalLogic.changeLogic = this.changeLogic
    this.medalLogic.matchLogic = this.matchLogic
    this.medalLogic.matchParticipationLogic = this.matchParticipationLogic
    this.medalLogic.playerLogic = this.playerLogic
    this.medalLogic.roundLogic = this.roundLogic
    this.medalLogic.serverLogic = this.serverLogic
    this.medalLogic.serverVisitLogic = this.serverVisitLogic

    this.playerLogic.changeLogic = this.changeLogic

    this.roundLogic.changeLogic = this.changeLogic
    this.roundLogic.matchLogic = this.matchLogic
    this.roundLogic.serverLogic = this.serverLogic

    this.serverLogic.changeLogic = this.changeLogic

    this.serverVisitLogic.changeLogic = this.changeLogic
    this.serverVisitLogic.playerLogic = this.playerLogic
    this.serverVisitLogic.serverLogic = this.serverLogic

    this.statsLogic.changeLogic = this.changeLogic
    this.statsLogic.matchLogic = this.matchLogic
    this.statsLogic.matchParticipationLogic = this.matchParticipationLogic
    this.statsLogic.playerLogic = this.playerLogic
    this.statsLogic.roundLogic = this.roundLogic
    this.statsLogic.serverLogic = this.serverLogic
    this.statsLogic.serverVisitLogic = this.serverVisitLogic

    this.qlStatsIntegrator.factoryLogic = this.factoryLogic
    this.qlStatsIntegrator.fragLogic = this.fragLogic
    this.qlStatsIntegrator.mapLogic = this.mapLogic
    this.qlStatsIntegrator.matchLogic = this.matchLogic
    this.qlStatsIntegrator.matchParticipationLogic = this.matchParticipationLogic
    this.qlStatsIntegrator.medalLogic = this.medalLogic
    this.qlStatsIntegrator.playerLogic = this.playerLogic
    this.qlStatsIntegrator.roundLogic = this.roundLogic
    this.qlStatsIntegrator.serverLogic = this.serverLogic
    this.qlStatsIntegrator.serverVisitLogic = this.serverVisitLogic
    this.qlStatsIntegrator.statsLogic = this.statsLogic
  }

  async startDb() {
    this.pool = new Pool(this.config.db)
    log.admin('Created database connection pool', 'Config =', this.config.db)
  }

  async startServer() {
    // HTTP Server
    this.httpServer = http.createServer()
    this.httpServer.listen(this.config.httpApi.port)

    // WebSocket Server          
    this.webSocketServer = new WebSocket.Server({
      server: this.httpServer
    }, () => {
      let address = this.webSocketServer.address() as any
      log.admin('WebSocket server running at ' + address.address + ':' + address.port + ' - ' + address.family)
    })
  }

  startApis() {
    this.httpApi = new HttpApi(this.apiV1, instantiator, this.config.httpApi)
    this.httpApi.server = this.httpServer

    this.webSocketApi = new WebSocketApi
    this.webSocketApi.webSocketServer = this.webSocketServer
    this.webSocketApi.pool = this.pool
    this.webSocketApi.changeLogic = this.changeLogic

    this.apiV1.pool = this.pool
    this.apiV1.webSocketApi = this.webSocketApi

    this.httpApi.start()
    log.admin('Started HTTP API (POSTonly)')
    this.webSocketApi.start()
    log.admin('Started WebSocket API')

    log.admin('Initialized HTTP API with remote methods', this.apiV1.methodNames)
  }

  async stop() {
    log.admin('Stopping services...')

    if (this.pool) {
      this.pool.end()
      log.admin('Stopped database connections')
    }

    if (this.httpServer) {
      this.httpServer.close()
      log.admin('Stopped HTTP server')  
    }

    if (this.webSocketServer) {
      this.webSocketServer.close()
      log.admin('Stopped WebSocket server')  
    }

    Log.watcher?.close()
  }

  useTestConfig() {
    log.admin('Using test config')
    this.config = test
  }

  get dbMigration(): DbMigration {
    return new DbMigration(this.pool)
  }

  get demoData(): DemoData {
    return new DemoData(this.pool)
  }
}
