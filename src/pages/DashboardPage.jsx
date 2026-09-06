import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Train
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { useBooking } from '../context/BookingContext';

export const DashboardPage = () => {
  const { ticketsHistory, setCurrentStep } = useBooking();
  const [activeTab, setActiveTab] = useState('Upcoming'); // 'Upcoming' | 'Active' | 'Used' | 'Cancelled'
  const [selectedQrTicket, setSelectedQrTicket] = useState(null);

  const statuses = [
    { id: 'Upcoming', label: 'Akan Datang' },
    { id: 'Active', label: 'Aktif' },
    { id: 'Used', label: 'Selesai' },
    { id: 'Cancelled', label: 'Dibatalkan' }
  ];

  const filteredTickets = ticketsHistory.filter(t => {
    if (activeTab === 'Upcoming') return t.status === 'Upcoming' || !t.status;
    return t.status === activeTab;
  });

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-20">
      <Navbar
        title="Tiket Saya"
        subtitle="Daftar Tiket Event & Kereta Terintegrasi"
        showBack={true}
        onBack={() => setCurrentStep('home')}
      />

      {/* Filter Tabs */}
      <div className="px-4 pt-3 pb-1 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {statuses.map(st => {
            const isActive = activeTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveTab(st.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 tap-active transition-all ${
                  isActive
                    ? 'bg-kai-blue text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tickets List */}
      <div className="p-4 space-y-3 flex-1">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-2xs mt-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-kai-blue flex items-center justify-center mx-auto mb-3">
              <Ticket size={24} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Belum Ada Tiket</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto">
              Tidak ada tiket dalam kategori status ini. Temukan event menarik dan pesan tiket Anda!
            </p>
            <button
              onClick={() => setCurrentStep('catalog')}
              className="mt-4 px-4 py-2 rounded-full bg-kai-blue text-white font-bold text-xs tap-active shadow-sm"
            >
              Jelajah Event Sekarang
            </button>
          </div>
        ) : (
          filteredTickets.map(ticket => {
            return (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden hover:border-slate-300 transition-all"
              >
                {/* Card Header */}
                <div className="p-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-kai-blue bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {ticket.category || 'Event KAI'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {ticket.id}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ticket.status === 'Used'
                      ? 'bg-slate-200 text-slate-600'
                      : ticket.status === 'Cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {ticket.status === 'Used' ? 'Selesai' : ticket.status === 'Cancelled' ? 'Dibatalkan' : 'Akan Datang'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-3.5 space-y-2.5">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {ticket.eventTitle}
                  </h3>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-kai-blue shrink-0" />
                      <span>{ticket.date} • {ticket.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{ticket.venue}, {ticket.city}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Pemesan</span>
                      <span className="font-semibold text-slate-800">{ticket.passengerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Kategori & Kursi</span>
                      <span className="font-semibold text-kai-blue">
                        {ticket.ticketType} ({ticket.seatNumber})
                      </span>
                    </div>
                  </div>

                  {/* QR code trigger button */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900">
                      {formatIDR(ticket.totalPrice)}
                    </div>

                    <button
                      onClick={() => setSelectedQrTicket(ticket)}
                      className="bg-blue-50 hover:bg-kai-blue hover:text-white text-kai-blue text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-1.5 transition-colors tap-active"
                    >
                      <QrCode size={14} />
                      <span>Tampilkan QR</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* QR Code Modal */}
      {selectedQrTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-[340px] w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Boarding Pass Event</span>
              <button
                onClick={() => setSelectedQrTicket(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 tap-active"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-bold text-slate-900 text-sm leading-tight">
                {selectedQrTicket.eventTitle}
              </h4>
              <div className="text-xs text-slate-500">
                {selectedQrTicket.date} • {selectedQrTicket.time}
              </div>
            </div>

            {/* Dummy SVG QR */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="p-2.5 bg-white border border-slate-800 rounded-xl shadow-xs">
                <svg viewBox="0 0 100 100" className="w-36 h-36">
                  <rect x="5" y="5" width="25" height="25" fill="#0f172a" rx="3" />
                  <rect x="10" y="10" width="15" height="15" fill="#ffffff" rx="1" />
                  <rect x="14" y="14" width="7" height="7" fill="#0f172a" />

                  <rect x="70" y="5" width="25" height="25" fill="#0f172a" rx="3" />
                  <rect x="75" y="10" width="15" height="15" fill="#ffffff" rx="1" />
                  <rect x="79" y="14" width="7" height="7" fill="#0f172a" />

                  <rect x="5" y="70" width="25" height="25" fill="#0f172a" rx="3" />
                  <rect x="10" y="75" width="15" height="15" fill="#ffffff" rx="1" />
                  <rect x="14" y="79" width="7" height="7" fill="#0f172a" />

                  <rect x="40" y="10" width="20" height="8" fill="#0f172a" />
                  <rect x="40" y="25" width="10" height="15" fill="#0f172a" />
                  <rect x="15" y="45" width="15" height="15" fill="#0f172a" />
                  <rect x="40" y="50" width="25" height="10" fill="#0f172a" />
                  <rect x="70" y="45" width="25" height="15" fill="#0f172a" />
                  <rect x="40" y="70" width="15" height="25" fill="#0f172a" />
                  <rect x="65" y="70" width="25" height="25" fill="#0f172a" />
                </svg>
              </div>
              <div className="font-mono text-xs font-bold text-slate-700 mt-2 tracking-widest">
                {selectedQrTicket.id}
              </div>
              <span className="text-[10px] text-slate-400">Scan di pintu masuk gate event</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Nama:</span>
                <span className="font-semibold text-slate-800">{selectedQrTicket.passengerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kursi:</span>
                <span className="font-semibold text-kai-blue">{selectedQrTicket.seatNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kategori:</span>
                <span className="font-semibold text-slate-800">{selectedQrTicket.ticketType}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedQrTicket(null)}
              className="w-full py-2.5 rounded-full bg-kai-blue text-white font-bold text-xs tap-active"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};
