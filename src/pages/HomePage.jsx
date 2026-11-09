import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.section
      className="hero-banner"
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-frame">
        <img src="/hero.webp" alt="Custom gaming PC builds from £249" />
      </div>
    </motion.section>
  );
}
