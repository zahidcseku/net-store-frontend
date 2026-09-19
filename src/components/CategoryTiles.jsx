import { Link } from "react-router-dom";
import { Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard, ArrowRight } from "lucide-react";
import { categories } from "../data/mockData";
import "./CategoryTiles.css";

const ICONS = { Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard };

export default function CategoryTiles() {
  return (
    <section className="container section">
      <div className="section-head">
        <h2>Shop by category</h2>
      </div>
      <div className="cat-tiles">
        {categories.map((c) => {
          const Icon = ICONS[c.icon];
          return (
            <Link to={`/category/${c.id}`} key={c.id} className="cat-tile">
              <div className="cat-tile-icon"><Icon size={22} /></div>
              <div className="cat-tile-copy">
                <strong>{c.name}</strong>
                <span>{c.blurb}</span>
              </div>
              <ArrowRight size={16} className="cat-tile-arrow" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
