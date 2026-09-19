import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Truck, Banknote, Smartphone as PhoneIcon, CreditCard, Loader2 } from "lucide-react";
import { formatBDT } from "../lib/currency";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../lib/api";
import "./CheckoutPage.css";

const DELIVERY_FLAT = 80;
const FREE_DELIVERY_THRESHOLD = 2000;

const DISTRICTS = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", icon: Banknote, note: "Pay when your order arrives" },
  { id: "bkash", label: "bKash", icon: PhoneIcon, note: "Pay via bKash mobile wallet" },
  { id: "nagad", label: "Nagad", icon: PhoneIcon, note: "Pay via Nagad mobile wallet" },
  { id: "card", label: "Debit/Credit Card", icon: CreditCard, note: "Visa, Mastercard" },
];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", district: "Dhaka", address: "" });
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FLAT;
  const total = subtotal + delivery;

  if (items.length === 0) return <Navigate to="/cart" replace />;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await placeOrder({
        customer: form,
        paymentMethod: payment,
        items: items.map((i) => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price })),
        subtotal, delivery, total,
      });
      clear();
      navigate("/order-confirmation", { state: result });
    } catch (err) {
      setError("We couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <section className="checkout-section">
            <h2><Truck size={16} /> Delivery details</h2>
            <div className="form-grid">
              <label>
                Full name
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Rafiul Islam" />
              </label>
              <label>
                Phone number
                <input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="01XXXXXXXXX" />
              </label>
              <label>
                District
                <select value={form.district} onChange={(e) => update("district", e.target.value)}>
                  {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>
              <label className="form-span-2">
                Full address
                <textarea required rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House, road, area" />
              </label>
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment method</h2>
            <div className="payment-grid">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <label key={m.id} className={`payment-option ${payment === m.id ? "selected" : ""}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} />
                    <Icon size={18} />
                    <div>
                      <strong>{m.label}</strong>
                      <span>{m.note}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {error && <p className="checkout-error">{error}</p>}
        </div>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <ul className="checkout-item-list">
            {items.map((i) => (
              <li key={i.id}>
                <span>{i.name} <em>×{i.qty}</em></span>
                <span>{formatBDT(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="cs-row"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
          <div className="cs-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatBDT(delivery)}</span></div>
          <div className="cs-row cs-total"><span>Total</span><span>{formatBDT(total)}</span></div>
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? <><Loader2 size={16} className="spin" /> Placing order…</> : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
