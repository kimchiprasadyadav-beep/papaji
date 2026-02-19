# AKG Art — Business Architecture

## The Vision
Turn abhaykumargautam.com from a portfolio into a full art business platform.

## Revenue Streams & How Each Works

### 1. 🎨 Original Paintings (₹15K - ₹5L)
- **How it sells:** Browse gallery → fall in love → WhatsApp inquiry → conversation → payment → shipping
- **Why not cart checkout:** Originals are one-of-a-kind. Buyers want to ask questions, negotiate, understand the piece. WhatsApp creates a personal relationship.
- **On site:** Gallery with "Inquire" button → WhatsApp with pre-filled message ("Hi, I'm interested in [painting name]")
- **Pricing display:** Show price range or "Price on request" for premium pieces

### 2. 🖼️ Limited Edition Prints (₹2,999 - ₹14,999)
- **How it sells:** Standard e-commerce. Pick size, pick frame option, add to cart, pay.
- **This is the Shopify play.** Standardized products, multiple sizes, inventory management.
- **Tiers:** 
  - Unframed print (₹2,999 - ₹4,999)
  - Museum-framed (₹6,999 - ₹9,999) 
  - Canvas gallery wrap (₹8,999 - ₹14,999)
- **Edition size:** 50 prints per painting. Numbered & signed.
- **Fulfillment:** Printrove India or local Kanpur printer

### 3. 🎯 Commissioned Work (₹25K - ₹3L)
- **How it sells:** WhatsApp-first. Client describes what they want → Papaji sketches concept → approval → painting → delivery
- **On site:** "Commission a Painting" page with process explanation + WhatsApp CTA
- **Types:** Custom horse portraits, family homes/landscapes, corporate murals

### 4. 🎓 Art Workshops (₹3,999 - ₹9,999)
- **How it sells:** Book & pay online (Shopify or Razorpay link)
- **Types:**
  - Weekend oil painting workshop (in-person, Kanpur) — ₹5,999
  - Online masterclass series (4 sessions, Zoom) — ₹3,999
  - One-on-one mentorship (monthly) — ₹9,999
- **On site:** Workshop page with dates, what you'll learn, book now button

### 5. 🏢 Corporate Art (₹50K - ₹5L+)
- **How it sells:** Dedicated page for hotels/offices/restaurants
- **On site:** "Art for Spaces" page with mockups in commercial settings + WhatsApp/email inquiry

## Tech Architecture

### Option A: Shopify Storefront (Recommended)
```
Website (Next.js on Vercel) — main site, gallery, about, story
    ↕ 
Shopify Lite / Storefront API — handles prints, workshops, payments
    ↕
Razorpay — Indian payment gateway (UPI, cards, net banking)
```
- **Cost:** Shopify Basic = ₹1,994/mo ($24) OR Shopify Lite = ₹750/mo ($9)
- **Pros:** Inventory management, order tracking, shipping labels, abandoned cart emails
- **Cons:** Monthly cost, learning curve

### Option B: Razorpay-only (Simpler, Cheaper)
```
Website (Next.js on Vercel) — everything
    ↕
Razorpay Payment Links / Checkout — per-product payment pages
    ↕
Google Sheets / Notion — order tracking
```
- **Cost:** Razorpay = 2% per transaction (no monthly fee)
- **Pros:** Zero monthly cost, simple, Indian-first
- **Cons:** No built-in inventory/shipping management

### Option C: Hybrid (Best of Both)
```
Website (Next.js) — gallery, story, originals (WhatsApp inquiry)
    ↕
Shopify Buy Button — embedded on prints/workshops pages only
    ↕
WhatsApp Business API — for originals + commissions
```
- Use Shopify Buy Button (₹750/mo) just for standardized products
- Everything else through WhatsApp + manual invoicing

## Recommended: Option C (Hybrid)

### Why:
- Originals & commissions = personal (WhatsApp)
- Prints & workshops = transactional (Shopify)
- Website stays fast & beautiful (Next.js)
- Low monthly cost (₹750/mo Shopify Lite)
- Indian payments work perfectly (Razorpay via Shopify)

## Site Structure

```
/ (Home)
├── Hero (full-bleed painting + name)
├── Gallery (masonry grid, all works)
│   └── Each painting: lightbox + "Inquire on WhatsApp" / "Buy Print"
├── Prints Shop (Shopify-powered)
│   └── Each print: size selector, frame option, add to cart
├── Commissions
│   └── Process explanation + WhatsApp CTA
├── Workshops
│   └── Upcoming dates + book now (Shopify/Razorpay)
├── Art for Spaces (corporate)
│   └── Mockups in commercial settings + inquiry form
├── The Artist (expanded story)
│   └── Full narrative + timeline + philosophy
├── Contact
│   └── WhatsApp (primary) + Email + Studio location
└── Footer
```

## WhatsApp Integration
- Use `https://wa.me/91XXXXXXXXXX?text=` URLs
- Pre-fill contextual messages:
  - Gallery: "Hi, I'm interested in 'The Polo Match' painting"
  - Commission: "Hi, I'd like to commission a custom painting"
  - General: "Hi, I'd like to know more about your artwork"
- WhatsApp Business profile for Papaji with catalog

## Immediate Next Steps
1. Get Papaji's WhatsApp number
2. Set up Shopify Lite account (₹750/mo)
3. Get high-res scans of paintings for prints
4. Update website with new sections
5. Set up Instagram @abhaygautam.art
