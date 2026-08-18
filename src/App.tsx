import { products } from './data/products'
import { ProductCard } from './components/ProductCard'

export default function App() {
  return (
    <div className="shop">
      <header className="header">
        <h1 className="logo">🛍️ Snack Store</h1>
        <span className="cart" aria-label="cart">
          🛒 <span className="cart-count">0</span>
        </span>
      </header>
      <main className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
      <footer className="footer">Snack Store — the HEC bake-off sandbox. See TICKET.md for your mission.</footer>
    </div>
  )
}
