import {serve} from 'bun';
import index from './index.html';
import db from './db.ts';
import {BOSS_CONFIG, Reward} from '../config/eventConfig.ts';
import {
  cleanseDeathsWhileOffline,
  crawlFrontPage,
  getBossConfig,
  getBossDeaths,
  getBossNames,
  getServerStatus,
  removeBossDeath,
  reportBossDeath,
} from '@/services/BossService.ts';
import {HOUR, MINUTE} from '@/Constants.ts';

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/boss': {
      GET: async () => {
        return Response.json(getBossNames());
      },
    },

    '/api/boss/reward/:reward': {
      GET: async (req) => {
        const { reward } = req.params;
        if (!Object.values(Reward).includes(reward as Reward)) return new Response('Invalid reward', { status: 400 });
        const bossNamesWithGoldCoinDrop = Object.entries(BOSS_CONFIG)
          .filter(([, bossConfig]) => bossConfig.rewards.includes(reward as Reward))
          .map(([bossName,]) => bossName);
        return Response.json(bossNamesWithGoldCoinDrop);
      },
    },

    '/api/boss/death': {
      GET: async () => {
        const bossDeaths = await getBossDeaths();
        return Response.json(bossDeaths);
      },
      POST: async (req) => {
        const auth = req.headers.get('Authorization');
        if (auth !== `Bearer ${process.env.PASSWORD}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        const {name, killer, h, m} = await req.json();

        if (name === undefined) return new Response('Missing parameter: name', { status: 400 });
        if (killer === undefined) return new Response('Missing parameter: killer', { status: 400 });
        if (h === undefined) return new Response('Missing parameter: h', { status: 400 });
        if (m === undefined) return new Response('Missing parameter: m', { status: 400 });
        if (!getBossNames().includes(name)) return new Response('Invalid name', { status: 400 });
        if (killer.length === 0) return new Response('Invalid killer', { status: 400 });
        if (Number.isNaN(h) || h < 0) return new Response('Invalid h', { status: 400 });
        if (Number.isNaN(m) || m < 0) return new Response('Invalid m', { status: 400 });

        try {
          await reportBossDeath(name, killer, (h * HOUR) + (m * MINUTE));
          return new Response('Updated');
        } catch (err) {
          if (err instanceof Error) {
            return new Response(err.message, { status: 500 });
          } else {
            return new Response('Unknown error', { status: 500 });
          }
        }
      },
      DELETE: async (req) => {
        const auth = req.headers.get('Authorization');
        if (auth !== `Bearer ${process.env.PASSWORD}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        const {name} = await req.json();

        if (name === undefined) return new Response('Missing parameter: name', { status: 400 });
        if (!getBossNames().includes(name)) return new Response('Invalid name', { status: 400 });

        try {
          await removeBossDeath(name);
          return new Response('Removed');
        } catch (err) {
          if (err instanceof Error) {
            return new Response(err.message, { status: 500 });
          } else {
            return new Response('Unknown error', { status: 500 });
          }
        }
      },
    },

    '/api/boss/config': {
      GET: async () => {
        return Response.json(getBossConfig());
      },
    },

    '/api/reward': {
      GET: async () => {
        return Response.json(Object.values(Reward));
      },
    },

    '/api/server': {
      GET: async () => {
        const serverStatus = await getServerStatus();
        return Response.json(serverStatus);
      },
    },

    '/api/*': new Response('Not Found', { status: 404 }),
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

Bun.cron('* * * * *', async () => {
  console.log(`--- Cron tick at ${new Date().toLocaleTimeString()} ---`);
  await crawlFrontPage();
  await cleanseDeathsWhileOffline();
});


async function shutdown() {
  console.log('Shutting down ...');
  await server.stop(true);
  db.close();
  console.log('Done');
  process.exit(0);
}

process.on('SIGINT', shutdown);   // Ctrl+C
process.on('SIGTERM', shutdown);  // Docker stop, kill, etc.
