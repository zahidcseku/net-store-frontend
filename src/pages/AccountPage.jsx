import { Link } from "react-router-dom";

export default function AccountPage() {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "90px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Your account</h1>
      <p style={{ color: "var(--ink-faint)", marginBottom: 20 }}>
        Accounts are coming soon — orders can currently be placed without one.
      </p>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}
