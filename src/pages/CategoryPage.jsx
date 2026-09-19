import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategoryById } from "../lib/api";
import { brands as allBrands } from "../data/mockData";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sub = searchParams.get("sub") || "";
  const sort = searchParams.get("sort") || "relevance";

  const category = getCategoryById(categoryId);
  const [products, setProducts] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(300000);

  useEffect(() => {
    setProducts(null);
    getProducts({ category: categoryId, subcategory: sub || undefined, sort }).then(setProducts);
  }, [categoryId, sub, sort]);

  const filtered = useMemo(() => {
    if (!products) return null;
    return products.filter(
      (p) => (!selectedBrands.length || selectedBrands.includes(p.brand)) && p.price <= maxPrice
    );
  }, [products, selectedBrands, maxPrice]);

  const availableBrands = useMemo(() => {
    if (!products) return [];
    return allBrands.filter((b) => products.some((p) => p.brand === b));
  }, [products]);

  function toggleBrand(b) {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  if (!category) {
    return <div className="container section"><p>Category not found.</p></div>;
  }

  return (
    <>
      <Breadcrumbs trail={[{ label: category.name, to: `/category/${category.id}` }, ...(sub ? [{ label: sub }] : [])]} />
      <div className="container cat-header">
        <h1>{sub || category.name}</h1>
        <p>{filtered ? `${filtered.length} products` : "Loading…"}</p>
      </div>

      <div className="container cat-layout">
        <aside className="cat-filters">
          <div className="filter-block">
            <h3><SlidersHorizontal size={14} /> Subcategory</h3>
            <ul className="filter-list">
              <li>
                <button className={!sub ? "active" : ""} onClick={() => setSearchParams((p) => { p.delete("sub"); return p; })}>
                  All {category.name}
                </button>
              </li>
              {category.subcategories.map((s) => (
                <li key={s}>
                  <button className={sub === s ? "active" : ""} onClick={() => setSearchParams((p) => { p.set("sub", s); return p; })}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {availableBrands.length > 0 && (
            <div className="filter-block">
              <h3>Brand</h3>
              <ul className="filter-list">
                {availableBrands.map((b) => (
                  <li key={b}>
                    <label className="filter-checkbox">
                      <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                      {b}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="filter-block">
            <h3>Max price: ৳{maxPrice.toLocaleString("en-IN")}</h3>
            <input
              type="range" min="2000" max="300000" step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>
        </aside>

        <div className="cat-results">
          <div className="cat-toolbar">
            <select value={sort} onChange={(e) => setSearchParams((p) => { p.set("sort", e.target.value); return p; })}>
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {!filtered ? (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="product-card-skeleton" />)}
            </div>
          ) : filtered.length === 0 ? (
            <p className="cat-empty">No products match these filters.</p>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
