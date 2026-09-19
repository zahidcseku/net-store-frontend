import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState(null);

  useEffect(() => {
    setResults(null);
    getProducts({ q }).then(setResults);
  }, [q]);

  return (
    <div className="container section">
      <div className="section-head">
        <h2>{results ? `${results.length} results for "${q}"` : `Searching for "${q}"…`}</h2>
      </div>
      {results && results.length === 0 ? (
        <p style={{ color: "var(--ink-faint)" }}>No products matched your search. Try a different term.</p>
      ) : (
        <div className="product-grid">
          {(results || Array.from({ length: 8 })).map((p, i) =>
            p ? <ProductCard key={p.id} product={p} /> : <div key={i} className="product-card-skeleton" />
          )}
        </div>
      )}
    </div>
  );
}
