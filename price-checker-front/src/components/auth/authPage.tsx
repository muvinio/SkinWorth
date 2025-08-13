import React, { useState } from 'react';
import {login} from './login';
import {register} from './register';
import '../css/auth.css';

export function AuthPage() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Форма регистрации
  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');

  interface AuthPageProps {
  onClose?: () => void;
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedLogin = loginValue.trim();
    const cleanedPassword = password.trim();
    const success = await login(cleanedLogin, cleanedPassword);
    if (success === true) {
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userName', loginValue); // <--- добавьте это!
      window.location.reload();
    } else if (Array.isArray(success)) {
      alert(success);
    }
    else{
      alert('Неверный логин или пароль'); // Если success не true и не массив, выводим общую ошибку
    }
    
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedRegLogin = regLogin.trim();
    const cleanedRegPassword = regPassword.trim();
    const success = await register(cleanedRegLogin, cleanedRegPassword);
    if (success === true) {
      alert('Регистрация успешна!');
      setShowRegister(false);
    } else if (Array.isArray(success)) {
      alert(success); // Выводим массив ошибок через запятую 
    }
    else {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="main-div">
      {!showRegister ? (
        <form onSubmit={handleSubmit} className='form'>
          <h2 className='entry-button'>Вход</h2>
          <input
            type="text"
            placeholder="Логин"
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            className='data-input'
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='data-input'
            required
          />
          <button type="submit" className='button'>
            Войти
          </button>
          <div style={{ color: '#fff', marginTop: '8px', textAlign: 'center', fontSize: '16px' }}>
            Еще не зарегистрированы,&nbsp;
            <div
              style={{ color: '#3fa29f', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setShowRegister(true)} >
              зарегистрируйтесь
            </div>
          </div>
          
        </form>
      ) : (
        <form onSubmit={handleRegister} className='form' >
          <h2 className='entry-button'>Регистрация</h2>
          <input
            type="text"
            placeholder="Логин"
            value={regLogin}
            onChange={e => setRegLogin(e.target.value)}
            className='data-input'
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={regPassword}
            onChange={e => setRegPassword(e.target.value)}
            className='data-input'
            required
          />
          <button type="submit" className='button' >
            Зарегистрироваться
          </button>
          <div style={{ color: '#fff', marginTop: '12px', textAlign: 'center', fontSize: '16px' }}>
            Уже есть аккаунт?&nbsp;
            <span
              style={{ color: '#3fa29f', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setShowRegister(false)}
            >
              Войти
            </span>
          </div>
        </form>
      )}
    </div>
  );
}