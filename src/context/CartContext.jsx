import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bijli-cart-v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action;
      const existing = state.find((i) => i.id === product.id);
      if (existing) {
        return state.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i
        );
      }
      return [...state, {
        id: product.id, slug: product.slug, name: product.name, brand: product.brand,
        price: product.price, stock: product.stock, category: product.category, qty,
      }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "SET_QTY":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, Math.min(action.qty, i.stock)) } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      addItem: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
