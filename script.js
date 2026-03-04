// ========================================
// MENÚ HAMBURGUESA (RESPONSIVE)
// ========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    navMenu.classList.add('is-open');
    navToggle.classList.add('is-open');
    if (navOverlay) navOverlay.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    if (navOverlay) navOverlay.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (navToggle && navMenu) {
    // Abrir / cerrar al pulsar el botón
    navToggle.addEventListener('click', function () {
        navMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    // Cerrar al hacer clic en cualquier enlace del menú
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar al hacer clic en el overlay (fuera del sidebar)
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Cerrar al pulsar Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
}

// ========================================
// NAVEGACIÓN SUAVE Y SCROLL
// ========================================

// Función para scroll suave al hacer clic en enlaces de navegación
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // EDITAR EMAIL DE DESTINO AQUÍ
        // Puedes cambiar esto por tu email real o integrar con un servicio de email
        const emailDestino = 'tu.email@ejemplo.com';

        // Validación básica
        if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }

        // Aquí puedes integrar con un servicio de email como EmailJS, Formspree, etc.
        // Por ahora, mostramos un mensaje de confirmación

        console.log('Datos del formulario:', {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        });

        // Mensaje de confirmación
        alert(`¡Gracias por tu mensaje, ${nombre}! Te responderé pronto.`);

        // Limpiar formulario
        contactForm.reset();

        // OPCIONAL: Integración con EmailJS
        // Descomentar y configurar si quieres usar EmailJS
        /*
        emailjs.send("tu_service_id", "tu_template_id", {
            from_name: nombre,
            from_email: email,
            message: mensaje,
            to_email: emailDestino
        })
        .then(function(response) {
            alert('¡Mensaje enviado con éxito!');
            contactForm.reset();
        }, function(error) {
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            console.error('Error:', error);
        });
        */
    });
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

// Observador de intersección para animar elementos al entrar en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de skills y proyectos
document.addEventListener('DOMContentLoaded', function () {
    // Animar tarjetas de skills
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Animar tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========================================
// NAVBAR TRANSPARENTE AL HACER SCROLL
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    // Añadir sombra al navbar cuando se hace scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ========================================
// RESALTAR ENLACE ACTIVO EN NAVEGACIÓN
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CONSOLE LOG DE BIENVENIDA
// ========================================

console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #5B4FE9;');
console.log('%cGracias por visitar mi portfolio', 'font-size: 14px; color: #6C757D;');
console.log('%cSi tienes alguna pregunta, no dudes en contactarme', 'font-size: 14px; color: #6C757D;');
