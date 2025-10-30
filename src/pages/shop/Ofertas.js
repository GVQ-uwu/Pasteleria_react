import React from 'react';
export default function Ofertas(){
  return (
    <div className='container py-4'>
      <h2>Ofertas</h2>
      <p>Aquí encontrarás las mejores ofertas y descuentos en nuestros productos de pastelería. ¡No te las pierdas!</p>
      <div className='offers-list'>
        <div className='offer-item' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>Descuento del 20% en pasteles de cumpleaños</h3>
          <p>Válido hasta el 30 de junio. Usa el código CUMPLE20 al hacer tu pedido.</p>
        </div>
        <div className='offer-item' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>Compra 2 y lleva 3 en galletas artesanales</h3>
          <p>Oferta válida durante todo el mes de julio.</p>
        </div>
        <div className='offer-item' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>Envío gratis en pedidos superiores a $50</h3>
          <p>Aplica automáticamente al finalizar la compra.</p>
        </div>
      </div>
    </div>
  );
}
