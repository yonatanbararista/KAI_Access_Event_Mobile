import React, { useState, useMemo } from 'react';
import { Search, Calendar, MapPin, Sparkles, Filter, ChevronRight, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { useBooking } from '../context/BookingContext';
import { MOCK_EVENTS, EVENT_CATEGORIES, EVENT_MONTHS } from '../data/mockData';

export const EventCatalogPage = () => {
  const { selectEvent, setCurrentStep } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedMonth, setSelectedMonth] = useState('Semua Bulan');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(evt => {
      const matchCategory = selectedCategory === 'Semua' || evt.category === selectedCategory;
      const matchMonth = selectedMonth === 'Semua Bulan' || evt.month === selectedMonth;
      const matchSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchMonth && matchSearch;
    });
  }, [selectedCategory, selectedMonth, searchQuery]);

  const formatIDR = (num) => `IDR ${Number(num).toLocaleString('id-ID')}`;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 pb-20">
      {/* Header */}
      <Navbar
        title="Jelajah Event KAI"
        subtitle="Konser, Expo, dan Festival terintegrasi kereta"
        showBack={true}
        onBack={() => setCurrentStep('home')}
      />

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            type="text"
            placeholder="Cari nama event, artis, atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Chips */}
        <div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {EVENT_CATEGORIES.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tap-active transition-all ${
                    active
                      ? 'bg-kai-blue text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Periode Event</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-semibold focus:outline-none focus:border-kai-blue"
          >
            {EVENT_MONTHS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Highlight Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-3.5 text-white shadow-sm flex items-center justify-between">
          <div className="max-w-[240px]">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
              Tiket Kereta Diskon 5%
            </span>
            <div className="font-bold text-xs">Pesan Tiket Event Bebas Macet</div>
            <p className="text-[11px] text-white/90">Dapatkan diskon perjalanan KAI langsung saat checkout!</p>
          </div>
          <div className="text-2xl">🎟️</div>
        </div>

        {/* Event Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Daftar Event Tersedia ({filteredEvents.length})
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <div className="text-3xl mb-2">🔍</div>
              <div className="font-bold text-slate-800 text-sm">Event Tidak Ditemukan</div>
              <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci atau ganti filter kategori.</p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setSelectedMonth('Semua Bulan');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-kai-blue font-bold hover:underline"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => selectEvent(event)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-[0_4px_16px_rgba(34,22,115,0.04)] hover:shadow-md transition-all cursor-pointer tap-active"
              >
                {/* Image & Category Tag */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-200">
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                    {event.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-kai-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                    KAI Partner
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 mb-1.5">
                    {event.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-kai-blue shrink-0" />
                      <span className="font-medium text-[11px]">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {event.venue}, {event.city}
                      </span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">Mulai dari</div>
                      <div className="text-sm font-extrabold text-kai-blue">
                        {formatIDR(event.startingPrice)}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectEvent(event);
                      }}
                      className="bg-blue-50 hover:bg-kai-blue hover:text-white text-kai-blue text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-200 flex items-center gap-1 transition-colors tap-active"
                    >
                      <span>Beli Tiket</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
