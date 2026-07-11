М Д, [11 июля 2026 г., 16:43:51]:
...}
}


М Д, [11 июля 2026 г., 16:45:08]:
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import Home from "./components/Home";
import Benefit from "./components/Benefit";
import Ranking from "./components/Ranking";
import Profile from "./components/Profile";
import WebVersion from "./components/WebVersion";
import { detectLanguage, loadContent } from "./utils/appLocalization.js";
import useSubid from "./hooks/useSubid";
import './App.css';
import Branches from "./components/Branches";

function App() {
  const [isTelegramApp, setIsTelegramApp] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const subid = useSubid();
  const sentRef = useRef(false);

  // Отправка постбека (не трогай)
  useEffect(() => {
    if (!subid || sentRef.current) return;
    sentRef.current = true;
    const url = https://rooroquaphou.beget.app?payout=0&status=lead&from=TG&subid=${encodeURIComponent(subid)}&status=open;
    fetch(url, { method: "GET", mode: "no-cors" }).catch((e) => console.warn("Keitaro postback failed", e));
  }, [subid]);

  // ГЛАВНЫЙ ФИКС: загружаем язык и проверяем Telegram с задержкой
  useEffect(() => {
    // Загружаем язык
    const lang = detectLanguage();
    const localization = loadContent(lang);
    setContent(localization);

    // Даём время на загрузку Telegram WebApp (300 миллисекунд)
    const timer = setTimeout(() => {
      try {
        const tg = window.Telegram?.WebApp;
        const inTelegram = tg && typeof tg.initDataUnsafe === "object" && Object.keys(tg.initDataUnsafe).length > 0;
        setIsTelegramApp(inTelegram);
        setLoading(false);
      } catch (error) {
        console.warn("Ошибка при проверке Telegram:", error);
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
    <Route path="/branches" element={<Branches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
