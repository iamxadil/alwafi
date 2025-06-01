import '../main/index.js';
import '../login/login.js';


import { darkModeButton } from '../main/index.js';


darkModeButton.addEventListener('click', () => {

const textarea = document.querySelector('.message-input textarea');

textarea.classList.toggle('dark-textarea');
});

