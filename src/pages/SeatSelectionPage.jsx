import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { SeatMapSelector } from '../components/seats/SeatMapSelector';
import { useBooking } from '../context/BookingContext';
import { AlertCircle } from 'lucide-react';

export const SeatSelectionPage = () => {
  const { selectedEvent, ticketQuantity, selectedSeats, setCurrentStep } = useBooking();
  const [errorMsg, setErrorMsg] = useState('');

  const handleNext = () => {
    if (selectedSeats.length !== ticketQuantity) {
      setErrorMsg(`Silakan pilih ${ticketQuantity} kursi sesuai jumlah tiket Anda.`);
      return;
    }
    setErrorMsg('');
    setCurrentStep('addons');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Pilih Nomor Kursi"
        subtitle={selectedEvent?.title}
        stepNumber={3}
        totalSteps={6}
        showBack={true}
        onBack={() => setCurrentStep('passengers')}
      />

      <div className="p-4 space-y-4 flex-1">
        <SeatMapSelector />

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      <BookingSummarySidebar
        nextLabel="Pilih Layanan Add-on"
        onNext={handleNext}
      />
    </div>
  );
};
