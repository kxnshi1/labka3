import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard.jsx';

const PRODUCTS_URL = 'http://localhost:3001/products';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_URL);

        if (!response.ok) {
          throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (loadError) {
        console.error('Ошибка загрузки товаров:', loadError);
        setError(
          'Не удалось загрузить товары. Проверьте, запущен ли json-server на порту 3001.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchTerm),
  );

  function handleAddToCart() {
    setCartCount((currentCount) => currentCount + 1);
  }

  return (
    <div className="app">
      <header>
        <h1>АгроМаркет</h1>
        <div className="cart" aria-live="polite">
          🛒 Корзина: {cartCount}
        </div>
      </header>

      <main>
        <section aria-labelledby="catalog-title">
          <div className="catalog-heading">
            <h2 id="catalog-title">Каталог</h2>
            <input
              type="search"
              placeholder="Поиск товара..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Поиск товара"
            />
          </div>

          {loading && <p className="status">Загрузка...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <>
              <div className="catalog">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="status">Товары не найдены.</p>
              )}
            </>
          )}
        </section>
      </main>

      <footer>
        <p>Лабораторная работа №3 — React, props, state, hooks</p>
      </footer>
    </div>
  );
}

export default App;
