// store.js
let allProducts = [];
let filteredProducts = [];

function setAllProducts(data) {
  allProducts = data;
  filteredProducts = data;
}

function getAllProducts() {
  return allProducts;
}

function getFilteredProducts() {
  return filteredProducts;
}

function setFilteredProducts(data) {
  filteredProducts = data;
}

export {
  setAllProducts,
  getAllProducts,
  getFilteredProducts,
  setFilteredProducts,
};
