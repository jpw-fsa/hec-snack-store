import type { Product } from '../data/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card" data-product-id={product.id}>
      <div className="card-emoji" aria-hidden="true">
        {product.emoji}
      </div>
      <h2 className="card-name">{product.name}</h2>
      <p className="card-price">${product.price.toFixed(2)}</p>
      <ul className="card-tags">
        {product.tags.map((tag) => (
          <li key={tag} className={`tag tag-${tag}`}>
            {tag}
          </li>
        ))}
      </ul>
      <p className="card-stock">{product.stock} left</p>
    </article>
  )
}
