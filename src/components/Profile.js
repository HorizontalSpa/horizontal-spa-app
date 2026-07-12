import { useEffect, useState } from 'react';
import { api } from '../api/client';
import NavBar from './NavBar';

const SERVICE_LABELS = {
  massage: 'Массаж',
  facial: 'Уход за лицом',
  laser: 'Лазерная эпиляция',
  manicure: 'Маникюр'
};

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackFor, setFeedbackFor] = useState(null);

  const load = () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([api.getUser(userId), api.getAppointments(userId)])
      .then(([userData, apptData]) => {
        setUser(userData.user);
        setAppointments(apptData.appointments || []);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [userId]);

  const submitFeedback = async (appointmentId, rating) => {
    try {
      await api.sendFeedback({ userId, appointmentId, rating });
      setFeedbackFor(null);
      load();
    } catch (e) {
      alert('Не удалось отправить оценку: ' + e.message);
    }
  };

  if (!userId) {
    return (
      <div className="page">
        <h1 className="page-title">Личный кабинет</h1>
        <div className="error-banner">Не удалось определить пользователя.</div>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Личный кабинет</h1>

      {loading && <p>Загрузка...</p>}
      {error && <div className="error-banner">{error}</div>}

      {user && (
        <div className="profile-summary">
          <div className="profile-stat">
            <div className="profile-stat-value">{user.balance ?? 0}</div>
            <div className="profile-stat-label">бонусов</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{user.visits ?? 0}</div>
            <div className="profile-stat-label">визитов</div>
          </div>
        </div>
      )}

      <h2 className="section-title">История записей</h2>
      {appointments.length === 0 && !loading && <p>Пока нет записей.</p>}
      <div className="appointment-list">
        {appointments.map((a) => (
          <div key={a.id} className="appointment-card">
            <div className="appointment-service">{SERVICE_LABELS[a.service] || a.service}</div>
            <div className="appointment-date">{a.date} в {a.time}</div>
            <div className={`appointment-status status-${a.status}`}>{a.status}</div>

            {a.status === 'completed' && !a.rating && (
              feedbackFor === a.id ? (
                <div className="feedback-row">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="star-btn" onClick={() => submitFeedback(a.id, n)}>{n}⭐</button>
                  ))}
                </div>
              ) : (
                <button className="btn-secondary" onClick={() => setFeedbackFor(a.id)}>Оставить отзыв</button>
              )
            )}
          </div>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
