import React from 'react';

const branches = [
  {
    id: 1,
    name: "На Патриарших",
    address: "Малая Бронная 20с2",
    metro: "м. Пушкинская (5–7 мин)",
    hours: "Ежедневно с 10:00 до 22:00",
    phone: "+7 (925) 075-46-98",
    mapLink: "https://maps.google.com/?q=Малая+Бронная+20с2",
    image: "🏛️",
    special: "Скидка 15% по промокоду ГОРИЗОНТАЛЬ15"
  },
  {
    id: 2,
    name: "В Ватутинках",
    address: "3-я Нововатутинская, 8",
    metro: "м. Новомосковская (в пешей доступности)",
    hours: "Ежедневно с 10:00 до 22:00",
    phone: "+7 (925) 075-46-98",
    mapLink: "https://maps.google.com/?q=Нововатутинская+8",
    image: "🏡",
    special: "Балийский и тайский массаж от мастеров из Азии"
  },
  {
    id: 3,
    name: "На Курской",
    address: "Земляной Вал 3/1 с6",
    metro: "м. Курская/Чкаловская (5–7 мин)",
    hours: "Ежедневно с 10:00 до 22:00",
    phone: "+7 (925) 075-46-98",
    mapLink: "https://maps.google.com/?q=Земляной+Вал+3/1+с6",
    image: "🚇",
    special: "Кедровая бочка и парные спа-программы"
  }
];

const Branches = () => {
  return (
    <div className="branches-container" style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '24px' }}>Наши филиалы</h1>
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="branch-card"
          style={{
            background: '#FFFFFF',
            padding: '20px',
            marginBottom: '16px',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            borderLeft: '4px solid #1ABC9C',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px' }}>{branch.image}</span>
            <h3 style={{ margin: '0', color: '#2C3E50' }}>{branch.name}</h3>
          </div>
          <p style={{ margin: '4px 0' }}>📍 {branch.address}</p>
          <p style={{ margin: '4px 0', color: '#7F8C8D' }}>🚇 {branch.metro}</p>
          <p style={{ margin: '4px 0' }}>🕐 {branch.hours}</p>
          <p style={{ margin: '4px 0' }}>📞 {branch.phone}</p>
          <p style={{ margin: '8px 0', color: '#1ABC9C', fontWeight: '500', fontSize: '14px' }}>✨ {branch.special}</p>
          <a
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              background: '#1ABC9C',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              transition: '0.3s'
            }}
          >
            🗺️ Открыть в картах
          </a>
        </div>
      ))}
    </div>
  );
};

export default Branches;
