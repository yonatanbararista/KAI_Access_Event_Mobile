import React, { useState } from 'react';
import { Train, Clock, ArrowRight, Check, Tag } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { MOCK_TRAIN_SCHEDULES } from '../../data/mockData';

export const TrainScheduleSelector = () => {
  const {
    selectedTrain,
    setSelectedTrain,
    trainSearchParams,
    setTrainSearchParams,
    ticketQuantity
  } = useBooking();

  const [origin, setOrigin] = useState(trainSearchParams.origin);
  const [destination, setDestination] = useState(trainSearchParams.destination);
  const [travelDate, setTravelDate] = useState(trainSearchParams.date);

  const formatIDR = (num) => `IDR ${Number(num).toLocaleString('id-ID')}`;

  return (
    <div className="bg-blue-50/70 border border-kai-blue/30 rounded-2xl p-3.5 space-y-3 mt-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-xs text-kai-blue">
          <Train size={15} />
          <span>Pilih Jadwal Kereta Terintegrasi</span>
        </div>
        <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
          Diskon 5% Event
        </span>
      </div>

      {/* Compact Train Search Form */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-200 grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[10px] text-slate-400 font-medium block">Stasiun Asal</label>
          <select
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setTrainSearchParams(prev => ({ ...prev, origin: e.target.value }));
            }}
            className="w-full font-bold text-slate-800 bg-transparent focus:outline-none"
          >
            <option value="Gambir (GMR)">Gambir (GMR)</option>
            <option value="Pasar Senen (PSE)">Pasar Senen (PSE)</option>
            <option value="Bandung (BD)">Bandung (BD)</option>
            <option value="Yogyakarta (YK)">Yogyakarta (YK)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-medium block">Stasiun Tujuan</label>
          <select
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setTrainSearchParams(prev => ({ ...prev, destination: e.target.value }));
            }}
            className="w-full font-bold text-slate-800 bg-transparent focus:outline-none"
          >
            <option value="Yogyakarta (YK)">Yogyakarta (YK)</option>
            <option value="Bandung (BD)">Bandung (BD)</option>
            <option value="Semarang Tawang (SMT)">Semarang (SMT)</option>
            <option value="Gambir (GMR)">Gambir (GMR)</option>
          </select>
        </div>
      </div>

      {/* Train Schedule List */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-600">
          Pilihan Kereta ({ticketQuantity} Penumpang)
        </div>

        {MOCK_TRAIN_SCHEDULES.map(schedule => {
          const isSelected = selectedTrain?.id === schedule.id;

          return (
            <div
              key={schedule.id}
              onClick={() => setSelectedTrain(schedule)}
              className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                isSelected
                  ? 'bg-white border-kai-blue shadow-xs ring-2 ring-kai-blue/20'
                  : 'bg-white/90 border-slate-200 hover:border-slate-300'
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
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">
                  {schedule.origin} → {schedule.destination}
                </span>
                <span className={`font-semibold ${isSelected ? 'text-kai-blue' : 'text-slate-500'}`}>
                  {isSelected ? '✓ Terpilih' : 'Pilih Jadwal'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
