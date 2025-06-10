const colorCirclesHTML = `
  <div class="color-circles">
    <h1 class="laptop-color">Colors</h1>
    <div class="circles">
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      <div class="circle-3"></div>
    </div>
  </div>
`;

const laptopData = [
  {
    name: "ASUS ROG STRIX G16 G614JI-N3169",
    priceDisplay: "2.000.000 IQD",
    priceValue: 2000000,
    image: "/Assests/Images/laptop-img.png",
    sku: "G614JI-N3169",
    brand: "ASUS",
    color: "Black",
    form: "Gaming"
  },
  {
    name: "ASUS ROG STRIX G16 G614JI-N3169",
    priceDisplay: "2.000.000 IQD",
    priceValue: 2000000,
    image: "/Assests/Images/laptop-img.png",
    sku: "G614JI-N3169",
    brand: "ASUS",
    color: "Black",
    form: "Gaming"
  },
  {
    name: "ASUS ROG STRIX G16 G614JI-N3169",
    priceDisplay: "2.000.000 IQD",
    priceValue: 2000000,
    image: "/Assests/Images/laptop-img.png",
    sku: "G614JI-N3169",
    brand: "ASUS",
    color: "Black",
    form: "Gaming"
  },
  {
    name: "ASUS ROG STRIX G16 G614JI-N3169",
    priceDisplay: "2.000.000 IQD",
    priceValue: 2000000,
    image: "/Assests/Images/laptop-img.png",
    sku: "G614JI-N3169",
    brand: "ASUS",
    color: "Black",
    form: "Gaming"
  }
];

const accessoriesData = [
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  }
];


const audiosData = [
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },
  {
    name: "WIRELESS FANTECH WH06",
    priceDisplay: "75.000 IQD",
    priceValue: 75000,
    image: "/Assests/Images/Headset.png",
    sku: "WH06",
    brand: "Fantech",
    color: "white",
    form: "Over Ear"
  },


]

function createProductCard(product, type) {
  const isLaptop = type === "laptop";
  const nameClass = isLaptop ? "laptop-name" : "acc-name product-name";
  const priceClass = isLaptop ? "laptop-price" : "acc-price";
  const cardClass = isLaptop ? "lap-1" : "acc-1";

  return `
    <div class="${cardClass} product-card"
         data-name="${product.name}"
         data-price="${product.priceDisplay}"
         data-sku="${product.sku}"
         data-brand="${product.brand}"
         data-color="${product.color}"
         data-form="${product.form}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h1 class="${nameClass}">${product.name}</h1>
      <h1 class="${priceClass}">${product.priceDisplay}</h1>
      ${colorCirclesHTML}
      <button class="add-to-cart"
              data-name="${product.name}"
              data-price="${product.priceValue}"
              data-image="${product.image}">
        Add to Cart
      </button>
    </div>
  `;
}

function setupProductClickEvents() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent button click (like Add to Cart) from triggering navigation
      if (e.target.closest('.add-to-cart')) return;

      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        sku: card.dataset.sku,
        brand: card.dataset.brand,
        color: card.dataset.color,
        form: card.dataset.form,
        image: card.querySelector('img').src
      };

      localStorage.setItem('selectedProduct', JSON.stringify(product));
      window.location.href = '/product/product.html';
    });
  });
}

function renderPCProducts(type = 'all') {
  const laptopsContainer = document.querySelector('.laptops-cards');
  const accessoriesContainer = document.querySelector('.accessories-cards');
  const audiosContainer = document.querySelector('.audios-cards');

  if (laptopsContainer) laptopsContainer.innerHTML = '';
  if (accessoriesContainer) accessoriesContainer.innerHTML = '';
  if (audiosContainer) audiosContainer.innerHTML = '';

  switch(type) {
    case 'laptop':
      if (laptopsContainer) {
        laptopsContainer.innerHTML = laptopData
          .slice(0, 4)
          .map(product => createProductCard(product, 'laptop'))
          .join('');
      }
      break;

    case 'accessory':
      if (accessoriesContainer) {
        accessoriesContainer.innerHTML = accessoriesData
          .slice(0, 4)
          .map(product => createProductCard(product, 'accessory'))
          .join('');
      }
      break;

    case 'audio':
      if (audiosContainer) {
        audiosContainer.innerHTML = audiosData
          .slice(0, 4)
          .map(product => createProductCard(product, 'audio'))
          .join('');
      }
      break;

    case 'all':
    default:
      if (laptopsContainer) {
        laptopsContainer.innerHTML = laptopData
          .slice(0, 4)
          .map(product => createProductCard(product, 'laptop'))
          .join('');
      }
      if (accessoriesContainer) {
        accessoriesContainer.innerHTML = accessoriesData
          .slice(0, 4)
          .map(product => createProductCard(product, 'accessory'))
          .join('');
      }
      break;
  }

  // Set up click events after rendering
  setupProductClickEvents();
}

export { renderPCProducts };
