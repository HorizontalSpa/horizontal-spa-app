import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2C3E50', textAlign: 'center', marginBottom: '24px' }}>
        Добро пожаловать в Horizontal Spa!
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div 
          onClick={() => navigate('/services')}
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧖</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Услуги и цены</h3>
        </div>

        <div 
          onClick={() => navigate('/branches')}
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📍</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Наши филиалы</h3>
        </div>

        <div 
          onClick={() => navigate('/benefit')}
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎁</div>
          <h3 style={{ margin: '0', color: '#2C3E50' }}>Бонусы и акции</h3>
        </div>

        <div 
          onClick={() => navigate('/profile')}
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
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
