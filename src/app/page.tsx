"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const artworks = [
  { src: "/images/artwork/polo-match.jpg", title: "Polo Match", w: 1200, h: 800 },
  { src: "/images/artwork/surreal-bells.jpg", title: "Surreal Bells", w: 1200, h: 900 },
  { src: "/images/artwork/woman-reading.jpg", title: "Woman Reading", w: 1200, h: 1500 },
  { src: "/images/artwork/rainy-park.jpg", title: "Rainy Park", w: 1200, h: 800 },
  { src: "/images/artwork/stormy-sea.jpg", title: "Stormy Sea", w: 1200, h: 800 },
  { src: "/images/artwork/sunset-boat.jpg", title: "Sunset Boat", w: 1200, h: 900 },
  { src: "/images/mockups/polo-match--in-gallery-dark.jpg", title: "Polo Match — Gallery View", w: 1200, h: 800 },
  { src: "/images/mockups/surreal-bells--in-gallery-dark.jpg", title: "Surreal Bells — Gallery View", w: 1200, h: 800 },
  { src: "/images/mockups/woman-reading--in-luxury-apartment.jpg", title: "Woman Reading — In Situ", w: 1200, h: 800 },
];

const mockups = [
  { src: "/images/mockups/polo-match--in-gallery-dark.jpg", title: "Polo Match in a gallery setting" },
  { src: "/images/mockups/stormy-sea--in-luxury-apartment.jpg", title: "Stormy Sea in a luxury apartment" },
  { src: "/images/mockups/woman-reading--in-luxury-apartment.jpg", title: "Woman Reading in a luxury apartment" },
  { src: "/images/mockups/rainy-park--in-modern-living.jpg", title: "Rainy Park in a modern living room" },
];

function GalleryItem({ item }: { item: typeof artworks[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={item.src}
        alt={item.title}
        width={item.w}
        height={item.h}
        className="w-full h-auto block transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
        loading="lazy"
        quality={85}
      />
      <div
        className="absolute inset-0 flex items-end p-4 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
        }}
      >
        <span className="text-[#faf8f5] text-sm tracking-[0.2em] uppercase font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [formSent, setFormSent] = useState(false);

  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end items-center px-6 md:px-12 py-6 mix-blend-difference">
        {["gallery", "about", "contact"].map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className="ml-8 text-xs tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#6b2d3e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#c4a265")}
          >
            {s}
          </a>
        ))}
      </nav>

      {/* HERO */}
      <section className="relative h-[90vh] overflow-hidden">
        <Image
          src="/images/artwork/polo-match.jpg"
          alt="Polo Match by Abhay Kumar Gautam"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-light leading-none tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf8f5" }}
          >
            Abhay Kumar Gautam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 text-xs sm:text-sm tracking-[0.4em] uppercase"
            style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
          >
            Paintings &amp; Sculpture
          </motion.p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="px-2 md:px-4 py-20">
        <FadeIn className="text-center mb-16">
          <h2
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
          >
            Selected Works
          </h2>
        </FadeIn>
        <div className="masonry max-w-[1600px] mx-auto">
          {artworks.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.05}>
              <GalleryItem item={item} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* IN YOUR SPACE */}
      <section className="py-20 px-4 md:px-12" style={{ backgroundColor: "#111" }}>
        <FadeIn className="text-center mb-16">
          <h2
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
          >
            In Your Space
          </h2>
          <p className="mt-4 text-lg font-light max-w-xl mx-auto" style={{ color: "#faf8f5aa" }}>
            Visualize how these works transform a room.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1400px] mx-auto">
          {mockups.map((m, i) => (
            <FadeIn key={m.src} delay={i * 0.1}>
              <div className="relative overflow-hidden group">
                <Image
                  src={m.src}
                  alt={m.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/portraits/artist-red-cap.jpg"
                alt="Abhay Kumar Gautam"
                fill
                className="object-cover"
                loading="lazy"
                quality={85}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Artist
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "#faf8f5cc", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Born in Bareilly, a small town in rural Uttar Pradesh, Abhay Kumar Gautam grew up
              under the watchful eye of a strict father — a school principal who believed in
              discipline above all else. He lost his mother young and found himself shouldering
              responsibility for his siblings before most children learn to carry anything at all.
            </p>
            <p
              className="mt-6 text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "#faf8f5cc", fontFamily: "'Cormorant Garamond', serif" }}
            >
              But somewhere between the hard work and the sorrow — he found art. Not as escape,
              but as translation. Every joy, every grief, every monsoon evening became pigment on
              canvas, form in clay. He studied art formally, earned a doctorate, and spent over
              thirty years teaching at BN SD College, Kanpur — shaping generations of young artists.
            </p>
            <p
              className="mt-6 text-lg md:text-xl leading-relaxed font-light"
              style={{ color: "#faf8f5cc", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Now retired from the classroom but not from the canvas, he is returning to where
              it all began — his own work. In a world flooding with AI-generated images and digital
              shortcuts, Abhay Kumar Gautam makes art the way it was meant to be made. By hand.
              With paint under his fingernails and six decades of lived experience behind every
              brushstroke.
            </p>
            <p
              className="mt-8 text-base tracking-wide italic"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              &ldquo;Sixty years of living. Every brushstroke earned.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12" style={{ backgroundColor: "#111" }}>
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Contact
            </h2>
            <p className="text-lg font-light mb-2" style={{ color: "#faf8f5cc" }}>
              Studio: Kanpur, India
            </p>
            <a
              href="mailto:abhay.gautam.art@gmail.com"
              className="text-lg transition-colors duration-300"
              style={{ color: "#c4a265" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6b2d3e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#c4a265")}
            >
              abhay.gautam.art@gmail.com
            </a>
          </FadeIn>

          <FadeIn delay={0.2}>
            {!formSent ? (
              <form
                className="mt-12 space-y-4 text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSent(true);
                }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-sm focus:outline-none transition-colors duration-300"
                  style={{ borderColor: "#333", color: "#faf8f5", fontFamily: "'Cormorant Garamond', serif" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c4a265")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-sm focus:outline-none transition-colors duration-300"
                  style={{ borderColor: "#333", color: "#faf8f5", fontFamily: "'Cormorant Garamond', serif" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c4a265")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b px-0 py-3 text-sm focus:outline-none resize-none transition-colors duration-300"
                  style={{ borderColor: "#333", color: "#faf8f5", fontFamily: "'Cormorant Garamond', serif" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#c4a265")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
                />
                <button
                  type="submit"
                  className="mt-4 text-xs tracking-[0.3em] uppercase py-3 px-8 border transition-all duration-300"
                  style={{ borderColor: "#c4a265", color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#c4a265";
                    e.currentTarget.style.color = "#1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#c4a265";
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            ) : (
              <p className="mt-12 text-lg" style={{ color: "#c4a265" }}>
                Thank you for your inquiry. We&apos;ll be in touch.
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center">
        <p className="text-xs tracking-[0.2em]" style={{ color: "#faf8f555" }}>
          © 2026 Abhay Kumar Gautam
        </p>
      </footer>
    </main>
  );
}
