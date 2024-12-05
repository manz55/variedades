producto.html// Función para mostrar el modal con los detalles del producto
function mostrarModal(producto) {
    // Insertar los datos del producto en el modal
    document.getElementById("modal-nombre").innerText = producto.nombre;
    document.getElementById("modal-imagen").src = producto.imagen;
    document.getElementById("modal-descripcion").innerText = producto.descripcion;
    document.getElementById("modal-precio").innerText = producto.precio;
    
    // Mostrar el modal
    document.getElementById("modal").style.display = "block"; 
}

// Función para cerrar el modal
function cerrarModal() {
    // Ocultar el modal
    document.getElementById("modal").style.display = "none"; 
}

// Función para redirigir a WhatsApp con el mensaje predefinido
function enviarWhatsApp() {
    const mensaje = "Necesito ayuda con este producto.";
    const numeroWhatsApp = "1234567890"; // Reemplaza con el número de teléfono de tu cuenta de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Función para agregar al carrito (puedes personalizarla)
function agregarAlCarrito() {
    alert("Producto agregado al carrito.");
}

// Añadir eventos de escucha para cerrar el modal cuando el usuario haga clic fuera de él
window.onclick = function(event) {
    if (event.target === document.getElementById("modal")) {
        cerrarModal();
    }
};
