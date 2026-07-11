<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
        {Object.keys(servicesData).map((branch) => (
          <button
            key={branch}
            onClick={() => setSelectedBranch(branch)}
            style={{
              padding: '10px 20px',
              background: selectedBranch === branch ? '#1ABC9C' : 'white',
              color: selectedBranch === branch ? 'white' : '#2C3E50',
              border: '1px solid #1ABC9C',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Список услуг */}
      {Object.entries(servicesData[selectedBranch]).map(([name, prices]) => (
        <div
          key={name}
          style={{
            background: 'white',
            padding: '16px',
            marginBottom: '12px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '4px solid #1ABC9C',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', color: '#2C3E50' }}>{name}</h3>
          <div>
            {Object.entries(prices).map(([duration, price]) => (
              <span key={duration} style={{ marginRight: '16px', color: '#7F8C8D' }}>
                <strong>{duration}</strong>: {price} ₽
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
