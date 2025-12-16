import { products } from './products.js';
import { attachModalListeners } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {

    const featuredProducts = products.filter(p => p.destacado);
    const productsContainer = document.querySelector('.products');
    
    featuredProducts.forEach((product) => {
        const div = document.createElement('div');
        div.classList.add('product', 'prod');
        div.dataset.id = product.id;
        div.innerHTML = `
            <div>
                <img src="${product.img}" alt="${product.nombre}">
            </div>
            <h4>${product.nombre}</h4>
            <p>${product.descripcion}</p>
        `;
        productsContainer.appendChild(div);
    });
    attachModalListeners();


    const btnPrev = document.querySelector('.obras--header button[aria-label="Anterior"]');
    const btnNext = document.querySelector('.obras--header button[aria-label="Siguiente"]');

    btnPrev.addEventListener('click', () => {
        const productWidth = productsContainer.querySelector('.product').offsetWidth + 20;
        productsContainer.scrollBy({ left: -productWidth, behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
        const productWidth = productsContainer.querySelector('.product').offsetWidth + 20;
        productsContainer.scrollBy({ left: productWidth, behavior: 'smooth' });
    });

});