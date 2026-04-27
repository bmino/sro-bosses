import * as cheerio from 'cheerio';
import {DAY, HOUR, MINUTE, SECOND} from '@/Constants.ts'
import {BOSS_CONFIG, SCHEDULE_TZ_OFFSET, type BossName, type BossConfig, type Reward} from '../config/eventConfig.ts'

const FRESH_DEATH_DURATION = 4 * HOUR;
const URL = 'https://playlegends.online';
const DEATHS_FILE = Bun.file('./data/DEATHS.json');

export type BossDeath = {
  bossName: BossName;
  killer: string;
  timeLastDeath: number;
  timeNextSpawn: number;
};

export class InvalidBossName extends Error {
  constructor(bossName: string) {
    super(`Boss "${bossName}" not found in config.`);
    this.name = "InvalidBossName";
  }
}

export function getBossNames() {
  return Object.keys(BOSS_CONFIG);
}

export async function getBossDeaths() {
  const json: Record<BossName, BossDeath> = await DEATHS_FILE.json();
  return Object.values(json);
}

export function getBossConfig() {
  return BOSS_CONFIG;
}

export async function reportBossDeath(bossName: string, msSinceDeath: number) {
  const deathTime = Date.now() - msSinceDeath;

  const historyJson: Record<BossName, BossDeath> = await DEATHS_FILE.json();

  // Ignore death that we already know about
  if (historyJson[bossName as BossName]) {
    const timeSinceDeath = Date.now() - historyJson[bossName as BossName].timeLastDeath;
    if (timeSinceDeath < FRESH_DEATH_DURATION) throw new Error('Death is too fresh');
  }

  console.log(`Death reported! ${bossName} killed at ${deathTime}`);
  historyJson[bossName as BossName] = createBossDeath(
    bossName,
    'Unknown',
    msSinceDeath,
  );

  await Bun.write(DEATHS_FILE, JSON.stringify(historyJson));
}

export async function removeBossDeath(bossName: string) {
  const historyJson: Record<BossName, BossDeath> = await DEATHS_FILE.json();

  if (!historyJson[bossName as BossName]) throw new Error('Boss death has not been tracked');

  delete historyJson[bossName as BossName];

  await Bun.write(DEATHS_FILE, JSON.stringify(historyJson));
}

export async function crawlKillFeed() {
  const historyJson: Record<BossName, BossDeath> = await DEATHS_FILE.json();

  let pageData;
  console.log(`--- Scraping ${URL}: ${new Date().toLocaleTimeString()} ---`);
  try {
    const response = await Bun.fetch(URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    pageData = await response.text();
  } catch (e) {
    console.error(e);
    return;
  }

  const $ = cheerio.load(pageData);
  const elements = $('div.uniquekills div.discussions-info');

  for (const element of elements) {
    try {
      const bossDeath = parseCrawledText($(element).text());

      // Gracefully move on if death is not being tracked
      if (!bossDeath) continue;

      // Ignore death that we already know about
      if (historyJson[bossDeath.bossName]) {
        const timeSinceDeath = Date.now() - historyJson[bossDeath.bossName].timeLastDeath;
        if (timeSinceDeath < FRESH_DEATH_DURATION) continue;
      }

      console.log(`Death detected! ${bossDeath.bossName} killed by ${bossDeath.killer} at ${bossDeath.timeLastDeath}`);
      historyJson[bossDeath.bossName] = bossDeath;
    } catch (e) {
      console.error(e);
    }
  }

  await Bun.write(DEATHS_FILE, JSON.stringify(historyJson));
}

function parseCrawledText(crawledText: string): BossDeath | null {
  const string = crawledText.trim().replace(/\s+/g, ' ');
  console.log(`Scraped Input: [${string}]`);

  const [bossName, _killerNameAndKilledAgo = ''] = string.split('Killed By').map(x => x.trim());
  if (bossName === undefined) {
    console.error('Failed to parse boss name');
    return null;
  }
  const [killerName, _killedAgo = ''] = _killerNameAndKilledAgo.split('|').map(x => x.trim());
  if (killerName === undefined) {
    console.error('Failed to parse killer name');
    return null;
  }
  const [timeQuantityString, timeUnit = '', ] = _killedAgo.split(' ').map(x => x.trim());
  if (timeQuantityString === undefined) {
    console.error('Failed to parse killed time');
    return null;
  }

  // Assume a small latency
  let msSinceDeath = 30 * SECOND;

  switch (timeUnit) {
    case 'second':
    case 'seconds':
    case 'sec':
    case 'secs':
      msSinceDeath += Number.parseInt(timeQuantityString, 10) * SECOND;
      break;
    case 'minute':
    case 'minutes':
    case 'min':
    case 'mins':
      msSinceDeath += Number.parseInt(timeQuantityString, 10) * MINUTE;
      break;
    case 'hour':
    case 'hours':
      msSinceDeath += Number.parseInt(timeQuantityString, 10) * HOUR;
      break;
  }

  try {
    return createBossDeath(
      bossName,
      killerName,
      msSinceDeath,
    );
  } catch (err) {
    if (err instanceof InvalidBossName) {
      return null;
    }
    throw err;
  }
}

function createBossDeath(boss: string, killer: string, msSinceDeath: number): BossDeath {
  if (!(boss in BOSS_CONFIG)) throw new InvalidBossName(boss);
  const bossName = boss as BossName;

  const timeOfDeath = Date.now() - msSinceDeath;
  const timeOfNextSpawn = calculateNextSpawn(timeOfDeath, BOSS_CONFIG[bossName]);

  return {
    bossName: bossName,
    killer: killer,
    timeLastDeath: timeOfDeath,
    timeNextSpawn: timeOfNextSpawn,
  };
}

function calculateNextSpawn(deathTime: number, bossConfig: BossConfig): number {
  const { respawn, schedule, days } = bossConfig;

  // Handle simplistic respawn mechanics
  if (respawn) {
    return deathTime + respawn;
  }

  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    // Shift into UTC+3 so getUTC* methods return game-server-local calendar fields.
    const shiftedTime = new Date(deathTime + SCHEDULE_TZ_OFFSET + dayOffset * DAY);
    if (!days.includes(shiftedTime.getUTCDay())) continue;

    for (const time of schedule) {
      const [hh, mm] = time.split(':').map(n => Number.parseInt(n, 10));
      // Build wall-clock time in UTC+3, then translate back to a real UTC timestamp.
      const wallClockUtc = Date.UTC(
        shiftedTime.getUTCFullYear(),
        shiftedTime.getUTCMonth(),
        shiftedTime.getUTCDate(),
        hh!, mm!,
      );
      const respawnCandidateTime = wallClockUtc - SCHEDULE_TZ_OFFSET;
      if (respawnCandidateTime > deathTime) return respawnCandidateTime;
    }
  }

  throw new Error('No scheduled spawn found within 14 days.');
}
