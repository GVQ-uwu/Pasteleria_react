import React, { useState } from 'react';
import { getProductImageUrl, createPlaceholderImage } from '../utils/imageUtils';

const ProductImage = ({ 
  producto, 
  alt, 
  className = "card-img-top", 
  style = { height: '200px', objectFit: 'cover' },
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Si hay error, mostrar placeholder
  if (imageError) {
    return (
      <img
        src={createPlaceholderImage()}
        alt={alt || producto?.nombre || 'Producto'}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {!imageLoaded && (
        <div 
          className="d-flex align-items-center justify-content-center"
          style={{
            ...style,
            backgroundColor: '#f8f9fa',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1
          }}
        >
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
      <img
        src={getProductImageUrl(producto)}
        alt={alt || producto?.nombre || 'Producto'}
        className={className}
        style={{
          ...style,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

export default ProductImage;