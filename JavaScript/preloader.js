// preloader.js
function applyPreloaderDarkBackground() {
  const isDark = localStorage.getItem('darkMode') === 'true';
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.backgroundColor = isDark ? '#121212' : '#ffffff';
    preloader.querySelectorAll('.logo-stroke').forEach(path => {
      path.style.stroke = isDark ? 'white' : 'black';
      path.style.fill = 'none';
    });
  }
}

function runPreloaderAnimation() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll('.logo-stroke').forEach(path => path.classList.add('filled'));
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.display = "none", 200);
      }
    }, 1500);
  });
}

export {
  applyPreloaderDarkBackground,
  runPreloaderAnimation
};
