
import '../main/index.js';

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const clearButton = document.getElementById("clear-cart");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty" style="grid-column: 3; padding: 2rem 0;">Your cart is empty.</p>`;
    if (clearButton) clearButton.style.display = "none";
    applyDarkMode();
    return;
  }

  if (clearButton) clearButton.style.display = "inline-block";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <button class="remove-btn" data-index="${index}"><i class="lni lni-xmark-circle"></i></button>
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}">
        <div class="name">${item.name}</div>
      </div>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">−</button>
        <span>${item.quantity || 1}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <div class="price">${Number(item.price).toLocaleString()} IQD</div>
    `;

    container.appendChild(row);
  });

  setEventListeners();
  applyDarkMode();
}

function setEventListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = () => {
      const i = btn.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    };
  });

  document.querySelectorAll(".increase").forEach(btn => {
    btn.onclick = () => updateQuantity(btn.dataset.index, 1);
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.onclick = () => updateQuantity(btn.dataset.index, -1);
  });
}

function updateQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[index];
  item.quantity = Math.max(1, (item.quantity || 1) + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function applyDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "true";
  const body = document.body;

  if (isDark) {
    body.classList.add("dark-mode-style");

    document.querySelectorAll(
      '.cart-item, .name, .price, .quantity-controls, .remove-btn, .cart-empty, .cart-header-row div, .increase, .decrease'
    ).forEach(el => el.classList.add("dark-text"));

    document.querySelectorAll('.payment-btn, #clear-cart').forEach(el => el.classList.add("dark-btn"));

  } else {
    body.classList.remove("dark-mode-style");

    document.querySelectorAll(
      '.cart-item, .name, .price, .quantity-controls, .remove-btn, .cart-empty, .cart-header-row div, .increase, .decrease'
    ).forEach(el => el.classList.remove("dark-text"));

    document.querySelectorAll('.payment-btn, #clear-cart').forEach(el => el.classList.remove("dark-btn"));
  }
}

// Handle clear cart button
document.getElementById("clear-cart")?.addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});


document.addEventListener("DOMContentLoaded", renderCart);