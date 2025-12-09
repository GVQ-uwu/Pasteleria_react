export const getProductImageUrl = (producto) => {
  if (!producto) return '/assets/productos/Placeholder.jpg';

  // 1. Si el backend trae imagen, usarla directamente:
  if (producto.imagen) {
    if (producto.imagen.startsWith('http')) return producto.imagen;
    return `/assets/productos/${producto.imagen}`;
  }

  // 2. Normalizar nombre del producto
  const nombreLimpio = producto.nombre
    ?.toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/\bde\b/g, '')   // quita "de"
    .replace(/\bla\b/g, '')   // quita artículos
    .replace(/\bel\b/g, '')
    .replace(/\s+/g, ' ')     // limpia espacios extra
    .trim();

  // 3. Diccionario flexible
  const imageMap = {
    'torta cuadrada chocolate': 'Torta_Cuadrada_Chocolate.png',
    'torta cuadrada frutas': 'Torta_Cuadrada_Frutas.png',
    'torta circular vainilla': 'Torta_Circular_Vainilla.png',
    'torta circular manjar': 'Torta_Circular_Manjar.png',
    'mousse chocolate': 'Mousse_Chocolate.png',
    'tiramisu clasico': 'Tiramisu_Clasico.png',
    'torta sin azucar naranja': 'Torta_Sin_Azucar_Naranja.png',
    'cheesecake sin azucar': 'Cheesecake_Sin_Azucar.png',
    'empanada manzana': 'Empanada_Manzana.png',
    'tarta santiago': 'Tarta_Santiago.png',
    'brownie sin gluten': 'Brownie_Sin_Gluten.png',
    'pan sin gluten': 'Pan_Sin_Gluten.png',
    'galletas veganas avena': 'Galletas_Veganas_Avena.png',
    'torta vegana chocolate': 'Torta_Vegana_Chocolate.png',
    'torta especial cumpleanos': 'Torta_Especial_Cumpleanos.png',
    'torta especial boda': 'Torta_Especial_Boda.png'
  };

  // 4. Intento de coincidencia exacta
  if (imageMap[nombreLimpio]) {
    return `/assets/productos/${imageMap[nombreLimpio]}`;
  }

  // 5. Intento de coincidencia parcial
  for (const key of Object.keys(imageMap)) {
    if (nombreLimpio.includes(key) || key.includes(nombreLimpio)) {
      return `/assets/productos/${imageMap[key]}`;
    }
  }

  // 6. Si no se encontró nada
  return '/assets/productos/Placeholder.jpg';
};

// Crear imagen placeholder si no existe
export const createPlaceholderImage = () => {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2Yjc0ODQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+";
};