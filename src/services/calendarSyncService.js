// Calendar Sync Service for KAI Access Mobile
// Synchronizes with Google Apps Script Web App / Google Sheets

import { MOCK_EVENTS } from '../data/mockData';

export const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbxmluerqsiZekQbK1T6crJCrGqWyt_ssDTRfam5qPJfAha70kH9CMIGpMkoQ1UwEfo/exec';
export const BITLY_CALENDAR_URL = 'https://bit.ly/EventCalendarbyAngel';
const CACHE_STORAGE_KEY = 'kai_event_calendar_cache_v1';
const CONFIG_STORAGE_KEY = 'kai_event_calendar_config_v1';

// Pre-enriched mock events with ISO date representations for accurate calendar plotting
export const EXTENDED_CALENDAR_EVENTS = MOCK_EVENTS.map(evt => ({
  ...evt,
  isoDate: evt.isoDate || '2026-08-15',
  source: 'Google Sheet (Synced)'
}));

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
