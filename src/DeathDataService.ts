const DEATHS_FILE = Bun.file('./data/DEATHS.json');
import {type BossName} from '../config/eventConfig.ts';
import {type BossDeath} from '@/models';

export async function initializeData() {
  if (!await DEATHS_FILE.exists()) {
    await Bun.write(DEATHS_FILE, JSON.stringify({} as Record<BossName, BossDeath>));
  }
}

export async function createJson(json: Record<BossName, BossDeath>): Promise<number> {
  return await Bun.write(DEATHS_FILE, JSON.stringify(json));
}

export async function createBossDeath(bossName: BossName, bossDeath: BossDeath): Promise<void> {
  const historyJson: Record<BossName, BossDeath> = await readJson();
  historyJson[bossName] = bossDeath;
  await createJson(historyJson);
}

export async function readJson(): Promise<Record<BossName, BossDeath>> {
  return await DEATHS_FILE.json();
}

export async function readAllBossDeaths(): Promise<BossDeath[]> {
  const json: Record<BossName, BossDeath> = await readJson();
  return Object.values(json);
}

export async function deleteBossDeath(bossName: BossName): Promise<void> {
  const historyJson: Record<BossName, BossDeath> = await readJson();

  if (!historyJson[bossName]) throw new Error('Boss death has not been tracked');

  delete historyJson[bossName];

  await createJson(historyJson);
}

export async function deleteBossDeaths(bossNames: BossName[]): Promise<void> {
  const historyJson: Record<BossName, BossDeath> = await readJson();

  if (bossNames.some((bossName: BossName) => !historyJson[bossName])) {
    throw new Error('Boss death has not been tracked');
  }

  for (const bossName of bossNames) {
    delete historyJson[bossName];
  }

  await createJson(historyJson);
}

export async function backupJson() {
  const backupFilePath = `./data/DEATHS-${Date.now()}.json`;
  console.log(`Backing up ${DEATHS_FILE.name} to ${backupFilePath}`);
  const backupFile = Bun.file(backupFilePath);
  return await Bun.write(backupFile, DEATHS_FILE);
}
