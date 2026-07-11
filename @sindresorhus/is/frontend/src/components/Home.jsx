import { useNavigate } from "react-router-dom";

export default function Home({ content }) {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '24px' }}>Главное меню</h1>
      
      <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div 
          className="menu-item" 
          onClick={() => navigate('/services')}
          style={{
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: '0.3s',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧖</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Услуги и цены</h3>
        </div>

        <div 
          className="menu-item" 
          onClick={() => navigate('/branches')}
          style={{
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: '0.3s',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Наши филиалы</h3>
        </div>

        <div 
          className="menu-item" 
          onClick={() => navigate('/benefit')}
          style={{
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: '0.3s',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎁</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Бонусы и акции</h3>
        </div>

        <div 
          className="menu-item" 
          onClick={() => navigate('/profile')}
          style={{
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: '0.3s',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>👤</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Личный кабинет</h3>
        </div>
      </div>
    </div>
  );
}
