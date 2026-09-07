import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Ticket, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BookingSummarySidebar = ({ nextLabel = "Lanjutkan", onNext, isNextDisabled = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    selectedEvent,
    selectedTicket,
    isStandingTicket,
    ticketQuantity,
    selectedSeats,
    selectedAddOns,
    selectedTrain,
    calculations
  } = useBooking();

  const formatIDR = (num) => {
    return `IDR ${Number(num || 0).toLocaleString('id-ID')}`;
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
      {/* Expandable Breakdown Drawer */}
      {isExpanded && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs max-h-72 overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <span className="font-bold text-slate-800 text-sm">Rincian Pembayaran</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-slate-600 tap-active p-1"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Event & Ticket Summary */}
          {selectedEvent && (
            <div className="mb-3 bg-white p-2.5 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900 line-clamp-1">{selectedEvent.title}</div>
              <div className="text-slate-500 flex items-center gap-2 mt-1">
                <span>{selectedEvent.date}</span>
                <span>•</span>
                <span className="text-kai-blue font-medium">{selectedTicket?.name}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-slate-600">
                <span>{ticketQuantity}x Tiket ({formatIDR(selectedTicket?.price)})</span>
                <span className="font-semibold">{formatIDR(calculations.basePrice)}</span>
              </div>
            </div>
          )}

          {/* Selected Seats info */}
          {!isStandingTicket && selectedSeats && selectedSeats.length > 0 && (
            <div className="flex items-center justify-between py-1 text-slate-600">
              <span>Kursi Terpilih ({selectedSeats.join(', ')})</span>
              <span className="text-emerald-600 font-medium">Termasuk</span>
            </div>
          )}

          {/* Train transport add-on if chosen */}
          {selectedAddOns.includes('addon-train') && selectedTrain && (
            <div className="flex items-center justify-between py-1 text-slate-600">
              <div>
                <span>{selectedTrain.trainName} ({ticketQuantity} org)</span>
                <span className="ml-1.5 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">-5%</span>
              </div>
              <span className="font-medium">{formatIDR(calculations.trainPrice)}</span>
            </div>
          )}

          {/* Other add-ons */}
          {calculations.regularAddonsPrice > 0 && (
            <div className="flex items-center justify-between py-1 text-slate-600">
              <span>Layanan Tambahan (Kuliner/Shuttle/Merch)</span>
              <span className="font-medium">{formatIDR(calculations.regularAddonsPrice)}</span>
            </div>
          )}

          {/* Tax (11%) */}
          <div className="flex items-center justify-between py-1 text-slate-600">
            <span>Pajak (PPN 11%)</span>
            <span className="font-medium">{formatIDR(calculations.tax)}</span>
          </div>

          {/* Admin Fee (IDR 7,000 if <= IDR 110,000, or 3% if > IDR 110,000) */}
          <div className="flex items-center justify-between py-1 text-slate-600">
            <div>
              <span>Biaya Layanan Admin</span>
              <span className="text-[10px] text-slate-400 ml-1">
                ({ticketQuantity}x @ {calculations.isOver110k ? `3% (${formatIDR(calculations.adminFeePerTicket)})` : 'IDR 7.000'})
              </span>
            </div>
            <span className="font-medium">{formatIDR(calculations.adminFee)}</span>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
            <span>Total Pembayaran</span>
            <span className="text-kai-blue">{formatIDR(calculations.totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Action Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer select-none"
        >
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span>Total Biaya ({ticketQuantity} tiket)</span>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
          <div className="text-base font-extrabold text-kai-blue leading-tight">
            {formatIDR(calculations.totalPrice)}
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`flex-1 max-w-[180px] py-2.5 px-4 rounded-full font-bold text-sm text-center shadow-md tap-active transition-all ${
            isNextDisabled
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-kai-blue hover:bg-kai-darkBlue text-white shadow-blue-500/20'
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};
