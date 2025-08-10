import React, { useEffect, useState } from 'react';
import './css/searchHistory.css';

export function SearchHistory({ items, onSelect }: { items: string[], onSelect: (skin: string) => void }) {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  return ( isAuth ? (
    <div className="search-history" >
      <div className='head-text'>
        История поиска
      </div>
      {items.length === 0 && (
        <div className='status-text'>Нет истории</div>
      )}
      {items.map((skin, idx) => (
        <div key={idx} onClick={() => onSelect(skin)} className='item' >
          {skin}
        </div>
      ))}
    </div>
  ) :
  (
    <div className="search-history" >
      <div className='head-text'>
        История поиска
      </div>
      <div className='status-text'>Авторизуйтесь для просмотра истории</div>
    </div>
  )
  );
}