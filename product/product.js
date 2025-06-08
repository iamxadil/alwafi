import '../main/index.js';


// Fetch product data from localStorage
const productData = JSON.parse(localStorage.getItem('selectedProduct'));

if (productData) {
  // Update image
  document.getElementById('main-image').src = productData.image;
  document.getElementById('thumb-1').src = productData.image;
  document.getElementById('thumb-2').src = productData.image;
  document.getElementById('thumb-3').src = productData.image;

  // Update text content
  document.getElementById('product-name').textContent = productData.name;
  document.getElementById('product-price').textContent = productData.price;
  document.getElementById('product-sku').textContent = productData.sku;
  document.getElementById('product-brand').textContent = productData.brand;
  document.getElementById('product-color').textContent = productData.color;
  document.getElementById('product-form').textContent = productData.form;
} else {
  console.warn('No product data found in localStorage');
}


