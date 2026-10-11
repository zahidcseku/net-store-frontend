import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ProductImage from "./ProductImage";
import Rating from "./Rating";
import { formatPrice, discountPercent } from "../lib/currency";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const pct = discountPercent(product.price, product.oldPrice);

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card-media">
        <ProductImage category={product.category} size={56} />
        {product.badge && <span className={`pc-badge pc-badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        {pct > 0 && <span className="pc-discount">-{pct}%</span>}
      </Link>
      <div className="product-card-body">
        <span className="pc-brand">{product.brand}</span>
        <Link to={`/product/${product.slug}`} className="pc-name">{product.name}</Link>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="pc-price-row">
          <span className="pc-price">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="pc-old-price">{formatPrice(product.oldPrice)}</span>}
        </div>
        <button
          className="btn btn-dark btn-sm btn-block pc-add"
          onClick={() => addItem(product, 1)}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={15} />
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
