const filterBtn = document.querySelector('.filter-button');
const filterMenu = document.querySelector('.filter-menu');
const applyBtn = document.getElementById('apply-button');
const resetBtn = document.getElementById('reset-button');
const sortSelect = document.getElementById('sortOptions');
const priceRange = document.getElementById('priceRange');

// List of container class names to apply filters to
const filterableSections = [
  '.discover-section .mob-item-card',
  '.category .mob-item-card'
];

function getAllFilterableProducts() {
  return filterableSections
    .map(selector => Array.from(document.querySelectorAll(selector)))
    .flat();
}

function getPriceFromText(text) {
  // "1.500.000 IQD" -> 1500000
  return parseInt(text.replace(/\D/g, '')) || 0;
}

function applyFilters() {
  const maxPrice = parseInt(priceRange.value);
  const sortOption = sortSelect.value;
  const cards = getAllFilterableProducts();

  // Apply price filter
  cards.forEach(card => {
    let priceText;

    if (card.querySelector('.mob-item-price')) {
      priceText = card.querySelector('.mob-item-price').textContent;
    } else if (card.querySelector('.product-offer-price')) {
      priceText = card.querySelector('.product-offer-price').textContent;
    }

    const price = getPriceFromText(priceText);

    card.style.display = price <= maxPrice ? 'flex' : 'none';
  });

  // Apply sorting if needed
  if (sortOption) {
    let containerGroups = [
      document.querySelector('.discover-section .mob-items-container'),
      document.querySelector('.category')
    ];

    containerGroups.forEach(container => {
      if (!container) return;

      let items = Array.from(container.children);

      items.sort((a, b) => {
        const aName = (
          a.querySelector('.mob-item-name') ||
          a.querySelector('.product-offer-name')
        )?.textContent.trim().toLowerCase() || '';

        const bName = (
          b.querySelector('.mob-item-name') ||
          b.querySelector('.product-offer-name')
        )?.textContent.trim().toLowerCase() || '';

        const aPriceText =
          a.querySelector('.mob-item-price') ||
          a.querySelector('.product-offer-price');
        const bPriceText =
          b.querySelector('.mob-item-price') ||
          b.querySelector('.product-offer-price');

        const aPrice = getPriceFromText(aPriceText?.textContent || '');
        const bPrice = getPriceFromText(bPriceText?.textContent || '');

        switch (sortOption) {
          case 'price-asc':
            return aPrice - bPrice;
          case 'price-desc':
            return bPrice - aPrice;
          case 'a-z':
            return aName.localeCompare(bName);
          case 'z-a':
            return bName.localeCompare(aName);
          default:
            return 0;
        }
      });

      items.forEach(item => container.appendChild(item));
    });
  }
}

function resetFilters() {
  priceRange.value = 3000000;
  document.getElementById('priceValue').textContent = priceRange.value;
  sortSelect.value = '';

  getAllFilterableProducts().forEach(card => {
    card.style.display = 'flex';
  });
}

// Filter toggle (your existing code remains the same)
function filterButtonToggling() {
  if (filterBtn && filterMenu) {
    filterBtn.addEventListener('click', () => {
      const isVisible = filterMenu.style.display === 'block';
      filterMenu.style.display = isVisible ? 'none' : 'block';

      if (!isVisible) {
        const btnRect = filterBtn.getBoundingClientRect();
        const menuHeight = filterMenu.offsetHeight;
        const spaceBelow = window.innerHeight - btnRect.bottom;
        const spaceAbove = btnRect.top;

        let top;
        if (spaceBelow >= menuHeight + 20) {
          top = btnRect.bottom + 10;
        } else if (spaceAbove >= menuHeight + 20) {
          top = btnRect.top - menuHeight - 10;
        } else {
          top = btnRect.bottom + 10;
        }

        filterMenu.style.position = 'absolute';
        filterMenu.style.top = `${top + window.scrollY}px`;
        filterMenu.style.right = '10px';
        filterMenu.style.zIndex = '1000';
      }
    });

    document.addEventListener('click', (event) => {
      if (
        filterMenu.style.display === 'block' &&
        !filterBtn.contains(event.target) &&
        !filterMenu.contains(event.target)
      ) {
        filterMenu.style.display = 'none';
      }
    });
  }
}

// Update price value display on input
if (priceRange) priceRange.addEventListener('input', () => {
  document.getElementById('priceValue').textContent = priceRange.value;
});

// Apply / Reset Event Listeners
if (applyBtn) applyBtn.addEventListener('click', applyFilters);
if (resetBtn) resetBtn.addEventListener('click', resetFilters);

filterButtonToggling();

function filterButton() {
  filterButtonToggling,
  applyFilters,
  resetFilters
}

// Export if needed
export {
  filterButton
};
