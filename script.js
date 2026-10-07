// ====== ELEMENTOS DEL DOM ======
const botonMenu = document.getElementById('botonMenu');
const enlacesMenu = document.getElementById('enlacesMenu');
const btnSubir = document.getElementById('btnSubir');
const formulario = document.getElementById('formularioContacto');
const mensajeExito = document.getElementById('mensajeExito');

// ====== MENÚ RESPONSIVE ======
botonMenu.addEventListener('click', () => {
    enlacesMenu.classList.toggle('activo');
    // Cambiar ícono entre menú y X
    const icono = botonMenu.querySelector('i');
    if (enlacesMenu.classList.contains('activo')) {
        icono.classList.remove('fa-bars');
        icono.classList.add('fa-times');
    } else {
        icono.classList.remove('fa-times');
        icono.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
enlacesMenu.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        enlacesMenu.classList.remove('activo');
        botonMenu.querySelector('i').classList.remove('fa-times');
        botonMenu.querySelector('i').classList.add('fa-bars');
    });
});

// ====== BOTÓN VOLVER ARRIBA ======
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnSubir.classList.add('activo');
    } else {
        btnSubir.classList.remove('activo');
    }
});

btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== VALIDACIÓN DEL FORMULARIO ======
formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    let valido = true;

    // Limpiar errores anteriores
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    mensajeExito.style.display = 'none';

    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar Nombre
    if (nombre === '') {
        document.getElementById('errorNombre').textContent = '⚠️ El nombre es obligatorio';
        valido = false;
    } else if (nombre.length < 3) {
        document.getElementById('errorNombre').textContent = '⚠️ Escribe tu nombre completo (mínimo 3 caracteres)';
        valido = false;
    }

    // Validar Correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo === '') {
        document.getElementById('errorCorreo').textContent = '⚠️ El correo es obligatorio';
        valido = false;
    } else if (!regexCorreo.test(correo)) {
        document.getElementById('errorCorreo').textContent = '⚠️ Ingresa un correo válido (ej: nombre@dominio.com)';
        valido = false;
    }

    // Validar Teléfono
    const regexTelefono = /^[0-9]{7,9}$/;
    if (telefono === '') {
        document.getElementById('errorTelefono').textContent = '⚠️ El teléfono es obligatorio';
        valido = false;
    } else if (!regexTelefono.test(telefono)) {
        document.getElementById('errorTelefono').textContent = '⚠️ Solo números, entre 7 y 9 dígitos';
        valido = false;
    }

    // Validar Mensaje
    if (mensaje === '') {
        document.getElementById('errorMensaje').textContent = '⚠️ Escribe tu mensaje';
        valido = false;
    } else if (mensaje.length < 10) {
        document.getElementById('errorMensaje').textContent = '⚠️ El mensaje debe tener al menos 10 caracteres';
        valido = false;
    }

    // Enviar si todo está correcto
    if (valido) {
        mensajeExito.style.display = 'block';
        formulario.reset();
        
        // Ocultar mensaje después de 6 segundos
        setTimeout(() => {
            mensajeExito.style.display = 'none';
        }, 6000);
    }
});

// ====== ANIMACIONES AL DESPLAZARSE ======
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.style.opacity = '1';
            entrada.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Aplicar animación a tarjetas y secciones
document.querySelectorAll('.tarjeta-servicio, .item-galeria, .fila-nosotros, .formulario').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.7s ease';
    observador.observe(el);
});