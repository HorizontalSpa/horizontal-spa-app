import { useEffect, useState } from 'react';
import { api } from '../api/client';

// Определяет, открыто ли приложение внутри Telegram, и авторизует пользователя
// на бэкенде (создаёт/находит запись клиента в БД), возвращая его userId.
export default function useTelegramUser() {
  const [isTelegramApp, setIsTelegramApp] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tgUser, setTgUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const tg = window.Telegram?.WebApp;
        tg?.ready?.();
        tg?.expand?.();

        const inTelegram = !!(tg && tg.initDataUnsafe && Object.keys(tg.initDataUnsafe).length > 0);
        setIsTelegramApp(inTelegram);
        setTgUser(tg?.initDataUnsafe?.user || null);

        if (inTelegram) {
          const result = await api.auth(tg.initData || 'dev-mode');
          setUserId(result.userId);
        }
      } catch (e) {
        console.warn('Ошибка авторизации Telegram:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { isTelegramApp, userId, tgUser, loading, error };
}
