import { useEffect, useState } from 'react';
import { api } from '../api/client';

// Баннеры со скидками/акциями. Пытаемся получить с бэкенда (GET /api/banners),
// если недоступно — показываем запасной набор, чтобы блок никогда не был пустым.
const FALLBACK_BANNERS = [
  { id: 1, title: 'Скидка 20% на первый визит', text: 'Промокод: HELLO20', color: '#1ABC9C' },
  { id: 2, title: 'Приведи друга — получи 500 бонусов', text: 'Действует на все услуги', color: '#3498DB' }
];

export default function Banners() {
  const [banners, setBanners] = useState(FALLBACK_BANNERS);

  useEffect(() => {
    api.getBanners()
      .then((data) => {
        if (Array.isArray(data.banners) && data.banners.length > 0) {
          setBanners(data.banners);
        }
      })
      .catch(() => {
        // тихо остаёмся на запасном наборе
      });
  }, []);

  return (
    <div className="banners">
      {banners.map((b) => (
        <div key={b.id} className="banner" style={{ background: b.color || '#1ABC9C' }}>
          <div className="banner-title">{b.title}</div>
          <div className="banner-text">{b.text}</div>
        </div>
      ))}
    </div>
  );
}
