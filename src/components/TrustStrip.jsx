import { ShieldCheck, Truck, Headphones, Wallet } from "lucide-react";
import "./TrustStrip.css";

// Trust badges — sits directly under the header's category menu bar.
// (Previously rendered at the top of the Footer.)
export default function TrustStrip() {
  return (
    <div className="trust-band">
    <div className="container trust-strip">
      <div className="trust-item">
        <ShieldCheck size={20} />
        <strong>Official warranty</strong>
      </div>
      <div className="trust-item">
        <Truck size={20} />
        <strong>Nationwide delivery</strong>
      </div>
      <div className="trust-item">
        <Wallet size={20} />
        <strong>Flexible payment</strong>
      </div>
      <div className="trust-item">
        <Headphones size={20} />
        <strong>Real support</strong>
      </div>
    </div>
    </div>
  );
}
