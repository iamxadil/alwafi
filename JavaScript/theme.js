// theme.js
const pageBody = document.querySelector('body');
const wafiLogos = document.querySelectorAll('.wafi-logo');
const SearchButton = document.querySelector('.search-button');
const homeButton = document.querySelector('.home-button');

function applyDarkModeToPage(isDark) {
  if (!pageBody) return;
  const elements = {
    texts: document.querySelectorAll('h1, a, .bi-person, p, span, .name, .price, .cart-item, .quantity-controls, .remove-btn, i'),
    allButtons: document.querySelectorAll('button'),
    allInputs: document.querySelectorAll('input'),
    theTwoBars: document.querySelectorAll('.first-bar, .second-bar'),
    labels: document.querySelectorAll('label'),
    citySelect: document.querySelector('#citySelect'),
    contBorders: document.querySelectorAll('.cont-border'),
    sliderBorders: document.querySelectorAll('.slider-border'),
    filterButton: document.querySelector('.filter-button')
  };

  pageBody.classList.toggle('dark-mode-style', isDark);
  elements.texts.forEach(el => el.classList.toggle('dark-text', isDark));
  elements.allButtons.forEach(el => el.classList.toggle('dark-button', isDark));
  elements.allInputs.forEach(el => el.classList.toggle('dark-button', isDark));
  elements.theTwoBars.forEach(el => el.classList.toggle('dark-bars', isDark));
  elements.labels.forEach(el => el.classList.toggle('dark-label', isDark));
  elements.contBorders.forEach(el => el.classList.toggle('dark-border', isDark));
  elements.sliderBorders.forEach(el => el.classList.toggle('dark-border', isDark));
  if(elements.citySelect) elements.citySelect.classList.toggle('dark-border', isDark);
  if(elements.filterButton) elements.filterButton.classList.toggle('dark-border', isDark);
  if(SearchButton) SearchButton.classList.toggle('dark-search-button', isDark);

  if(homeButton) homeButton.style.color = isDark ? 'white' : 'black';

  wafiLogos.forEach(logo => {
    logo.src = isDark
      ? '/Assests/Icons/wafi-logo-outline-white.svg'
      : '/Assests/Icons/wafi-logo-outline.svg';
  });
}

function loadDarkModePreference() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  applyDarkModeToPage(isDark);
  console.log('[Dark Mode] Loaded preference:', isDark);
}

function toggleDarkMode() {
  const isDark = !pageBody.classList.contains('dark-mode-style');
  localStorage.setItem('darkMode', isDark);
  applyDarkModeToPage(isDark);
}

export {
  applyDarkModeToPage,
  loadDarkModePreference,
  toggleDarkMode
};
