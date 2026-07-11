import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeCard from './components/WelcomeCard';
import Home from './components/Home';
import Benefit from './components/Benefit';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import WebVersion from './components/WebVersion';
import { detectLanguage, loadContent } from './utils/appLocalization.js';
import useSubid from './hooks/useSubid';
import './App.css';

function App() {
  const [isTelegramApp, setIsTelegramApp] = React.useState(false);
  const [content, setContent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const subid = useSubid();

  React.useEffect(() => {
    // Загружаем язык
    const lang = detectLanguage();
    const localization = loadContent(lang);
    setContent(localization);

    // Проверяем, открыто ли приложение в Telegram
    const timer = setTimeout(() => {
      try {
        const tg = window.Telegram?.WebApp;
        const inTelegram = tg && typeof tg.initDataUnsafe === 'object' && Object.keys(tg.initDataUnsafe).length > 0;
        setIsTelegramApp(inTelegram);
        setLoading(false);
      } catch (error) {
        console.warn('Ошибка при проверке Telegram:', error);
        setIsTelegramApp(false);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  if (!content) return <div>Ошибка загрузки контента</div>;

  if (!isTelegramApp) {
    return <WebVersion content={content.desktop} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeCard content={content.welcomeCard} />} />
        <Route path="/home" element={<Home content={content.home} />} />
        <Route path="/benefit" element={<Benefit content={content.benefit} />} />
        <Route path="/ranking" element={<Ranking content={content.ranking} />} />
        <Route path="/profile" element={<Profile content={content.profile} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
