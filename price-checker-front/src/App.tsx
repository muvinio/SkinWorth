import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {SearchBarWithSuggest} from './components/searchBarWithSuggest';
import { SearchHistory } from './components/searchHistory'; // Assuming SearchHistory is in components/SearchHistory.tsx
import 'ldrs/ring'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import Header from './components/header';
import Footer from './components/footer';
import './components/css/markets.css'; // Importing the CSS for markets
import { AuthPage } from './components/auth/auth';
import { register } from './components/auth/register';
import { login } from './components/auth/login';
import './components/css/logo.css'; // Importing the CSS for logo


// Default values shown

interface Props {
  onSelect?: (item: string) => void;
}



export default function App() {
  const [selectedSkin, setSelectedSkin] = useState<string>('');
  const [steamPrice, setSteamPrice] = useState<string | null>(null);
  const [marketPrice, setMarketPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const userName = localStorage.getItem('userName') || '';



  // Получение истории
  useEffect(() => {
    if (!userName) return;
    axios.get(`/api/history?userName=${userName}`).then((res) => {
      setHistory(res.data);
    });
  }, [userName]);

  const fetchPrices = async (skinName: string) => {
    if (!skinName.trim()) return;
    setLoading(true);
    setError(null);
    setSteamPrice(null);
    setMarketPrice(null);

    try {
      const res = await axios.get('/api/price', { params: { item: skinName } });
      setSteamPrice(res.data.steamPrice || 'нет данных');
      setMarketPrice(res.data.marketPrice || 'нет данных');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  // Сохранение истории
  const handleSelect = async (skin: string) => {
    setSelectedSkin(skin);
    setInput(skin);

    try {
      await axios.post('/api/history', { userName, skin });
      // После успешного сохранения — обновить историю из бэкенда
      const res = await axios.get(`/api/history?userName=${userName}`);
      setHistory(res.data);
    } catch {}

    fetchPrices(skin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginValue, passwordValue);
    if (success) {
      localStorage.setItem('isAuth', 'true');
      window.location.reload();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(regLogin, regPassword);
    if (success) {
      alert('Регистрация успешна!');
      setShowRegister(false);
    } else {
      alert('Ошибка регистрации');
    }
  };

  // Проверка авторизации (например, через localStorage)
  const isAuth = localStorage.getItem('isAuth') === 'true';

  // Если не авторизован — показываем только страницу авторизации
  if (!isAuth) {
    return <AuthPage />;
  }
  

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <Header
  isAuth={isAuth}
  
  onLogout={() => {
    localStorage.removeItem('isAuth');
    window.location.reload();
  
  }}
  
/>
      <div style={{marginTop: '100px'}}>
              <SearchBarWithSuggest onSelect={handleSelect} value={input} setValue={setInput} />
      </div>

      {selectedSkin && (
        <div style={{ marginTop: '20px' }}>
          <h2>Результаты для: {selectedSkin} {userName}</h2> 
          {loading && <p><Waveform
            size="20"
            stroke="3.5"
            speed="1"
            color="black" 
          /></p> }
          
          {error && <p style={{ color: 'red' }}>{error}
            <p style={{ color: 'black' }}> Попробуйте еще раз</p>
            </p>}
          {steamPrice && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 320,
              marginBottom: 8
            }}>
              <span style={{ width: 90, textAlign: 'left', fontWeight: 'bold', display: 'inline-block' }}>Steam:</span>
              <span style={{ width: 90, textAlign: 'left', display: 'inline-block', marginLeft: 20 }}>{steamPrice} ₽</span>
              <img 
                className="logo"
                src="/uploads/images/steamLogo.jpg"
                alt="Steam"
                style={{ width: 40, height: 40, marginLeft: 20, objectFit: 'contain' }}
              />
            </div>
          )}
          {marketPrice && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 320
            }}>
              <span style={{ width: 90, textAlign: 'left', fontWeight: 'bold', display: 'inline-block' }}>Market:</span>
              <span style={{ width: 90, textAlign: 'left', display: 'inline-block', marginLeft: 20 }}>{marketPrice} ₽</span>
              <img
                className="logo"
                src="/uploads/images/marketCsgoLogo.png"
                alt="Market"
                
                style={{ width: 40, height: 40, marginLeft: 20, objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      )}

      
      {isAuth ? (
        <SearchHistory items={history} onSelect={handleSelect} />
      ) : (
        <div style={{
          position: 'fixed',
          right: 0,
          top: '100px',
          width: '220px',
          background: '#222',
          color: '#fff',
          padding: '24px 0',
          borderRadius: '16px 0 0 16px',
          textAlign: 'center'
        }}>
          История поиска доступна только после входа в аккаунт
        </div>
      )}

      <Footer />
    </div>
  );
}
