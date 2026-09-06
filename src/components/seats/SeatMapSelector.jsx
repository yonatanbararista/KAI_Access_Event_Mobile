import React from 'react';
import { Check, Info } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const SeatMapSelector = () => {
  const { selectedSeats, toggleSeat, ticketQuantity } = useBooking();

  // Venue Layout: Rows A - F, 8 seats per row (separated by an aisle: 1-4 | 5-8)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const occupiedSeats = ['A1', 'A2', 'B4', 'B5', 'C2', 'D6', 'D7', 'E1', 'F8'];

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-around text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md border border-slate-300 bg-white" />
          <span className="text-slate-600">Tersedia</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-kai-blue flex items-center justify-center text-white text-[10px]">
            ✓
          </div>
          <span className="text-slate-800 font-semibold">Dipilih</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-slate-200 text-slate-400 flex items-center justify-center text-[10px]">
            ✕
          </div>
          <span className="text-slate-400">Terisi</span>
        </div>
      </div>

      {/* Stage Representation */}
      <div className="flex flex-col items-center">
        <div className="w-4/5 h-8 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-t-xl text-white font-extrabold text-[11px] tracking-widest uppercase flex items-center justify-center shadow-md">
          PANGGUNG / STAGE AREA
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-kai-blue/30 to-transparent my-2" />
      </div>

      {/* Seat Grid with Aisle */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
        {rows.map(row => (
          <div key={row} className="flex items-center justify-between gap-1">
            {/* Row Label Left */}
            <span className="w-5 text-center font-bold text-xs text-slate-400 shrink-0">
              {row}
            </span>

            {/* Left Wing (Seats 1-4) */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map(num => {
                const seatId = `${row}${num}`;
                const status = getSeatStatus(seatId);
                const isSelected = status === 'selected';
                const isOccupied = status === 'occupied';

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => toggleSeat(seatId)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center tap-active transition-all ${
                      isSelected
                        ? 'bg-kai-blue text-white shadow-xs scale-105 ring-2 ring-blue-300'
                        : isOccupied
                        ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-kai-blue'
                    }`}
                    title={`Kursi ${seatId} (${status})`}
                  >
                    {isSelected ? <Check size={13} strokeWidth={3} /> : num}
                  </button>
                );
              })}
            </div>

            {/* Aisle Space */}
            <div className="w-3 text-center text-[9px] text-slate-300 font-mono select-none">
              |
            </div>

            {/* Right Wing (Seats 5-8) */}
            <div className="flex items-center gap-1.5">
              {[5, 6, 7, 8].map(num => {
                const seatId = `${row}${num}`;
                const status = getSeatStatus(seatId);
                const isSelected = status === 'selected';
                const isOccupied = status === 'occupied';

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => toggleSeat(seatId)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center tap-active transition-all ${
                      isSelected
                        ? 'bg-kai-blue text-white shadow-xs scale-105 ring-2 ring-blue-300'
                        : isOccupied
                        ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border border-slate-300 hover:border-kai-blue'
                    }`}
                    title={`Kursi ${seatId} (${status})`}
                  >
                    {isSelected ? <Check size={13} strokeWidth={3} /> : num}
                  </button>
                );
              })}
            </div>

            {/* Row Label Right */}
            <span className="w-5 text-center font-bold text-xs text-slate-400 shrink-0">
              {row}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Seats Feedback Badge */}
      <div className="bg-blue-50/70 rounded-2xl p-3 border border-blue-100 flex items-center justify-between text-xs">
        <div>
          <div className="text-slate-500 text-[11px]">Kursi yang Dipilih:</div>
          <div className="font-extrabold text-kai-blue text-sm">
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Belum memilih kursi'}
          </div>
        </div>

        <div className="text-right">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            selectedSeats.length === ticketQuantity
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {selectedSeats.length}/{ticketQuantity} Kursi
          </span>
        </div>
      </div>
    </div>
  );
};
