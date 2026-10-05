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
  "April 2027",
];

export const isSportOrRunningEvent = (event) => {
  if (!event) return false;
  const cat = (event.category || '').toLowerCase();
  const title = (event.title || '').toLowerCase();
  return (
    cat.includes('olahraga') ||
    cat.includes('sport') ||
    cat.includes('running') ||
    title.includes('run') ||
    title.includes('marathon') ||
    title.includes('lari') ||
    Boolean(event.jerseyInfo)
  );
};

export const MOCK_EVENTS = [
  {
    id: "evt-heritage-run",
    title: "KAI Heritage Run 2027",
    category: "Olahraga",
    month: "April 2027",
    date: "Sabtu, 17 April 2027",
    isoDate: "2027-04-17",
    time: "06:00 WIB",
    venue: "Stasiun Semarang Tawang - Lawang Sewu",
    city: "Semarang",
    startingPrice: 150000,
    banner: "/kai_heritage_run.jpg",
    heroImage: "/kai_heritage_run.jpg",
    organizer: "PT Kereta Api Indonesia (Persero) x KAI Wisata",
    description: "Lari bersejarah spektakuler melintasi keindahan warisan arsitektur kolonial Semarang. Titik start dari Lawang Sewu melintasi kawasan cagar budaya Kota Lama dan berakhir di Stasiun Semarang Tawang. Menggabungkan semangat gaya hidup sehat, olahraga lari, dan apresiasi sejarah perkeretaapian Indonesia.",
    highlights: [
      "Rute lari cagar budaya: Lawang Sewu, Kawasan Kota Lama & Stasiun Semarang Tawang",
      "Official Running Jersey bahan Premium High-Performance Micro Dry-Fit Fabric",
      "Exclusive Heavy Cast Finisher Medal berdesain lokomotif uap bersejarah",
      "BIB Number dilengkapi RFID Electronic Timing Chip berstandar internasional",
      "Hydration point & refreshment stasiun di setiap 2.5 KM dengan booth LokoCafe",
      "Akses gerbong khusus pelari & diskon 5% tiket kereta api KAI ke Semarang"
    ],
    jerseyInfo: {
      material: "100% High-Performance Micro Dry-Fit Fabric (Breathable, Quick-Dry, Anti-UV UPF 50+, Ultra Lightweight 120gsm)",
      color: "Navy Blue & KAI Energetic Orange with Reflective Safety Strips",
      features: [
        "Teknologi Fast Moisture-Wicking menyerap dan menguapkan keringat seketika",
        "Strip reflektif 3M di bagian belakang untuk keamanan lari subuh (06:00 WIB)",
        "Jahitan Flatlock anti-gesekan (chafing-free) untuk kenyamanan maraton",
        "Potongan atletis ergonomis uniseks yang fleksibel"
      ],
      sizeChart: [
        { size: "S", chestWidth: 48, length: 66, chestCircumference: "92 - 96 cm", heightRec: "155 - 165 cm" },
        { size: "M", chestWidth: 50, length: 68, chestCircumference: "96 - 100 cm", heightRec: "165 - 172 cm" },
        { size: "L", chestWidth: 52, length: 70, chestCircumference: "100 - 104 cm", heightRec: "170 - 178 cm" },
        { size: "XL", chestWidth: 54, length: 72, chestCircumference: "104 - 108 cm", heightRec: "175 - 183 cm" },
        { size: "XXL", chestWidth: 56, length: 74, chestCircumference: "108 - 114 cm", heightRec: "> 180 cm" }
      ],
      racePackCollection: {
        venue: "Historic Ballroom Lawang Sewu, Semarang",
        dates: "15 - 16 April 2027 (Pukul 10:00 - 20:00 WIB)",
        items: [
          "Official Dry-Fit Running Jersey KAI Heritage Run 2027 (sesuai ukuran)",
          "Running BIB Number + RFID Electronic Timing Tag",
          "Drawstring / Tote Bag Eksklusif KAI Heritage Run",
          "Voucher Makan & Minuman LokoCafe IDR 25.000",
          "Produk Sponsor, Refreshment Pack & Asuransi Kecelakaan Pelari",
          "Finisher Medal (diberikan di finish line setelah menuntaskan rute)"
        ]
      }
    },
    tickets: [
      {
        id: "tkt-run-21k",
        name: "21K Half Marathon",
        price: 350000,
        quota: 85,
        perks: [
          "BIB Number dengan RFID Timing Chip",
          "Official Dry-Fit Jersey & 21K Finisher Tee",
          "Exclusive Heavy Cast Finisher Medal 21K",
          "Recovery Meal Box LokoCafe & Isotonic Drink"
        ]
      },
      {
        id: "tkt-run-10k",
        name: "10K Race",
        price: 250000,
        quota: 160,
        perks: [
          "BIB Number dengan RFID Timing Chip",
          "Official Dry-Fit Jersey KAI Heritage",
          "Finisher Medal 10K",
          "Refreshment Station & Shuttle Stasiun Tawang"
        ]
      },
      {
        id: "tkt-run-5k",
        name: "5K Fun Run",
        price: 150000,
        quota: 320,
        perks: [
          "BIB Number & Official Dry-Fit Jersey",
          "Finisher Medal 5K",
          "Voucher Minuman LokoCafe & Asuransi Pelari"
        ]
      }
    ]
  },
  {
    id: "evt-01",
    title: "Prambanan Jazz Festival 2026",
    category: "Konser Musik",
    month: "Juli 2026",
    date: "24 - 26 Juli 2026",
    isoDate: "2026-07-24",
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
    isoDate: "2026-08-15",
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
    isoDate: "2026-09-12",
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
    isoDate: "2026-10-02",
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
  },
  {
    id: "evt-solo-keroncong",
    title: "Solo Keroncong Wave Festival 2026",
    category: "Konser Musik",
    month: "Juli 2026",
    date: "Jumat, 24 Juli 2026",
    isoDate: "2026-07-24",
    time: "19:00 - 23:00 WIB",
    venue: "Benteng Vastenburg",
    city: "Surakarta (Solo)",
    startingPrice: 85000,
    banner: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop",
    organizer: "Dinas Kebudayaan Solo x KAI Wisata",
    description: "Festival musik keroncong kontemporer di pelataran bersejarah Benteng Vastenburg Solo. Berjarak hanya 10 menit dari Stasiun Solo Balapan.",
    highlights: [
      "Penampilan 15 orkes keroncong legendaris dan indie modern",
      "Pameran busana kebaya dan batik klasik Mangkunegaran",
      "Koneksi KA Commuter Jogja-Solo beroperasi hingga larut malam"
    ],
    tickets: [
      { id: "tkt-skf-1", name: "VIP Festival Seat", price: 175000, quota: 50, perks: ["Kursi bernomor terdepan", "Voucher Kuliner Solo Rp 25.000"] },
      { id: "tkt-skf-2", name: "Regular Entry", price: 85000, quota: 200, perks: ["Akses area panggung dan bazaar kuliner"] }
    ]
  },
  {
    id: "evt-we-the-fest",
    title: "We The Fest (WTF) 2026",
    category: "Konser Musik",
    month: "Agustus 2026",
    date: "14 - 16 Agustus 2026",
    isoDate: "2026-08-14",
    time: "14:00 - 00:00 WIB",
    venue: "GBK Sports Complex",
    city: "Jakarta Pusat",
    startingPrice: 420000,
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    organizer: "Ismaya Live Indonesia x KAI",
    description: "Festival musik, seni, mode, dan kuliner musim panas terbesar di Indonesia. Akses terhubung mudah via Stasiun Gambir & Stasiun Palmerah.",
    highlights: [
      "Headliner internasional dan festival indie ternama",
      "Zona instalasi seni interaktif & cinema club",
      "Bundling KA Argo Parahyangan & Whoosh diskon 15%"
    ],
    tickets: [
      { id: "tkt-wtf-vip", name: "3-Day Pass VVIP", price: 1650000, quota: 40, perks: ["Akses VVIP viewing deck", "Private bar & air-conditioned lounge"] },
      { id: "tkt-wtf-ga", name: "Daily General Admission", price: 420000, quota: 150, perks: ["Akses seluruh area stage festival"] }
    ]
  },
  {
    id: "evt-dieng-culture",
    title: "Dieng Culture Festival XVII",
    category: "Festival Budaya",
    month: "Agustus 2026",
    date: "28 - 30 Agustus 2026",
    isoDate: "2026-08-28",
    time: "07:00 - 23:00 WIB",
    venue: "Kompleks Candi Arjuna",
    city: "Banjarnegara / Wonosobo",
    startingPrice: 200000,
    banner: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    organizer: "Pokdarwis Dieng Pandawa x KAI Daop 5",
    description: "Ritual sakral pemotongan rambut gimbal anak Dieng, pelepasan ribuan lampion langit di atas perbukitan, serta festival musik Jazz di Atas Awan. Terkoneksi shuttle KAI dari Stasiun Purwokerto.",
    highlights: [
      "Upacara adat jamasan & ruwatan anak gimbal",
      "Pelepasan 5.000 lampion langit malam Dieng",
      "Jazz di Atas Awan berlatar Candi Arjuna bersuhu sejuk",
      "Shuttle resmi KAI Stasiun Purwokerto - Dieng PP"
    ],
    tickets: [
      { id: "tkt-dcf-all", name: "VIP All Event Access + Lampion", price: 350000, quota: 60, perks: ["Akses ruwatan rambut gimbal", "1 Lampion eksklusif", "Kain sarung & selendang adat"] },
      { id: "tkt-dcf-pass", name: "Standard Festival Pass", price: 200000, quota: 180, perks: ["Akses area Jazz di Atas Awan & Expo UMKM"] }
    ]
  },
  {
    id: "evt-soundrenaline",
    title: "Soundrenaline Nusantara Experience 2026",
    category: "Konser Musik",
    month: "September 2026",
    date: "18 - 20 September 2026",
    isoDate: "2026-09-18",
    time: "15:00 - 23:00 WIB",
    venue: "Grand City Convention & Expo",
    city: "Surabaya",
    startingPrice: 220000,
    banner: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    organizer: "PT Kreasi Musik Nusantara x KAI Daop 8",
    description: "Panggung musik rock & alternative terbesar Nusantara dengan 4 panggung spektakuler, terhubung langsung 5 menit dari Stasiun Surabaya Gubeng.",
    highlights: [
      "4 Multi-stage indoor & outdoor Grand City",
      "Kolaborasi band legendaris Indonesia & Asia",
      "Koneksi langsung KA Sancaka & KA Argo Bromo Anggrek"
    ],
    tickets: [
      { id: "tkt-snd-3d", name: "3-Days Rock Pass", price: 550000, quota: 40, perks: ["Akses 3 hari penuh", "Official merchandise shirt"] },
      { id: "tkt-snd-1d", name: "Daily Pass Entry", price: 220000, quota: 150, perks: ["Akses 1 hari seluruh stage"] }
    ]
  },
  {
    id: "evt-bandung-clothing",
    title: "Bandung Indie Clothing Expo 2026",
    category: "Pameran & Expo",
    month: "Oktober 2026",
    date: "10 - 12 Oktober 2026",
    isoDate: "2026-10-10",
    time: "10:00 - 22:00 WIB",
    venue: "Sasana Budaya Ganesha (Sabuga ITB)",
    city: "Bandung",
    startingPrice: 45000,
    banner: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    organizer: "Lian Mipro Indonesia x KAI Daop 2",
    description: "Eksibisi 120+ clothing brand lokal terkemuka Kota Kembang dengan panggung live musik indie underground dan diskon up to 70%.",
    highlights: [
      "120+ brand apparel lokal terkemuka Bandung & Jakarta",
      "Live acoustic & indie band stage setiap jam",
      "Akses Feeder Whoosh Stasiun Bandung langsung ke Sabuga"
    ],
    tickets: [
      { id: "tkt-bce-vip", name: "VIP Shopping Fast Pass", price: 95000, quota: 80, perks: ["Early entry 1 jam lebih awal", "Goodie bag limited edition"] },
      { id: "tkt-bce-reg", name: "Daily Entry Pass", price: 45000, quota: 350, perks: ["Akses masuk 1 hari Sabuga"] }
    ]
  },
  {
    id: "evt-surabaya-coffee",
    title: "Surabaya Heritage Coffee & Food Expo",
    category: "Festival Budaya",
    month: "Oktober 2026",
    date: "Minggu, 18 Oktober 2026",
    isoDate: "2026-10-18",
    time: "10:00 - 21:00 WIB",
    venue: "Balai Pemuda Alun-Alun Surabaya",
    city: "Surabaya",
    startingPrice: 50000,
    banner: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
    organizer: "Surabaya Tourism x KAI Daop 8",
    description: "Pameran 50+ racikan kopi khas Nusantara dan kuliner legendaris Jawa Timur di jantung cagar budaya kota Surabaya.",
    highlights: [
      "Workshop cupping dan roasting barista bersertifikat",
      "Bazaar kuliner legendaris Jawa Timur",
      "Dekat Stasiun Surabaya Gubeng dan Pasar Turi"
    ],
    tickets: [
      { id: "tkt-scf-1", name: "Pass All Access + Cupping Workshop", price: 95000, quota: 60, perks: ["Workshop Cupping", "Free Sample Kopi"] },
      { id: "tkt-scf-2", name: "Daily Entry", price: 50000, quota: 300, perks: ["Voucher belanja kopi Rp 20.000"] }
    ]
  },
  {
    id: "evt-jogja-walk",
    title: "Jogja International Heritage Walk 2026",
    category: "Olahraga",
    month: "November 2026",
    date: "Sabtu, 21 November 2026",
    isoDate: "2026-11-21",
    time: "06:30 WIB",
    venue: "Candi Prambanan - Malioboro",
    city: "Yogyakarta",
    startingPrice: 120000,
    banner: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1200&auto=format&fit=crop",
    organizer: "Jogja Tourism Board x KAI Daop 6",
    description: "Jalan sehat internasional melintasi keindahan Candi Prambanan dan peninggalan Mataram Kuno dengan bundling KA Taksaka.",
    highlights: [
      "Rute jalan santai pemandangan pedesaan dan candi kuno",
      "Diikuti peserta dari 20+ negara anggota IML Walking Association",
      "Medali finisher ramah lingkungan berbahan kuningan daur ulang",
      "Koneksi KA Commuter Line & KA Bandara YIA terintegrasi"
    ],
    tickets: [
      { id: "tkt-jiw-1", name: "Standard Walk 10K", price: 120000, quota: 80, perks: ["BIB", "Official Medali", "Snack Box"] },
      { id: "tkt-jiw-2", name: "Family Walk 5K", price: 90000, quota: 150, perks: ["BIB", "Snack Box"] }
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
  },
  {
    id: "trn-05",
    trainName: "Argo Muria",
    trainNumber: "KA 14",
    trainClass: "Eksekutif",
    origin: "Gambir (GMR)",
    destination: "Semarang Tawang (SMT)",
    departure: "07:00",
    arrival: "12:15",
    duration: "5j 15m",
    originalPrice: 400000,
    discountPercent: 5,
    discountedPrice: 380000,
    availableSeats: 42
  },
  {
    id: "trn-06",
    trainName: "Argo Sindoro",
    trainNumber: "KA 12",
    trainClass: "Eksekutif",
    origin: "Gambir (GMR)",
    destination: "Semarang Tawang (SMT)",
    departure: "16:40",
    arrival: "21:55",
    duration: "5j 15m",
    originalPrice: 400000,
    discountPercent: 5,
    discountedPrice: 380000,
    availableSeats: 35
  },
  {
    id: "trn-07",
    trainName: "Tawang Jaya Premium",
    trainNumber: "KA 162",
    trainClass: "Ekonomi Premium",
    origin: "Pasar Senen (PSE)",
    destination: "Semarang Tawang (SMT)",
    departure: "09:55",
    arrival: "16:15",
    duration: "6j 20m",
    originalPrice: 260000,
    discountPercent: 5,
    discountedPrice: 247000,
    availableSeats: 58
  },
  {
    id: "trn-08",
    trainName: "Joglosemarkerto",
    trainNumber: "KA 195",
    trainClass: "Eksekutif",
    origin: "Solo Balapan (SLO)",
    destination: "Semarang Tawang (SMT)",
    departure: "06:15",
    arrival: "08:30",
    duration: "2j 15m",
    originalPrice: 160000,
    discountPercent: 5,
    discountedPrice: 152000,
    availableSeats: 28
  },
  // RETURN TRIP SCHEDULES (Kereta Pulang)
  {
    id: "trn-ret-01",
    isReturn: true,
    trainName: "Argo Bromo Anggrek (Return)",
    trainNumber: "KA 1",
    trainClass: "Eksekutif Luxury",
    origin: "Semarang Tawang (SMT)",
    destination: "Gambir (GMR)",
    departure: "16:00",
    arrival: "21:15",
    duration: "5j 15m",
    originalPrice: 500000,
    discountPercent: 5,
    discountedPrice: 475000,
    availableSeats: 16
  },
  {
    id: "trn-ret-02",
    isReturn: true,
    trainName: "Argo Muria (Return)",
    trainNumber: "KA 13",
    trainClass: "Eksekutif",
    origin: "Semarang Tawang (SMT)",
    destination: "Gambir (GMR)",
    departure: "18:00",
    arrival: "23:15",
    duration: "5j 15m",
    originalPrice: 400000,
    discountPercent: 5,
    discountedPrice: 380000,
    availableSeats: 24
  },
  {
    id: "trn-ret-03",
    isReturn: true,
    trainName: "Tawang Jaya Premium (Return)",
    trainNumber: "KA 161",
    trainClass: "Ekonomi Premium",
    origin: "Semarang Tawang (SMT)",
    destination: "Pasar Senen (PSE)",
    departure: "20:45",
    arrival: "03:00",
    duration: "6j 15m",
    originalPrice: 260000,
    discountPercent: 5,
    discountedPrice: 247000,
    availableSeats: 40
  },
  {
    id: "trn-ret-04",
    isReturn: true,
    trainName: "Taksaka (Return)",
    trainNumber: "KA 67",
    trainClass: "Eksekutif",
    origin: "Yogyakarta (YK)",
    destination: "Gambir (GMR)",
    departure: "19:10",
    arrival: "01:30",
    duration: "6j 20m",
    originalPrice: 450000,
    discountPercent: 5,
    discountedPrice: 427500,
    availableSeats: 22
  }
];

export const MOCK_RENTAL_VEHICLES = [
  {
    id: "rent-car-1",
    category: "Mobil",
    name: "Toyota All New Avanza",
    transmission: "Matic / Manual",
    seats: "7 Kursi",
    features: "AC Double Blower, Bluetooth Audio, Bagasi Luas",
    partner: "TRAC Astra (Mitra Resmi KAI)",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  },
  {
    id: "rent-car-2",
    category: "Mobil",
    name: "Toyota Kijang Innova Zenix",
    transmission: "Matic",
    seats: "7 Kursi",
    features: "Captain Seat, Sunroof, Kenyamanan Maksimal",
    partner: "KAI Rental Mitra Prima",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  },
  {
    id: "rent-car-3",
    category: "Mobil",
    name: "Honda All New Brio",
    transmission: "Matic",
    seats: "5 Kursi",
    features: "Irit Bahan Bakar, Praktis, Lincah Perkotaan",
    partner: "TRAC Astra (Mitra Resmi KAI)",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  },
  {
    id: "rent-moto-1",
    category: "Motor",
    name: "Yamaha NMAX 155 Connected",
    transmission: "Matic",
    seats: "2 Kursi",
    features: "2 Helm SNI, Jas Hujan, Holder HP, Bagasi Besar",
    partner: "KAI MotoRent Station",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  },
  {
    id: "rent-moto-2",
    category: "Motor",
    name: "Honda PCX 160",
    transmission: "Matic",
    seats: "2 Kursi",
    features: "2 Helm SNI, Smart Key, Jas Hujan, USB Charger",
    partner: "KAI MotoRent Station",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  },
  {
    id: "rent-moto-3",
    category: "Motor",
    name: "Honda BeAT Deluxe",
    transmission: "Matic",
    seats: "2 Kursi",
    features: "2 Helm SNI, Jas Hujan, Sangat Irit & Ringan",
    partner: "KAI MotoRent Station",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=400&auto=format&fit=crop",
    voucherDiscount: "Kupon Diskon Senilai Rp 100.000",
    pickupNote: "Unit diserahterimakan langsung di Stasiun Kedatangan"
  }
];

export const MOCK_HOTELS = [
  {
    id: "htl-01",
    name: "Hotel Santika Premiere Semarang",
    stars: 4,
    rating: 4.8,
    reviews: 1420,
    distanceVenue: "1.2 km dari Venue Event",
    distanceStation: "2.1 km dari Stasiun Semarang Tawang",
    address: "Jl. Pandanaran No. 116-120, Semarang",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    badge: "Mitra Pilihan KAI",
    rooms: [
      { id: "rm-1", name: "Deluxe Twin Room (Include Breakfast)", price: 450000, bed: "2 Single Bed", maxGuests: 2 },
      { id: "rm-2", name: "Executive King Room (Include Breakfast)", price: 650000, bed: "1 King Bed", maxGuests: 2 }
    ]
  },
  {
    id: "htl-02",
    name: "PO Hotel & Convention Semarang",
    stars: 5,
    rating: 4.9,
    reviews: 2150,
    distanceVenue: "850 m dari Venue Event",
    distanceStation: "2.5 km dari Stasiun Semarang Tawang",
    address: "Jl. Pemuda No. 118, Sekayu, Semarang",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop",
    badge: "Luxury Partner KAI",
    rooms: [
      { id: "rm-3", name: "Superior King Room (Include Breakfast)", price: 680000, bed: "1 King Bed", maxGuests: 2 },
      { id: "rm-4", name: "Suite Room with Bathtub", price: 1150000, bed: "1 Super King Bed", maxGuests: 2 }
    ]
  },
  {
    id: "htl-03",
    name: "KAI Living Transit Hotel",
    stars: 3,
    rating: 4.7,
    reviews: 890,
    distanceVenue: "2.4 km dari Venue Event",
    distanceStation: "0 m (Terintegrasi Langsung Stasiun Tawang)",
    address: "Kompleks Stasiun Semarang Tawang, Semarang",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop",
    badge: "Afiliasi Resmi KAI",
    rooms: [
      { id: "rm-5", name: "Standard Transit Room (Include Breakfast)", price: 320000, bed: "1 Queen Bed", maxGuests: 2 },
      { id: "rm-6", name: "Family Transit Room (Include Breakfast)", price: 480000, bed: "1 Queen + 1 Single Bed", maxGuests: 3 }
    ]
  },
  {
    id: "htl-04",
    name: "Ibis Budget Semarang Tawang",
    stars: 3,
    rating: 4.6,
    reviews: 730,
    distanceVenue: "2.5 km dari Venue Event",
    distanceStation: "300 m dari Stasiun Semarang Tawang",
    address: "Jl. Kapten Pierre Tendean No. 21, Semarang",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop",
    badge: "Harga Terbaik",
    rooms: [
      { id: "rm-7", name: "Standard Queen Bed Room", price: 260000, bed: "1 Queen Bed", maxGuests: 2 }
    ]
  }
];

export const MOCK_ADDONS = [
  {
    id: "addon-train",
    name: "Transportasi Kereta Api Menuju Event",
    category: "Transportasi",
    description: "Perjalanan nyaman ke kota tujuan event dengan diskon spesial 5% untuk semua kelas kereta KAI. Jadwal terpisah per hari keberangkatan.",
    badge: "Diskon 5% Event",
    isTrainSpecial: true,
  },
  {
    id: "addon-rental",
    name: "Car / Motor Rental (Mitra Pilihan KAI)",
    category: "Transportasi & Sewa Unit",
    description: "Sewa mobil/motor mitra resmi KAI (TRAC / KAI Rental Mitra) dengan sistem klaim kupon/voucher seharga Rp 50.000. Serah terima unit langsung di stasiun kedatangan.",
    price: 50000,
    badge: "Kupon Rp 50K",
    isRentalSpecial: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "addon-hotel",
    name: "Hotel Pilihan & Afiliasi KAI",
    category: "Akomodasi & Penginapan",
    description: "Hotel mitra dan afiliasi resmi KAI dengan lokasi strategis dekat venue dan stasiun. Sistem pemesanan langsung terintegrasi dengan tiket Anda.",
    badge: "Pemesanan Langsung",
    isHotelSpecial: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop"
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
    name: "Claim Exclusive Merch (Paket Aksesoris)",
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
