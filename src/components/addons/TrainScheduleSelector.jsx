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
  Clock, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MOCK_TRAIN_SCHEDULES } from '../../data/mockData';

export const TrainScheduleSelector = () => {
  const {
    selectedTrain,
    setSelectedTrain,
    selectedReturnTrain,
    setSelectedReturnTrain,
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

  // Quick departure date options
  const departureDays = [
    { label: 'H-1 Acara', date: '2027-04-16', dayDisplay: 'Jumat, 16 Apr' },
    { label: 'Hari H Acara', date: '2027-04-17', dayDisplay: 'Sabtu, 17 Apr' },
    { label: 'H+1 Acara', date: '2027-04-18', dayDisplay: 'Minggu, 18 Apr' }
  ];

  // Quick return date options
  const returnDays = [
    { label: 'Selesai Acara', date: '2027-04-18', dayDisplay: 'Minggu, 18 Apr' },
    { label: 'H+2 Liburan', date: '2027-04-19', dayDisplay: 'Senin, 19 Apr' },
    { label: 'H+3 Santai', date: '2027-04-20', dayDisplay: 'Selasa, 20 Apr' }
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
    }, 350);
  };

  // Filter outbound schedules (Pergi)
  const outboundSchedules = useMemo(() => {
    const nonReturn = MOCK_TRAIN_SCHEDULES.filter(s => !s.isReturn);
    const exact = nonReturn.filter(s => s.origin === origin && s.destination === destination);
    if (exact.length > 0) return exact;

    const byDest = nonReturn.filter(s => s.destination === destination);
    if (byDest.length > 0) return byDest;

    return nonReturn;
  }, [origin, destination]);

  // Filter return schedules (Pulang)
  const returnSchedules = useMemo(() => {
    const returnOnly = MOCK_TRAIN_SCHEDULES.filter(s => s.isReturn);
    const exact = returnOnly.filter(s => s.origin === destination && s.destination === origin);
    if (exact.length > 0) return exact;

    const byOrig = returnOnly.filter(s => s.origin === destination);
    if (byOrig.length > 0) return byOrig;

    return returnOnly;
  }, [origin, destination]);

  return (
    <div className="bg-gradient-to-b from-blue-50/95 to-indigo-50/80 border border-kai-blue/30 rounded-2xl p-3.5 space-y-3.5 mt-3 animate-in fade-in duration-300">
      {/* Header with 5% Discount Badge */}
      <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
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
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                <CalendarIcon size={12} className="text-kai-blue" />
                <span>Pilih Hari Keberangkatan (Pergi)</span>
              </label>
              <span className="text-[10px] font-bold text-kai-blue">{departureDate}</span>
            </div>

            {/* Quick Day Selector Pills for Departure */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {departureDays.map(day => (
                <button
                  key={day.date}
                  type="button"
                  onClick={() => setDepartureDate(day.date)}
                  className={`px-1.5 py-1 rounded-lg text-center transition-all ${
                    departureDate === day.date
                      ? 'bg-kai-blue text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                  }`}
                >
                  <div className="text-[9px] opacity-80 leading-none">{day.label}</div>
                  <div className="text-[11px] font-bold mt-0.5">{day.dayDisplay}</div>
                </button>
              ))}
            </div>

            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full px-3 py-1 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
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
            <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                  <CalendarDays size={12} className="text-amber-600" />
                  <span>Pilih Hari Kepulangan (Pulang)</span>
                </label>
                <span className="text-[10px] font-bold text-amber-700">{returnDate}</span>
              </div>

              {/* Quick Day Selector Pills for Return */}
              <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                {returnDays.map(day => (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setReturnDate(day.date)}
                    className={`px-1.5 py-1 rounded-lg text-center transition-all ${
                      returnDate === day.date
                        ? 'bg-amber-600 text-white font-bold shadow-xs'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100 font-medium'
                    }`}
                  >
                    <div className="text-[9px] opacity-80 leading-none">{day.label}</div>
                    <div className="text-[11px] font-bold mt-0.5">{day.dayDisplay}</div>
                  </button>
                ))}
              </div>

              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-1 text-xs font-bold text-slate-800 bg-amber-50/40 border border-amber-200 rounded-xl focus:outline-none focus:border-amber-600"
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

      {/* SUMMARY BADGES OF SELECTED TRAINS */}
      {(selectedTrain || (isRoundTrip && selectedReturnTrain)) && (
        <div className="bg-emerald-50 border-2 border-emerald-500/80 rounded-2xl p-3 shadow-xs space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Ringkasan Kereta Terpilih</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedTrain(null);
                setSelectedReturnTrain(null);
              }}
              className="text-[11px] font-bold text-rose-600 hover:underline"
            >
              Hapus Semua
            </button>
          </div>

          {/* Kereta Pergi Summary */}
          {selectedTrain && (
            <div className="bg-white rounded-xl p-2.5 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-blue-100 text-kai-blue px-2 py-0.5 rounded-full mr-1.5">
                    PERGI: {departureDate}
                  </span>
                  <span className="font-extrabold text-xs text-slate-900">{selectedTrain.trainName}</span>
                </div>
                <span className="font-extrabold text-xs text-kai-blue">
                  {formatIDR(selectedTrain.discountedPrice * adults)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                <span>{selectedTrain.departure}</span>
                <ArrowRight size={11} className="text-slate-400" />
                <span>{selectedTrain.arrival}</span>
                <span className="text-slate-400">({origin.split(' ')[0]} → {destination.split(' ')[0]})</span>
              </div>
            </div>
          )}

          {/* Kereta Pulang Summary */}
          {isRoundTrip && selectedReturnTrain && (
            <div className="bg-white rounded-xl p-2.5 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mr-1.5">
                    PULANG: {returnDate}
                  </span>
                  <span className="font-extrabold text-xs text-slate-900">{selectedReturnTrain.trainName}</span>
                </div>
                <span className="font-extrabold text-xs text-amber-700">
                  {formatIDR(selectedReturnTrain.discountedPrice * adults)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                <span>{selectedReturnTrain.departure}</span>
                <ArrowRight size={11} className="text-slate-400" />
                <span>{selectedReturnTrain.arrival}</span>
                <span className="text-slate-400">({destination.split(' ')[0]} → {origin.split(' ')[0]})</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCHEDULES LIST SEPARATED BY DEPARTURE DAY (PERGI & PULANG) */}
      {hasSearched && (
        <div className="space-y-4 pt-1 animate-in fade-in duration-300">
          {/* SECTION 1: JADWAL KERETA PERGI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-blue-100/70 px-3 py-1.5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-kai-blue">
                <span className="w-4 h-4 rounded-full bg-kai-blue text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Jadwal Kereta Pergi: {departureDate}</span>
              </div>
              <span className="text-[10px] text-blue-900 font-semibold">{origin.split(' ')[0]} → {destination.split(' ')[0]}</span>
            </div>

            {outboundSchedules.map((schedule) => {
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
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Sisa {schedule.availableSeats || 24} kursi</span>
                    <span className={`font-bold flex items-center gap-1 ${
                      isSelected ? 'text-kai-blue' : 'text-slate-600'
                    }`}>
                      {isSelected ? (
                        <>
                          <Check size={11} strokeWidth={3} />
                          <span>Pergi Terpilih</span>
                        </>
                      ) : (
                        <span>Pilih Kereta Pergi</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECTION 2: JADWAL KERETA PULANG (IF PP ACTIVE) */}
          {isRoundTrip && (
            <div className="space-y-2 pt-2 border-t border-blue-200/50">
              <div className="flex items-center justify-between bg-amber-100/70 px-3 py-1.5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Jadwal Kereta Pulang: {returnDate}</span>
                </div>
                <span className="text-[10px] text-amber-900 font-semibold">{destination.split(' ')[0]} → {origin.split(' ')[0]}</span>
              </div>

              {returnSchedules.map((schedule) => {
                const isSelected = selectedReturnTrain?.id === schedule.id;

                return (
                  <div
                    key={schedule.id}
                    onClick={() => setSelectedReturnTrain(schedule)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                      isSelected
                        ? 'bg-white border-amber-500 shadow-xs ring-2 ring-amber-500/20'
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

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatIDR(schedule.originalPrice)}
                          </span>
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 rounded">
                            -5%
                          </span>
                        </div>
                        <div className="font-extrabold text-xs text-amber-700">
                          {formatIDR(schedule.discountedPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Sisa {schedule.availableSeats || 20} kursi</span>
                      <span className={`font-bold flex items-center gap-1 ${
                        isSelected ? 'text-amber-700' : 'text-slate-600'
                      }`}>
                        {isSelected ? (
                          <>
                            <Check size={11} strokeWidth={3} />
                            <span>Pulang Terpilih</span>
                          </>
                        ) : (
                          <span>Pilih Kereta Pulang</span>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
