import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import ProductImage from "../components/ProductImage";
import QuantityStepper from "../components/QuantityStepper";
import { formatPrice } from "../lib/currency";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const DELIVERY_FLAT = 5; // £
const FREE_DELIVERY_THRESHOLD = 100; // £

export default function CartPage() {
  const { items, subtotal, setQty, removeItem } = useCart();
  const navigate = useNavigate();
  const delivery = items.length === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FLAT;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <ShoppingBag size={40} color="var(--ink-faint)" />
        <h1>Your cart is empty</h1>
        <p>Browse our catalog and add something you like.</p>
        <Link to="/" className="btn btn-primary">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <Link to={`/product/${item.slug}`} className="cart-item-media">
                <ProductImage category={item.category} size={32} />
              </Link>
              <div className="cart-item-info">
                <span className="ci-brand">{item.brand}</span>
                <Link to={`/product/${item.slug}`} className="ci-name">{item.name}</Link>
                <span className="ci-price-mobile">{formatPrice(item.price)}</span>
              </div>
              <div className="cart-item-qty">
                <QuantityStepper value={item.qty} onChange={(q) => setQty(item.id, q)} max={item.stock} />
              </div>
              <div className="cart-item-total">{formatPrice(item.price * item.qty)}</div>
              <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                <Trash2 size={17} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="cs-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="cs-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
          </div>
          {delivery > 0 && (
            <p className="cs-hint">Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery.</p>
          )}
          <div className="cs-row cs-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <button className="btn btn-primary btn-block" onClick={() => navigate("/checkout")}>
            Proceed to checkout <ArrowRight size={16} />
          </button>
          <Link to="/" className="cs-continue">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
