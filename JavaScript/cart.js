// cart.js

function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function setupAddToCartButtons() {
  document.body.addEventListener('click', (e) => {
    const button = e.target.closest('.add-to-cart');
    if (!button) return;
    e.stopPropagation();
    e.preventDefault();

    const name = button.getAttribute("data-name");
    const priceRaw = button.getAttribute("data-price") || "0";
    // Sanitize price to number
    const price = Number(priceRaw.replace(/\./g, '')) || 0;
    const image = button.getAttribute("data-image");

    const item = { name, price, image, quantity: 1 };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    const cartPopup = document.getElementById("cart-popup");
    if (!cartPopup) return;

    cartPopup.querySelector('.popup-content').innerHTML = `
      <p>Item added to cart:</p>
      <div class="popup-item">
        <img src="${image}" alt="${name}" style="width: 100px;">
        <h2>${name}</h2>
        <p>Price: ${price.toLocaleString()} IQD</p>
      </div>
      <div class="popup-buttons">
        <button id="continue-shopping">Continue Shopping</button>
        <a href="../cart/cart.html"><button id="go-to-cart">Go to Cart</button></a>
      </div>
    `;

    document.getElementById("continue-shopping").onclick = () => {
      cartPopup.style.display = "none";
    };
    cartPopup.style.display = "flex";
  });
}

export {
  updateCartCount,
  setupAddToCartButtons
};
