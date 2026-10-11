import { motion } from "framer-motion";

const OFFER_IMAGES = [
  "/offer-1.webp", "/offer-2.webp", "/offer-3.webp", "/offer-4.webp",
  "/offer-5.webp", "/offer-6.webp", "/offer-7.webp",
];

export default function HomePage() {
  return (
    <>
      <motion.section
        className="hero-banner"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-frame">
          <img src="/hero.webp" alt="the net store — electronics, delivered fast" />
        </div>
      </motion.section>

      <section className="container ribbon" aria-label="Offers">
        {OFFER_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ribbon-card">
              <img src={src} alt={`Offer ${i + 1}`} loading="lazy" />
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}
