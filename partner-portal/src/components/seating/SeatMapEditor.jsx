import React, { useState } from 'react';
import { formatIDR } from '../../utils/currency';
import { ShieldAlert, Check, Ban, Lock, Tag, Users, Sparkles } from 'lucide-react';

export function SeatMapEditor({
  seatMap,
  onUpdateSeatMap,
}) {
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [batchCategory, setBatchCategory] = useState('VIP');
  const [batchPrice, setBatchPrice] = useState(750000);

  const sections = seatMap?.sections || [];
  const seatStates = seatMap?.seats || {};

  // Helpers to get seat info
  const getSeatInfo = (seatId, defaultCat, defaultPrice) => {
    const override = seatStates[seatId];
    return {
      id: seatId,
      status: override?.status || 'Available',
      category: override?.category || defaultCat,
      price: override?.price || defaultPrice,
      attendee: override?.attendee || null,
      reason: override?.reason || null,
    };
  };

  const handleSeatClick = (seatId, defaultCat, defaultPrice) => {
    const info = getSeatInfo(seatId, defaultCat, defaultPrice);
    setSelectedSeatId(seatId);
  };

  const handleSetStatus = (newStatus, reason = '') => {
    if (!selectedSeatId) return;
    const current = seatStates[selectedSeatId] || {};
    const updated = {
      ...seatStates,
      [selectedSeatId]: {
        ...current,
        status: newStatus,
        reason: newStatus === 'Blocked' ? reason || 'Teknis Lapangan' : undefined,
      },
    };
    onUpdateSeatMap({ ...seatMap, seats: updated });
  };

  const handleAssignCategory = (cat, price) => {
    if (!selectedSeatId) return;
    const current = seatStates[selectedSeatId] || {};
    const updated = {
      ...seatStates,
      [selectedSeatId]: {
        ...current,
        category: cat,
        price: price,
      },
    };
    onUpdateSeatMap({ ...seatMap, seats: updated });
  };

  // Stats calculation
  let totalCount = 0;
  let availableCount = 0;
  let soldCount = 0;
  let reservedCount = 0;
  let blockedCount = 0;

  sections.forEach((sec) => {
    sec.rows.forEach((row) => {
      for (let c = 1; c <= sec.cols; c++) {
        totalCount++;
        const seatId = `${row}${c < 10 ? '0' + c : c}`;
        const status = seatStates[seatId]?.status || 'Available';
        if (status === 'Available') availableCount++;
        else if (status === 'Sold') soldCount++;
        else if (status === 'Reserved') reservedCount++;
        else if (status === 'Blocked') blockedCount++;
      }
    });
  });

  const activeSeatDetails = selectedSeatId
    ? getSeatInfo(
        selectedSeatId,
        sections[0]?.category || 'Regular',
        sections[0]?.price || 250000
      )
    : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Top Controls & Statistics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Visual Seating Map Editor</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-kai-blue font-bold">
              Assigned Seating
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik nomor kursi pada denah panggung untuk mengatur status (Tersedia, Terjual, Reserved, Blocked) atau alokasi tier.
          </p>
        </div>

        {/* Legend Summary Pills */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
            <span>Tersedia: {availableCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-400"></span>
            <span>Terjual: {soldCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
            <span>Reserved: {reservedCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500"></span>
            <span>Blocked: {blockedCount}</span>
          </div>
        </div>
      </div>

      {/* Stage Layout Visualization */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Seat Grid Area */}
        <div className="flex-1 bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[460px] select-none shadow-inner border border-slate-800 overflow-x-auto">
          {/* Main Stage Banner */}
          <div className="w-full max-w-md bg-gradient-to-r from-kai-blue via-indigo-500 to-kai-orange text-white text-center py-2.5 px-6 rounded-t-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PANGGUNG UTAMA / MAIN STAGE</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Sections Map */}
          <div className="space-y-6 w-full max-w-lg">
            {sections.map((sec, secIdx) => (
              <div
                key={secIdx}
                className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl backdrop-blur-xs"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-3 px-1">
                  <span>{sec.name}</span>
                  <span className="text-kai-orange font-bold">
                    {formatIDR(sec.price)}
                  </span>
                </div>

                {/* Rows in section */}
                <div className="space-y-2">
                  {sec.rows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-1.5">
                      <span className="w-5 text-[10px] font-extrabold text-slate-400 text-center">
                        {row}
                      </span>

                      <div className="flex items-center gap-1.5 flex-wrap justify-center">
                        {Array.from({ length: sec.cols }).map((_, cIdx) => {
                          const colNum = cIdx + 1;
                          const seatId = `${row}${colNum < 10 ? '0' + colNum : colNum}`;
                          const seat = getSeatInfo(seatId, sec.category, sec.price);
                          const isSelected = selectedSeatId === seatId;

                          let seatColor = 'bg-emerald-500 hover:bg-emerald-400 text-white';
                          if (seat.status === 'Sold') seatColor = 'bg-slate-600 text-slate-300 cursor-not-allowed';
                          else if (seat.status === 'Reserved') seatColor = 'bg-amber-500 text-white';
                          else if (seat.status === 'Blocked') seatColor = 'bg-rose-600 text-white';

                          return (
                            <button
                              key={seatId}
                              onClick={() => handleSeatClick(seatId, sec.category, sec.price)}
                              className={`w-7 h-7 rounded-md text-[10px] font-bold flex items-center justify-center transition-all transform ${
                                isSelected
                                  ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg'
                                  : 'hover:scale-105'
                              } ${seatColor}`}
                              title={`${seatId} (${seat.category}) - ${seat.status}`}
                            >
                              {colNum}
                            </button>
                          );
                        })}
                      </div>

                      <span className="w-5 text-[10px] font-extrabold text-slate-400 text-center">
                        {row}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sound Booth / FOH area */}
          <div className="w-48 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-bold text-center py-1.5 rounded-lg mt-6 uppercase tracking-wider">
            FOH / Sound & Lighting Booth
          </div>
        </div>

        {/* Right Action Control Panel */}
        <div className="w-full lg:w-80 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Pengaturan Kursi Terpilih
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Pilih satu kursi dari denah untuk mengubah status atau harga.
            </p>

            {selectedSeatId && activeSeatDetails ? (
              <div className="space-y-4">
                {/* Seat identity card */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Nomor Kursi:</span>
                    <span className="text-base font-extrabold text-slate-900 bg-blue-50 px-2 py-0.5 rounded text-kai-blue">
                      {activeSeatDetails.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Kategori:</span>
                    <span className="font-bold text-slate-800">{activeSeatDetails.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Harga:</span>
                    <span className="font-bold text-emerald-600">{formatIDR(activeSeatDetails.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-extrabold">{activeSeatDetails.status}</span>
                  </div>
                  {activeSeatDetails.attendee && (
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded">
                      Pemegang Tiket: <strong>{activeSeatDetails.attendee}</strong>
                    </div>
                  )}
                  {activeSeatDetails.reason && (
                    <div className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded">
                      Alasan: {activeSeatDetails.reason}
                    </div>
                  )}
                </div>

                {/* State Modification Buttons */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Ubah Status Kursi:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleSetStatus('Available')}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      Buka (Available)
                    </button>
                    <button
                      onClick={() => handleSetStatus('Blocked', 'Teknis / Kamera')}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                    >
                      Blokir (Blocked)
                    </button>
                    <button
                      onClick={() => handleSetStatus('Reserved')}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      Reserve (VIP)
                    </button>
                    <button
                      onClick={() => handleSetStatus('Sold')}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                    >
                      Tandai Sold
                    </button>
                  </div>
                </div>

                {/* Re-assign Category */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">
                    Ubah Tier Kategori:
                  </label>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => handleAssignCategory('VIP', 750000)}
                      className="text-left px-3 py-1.5 text-xs font-medium bg-white rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-kai-blue flex justify-between"
                    >
                      <span>VIP Category</span>
                      <strong>Rp 750.000</strong>
                    </button>
                    <button
                      onClick={() => handleAssignCategory('Regular', 250000)}
                      className="text-left px-3 py-1.5 text-xs font-medium bg-white rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-kai-blue flex justify-between"
                    >
                      <span>Regular Category</span>
                      <strong>Rp 250.000</strong>
                    </button>
                    <button
                      onClick={() => handleAssignCategory('Economy', 150000)}
                      className="text-left px-3 py-1.5 text-xs font-medium bg-white rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-kai-blue flex justify-between"
                    >
                      <span>Economy Category</span>
                      <strong>Rp 150.000</strong>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">Belum ada kursi dipilih</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Klik salah satu kotak kursi pada denah panggung di sebelah kiri.
                </p>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-200 pt-3">
            *Semua perubahan status kursi tersimpan otomatis secara lokal pada sesi promotor ini.
          </div>
        </div>
      </div>
    </div>
  );
}
