import { useLocation, Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "../lib/currency";
import "./OrderConfirmationPage.css";

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  if (!state?.orderId) return <Navigate to="/" replace />;

  return (
    <div className="container confirm-page">
      <CheckCircle2 size={48} color="var(--success)" />
      <h1>Order placed!</h1>
      <p>Thanks — your order <strong>#{state.orderId}</strong> is confirmed. We'll email you a confirmation with delivery details.</p>
      <div className="confirm-total">Total: {formatPrice(state.total)}</div>
      <Link to="/" className="btn btn-dark">Continue shopping</Link>
    </div>
  );
}
