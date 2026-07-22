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

export enum Reward {
  GC = 'Gold Coin',
  SC = 'Silver Coin',
  BC = 'Bronze Coin',
  LGC = 'Legends Gold Coin',
  LSC = 'Legends Silver Coin',
}

export interface BossConfig {
  respawn: number | undefined;
  days: number[];
  schedule: string[];
  rewards: Reward[];
}

const defineBosses = <K extends string>(config: Record<K, BossConfig>) => config;
export const BOSS_CONFIG = defineBosses({
  'Ancient Librarian':                 { respawn:  8.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Desert Beast [INT]':                { respawn:  9.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Desert Beast [STR]':                { respawn:  9.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Gnome Earth Element [STR]':         { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Hew Snake General [STR]':           { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Jung Snake General [INT]':          { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Ki Snake General [INT]':            { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Lost Pharaoh':                      { respawn:  8.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Salamander Fire Element [STR]':     { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Salt Desert Demon':                 { respawn: 10.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sand Monster [INT]':                { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sand Monster [STR]':                { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper':              { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper [INT]':        { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'SoSo The Black Viper [STR]':        { respawn:  7.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sphinx (INT)':                      { respawn:  9.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sphinx (STR)':                      { respawn:  9.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Sylph Wind Element [INT]':          { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Undine Water Element[INT]':         { respawn:  6.5 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Yul Snake General [STR]':           { respawn:  7.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Selket':                            { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT, SUN], schedule: ['06:30', '12:30', '18:30'],            rewards: [Reward.GC, Reward.SC] },
  'Neith':                             { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT, SUN], schedule: ['06:30', '12:30', '18:30'],            rewards: [Reward.GC, Reward.SC] },
  'Isis':                              { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT, SUN], schedule: ['07:30', '14:30', '20:30'],            rewards: [Reward.GC, Reward.SC] },
  'Anubis':                            { respawn:   undefined, days: [MON, TUE, WED, THUR, FRI, SAT, SUN], schedule: ['07:30', '14:30', '20:30'],            rewards: [Reward.GC, Reward.SC] },
  'Haroeris':                          { respawn:   undefined, days: [SUN],                                schedule: ['18:30'],                              rewards: [Reward.GC, Reward.SC] },
  'Seth':                              { respawn:   undefined, days: [SUN],                                schedule: ['18:30'],                              rewards: [Reward.GC, Reward.SC] },
  'Fire Demon':                        { respawn:  6.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
  'Fire Cerberus':                     { respawn:  12.0 * HOUR, days: [SUN, MON, TUE, WED, THUR, FRI, SAT], schedule: [],                                     rewards: [Reward.SC, Reward.BC, Reward.LSC] },
});

export type BossName = keyof typeof BOSS_CONFIG;
