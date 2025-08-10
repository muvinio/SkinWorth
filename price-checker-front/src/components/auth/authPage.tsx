import React, { useState } from 'react';
import {login} from './login';
import {register} from './register';

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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#222'
    }}>
      {!showRegister ? (
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#333',
            padding: '32px 24px',
            borderRadius: '12px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: '260px'
          }}
        >
          <h2 style={{ color: '#fff', textAlign: 'center', margin: 0 }}>Вход</h2>
          <input
            type="text"
            placeholder="Логин"
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px'
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              background: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Войти
          </button>
          <div style={{ color: '#fff', marginTop: '12px', textAlign: 'center', fontSize: '14px' }}>
            Если еще не зарегистрированы,&nbsp;
            <span
              style={{ color: '#4caf50', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setShowRegister(true)}
            >
              зарегистрируйтесь
            </span>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleRegister}
          style={{
            background: '#333',
            padding: '32px 24px',
            borderRadius: '12px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: '260px'
          }}
        >
          <h2 style={{ color: '#fff', textAlign: 'center', margin: 0 }}>Регистрация</h2>
          <input
            type="text"
            placeholder="Логин"
            value={regLogin}
            onChange={e => setRegLogin(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={regPassword}
            onChange={e => setRegPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px'
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              background: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Зарегистрироваться
          </button>
          <div style={{ color: '#fff', marginTop: '12px', textAlign: 'center', fontSize: '14px' }}>
            Уже есть аккаунт?&nbsp;
            <span
              style={{ color: '#4caf50', cursor: 'pointer', textDecoration: 'underline' }}
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