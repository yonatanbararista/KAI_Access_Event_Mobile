import React from 'react';
import { Minus, Plus, Check, Ticket, Users, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { useBooking } from '../context/BookingContext';

export const TicketSelectionPage = () => {
  const {
    selectedEvent,
    selectedTicket,
    setSelectedTicket,
    ticketQuantities,
    incrementTier,
    decrementTier,
    ticketQuantity,
    setCurrentStep,
    calculations
  } = useBooking();

  if (!selectedEvent) return null;

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Pilih Kategori Tiket"
        subtitle={selectedEvent.title}
        stepNumber={1}
        totalSteps={5}
        showBack={true}
        onBack={() => setCurrentStep('detail')}
      />

      <div className="p-4 space-y-4 flex-1">
        {/* MANDATORY NUMBERED SEATING INFORMATION BANNER */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-2xl p-4 border border-blue-200/80 shadow-xs space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-kai-blue text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Info size={15} strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-xs text-kai-blue uppercase tracking-wide">
              Informasi Nomor Tempat Duduk
            </h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium pl-9">
            Cat 1, Cat 2, Cat 3, Cat 4, dan Cat 5 merupakan kategori duduk bernomor (numbered seating). Nomor tempat duduk Anda akan dikirimkan mendekati tanggal acara dan akan diberlakukan pada hari pertunjukan.
          </p>
          <div className="pl-9 pt-1 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Alokasi otomatis sistem kursi terbaik berurutan (adjacent seats)</span>
          </div>
        </div>

        {/* Ticket Categories List with Inline Steppers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pilih Jumlah Tiket per Kategori
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              Maks. 5 tiket ({ticketQuantity}/5)
            </span>
          </div>

          {selectedEvent.tickets?.map((tier) => {
            const qty = ticketQuantities[tier.id] || 0;
            const isSelected = qty > 0;

            return (
              <div
                key={tier.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50/40 border-kai-blue shadow-xs ring-2 ring-kai-blue/15'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header: Name, Price, and Stepper */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 leading-tight">
                        {tier.name}
                      </span>
                    </div>
                    <div className="text-sm font-black text-kai-blue mt-0.5">
                      {formatIDR(tier.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper [- / +] right on the category card */}
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-1.5 py-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => decrementTier(tier.id)}
                      disabled={qty <= 0}
                      className={`w-7 h-7 rounded-full flex items-center justify-center tap-active transition-all ${
                        qty <= 0
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95'
                      }`}
                      aria-label={`Kurangi tiket ${tier.name}`}
                    >
                      <Minus size={13} strokeWidth={2.5} />
                    </button>

                    <span className="font-extrabold text-xs text-slate-900 min-w-[20px] text-center">
                      {qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => incrementTier(tier.id)}
                      disabled={ticketQuantity >= 5}
                      className={`w-7 h-7 rounded-full flex items-center justify-center tap-active transition-all ${
                        ticketQuantity >= 5
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'bg-kai-blue text-white hover:bg-blue-700 active:scale-95 shadow-2xs'
                      }`}
                      aria-label={`Tambah tiket ${tier.name}`}
                    >
                      <Plus size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Subtotal if this category has tickets selected */}
                {qty > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-blue-100 flex items-center justify-between text-xs">
                    <span className="text-blue-800 font-medium">
                      Subtotal {tier.name} ({qty}x)
                    </span>
                    <span className="font-bold text-slate-900">
                      {formatIDR(tier.price * qty)}
                    </span>
                  </div>
                )}

                {/* Tier Perks list */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                  {tier.perks?.map((perk, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-kai-blue shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <span>
            Setiap pemilik tiket wajib mengisi data identitas diri (KTP/Paspor) serta ukuran jersey resmi pada halaman berikutnya.
          </span>
        </div>
      </div>

      {/* Sticky Bottom Booking Summary */}
      <BookingSummarySidebar
        nextLabel={`Isi Data Pemesan (${ticketQuantity} Tiket)`}
        onNext={() => setCurrentStep('passengers')}
        isNextDisabled={ticketQuantity === 0}
      />
    </div>
  );
};
