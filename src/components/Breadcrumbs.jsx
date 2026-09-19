import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ trail }) {
  return (
    <nav className="container breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {trail.map((t, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ChevronRight size={13} />
          {t.to ? <Link to={t.to}>{t.label}</Link> : <span>{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}
