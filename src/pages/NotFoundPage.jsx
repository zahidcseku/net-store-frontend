import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "90px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Page not found</h1>
      <p style={{ color: "var(--ink-faint)", marginBottom: 20 }}>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
