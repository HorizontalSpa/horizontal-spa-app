import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomeCard from './components/WelcomeCard';
import Home from './components/Home';
import Booking from './components/Booking';
import Benefit from './components/Benefit';
import Ranking from './components/Ranking';
import Profile from './components/Profile';
import WebVersion from './components/WebVersion';
import useTelegramUser from './hooks/useTelegramUser';
import './App.css';

function App() {
  const { isTelegramApp, userId, loading, error } = useTelegramUser();

  if (loading) {
    return (
      <div className="app-loader">Загрузка...</div>
    );
  }

  if (!isTelegramApp) {
    return <WebVersion />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="/home" element={<Home userId={userId} authError={error} />} />
        <Route path="/booking" element={<Booking userId={userId} />} />
        <Route path="/benefit" element={<Benefit userId={userId} />} />
        <Route path="/ranking" element={<Ranking userId={userId} />} />
        <Route path="/profile" element={<Profile userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
