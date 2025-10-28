// Lista de productos predefinidos
const productos = [
  { id: 1, codigo: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, img: "Img/Torta Cuadrada de Chocolate.png" },
  { id: 2, codigo: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, img: "Img/Torta Cuadrada de Frutas.png" },
  { id: 3, codigo: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000, img: "Img/Torta Circular de Vainilla.png" },
  { id: 4, codigo: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000, img: "Img/Torta Circular de Manjar.png" },
  { id: 5, codigo: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000, img: "Img/Mousse de Chocolate.png" },
  { id: 6, codigo: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500, img: "Img/Tiramisu Clasico.png" },
  { id: 7, codigo: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, img: "Img/Torta Sin Azucar de Naranja.png" },
  { id: 8, codigo: "PSA002", categoria: "Productos Sin Azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000, img: "Img/Cheesecake Sin Azucar.png" },
  { id: 9, codigo: "PT001", categoria: "Pastelería Tradicional", nombre: "Empanada de Manzana", precio: 3000, img: "Img/Empanada de Manzana.png" },
  { id: 10, codigo: "PT002", categoria: "Pastelería Tradicional", nombre: "Tarta de Santiago", precio: 6000, img: "Img/Tarta de Santiago.png" },
  { id: 11, codigo: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000, img: "Img/Brownie Sin Gluten.png" },
  { id: 12, codigo: "PG002", categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500, img: "Img/Pan Sin Gluten.png" },
  { id: 13, codigo: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000, img: "Img/Torta Vegana de Chocolate.png" },
  { id: 14, codigo: "PV002", categoria: "Productos Vegana", nombre: "Galletas Veganas de Avena", precio: 4500, img: "Img/Galletas Veganas de Avena.png" },
  { id: 15, codigo: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, img: "Img/Torta Especial de Cumpleanos.png" },
  { id: 16, codigo: "TE002", categoria: "Tortas Especiales", nombre: "Torta Especial de Boda", precio: 60000, img: "Img/Torta Especial de Boda.png" }
];

// Variables globales del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosFiltrados = [...productos]; // copia inicial

// Inicializar cuando carga la página
window.onload = function() {
    mostrarCategorias();
    mostrarProductos(productosFiltrados);
    mostrarCarrito();

    // Botón limpiar carrito
    const btnLimpiar = document.getElementById("btnLimpiar");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", limpiarCarrito);
    }
};

// Mostrar categorías en un <select>
function mostrarCategorias() {
    const select = document.getElementById("filtroCategoria");
    if (!select) return;
    const categorias = ["Todos", ...new Set(productos.map(p => p.categoria))];

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        const categoria = e.target.value;
        productosFiltrados = (categoria === "Todos")
            ? [...productos]
            : productos.filter(p => p.categoria === categoria);

        mostrarProductos(productosFiltrados);
    });
}

// Mostrar productos filtrados
function mostrarProductos(lista) {
    const contenedor = document.getElementById("listaProductos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("producto");
        item.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <p><b>${p.nombre}</b></p>
            <p>Precio: $${p.precio.toLocaleString("es-CL")}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(item);
    });
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        if (existe.cantidad >= 5) {
            alert("⚠️ No puedes agregar más de 5 unidades de este producto.");
            return;
        }
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
}

// Mostrar carrito con botones + y -
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");
    const totalElemento = document.getElementById("total");
    if (!contenedor || !totalElemento) return;
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Carrito vacío</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <p>
                ${p.nombre} (x${p.cantidad}) - $${(p.precio * p.cantidad).toLocaleString("es-CL")}<br>
                <button onclick="aumentar(${p.id})">+</button>
                <button onclick="disminuir(${p.id})">-</button>
            </p>
        `;
        contenedor.appendChild(item);

        total += p.precio * p.cantidad;
    });

    totalElemento.textContent = `Total: $${total.toLocaleString("es-CL")}`;
}

// Aumentar cantidad
function aumentar(id) {
    const prod = carrito.find(p => p.id === id);
    if (prod && prod.cantidad < 5) {
        prod.cantidad++;
    } else {
        alert("⚠️ Máximo 5 unidades por producto.");
    }
    guardarCarrito();
}

// Disminuir cantidad
function disminuir(id) {
    const prod = carrito.find(p => p.id === id);
    if (prod) {
        prod.cantidad--;
        if (prod.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
    }
    guardarCarrito();
}

// Limpiar carrito completo
function limpiarCarrito() {
    carrito = [];
    guardarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para filtrar productos desde los botones
function filterProducts(category) {
    const select = document.getElementById("filtroCategoria");
    if (!select) return;

    let cat = "Todos";
    if (category === 'tortas-cuadradas') cat = "Tortas Cuadradas";
    else if (category === 'tortas-circulares') cat = "Tortas Circulares";
    else if (category === 'postres-individuales') cat = "Postres Individuales";
    else if (category === 'sin-gluten') cat = "Productos Sin Gluten";
    else if (category === 'veganos') cat = "Productos Vegana";
    else if (category === 'especiales') cat = "Tortas Especiales";

    select.value = cat;
    select.dispatchEvent(new Event('change'));
}