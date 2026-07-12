import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import NavBar from './NavBar';

const SERVICES = [
  { value: 'massage', label: 'Массаж' },
  { value: 'facial', label: 'Уход за лицом' },
  { value: 'laser', label: 'Лазерная эпиляция' },
  { value: 'manicure', label: 'Маникюр' }
];

const FALLBACK_MASTERS = [
  { id: 'any', name: 'Любой мастер' }
];

export default function Booking({ userId }) {
  const navigate = useNavigate();
  const [masters, setMasters] = useState(FALLBACK_MASTERS);
  const [form, setForm] = useState({
    service: SERVICES[0].value,
    master: 'any',
    date: '',
    time: '',
    comments: ''
  });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    api.getMasters()
      .then((data) => {
        if (Array.isArray(data.masters) && data.masters.length > 0) {
          setMasters([...FALLBACK_MASTERS, ...data.masters]);
        }
      })
      .catch(() => {
        // остаёмся с "Любой мастер"
      });
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setStatus('error');
      setErrorMsg('Не удалось определить пользователя. Откройте приложение через кнопку в боте.');
      return;
    }

    if (!form.date || !form.time) {
      setStatus('error');
      setErrorMsg('Укажите дату и время.');
      return;
    }

    setStatus('sending');
    try {
      await api.createAppointment({
        userId,
        service: form.service,
        master: form.master,
        date: form.date,
        time: form.time,
        comments: form.comments
      });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  if (status === 'done') {
    return (
      <div className="page">
        <h1 className="page-title">Готово!</h1>
        <p>Вы записаны. Подтверждение придёт в этот чат.</p>
        <button className="btn-primary" onClick={() => navigate('/profile')}>Мои записи</button>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Запись на процедуру</h1>

      <form className="form" onSubmit={submit}>
        <label>
          Услуга
          <select value={form.service} onChange={update('service')}>
            {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>

        <label>
          Мастер
          <select value={form.master} onChange={update('master')}>
            {masters.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </label>

        <label>
          Дата
          <input type="date" value={form.date} onChange={update('date')} required />
        </label>

        <label>
          Время
          <input type="time" value={form.time} onChange={update('time')} required />
        </label>

        <label>
          Комментарий
          <textarea value={form.comments} onChange={update('comments')} rows={3} />
        </label>

        {status === 'error' && <div className="error-banner">{errorMsg}</div>}

        <button className="btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Отправка...' : 'Записаться'}
        </button>
      </form>

      <NavBar />
    </div>
  );
}
