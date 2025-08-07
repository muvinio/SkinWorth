import React from 'react';
import './css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Price Checker. Все права защищены.
    </footer>
  );
}