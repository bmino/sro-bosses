import { chmod } from 'node:fs/promises';
const SERVER_STATUS_FILE_NAME = './data/SERVER_STATUS.json';
const SERVER_STATUS_FILE = Bun.file(SERVER_STATUS_FILE_NAME);
import {type ServerStatus} from '@/models';

export async function initializeData() {
  if (await SERVER_STATUS_FILE.exists()) {
    try {
      const text = await SERVER_STATUS_FILE.text();
      if (JSON.parse(text)) return;
    } catch (e) {}
  }

  console.log(`Initializing ${SERVER_STATUS_FILE.name}`);
  await Bun.write(SERVER_STATUS_FILE, JSON.stringify({
    timeLastOnline: 0,
    timeLastOffline: 0,
  } as ServerStatus));
  await chmod(SERVER_STATUS_FILE_NAME , 0o664);
}

export async function createJson(json: ServerStatus): Promise<number> {
  return await Bun.write(SERVER_STATUS_FILE, JSON.stringify(json));
}

export async function readJson(): Promise<ServerStatus> {
  return await SERVER_STATUS_FILE.json();
}

export async function updateTimeLastOnline(timeLastOnline: number): Promise<void> {
  const serverStatusJson: ServerStatus = await SERVER_STATUS_FILE.json();

  serverStatusJson.timeLastOnline = timeLastOnline;

  await createJson(serverStatusJson);
}

export async function updateTimeLastOffline(timeLastOffline: number): Promise<void> {
  const serverStatusJson: ServerStatus = await SERVER_STATUS_FILE.json();

  serverStatusJson.timeLastOffline = timeLastOffline;

  await createJson(serverStatusJson);
}
