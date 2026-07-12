import { useState } from 'react';
import { api } from '../api/client';
import NavBar from './NavBar';

export default function Benefit({ userId }) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');

  const submitReferral = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setStatus('sending');
    try {
      await api.sendReferrals({ userId, referrals: [{ phone }] });
      setStatus('done');
      setPhone('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Бонусы и акции</h1>

      <div className="rules-card">
        <h2 className="section-title">Как копить бонусы</h2>
        <ul>
          <li>За каждый визит начисляются бонусы на баланс</li>
          <li>За отзыв о посещении — дополнительные бонусы</li>
          <li>Приведи друга по номеру телефона — бонусы вам обоим после его первого визита</li>
          <li>После 10 визитов — подарок от студии</li>
        </ul>
      </div>

      <div className="rules-card">
        <h2 className="section-title">Пригласить друга</h2>
        <form className="form" onSubmit={submitReferral}>
          <label>
            Телефон друга
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 900 000-00-00"
              required
            />
          </label>
          <button className="btn-primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправка...' : 'Отправить'}
          </button>
          {status === 'done' && <p>Спасибо! Мы свяжемся с вашим другом.</p>}
          {status === 'error' && <div className="error-banner">Не удалось отправить, попробуйте позже.</div>}
        </form>
      </div>

      <NavBar />
    </div>
  );
}
