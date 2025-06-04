import '../main/index.js';
import '../login/login.js';

import { darkModeButton } from '../main/index.js';

// Handle toggle on dark mode button click
darkModeButton.addEventListener('click', () => {
  const textarea = document.querySelector('.message-input textarea');
  const isDark = document.body.classList.contains('dark-mode-style');

  if (textarea) {
    textarea.style.color = isDark ? 'white' : 'black';
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('.message-input textarea');
  const isDark = localStorage.getItem('darkMode') === 'true';

  if (textarea) {
    textarea.style.color = isDark ? 'white' : 'black';
  }
});


