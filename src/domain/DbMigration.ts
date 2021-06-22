import Log from 'knight-log'
import { PostgresMigration } from 'knight-pg-migration'
import { Pool } from 'pg'

let log = new Log('DbMigration.ts')

export default class DbMigration extends PostgresMigration {

  constructor(pool: Pool) {
    super(pool)
  }

  async migrate() {
    log.admin('Starting database migration...')
    await this.version1()
  }

  async version1() {
    if (await this.getVersion() >= 1) {
      log.admin('Skipping version 1')
      return 
    }

    await this.pool.query(`
      CREATE TABLE change (
        version SERIAL PRIMARY KEY,
        entityName VARCHAR(100),
        method VARCHAR(20),
        entity TEXT,
        description TEXT
      )`
    )

    await this.pool.query(`
      CREATE TABLE factory (
        id SERIAL PRIMARY KEY,
        game_type VARCHAR(20),
        name VARCHAR(100),
        title VARCHAR(200)
      )`
    )

    await this.pool.query(`
      CREATE TABLE frag (
        id SERIAL PRIMARY KEY,
        cause VARCHAR(29),
        date TIMESTAMP,
        killer_airborne BOOLEAN,
        killer_ammo INTEGER,
        killer_armor INTEGER,
        killer_bot BOOLEAN,
        killer_bot_skill INTEGER,
        killer_health INTEGER,
        killer_holdable VARCHAR(20),
        killer_match_participation_id INTEGER,
        killer_player_id INTEGER,
        killer_power_ups VARCHAR(200),
        killer_position_x DOUBLE PRECISION,
        killer_position_y DOUBLE PRECISION,
        killer_position_z DOUBLE PRECISION,
        killer_server_visit_id INTEGER,
        killer_speed DOUBLE PRECISION,
        killer_team VARCHAR(9),
        killer_view_x DOUBLE PRECISION,
        killer_view_y DOUBLE PRECISION,
        killer_view_z DOUBLE PRECISION,
        killer_weapon VARCHAR(18),
        match_id INTEGER,
        other_team_alive INTEGER,
        other_team_dead INTEGER,
        round_id INTEGER,
        server_id INTEGER,
        suicide BOOLEAN,
        team_alive INTEGER,
        team_dead INTEGER,
        time INTEGER,
        victim_airborne BOOLEAN,
        victim_ammo INTEGER,
        victim_armor INTEGER,
        victim_bot BOOLEAN,
        victim_bot_skill INTEGER,
        victim_health INTEGER,
        victim_holdable VARCHAR(20),
        victim_match_participation_id INTEGER,
        victim_player_id INTEGER,
        victim_power_ups VARCHAR(200),
        victim_position_x DOUBLE PRECISION,
        victim_position_y DOUBLE PRECISION,
        victim_position_z DOUBLE PRECISION,
        victim_server_visit_id INTEGER,
        victim_speed DOUBLE PRECISION,
        victim_team VARCHAR(9),
        victim_view_x DOUBLE PRECISION,
        victim_view_y DOUBLE PRECISION,
        victim_view_z DOUBLE PRECISION,
        victim_weapon VARCHAR(18),
        warmup BOOLEAN
      )`
    )

    await this.pool.query(`
      CREATE TABLE map (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
      )`
    )

    await this.pool.query(`
      CREATE TABLE match (
        id SERIAL PRIMARY KEY,
        factory_id INTEGER,
        map_id INTEGER,
        server_id INTEGER,
        aborted BOOLEAN,
        active BOOLEAN,
        cvar_capturelimit INTEGER,
        cvar_fraglimit INTEGER,
        cvar_g_instagib BOOLEAN,
        cvar_g_quadhog BOOLEAN,
        cvar_g_training BOOLEAN,
        cvar_mercylimit INTEGER,
        cvar_roundlimit INTEGER,
        cvar_scorelimit INTEGER,
        cvar_timelimit INTEGER,
        exit_message VARCHAR(100),
        finish_date TIMESTAMP,
        guid CHAR(36),
        last_lead_change_time INTEGER,
        length INTEGER,
        restarted BOOLEAN,
        score1 INTEGER,
        score2 INTEGER,
        start_date TIMESTAMP
      )`
    )

    await this.pool.query(`
      CREATE TABLE match_participation (
        id SERIAL PRIMARY KEY,
        match_id INTEGER,
        player_id INTEGER,
        round_id INTEGER,
        server_id INTEGER,
        server_visit_id INTEGER,
        stats_id INTEGER,
        active BOOLEAN,
        finish_date TIMESTAMP,
        start_date TIMESTAMP,
        team VARCHAR(9)
      )`
    )

    await this.pool.query(`
      CREATE TABLE medal (
        id SERIAL PRIMARY KEY,
        match_id INTEGER,
        match_participation_id INTEGER,
        player_id INTEGER,
        round_id INTEGER,
        server_id INTEGER,
        server_visit_id INTEGER,
        date TIMESTAMP,
        medal VARCHAR(11),
        warmup BOOLEAN
      )`
    )

    await this.pool.query(`
      CREATE TABLE player (
        id SERIAL PRIMARY KEY,
        first_seen TIMESTAMP,
        name VARCHAR(64),
        model VARCHAR(50),
        steam_id CHAR(17)
      )`
    )

    await this.pool.query(`
      CREATE TABLE round (
        id SERIAL PRIMARY KEY,
        match_id INTEGER,
        server_id INTEGER,
        finish_date TIMESTAMP,
        round INTEGER,
        team_won VARCHAR(9),
        time INTEGER,
        start_date TIMESTAMP
      )`
    )

    await this.pool.query(`
      CREATE TABLE server (
        id SERIAL PRIMARY KEY,
        first_seen TIMESTAMP,
        ip VARCHAR(15),
        port INTEGER,
        title VARCHAR(200)
      )`
    )

    await this.pool.query(`
      CREATE TABLE server_visit (
        id SERIAL PRIMARY KEY,
        player_id INTEGER,
        server_id INTEGER,
        active BOOLEAN,
        connect_date TIMESTAMP,
        disconnect_date TIMESTAMP
      )`
    )

    await this.pool.query(`
      CREATE TABLE stats (
        id SERIAL PRIMARY KEY,
        match_id INTEGER,
        match_participation_id INTEGER,
        player_id INTEGER,
        round_id INTEGER,
        server_id INTEGER,
        server_visit_id INTEGER,
        aborted BOOLEAN,
        blue_flag_pickups INTEGER,
        damage_dealt INTEGER,
        damage_taken INTEGER,
        date TIMESTAMP,
        deaths INTEGER,
        holy_shits INTEGER,
        kills INTEGER,
        max_streak INTEGER,
        medal_accuracy INTEGER,
        medal_assists INTEGER,
        medal_captures INTEGER,
        medal_combo_kill INTEGER,
        medal_defends INTEGER,
        medal_excellent INTEGER,
        medal_first_frag INTEGER,
        medal_headshot INTEGER,
        medal_humiliation INTEGER,
        medal_impressive INTEGER,
        medal_midair INTEGER,
        medal_perfect INTEGER,
        medal_perforated INTEGER,
        medal_quad_god INTEGER,
        medal_rampage INTEGER,
        medal_revenge INTEGER,
        neutral_flag_pickups INTEGER,
        pickup_ammo INTEGER,
        pickup_armor INTEGER,
        pickup_armor_regeneration INTEGER,
        pickup_battle_suit INTEGER,
        pickup_doubler INTEGER,
        pickup_flight INTEGER,
        pickup_green_armor INTEGER,
        pickup_guard INTEGER,
        pickup_haste INTEGER,
        pickup_health INTEGER,
        pickup_invisibility INTEGER,
        pickup_invulnerability INTEGER,
        pickup_kamikaze INTEGER,
        pickup_medkit INTEGER,
        pickup_mega_health INTEGER,
        pickup_other_holdable INTEGER,
        pickup_other_power_up INTEGER,
        pickup_portal INTEGER,
        pickup_quad_damage INTEGER,
        pickup_red_armor INTEGER,
        pickup_regeneration INTEGER,
        pickup_scout INTEGER,
        pickup_teleporter INTEGER,
        pickup_yellow_armor INTEGER,
        play_time INTEGER,
        rank INTEGER,
        red_flag_pickups INTEGER,
        score INTEGER,
        team_join_time INTEGER,
        team_rank INTEGER,
        tied_rank INTEGER,
        tied_team_rank INTEGER,
        warmup BOOLEAN,
        bfg_deaths INTEGER,
        bfg_damage_given INTEGER,
        bfg_damage_received INTEGER,
        bfg_hits INTEGER,
        bfg_kills INTEGER,
        bfg_p INTEGER,
        bfg_shots INTEGER,
        bfg_t INTEGER,
        chain_gun_deaths INTEGER,
        chain_gun_damage_given INTEGER,
        chain_gun_damage_received INTEGER,
        chain_gun_hits INTEGER,
        chain_gun_kills INTEGER,
        chain_gun_p INTEGER,
        chain_gun_shots INTEGER,
        chain_gun_t INTEGER,
        gauntlet_deaths INTEGER,
        gauntlet_damage_given INTEGER,
        gauntlet_damage_received INTEGER,
        gauntlet_hits INTEGER,
        gauntlet_kills INTEGER,
        gauntlet_p INTEGER,
        gauntlet_shots INTEGER,
        gauntlet_t INTEGER,
        grenade_launcher_deaths INTEGER,
        grenade_launcher_damage_given INTEGER,
        grenade_launcher_damage_received INTEGER,
        grenade_launcher_hits INTEGER,
        grenade_launcher_kills INTEGER,
        grenade_launcher_p INTEGER,
        grenade_launcher_shots INTEGER,
        grenade_launcher_t INTEGER,
        heavy_machine_gun_deaths INTEGER,
        heavy_machine_gun_damage_given INTEGER,
        heavy_machine_gun_damage_received INTEGER,
        heavy_machine_gun_hits INTEGER,
        heavy_machine_gun_kills INTEGER,
        heavy_machine_gun_p INTEGER,
        heavy_machine_gun_shots INTEGER,
        heavy_machine_gun_t INTEGER,
        lightning_gun_deaths INTEGER,
        lightning_gun_damage_given INTEGER,
        lightning_gun_damage_received INTEGER,
        lightning_gun_hits INTEGER,
        lightning_gun_kills INTEGER,
        lightning_gun_p INTEGER,
        lightning_gun_shots INTEGER,
        lightning_gun_t INTEGER,
        machine_gun_deaths INTEGER,
        machine_gun_damage_given INTEGER,
        machine_gun_damage_received INTEGER,
        machine_gun_hits INTEGER,
        machine_gun_kills INTEGER,
        machine_gun_p INTEGER,
        machine_gun_shots INTEGER,
        machine_gun_t INTEGER,
        nail_gun_deaths INTEGER,
        nail_gun_damage_given INTEGER,
        nail_gun_damage_received INTEGER,
        nail_gun_hits INTEGER,
        nail_gun_kills INTEGER,
        nail_gun_p INTEGER,
        nail_gun_shots INTEGER,
        nail_gun_t INTEGER,
        other_weapon_deaths INTEGER,
        other_weapon_damage_given INTEGER,
        other_weapon_damage_received INTEGER,
        other_weapon_hits INTEGER,
        other_weapon_kills INTEGER,
        other_weapon_p INTEGER,
        other_weapon_shots INTEGER,
        other_weapon_t INTEGER,
        plasma_gun_deaths INTEGER,
        plasma_gun_damage_given INTEGER,
        plasma_gun_damage_received INTEGER,
        plasma_gun_hits INTEGER,
        plasma_gun_kills INTEGER,
        plasma_gun_p INTEGER,
        plasma_gun_shots INTEGER,
        plasma_gun_t INTEGER,
        proximity_launcher_deaths INTEGER,
        proximity_launcher_damage_given INTEGER,
        proximity_launcher_damage_received INTEGER,
        proximity_launcher_hits INTEGER,
        proximity_launcher_kills INTEGER,
        proximity_launcher_p INTEGER,
        proximity_launcher_shots INTEGER,
        proximity_launcher_t INTEGER,
        railgun_deaths INTEGER,
        railgun_damage_given INTEGER,
        railgun_damage_received INTEGER,
        railgun_hits INTEGER,
        railgun_kills INTEGER,
        railgun_p INTEGER,
        railgun_shots INTEGER,
        railgun_t INTEGER,
        rocket_launcher_deaths INTEGER,
        rocket_launcher_damage_given INTEGER,
        rocket_launcher_damage_received INTEGER,
        rocket_launcher_hits INTEGER,
        rocket_launcher_kills INTEGER,
        rocket_launcher_p INTEGER,
        rocket_launcher_shots INTEGER,
        rocket_launcher_t INTEGER,
        shotgun_deaths INTEGER,
        shotgun_damage_given INTEGER,
        shotgun_damage_received INTEGER,
        shotgun_hits INTEGER,
        shotgun_kills INTEGER,
        shotgun_p INTEGER,
        shotgun_shots INTEGER,
        shotgun_t INTEGER
      )`
    )

    await this.increaseVersion()
    log.admin('Migrated to version 1 (Create tables change, factory, frag, map, match, match_participation, medal, player, round, server, server_visit, stats)')
  }
}
