import React, { useState, useMemo } from 'react';
import { 
  Train, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  ArrowLeftRight, 
  Check, 
  Search, 
  Users, 
  ChevronRight, 
  Sparkles, 
  RotateCcw,
  Clock,
  Tag
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MOCK_TRAIN_SCHEDULES } from '../../data/mockData';

export const TrainScheduleSelector = () => {
  const {
    selectedTrain,
    setSelectedTrain,
    trainSearchParams,
    setTrainSearchParams,
    ticketQuantity,
    selectedEvent
  } = useBooking();

  // Local state for search controls
  const [origin, setOrigin] = useState(trainSearchParams.origin || 'Gambir (GMR)');
  const [destination, setDestination] = useState(() => {
    if (selectedEvent?.city?.toLowerCase().includes('semarang')) return 'Semarang Tawang (SMT)';
    if (selectedEvent?.city?.toLowerCase().includes('yogya')) return 'Yogyakarta (YK)';
    if (selectedEvent?.city?.toLowerCase().includes('bandung')) return 'Bandung (BD)';
    return trainSearchParams.destination || 'Semarang Tawang (SMT)';
  });
  const [departureDate, setDepartureDate] = useState(trainSearchParams.departureDate || '2027-04-16');
  const [isRoundTrip, setIsRoundTrip] = useState(trainSearchParams.isRoundTrip || false);
  const [returnDate, setReturnDate] = useState(trainSearchParams.returnDate || '2027-04-18');
  const [adults, setAdults] = useState(trainSearchParams.adults || Math.max(1, ticketQuantity));
  const [children, setChildren] = useState(trainSearchParams.children || 0);

  // Search trigger state
  const [hasSearched, setHasSearched] = useState(trainSearchParams.hasSearched || false);
  const [isSearching, setIsSearching] = useState(false);

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  const stationList = [
    { code: 'GMR', name: 'Gambir (GMR)', city: 'Jakarta' },
    { code: 'PSE', name: 'Pasar Senen (PSE)', city: 'Jakarta' },
    { code: 'BD', name: 'Bandung (BD)', city: 'Bandung' },
    { code: 'SMT', name: 'Semarang Tawang (SMT)', city: 'Semarang' },
    { code: 'YK', name: 'Yogyakarta (YK)', city: 'Yogyakarta' },
    { code: 'SLO', name: 'Solo Balapan (SLO)', city: 'Surakarta' },
    { code: 'SBI', name: 'Surabaya Pasarturi (SBI)', city: 'Surabaya' }
  ];

  // Swap origin and destination
  const handleSwapStations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Execute Search
  const handleSearch = () => {
    setIsSearching(true);
    setTrainSearchParams({
      origin,
      destination,
      departureDate,
      returnDate,
      isRoundTrip,
      adults,
      children,
      hasSearched: true
    });

    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 400);
  };

  // Filter schedules according to route or show best matches
  const availableSchedules = useMemo(() => {
    const exact = MOCK_TRAIN_SCHEDULES.filter(
      s => s.origin === origin && s.destination === destination
    );
    if (exact.length > 0) return exact;

    // Filter by destination
    const byDest = MOCK_TRAIN_SCHEDULES.filter(s => s.destination === destination);
    if (byDest.length > 0) return byDest;

    return MOCK_TRAIN_SCHEDULES;
  }, [origin, destination]);

  return (
    <div className="bg-gradient-to-b from-blue-50/90 to-indigo-50/70 border border-kai-blue/30 rounded-2xl p-3.5 space-y-3 mt-3 animate-in fade-in duration-300">
      {/* Header with 5% Discount Badge */}
      <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
        <div className="flex items-center gap-1.5 font-bold text-xs text-kai-blue">
          <Train size={16} className="text-kai-blue" />
          <span>Transportasi Kereta Api Resmi KAI</span>
        </div>
        <span className="text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-orange-500 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
          Hemat 5% Event
        </span>
      </div>

      {/* SEARCH FORM WIDGET */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-3">
        {/* Origin & Destination with Swap Button */}
        <div className="relative space-y-2">
          {/* Stasiun Awal */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">
              Stasiun Asal Keberangkatan
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
            >
              {stationList.map(st => (
                <option key={st.code} value={st.name}>
                  {st.name} - {st.city}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-end -my-1.5 pr-4 relative z-10">
            <button
              type="button"
              onClick={handleSwapStations}
              className="w-7 h-7 rounded-full bg-kai-blue text-white shadow-md hover:bg-blue-700 flex items-center justify-center tap-active transition-transform active:rotate-180"
              title="Tukar Stasiun"
            >
              <ArrowLeftRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* Stasiun Tujuan */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold block mb-0.5">
              Stasiun Tujuan Event
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
            >
              {stationList.map(st => (
                <option key={st.code} value={st.name}>
                  {st.name} - {st.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & PP Toggle Section */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          {/* Tanggal Keberangkatan */}
          <div>
            <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-1">
              <CalendarIcon size={12} className="text-kai-blue" />
              <span>Tanggal Keberangkatan</span>
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
            />
          </div>

          {/* Opsi Pulang Pergi Toggle */}
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="togglePP"
                checked={isRoundTrip}
                onChange={(e) => setIsRoundTrip(e.target.checked)}
                className="w-4 h-4 text-kai-blue rounded focus:ring-kai-blue cursor-pointer"
              />
              <label htmlFor="togglePP" className="text-xs font-bold text-slate-800 cursor-pointer">
                Opsi Pulang Pergi (PP)
              </label>
            </div>
            {isRoundTrip && (
              <span className="text-[10px] bg-blue-100 text-kai-blue font-bold px-2 py-0.5 rounded-full">
                PP Aktif
              </span>
            )}
          </div>

          {/* Tanggal Kepulangan (Muncul jika PP dipilih) */}
          {isRoundTrip && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mb-1">
                <CalendarIcon size={12} className="text-amber-600" />
                <span>Tanggal Kepulangan</span>
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-bold text-slate-800 bg-amber-50/40 border border-amber-200 rounded-xl focus:outline-none focus:border-kai-blue"
              />
            </div>
          )}

          {/* Jumlah Penumpang (Dewasa & Anak) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">Dewasa (&gt;3 thn)</div>
              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                  className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="font-extrabold text-xs text-slate-800">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults(prev => prev + 1)}
                  className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-medium">Anak (0-3 thn)</div>
              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs"
                >
                  -
                </button>
                <span className="font-extrabold text-xs text-slate-800">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren(prev => prev + 1)}
                  className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Button Cari Tiket */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full py-2.5 bg-gradient-to-r from-kai-blue to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 tap-active transition-all"
        >
          {isSearching ? (
            <span>Mencari Jadwal Kereta...</span>
          ) : (
            <>
              <Search size={14} strokeWidth={2.5} />
              <span>Cari Tiket Kereta Api</span>
            </>
          )}
        </button>
      </div>

      {/* SELECTED TRAIN BADGE / CARD IF ALREADY CHOSEN */}
      {selectedTrain && (
        <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-2xl p-3 shadow-xs space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                ✓
              </div>
              <span>Jadwal Kereta Terpilih</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTrain(null)}
              className="text-[11px] font-bold text-rose-600 hover:underline"
            >
              Hapus
            </button>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-slate-900">
                  {selectedTrain.trainName}
                </span>
                <span className="text-[10px] text-slate-500 ml-1.5 bg-slate-100 px-1.5 py-0.5 rounded">
                  {selectedTrain.trainClass}
                </span>
              </div>
              <span className="font-extrabold text-xs text-kai-blue">
                {formatIDR(selectedTrain.discountedPrice * (isRoundTrip ? 2 : 1) * adults)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
              <span>{selectedTrain.departure}</span>
              <ArrowRight size={11} className="text-slate-400" />
              <span>{selectedTrain.arrival}</span>
              <span className="text-slate-400">({selectedTrain.duration})</span>
            </div>

            <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span>{origin} → {destination} {isRoundTrip ? '(PP)' : ''}</span>
              <span className="text-emerald-700 font-bold">Diskon 5% Diterapkan</span>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULES LIST (Only displayed AFTER user clicks "Cari Tiket") */}
      {hasSearched && (
        <div className="space-y-2 pt-1 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span>Hasil Pencarian ({availableSchedules.length} Kereta Tersedia)</span>
            <span className="text-kai-blue font-semibold">{origin.split(' ')[0]} → {destination.split(' ')[0]}</span>
          </div>

          {availableSchedules.map((schedule) => {
            const isSelected = selectedTrain?.id === schedule.id;

            return (
              <div
                key={schedule.id}
                onClick={() => setSelectedTrain(schedule)}
                className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                  isSelected
                    ? 'bg-white border-kai-blue shadow-xs ring-2 ring-kai-blue/20'
                    : 'bg-white/95 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>{schedule.trainName}</span>
                      <span className="text-[10px] font-normal text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {schedule.trainClass}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      <span>{schedule.departure}</span>
                      <ArrowRight size={11} className="text-slate-400" />
                      <span>{schedule.arrival}</span>
                      <span className="text-slate-400 text-[10px]">({schedule.duration})</span>
                    </div>
                  </div>

                  {/* Price with strikethrough & -5% badge */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-[10px] text-slate-400 line-through">
                        {formatIDR(schedule.originalPrice)}
                      </span>
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">
                        -5%
                      </span>
                    </div>
                    <div className="font-extrabold text-xs text-kai-blue">
                      {formatIDR(schedule.discountedPrice)}
                    </div>
                    <div className="text-[9px] text-slate-400">per penumpang</div>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">
                    Sisa {schedule.availableSeats || 24} kursi
                  </span>
                  <span className={`font-bold flex items-center gap-1 ${
                    isSelected ? 'text-kai-blue' : 'text-slate-600'
                  }`}>
                    {isSelected ? (
                      <>
                        <Check size={11} strokeWidth={3} />
                        <span>Terpilih</span>
                      </>
                    ) : (
                      <span>Pilih Jadwal Ini</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
