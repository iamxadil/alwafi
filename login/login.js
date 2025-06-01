// File: login/login.js
import '../main/index.js'
import { wafiLogo, pageBody, darkModeButton } from '../main/index.js';
const searchIcon = document.getElementById('search-icon');
const navSearchInput = document.getElementById('nav-search-input');
const navH1 = searchIcon.closest('h1');




//Dark Mode Toggle
darkModeButton.addEventListener('click', () => {

    wafiLogo.src = pageBody.classList.contains('dark-mode-style') 
    ? '../Assests/Icons/wafi-logo-outline-white.svg' 
    : '../Assests/Icons/wafi-logo-outline.svg';

    navSearchInput.classList.toggle('dark-input');

   
 


});

// Search input pop animation in nav

searchIcon.addEventListener('click', () => {
  navH1.classList.toggle('search-active');
  if (navH1.classList.contains('search-active')) {
    navSearchInput.focus();
    
  } else {
    navSearchInput.blur();
    
  }
});

// Optional: Hide input when clicking outside
document.addEventListener('click', (e) => {
  if (
    !navH1.contains(e.target) &&
    navH1.classList.contains('search-active')
  ) {
    navH1.classList.remove('search-active');
    navSearchInput.blur();
  }
});


