import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {SearchBarWithSuggest} from './components/searchBarWithSuggest';
import { SearchHistory } from './components/searchHistory';
import { PriceContainer } from './components/priceContainer';
import 'ldrs/ring'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import Header from './components/header';
import Footer from './components/footer';
import './components/css/markets.css'; // Importing the CSS for markets
import { AuthPage } from './components/auth/authPage';
import { register } from './components/auth/register';
import { login } from './components/auth/login';



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
  const steamLink = 'https://steamcommunity.com/market/listings/730/';
  const marketLink = 'https://market.csgo.com/ru/'



  // Получение истории
  useEffect(() => {
    if (!userName) return;
    axios.get(`http://localhost:5000/api/history?userName=${userName}`).then((res) => {
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
      const res = await axios.get('http://localhost:5000/api/price', { params: { item: skinName } });
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
      await axios.post('http://localhost:5000/api/history', { userName, skin });
      // После успешного сохранения — обновить историю из бэкенда
      const res = await axios.get(`http://localhost:5000/api/history?userName=${userName}`);
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

  

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <Header isAuth={isAuth} onLogout={() => {
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
          {loading && <p><Waveform size="20" stroke="3.5" speed="1" color="black" /></p> }
          
          {error && <p style={{ color: 'red' }}>{error}
            <p style={{ color: 'black' }}> Попробуйте еще раз</p>
          </p>}
          
          {steamPrice && ( PriceContainer({ selectedSkin, price: steamPrice, marketName: 'Steam', logo: 'steamLogo.jpg',link:steamLink }) )}
          {marketPrice && ( PriceContainer({ selectedSkin, price: marketPrice, marketName: 'Market', logo: 'marketCsgoLogo.png', link:marketLink }) )}
        </div>
      )}

        <SearchHistory items={history} onSelect={handleSelect} />
    
      <Footer />
    </div>
  );
}
