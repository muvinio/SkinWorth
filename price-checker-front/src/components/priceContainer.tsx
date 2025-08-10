import React from 'react';
import './css/priceContainer.css'; // Importing the CSS for price container
export function PriceContainer({ selectedSkin, price,marketName, logo }: 
    {
    selectedSkin: string;
    price: string;
    marketName:String
    
    logo: string;
    }) {
    return (
        <div className='result-box'>
            <span className='market-name'>{marketName}:</span>
            <span className='price-value'>{price} ₽</span>
            <img 
            className="logo"
            src={`/uploads/images/${logo}`}
            onClick={() => window.open(`https://steamcommunity.com/market/listings/730/${selectedSkin}`, '_blank', 'noopener,noreferrer')} />
        </div>
    );
}