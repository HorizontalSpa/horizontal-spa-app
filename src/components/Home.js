import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2C3E50', textAlign: 'center' }}>Главное меню</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div onClick={() => navigate('/services')} style={menuItemStyle}>🧖 Услуги</div>
        <div onClick={() => navigate('/branches')} style={menuItemStyle}>📍 Филиалы</div>
        <div onClick={() => navigate('/benefit')} style={menuItemStyle}>🎁 Бонусы</div>
        <div onClick={() => navigate('/profile')} style={menuItemStyle}>👤 Профиль</div>
      </div>
    </div>
  );
}

const menuItemStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  textAlign: 'center',
  border: '1px solid #e0e0e0',
  fontWeight: '500',
  color: '#2C3E50'
};
