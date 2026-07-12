import { useNavigate } from 'react-router-dom';
import Banners from './Banners';
import NavBar from './NavBar';

export default function Home({ authError }) {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Главное меню</h1>

      {authError && (
        <div className="error-banner">
          Не удалось связаться с сервером ({authError}). Часть функций может быть недоступна.
        </div>
      )}

      <Banners />

      <div className="menu-grid">
        <div className="menu-item" onClick={() => navigate('/booking')}>📅 Запись на процедуру</div>
        <div className="menu-item" onClick={() => navigate('/benefit')}>🎁 Бонусы и акции</div>
        <div className="menu-item" onClick={() => navigate('/ranking')}>⭐ Мой прогресс</div>
        <div className="menu-item" onClick={() => navigate('/profile')}>👤 Личный кабинет</div>
      </div>

      <NavBar />
    </div>
  );
}
