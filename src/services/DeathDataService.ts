import db from '../db.ts';
import {type BossName} from '../../config/eventConfig.ts';
import {type BossDeath} from '@/models';

const insert = db.prepare<void, { $bossName: BossName; $killer: string; $timeLastDeath: number; $timeNextSpawn: number }>(`
  INSERT INTO boss_deaths (boss_name, killer, time_last_death, time_next_spawn)
  VALUES ($bossName, $killer, $timeLastDeath, $timeNextSpawn)
  ON CONFLICT(boss_name) DO UPDATE SET
    killer          = excluded.killer,
    time_last_death = excluded.time_last_death,
    time_next_spawn = excluded.time_next_spawn
`);

const selectAll = db.prepare<BossDeath, []>(`
  SELECT boss_name AS bossName, killer, time_last_death AS timeLastDeath, time_next_spawn AS timeNextSpawn
  FROM boss_deaths
`);

const selectOne = db.prepare<BossDeath, [string]>(`
  SELECT boss_name AS bossName, killer, time_last_death AS timeLastDeath, time_next_spawn AS timeNextSpawn
  FROM boss_deaths
  WHERE boss_name = ?
`);

const deleteOne = db.prepare<void, [string]>(`
  DELETE FROM boss_deaths WHERE boss_name = ?
`);

const deleteMany = db.transaction((bossNames: string[]) => {
  for (const name of bossNames) deleteOne.run(name);
});

export function readJson(): Record<BossName, BossDeath> {
  const rows = selectAll.all();
  return Object.fromEntries(rows.map(r => [r.bossName, r])) as Record<BossName, BossDeath>;
}

export function readAllBossDeaths(): BossDeath[] {
  return selectAll.all();
}

export function createBossDeath(bossDeath: BossDeath): void {
  insert.run({
    $bossName:      bossDeath.bossName,
    $killer:        bossDeath.killer,
    $timeLastDeath: bossDeath.timeLastDeath,
    $timeNextSpawn: bossDeath.timeNextSpawn,
  });
}

export function deleteBossDeath(bossName: BossName): void {
  const existing = selectOne.get(bossName);
  if (!existing) throw new Error('Boss death has not been tracked');
  deleteOne.run(bossName);
}

export function deleteBossDeaths(bossNames: BossName[]): void {
  const existing = readJson();
  if (bossNames.some(name => !existing[name as BossName])) {
    throw new Error('Boss death has not been tracked');
  }
  deleteMany(bossNames);
}

export function getOneBossDeath(bossName: BossName): BossDeath | null {
  return selectOne.get(bossName) ?? null;
}
