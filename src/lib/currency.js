// Formats an integer amount of GBP with standard digit grouping (e.g. £1,249).
export function formatPrice(amount) {
  if (amount == null) return "";
  const n = Math.round(amount);
  return (n < 0 ? "-" : "") + "£" + Math.abs(n).toLocaleString("en-GB");
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
