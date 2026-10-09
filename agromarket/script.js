async function loadProducts() {
  const catalog = document.querySelector('.catalog');
  try {
    const response = await fetch('http://localhost:3001/products');
    if (!response.ok) {
      throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    catalog.innerHTML = `
      <p class="error">
        Не удалось загрузить товары. Проверьте, запущен ли json-server
        (npx json-server --watch db.json --port 3001).
      </p>
    `;
    console.error('Ошибка загрузки товаров:', error);
  }
}

function renderProducts(products) {
  const catalog = document.querySelector('.catalog');
  const cartCount = document.getElementById('cart-count');
  let count = 0;

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} тг</p>
      <button>В корзину</button>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', () => {
      count += 1;
      cartCount.textContent = count;
    });

    catalog.appendChild(card);
  });
}

loadProducts();
