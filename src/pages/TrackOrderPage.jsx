import { Link } from "react-router-dom";

export default function TrackOrderPage() {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "90px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Track your order</h1>
      <p style={{ color: "var(--ink-faint)", marginBottom: 20 }}>
        Order tracking is coming soon. We'll email you a tracking link when your order ships.
      </p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
