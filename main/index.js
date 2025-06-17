// main.js

import { applyPreloaderDarkBackground, runPreloaderAnimation } from '../JavaScript/preloader.js';
import { setupSideMenuToggle, setupSubmenuToggle } from '../JavaScript/menu.js';
import { updateCartCount, setupAddToCartButtons } from '../JavaScript/cart.js';
import { applyDarkModeToPage, loadDarkModePreference, toggleDarkMode } from '../JavaScript/theme.js';
import { initProducts } from '../JavaScript/mob-products.js';
import { renderPCProducts } from '../JavaScript/pc-products.js';
import { enableCategoryNavigation } from '../JavaScript/category.js';
import { filterButton } from '../JavaScript/filter-button.js';


const isDark = localStorage.getItem('darkMode') === 'true';
applyDarkModeToPage(isDark);
initProducts();
renderPCProducts(); 


document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setupAddToCartButtons();
  setupSideMenuToggle();
  setupSubmenuToggle();
  initProducts();
  enableCategoryNavigation();
 
  
  // Setup dark mode toggle buttons
  document.querySelectorAll('.dark-mode').forEach(button => {
    button.addEventListener('click', toggleDarkMode);
  });

  // Setup back buttons (if any)
  document.querySelectorAll('.back-btn').forEach(btn =>
    btn.addEventListener('click', () => history.back())
  );

  
    const productType = document.body.dataset.productType || 'all';
    renderPCProducts(productType);
    loadDarkModePreference();
});


    document.querySelectorAll('.heart').forEach(heart => {
      heart.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = heart.querySelector('i');
        icon.classList.toggle('bi-suit-heart');
        icon.classList.toggle('bi-suit-heart-fill');
      });
    });



applyPreloaderDarkBackground();
runPreloaderAnimation();
filterButton();