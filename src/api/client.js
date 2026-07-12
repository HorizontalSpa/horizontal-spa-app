// Общий помощник для запросов к бэкенду.
// В dev-режиме Vite проксирует /api на локальный сервер (см. vite.config.js).
// В production фронтенд и бэкенд раздаются одним и тем же сервером (server-render.js),
// поэтому относительный путь /api работает без дополнительной настройки.

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error('Некорректный ответ сервера');
  }

  if (!res.ok || data.success === false) {
    throw new Error(data.message || 'Ошибка сервера');
  }

  return data;
}

export const api = {
  auth: (initData) => request('/auth', { method: 'POST', body: JSON.stringify({ initData }) }),
  getUser: (userId) => request(`/user/${userId}`),
  getMasters: () => request('/masters'),
  getBanners: () => request('/banners'),
  createAppointment: (payload) => request('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  getAppointments: (userId) => request(`/appointments/${userId}`),
  sendFeedback: (payload) => request('/feedback', { method: 'POST', body: JSON.stringify(payload) }),
  sendReferrals: (payload) => request('/referrals', { method: 'POST', body: JSON.stringify(payload) }),
  getFaqs: () => request('/faqs')
};
