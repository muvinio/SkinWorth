import React, { useEffect, useState } from 'react';
import './css/searchHistory.css';

export function SearchHistory({ items, onSelect }: { items: string[], onSelect: (skin: string) => void }) {
  return (
    <div
      className="search-history"
      style={{
        position: 'fixed',
        top: '140px', // <-- поменяйте на такой же отступ, как у поля ввода
        right: '0',
        width: '220px',
        background: '#222',
        padding: '24px 0',
        minHeight: '200px',
        borderRadius: '16px 0 0 16px',
        boxShadow: '0 0 16px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ color: '#fff', fontWeight: 600, marginBottom: '12px', fontSize: '18px' }}>
        История поиска
      </div>
      {items.length === 0 && (
        <div style={{ color: '#888', fontSize: '14px' }}>Нет истории</div>
      )}
      {items.map((skin, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(skin)}
          className='item'
          
          
        >
          {skin}
        </div>
      ))}
    </div>
  );
}