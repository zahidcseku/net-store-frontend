import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import CategoryTiles from "../components/CategoryTiles";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

export default function HomePage() {
  const [deals, setDeals] = useState(null);
  const [popular, setPopular] = useState(null);

  useEffect(() => {
    let alive = true;
    getProducts({ sort: "rating" }).then((all) => {
      if (!alive) return;
      setDeals(all.filter((p) => p.oldPrice).slice(0, 4));
      setPopular(all.slice(0, 8));
    });
    return () => { alive = false; };
  }, []);

  return (
    <>
      <Hero />
      <CategoryTiles />

      <section className="container section">
        <div className="section-head">
          <h2>Deals ending soon</h2>
          <Link to="/category/laptops" className="section-link">See all <ArrowRight size={14} /></Link>
        </div>
        <div className="product-grid">
          {(deals || Array.from({ length: 4 })).map((p, i) =>
            p ? <ProductCard key={p.id} product={p} /> : <div key={i} className="product-card-skeleton" />
          )}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Popular right now</h2>
        </div>
        <div className="product-grid">
          {(popular || Array.from({ length: 8 })).map((p, i) =>
            p ? <ProductCard key={p.id} product={p} /> : <div key={i} className="product-card-skeleton" />
          )}
        </div>
      </section>
    </>
  );
}
