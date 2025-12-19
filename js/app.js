import { initGallery } from './creaciones.js';
import { initCarrousel } from './carousel.js';
import { initMenu } from './menu.js';
import { initForm } from './form.js';
import Swup from 'https://unpkg.com/swup@4?module';


const swup = new Swup();

function initPage() {
    initGallery();
    initCarrousel();
    initMenu();
    initForm();
}

 document.addEventListener('DOMContentLoaded', () => {
    initPage();
 })


swup.hooks.on('page:view', () => {
    initPage();
})