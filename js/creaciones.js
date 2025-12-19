import { products } from './products.js';
import { attachModalListeners } from './modal.js';

export function initGallery() {
const galleryGrid = document.querySelector('.gallery-grid');
if(!galleryGrid) return;

    // --- Variables de galería ---
    const productsPerPage = 6;
    let currentPage = 1;
    let filteredProducts = [...products];
 
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
        const prevBtn = document.createElement('a');
        prevBtn.classList.add('move-page-btn');
        prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="20" viewBox="0 0 16 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="icon icon-tabler icons-tabler-outline 
        icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" 
        fill="none"/><path d="M15 6l-6 6l6 6" />
        </svg>`;
        prevBtn.disabled = currentPage === 1;
        if(currentPage === 1){
            prevBtn.classList.add('active');
        }
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
            }
        });
        paginationDiv.appendChild(prevBtn);

        // Botones de páginas
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('a');

            btn.classList.add('btn-pagination');
            
            btn.textContent = i;
            if (i === currentPage){
                btn.classList.add('active');
            } 
            btn.addEventListener('click', () => {
                if(currentPage ===i)return;
                currentPage = i;
                renderGallery();
            });

            paginationDiv.appendChild(btn);
        }

        // Botón siguiente
        const nextBtn = document.createElement('a');
        nextBtn.classList.add('move-page-btn')
        nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="20" viewBox="0 0 16 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" />
        </svg>` ;
        if(currentPage === totalPages) {
            nextBtn.classList.add('active');
        }
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
}
