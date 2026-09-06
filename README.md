# KAI Access - Event Ticket Booking (Mobile Prototype)

A high-fidelity mobile web prototype for booking Event tickets, natively integrated into the **Access by KAI** application ecosystem.

Designed and optimized primarily for **iPhone 13 (390 × 844 px)**.

---

## Key Features

1. **Recreated Access by KAI Homepage**:
   - Header with signature purple-indigo gradient and city skyline silhouette.
   - Profile greeting (*Good Night / YONATAN KRISTIAN ...*), Cart, Messages, and Language pill.
   - Floating KAIPay Card with activation pill, quick actions (*Scan, Top Up, History*), 240 Railpoints, and Premium Gold membership badge.
   - Native service buttons: Local, Commuter, LRT, Airport, Whoosh, plus the **new "Event" button**.
   - Secondary service grid (*Space By KAI, Grab, KMT, Show more*).
   - Promotional banners (*Live Tracking with 3D locomotive*, *Access to Our Exclusive Benefits*).
   - Bottom navigation bar (*Home, Train, My Tickets, Promotion, Account*).

2. **Complete 8-Step Event Booking Flow**:
   - **Step 1 — Event Discovery**: Filter by Category (*Konser Musik, Pameran, Festival, Olahraga*) and Month (*Juli, Agustus, September, Oktober*), real-time search.
   - **Step 2 — Event Detail**: Hero banner, logistics, event description, highlights, ticket preview, sticky CTA.
   - **Step 3 — Ticket Selection**: Tier options (*VIP Diamond, CAT 1, CAT 2, Festival*), perks, quantity stepper (- / +), dynamic subtotal.
   - **Step 4 — Passenger Information**: Booker contact info, *"Gunakan Data Profil Saya"* autofill toggle, multi-passenger form generation.
   - **Step 5 — Seat Selection**: Interactive responsive seat map grid (Rows A–F, 8 seats/row with aisle), real-time states (*Available, Selected, Occupied*).
   - **Step 6 — Add-ons & Train**:
     - **Kereta Api Menuju Event**: Compact train search & schedule list with **5% discount and original price strikethrough** (e.g. ~~IDR 200.000~~ → **IDR 190.000**).
     - **Lokocafe F&B**: Coffee & gourmet meal combo (IDR 45.000).
     - **KAI Shuttle**: Station-to-venue transfer (IDR 35.000).
     - **Merchandise & Fast Track**: IDR 65.000.
   - **Step 7 — Checkout Summary**: Itemized breakdown, 11% tax, Admin fee strictly at IDR 7.000 * ticketQuantity, payment methods (*KAIPay, Virtual Account, QRIS*).
   - **Step 8 — Ticket Confirmation**: Booking reference code, dummy SVG QR code, ticket details.

3. **Dashboard / My Tickets**:
   - Filter by status: *Akan Datang (Upcoming)*, *Aktif (Active)*, *Selesai (Used)*, *Dibatalkan (Cancelled)*.
   - Boarding pass modal with QR code and barcode.

---

## Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, CSS Custom Properties / Design Tokens
- **Icons**: Lucide React
- **State Management**: React Context API (BookingContext)

---

## Getting Started

`ash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
`

Open [http://localhost:3000/](http://localhost:3000/) in your browser.