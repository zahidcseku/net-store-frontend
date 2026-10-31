import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { categories } from "../data/mockData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Net Store</div>
          <p className="footer-blurb">Genuine laptops, phones, monitors and components — delivered across the UK with real warranty backing.</p>
          <ul className="footer-contact">
            <li>
              <Phone size={15} />
              <a href="tel:+447949698279">+447949698279</a>
            </li>
            <li>
              <MapPin size={15} />
              <a
                href="https://www.google.com/maps/search/?api=1&query=734%20Green%20Lane%2C%20Dagenham%20RM8%201YX"
                target="_blank"
                rel="noopener noreferrer"
              >
                734 Green Lane, Dagenham RM8 1YX
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.id}><Link to={`/category/${c.id}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><Link to="/track-order">Track your order</Link></li>
            <li><Link to="/">Delivery information</Link></li>
            <li><Link to="/">Warranty & returns</Link></li>
            <li><Link to="/">Contact support</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About Net Store</Link></li>
            <li><Link to="/">Business enquiries</Link></li>
            <li><Link to="/">Careers</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Net Store Electronics. All rights reserved.</span>
        <span className="footer-payments">Visa · Mastercard · Amex · PayPal · Apple Pay · Google Pay</span>
      </div>
    </footer>
  );
}
