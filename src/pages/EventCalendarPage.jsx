import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Sparkles, 
  Tag, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Settings,
  Train,
  Ticket,
  X
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { useBooking } from '../context/BookingContext';
import { 
  fetchCalendarFromGoogleSheet, 
  getCachedCalendarEvents, 
  getSavedEndpointUrl, 
  saveEndpointUrl,
  BITLY_CALENDAR_URL,
  DEFAULT_GAS_URL 
} from '../services/calendarSyncService';

export const EventCalendarPage = () => {
  const { selectEvent, setCurrentStep } = useBooking();

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2027, 3, 1)); // Default April 2027 (KAI Heritage Run month)
  const [selectedDay, setSelectedDay] = useState(17); // Default 17 April 2027
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Google Sheet Sync State
  const [events, setEvents] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLiveSync, setIsLiveSync] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [syncNotice, setSyncNotice] = useState('');

  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [endpointInput, setEndpointInput] = useState(getSavedEndpointUrl());

  // Load initial events from cache/service
  useEffect(() => {
    const cached = getCachedCalendarEvents();
    setEvents(cached.events);
    setIsLiveSync(cached.isLive);
    setLastUpdated(cached.lastUpdated);

    // Initial background sync
    handleSync();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncNotice('');
    try {
      const result = await fetchCalendarFromGoogleSheet();
      setEvents(result.events);
      setIsLiveSync(result.isLive);
      setLastUpdated(result.lastUpdated);
      if (result.isLive) {
        setSyncNotice('Data berhasil disinkronkan langsung dari Google Sheet!');
      } else {
        setSyncNotice('Memuat data tersinkronisasi (Mode Cache/Offline).');
      }
    } catch (err) {
      setSyncNotice('Menggunakan data cache kalender.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncNotice(''), 4000);
    }
  };

  const handleSaveEndpoint = () => {
    saveEndpointUrl(endpointInput.trim() || DEFAULT_GAS_URL);
    setIsSettingsOpen(false);
    handleSync();
  };

  // Month & Year calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const currentMonthLabel = `${monthNames[month]} ${year}`;

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const jumpToMonth = (y, m, d = null) => {
    setCurrentDate(new Date(y, m, 1));
    setSelectedDay(d);
  };

  // Quick jump presets
  const quickMonths = [
    { label: 'Apr 2027 (Heritage Run)', year: 2027, month: 3, day: 17 },
    { label: 'Agu 2026 (Expo)', year: 2026, month: 7, day: 15 },
    { label: 'Sep 2026 (Konser)', year: 2026, month: 8, day: 12 },
    { label: 'Okt 2026 (Kuliner)', year: 2026, month: 9, day: 2 },
    { label: 'Nov 2026 (Jogja Walk)', year: 2026, month: 10, day: 21 },
  ];

  // Calendar Grid Days Calculation
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = useMemo(() => {
    const days = [];

    // Prev month padding
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        dateStr: `${year}-${String(month).padStart(2, '0')}-${String(daysInPrevMonth - i).padStart(2, '0')}`
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(i).padStart(2, '0');
      days.push({
        day: i,
        isCurrentMonth: true,
        dateStr: `${year}-${monthStr}-${dayStr}`
      });
    }

    // Next month padding to fill rows (up to multiple of 7)
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        dateStr: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      });
    }

    return days;
  }, [year, month, firstDayOfWeek, daysInMonth, daysInPrevMonth]);

  // Map events to date strings
  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach(evt => {
      const d = evt.isoDate;
      if (d) {
        if (!map[d]) map[d] = [];
        map[d].push(evt);
      }
    });
    return map;
  }, [events]);

  // Filtered Events for listing below calendar
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Month match check
      const evtIso = evt.isoDate || '';
      const [evtYear, evtMonth] = evtIso.split('-').map(Number);
      const isSameMonth = evtYear === year && evtMonth === (month + 1);

      // Selected Day filter
      if (selectedDay !== null) {
        const expectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        if (evt.isoDate !== expectedDateStr) return false;
      } else {
        if (!isSameMonth) return false;
      }

      // Category filter
      if (selectedCategory !== 'Semua' && evt.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (evt.title || '').toLowerCase().includes(q);
        const matchCity = (evt.city || '').toLowerCase().includes(q);
        const matchVenue = (evt.venue || '').toLowerCase().includes(q);
        if (!matchTitle && !matchCity && !matchVenue) return false;
      }

      return true;
    });
  }, [events, year, month, selectedDay, selectedCategory, searchQuery]);

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  const getCategoryDotColor = (category) => {
    switch (category) {
      case 'Olahraga':
        return 'bg-amber-500';
      case 'Konser Musik':
        return 'bg-purple-500';
      case 'Pameran & Expo':
        return 'bg-cyan-500';
      case 'Festival Budaya':
        return 'bg-emerald-500';
      default:
        return 'bg-kai-blue';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20 relative">
      {/* Top Navbar */}
      <Navbar
        title="Kalender Event KAI"
        subtitle="Calendar of Events by Angel"
        showBack={true}
        onBack={() => setCurrentStep('home')}
      />

      {/* SYNC STATUS BAR */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2.5 shadow-xs border-b border-indigo-500/20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isLiveSync ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <div className="text-[11px] font-bold flex items-center gap-1.5 leading-tight">
                <span>{isLiveSync ? 'Google Sheet: Live Synced' : 'Google Sheet: Synced (Active)'}</span>
                <span className="text-[9px] bg-white/20 text-blue-200 px-1.5 py-0.2 rounded font-semibold">
                  by Angel
                </span>
              </div>
              <div className="text-[9px] text-slate-300">
                Update: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB' : 'Aktif'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sync Now button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              title="Sinkronkan Ulang dari Google Sheet"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors tap-active disabled:opacity-50"
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
              <span className="text-[10px] font-semibold hidden xs:inline">Sync</span>
            </button>

            {/* External Web Link button */}
            <a
              href={BITLY_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka Web Kalender Asli (Google Apps Script)"
              className="px-2.5 py-1.5 rounded-lg bg-kai-orange hover:bg-orange-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm transition-colors tap-active"
            >
              <span>Web Asli</span>
              <ExternalLink size={11} />
            </a>

            {/* Config Settings */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="Konfigurasi URL Google Sheet"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Settings size={13} />
            </button>
          </div>
        </div>

        {syncNotice && (
          <div className="mt-1.5 text-[10px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 animate-in fade-in">
            <CheckCircle2 size={11} className="shrink-0 text-emerald-400" />
            <span>{syncNotice}</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* QUICK JUMP MONTH PILLS */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Pilihan Cepat Agenda Event:</span>
            {selectedDay !== null && (
              <button
                onClick={() => setSelectedDay(null)}
                className="text-kai-blue font-bold text-[10px] hover:underline"
              >
                Reset Filter Tanggal ({selectedDay} {monthNames[month]})
              </button>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {quickMonths.map((qm, idx) => {
              const isMatch = qm.year === year && qm.month === month && (selectedDay === qm.day || selectedDay === null);
              return (
                <button
                  key={idx}
                  onClick={() => jumpToMonth(qm.year, qm.month, qm.day)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all tap-active shrink-0 border ${
                    isMatch
                      ? 'bg-kai-blue text-white border-kai-blue shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {qm.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE MONTHLY CALENDAR CARD */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          {/* Month Header Controller */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-kai-blue flex items-center justify-center shadow-2xs">
                <CalendarIcon size={18} strokeWidth={2.2} />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  {currentMonthLabel}
                </h2>
                <span className="text-[10px] text-slate-400">
                  {events.filter(e => (e.isoDate || '').startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length} Event Terdaftar
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors tap-active"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors tap-active"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1">
            <span className="text-red-500">Min</span>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span className="text-kai-blue">Sab</span>
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((cell, idx) => {
              const hasEvents = cell.isCurrentMonth && Boolean(eventsByDate[cell.dateStr]);
              const eventList = eventsByDate[cell.dateStr] || [];
              const isSelected = cell.isCurrentMonth && selectedDay === cell.day;

              return (
                <button
                  key={idx}
                  disabled={!cell.isCurrentMonth}
                  onClick={() => {
                    if (!cell.isCurrentMonth) return;
                    if (selectedDay === cell.day) {
                      setSelectedDay(null); // toggle off
                    } else {
                      setSelectedDay(cell.day);
                    }
                  }}
                  className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all tap-active ${
                    !cell.isCurrentMonth
                      ? 'opacity-20 cursor-default'
                      : isSelected
                      ? 'bg-gradient-to-tr from-kai-blue to-indigo-600 text-white font-black shadow-md ring-2 ring-kai-blue/30 scale-105 z-10'
                      : hasEvents
                      ? 'bg-blue-50/70 hover:bg-blue-100/70 text-slate-900 font-bold border border-blue-200/80'
                      : 'hover:bg-slate-100 text-slate-700 font-medium'
                  }`}
                >
                  <span className="text-xs leading-none">{cell.day}</span>

                  {/* Event Indicator Dots */}
                  {hasEvents && (
                    <div className="flex gap-0.5 mt-1">
                      {eventList.slice(0, 3).map((evt, eIdx) => (
                        <span
                          key={eIdx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-amber-300' : getCategoryDotColor(evt.category)
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-1.5">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Lari/Olahraga</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Konser</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Expo</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Festival</span>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>Agenda Acara</span>
              {selectedDay ? (
                <span className="text-kai-blue font-extrabold normal-case">
                  • {selectedDay} {monthNames[month]} {year}
                </span>
              ) : (
                <span className="text-slate-400 font-normal normal-case">
                  • Seluruh {monthNames[month]} {year}
                </span>
              )}
            </h3>
            <span className="text-[11px] text-slate-400 font-bold">
              {filteredEvents.length} Acara
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['Semua', 'Olahraga', 'Konser Musik', 'Pameran & Expo', 'Festival Budaya'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all tap-active shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-kai-blue text-white border-kai-blue shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* EVENTS LIST */}
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <CalendarIcon size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">Tidak Ada Event Ditemukan</h4>
                <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                  {selectedDay
                    ? `Belum ada agenda acara pada tanggal ${selectedDay} ${monthNames[month]} ${year}. Silakan pilih tanggal lain yang memiliki penanda dot.`
                    : `Belum ada jadwal acara untuk kategori "${selectedCategory}" pada bulan ${currentMonthLabel}.`}
                </p>
              </div>
              {selectedDay !== null && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="px-4 py-2 bg-blue-50 text-kai-blue hover:bg-kai-blue hover:text-white font-bold text-xs rounded-xl border border-blue-200 transition-colors"
                >
                  Tampilkan Semua Event Bulan Ini
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => selectEvent(evt)}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-kai-blue/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer tap-active flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    {/* Category pill & city */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-kai-blue bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/80">
                        {evt.category}
                      </span>
                      {evt.city && (
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin size={11} className="text-kai-orange shrink-0" />
                          <span className="truncate">{evt.city}</span>
                        </span>
                      )}
                    </div>

                    {/* Nama Event / Acara */}
                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-kai-blue transition-colors leading-snug">
                      {evt.title}
                    </h4>

                    {/* Tanggal & Info */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <CalendarIcon size={12} className="text-kai-blue shrink-0" />
                        {evt.date}
                      </span>
                      {evt.startingPrice > 0 && (
                        <span className="text-slate-400">
                          • Mulai {formatIDR(evt.startingPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="shrink-0 flex items-center gap-1 text-kai-blue font-bold text-xs bg-blue-50/60 group-hover:bg-kai-blue group-hover:text-white px-2.5 py-1.5 rounded-xl transition-all">
                    <span>Pilih</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SETTINGS MODAL: GOOGLE APPS SCRIPT / SHEET ENDPOINT */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-kai-blue flex items-center justify-center">
                  <Settings size={17} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Konfigurasi Google Sheet</h3>
                  <span className="text-[10px] text-slate-400">Sinkronisasi Endpoint Kalender</span>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-700 block">
                URL Google Apps Script Web App / Sheet API:
              </label>
              <textarea
                value={endpointInput}
                onChange={(e) => setEndpointInput(e.target.value)}
                rows={3}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue font-mono"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Tautan default: Web App Apps Script dari <span className="font-bold text-kai-blue">{BITLY_CALENDAR_URL}</span>.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEndpointInput(DEFAULT_GAS_URL)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Reset Default
              </button>
              <button
                type="button"
                onClick={handleSaveEndpoint}
                className="flex-1 py-2 text-xs font-bold text-white bg-kai-blue hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
              >
                Simpan & Sync
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};
