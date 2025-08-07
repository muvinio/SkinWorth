// src/components/Header.tsx
import React from 'react';
import './css/header.css'; // подключи стили, если есть

export default function Header({ isAuth, onLogout }: { isAuth: boolean, onLogout: () => void }) {
  return (
    <header className="header">
      <span style={{ flex: 1 }}>Price Checker </span>
      {isAuth ? (
        <button
          onClick={onLogout}
          style={{
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '100px'
          }}
        >
          Выйти
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '100px'
          }}
        >
          Войти в аккаунт
        </button>
      )}
    </header>
  );
}
