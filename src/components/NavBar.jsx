import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { path: '/home', icon: '🏠', label: 'Главная' },
  { path: '/booking', icon: '📅', label: 'Запись' },
  { path: '/benefit', icon: '🎁', label: 'Бонусы' },
  { path: '/ranking', icon: '⭐', label: 'Прогресс' },
  { path: '/profile', icon: '👤', label: 'Профиль' }
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="nav-bar">
      {items.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
