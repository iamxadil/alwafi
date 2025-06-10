// sliderNavigation.js
export function enableCategoryNavigation() {
 // main.js
document.querySelectorAll('.sec-slide').forEach(slide => {
  slide.addEventListener('click', () => {
    const category = slide.getAttribute('data-category');
    if (category) {
      window.location.href = `filtered-products/filtered-products.html?type=${encodeURIComponent(category)}`;
    }
  });
});

}
