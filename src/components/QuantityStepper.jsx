import { Minus, Plus } from "lucide-react";
import "./QuantityStepper.css";

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="qty-stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={14} />
      </button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  );
}
