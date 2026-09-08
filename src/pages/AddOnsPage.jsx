import React, { useState } from 'react';
import { 
  Utensils, 
  Bus, 
  ShoppingBag, 
  Train, 
  Car, 
  Building2, 
  Check, 
  Sparkles, 
  Star, 
  MapPin, 
  Tag, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  Fuel,
  Users
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BookingSummarySidebar } from '../components/booking/BookingSummarySidebar';
import { TrainScheduleSelector } from '../components/addons/TrainScheduleSelector';
import { useBooking } from '../context/BookingContext';
import { MOCK_ADDONS, MOCK_RENTAL_VEHICLES, MOCK_HOTELS } from '../data/mockData';

export const AddOnsPage = () => {
  const {
    selectedEvent,
    selectedAddOns,
    toggleAddOn,
    selectedTrain,
    selectedReturnTrain,
    selectedRental,
    setSelectedRental,
    selectedHotel,
    setSelectedHotel,
    ticketQuantity,
    setCurrentStep
  } = useBooking();

  // Local state for Rental selection
  const [rentalCategory, setRentalCategory] = useState('Mobil');
  const [selectedVehicle, setSelectedVehicle] = useState(MOCK_RENTAL_VEHICLES[0]);
  const [pickupStation, setPickupStation] = useState('Stasiun Semarang Tawang (SMT)');

  // Local state for Hotel selection
  const [selectedHotelOption, setSelectedHotelOption] = useState(MOCK_HOTELS[0]);
  const [selectedRoom, setSelectedRoom] = useState(MOCK_HOTELS[0]?.rooms[0]);
  const [hotelNights, setHotelNights] = useState(1);

  const formatIDR = (num) => `IDR ${Number(num || 0).toLocaleString('id-ID')}`;

  const getAddonIcon = (id) => {
    switch (id) {
      case 'addon-train':
        return Train;
      case 'addon-rental':
        return Car;
      case 'addon-hotel':
        return Building2;
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

  // Filter rental vehicles by category
  const filteredVehicles = MOCK_RENTAL_VEHICLES.filter(v => v.category === rentalCategory);

  // Claim Rental Voucher
  const handleClaimRentalVoucher = (vehicle) => {
    const rentalData = {
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      category: vehicle.category,
      partner: vehicle.partner,
      pickupStation: pickupStation,
      voucherCode: 'KAI-RENTAL-50K',
      discountValue: 'Rp 100.000 Diskon Sewa',
      claimPrice: 50000
    };
    setSelectedRental(rentalData);
  };

  // Confirm Hotel Direct Booking
  const handleConfirmHotel = () => {
    const hotelData = {
      hotelId: selectedHotelOption.id,
      hotelName: selectedHotelOption.name,
      roomName: selectedRoom.name,
      pricePerNight: selectedRoom.price,
      nights: hotelNights,
      totalPrice: selectedRoom.price * hotelNights,
      stars: selectedHotelOption.stars,
      address: selectedHotelOption.address
    };
    setSelectedHotel(hotelData);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-4">
      <Navbar
        title="Layanan Tambahan (Add-ons)"
        subtitle={selectedEvent?.title}
        stepNumber={3}
        totalSteps={5}
        showBack={true}
        onBack={() => setCurrentStep('passengers')}
      />

      <div className="p-4 space-y-4 flex-1">
        {/* Ambient Hero Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl p-3.5 text-white shadow-xs">
          <div className="font-bold text-xs flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-300" />
            <span>Maksimalkan Pengalaman Event Anda</span>
          </div>
          <p className="text-[11px] text-white/90 mt-1">
            Lengkapi kunjungan dengan tiket kereta diskon 5%, voucher sewa mobil/motor 50K, hotel mitra langsung, dan kuliner LokoCafe.
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
                {/* Header Card */}
                <div
                  onClick={() => toggleAddOn(addon.id)}
                  className="flex items-start justify-between cursor-pointer tap-active"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-kai-blue text-white shadow-xs' : 'bg-slate-100 text-slate-600'
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

                      {/* Price indicator */}
                      {addon.price && (
                        <div className="text-xs font-extrabold text-kai-blue mt-1">
                          {formatIDR(addon.price)} 
                          <span className="text-[10px] text-slate-400 font-normal">
                            {addon.id === 'addon-rental' ? ' / klaim voucher' : ' / orang'}
                          </span>
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

                {/* 1. TRAIN ADDON EXPANDED SELECTOR */}
                {addon.isTrainSpecial && isSelected && (
                  <TrainScheduleSelector />
                )}

                {/* 2. CAR / MOTOR RENTAL EXPANDED SELECTOR */}
                {addon.isRentalSpecial && isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-in fade-in">
                    {/* Header Info */}
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Tag size={14} className="text-amber-600" />
                        <span>Kupon Voucher Diskon Rental Senilai Rp 100.000</span>
                      </div>
                      <p className="text-[10px] text-amber-800 leading-relaxed">
                        Klaim voucher seharga <strong>Rp 50.000</strong>. Tunjukkan voucher e-tiket saat tiba di stasiun kedatangan dan unit mobil/motor siap pakai langsung diserahterimakan di lobby stasiun.
                      </p>
                    </div>

                    {/* Stasiun Serah Terima Unit */}
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">
                        Stasiun Serah Terima Unit (Kedatangan)
                      </label>
                      <select
                        value={pickupStation}
                        onChange={(e) => setPickupStation(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
                      >
                        <option value="Stasiun Semarang Tawang (SMT)">Stasiun Semarang Tawang (SMT)</option>
                        <option value="Stasiun Semarang Poncol (SMC)">Stasiun Semarang Poncol (SMC)</option>
                        <option value="Stasiun Yogyakarta (YK)">Stasiun Yogyakarta (YK)</option>
                        <option value="Stasiun Solo Balapan (SLO)">Stasiun Solo Balapan (SLO)</option>
                        <option value="Stasiun Gambir (GMR)">Stasiun Gambir (GMR)</option>
                      </select>
                    </div>

                    {/* Category Tabs (Mobil vs Motor) */}
                    <div className="flex rounded-xl bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRentalCategory('Mobil');
                          setSelectedVehicle(MOCK_RENTAL_VEHICLES.find(v => v.category === 'Mobil'));
                        }}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                          rentalCategory === 'Mobil'
                            ? 'bg-white text-kai-blue shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Car size={13} />
                        <span>Sewa Mobil (Car)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRentalCategory('Motor');
                          setSelectedVehicle(MOCK_RENTAL_VEHICLES.find(v => v.category === 'Motor'));
                        }}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                          rentalCategory === 'Motor'
                            ? 'bg-white text-kai-blue shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>🏍️</span>
                        <span>Sewa Motor</span>
                      </button>
                    </div>

                    {/* Vehicle List */}
                    <div className="space-y-2">
                      {filteredVehicles.map(vehicle => {
                        const isClaimed = selectedRental?.vehicleId === vehicle.id;

                        return (
                          <div
                            key={vehicle.id}
                            className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                              isClaimed ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/20' : 'bg-slate-50/70 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-14 h-12 rounded-lg object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-xs text-slate-900">{vehicle.name}</div>
                                <div className="text-[10px] text-slate-500">{vehicle.transmission} • {vehicle.seats}</div>
                                <div className="text-[9px] text-emerald-700 font-bold mt-0.5">{vehicle.partner}</div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleClaimRentalVoucher(vehicle)}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg tap-active transition-all ${
                                isClaimed
                                  ? 'bg-emerald-600 text-white shadow-xs flex items-center gap-1'
                                  : 'bg-kai-blue hover:bg-blue-700 text-white shadow-xs'
                              }`}
                            >
                              {isClaimed ? (
                                <>
                                  <Check size={12} strokeWidth={3} />
                                  <span>Kupon Terklaim</span>
                                </>
                              ) : (
                                <span>Klaim Rp 50K</span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Voucher Notification */}
                    {selectedRental && (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2 text-xs flex items-center justify-between text-emerald-900">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold block">Voucher {selectedRental.vehicleName} Aktif</span>
                            <span className="text-[10px] text-slate-500">Serah terima di {selectedRental.pickupStation}</span>
                          </div>
                        </div>
                        <span className="font-black text-emerald-700 text-xs">Rp 50.000</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. HOTEL AFILIASI KAI DIRECT BOOKING SELECTOR */}
                {addon.isHotelSpecial && isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-3 animate-in fade-in">
                    <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-2.5 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                        <Building2 size={14} className="text-indigo-600" />
                        <span>Pemesanan Langsung Hotel Mitra Resmi KAI</span>
                      </div>
                      <p className="text-[10px] text-indigo-800 leading-relaxed">
                        Reservasi kamar langsung terhubung dengan tiket perjalanan Anda. Tarif kemitraan khusus peserta event & penumpang kereta KAI.
                      </p>
                    </div>

                    {/* Choose Hotel Cards */}
                    <div className="space-y-2">
                      {MOCK_HOTELS.map(hotel => {
                        const isChosenHotel = selectedHotelOption.id === hotel.id;

                        return (
                          <div
                            key={hotel.id}
                            onClick={() => {
                              setSelectedHotelOption(hotel);
                              setSelectedRoom(hotel.rooms[0]);
                            }}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer tap-active ${
                              isChosenHotel
                                ? 'bg-white border-kai-blue shadow-xs ring-2 ring-kai-blue/20'
                                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex gap-2.5">
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-16 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-bold text-xs text-slate-900 truncate">{hotel.name}</h4>
                                  <div className="flex items-center text-[10px] text-amber-500 font-bold shrink-0 ml-1">
                                    <Star size={11} className="fill-amber-400 mr-0.5" />
                                    <span>{hotel.rating}</span>
                                  </div>
                                </div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} className="text-slate-400 shrink-0" />
                                  <span className="truncate">{hotel.distanceVenue} • {hotel.distanceStation}</span>
                                </div>
                                <div className="text-[10px] font-bold text-kai-blue mt-1">
                                  Mulai {formatIDR(hotel.rooms[0]?.price)} / malam
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Room & Nights Configuration for Selected Hotel */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
                        <span>Pilihan Kamar: {selectedHotelOption.name}</span>
                        <span className="text-[10px] font-normal text-slate-500">{selectedHotelOption.stars} Bintang</span>
                      </div>

                      {/* Room options */}
                      <div className="space-y-1.5">
                        {selectedHotelOption.rooms.map(room => (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                            className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                              selectedRoom?.id === room.id
                                ? 'bg-white border-kai-blue font-bold text-kai-blue shadow-2xs'
                                : 'bg-white/60 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div>
                              <div>{room.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{room.bed} • Max {room.maxGuests} Tamu</div>
                            </div>
                            <span className="font-extrabold">{formatIDR(room.price)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Nights Stepper */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                        <span className="font-medium text-slate-600">Durasi Menginap:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setHotelNights(prev => Math.max(1, prev - 1))}
                            className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="font-extrabold text-slate-800">{hotelNights} Malam</span>
                          <button
                            type="button"
                            onClick={() => setHotelNights(prev => prev + 1)}
                            className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Direct Booking Action Button */}
                      <button
                        type="button"
                        onClick={handleConfirmHotel}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all tap-active flex items-center justify-center gap-1.5 ${
                          selectedHotel?.hotelId === selectedHotelOption.id && selectedHotel?.roomName === selectedRoom?.name
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-kai-blue hover:bg-blue-700 text-white shadow-xs'
                        }`}
                      >
                        {selectedHotel?.hotelId === selectedHotelOption.id && selectedHotel?.roomName === selectedRoom?.name ? (
                          <>
                            <Check size={14} strokeWidth={3} />
                            <span>Kamar Terpesan Langsung ({formatIDR(selectedRoom.price * hotelNights)})</span>
                          </>
                        ) : (
                          <span>Pesan Langsung Kamar Ini ({formatIDR(selectedRoom.price * hotelNights)})</span>
                        )}
                      </button>
                    </div>

                    {/* Selected Hotel Card Notification */}
                    {selectedHotel && (
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs flex items-center justify-between text-emerald-900">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold block">{selectedHotel.hotelName}</span>
                            <span className="text-[10px] text-slate-500">{selectedHotel.roomName} ({selectedHotel.nights} Malam)</span>
                          </div>
                        </div>
                        <span className="font-black text-emerald-700 text-xs">
                          {formatIDR(selectedHotel.totalPrice)}
                        </span>
                      </div>
                    )}
                  </div>
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
