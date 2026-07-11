import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeCard({ content }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#2C3E50' }}>Добро пожаловать в Horizontal Spa</h1>
      <p style={{ color: '#7F8C8D', marginBottom: '20px' }}>
        {content?.subtext || 'Сеть массажных студий в Москве'}
      </p>
      <button
        onClick={handleStart}
        style={{
          background: '#1ABC9C',
          color: 'white',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {content?.buttonText || 'Перейти в каталог'}
      </button>
    </div>
  );
}
