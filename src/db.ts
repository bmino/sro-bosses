import {Database} from 'bun:sqlite';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';

await mkdir('./data', { recursive: true });

const db = new Database(path.join(import.meta.dir, '../data/bosses.db'));
db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA synchronous = NORMAL;");
db.run("PRAGMA busy_timeout = 5000;");

// --- Migrations ---

db.run(`
  CREATE TABLE IF NOT EXISTS migrations (
    id         INTEGER PRIMARY KEY,
    name       TEXT NOT NULL UNIQUE,
    applied_at INTEGER NOT NULL
  )
`);

const migrations: { name: string; sql: string }[] = [
  {
    name: '001_create_boss_deaths',
    sql: `
      CREATE TABLE IF NOT EXISTS boss_deaths (
        boss_name       TEXT PRIMARY KEY,
        killer          TEXT NOT NULL,
        time_last_death INTEGER NOT NULL,
        time_next_spawn INTEGER NOT NULL
      )
    `,
  },
  {
    name: '002_create_server_status',
    sql: `
      CREATE TABLE IF NOT EXISTS server_status (
        id                INTEGER PRIMARY KEY CHECK (id = 1),
        time_last_online  INTEGER NOT NULL DEFAULT 0,
        time_last_offline INTEGER NOT NULL DEFAULT 0
      )
    `,
  },
  {
    name: '003_seed_server_status',
    sql: `INSERT OR IGNORE INTO server_status (id) VALUES (1)`,
  },
];

const hasRun = db.prepare(
  'SELECT id FROM migrations WHERE name = ?'
);
const recordMigration = db.prepare(
  'INSERT INTO migrations (name, applied_at) VALUES (?, ?)'
);

for (const migration of migrations) {
  if (hasRun.get(migration.name)) continue;
  console.log(`Running migration: ${migration.name}`);
  db.run(migration.sql);
  recordMigration.run(migration.name, Date.now());
}

export default db;
