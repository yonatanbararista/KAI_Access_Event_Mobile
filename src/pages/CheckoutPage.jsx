import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  QrCode, 
  Building, 
  Check, 
  Lock, 
  Sparkles, 
  ChevronRight,
  Loader2,
  Calendar,
  MapPin
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { useBooking } from '../context/BookingContext';
import { USER_PROFILE, MOCK_ADDONS } from '../data/mockData';

export const CheckoutPage = () => {
  const {
    selectedEvent,
    selectedTicket,
    isStandingTicket,
    ticketQuantity,
    passengers,
    selectedSeats,
    selectedAddOns,
    selectedTrain,
    selectedReturnTrain,
    selectedRental,
    selectedHotel,
    calculations,
    completeCheckout,
    setCurrentStep
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState('kaipay'); // 'kaipay' | 'va' | 'qris'
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate real-world payment verification
    setTimeout(() => {
      setIsProcessing(false);
      completeCheckout(paymentMethod === 'kaipay' ? 'KAIPay' : paymentMethod === 'va' ? `VA ${selectedBank}` : 'QRIS');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-28">
      <Navbar
        title="Ringkasan Pembayaran"
        subtitle="Konfirmasi & Pembayaran Tiket"
        stepNumber={4}
        totalSteps={5}
        showBack={true}
        onBack={() => setCurrentStep('addons')}
      />

      <div className="p-4 space-y-4 flex-1">
        {/* Event Card Info */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[10px] font-bold text-kai-blue bg-blue-50 px-2 py-0.5 rounded-full">
              {selectedEvent?.category}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Order ID: #{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>

          <h2 className="font-bold text-slate-900 text-sm">{selectedEvent?.title}</h2>
          
          <div className="text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-kai-blue shrink-0" />
              <span>{selectedEvent?.date} • {selectedEvent?.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-slate-400 shrink-0" />
              <span className="line-clamp-1">{selectedEvent?.venue}, {selectedEvent?.city}</span>
            </div>
          </div>
        </div>

        {/* Passenger & Jersey Summary Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Data Peserta & Jersey ({passengers.length} Orang)
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Tervalidasi
            </span>
          </div>
          <div className="space-y-1.5">
            {passengers.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-50 border border-slate-100">
                <div>
                  <span className="font-bold text-slate-800">{p.name || `Penumpang ${i + 1}`}</span>
                  <span className="text-[10px] text-slate-400 block">{p.tierName || 'Tiket'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold bg-blue-100 text-kai-blue px-2 py-0.5 rounded-md">
                    Jersey: {p.jerseySize || 'M'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Itemized Price Calculation */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Rincian Biaya Transaksi
          </h3>

          <div className="space-y-2 text-xs">
            {/* Ticket Subtotal */}
            <div className="flex items-center justify-between text-slate-700">
              <div>
                <span className="font-medium">Subtotal Tiket Event</span>
                <div className="text-[10px] text-slate-400">
                  {ticketQuantity} tiket terkonfirmasi
                </div>
              </div>
              <span className="font-semibold">{formatIDR(calculations.basePrice)}</span>
            </div>

            {/* Numbered Seating Policy info */}
            <div className="flex items-center justify-between text-slate-700">
              <div>
                <span className="font-medium">Alokasi Tempat Duduk</span>
                <div className="text-[10px] text-slate-400">
                  Numbered Seating (Dikirimkan H-3 Acara)
                </div>
              </div>
              <span className="font-semibold text-emerald-600">Termasuk</span>
            </div>

            {/* Add-ons breakdown */}
            {calculations.regularAddonsPrice > 0 && (
              <div className="flex items-center justify-between text-slate-700">
                <div>
                  <span className="font-medium">Layanan Tambahan (F&B / Merchandise)</span>
                  <div className="text-[10px] text-slate-400">
                    {selectedAddOns.filter(id => !['addon-train', 'addon-rental', 'addon-hotel'].includes(id)).map(id => MOCK_ADDONS.find(a => a.id === id)?.name).join(', ')}
                  </div>
                </div>
                <span className="font-semibold">{formatIDR(calculations.regularAddonsPrice)}</span>
              </div>
            )}

            {/* Train Outbound transport if chosen */}
            {selectedTrain && (
              <div className="flex items-center justify-between text-slate-700">
                <div>
                  <span className="font-medium">Kereta Pergi: {selectedTrain.trainName}</span>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>{ticketQuantity} tiket</span>
                    <span className="text-red-600 font-bold bg-red-50 px-1 rounded">-5% Diskon</span>
                  </div>
                </div>
                <span className="font-semibold">{formatIDR(selectedTrain.discountedPrice * ticketQuantity)}</span>
              </div>
            )}

            {/* Train Return transport if chosen */}
            {selectedReturnTrain && (
              <div className="flex items-center justify-between text-slate-700">
                <div>
                  <span className="font-medium">Kereta Pulang: {selectedReturnTrain.trainName}</span>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span>{ticketQuantity} tiket (PP)</span>
                    <span className="text-red-600 font-bold bg-red-50 px-1 rounded">-5% Diskon</span>
                  </div>
                </div>
                <span className="font-semibold">{formatIDR(selectedReturnTrain.discountedPrice * ticketQuantity)}</span>
              </div>
            )}

            {/* Rental Voucher if chosen */}
            {selectedRental && (
              <div className="flex items-center justify-between text-slate-700">
                <div>
                  <span className="font-medium">Kupon Voucher Rental ({selectedRental.vehicleName})</span>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    Diskon Rp 100K • Serah terima di {selectedRental.pickupStation.split(' ')[1]}
                  </div>
                </div>
                <span className="font-semibold">{formatIDR(selectedRental.claimPrice || 50000)}</span>
              </div>
            )}

            {/* Hotel Direct Booking if chosen */}
            {selectedHotel && (
              <div className="flex items-center justify-between text-slate-700">
                <div>
                  <span className="font-medium">Hotel Mitra: {selectedHotel.hotelName}</span>
                  <div className="text-[10px] text-slate-400">
                    {selectedHotel.roomName} • {selectedHotel.nights} Malam
                  </div>
                </div>
                <span className="font-semibold">{formatIDR(selectedHotel.totalPrice)}</span>
              </div>
            )}

            {/* 11% Tax */}
            <div className="flex items-center justify-between text-slate-700 pt-1 border-t border-slate-100">
              <div>
                <span className="font-medium">Pajak Pertambahan Nilai (PPN 11%)</span>
                <div className="text-[10px] text-slate-400">Pajak resmi pemerintah</div>
              </div>
              <span className="font-semibold">{formatIDR(calculations.tax)}</span>
            </div>

            {/* Admin Fee: IDR 7,000 if <= IDR 110,000, or 3% if > IDR 110,000 */}
            <div className="flex items-center justify-between text-slate-700">
              <div>
                <span className="font-medium">Biaya Administrasi & Layanan</span>
                <div className="text-[10px] text-kai-blue font-bold">
                  {calculations.isOver110k
                    ? `${ticketQuantity} tiket × 3% (${formatIDR(calculations.adminFeePerTicket)} / tiket)`
                    : `${ticketQuantity} tiket × IDR 7.000 / tiket`}
                </div>
              </div>
              <span className="font-semibold">{formatIDR(calculations.adminFee)}</span>
            </div>

            {/* Grand Total */}
            <div className="pt-3 border-t-2 border-dashed border-slate-200 flex items-center justify-between font-extrabold text-slate-900 text-sm">
              <span>Total Pembayaran</span>
              <span className="text-kai-blue text-base">{formatIDR(calculations.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100">
            Metode Pembayaran
          </h3>

          <div className="space-y-2.5">
            {/* KAIPay (Primary Recommended) */}
            <div
              onClick={() => setPaymentMethod('kaipay')}
              className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                paymentMethod === 'kaipay'
                  ? 'border-kai-blue bg-blue-50/50 ring-2 ring-kai-blue/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-blue-500 to-orange-500 flex items-center justify-center text-white text-xs font-black shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>KAIPay</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">
                        Bebas Biaya
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Saldo: {formatIDR(USER_PROFILE.kaipayBalance)}
                    </div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'kaipay' ? 'border-kai-blue bg-kai-blue text-white' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'kaipay' && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>

            {/* Virtual Account */}
            <div
              onClick={() => setPaymentMethod('va')}
              className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                paymentMethod === 'va'
                  ? 'border-kai-blue bg-blue-50/50 ring-2 ring-kai-blue/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Building size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Virtual Account Bank</div>
                    <div className="text-[11px] text-slate-500">BCA, Mandiri, BNI, BRI</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'va' ? 'border-kai-blue bg-kai-blue text-white' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'va' && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              {/* Bank selector when VA is chosen */}
              {paymentMethod === 'va' && (
                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center gap-2">
                  {['BCA', 'Mandiri', 'BNI', 'BRI'].map(bank => (
                    <button
                      key={bank}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBank(bank);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        selectedBank === bank
                          ? 'bg-kai-blue text-white'
                          : 'bg-white border border-slate-200 text-slate-600'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* QRIS */}
            <div
              onClick={() => setPaymentMethod('qris')}
              className={`p-3 rounded-xl border transition-all cursor-pointer tap-active ${
                paymentMethod === 'qris'
                  ? 'border-kai-blue bg-blue-50/50 ring-2 ring-kai-blue/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">QRIS (GoPay, OVO, Dana)</div>
                    <div className="text-[11px] text-slate-500">Scan via aplikasi pembayaran apapun</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  paymentMethod === 'qris' ? 'border-kai-blue bg-kai-blue text-white' : 'border-slate-300'
                }`}>
                  {paymentMethod === 'qris' && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs py-1">
          <Lock size={13} />
          <span>Enkripsi 256-bit aman berstandar KAI Access</span>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 flex items-center justify-between shadow-lg">
        <div>
          <div className="text-[11px] text-slate-400 font-medium">Total Tagihan</div>
          <div className="text-base font-extrabold text-kai-blue">
            {formatIDR(calculations.totalPrice)}
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="bg-kai-blue hover:bg-kai-darkBlue text-white font-bold text-sm px-7 py-2.5 rounded-full shadow-md shadow-blue-500/25 tap-active flex items-center gap-2 min-w-[150px] justify-center transition-all disabled:opacity-80"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <span>Bayar Sekarang</span>
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
