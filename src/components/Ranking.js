import { useEffect, useState } from 'react';
import { api } from '../api/client';
import NavBar from './NavBar';

const MILESTONE = 10;

export default function Ranking({ userId }) {
  const [visits, setVisits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    api.getUser(userId)
      .then((data) => setVisits(data.user?.visits ?? 0))
      .finally(() => setLoading(false));
  }, [userId]);

  const progress = Math.min(100, Math.round(((visits % MILESTONE) / MILESTONE) * 100));

  return (
    <div className="page">
      <h1 className="page-title">Мой прогресс</h1>

      {loading ? <p>Загрузка...</p> : (
        <div className="rules-card">
          <p>Визитов всего: <b>{visits}</b></p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${visits > 0 ? progress : 0}%` }} />
          </div>
          <p>
            {visits === 0
              ? `Запишитесь на первую процедуру, чтобы начать копить визиты к подарку за ${MILESTONE} посещений.`
              : `До следующего подарка осталось визитов: ${visits % MILESTONE === 0 ? MILESTONE : MILESTONE - (visits % MILESTONE)}`}
          </p>
        </div>
      )}

      <NavBar />
    </div>
  );
}
