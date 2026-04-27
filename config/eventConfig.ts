const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const SUN = 0;
const MON = 1;
const TUE = 2;
const WED = 3;
const THUR = 4;
const FRI = 5;
const SAT = 6;

export const SCHEDULE_TZ_OFFSET = 3 * HOUR;

interface EventConfig {
  times: string[];
  days: number[];
}

export const EVENT_CONFIG = {
  'Battle Arena (Flag)':       { times: ['12:00', '20:00'],                                       days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'Battle Arena (Score)':      { times: ['04:00', '08:00', '16:00'],                              days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'Beakyung The White Viper':  { times: ['21:30'],                                                days: [FRI] },
  'Capture The Flag':          { times: ['01:00', '05:00', '09:00', '13:00', '17:00', '21:00'],   days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'Fortress War':              { times: ['21:30'],                                                days: [SUN] },
  'Guild Wars':                { times: ['20:30'],                                                days: [SUN] },
  'Haroesis & Seth':           { times: ['18:30'],                                                days: [SUN] },
  'Isis & Anubis':             { times: ['07:30', '14:30', '20:30'],                              days: [MON, TUE, WED, THUR, FRI, SAT] },
  'Last Man Standing':         { times: ['11:30', '23:30'],                                       days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'Selket & Neith':            { times: ['06:30', '12:30', '18:30'],                              days: [MON, TUE, WED, THUR, FRI, SAT] },
  'Special Goods Time':        { times: ['03:30', '09:30', '15:30', '21:30'],                     days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'Survival Arena':            { times: ['11:00', '23:00'],                                       days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
  'The Roc':                   { times: ['21:30'],                                                days: [SAT] },
  'Tower Defense':             { times: ['17:30'],                                                days: [SUN, FRI, SAT] },
  'War of Leagues':            { times: ['19:30'],                                                days: [SUN, MON, TUE, WED, THUR, FRI, SAT] },
} satisfies Record<string, EventConfig>;

export type EventName = keyof typeof EVENT_CONFIG;

export enum REWARD {
  GOLD_COIN,
  SILVER_COIN,
  BRONZE_COIN,
  LEGENDS_GOLD_COIN,
  LEGENDS_SILVER_COIN,
}

export interface BossConfig {
  respawn: number | undefined;
  days: number[];
  schedule: string[];
  rewards: REWARD[];
}

export const BOSS_CONFIG = {
  'Ancient Librarian':                 { respawn:  8.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Desert Beast [INT]':                { respawn:  9.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Desert Beast [STR]':                { respawn:  9.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Gnome Earth Element [STR]':         { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Hew Snake General [STR]':           { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Jung Snake General [INT]':          { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Ki Snake General [INT]':            { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Lost Pharaoh':                      { respawn:  8.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Poison Frog':                       { respawn: 12.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Poison Spider':                     { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Salamander Fire Element [STR]':     { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Salt Desert Demon':                 { respawn: 10.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Sand Monster [INT]':                { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Sand Monster [STR]':                { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'SoSo The Black Viper':              { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'SoSo The Black Viper [INT]':        { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'SoSo The Black Viper [STR]':        { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Sphinx (INT)':                      { respawn:  9.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Sphinx (STR)':                      { respawn:  9.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Sylph Wind Element [INT]':          { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Undine Water Element[INT]':         { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Yul Snake General [STR]':           { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [REWARD.SILVER_COIN, REWARD.BRONZE_COIN, REWARD.LEGENDS_SILVER_COIN] },
  'Selket':                            { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT],      schedule: ['06:30', '12:30', '18:30'],            rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
  'Neith':                             { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT],      schedule: ['06:30', '12:30', '18:30'],            rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
  'Isis':                              { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT],      schedule: ['07:30', '14:30', '20:30'],            rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
  'Anubis':                            { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT],      schedule: ['07:30', '14:30', '20:30'],            rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
  'Haroesis':                          { respawn:   undefined, days: [SUN],                                schedule: ['18:30'],                              rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
  'Seth':                              { respawn:   undefined, days: [SUN],                                schedule: ['18:30'],                              rewards: [REWARD.GOLD_COIN, REWARD.SILVER_COIN] },
} satisfies Record<string, BossConfig>;

export type BossName = keyof typeof BOSS_CONFIG;
