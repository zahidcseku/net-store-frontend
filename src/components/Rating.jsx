import { Star } from "lucide-react";

export default function Rating({ value, count, size = 13 }) {
  return (
    <div className="rating" style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ display: "flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            fill={n <= Math.round(value) ? "var(--amber)" : "none"}
            color={n <= Math.round(value) ? "var(--amber)" : "var(--line)"}
          />
        ))}
      </div>
      {count != null && <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>({count})</span>}
    </div>
  );
}
