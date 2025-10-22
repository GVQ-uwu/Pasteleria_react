# Pastelería Sabores (React - estilo CRA)

Este proyecto replica la **estructura** del ejemplo del profe (Create React App) y te deja listo el enrutamiento y las carpetas para migrar tu sitio estático.

## Cómo correrlo
```bash
npm install
npm start
```
> Si no tienes CRA global, con este `package.json` basta. Asegúrate de tener Node 18+.

## Estructura
- `public/index.html` — HTML base (como CRA).
- `src/index.js` — punto de entrada.
- `src/App.jsx` — layout + rutas con `react-router-dom`.
- `src/components/` — Navbar y Footer listos.
- `src/pages/` — páginas que mapean tus archivos HTML:
  - Home → `index.html`
  - Productos → `productos.html`
  - Nosotros → `nosotros.html`
  - Carrito → `carrito.html`
  - Login → `login.html`
  - AccesoAdmin → `acceso-admin.html`
  - Usuarios → `usuarios.html` (si aplica)
- `src/assets/img/` — imágenes copiadas desde tu proyecto.
- `src/styles/` — se copiaron tus CSS (`carrito.css`, `estilos.css`, etc.).

## Cómo migrar cada página
1. Abre `src/pages/Home.jsx` (por ejemplo).
2. Copia el **contenido dentro del `<body>`** de tu HTML original.
3. Cambia atributos HTML a JSX:
   - `class` → `className`
   - `for` → `htmlFor`
   - Cierra etiquetas vacías: `<img ... />`, `<br />`, etc.
4. Corrige rutas de imágenes para usar `src/assets/img/` (usa `import img from '../assets/img/archivo.png'` y `<img src={img} ... />` o usa `process.env.PUBLIC_URL` si prefieres `public/`).
5. Pasa los scripts (`.js`) a componentes o a hooks (`useEffect`).

## Siguientes pasos recomendados
- Extrae secciones repetidas a componentes (CardProducto, Hero, etc.).
- Divide CSS por componente o usa CSS Modules/Tailwind.
- Si usarás datos dinámicos, crea un servicio en `src/services/`.

¡Con esto tu proyecto queda con **estructura estilo profe (CRA)** y listo para completar la migración!
