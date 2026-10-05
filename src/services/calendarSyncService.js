// Calendar Sync Service for KAI Access Mobile
// Synchronizes with Google Apps Script Web App / Google Sheets

import { MOCK_EVENTS } from '../data/mockData';

export const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbxmluerqsiZekQbK1T6crJCrGqWyt_ssDTRfam5qPJfAha70kH9CMIGpMkoQ1UwEfo/exec';
export const BITLY_CALENDAR_URL = 'https://bit.ly/EventCalendarbyAngel';
const CACHE_STORAGE_KEY = 'kai_event_calendar_cache_v1';
const CONFIG_STORAGE_KEY = 'kai_event_calendar_config_v1';

// Pre-enriched mock events with ISO date representations for accurate calendar plotting
export const EXTENDED_CALENDAR_EVENTS = [
  ...MOCK_EVENTS.map(evt => {
    let iso = '2026-08-15';
    if (evt.id === 'evt-heritage-run') iso = '2027-04-17';
    if (evt.id === 'evt-02') iso = '2026-08-15';
    if (evt.id === 'evt-03') iso = '2026-09-12';
    if (evt.id === 'evt-04') iso = '2026-10-02';
    return {
      ...evt,
      isoDate: iso,
      source: 'Google Sheet (Synced)'
    };
  }),
  {
    id: 'sheet-evt-05',
    title: 'Jogja International Heritage Walk 2026',
    category: 'Olahraga',
    month: 'November 2026',
    date: 'Sabtu, 21 November 2026',
    isoDate: '2026-11-21',
    time: '06:30 WIB',
    venue: 'Candi Prambanan - Malioboro',
    city: 'Yogyakarta',
    startingPrice: 120000,
    banner: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Jogja Tourism Board x KAI Daop 6',
    description: 'Jalan sehat internasional melintasi keindahan Candi Prambanan dan peninggalan Mataram Kuno dengan bundling KA Taksaka.',
    source: 'Google Sheet (Synced)',
    tickets: [
      { id: 'tkt-jiw-1', name: 'Standard Walk 10K', price: 120000, quota: 80, perks: ['BIB', 'Official Medali', 'Snack Box'] },
      { id: 'tkt-jiw-2', name: 'Family Walk 5K', price: 90000, quota: 150, perks: ['BIB', 'Snack Box'] }
    ]
  },
  {
    id: 'sheet-evt-06',
    title: 'Solo Keroncong Wave Festival 2026',
    category: 'Konser Musik',
    month: 'Juli 2026',
    date: 'Jumat, 24 Juli 2026',
    isoDate: '2026-07-24',
    time: '19:00 WIB',
    venue: 'Benteng Vastenburg',
    city: 'Surakarta (Solo)',
    startingPrice: 85000,
    banner: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Dinas Kebudayaan Solo x KAI Wisata',
    description: 'Festival musik keroncong modern di pelataran bersejarah Benteng Vastenburg Solo, dekat Stasiun Solo Balapan.',
    source: 'Google Sheet (Synced)',
    tickets: [
      { id: 'tkt-skf-1', name: 'VIP Festival Seat', price: 175000, quota: 50, perks: ['Kursi bernomor terdepan', 'Voucher Kuliner'] },
      { id: 'tkt-skf-2', name: 'Regular Entry', price: 85000, quota: 200, perks: ['Akses area panggung'] }
    ]
  },
  {
    id: 'sheet-evt-07',
    title: 'Surabaya Heritage Coffee & Food Expo',
    category: 'Festival Budaya',
    month: 'Oktober 2026',
    date: 'Minggu, 18 Oktober 2026',
    isoDate: '2026-10-18',
    time: '10:00 - 21:00 WIB',
    venue: 'Balai Pemuda Alun-Alun Surabaya',
    city: 'Surabaya',
    startingPrice: 50000,
    banner: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
    organizer: 'Surabaya Tourism x KAI Daop 8',
    description: 'Pameran 50+ racikan kopi khas Nusantara dan kuliner legendaris Jawa Timur di jantung kota Surabaya.',
    source: 'Google Sheet (Synced)',
    tickets: [
      { id: 'tkt-scf-1', name: 'Pass All Access + Cupping Workshop', price: 95000, quota: 60, perks: ['Workshop Cupping', 'Free Sample Kopi'] },
      { id: 'tkt-scf-2', name: 'Daily Entry', price: 50000, quota: 300, perks: ['Voucher belanja kopi 20K'] }
    ]
  }
];

export const getSavedEndpointUrl = () => {
  try {
    return localStorage.getItem(CONFIG_STORAGE_KEY) || DEFAULT_GAS_URL;
  } catch {
    return DEFAULT_GAS_URL;
  }
};

export const saveEndpointUrl = (url) => {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, url);
  } catch (err) {
    console.error('Failed to save calendar endpoint:', err);
  }
};

export const getCachedCalendarEvents = () => {
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.events) && parsed.events.length > 0) {
        return {
          events: parsed.events,
          lastUpdated: parsed.lastUpdated || new Date().toISOString(),
          isLive: Boolean(parsed.isLive)
        };
      }
    }
  } catch (e) {
    console.warn('Could not read calendar cache:', e);
  }

  return {
    events: EXTENDED_CALENDAR_EVENTS,
    lastUpdated: new Date().toISOString(),
    isLive: false
  };
};

export const fetchCalendarFromGoogleSheet = async (customUrl = null) => {
  const endpoint = customUrl || getSavedEndpointUrl();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await response.json();
      const rawList = Array.isArray(json) ? json : (json.events || json.data || []);
      
      if (rawList.length > 0) {
        const normalized = rawList.map((item, index) => ({
          id: item.id || `sheet-evt-${index + 1}`,
          title: item.title || item.nama_event || item.event || 'Event KAI',
          category: item.category || item.kategori || 'Festival Budaya',
          month: item.month || item.bulan || 'Semua Bulan',
          date: item.date || item.tanggal || 'Segera Diumumkan',
          isoDate: item.isoDate || item.tanggal_iso || item.date_iso || '2026-08-15',
          time: item.time || item.waktu || '08:00 WIB',
          venue: item.venue || item.lokasi || 'KAI Venue',
          city: item.city || item.kota || 'Jakarta',
          startingPrice: Number(item.startingPrice || item.harga || 100000),
          banner: item.banner || item.gambar || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
          heroImage: item.heroImage || item.banner || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
          organizer: item.organizer || item.penyelenggara || 'KAI Partner x Wisata',
          description: item.description || item.deskripsi || 'Event pariwisata dan budaya terintegrasi tiket kereta api KAI.',
          source: 'Google Sheet (Live)',
          tickets: item.tickets || [
            { id: `tkt-${index}-1`, name: 'Presale Reguler', price: Number(item.startingPrice || 100000), quota: 100, perks: ['Akses Masuk', 'Diskon Kereta 5%'] }
          ]
        }));

        const cacheData = {
          events: normalized,
          lastUpdated: new Date().toISOString(),
          isLive: true
        };
        try {
          localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cacheData));
        } catch (_) {}

        return cacheData;
      }
    }

    throw new Error('Google Apps Script did not return JSON event array yet (requires public web deployment).');
  } catch (error) {
    console.warn('[CalendarSync] Live fetch from Google Sheet failed, using cached / enriched dataset:', error.message);
    
    // Return cached or fallback enriched events
    const cached = getCachedCalendarEvents();
    return {
      events: cached.events.length > 0 ? cached.events : EXTENDED_CALENDAR_EVENTS,
      lastUpdated: cached.lastUpdated,
      isLive: false,
      errorNotice: error.message
    };
  }
};
