import { useNavigate } from 'react-router-dom';

export default function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="welcome-card">
      <h1>Добро пожаловать в Horizontal Spa</h1>
      <p>Сеть массажных студий в Москве</p>
      <button className="btn-primary" onClick={() => navigate('/home')}>
        Перейти в каталог
      </button>
    </div>
  );
}
