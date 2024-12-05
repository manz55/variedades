// Referencias al DOM
const carritoIcon = document.querySelector('.carrito'); // Ícono del carrito
const sidebar = document.getElementById('sidebar-carrito'); // Sidebar del carrito
const closeBtn = document.querySelector('.close-btn'); // Botón de cerrar el sidebar
const carritoLista = document.getElementById('carrito-lista'); // Lista de productos en el carrito
const carritoVacio = document.getElementById('carrito-vacio'); // Mensaje de carrito vacío
const carritoCount = document.querySelector('.carrito-count'); // Contador de productos en el carrito
const carritoTotal = document.getElementById('carrito-total'); // Total del carrito

// Estado del carrito
let carritoItems = [];

// Cargar carrito desde localStorage
function cargarCarrito() {
    const datosGuardados = localStorage.getItem('carrito');
    carritoItems = datosGuardados ? JSON.parse(datosGuardados) : [];
    actualizarSidebar();
    actualizarContador();
    actualizarTotal();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

// Abrir el sidebar
carritoIcon.addEventListener('click', () => {
    sidebar.classList.add('open');
    actualizarSidebar();
});

// Cerrar el sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// Añadir productos al carrito
document.querySelectorAll('.agregar-carrito').forEach((boton) => {
    boton.addEventListener('click', (event) => {
        const producto = event.target.closest('.producto');
        const productoNombre = producto.querySelector('.nombre').textContent;
        const productoPrecio = parseFloat(producto.querySelector('.precio').textContent.replace('Q', '').trim());
        const productoImagen = producto.querySelector('img').src;

        // Verificar si el producto ya está en el carrito
        const productoExistente = carritoItems.find(item => item.nombre === productoNombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carritoItems.push({
                nombre: productoNombre,
                cantidad: 1,
                precio: productoPrecio,
                imagen: productoImagen
            });
        }

        guardarCarrito();
        actualizarSidebar();
        actualizarContador();
        actualizarTotal();
    });
});

// Actualizar el contenido del carrito
function actualizarSidebar() {
    carritoLista.innerHTML = '';
    if (carritoItems.length === 0) {
        carritoVacio.style.display = 'block';
    } else {
        carritoVacio.style.display = 'none';
        carritoItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="carrito-item">
                    <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img">
                    <div>
                        <span class="carrito-nombre">${item.nombre}</span>
                        <span class="carrito-cantidad">x${item.cantidad}</span>
                        <span class="carrito-precio">Q${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                    <button class="eliminar-btn" data-index="${index}">Eliminar</button>
                </div>
            `;
            carritoLista.appendChild(li);
        });

        // Eliminar producto
        document.querySelectorAll('.eliminar-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                carritoItems.splice(index, 1);
                guardarCarrito();
                actualizarSidebar();
                actualizarContador();
                actualizarTotal();
            });
        });
    }
}

// Actualizar contador del carrito
function actualizarContador() {
    const totalItems = carritoItems.reduce((acc, item) => acc + item.cantidad, 0);
    carritoCount.textContent = totalItems;
}

// Actualizar total del carrito
function actualizarTotal() {
    const total = carritoItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    carritoTotal.textContent = `Q${total.toFixed(2)}`;
}

// Inicializar carrito
cargarCarrito();
