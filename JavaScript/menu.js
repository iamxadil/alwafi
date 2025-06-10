function setupSideMenuToggle() {
  const sideMenu = document.querySelector('.side-menu');
  const cancelButton = document.querySelector('.cancel-btn');
  const twoBars = document.querySelectorAll('.two-bars-menu');

  twoBars.forEach(bar => {
    bar.addEventListener('click', () => {
      if (!sideMenu) return;
      sideMenu.style.display = 'flex';
      sideMenu.style.opacity = '0';
      sideMenu.style.transition = 'opacity 0.5s ease';
      setTimeout(() => sideMenu.style.opacity = '1', 10);
    });
  });

  cancelButton?.addEventListener('click', () => {
    if (!sideMenu) return;
    sideMenu.style.opacity = '0';
    setTimeout(() => sideMenu.style.display = 'none', 500);
  });
}

function setupSubmenuToggle() {
  const productsToggle = document.querySelector('.products-toggle');
  const productsMenu = document.querySelector('.products-menu');

  productsToggle?.addEventListener('click', () => {
    productsMenu?.classList.toggle('active');
  });
}

export {
  setupSideMenuToggle,
  setupSubmenuToggle
};
