import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Home, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Train, 
  Share2,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const TicketConfirmationPage = () => {
  const { latestBooking, setCurrentStep, setActiveBottomNav } = useBooking();

  if (!latestBooking) return null;

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  return (
    <div className="flex-1 flex flex-col bg-slate-100 relative pb-10">
      {/* Top Success Banner */}
      <div className="bg-gradient-to-b from-emerald-600 to-teal-700 pt-8 pb-14 px-4 text-white text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center mb-2 shadow-lg animate-bounce">
            <CheckCircle2 size={32} strokeWidth={2.5} />
          </div>
          <h1 className="font-extrabold text-lg tracking-tight">Pemesanan Berhasil!</h1>
          <p className="text-xs text-emerald-100 mt-0.5">
            E-Ticket resmi telah diterbitkan dan tersimpan di akun Anda.
          </p>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Main Perforated Ticket Card */}
      <div className="px-4 -mt-8 relative z-20 space-y-4">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Top Half of Ticket: Event & QR */}
          <div className="p-5 text-center border-b border-dashed border-slate-200 relative">
            {/* Ticket Left & Right Notch cutouts */}
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-slate-100 border-r border-slate-200 shadow-inner" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-slate-100 border-l border-slate-200 shadow-inner" />

            <div className="inline-block bg-blue-50 text-kai-blue text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 mb-2">
              KODE BOOKING: {latestBooking.id}
            </div>

            <h2 className="font-extrabold text-base text-slate-900 leading-tight">
              {latestBooking.eventTitle}
            </h2>

            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Calendar size={13} className="text-kai-blue" />
              <span>{latestBooking.date}</span>
              <span>•</span>
              <Clock size={13} className="text-kai-blue" />
              <span>{latestBooking.time}</span>
            </div>

            {/* Dummy SVG QR Code Container */}
            <div className="my-4 flex flex-col items-center">
              <div className="p-3 bg-white border-2 border-slate-800 rounded-2xl shadow-xs inline-block">
                <svg viewBox="0 0 120 120" className="w-28 h-28">
                  {/* Position detection markers */}
                  <rect x="10" y="10" width="30" height="30" fill="#0f172a" rx="4" />
                  <rect x="15" y="15" width="20" height="20" fill="#ffffff" rx="2" />
                  <rect x="20" y="20" width="10" height="10" fill="#0f172a" />

                  <rect x="80" y="10" width="30" height="30" fill="#0f172a" rx="4" />
                  <rect x="85" y="15" width="20" height="20" fill="#ffffff" rx="2" />
                  <rect x="90" y="20" width="10" height="10" fill="#0f172a" />

                  <rect x="10" y="80" width="30" height="30" fill="#0f172a" rx="4" />
                  <rect x="15" y="85" width="20" height="20" fill="#ffffff" rx="2" />
                  <rect x="20" y="90" width="10" height="10" fill="#0f172a" />

                  {/* Dummy data modules */}
                  <rect x="50" y="15" width="6" height="6" fill="#0f172a" />
                  <rect x="62" y="15" width="6" height="6" fill="#0f172a" />
                  <rect x="50" y="27" width="18" height="6" fill="#0f172a" />
                  <rect x="50" y="40" width="6" height="12" fill="#0f172a" />
                  <rect x="62" y="40" width="12" height="6" fill="#0f172a" />
                  <rect x="15" y="52" width="12" height="6" fill="#0f172a" />
                  <rect x="35" y="52" width="6" height="18" fill="#0f172a" />
                  <rect x="50" y="60" width="18" height="6" fill="#0f172a" />
                  <rect x="80" y="52" width="12" height="12" fill="#0f172a" />
                  <rect x="100" y="52" width="10" height="6" fill="#0f172a" />
                  <rect x="75" y="75" width="12" height="6" fill="#0f172a" />
                  <rect x="95" y="75" width="15" height="12" fill="#0f172a" />
                  <rect x="50" y="85" width="18" height="6" fill="#0f172a" />
                  <rect x="50" y="98" width="6" height="12" fill="#0f172a" />
                  <rect x="65" y="98" width="24" height="6" fill="#0f172a" />
                  <rect x="95" y="98" width="15" height="6" fill="#0f172a" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1 tracking-wider">
                SCAN SAAT MASUK VENUE
              </span>
            </div>
          </div>

          {/* Bottom Half of Ticket: Details */}
          <div className="p-4 bg-slate-50/50 space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] text-slate-400 block">Nama Pemesan</span>
                <span className="font-bold text-slate-800">{latestBooking.passengerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Kategori Tiket</span>
                <span className="font-bold text-kai-blue">{latestBooking.ticketType}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] text-slate-400 block">Nomor Kursi</span>
                <span className="font-bold text-slate-800">{latestBooking.seatNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Jumlah Penonton</span>
                <span className="font-bold text-slate-800">{latestBooking.quantity} Orang</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">Lokasi & Venue</span>
              <span className="font-semibold text-slate-800">{latestBooking.venue}, {latestBooking.city}</span>
            </div>

            {/* If train add-on selected */}
            {latestBooking.selectedTrain && (
              <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Train size={16} className="text-kai-blue shrink-0" />
                  <div>
                    <div className="font-bold text-[11px] text-slate-900">
                      KA {latestBooking.selectedTrain.trainName}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {latestBooking.selectedTrain.origin} → {latestBooking.selectedTrain.destination} ({latestBooking.selectedTrain.departure})
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-bold bg-kai-blue text-white px-1.5 py-0.5 rounded">
                  Diskon 5%
                </span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Total Dibayar</span>
              <span className="text-kai-blue text-sm font-extrabold">
                {formatIDR(latestBooking.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => {
              setActiveBottomNav('My Tickets');
              setCurrentStep('my-tickets');
            }}
            className="w-full py-3 px-4 rounded-full bg-kai-blue hover:bg-kai-darkBlue text-white font-bold text-xs shadow-md tap-active flex items-center justify-center gap-2 transition-colors"
          >
            <Ticket size={16} />
            <span>Lihat di Tiket Saya</span>
          </button>

          <button
            onClick={() => {
              setActiveBottomNav('Home');
              setCurrentStep('home');
            }}
            className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs tap-active flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={15} />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
