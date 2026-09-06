import React from 'react';
import { Minus, Plus, Check, Ticket, Users, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { useBooking } from '../context/BookingContext';

export const TicketSelectionPage = () => {
  const {
    selectedEvent,
    selectedTicket,
    setSelectedTicket,
    ticketQuantity,
    setTicketQuantity,
    setCurrentStep,
    calculations
  } = useBooking();

  if (!selectedEvent) return null;

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  const handleIncrement = () => {
    if (ticketQuantity < 5) {
      setTicketQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Pilih Tiket"
        subtitle={selectedEvent.title}
        stepNumber={1}
        totalSteps={6}
        showBack={true}
        onBack={() => setCurrentStep('detail')}
      />

      <div className="p-4 space-y-4 flex-1">
        {/* Ticket Tiers Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Kategori Tiket Tersedia
            </h2>
            <span className="text-[11px] text-slate-400">Pilih salah satu</span>
          </div>

          {selectedEvent.tickets?.map((tier) => {
            const isSelected = selectedTicket?.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTicket(tier)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer tap-active ${
                  isSelected
                    ? 'bg-blue-50/50 border-kai-blue shadow-xs ring-2 ring-kai-blue/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-kai-blue bg-kai-blue text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{tier.name}</div>
                      <div className="text-xs font-extrabold text-kai-blue mt-0.5">
                        {formatIDR(tier.price)}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    Sisa {tier.quota} tiket
                  </span>
                </div>

                {/* Tier Perks */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 pl-7 space-y-1">
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

        {/* Quantity Stepper Card */}
        {selectedTicket && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-slate-900">Jumlah Tiket</div>
                <div className="text-[11px] text-slate-500">Maksimal 5 tiket per akun</div>
              </div>

              {/* - / + Counter */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                <button
                  onClick={handleDecrement}
                  disabled={ticketQuantity <= 1}
                  className={`w-7 h-7 rounded-full flex items-center justify-center tap-active transition-colors ${
                    ticketQuantity <= 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-white shadow-2xs text-slate-700 hover:bg-slate-100'
                  }`}
                  aria-label="Kurangi tiket"
                >
                  <Minus size={14} />
                </button>

                <span className="font-extrabold text-sm text-slate-900 w-4 text-center">
                  {ticketQuantity}
                </span>

                <button
                  onClick={handleIncrement}
                  disabled={ticketQuantity >= 5}
                  className={`w-7 h-7 rounded-full flex items-center justify-center tap-active transition-colors ${
                    ticketQuantity >= 5
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-white shadow-2xs text-slate-700 hover:bg-slate-100'
                  }`}
                  aria-label="Tambah tiket"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Subtotal Calculation Display */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Subtotal ({ticketQuantity}x {selectedTicket.name})
              </span>
              <span className="font-extrabold text-slate-900 text-sm">
                {formatIDR(selectedTicket.price * ticketQuantity)}
              </span>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
          <span>
            Setiap tiket memerlukan identitas penumpang (KTP/Paspor) yang valid pada langkah berikutnya.
          </span>
        </div>
      </div>

      {/* Sticky Bottom Booking Summary */}
      <BookingSummarySidebar
        nextLabel="Isi Data Pemesan"
        onNext={() => setCurrentStep('passengers')}
        isNextDisabled={!selectedTicket}
      />
    </div>
  );
};
