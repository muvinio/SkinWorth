import React from 'react';
import './css/priceContainer.css'; // Importing the CSS for price container
export function PriceContainer({ selectedSkin, price,marketName, logo, link }: 
    {
    selectedSkin: string;
    price: string;
    marketName:String
    link: string;
    logo: string;
    }) {
    return (
        <div className='result-box'>
            <span className='market-name'>{marketName}:</span>
            <span className='price-value'>{price} ₽</span>
            <img 
            className="logo"
            src={`/uploads/images/${logo}`}
            onClick={() => window.open(`${link}${selectedSkin}`, '_blank', 'noopener,noreferrer')} />
        </div>
    );
}