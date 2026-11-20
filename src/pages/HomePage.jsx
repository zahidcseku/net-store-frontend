import { motion } from "framer-motion";

const EVENT_BANNER = {
  src: "/bf-event-banner.webp",
  alt: "Black Friday deals at The Net Store — 23 to 29 November, all mobile accessories half price",
};

const OFFER_IMAGES = [
  { src: "/offer-macbook-pro-16.webp", alt: "£150 off — Apple MacBook Pro 16-inch, now £299" },
  { src: "/offer-elitedesk-800-g3-mini.webp", alt: "Half price — HP EliteDesk 800 G3 Mini business PC, now £99" },
  { src: "/offer-imac-a1418.webp", alt: "Half price — Apple iMac A1418 all-in-one desktop, now £149" },
  { src: "/offer-thinkpad-x380-yoga.webp", alt: "£100 off — Lenovo ThinkPad X380 Yoga 2-in-1 touchscreen, now £149" },
  { src: "/offer-galaxy-book-ion.webp", alt: "£150 off — Samsung Galaxy Book Ion 15.6-inch, now £199" },
  { src: "/offer-hp-800-g1-bundle.webp", alt: "£80 off — HP 800 G1 desktop bundle with 23-inch monitor, now £149.99" },
  { src: "/offer-proone-800-g3.webp", alt: "£50 off — HP ProOne 800 G3 all-in-one PC, now £149.99" },
  { src: "/offer-iphone-11.webp", alt: "£60 off — refurbished iPhone 11 64GB, now £89" },
  { src: "/offer-imac-4k.webp", alt: "Half price — Apple iMac 4K Retina all-in-one, now £149" },
];

const GIVEAWAY_BANNER = {
  src: "/bf-speaker-giveaway.webp",
  alt: "Free Prevo MS03 Bluetooth speaker for the first 20 customers spending £20 or more",
};

export default function HomePage() {
  return (
    <>
      <motion.section
        className="container banner-strip lead"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={EVENT_BANNER.src} alt={EVENT_BANNER.alt} />
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

      <motion.section
        className="container banner-strip"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={GIVEAWAY_BANNER.src} alt={GIVEAWAY_BANNER.alt} loading="lazy" />
      </motion.section>
    </>
  );
}
