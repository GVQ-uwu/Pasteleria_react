const KEY = 'pasteleria.db.v1';

const TortaCuadradaChocolate = process.env.PUBLIC_URL + '/assets/Torta_Cuadrada_Chocolate.png';
const TortaCuadradaFrutas = process.env.PUBLIC_URL + '/assets/Torta_Cuadrada_Frutas.png';
const TortaCircularVainilla = process.env.PUBLIC_URL + '/assets/Torta_Circular_Vainilla.png';
const TortaCircularManjar = process.env.PUBLIC_URL + '/assets/Torta_Circular_Manjar.png';
const MousseChocolate = process.env.PUBLIC_URL + '/assets/Mousse_Chocolate.png';
const TiramisuClasico = process.env.PUBLIC_URL + '/assets/Tiramisu_Clasico.png';
const TortaSinAzucarNaranja = process.env.PUBLIC_URL + '/assets/Torta_Sin_Azucar_Naranja.png';
const CheesecakeSinAzucar = process.env.PUBLIC_URL + '/assets/Cheesecake_Sin_Azucar.png';
const EmpanadaManzana = process.env.PUBLIC_URL + '/assets/Empanada_Manzana.png';
const TartaSantiago = process.env.PUBLIC_URL + '/assets/Tarta_Santiago.png';
const BrownieSinGluten = process.env.PUBLIC_URL + '/assets/Brownie_Sin_Gluten.png';
const PanSinGluten = process.env.PUBLIC_URL + '/assets/Pan_Sin_Gluten.png';
const TortaVeganaChocolate = process.env.PUBLIC_URL + '/assets/Torta_Vegana_Chocolate.png';
const GalletasVeganasAvena = process.env.PUBLIC_URL + '/assets/Galletas_Veganas_Avena.png';
const TortaEspecialCumpleanos = process.env.PUBLIC_URL + '/assets/Torta_Especial_Cumpleanos.png';
const TortaEspecialBoda = process.env.PUBLIC_URL + '/assets/Torta_Especial_Boda.png';



const seed = {
  categorias: [
    { id:'cat-cuad', nombre:'Tortas Cuadradas' },
    { id:'cat-circ', nombre:'Tortas Circulares' },
    { id:'cat-post', nombre:'Postres Individuales' },
    { id:'cat-sin-az', nombre:'Productos Sin Azúcar' },
    { id:'cat-trad', nombre:'Pastelería Tradicional' },
    { id:'cat-sin-glu', nombre:'Productos Sin Gluten' },
    { id:'cat-veg', nombre:'Productos Veganos' },
    { id:'cat-esp', nombre:'Tortas Especiales' },
  ],

  productos: [
    { id:'p1', nombre:'Torta Cuadrada de Chocolate', categoriaId:'cat-cuad', precio:45000, stock:8, destacado:true, oferta:false, tipo:'cuadrada', tamano:'mediana', img: TortaCuadradaChocolate, desc:'Bizcocho de chocolate con relleno de crema y cobertura ganache.' },
    { id:'p2', nombre:'Torta Cuadrada de Frutas', categoriaId:'cat-cuad', precio:50000, stock:6, destacado:false, oferta:false, tipo:'cuadrada', tamano:'mediana', img: TortaCuadradaFrutas, desc:'Esponjosa torta con trozos de fruta confitada y glaseado natural.' },
    { id:'p3', nombre:'Torta Circular de Vainilla', categoriaId:'cat-circ', precio:40000, stock:10, destacado:false, oferta:true, tipo:'circular', tamano:'mediana', img: TortaCircularVainilla, desc:'Delicada torta de vainilla con crema pastelera.' },
    { id:'p4', nombre:'Torta Circular de Manjar', categoriaId:'cat-circ', precio:42000, stock:12, destacado:true, oferta:false, tipo:'circular', tamano:'mediana', img: TortaCircularManjar, desc:'Torta artesanal rellena con manjar casero.' },
    { id:'p5', nombre:'Mousse de Chocolate', categoriaId:'cat-post', precio:5000, stock:25, destacado:false, oferta:false, tipo:'individual', tamano:'unit', img: MousseChocolate, desc:'Postre individual de mousse de chocolate semiamargo.' },
    { id:'p6', nombre:'Tiramisú Clásico', categoriaId:'cat-post', precio:5500, stock:30, destacado:false, oferta:false, tipo:'individual', tamano:'unit', img: TiramisuClasico, desc:'Tradicional tiramisú italiano con mascarpone y cacao.' },
    { id:'p7', nombre:'Torta Sin Azúcar de Naranja', categoriaId:'cat-sin-az', precio:48000, stock:5, destacado:false, oferta:false, tipo:'circular', tamano:'mediana', img: TortaSinAzucarNaranja, desc:'Torta saludable endulzada naturalmente con jugo de naranja.' },
    { id:'p8', nombre:'Cheesecake Sin Azúcar', categoriaId:'cat-sin-az', precio:47000, stock:7, destacado:false, oferta:false, tipo:'cuadrada', tamano:'mediana', img: CheesecakeSinAzucar, desc:'Cheesecake cremoso con base de almendras y endulzante natural.' },
    { id:'p9', nombre:'Empanada de Manzana', categoriaId:'cat-trad', precio:3000, stock:20, destacado:false, oferta:false, tipo:'unit', tamano:'unit', img: EmpanadaManzana, desc:'Masa crujiente rellena con manzanas caramelizadas y canela.' },
    { id:'p10', nombre:'Tarta de Santiago', categoriaId:'cat-trad', precio:6000, stock:18, destacado:false, oferta:false, tipo:'unit', tamano:'unit', img: TartaSantiago, desc:'Receta gallega tradicional con almendras y azúcar flor.' },
    { id:'p11', nombre:'Brownie Sin Gluten', categoriaId:'cat-sin-glu', precio:4000, stock:9, destacado:false, oferta:false, tipo:'unit', tamano:'unit', img: BrownieSinGluten, desc:'Brownie húmedo y denso elaborado con harina sin gluten.' },
    { id:'p12', nombre:'Pan Sin Gluten', categoriaId:'cat-sin-glu', precio:3500, stock:8, destacado:false, oferta:false, tipo:'unit', tamano:'unit', img: PanSinGluten, desc:'Pan artesanal sin gluten, ideal para acompañar desayunos.' },
    { id:'p13', nombre:'Torta Vegana de Chocolate', categoriaId:'cat-veg', precio:50000, stock:5, destacado:true, oferta:false, tipo:'circular', tamano:'mediana', img: TortaVeganaChocolate, desc:'Torta sin productos animales, elaborada con cacao puro.' },
    { id:'p14', nombre:'Galletas Veganas de Avena', categoriaId:'cat-veg', precio:4500, stock:15, destacado:false, oferta:false, tipo:'unit', tamano:'unit', img: GalletasVeganasAvena, desc:'Crujientes galletas veganas con avena integral y miel vegetal.' },
    { id:'p15', nombre:'Torta Especial de Cumpleaños', categoriaId:'cat-esp', precio:55000, stock:4, destacado:true, oferta:false, tipo:'personalizada', tamano:'grande', img: TortaEspecialCumpleanos, desc:'Torta decorada al gusto, perfecta para celebrar con estilo.' },
    { id:'p16', nombre:'Torta Especial de Boda', categoriaId:'cat-esp', precio:60000, stock:2, destacado:true, oferta:false, tipo:'personalizada', tamano:'grande', img: TortaEspecialBoda, desc:'Torta elegante de varios pisos con diseño personalizado.' }
  ],
  usuarios:[
    { id:'u-admin', nombre:'Admin', email:'root@admin', rol:'admin', fechaNacimiento:'1980-01-01' },
  ],
  pedidos:[]
};

function load(){
  const raw = localStorage.getItem(KEY);
  if(!raw){
    localStorage.setItem(KEY, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }
  try{ return JSON.parse(raw); }
  catch{
    localStorage.setItem(KEY, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }
}
function save(db){ localStorage.setItem(KEY, JSON.stringify(db)); }

export function getDB(){ return load(); }

export function listCategorias(){ return load().categorias; }
export function addCategoria(cat){
  const db = load();
  db.categorias.push({ ...cat, id: crypto.randomUUID() });
  save(db);
}
export function updateCategoria(id, patch){
  const db = load();
  const it = db.categorias.find(c=>c.id===id);
  if(!it) return false;
  Object.assign(it, patch);
  save(db); return true;
}
export function deleteCategoria(id){
  const db = load();
  db.categorias = db.categorias.filter(c=>c.id!==id);
  save(db);
}

export function listProductos(){ return load().productos; }
export function getProducto(id){ return load().productos.find(p=>p.id===id); }
export function addProducto(prod){
  const db = load();
  db.productos.push({ ...prod, id: crypto.randomUUID(), stock: prod.stock ?? 0 });
  save(db);
}
export function updateProducto(id, patch){
  const db = load();
  const it = db.productos.find(p=>p.id===id);
  if(!it) return false;
  Object.assign(it, patch);
  save(db); return true;
}
export function deleteProducto(id){
  const db = load();
  db.productos = db.productos.filter(p=>p.id!==id);
  save(db);
}
export function productosStockCritico(umbral=5){
  return load().productos.filter(p=>p.stock <= umbral);
}

export function listUsuarios(){ return load().usuarios; }
export function addUsuario(u){
  const db = load();
  db.usuarios.push({ ...u, id: crypto.randomUUID() });
  save(db);
}
export function updateUsuario(id, patch){
  const db = load();
  const it = db.usuarios.find(x=>x.id===id);
  if(!it) return false;
  Object.assign(it, patch);
  save(db); return true;
}
export function deleteUsuario(id){
  const db = load();
  db.usuarios = db.usuarios.filter(x=>x.id!==id);
  save(db);
}

export function addPedido(pedido){
  const db = load();
  db.pedidos.push({ ...pedido, id: crypto.randomUUID(), fecha: new Date().toISOString() });
  save(db);
}
export function listPedidos(){ return load().pedidos; }
