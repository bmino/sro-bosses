import "./index.css";
import { useEffect, useState } from 'react';
import { type BossDeath } from '@/BossService.ts';
import { HOUR, SECOND, MINUTE } from '@/Constants.ts';
import { Reward } from '../config/eventConfig.ts'

export function App() {
  const [uniqueDeaths, setUniqueDeaths] = useState<BossDeath[]>([]);
  const [goldCoinBosses, setGoldCoinBosses] = useState<string[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const fetchDeaths = () => {
      fetch(`api/boss/reward/${Reward.GC}`)
        .then((res) => res.json())
        .then(setGoldCoinBosses)
        .catch(err => console.error("Loading GC bosses failed", err));
    };

    fetchDeaths();
  }, []);

  useEffect(() => {
    const fetchDeaths = () => {
      fetch('api/boss/death')
        .then((res) => res.json())
        .then(setUniqueDeaths)
        .catch(err => console.error("Update failed", err));
    };

    fetchDeaths();

    const apiInterval = setInterval(fetchDeaths, 30 * SECOND);
    return () => clearInterval(apiInterval);
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => setNow(Date.now()), SECOND);
    return () => clearInterval(clockInterval);
  }, []);

  const nextSpawns = [...uniqueDeaths]
    .sort((a, b) => a.timeNextSpawn - b.timeNextSpawn)
    .slice(0, 15);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Legends Radar</h1>
        <div className="live-indicator">LIVE FEED • {new Date(now).toLocaleTimeString()}</div>
      </header>

      <div className="boss-grid">
        {nextSpawns.map((death) => {
          const timeLeft = death.timeNextSpawn - now;
          const isActive = timeLeft <= 0;
          const isUrgent = !isActive && timeLeft < (10 * MINUTE);
          const hasGoldCoinDrop = goldCoinBosses.includes(death.bossName);

          // Calculate progress percentage
          const totalWindow = death.timeNextSpawn - death.timeLastDeath;
          const elapsed = now - death.timeLastDeath;
          const progress = Math.min(Math.max((elapsed / totalWindow) * 100, 0), 100);

          return (
            <div
              key={death.bossName}
              className={`boss-card ${isActive ? 'active' : ''} ${isUrgent ? 'urgent' : ''}`}
            >
              <div className="boss-info">
                <h3 style={{ color: `${hasGoldCoinDrop ? 'gold' : 'white'}` }}>{death.bossName}</h3>
                <div className="killer-tag">
                  Last Killed by <span className="killer-name">{death.killer}</span>
                </div>
              </div>

              <div className="timer-section">
                <div className="countdown">
                  {formatCountdown(death.timeNextSpawn, now)}
                </div>
                <div className="spawn-time" hidden={isActive}>
                  {new Date(death.timeNextSpawn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>

              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatCountdown(targetMs: number, now: number): string {
  const diff = targetMs - now;
  if (diff <= 0) return "ACTIVE";

  const h = Math.floor(diff / HOUR);
  const m = Math.floor((diff % HOUR) / MINUTE);
  const s = Math.floor((diff % MINUTE) / SECOND);

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}