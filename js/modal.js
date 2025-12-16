export function openModal(product) {
    const modal = document.getElementById('product-modal');
    modal.querySelector('.modal-image img').src = product.img;
    modal.querySelector('.modal-image img').alt = product.nombre;
    modal.querySelector('.modal-name').textContent = product.nombre;
    modal.querySelector('.modal-description').textContent = product.descripcion;
    modal.querySelector('.modal-description-long').textContent = product.descripcionLarga || '';
    modal.querySelector('.modal-material').textContent = product.material || '';
    modal.querySelector('.modal-dimensions').textContent = product.dimensiones || '';
    modal.querySelector('.modal-usage').textContent = product.uso || '';

    modal.classList.add('active');
}

// Función para conectar productos existentes con el modal
export function attachModalListeners() {
    const modal = document.getElementById('product-modal');
    const modalClose = modal.querySelector('.modal-close');

    document.querySelectorAll('.prod').forEach((productEl) => {
        if (productEl.dataset.modalAttached) return;
        productEl.dataset.modalAttached = 'true';

        const id = productEl.dataset.id;
        productEl.addEventListener('click', () => {
            import('./products.js').then(({products}) => {
                const product = products.find(p=> p.id ==id);
                openModal(product);
            });
        });
    });

    // Cerrar modal
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });
}