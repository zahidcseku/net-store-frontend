import { motion } from "framer-motion";

const OFFER_IMAGES = [
  { src: "/offer-8.webp", alt: "HP ProOne 800 G3 all-in-one PC, now £99" },
  { src: "/offer-2.webp", alt: "Half price — HP EliteBook x360 13.3-inch touchscreen, now £125" },
  { src: "/offer-10.webp", alt: "HP 800 G1 desktop PC with 23-inch monitor, now £69" },
  { src: "/offer-1.webp", alt: "£150 off — Apple MacBook Pro 16-inch, now £299" },
  { src: "/offer-6.webp", alt: "Lenovo ThinkPad T480s 14-inch, now £149" },
  { src: "/offer-4.webp", alt: "£150 off — Samsung Galaxy Book Ion 15.6-inch, now £199" },
  { src: "/offer-3.webp", alt: "Half price — Apple iMac 4K Retina all-in-one, now £149" },
  { src: "/offer-7.webp", alt: "Dell Latitude 5400 14-inch touchscreen, now £119" },
  { src: "/offer-9.webp", alt: "Half price — HP EliteDesk 800 G3 desktop PC, now £79" },
  { src: "/offer-5.webp", alt: "HP EliteBook 840 G8 14-inch business laptop, now £249" },
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
          <img src="/hero.webp" alt="Custom gaming PC builds from £249" />
        </div>
      </motion.section>

      <section className="container ribbon" aria-label="Offers">
        {OFFER_IMAGES.map(({ src, alt }, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ribbon-card">
              <img src={src} alt={alt} loading="lazy" />
            </div>
          </motion.div>
        ))}
      </section>
    </>
  );
}
