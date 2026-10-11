// ActionSearchBar — ported to this project's stack (plain JSX + CSS) from the
// shadcn/TS original. Same shape: debounced query, animated dropdown of
// actions, send/search icon swap, ⌘K to focus, ESC to close. Actions here are
// wired to real routes; the first row submits a product search.
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, PackageSearch, User, Laptop, Smartphone, Monitor } from "lucide-react";
import "./ActionSearchBar.css";

function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const quickActions = [
  {
    id: "track-order",
    label: "Track Order",
    description: "Orders & delivery",
    icon: <PackageSearch size={16} className="as-tint-blue" />,
    path: "/track-order",
    end: "Page",
  },
  {
    id: "account",
    label: "Account",
    description: "Your orders & settings",
    icon: <User size={16} className="as-tint-orange" />,
    path: "/account",
    end: "Page",
  },
  {
    id: "laptops",
    label: "Shop Laptops",
    description: "Everyday, gaming & creator",
    icon: <Laptop size={16} className="as-tint-purple" />,
    path: "/category/laptops",
    end: "Category",
  },
  {
    id: "phones",
    label: "Shop Phones",
    description: "Android & iOS",
    icon: <Smartphone size={16} className="as-tint-green" />,
    path: "/category/phones",
    end: "Category",
  },
  {
    id: "monitors",
    label: "Shop Monitors",
    description: "Everyday to 240Hz",
    icon: <Monitor size={16} className="as-tint-blue" />,
    path: "/category/monitors",
    end: "Category",
  },
];

const container = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: { height: { duration: 0.25 }, staggerChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

export default function ActionSearchBar({ actions = quickActions }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 200);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }
    if (!debouncedQuery) {
      setResult({ actions });
      return;
    }
    const needle = debouncedQuery.toLowerCase().trim();
    const searchAction = {
      id: "search",
      label: `Search for “${debouncedQuery.trim()}”`,
      description: "All products",
      icon: <Search size={16} className="as-tint-navy" />,
      end: "Enter",
    };
    const filtered = actions.filter(
      (a) =>
        a.label.toLowerCase().includes(needle) ||
        (a.description || "").toLowerCase().includes(needle)
    );
    setResult({ actions: [searchAction, ...filtered] });
  }, [debouncedQuery, isFocused, actions]);

  // ⌘K / Ctrl+K focuses the search input from anywhere on the page.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function runAction(action) {
    if (!action) return;
    if (action.id === "search") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else if (action.path) {
      navigate(action.path);
    }
    setQuery("");
    setIsFocused(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      runAction(result?.actions?.[0]);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }

  function handleSubmit() {
    if (query.trim()) runAction({ id: "search" });
    else inputRef.current?.focus();
  }

  return (
    <div className="action-search" role="search">
      <div className="as-input-wrap">
        <span className="as-icon-left">
          <Search size={18} />
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for products"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="as-submit" onClick={handleSubmit} aria-label="Search">
          <AnimatePresence mode="popLayout">
            {query.length > 0 ? (
              <motion.div
                key="send"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Send size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Search size={16} />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="as-submit-label">Search</span>
        </button>
      </div>

      <AnimatePresence>
        {isFocused && result && (
          <motion.div
            className="as-panel"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <ul>
              {result.actions.length === 0 && (
                <li className="as-empty">No matches — press Enter to search products.</li>
              )}
              {result.actions.map((action) => (
                <motion.li
                  key={action.id}
                  className="as-row"
                  variants={item}
                  layout
                  onClick={() => runAction(action)}
                >
                  <div className="as-row-main">
                    <span className="as-row-icon">{action.icon}</span>
                    <span className="as-row-label">{action.label}</span>
                    {action.description && (
                      <span className="as-row-desc">{action.description}</span>
                    )}
                  </div>
                  <div className="as-row-end">{action.end}</div>
                </motion.li>
              ))}
            </ul>
            <div className="as-footer">
              <span>Press ⌘K to search</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
