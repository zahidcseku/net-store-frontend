// Formats an integer amount of Bangladeshi Taka using the
// South Asian digit grouping (e.g. 1,24,999 not 124,999).
export function formatBDT(amount) {
  if (amount == null) return "";
  const n = Math.round(amount);
  const s = Math.abs(n).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3;
  return (n < 0 ? "-" : "") + "৳" + grouped;
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
