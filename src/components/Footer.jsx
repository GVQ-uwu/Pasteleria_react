import React from 'react';

export default function Footer() {
  return (
    <footer style={{padding:'1rem', borderTop:'1px solid #eee', textAlign:'center'}}>
      <small>© {new Date().getFullYear()} Pastelería Sabores</small>
    </footer>
  );
}
