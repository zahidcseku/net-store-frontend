import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CategoryTiles from "../components/CategoryTiles";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

const OFFER_IMAGES = [
  "/offer-1.webp", "/offer-2.webp", "/offer-3.webp", "/offer-4.webp",
  "/offer-5.webp", "/offer-6.webp", "/offer-7.webp",
];

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
      <motion.section
        className="hero-banner"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-frame">
          <img src="/hero.webp" alt="the net store — electronics, delivered fast" />
        </div>
      </motion.section>

      <section className="container ribbon" aria-label="Offers">
        {OFFER_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ribbon-card">
              <img src={src} alt={`Offer ${i + 1}`} loading="lazy" />
            </div>
          </motion.div>
        ))}
      </section>

      <CategoryTiles />

      <section className="container separator-band" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/separator1.webp" alt="" loading="lazy" />
        </motion.div>
      </section>

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
