import React, { useState } from 'react';
import './css/header.css';
import { AuthPage } from './auth/authPage';

export default function Header({ isAuth, onLogout }: { isAuth: boolean, onLogout: () => void }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="header">
        <div className='header-inner'>
          <span className='name'>SkinWorth</span>
          {isAuth ? (
            <button onClick={onLogout} className='button'>Выйти</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className='button'
            >
              Войти в аккаунт
            </button>
          )}
        </div>
      </header>

      {showAuthModal && (
  <div className="auth-modal-overlay">
    <div className="auth-modal-container">
      <button 
        className="modal-close-button"
        onClick={() => setShowAuthModal(false)}
      >
        X
      </button>
      <AuthPage />
    </div>
  </div>
)}
    </>
  );
}