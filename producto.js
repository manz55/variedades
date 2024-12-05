// Lista de productos
const productos = [
    { id: 1, nombre: "Producto 1", precio: 150, imagen: "producto1.jpg" },
    { id: 2, nombre: "Producto 2", precio: 250, imagen: "producto2.jpg" },
    { id: 3, nombre: "Producto 3", precio: 350, imagen: "producto3.jpg" }
];

// Carrito de compras
let carrito = [];

// Renderizar productos
function renderProductos() {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.className = "producto";
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">Q${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        container.appendChild(productoDiv);
    });
}

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    const count = document.getElementById("carrito-count");
    const content = document.getElementById("carrito-content");

    count.innerText = carrito.length;

    if (carrito.length > 0) {
        content.innerHTML = `
            <ul>
                ${carrito.map(p => `<li>${p.nombre} - Q${p.precio}</li>`).join("")}
            </ul>
        `;
    } else {
        content.innerHTML = "<p>Tu carrito está vacío.</p>";
    }
}

// Abrir/cerrar carrito
function toggleCarrito() {
    const sidebar = document.getElementById("carrito-sidebar");
    sidebar.classList.toggle("open");
}

// Inicializar
renderProductos();
