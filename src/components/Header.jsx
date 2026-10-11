import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenu } from "radix-ui";
import { ShoppingCart, Menu, X, MapPin, PackageSearch, User, ChevronDown, Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/mockData";
import ActionSearchBar from "./ActionSearchBar";
import "./Header.css";
import "./NavigationMenu.css";

const { Root, List, Item, Trigger, Content, Link: NavMenuLink } = NavigationMenu;
const ICONS = { Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard };

export default function Header() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeCat = categories.find((c) =>
    location.pathname.startsWith(`/category/${c.id}`)
  )?.id;

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <a className="top-bar-item" href="tel:+447782377307">
            <img src="/phone.png" alt="" className="top-bar-phone-logo" />
            +447782377307
          </a>
          <a
            className="top-bar-item top-bar-hide-sm"
            href="https://www.google.com/maps/search/?api=1&query=734%20Green%20Lane%2C%20Dagenham%20RM8%201YX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={16} />
            734 Green Lane, Dagenham RM8 1YX
          </a>
        </div>
      </div>

      <div className="container main-bar">
        <button className="icon-btn mobile-only" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="brand" aria-label="the net store — home">
          <img src="/logo.webp" alt="the net store" className="brand-logo" />
        </Link>

        <ActionSearchBar />

        <div className="header-actions">
          <Link to="/track-order" className="header-action">
            <PackageSearch size={22} />
            <span>Track Order</span>
          </Link>
          <Link to="/account" className="header-action">
            <User size={22} />
            <span>Account</span>
          </Link>
          <Link to="/cart" className="header-action" aria-label={`Cart, ${count} items`}>
            <span className="cart-icon-wrap">
              <ShoppingCart size={22} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </span>
            <span>Cart</span>
          </Link>
        </div>
      </div>

      <nav className={`mega-nav ${mobileOpen ? "mega-nav-open" : ""}`}>
        <Root className="nm-root" viewport={false}>
          <List className="nm-list container">
            {categories.map((cat) => {
              const Icon = ICONS[cat.icon];
              return (
                <Item key={cat.id} className="nm-item">
                  <Trigger className="nm-trigger" data-active={activeCat === cat.id}>
                    {Icon && <Icon size={15} />}
                    {cat.name}
                    <ChevronDown size={13} className="nm-chevron" />
                  </Trigger>
                  <Content className="nm-content">
                    <div className="nm-panel">
                      <NavMenuLink asChild>
                        <Link
                          to={`/category/${cat.id}`}
                          className="nm-featured"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="nm-title">Shop all {cat.name}</div>
                          <p className="nm-desc">{cat.blurb}</p>
                        </Link>
                      </NavMenuLink>
                      <ul className="nm-subs">
                        {cat.subcategories.map((sub) => (
                          <li key={sub}>
                            <NavMenuLink asChild>
                              <Link
                                to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                                onClick={() => setMobileOpen(false)}
                              >
                                <div className="nm-title">{sub}</div>
                              </Link>
                            </NavMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Content>
                </Item>
              );
            })}
          </List>
        </Root>
      </nav>
    </header>
  );
}
