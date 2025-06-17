import { applyDarkModeToPage } from "./theme.js";

const colorCirclesHTML = `
  <div class="color-circles">
    <h1 class="laptop-color">Colors</h1>
    <div class="circles">
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="circle-3"></div>
    </div>
  </div>
`;

function createProductCard(product, type) {
  const isLaptop = type === "laptop";
  const nameClass = isLaptop ? "laptop-name" : "acc-name product-name";
  const priceClass = isLaptop ? "laptop-price" : "acc-price";
  const cardClass = isLaptop ? "lap-1" : "acc-1";

  return `
    <div class="${cardClass} product-card"
         data-name="${product.name}"
         data-price="${product.priceDisplay}"
         data-sku="${product.sku}"
         data-brand="${product.brand}"
         data-color="${product.color}"
         data-form="${product.form}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h1 class="${nameClass}">${product.name}</h1>
      <h1 class="${priceClass}">${product.priceDisplay}</h1>
      ${colorCirclesHTML}
      <button class="add-to-cart"
              data-name="${product.name}"
              data-price="${product.priceValue}"
              data-image="${product.image}">
        Add to Cart
      </button>
    </div>
  `;
}

function setupProductClickEvents() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent Add to Cart button clicks from triggering navigation
      if (e.target.closest('.add-to-cart')) return;

      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        sku: card.dataset.sku,
        brand: card.dataset.brand,
        color: card.dataset.color,
        form: card.dataset.form,
        image: card.querySelector('img').src
      };

      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '/product/product.html';
    });
  });
}

async function renderPCProducts(category = 'all') {
  try {
    const response = await fetch('/JSON/pcProducts.json'); // Change this to your actual JSON path
    if (!response.ok) throw new Error('Failed to load product data');
    const productsData = await response.json();

    // Containers for each category
    const laptopsContainer = document.querySelector('.laptops-cards');
    const accessoriesContainer = document.querySelector('.accessories-cards');
    const audiosContainer = document.querySelector('.audios-cards');

    // Clear all containers first
    if (laptopsContainer) laptopsContainer.innerHTML = '';
    if (accessoriesContainer) accessoriesContainer.innerHTML = '';
    if (audiosContainer) audiosContainer.innerHTML = '';

    // Helper to render array of products into container with type
    function renderIntoContainer(products, container, type) {
      if (!container) return;
      const cardsHTML = products.slice(0, 4).map(p => createProductCard(p, type)).join('');
      container.innerHTML = cardsHTML;
    }

    if (category === 'all') {
      // Show all categories in their containers, max 4 each
      renderIntoContainer(productsData.laptops, laptopsContainer, 'laptop');
      renderIntoContainer(productsData.accessories, accessoriesContainer, 'accessory');
      renderIntoContainer(productsData.audios || [], audiosContainer, 'audio');
    } else if (category === 'laptop') {
      renderIntoContainer(productsData.laptops, laptopsContainer, 'laptop');
    } else if (category === 'accessory') {
      renderIntoContainer(productsData.accessories, accessoriesContainer, 'accessory');
    } else if (category === 'audio') {
      renderIntoContainer(productsData.audios || [], audiosContainer, 'audio');
    }

    setupProductClickEvents();

  } catch (error) {
    console.error('Error rendering products:', error);
  }

  const isDark = localStorage.getItem('darkMode') === 'true';
  applyDarkModeToPage(isDark);
}


function setupAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();  // Prevent parent click
      // Your existing Add to Cart logic (show popup etc) goes here
    });
  });
}

setupAddToCartButtons();

// Example usage: call this with the category you want to display
// On main page: renderProductsPage('all');
// On laptop page: renderProductsPage('laptop');
// On accessory page: renderProductsPage('accessory');

export { renderPCProducts };
