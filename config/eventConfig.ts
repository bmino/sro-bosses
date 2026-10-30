const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const SCHEDULE_TZ_OFFSET = 3 * HOUR;

export const DAY_KEYS: (keyof ScheduledRespawnConfig)[] = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

export enum Reward {
  GC = 'Gold Coin',
  SC = 'Silver Coin',
  BC = 'Bronze Coin',
  LGC = 'Legends Gold Coin',
  LSC = 'Legends Silver Coin',
}

export interface ScheduledRespawnConfig {
  MON?:  string[];
  TUE?:  string[];
  WED?:  string[];
  THUR?: string[];
  FRI?:  string[];
  SAT?:  string[];
  SUN?:  string[];
}

export interface BossConfig {
  respawn:
    | { interval: number; schedule?: never; }
    | { interval?: never; schedule: ScheduledRespawnConfig; };
  rewards: Reward[];
}

const defineBosses = <K extends string>(config: Record<K, BossConfig>) => config;
export const BOSS_CONFIG = defineBosses({
  'Ancient Librarian':                 { respawn: { interval:  8.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Captain Ivy':                       { respawn: { interval:    2 * HOUR }, rewards: [] },
  'Cerberus':                          { respawn: { interval:    1 * HOUR }, rewards: [] },
  'Demon Shaitan':                     { respawn: { interval:  5.5 * HOUR }, rewards: [] },
  'Desert Beast [INT]':                { respawn: { interval:  9.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Desert Beast [STR]':                { respawn: { interval:  9.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Desert Scorpion':                   { respawn: { interval:  4.5 * HOUR }, rewards: [] },
  'Gnome Earth Element [STR]':         { respawn: { interval:  6.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Goria':                             { respawn: { interval:    3 * HOUR }, rewards: [] },
  'Hew Snake General [STR]':           { respawn: { interval:  7.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Isyutaru':                          { respawn: { interval:    4 * HOUR }, rewards: [] },
  'Jung Snake General [INT]':          { respawn: { interval:  7.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Ki Snake General [INT]':            { respawn: { interval:  7.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Lost Pharaoh':                      { respawn: { interval:  8.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Lord Yarkan':                       { respawn: { interval:    5 * HOUR }, rewards: [] },
  'Mangyang':                          { respawn: { interval:  0.5 * HOUR }, rewards: [] },
  'Movia':                             { respawn: { interval:  0.5 * HOUR }, rewards: [] },
  'Salamander Fire Element [STR]':     { respawn: { interval:  6.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Salt Desert Demon':                 { respawn: { interval: 10.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sand Monster [INT]':                { respawn: { interval:  6.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sand Monster [STR]':                { respawn: { interval:  6.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper':              { respawn: { interval:  7.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper [INT]':        { respawn: { interval:  7.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper [STR]':        { respawn: { interval:  7.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sphinx (INT)':                      { respawn: { interval:  9.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sphinx (STR)':                      { respawn: { interval:  9.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sylph Wind Element [INT]':          { respawn: { interval:  6.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Tai-Sui':                           { respawn: { interval:    2 * HOUR }, rewards: [] },
  'Taishan':                           { respawn: { interval:  3.5 * HOUR }, rewards: [] },
  'Tiger Girl':                        { respawn: { interval:    1 * HOUR }, rewards: [] },
  'Tomb General Bi':                   { respawn: { interval:    6 * HOUR }, rewards: [] },
  'Tomb General Jin':                  { respawn: { interval:    6 * HOUR }, rewards: [] },
  'Tomb General Ho':                   { respawn: { interval:    6 * HOUR }, rewards: [] },
  'Tomb General Hyun':                 { respawn: { interval:    6 * HOUR }, rewards: [] },  
  'Undine Water Element[INT]':         { respawn: { interval:  6.5 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Uruchi':                            { respawn: { interval:    3 * HOUR }, rewards: [] },
  'Yul Snake General [STR]':           { respawn: { interval:  7.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Shadow Beast':                      { respawn: { interval:  6.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Shadow Master':                     { respawn: { interval: 12.0 * HOUR }, rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Selket': {
    respawn: {
      schedule: {
        MON:  ['06:30', '12:30', '18:30'],
        TUE:  ['06:30', '12:30', '18:30'],
        WED:  ['06:30', '12:30', '18:30'],
        THUR: ['06:30', '12:30', '18:30'],
        FRI:  ['06:30', '12:30', '18:30'],
        SAT:  ['06:30', '12:30'],
        SUN:  ['06:30', '12:30', '18:30'],
      },
    },
    rewards: [Reward.GC, Reward.SC],
  },
  'Neith': {
    respawn: {
      schedule: {
        MON:  ['06:30', '12:30', '18:30'],
        TUE:  ['06:30', '12:30', '18:30'],
        WED:  ['06:30', '12:30', '18:30'],
        THUR: ['06:30', '12:30', '18:30'],
        FRI:  ['06:30', '12:30', '18:30'],
        SAT:  ['06:30', '12:30'],
        SUN:  ['06:30', '12:30', '18:30'],
      },
    },
    rewards: [Reward.GC, Reward.SC],
  },
  'Isis': {
    respawn: {
      schedule: {
        MON:  ['07:30', '14:30', '20:30'],
        TUE:  ['07:30', '14:30', '20:30'],
        WED:  ['07:30', '14:30', '20:30'],
        THUR: ['07:30', '14:30', '20:30'],
        FRI:  ['07:30', '14:30', '20:30'],
        SAT:  ['07:30', '14:30', '20:30'],
        SUN:  ['07:30', '14:30'],
      },
    },
    rewards: [Reward.GC, Reward.SC],
  },
  'Anubis': {
    respawn: {
      schedule: {
        MON:  ['07:30', '14:30', '20:30'],
        TUE:  ['07:30', '14:30', '20:30'],
        WED:  ['07:30', '14:30', '20:30'],
        THUR: ['07:30', '14:30', '20:30'],
        FRI:  ['07:30', '14:30', '20:30'],
        SAT:  ['07:30', '14:30', '20:30'],
        SUN:  ['07:30', '14:30'],
      },
    },
    rewards: [Reward.GC, Reward.SC],
  },
  'Haroeris':                   { respawn: { schedule: { SAT: ['18:30'] } }, rewards: [Reward.GC, Reward.SC] },
  'Seth':                       { respawn: { schedule: { SAT: ['18:30'] } }, rewards: [Reward.GC, Reward.SC] },
  'Beakyung The White Viper':   { respawn: { schedule: { FRI: ['21:30'] } }, rewards: [Reward.GC, Reward.SC] },
  'The Roc':                    { respawn: { schedule: { SAT: ['21:30'] } }, rewards: [Reward.GC, Reward.SC] },
});

export type BossName = keyof typeof BOSS_CONFIG;
