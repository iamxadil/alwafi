// Container where pagination buttons will be rendered
const paginationContainer = document.querySelector('.pagination-container');

/**
 * Setup pagination buttons
 * @param {number} totalItems - total number of items
 * @param {number} itemsPerPage - how many items per page
 * @param {number} currentPage - current active page (1-based)
 * @param {(page:number) => void} onPageChange - callback when page changes
 */
function setupPagination(totalItems, itemsPerPage, currentPage, onPageChange) {
  if (!paginationContainer) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) {
    paginationContainer.innerHTML = ''; // no pagination needed
    return;
  }

  let buttonsHTML = '';

  // Previous button (disabled on first page)
  buttonsHTML += `
    <button class="pagination-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}><i class="bi bi-arrow-left-short"></i></button>
  `;

  // Page number buttons (show max 5 pages, with current highlighted)
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if near the end
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    buttonsHTML += `
      <button class="pagination-btn page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
    `;
  }

  // Next button (disabled on last page)
  buttonsHTML += `
    <button class="pagination-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}><i class="bi bi-arrow-right-short"></i></button>
  `;

  paginationContainer.innerHTML = buttonsHTML;

  // Event delegation for clicks
  paginationContainer.onclick = (e) => {
    const target = e.target;
    if (!target.classList.contains('pagination-btn') || target.disabled) return;

    if (target.classList.contains('prev-btn') && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (target.classList.contains('next-btn') && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (target.classList.contains('page-btn')) {
      const page = Number(target.dataset.page);
      if (page !== currentPage) {
        onPageChange(page);
      }
    }
  };
}

export { setupPagination };
