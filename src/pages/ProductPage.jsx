import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, ShoppingCart, Zap } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductImage from "../components/ProductImage";
import Rating from "../components/Rating";
import QuantityStepper from "../components/QuantityStepper";
import ProductCard from "../components/ProductCard";
import { formatPrice, discountPercent } from "../lib/currency";
import { getProductBySlug, getRelatedProducts, getCategoryById } from "../lib/api";
import { useCart } from "../context/CartContext";
import "./ProductPage.css";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    window.scrollTo(0, 0);
    getProductBySlug(slug).then((p) => {
      if (!p) { setNotFound(true); return; }
      setProduct(p);
      setQty(1);
      getRelatedProducts(p).then(setRelated);
    });
  }, [slug]);

  if (notFound) {
    return (
      <div className="container section">
        <p>We couldn't find that product.</p>
        <Link to="/" className="btn btn-dark" style={{ marginTop: 12 }}>Back to home</Link>
      </div>
    );
  }
  if (!product) {
    return <div className="container section"><div className="product-card-skeleton" style={{ height: 360 }} /></div>;
  }

  const category = getCategoryById(product.category);
  const pct = discountPercent(product.price, product.oldPrice);

  return (
    <>
      <Breadcrumbs
        trail={[
          { label: category?.name || product.category, to: `/category/${product.category}` },
          { label: product.name },
        ]}
      />
      <div className="container product-detail">
        <div className="pd-gallery">
          <ProductImage category={product.category} size={140} className="pd-gallery-main" />
        </div>

        <div className="pd-info">
          <span className="pd-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} size={15} />

          <div className="pd-price-block">
            <span className="pd-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="pd-old-price">{formatPrice(product.oldPrice)}</span>
                <span className="pd-pct">Save {pct}%</span>
              </>
            )}
          </div>

          <p className={`pd-stock ${product.stock > 0 ? "in" : "out"}`}>
            {product.stock > 0 ? `In stock — ${product.stock} available` : "Out of stock"}
          </p>

          <div className="pd-buy-row">
            <QuantityStepper value={qty} onChange={setQty} max={product.stock || 1} />
            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => addItem(product, qty)}
            >
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button
              className="btn btn-dark"
              disabled={product.stock === 0}
              onClick={() => { addItem(product, qty); navigate("/checkout"); }}
            >
              <Zap size={16} /> Buy now
            </button>
          </div>

          <div className="pd-trust">
            <span><ShieldCheck size={15} /> 12-month official warranty</span>
            <span><Truck size={15} /> Delivery in 1–3 business days</span>
            <span><RotateCcw size={15} /> 7-day replacement guarantee</span>
          </div>

          <div className="pd-specs">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k}><th>{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pd-description">
            <h3>Overview</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container section">
          <div className="section-head"><h2>You may also like</h2></div>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
