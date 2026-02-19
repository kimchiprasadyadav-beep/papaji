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
            Made by Hand. Shaped by Life.
          </motion.p>
        </div>
      </section>

      {/* PHILOSOPHY STRIP */}
      <section className="py-16 px-6 md:px-12 text-center" style={{ backgroundColor: "#111" }}>
        <FadeIn>
          <p
            className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto italic"
            style={{ color: "#faf8f5bb", fontFamily: "'Cormorant Garamond', serif" }}
          >
            In a world of AI-generated images and digital shortcuts, these paintings are made
            the old way — by hand, with paint under the fingernails and sixty years of lived
            experience behind every brushstroke.
          </p>
        </FadeIn>
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
          <p
            className="mt-4 text-lg font-light max-w-xl mx-auto"
            style={{ color: "#faf8f577", fontFamily: "'Cormorant Garamond', serif" }}
          >
            Each piece carries the texture of a human life — earned, not generated.
          </p>
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
          <p className="mt-4 text-lg font-light max-w-xl mx-auto" style={{ color: "#faf8f5aa", fontFamily: "'Cormorant Garamond', serif" }}>
            Art that has lived deserves a home that lives. See how these works transform a room.
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

      {/* ORIGIN STORY — text strip */}
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#111" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-10 text-center"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Journey
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {[
              { year: "Bareilly", text: "Born in a small town in rural Uttar Pradesh. A strict father — a school principal. Lost his mother young. Raised his siblings." },
              { year: "Art School", text: "Found refuge in art — not as escape, but as translation. Every joy, every grief became pigment on canvas, form in clay." },
              { year: "Doctorate", text: "Studied art formally and earned a doctorate. Not for credentials, but to understand the thing that understood him." },
              { year: "30+ Years", text: "Taught at BN SD College, Kanpur. Shaped generations of young artists. Gave them technique. Gave them permission." },
              { year: "Now", text: "Retired from the classroom, not from the canvas. Returning to his own work — making art the way it was meant to be made. By hand." },
            ].map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 md:gap-10 items-start">
                  <span
                    className="text-xs tracking-[0.3em] uppercase whitespace-nowrap pt-1.5 w-24 text-right flex-shrink-0"
                    style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.year}
                  </span>
                  <p
                    className="text-base md:text-lg font-light leading-relaxed"
                    style={{ color: "#faf8f5aa", fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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

      {/* COLLECT / OFFERINGS */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: "#111" }}>
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-4 text-center"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Collect
            </h2>
            <p
              className="text-center text-lg font-light mb-16 max-w-2xl mx-auto"
              style={{ color: "#faf8f599", fontFamily: "'Cormorant Garamond', serif" }}
            >
              When you bring one of his paintings into your home, you&apos;re not buying a decoration.
              You&apos;re inheriting a piece of someone&apos;s life — six decades of creation, signed by the artist in his Kanpur studio.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Original Paintings",
                price: "₹15,000 — ₹5,00,000",
                desc: "One-of-a-kind works in oil, watercolor, and mixed media. Each piece is unique and comes with a certificate of authenticity.",
                cta: "Inquire via WhatsApp",
                wa: "Hi, I'm interested in purchasing an original painting by Abhay Kumar Gautam.",
              },
              {
                title: "Limited Edition Prints",
                price: "₹2,999 — ₹14,999",
                desc: "Museum-quality giclée prints on archival paper. Numbered and signed. Editions of 50. Available framed or unframed.",
                cta: "Order a Print",
                wa: "Hi, I'd like to order a limited edition print.",
              },
              {
                title: "Commission a Painting",
                price: "₹25,000 — ₹3,00,000",
                desc: "A bespoke painting created to your vision — horses, landscapes, portraits, or abstract. Includes concept sketch and revisions.",
                cta: "Start a Commission",
                wa: "Hi, I'd like to commission a custom painting.",
              },
              {
                title: "Art Workshops",
                price: "₹3,999 — ₹9,999",
                desc: "Learn from a master with 30+ years of teaching. Oil painting, watercolor, and sculpture. In-person (Kanpur) or online.",
                cta: "Join a Workshop",
                wa: "Hi, I'm interested in attending an art workshop.",
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={0.1}>
                <div
                  className="border p-8 h-full flex flex-col justify-between transition-all duration-300 hover:border-[#c4a265]"
                  style={{ borderColor: "#333", backgroundColor: "#1a1a1a" }}
                >
                  <div>
                    <h3
                      className="text-lg mb-2"
                      style={{ color: "#faf8f5", fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.price}
                    </p>
                    <p
                      className="text-sm leading-relaxed font-light"
                      style={{ color: "#faf8f588", fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/919140651620?text=${encodeURIComponent(item.wa)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-xs tracking-[0.3em] uppercase py-3 px-6 border text-center transition-all duration-300"
                    style={{ borderColor: "#c4a265", color: "#c4a265" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#c4a265";
                      e.currentTarget.style.color = "#1a1a1a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#c4a265";
                    }}
                  >
                    {item.cta}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: "#c4a265", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Get in Touch
            </h2>
            <p className="text-lg font-light mb-6" style={{ color: "#faf8f5cc", fontFamily: "'Cormorant Garamond', serif" }}>
              Studio: Kanpur, Uttar Pradesh, India
            </p>
            <a
              href="https://wa.me/919140651620?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20artwork."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase py-4 px-10 border transition-all duration-300 mb-6"
              style={{ borderColor: "#25D366", color: "#25D366" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#25D366";
                e.currentTarget.style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#25D366";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Message on WhatsApp
            </a>
            <p className="text-sm font-light" style={{ color: "#faf8f566" }}>
              or email{" "}
              <a href="mailto:abhay.gautam.art@gmail.com" className="underline" style={{ color: "#faf8f588" }}>
                abhay.gautam.art@gmail.com
              </a>
            </p>
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
