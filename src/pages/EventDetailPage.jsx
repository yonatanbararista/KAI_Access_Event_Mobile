import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Share2, 
  ChevronRight, 
  Check, 
  Info 
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { useBooking } from '../context/BookingContext';

export const EventDetailPage = () => {
  const { selectedEvent, setCurrentStep, setSelectedTicket } = useBooking();
  const [activeTab, setActiveTab] = useState('detail'); // 'detail' | 'tickets' | 'terms'

  if (!selectedEvent) return null;

  const formatIDR = (num) => `IDR ${Number(num).toLocaleString('id-ID')}`;

  const handleStartBooking = () => {
    // Default to the first available ticket tier
    if (selectedEvent.tickets?.length > 0) {
      setSelectedTicket(selectedEvent.tickets[0]);
    }
    setCurrentStep('tickets');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-24">
      {/* Navbar with back button to catalog */}
      <Navbar
        title="Detail Event"
        subtitle={selectedEvent.title}
        showBack={true}
        onBack={() => setCurrentStep('catalog')}
      />

      {/* Hero Banner with overlay gradient */}
      <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
        <img
          src={selectedEvent.heroImage || selectedEvent.banner}
          alt={selectedEvent.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-4 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
          {selectedEvent.category}
        </div>

        {/* Organizer badge */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={11} /> {selectedEvent.organizer}
          </div>
          <h1 className="text-lg font-extrabold leading-tight mt-0.5 drop-shadow-sm">
            {selectedEvent.title}
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Event Quick Logistics Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-kai-blue flex items-center justify-center shrink-0 mt-0.5">
              <Calendar size={17} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Tanggal Pelaksanaan</div>
              <div className="text-xs font-bold text-slate-800">{selectedEvent.date}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-kai-blue flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={17} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Waktu Acara</div>
              <div className="text-xs font-bold text-slate-800">{selectedEvent.time}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-kai-blue flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={17} />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Lokasi & Kota</div>
              <div className="text-xs font-bold text-slate-800">{selectedEvent.venue}</div>
              <div className="text-[11px] text-slate-500">{selectedEvent.city}</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab('detail')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'detail' ? 'bg-kai-blue text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Deskripsi
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'tickets' ? 'bg-kai-blue text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Kategori Tiket
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'terms' ? 'bg-kai-blue text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Syarat & Ketentuan
          </button>
        </div>

        {/* Tab 1: Description & Highlights */}
        {activeTab === 'detail' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tentang Event Ini
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedEvent.description}
            </p>

            {selectedEvent.highlights && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Highlights Acara:</h4>
                <ul className="space-y-1.5">
                  {selectedEvent.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* KAI Partnership Trust Box */}
            <div className="mt-3 bg-blue-50/60 rounded-xl p-3 border border-blue-100 flex items-start gap-2 text-xs text-blue-900">
              <ShieldCheck size={16} className="text-kai-blue shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Tiket Resmi KAI Partner:</span> Dilengkapi barcode resmi yang dapat langsung diverifikasi di lokasi event maupun stasiun kedatangan.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ticket Tiers Preview */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {selectedEvent.tickets?.map(tier => (
              <div
                key={tier.id}
                onClick={() => {
                  setSelectedTicket(tier);
                  setCurrentStep('tickets');
                }}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs hover:border-kai-blue transition-all cursor-pointer tap-active"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{tier.name}</div>
                    <div className="text-xs font-extrabold text-kai-blue mt-0.5">
                      {formatIDR(tier.price)}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    Sisa {tier.quota} tiket
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                  {tier.perks.map((p, idx) => (
                    <div key={idx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2.5">
            <h3 className="font-bold text-slate-900">Ketentuan Pembelian:</h3>
            <p>1. 1 akun KAI Access dapat memesan maksimal 5 tiket per transaksi.</p>
            <p>2. E-ticket resmi dengan QR Code akan terbit otomatis setelah pembayaran diverifikasi.</p>
            <p>3. Tiket yang sudah dibeli tidak dapat dibatalkan (non-refundable) kecuali ada pembatalan resmi dari pihak promotor.</p>
            <p>4. Nikmati diskon perjalanan kereta api sebesar 5% bagi penonton yang memilih opsi add-on kereta api.</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar with Book Ticket CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 flex items-center justify-between shadow-lg">
        <div>
          <div className="text-[11px] text-slate-400 font-medium">Harga Mulai Dari</div>
          <div className="text-base font-black text-kai-blue">
            {formatIDR(selectedEvent.startingPrice)}
          </div>
        </div>

        <button
          onClick={handleStartBooking}
          className="bg-kai-blue hover:bg-kai-darkBlue text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md shadow-blue-500/25 tap-active flex items-center gap-1.5"
        >
          <span>Pesan Tiket</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
