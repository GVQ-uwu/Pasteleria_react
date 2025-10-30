import React from 'react';
export default function Footer(){
  return (
    <footer className="footer text-center">
      <div className="container">
        <div>© 1975–{new Date().getFullYear()} Pastelería 1000 Sabores · Inspirada en tradición y comunidad</div>
      </div>
    </footer>
  );
}
