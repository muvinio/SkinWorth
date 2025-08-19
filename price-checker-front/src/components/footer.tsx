import React from 'react';
import './css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Skin Worth. Все права защищены.
    </footer>
  );
}