import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow"><Zap size={14} /> Restock just landed</span>
          <h1>Power your work, gaming and everything after.</h1>
          <p>Genuine laptops, phones and monitors — with real warranty, real support, and delivery you can actually track.</p>
          <div className="hero-actions">
            <Link to="/category/laptops" className="btn btn-primary">Shop laptops <ArrowRight size={16} /></Link>
            <Link to="/category/phones" className="btn hero-btn-secondary">Shop phones</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-bolt">
            <svg viewBox="0 0 120 160" width="140">
              <polygon points="70,0 20,90 55,90 40,160 100,60 62,60" fill="var(--amber)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
