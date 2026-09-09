import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, ShieldCheck, CheckSquare, Square, AlertCircle, MapPin } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { useBooking } from '../context/BookingContext';

export const PassengerFormPage = () => {
  const {
    selectedEvent,
    selectedTicket,
    isStandingTicket,
    isSportOrRunning,
    ticketQuantity,
    useProfileData,
    setUseProfileData,
    passengers,
    updatePassenger,
    setCurrentStep,
    USER_PROFILE
  } = useBooking();

  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    // Basic validation
    const firstPassenger = passengers[0];
    if (!firstPassenger?.name || !firstPassenger?.idNumber) {
      setErrorMessage('Mohon lengkapi nama dan nomor identitas penumpang 1.');
      return;
    }
    setErrorMessage('');
    // Skip seat selection and go directly to addons
    setCurrentStep('addons');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Data Pemesan & Penumpang"
        subtitle={selectedEvent?.title}
        stepNumber={2}
        totalSteps={5}
        showBack={true}
        onBack={() => setCurrentStep('tickets')}
      />

      <div className="p-4 space-y-4 flex-1">
        {/* Toggle: Use Profile Data */}
        <div
          onClick={() => setUseProfileData(!useProfileData)}
          className="bg-white rounded-2xl p-3.5 border border-kai-blue/40 shadow-xs flex items-center justify-between cursor-pointer tap-active"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-kai-blue flex items-center justify-center shrink-0">
              <User size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">
                Gunakan Data Profil Saya
              </div>
              <div className="text-[11px] text-slate-500">
                {USER_PROFILE?.name || 'Angelika Fendys'} (KTP • 3372...0002 • Jebres, Surakarta)
              </div>
            </div>
          </div>

          <div className="text-kai-blue">
            {useProfileData ? (
              <div className="w-6 h-6 rounded-md bg-kai-blue text-white flex items-center justify-center">
                ✓
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md border-2 border-slate-300" />
            )}
          </div>
        </div>

        {/* Booker Information */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-kai-blue" />
              <span>Data Kontak Pemesan</span>
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              E-Ticket dikirim ke sini
            </span>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Nama Lengkap Pemesan *
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="cth: Angelika Fendys"
                value={passengers[0]?.name || ''}
                onChange={(e) => updatePassenger(0, 'name', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Email *
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="angelikafsh@gmail.com"
                  value={passengers[0]?.email || ''}
                  onChange={(e) => updatePassenger(0, 'email', e.target.value)}
                  className="w-full pl-9 pr-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Nomor Handphone *
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="089680947898"
                  value={passengers[0]?.phone || ''}
                  onChange={(e) => updatePassenger(0, 'phone', e.target.value)}
                  className="w-full pl-9 pr-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
                />
              </div>
            </div>
          </div>

          {/* New Address Field */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Alamat Lengkap Pemesan *
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="cth: Jebres, Surakarta"
                value={passengers[0]?.address || ''}
                onChange={(e) => updatePassenger(0, 'address', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Passenger Forms (1 to 5 passengers) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              {isSportOrRunning ? 'Daftar Peserta' : 'Daftar Penumpang'} ({ticketQuantity} Orang)
            </h2>
            <span className="text-[11px] text-slate-400">Sesuai KTP/Paspor/SIM</span>
          </div>

          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-kai-blue flex items-center justify-center text-[11px]">
                    {index + 1}
                  </span>
                  <span>{isSportOrRunning ? `Peserta ${index + 1}` : `Penumpang ${index + 1}`}</span>
                  {passenger.tierName && (
                    <span className="text-[10px] bg-blue-50 text-kai-blue font-bold px-2 py-0.5 rounded-md border border-blue-200 ml-1">
                      {passenger.tierName}
                    </span>
                  )}
                </div>
                {index === 0 && useProfileData && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    Sesuai Profil
                  </span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  Nama Lengkap Sesuai Tanda Pengenal *
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={passengers[index]?.name || ''}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-700 block mb-1">
                    Tipe Identitas
                  </label>
                  <select
                    value={passengers[index]?.idType || 'KTP'}
                    onChange={(e) => updatePassenger(index, 'idType', e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-kai-blue"
                  >
                    <option value="KTP">KTP</option>
                    <option value="Paspor">Paspor</option>
                    <option value="SIM">SIM</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] font-medium text-slate-700 block mb-1">
                    Nomor Identitas *
                  </label>
                  <input
                    type="text"
                    placeholder="16 Digit Nomor KTP"
                    value={passengers[index]?.idNumber || ''}
                    onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-kai-blue/30 focus:border-kai-blue"
                  />
                </div>
              </div>

              {/* JERSEY SIZE SELECTOR FOR EACH PASSENGER (ONLY FOR RUNNING / SPORT EVENTS) */}
              {isSportOrRunning && (
                <div className="pt-2.5 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                      <span>Ukuran Jersey Resmi (Running T-Shirt)</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-kai-blue font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Bahan Micro Dry-Fit
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                      const isSelected = (passengers[index]?.jerseySize || 'M') === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => updatePassenger(index, 'jerseySize', size)}
                          className={`py-1.5 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center border tap-active ${
                            isSelected
                              ? 'bg-kai-blue text-white border-kai-blue shadow-xs ring-2 ring-kai-blue/20'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{size}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-0.5">
                    <span>Lebar Dada: S(48cm) M(50cm) L(52cm) XL(54cm) XXL(56cm)</span>
                    <span className="font-extrabold text-kai-blue">
                      Ukuran: {passengers[index]?.jerseySize || 'M'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Sticky Bottom Summary */}
      <BookingSummarySidebar
        nextLabel="Lanjut ke Layanan Tambahan"
        onNext={handleNext}
      />
    </div>
  );
};
