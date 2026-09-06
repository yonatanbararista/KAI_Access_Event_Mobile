import React from 'react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { SeatMapEditor } from '../../components/seating/SeatMapEditor';

export function SeatingPage() {
  const { currentEvent, seatMap, setSeatMap } = usePartnerPortal();

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
          <span>Event:</span>
          <span className="text-kai-blue font-bold">{currentEvent.title}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Denah & Manajemen Kursi (Seating Management)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola alokasi nomor baris & kursi peserta panggung utama (Available, Sold, Reserved, Blocked).
        </p>
      </div>

      <SeatMapEditor
        seatMap={seatMap}
        onUpdateSeatMap={(newMap) => setSeatMap(newMap)}
      />
    </div>
  );
}
