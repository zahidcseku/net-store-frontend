import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Truck, ChevronDown, Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/mockData";
import "./Header.css";

const ICONS = { Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard };

export default function Header() {
  const { count } = useCart();
  const [openCat, setOpenCat] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenCat(null);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <span className="top-bar-item"><Truck size={14} /> Free delivery inside Dhaka on orders over ৳2,000</span>
          <span className="top-bar-item top-bar-hide-sm">Cash on Delivery · bKash · Nagad · Card</span>
        </div>
      </div>

      <div className="container main-bar">
        <button className="icon-btn mobile-only" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand">
          <span className="brand-mark">বি</span>
          <span className="brand-name">Bijli</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search laptops, phones, monitors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search"><Search size={18} /></button>
        </form>

        <Link to="/cart" className="cart-link" aria-label={`Cart, ${count} items`}>
          <ShoppingCart size={22} />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
      </div>

      <nav className={`mega-nav ${mobileOpen ? "mega-nav-open" : ""}`} ref={navRef}>
        <ul className="container mega-nav-list">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <li
                key={cat.id}
                className="mega-nav-item"
                onMouseEnter={() => setOpenCat(cat.id)}
                onMouseLeave={() => setOpenCat(null)}
              >
                <button
                  className="mega-nav-trigger"
                  onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                  aria-expanded={openCat === cat.id}
                >
                  {Icon && <Icon size={16} />}
                  {cat.name}
                  <ChevronDown size={14} />
                </button>
                {openCat === cat.id && (
                  <div className="mega-panel">
                    <Link to={`/category/${cat.id}`} className="mega-panel-all" onClick={() => setMobileOpen(false)}>
                      Shop all {cat.name}
                    </Link>
                    <ul>
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                            onClick={() => { setOpenCat(null); setMobileOpen(false); }}
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
