import { Link } from "react-router-dom";
import { ShieldCheck, Truck, Headphones, Wallet } from "lucide-react";
import { categories } from "../data/mockData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container trust-strip">
        <div className="trust-item"><ShieldCheck size={20} /><div><strong>Official warranty</strong><span>On every product we sell</span></div></div>
        <div className="trust-item"><Truck size={20} /><div><strong>Nationwide delivery</strong><span>Pick your delivery day</span></div></div>
        <div className="trust-item"><Wallet size={20} /><div><strong>Flexible payment</strong><span>COD, bKash, Nagad, Card</span></div></div>
        <div className="trust-item"><Headphones size={20} /><div><strong>Real support</strong><span>Dhaka-based, 7 days a week</span></div></div>
      </div>

      <div className="container footer-grid">
        <div>
          <div className="footer-brand">Bijli</div>
          <p className="footer-blurb">Genuine laptops, phones, monitors and components — delivered across Bangladesh with real warranty backing.</p>
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
            <li><Link to="/">Track your order</Link></li>
            <li><Link to="/">Delivery information</Link></li>
            <li><Link to="/">Warranty & returns</Link></li>
            <li><Link to="/">Contact support</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About Bijli</Link></li>
            <li><Link to="/">Business enquiries</Link></li>
            <li><Link to="/">Careers</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Bijli Electronics. All rights reserved.</span>
        <span className="footer-payments">Cash on Delivery · bKash · Nagad · Visa · Mastercard</span>
      </div>
    </footer>
  );
}
