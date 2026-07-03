import db from '../db.ts';
import { type ServerStatus } from '@/models';

const selectStatus = db.prepare<ServerStatus, []>(`
  SELECT time_last_online AS timeLastOnline, time_last_offline AS timeLastOffline
  FROM server_status WHERE id = 1
`);

const setOnline = db.prepare<void, [number]>(`
  UPDATE server_status SET time_last_online = ? WHERE id = 1
`);

const setOffline = db.prepare<void, [number]>(`
  UPDATE server_status SET time_last_offline = ? WHERE id = 1
`);

export function readJson(): ServerStatus {
  return selectStatus.get()!;
}

export function updateTimeLastOnline(time: number): void {
  setOnline.run(time);
}

export function updateTimeLastOffline(time: number): void {
  setOffline.run(time);
}
