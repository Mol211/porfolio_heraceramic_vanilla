import { products } from './products.js';
import { attachModalListeners } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {

    // --- Variables de galería ---
    const productsPerPage = 6;
    let currentPage = 1;
    let filteredProducts = [...products];

    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryFooter = document.querySelector('.gallery-footer');
    const galleryCount = galleryFooter.querySelector('.gallery-count');
    const paginationDiv = galleryFooter.querySelector('.pagination-buttons');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- Render galería ---
    function renderGallery() {
        galleryGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            galleryGrid.innerHTML = `
                <div class="item-not-found">
                    <div class="gallery-item-info">
                        <h3>Actualmente no existen productos en esta categoría</h3>
                    </div>
                </div>`;
            galleryCount.textContent = '';
            paginationDiv.innerHTML = '';
            return;
        }

        const start = (currentPage - 1) * productsPerPage;
        const paginated = filteredProducts.slice(start, start + productsPerPage);

        paginated.forEach((product) => {
            const div = document.createElement('div');
            div.classList.add('gallery-item', 'prod');
            div.dataset.id = product.id;
            div.dataset.category = product.categoria;
            div.innerHTML = `
                <div class="gallery-item-image">
                    <img src="${product.img}" alt="${product.nombre}">
                </div>
                <div class="gallery-item-info">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                </div>`;
            galleryGrid.appendChild(div);
        });

        galleryCount.textContent = `Mostrando ${paginated.length} de ${filteredProducts.length} piezas`;

        renderPagination();

        // Asignar modal a los productos recién creados
        attachModalListeners();
    }

    // --- Paginación ---
    function renderPagination() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        paginationDiv.innerHTML = '';

        if (totalPages <= 1) return;

        // Botón anterior
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '<';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
            }
        });
        paginationDiv.appendChild(prevBtn);

        // Botones de páginas
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            if (i === currentPage) btn.classList.add('active');
            btn.addEventListener('click', () => {
                currentPage = i;
                renderGallery();
            });
            paginationDiv.appendChild(btn);
        }

        // Botón siguiente
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
            }
        });
        paginationDiv.appendChild(nextBtn);
    }

    // --- Filtros ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            filteredProducts = filter === 'all'
                ? [...products]
                : products.filter(p => p.categoria === filter);

            currentPage = 1;
            renderGallery();
        });
    });

    // --- Inicializar galería ---
    renderGallery();
});
