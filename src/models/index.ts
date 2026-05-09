import {type BossName} from '../../config/eventConfig.ts';

export type BossDeath = {
  bossName: BossName;
  killer: string;
  timeLastDeath: number;
  timeNextSpawn: number;
};

export type ServerStatus = {
  timeLastOnline: number;
  timeLastOffline: number;
};
