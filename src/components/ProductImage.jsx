import { Laptop, Monitor, MonitorSmartphone, Smartphone, Cpu, Keyboard, Package } from "lucide-react";

// No real product photography ships with this starter — swap the
// <img> branch in here for the backend's actual image URLs once
// available. Until then, each category gets a consistent icon +
// gradient so the catalog still reads clearly at a glance.
const ICONS = {
  laptops: Laptop,
  desktops: Monitor,
  monitors: MonitorSmartphone,
  phones: Smartphone,
  components: Cpu,
  accessories: Keyboard,
};

const GRADIENTS = {
  laptops: "linear-gradient(135deg,#172a5c,#22397a)",
  desktops: "linear-gradient(135deg,#0f1b3d,#172a5c)",
  monitors: "linear-gradient(135deg,#22397a,#2c4a99)",
  phones: "linear-gradient(135deg,#0a1128,#22397a)",
  components: "linear-gradient(135deg,#172a5c,#2c4a99)",
  accessories: "linear-gradient(135deg,#0f1b3d,#22397a)",
};

export default function ProductImage({ category, size = 64, className = "", imageUrl }) {
  if (imageUrl) {
    return <img src={imageUrl} alt="" className={className} />;
  }
  const Icon = ICONS[category] || Package;
  return (
    <div
      className={className}
      style={{
        background: GRADIENTS[category] || GRADIENTS.laptops,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
      }}
      aria-hidden="true"
    >
      <Icon size={size} color="#ffffff" strokeWidth={1.4} opacity={0.9} />
    </div>
  );
}
