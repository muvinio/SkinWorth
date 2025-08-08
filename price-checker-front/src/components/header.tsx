// src/components/Header.tsx
import React from 'react';
import './css/header.css'; // подключи стили, если есть

export default function Header({ isAuth, onLogout }: { isAuth: boolean, onLogout: () => void }) {
  return (
    <header className="header">
      <div className='header-inner'>
        
        <span className='name'>SkinWorth </span>
        {isAuth ? (
          <button onClick={onLogout} className='button'> Выйти </button>) : (
          <button
            onClick={() => window.location.reload()} className='button'> Войти в аккаунт </button>
        )}
      </div>
    </header>
  );
}
