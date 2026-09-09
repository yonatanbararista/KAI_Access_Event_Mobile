import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { MOCK_EVENTS, USER_PROFILE, MOCK_ADDONS, INITIAL_TICKETS_HISTORY, isSportOrRunningEvent } from '../data/mockData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  // Navigation / View State
  const [currentStep, setCurrentStep] = useState('home'); // 'home' | 'catalog' | 'detail' | 'tickets' | 'passengers' | 'addons' | 'checkout' | 'confirmation' | 'my-tickets'
  
  // Selection State
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0]);

  // Per-category ticket quantities: { [tierId]: number }
  const [ticketQuantities, setTicketQuantities] = useState(() => {
    const initial = {};
    if (MOCK_EVENTS[0]?.tickets) {
      MOCK_EVENTS[0].tickets.forEach((t, idx) => {
        initial[t.id] = idx === 0 ? 1 : 0;
      });
    }
    return initial;
  });

  // Derived total ticket count
  const ticketQuantity = useMemo(() => {
    return Object.values(ticketQuantities).reduce((sum, q) => sum + (Number(q) || 0), 0);
  }, [ticketQuantities]);

  // Primary selected ticket tier for backward compatibility
  const selectedTicket = useMemo(() => {
    if (!selectedEvent?.tickets) return null;
    const activeTierId = Object.keys(ticketQuantities).find(id => ticketQuantities[id] > 0);
    return selectedEvent.tickets.find(t => t.id === activeTierId) || selectedEvent.tickets[0];
  }, [selectedEvent, ticketQuantities]);

  // Passenger Form State
  const [useProfileData, setUseProfileData] = useState(false);
  const [passengers, setPassengers] = useState([
    {
      name: '',
      idType: 'KTP',
      idNumber: '',
      phone: '',
      email: '',
      address: '',
      tierId: MOCK_EVENTS[0]?.tickets[0]?.id || '',
      tierName: MOCK_EVENTS[0]?.tickets[0]?.name || '',
      tierPrice: MOCK_EVENTS[0]?.tickets[0]?.price || 0,
      jerseySize: 'M',
    }
  ]);

  // Synchronize passengers list dynamically based on chosen ticket categories
  useEffect(() => {
    if (!selectedEvent?.tickets) return;

    // Generate ordered slots for each ticket purchased
    const slots = [];
    selectedEvent.tickets.forEach(tier => {
      const qty = ticketQuantities[tier.id] || 0;
      for (let i = 0; i < qty; i++) {
        slots.push({
          tierId: tier.id,
          tierName: tier.name,
          tierPrice: tier.price
        });
      }
    });

    // If no tickets selected, at least keep 1 placeholder slot of first tier
    if (slots.length === 0 && selectedEvent.tickets.length > 0) {
      slots.push({
        tierId: selectedEvent.tickets[0].id,
        tierName: selectedEvent.tickets[0].name,
        tierPrice: selectedEvent.tickets[0].price
      });
    }

    setPassengers(prev => {
      return slots.map((slot, idx) => {
        const existing = prev[idx];
        const isFirstWithProfile = idx === 0 && useProfileData;

        return {
          name: isFirstWithProfile ? USER_PROFILE.name : (existing?.name || ''),
          idType: isFirstWithProfile ? USER_PROFILE.idType : (existing?.idType || 'KTP'),
          idNumber: isFirstWithProfile ? USER_PROFILE.idNumber : (existing?.idNumber || ''),
          phone: isFirstWithProfile ? USER_PROFILE.phone : (existing?.phone || ''),
          email: isFirstWithProfile ? USER_PROFILE.email : (existing?.email || ''),
          address: isFirstWithProfile ? USER_PROFILE.address : (existing?.address || ''),
          tierId: slot.tierId,
          tierName: slot.tierName,
          tierPrice: slot.tierPrice,
          jerseySize: existing?.jerseySize || 'M',
        };
      });
    });
  }, [ticketQuantities, selectedEvent, useProfileData]);

  // Standing/Festival Ticket check
  const isStandingTicket = useMemo(() => {
    const ticketName = selectedTicket?.name?.toLowerCase() || '';
    return ticketName.includes('standing') ||
           ticketName.includes('festival') ||
           selectedTicket?.id === 'tkt-fest';
  }, [selectedTicket]);

  // Running/Sport Event check
  const isSportOrRunning = useMemo(() => {
    return isSportOrRunningEvent(selectedEvent);
  }, [selectedEvent]);

  // Seat Selection State (kept for legacy references)
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Add-ons State
  const [selectedAddOns, setSelectedAddOns] = useState([]); // array of addon ids
  const [selectedTrain, setSelectedTrain] = useState(null); // outbound train schedule
  const [selectedReturnTrain, setSelectedReturnTrain] = useState(null); // return train schedule
  const [selectedRental, setSelectedRental] = useState(null); // { vehicle, category, station, voucherCode, price }
  const [selectedHotel, setSelectedHotel] = useState(null); // { hotel, room, nights, checkIn, checkOut, pricePerNight, totalPrice }

  const [trainSearchParams, setTrainSearchParams] = useState({
    origin: 'Gambir (GMR)',
    destination: 'Semarang Tawang (SMT)',
    departureDate: '2027-04-16',
    returnDate: '2027-04-18',
    isRoundTrip: false,
    adults: 1,
    children: 0,
    hasSearched: false
  });

  // Completed booking history (for My Tickets tab & dashboard)
  const [ticketsHistory, setTicketsHistory] = useState(INITIAL_TICKETS_HISTORY);
  const [latestBooking, setLatestBooking] = useState(null);

  // Active Bottom Nav Tab
  const [activeBottomNav, setActiveBottomNav] = useState('Home');

  // Calculations
  const calculations = useMemo(() => {
    let basePrice = 0;
    let totalAdminFee = 0;

    if (selectedEvent?.tickets) {
      selectedEvent.tickets.forEach(tier => {
        const qty = ticketQuantities[tier.id] || 0;
        if (qty > 0) {
          basePrice += tier.price * qty;
          const isOver110k = tier.price > 110000;
          const feePerTicket = isOver110k ? Math.round(tier.price * 0.03) : 7000;
          totalAdminFee += feePerTicket * qty;
        }
      });
    }

    const effectiveQty = Math.max(1, ticketQuantity);

    // Calculate regular addons (F&B, Shuttle, Merch)
    let regularAddonsPrice = 0;
    const specialAddonIds = ['addon-train', 'addon-rental', 'addon-hotel'];
    selectedAddOns.forEach(addonId => {
      if (!specialAddonIds.includes(addonId)) {
        const addon = MOCK_ADDONS.find(a => a.id === addonId);
        if (addon && addon.price) {
          regularAddonsPrice += addon.price * effectiveQty;
        }
      }
    });

    // 1. Train Price (Outbound + Return if selected, with 5% discount)
    let trainPrice = 0;
    const passengerCount = (trainSearchParams.adults || effectiveQty);
    if (selectedAddOns.includes('addon-train')) {
      if (selectedTrain) {
        trainPrice += selectedTrain.discountedPrice * passengerCount;
      }
      if (trainSearchParams.isRoundTrip) {
        if (selectedReturnTrain) {
          trainPrice += selectedReturnTrain.discountedPrice * passengerCount;
        } else if (selectedTrain) {
          // fallback if return train not yet picked
          trainPrice += selectedTrain.discountedPrice * passengerCount;
        }
      }
    }

    // 2. Rental Mobil / Motor Voucher Price (Rp 50.000)
    let rentalPrice = 0;
    if (selectedAddOns.includes('addon-rental')) {
      rentalPrice = 50000; // Flat voucher claim price
    }

    // 3. Hotel Direct Booking Price
    let hotelPrice = 0;
    if (selectedAddOns.includes('addon-hotel') && selectedHotel) {
      hotelPrice = selectedHotel.totalPrice || (selectedHotel.pricePerNight * (selectedHotel.nights || 1));
    }

    const totalAddOnPrice = regularAddonsPrice + trainPrice + rentalPrice + hotelPrice;
    const taxableAmount = basePrice + totalAddOnPrice;
    const tax = Math.round(taxableAmount * 0.11); // 11% Tax
    const totalPrice = basePrice + totalAddOnPrice + tax + totalAdminFee;

    return {
      basePrice,
      addOnPrice: totalAddOnPrice,
      regularAddonsPrice,
      trainPrice,
      rentalPrice,
      hotelPrice,
      tax,
      adminFee: totalAdminFee,
      totalPrice
    };
  }, [
    selectedEvent,
    ticketQuantities,
    ticketQuantity,
    selectedAddOns,
    selectedTrain,
    selectedReturnTrain,
    selectedRental,
    selectedHotel,
    trainSearchParams
  ]);

  // Stepper handlers per tier
  const incrementTier = (tierId) => {
    if (ticketQuantity >= 5) return;
    setTicketQuantities(prev => ({
      ...prev,
      [tierId]: (prev[tierId] || 0) + 1
    }));
  };

  const decrementTier = (tierId) => {
    if (!ticketQuantities[tierId] || ticketQuantities[tierId] <= 0) return;
    setTicketQuantities(prev => ({
      ...prev,
      [tierId]: Math.max(0, prev[tierId] - 1)
    }));
  };

  const setTierQuantity = (tierId, qty) => {
    const currentOthers = Object.keys(ticketQuantities)
      .filter(id => id !== tierId)
      .reduce((sum, id) => sum + (ticketQuantities[id] || 0), 0);
    const clamped = Math.max(0, Math.min(5 - currentOthers, qty));
    setTicketQuantities(prev => ({
      ...prev,
      [tierId]: clamped
    }));
  };

  // Helper actions
  const selectEvent = (event) => {
    setSelectedEvent(event);
    const initial = {};
    if (event.tickets) {
      event.tickets.forEach((t, idx) => {
        initial[t.id] = idx === 0 ? 1 : 0;
      });
    }
    setTicketQuantities(initial);
    setSelectedSeats([]);
    setSelectedAddOns([]);
    setSelectedTrain(null);
    setTrainSearchParams(prev => ({
      ...prev,
      destination: event.city.includes('Semarang') ? 'Semarang Tawang (SMT)' :
                   event.city.includes('Yogya') ? 'Yogyakarta (YK)' :
                   event.city.includes('Bandung') ? 'Bandung (BD)' : 'Gambir (GMR)',
      hasSearched: false
    }));
    setCurrentStep('detail');
  };

  const setSelectedTicketDirect = (tier) => {
    setTicketQuantities(prev => ({
      ...prev,
      [tier.id]: prev[tier.id] && prev[tier.id] > 0 ? prev[tier.id] : 1
    }));
  };

  const toggleAddOn = (addonId) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addonId)) {
        if (addonId === 'addon-train') {
          setSelectedTrain(null);
          setSelectedReturnTrain(null);
        } else if (addonId === 'addon-rental') {
          setSelectedRental(null);
        } else if (addonId === 'addon-hotel') {
          setSelectedHotel(null);
        }
        return prev.filter(id => id !== addonId);
      } else {
        return [...prev, addonId];
      }
    });
  };

  const updatePassenger = (index, field, value) => {
    setPassengers(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const completeCheckout = (paymentMethod = 'KAIPay') => {
    const bookingRef = `KAI-EVT-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Categorize tickets bought
    const purchasedTiersList = selectedEvent.tickets
      ?.filter(t => (ticketQuantities[t.id] || 0) > 0)
      ?.map(t => `${ticketQuantities[t.id]}x ${t.name}`)
      ?.join(', ') || 'Reguler';

    const newTicket = {
      id: bookingRef,
      eventTitle: selectedEvent.title,
      category: selectedEvent.category,
      date: selectedEvent.date,
      time: selectedEvent.time,
      venue: selectedEvent.venue,
      city: selectedEvent.city,
      passengerName: passengers[0]?.name || USER_PROFILE.name,
      allPassengers: passengers,
      isSportOrRunning,
      ticketType: purchasedTiersList,
      seatNumber: 'Numbered Seating (Dikirimkan H-3 via WhatsApp & Email)',
      quantity: Math.max(1, ticketQuantity),
      totalPrice: calculations.totalPrice,
      selectedAddOns: selectedAddOns.map(id => MOCK_ADDONS.find(a => a.id === id)?.name).filter(Boolean),
      selectedTrain,
      selectedReturnTrain,
      selectedRental,
      selectedHotel,
      status: 'Upcoming',
      qrCode: bookingRef,
      purchaseDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      paymentMethod
    };

    setLatestBooking(newTicket);
    setTicketsHistory(prev => [newTicket, ...prev]);
    setCurrentStep('confirmation');
  };

  const resetBooking = () => {
    setSelectedEvent(MOCK_EVENTS[0]);
    const initial = {};
    if (MOCK_EVENTS[0]?.tickets) {
      MOCK_EVENTS[0].tickets.forEach((t, idx) => {
        initial[t.id] = idx === 0 ? 1 : 0;
      });
    }
    setTicketQuantities(initial);
    setSelectedSeats([]);
    setSelectedAddOns([]);
    setSelectedTrain(null);
    setSelectedReturnTrain(null);
    setSelectedRental(null);
    setSelectedHotel(null);
    setUseProfileData(false);
    setPassengers([{
      name: '',
      idType: 'KTP',
      idNumber: '',
      phone: '',
      email: '',
      address: '',
      tierId: MOCK_EVENTS[0]?.tickets[0]?.id || '',
      tierName: MOCK_EVENTS[0]?.tickets[0]?.name || '',
      tierPrice: MOCK_EVENTS[0]?.tickets[0]?.price || 0,
      jerseySize: 'M'
    }]);
    setCurrentStep('catalog');
  };

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        activeBottomNav,
        setActiveBottomNav,
        selectedEvent,
        setSelectedEvent,
        selectEvent,
        selectedTicket,
        setSelectedTicket: setSelectedTicketDirect,
        ticketQuantities,
        setTierQuantity,
        incrementTier,
        decrementTier,
        ticketQuantity,
        isStandingTicket,
        isSportOrRunning,
        USER_PROFILE,
        useProfileData,
        setUseProfileData,
        passengers,
        updatePassenger,
        selectedSeats,
        selectedAddOns,
        setSelectedAddOns,
        toggleAddOn,
        selectedTrain,
        setSelectedTrain,
        selectedReturnTrain,
        setSelectedReturnTrain,
        selectedRental,
        setSelectedRental,
        selectedHotel,
        setSelectedHotel,
        trainSearchParams,
        setTrainSearchParams,
        calculations,
        ticketsHistory,
        latestBooking,
        completeCheckout,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
