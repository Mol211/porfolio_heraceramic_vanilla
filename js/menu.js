// ================================================
// MENÚ MÓVIL
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = navMenu.querySelectorAll('a');

    // Función para abrir/cerrar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Función para cerrar el menú
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle del menú al hacer click en el botón hamburguesa
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en el overlay
    menuOverlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer click en cualquier link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Cerrar menú al redimensionar la ventana a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});