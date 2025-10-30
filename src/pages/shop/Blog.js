import React from 'react';
export default function Blog(){
  return (
    <div className='container py-4'>
      <h2>Blog</h2>
      <p>Bienvenido a nuestro blog de Pastelería Sabores, donde compartimos recetas deliciosas, consejos de repostería y las últimas novedades de nuestra pastelería. ¡Sigue leyendo para descubrir más!</p>
      <div className='blog-posts'>
        <div className='blog-post' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>5 recetas fáciles para hacer en casa</h3>
          <p>Descubre nuestras recetas favoritas que puedes preparar en tu cocina con ingredientes simples.</p>
        </div>
        <div className='blog-post' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>Consejos para decorar tus pasteles como un profesional</h3>
          <p>Aprende técnicas de decoración que harán que tus pasteles luzcan increíbles.</p>
        </div>
        <div className='blog-post' style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px'}}>
          <h3>Las tendencias de repostería para este año</h3>
          <p>Mantente al día con las últimas tendencias en sabores, decoraciones y estilos de pastelería.</p>
        </div>
      </div>  
    </div>
  );
}
