import '../login/login.js';
import '../main/index.js';

import { darkModeButton } from '../main/index.js';

const exploreButton = document.querySelector('.explore-button');

darkModeButton.addEventListener('click', () => {
  exploreButton.classList.toggle('dark-search-button');
});

