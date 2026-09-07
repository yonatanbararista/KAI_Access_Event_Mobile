import React from 'react';
import { Utensils, Bus, ShoppingBag, Train, Check, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { TrainScheduleSelector } from '../components/addons/TrainScheduleSelector';
import { useBooking } from '../context/BookingContext';
import { MOCK_ADDONS } from '../data/mockData';

export const AddOnsPage = () => {
  const {
    selectedEvent,
    selectedAddOns,
    toggleAddOn,
    selectedTrain,
    setSelectedTrain,
    ticketQuantity,
    setCurrentStep,
    isStandingTicket
  } = useBooking();

  const formatIDR = (num) => `IDR ${Number(num).toLocaleString('id-ID')}`;

  const getAddonIcon = (id) => {
    switch (id) {
      case 'addon-train':
        return Train;
      case 'addon-lokocafe':
        return Utensils;
      case 'addon-shuttle':
        return Bus;
      case 'addon-merch':
        return ShoppingBag;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Layanan Tambahan (Add-ons)"
        subtitle={selectedEvent?.title}
        stepNumber={isStandingTicket ? 3 : 4}
        totalSteps={isStandingTicket ? 5 : 6}
        showBack={true}
        onBack={() => setCurrentStep(isStandingTicket ? 'passengers' : 'seats')}
      />

      <div className="p-4 space-y-4 flex-1">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl p-3.5 text-white shadow-xs">
          <div className="font-bold text-xs flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-300" />
            <span>Maksimalkan Pengalaman Event Anda</span>
          </div>
          <p className="text-[11px] text-white/90 mt-1">
            Lengkapi kunjungan dengan tiket kereta diskon 5%, voucher kuliner Lokocafe, dan shuttle resmi.
          </p>
        </div>

        {/* Add-on Cards */}
        <div className="space-y-3">
          {MOCK_ADDONS.map(addon => {
            const isSelected = selectedAddOns.includes(addon.id);
            const Icon = getAddonIcon(addon.id);

            return (
              <div
                key={addon.id}
                className={`bg-white rounded-2xl p-3.5 border transition-all ${
                  isSelected ? 'border-kai-blue ring-2 ring-kai-blue/20 shadow-xs' : 'border-slate-200'
                }`}
              >
                <div
                  onClick={() => toggleAddOn(addon.id)}
                  className="flex items-start justify-between cursor-pointer tap-active"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-kai-blue text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon size={18} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs text-slate-900">{addon.name}</h3>
                        {addon.badge && (
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                            {addon.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {addon.description}
                      </p>

                      {/* Price indicator if not train */}
                      {addon.price && (
                        <div className="text-xs font-extrabold text-kai-blue mt-1">
                          {formatIDR(addon.price)} <span className="text-[10px] text-slate-400 font-normal">/ orang</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="shrink-0 ml-2 mt-1">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-kai-blue border-kai-blue text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>
                  </div>
                </div>

                {/* If train add-on is chosen, render compact train schedule selector */}
                {addon.isTrainSpecial && isSelected && (
                  <TrainScheduleSelector />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BookingSummarySidebar
        nextLabel="Ke Pembayaran"
        onNext={() => setCurrentStep('checkout')}
      />
    </div>
  );
};
