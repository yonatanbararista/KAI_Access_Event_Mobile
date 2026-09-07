export const USER_PROFILE = {
  name: "Angelika Fendys",
  email: "angelikafsh@gmail.com",
  phone: "089680947898",
  idType: "KTP",
  idNumber: "3372051203990002",
  address: "Jebres, Surakarta",
  railpoints: 240,
  tier: "Premium",
  kaipayBalance: 2500000,
};

export const EVENT_CATEGORIES = [
  "Semua",
  "Konser Musik",
  "Pameran & Expo",
  "Festival Budaya",
  "Olahraga",
];

export const EVENT_MONTHS = [
  "Semua Bulan",
  "Juli 2026",
  "Agustus 2026",
  "September 2026",
  "Oktober 2026",
  "November 2026",
];

export const MOCK_EVENTS = [
  {
    id: "evt-01",
    title: "Prambanan Jazz Festival 2026",
    category: "Konser Musik",
    month: "Juli 2026",
    date: "24 - 26 Juli 2026",
    time: "15:00 - 23:30 WIB",
    venue: "Plataran Candi Prambanan",
    city: "Yogyakarta",
    startingPrice: 350000,
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    organizer: "Rajawali Indonesia x KAI Wisata",
    description: "Nikmati perpaduan megah antara mahakarya Candi Hindu abad ke-9 dan alunan musik jazz internasional serta musisi legendaris Indonesia. Nikmati kemudahan akses langsung dengan kereta api KAI menuju Stasiun Tugu & Klaten.",
    highlights: [
      "Penampilan 35+ musisi Jazz Nasional & Internasional",
      "Panggung spektakuler dengan latar siluet Candi Prambanan",
      "Koneksi shuttle terintegrasi langsung dari Stasiun Tugu",
      "Area kuliner UMKM khas Nusantara dan booth Lokocafe"
    ],
    tickets: [
      {
        id: "tkt-vip",
        name: "VIP Diamond (Numbered Seat)",
        price: 1200000,
        quota: 14,
        perks: ["Kursi nomor baris terdepan", "Free Lokocafe Signature Meal", "Akses VIP Lounge Ber-AC", "Jalur Masuk Fast Track"]
      },
      {
        id: "tkt-cat1",
        name: "CAT 1 (Numbered Seat)",
        price: 750000,
        quota: 38,
        perks: ["Kursi bernomor pandangan tengah", "Exclusive Lanyard & Wristband", "Akses gate reguler"]
      },
      {
        id: "tkt-cat2",
        name: "CAT 2 (Numbered Seat)",
        price: 500000,
        quota: 52,
        perks: ["Kursi bernomor area samping sayap", "Akses gate reguler"]
      },
      {
        id: "tkt-fest",
        name: "Festival (Standing)",
        price: 350000,
        quota: 120,
        perks: ["Area berdiri dekat panggung utama", "Pengalaman atmosfer festival maksimal"]
      }
    ]
  },
  {
    id: "evt-02",
    title: "Indonesia Railway Heritage Expo 2026",
    category: "Pameran & Expo",
    month: "Agustus 2026",
    date: "15 - 18 Agustus 2026",
    time: "09:00 - 20:00 WIB",
    venue: "JIExpo Kemayoran Hall B3 & C1",
    city: "Jakarta Pusat",
    startingPrice: 75000,
    banner: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1515165562839-978bbcf18277?q=80&w=1200&auto=format&fit=crop",
    organizer: "PT Kereta Api Indonesia (Persero)",
    description: "Pameran inovasi perkeretaapian terbesar di Asia Tenggara. Menampilkan lokomotif bersejarah, simulator kereta cepat Whoosh berteknologi mutakhir, dan diorama miniatur kereta skala museum.",
    highlights: [
      "Simulator masinis KA Whoosh & Lokomotif CC206",
      "Pameran lokomotif uap antik B2503 yang telah direstorasi",
      "Zona edukasi interaktif anak & Railway Merch KAI Store",
      "Diskon voucher tiket kereta api hingga 20%"
    ],
    tickets: [
      {
        id: "tkt-vip",
        name: "All-Days VIP Pass",
        price: 250000,
        quota: 40,
        perks: ["Akses 4 hari penuh", "Slot simulator masinis 20 menit", "Koleksi miniatur lokomotif edisi terbatas"]
      },
      {
        id: "tkt-cat1",
        name: "Daily General Admission",
        price: 75000,
        quota: 250,
        perks: ["Akses 1 hari ke seluruh hall pameran", "Buku panduan sejarah perkeretaapian digital"]
      }
    ]
  },
  {
    id: "evt-03",
    title: "Sound of Unity Mega Concert",
    category: "Konser Musik",
    month: "September 2026",
    date: "12 September 2026",
    time: "18:30 - 23:00 WIB",
    venue: "Stadion Utama Gelora Bung Karno",
    city: "Jakarta Pusat",
    startingPrice: 450000,
    banner: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    organizer: "KAI Soundwave Entertainment",
    description: "Konser kolosal orkestra dan band legendaris memperingati Hari Kereta Api Nasional. Didukung teknologi tata suara surround 360 derajat dan tata cahaya drone show.",
    highlights: [
      "Kolaborasi Erwin Gutawa Orchestra & 10 Band Papan Atas",
      "Drone light show 1.000 armada di atas langit Senayan",
      "Integrasi stasiun KRL Palmerah dan MRT Istora Mandiri"
    ],
    tickets: [
      {
        id: "tkt-vip",
        name: "VVIP Tribune (Numbered)",
        price: 1800000,
        quota: 12,
        perks: ["Kursi empuk stadion tengah", "Snack box Lokocafe", "Merchandise eksklusif jersey tour"]
      },
      {
        id: "tkt-cat1",
        name: "CAT 1 Reguler Seating",
        price: 900000,
        quota: 45,
        perks: ["Kursi bernomor tribun barat"]
      },
      {
        id: "tkt-fest",
        name: "Festival Field (Standing)",
        price: 450000,
        quota: 200,
        perks: ["Area rumput dekat bibir panggung"]
      }
    ]
  },
  {
    id: "evt-04",
    title: "Bandung Culinary & Music Fest",
    category: "Festival Budaya",
    month: "Oktober 2026",
    date: "2 - 4 Oktober 2026",
    time: "11:00 - 22:00 WIB",
    venue: "Kiara Artha Park",
    city: "Bandung",
    startingPrice: 125000,
    banner: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    organizer: "West Java Tourism Board x KAI Daop 2",
    description: "Festival kuliner legendaris Sunda dipadukan dengan panggung musik indie pop dan gemerlap dancing fountain Kiara Artha Park.",
    highlights: [
      "100+ tenant kuliner legendaris Jawa Barat",
      "Atraksi air mancur menari setiap jam malam",
      "Pertunjukan angklung interaktif massal"
    ],
    tickets: [
      {
        id: "tkt-vip",
        name: "3-Days All Access Pass",
        price: 275000,
        quota: 30,
        perks: ["Bebas keluar masuk 3 hari", "Kupon makan kuliner IDR 50.000"]
      },
      {
        id: "tkt-cat1",
        name: "Daily Pass Weekend",
        price: 125000,
        quota: 95,
        perks: ["Akses 1 hari", "Kupon minuman Lokocafe"]
      }
    ]
  }
];

export const MOCK_TRAIN_SCHEDULES = [
  {
    id: "trn-01",
    trainName: "Argo Parahyangan",
    trainNumber: "KA 42",
    trainClass: "Eksekutif",
    origin: "Gambir (GMR)",
    destination: "Bandung (BD)",
    departure: "08:10",
    arrival: "11:05",
    duration: "2j 55m",
    originalPrice: 200000,
    discountPercent: 5,
    discountedPrice: 190000,
    availableSeats: 34
  },
  {
    id: "trn-02",
    trainName: "Taksaka",
    trainNumber: "KA 68",
    trainClass: "Eksekutif",
    origin: "Gambir (GMR)",
    destination: "Yogyakarta (YK)",
    departure: "09:20",
    arrival: "15:40",
    duration: "6j 20m",
    originalPrice: 450000,
    discountPercent: 5,
    discountedPrice: 427500,
    availableSeats: 18
  },
  {
    id: "trn-03",
    trainName: "Argo Bromo Anggrek",
    trainNumber: "KA 2",
    trainClass: "Eksekutif Luxury",
    origin: "Gambir (GMR)",
    destination: "Semarang Tawang (SMT)",
    departure: "08:20",
    arrival: "13:35",
    duration: "5j 15m",
    originalPrice: 500000,
    discountPercent: 5,
    discountedPrice: 475000,
    availableSeats: 12
  },
  {
    id: "trn-04",
    trainName: "Lodaya",
    trainNumber: "KA 92",
    trainClass: "Ekonomi Premium",
    origin: "Bandung (BD)",
    destination: "Yogyakarta (YK)",
    departure: "07:05",
    arrival: "14:20",
    duration: "7j 15m",
    originalPrice: 240000,
    discountPercent: 5,
    discountedPrice: 228000,
    availableSeats: 26
  }
];

export const MOCK_ADDONS = [
  {
    id: "addon-train",
    name: "Transportasi Kereta Api Menuju Event",
    category: "Transportasi",
    description: "Perjalanan nyaman ke kota tujuan event dengan diskon spesial 5% untuk semua kelas kereta KAI.",
    badge: "Diskon 5%",
    isTrainSpecial: true,
  },
  {
    id: "addon-lokocafe",
    name: "Paket Makan + Kopi LokoCafe",
    category: "Makanan & Minuman",
    description: "1 porsi Nasi Rawon Daging / Rice Bowl Ayam Crispy + Es Kopi Loko Signature disajikan langsung di venue.",
    price: 60000,
    badge: "Favorit",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "addon-shuttle",
    name: "Shuttle KAI Wisata (Stasiun - Venue PP)",
    category: "Layanan Antar-Jemput",
    description: "Layanan bus eksekutif ber-AC pulang pergi dari stasiun kereta api terdekat langsung ke lobi venue event.",
    price: 35000,
    badge: "Praktis",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "addon-merch",
    name: "Claim Exclusive Merch",
    category: "Merchandise",
    description: "T-shirt resmi edisi kolektor dan paket merchandise eksklusif official event.",
    price: 120000,
    badge: "Eksklusif",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop"
  }
];

export const INITIAL_TICKETS_HISTORY = [
  {
    id: "TKT-KAI-2026-08129",
    eventTitle: "Java Jazz on the Train 2026",
    category: "Konser Musik",
    date: "10 Mei 2026",
    time: "19:00 WIB",
    venue: "Stasiun Jakarta Kota Heritage Hall",
    city: "Jakarta Barat",
    passengerName: "Angelika Fendys",
    ticketType: "VIP Diamond",
    seatNumber: "A4, A5",
    quantity: 2,
    totalPrice: 1650000,
    status: "Used",
    qrCode: "KAI-EVT-USED-08129",
    purchaseDate: "02 Mei 2026"
  }
];
