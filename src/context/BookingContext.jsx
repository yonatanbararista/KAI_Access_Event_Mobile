import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { MOCK_EVENTS, USER_PROFILE, MOCK_ADDONS, INITIAL_TICKETS_HISTORY } from '../data/mockData';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  // Navigation / View State
  const [currentStep, setCurrentStep] = useState('home'); // 'home' | 'catalog' | 'detail' | 'tickets' | 'passengers' | 'seats' | 'addons' | 'checkout' | 'confirmation' | 'my-tickets'
  
  // Selection State
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0]);
  const [selectedTicket, setSelectedTicket] = useState(MOCK_EVENTS[0].tickets[0]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  
  // Passenger Form State
  const [useProfileData, setUseProfileData] = useState(false);
  const [passengers, setPassengers] = useState([
    {
      name: '',
      idType: 'KTP',
      idNumber: '',
      phone: '',
      email: '',
    }
  ]);

  // Synchronize passengers array size with ticketQuantity
  useEffect(() => {
    setPassengers(prev => {
      const updated = [...prev];
      if (ticketQuantity > prev.length) {
        for (let i = prev.length; i < ticketQuantity; i++) {
          updated.push({
            name: '',
            idType: 'KTP',
            idNumber: '',
            phone: '',
            email: '',
          });
        }
      } else if (ticketQuantity < prev.length) {
        return updated.slice(0, ticketQuantity);
      }
      return updated;
    });
  }, [ticketQuantity]);

  // Autofill effect when useProfileData changes
  useEffect(() => {
    if (useProfileData) {
      setPassengers(prev => {
        const next = [...prev];
        next[0] = {
          name: USER_PROFILE.name,
          idType: USER_PROFILE.idType,
          idNumber: USER_PROFILE.idNumber,
          phone: USER_PROFILE.phone,
          email: USER_PROFILE.email,
        };
        return next;
      });
    }
  }, [useProfileData]);

  // Seat Selection State
  const [selectedSeats, setSelectedSeats] = useState(['A3']);

  // Adjust selected seats when ticketQuantity changes
  useEffect(() => {
    if (selectedSeats.length > ticketQuantity) {
      setSelectedSeats(prev => prev.slice(0, ticketQuantity));
    }
  }, [ticketQuantity, selectedSeats.length]);

  // Add-ons State
  const [selectedAddOns, setSelectedAddOns] = useState([]); // array of addon ids
  const [selectedTrain, setSelectedTrain] = useState(null); // train schedule object
  const [trainSearchParams, setTrainSearchParams] = useState({
    origin: 'Gambir (GMR)',
    destination: 'Yogyakarta (YK)',
    date: '2026-07-24',
    passengers: 1
  });

  // Completed booking history (for My Tickets tab & dashboard)
  const [ticketsHistory, setTicketsHistory] = useState(INITIAL_TICKETS_HISTORY);
  const [latestBooking, setLatestBooking] = useState(null);

  // Active Bottom Nav Tab
  const [activeBottomNav, setActiveBottomNav] = useState('Home'); // 'Home' | 'Train' | 'My Tickets' | 'Promotion' | 'Account'

  // Calculations
  const calculations = useMemo(() => {
    const basePrice = selectedTicket ? selectedTicket.price * ticketQuantity : 0;
    const seatPrice = 0; // Seat selection included in event ticket tier

    // Calculate non-train addons
    let addOnsPrice = 0;
    selectedAddOns.forEach(addonId => {
      const addon = MOCK_ADDONS.find(a => a.id === addonId);
      if (addon && addon.price) {
        addOnsPrice += addon.price * ticketQuantity;
      }
    });

    // Add train price if selected (with 5% discount)
    let trainPrice = 0;
    if (selectedAddOns.includes('addon-train') && selectedTrain) {
      trainPrice = selectedTrain.discountedPrice * ticketQuantity;
    }

    const totalAddOnPrice = addOnsPrice + trainPrice;
    const taxableAmount = basePrice + totalAddOnPrice;
    const tax = Math.round(taxableAmount * 0.11); // 11% Tax
    
    // Admin fee calculation:
    // IDR 7,000 if ticket price <= IDR 110,000, or 3% of ticket price if > IDR 110,000
    const ticketPrice = selectedTicket ? selectedTicket.price : 0;
    const isOver110k = ticketPrice > 110000;
    const adminFeePerTicket = isOver110k ? Math.round(ticketPrice * 0.03) : 7000;
    const adminFee = adminFeePerTicket * ticketQuantity;

    const totalPrice = basePrice + seatPrice + totalAddOnPrice + tax + adminFee;

    return {
      basePrice,
      seatPrice,
      addOnPrice: totalAddOnPrice,
      regularAddonsPrice: addOnsPrice,
      trainPrice,
      tax,
      adminFee,
      adminFeePerTicket,
      isOver110k,
      totalPrice
    };
  }, [selectedTicket, ticketQuantity, selectedAddOns, selectedTrain]);

  // Helper actions
  const selectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedTicket(event.tickets[0] || null);
    setSelectedSeats(['A3']);
    setSelectedAddOns([]);
    setSelectedTrain(null);
    setCurrentStep('detail');
  };

  const toggleAddOn = (addonId) => {
    setSelectedAddOns(prev => {
      if (prev.includes(addonId)) {
        if (addonId === 'addon-train') {
          setSelectedTrain(null);
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
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }
      if (prev.length < ticketQuantity) {
        return [...prev, seatId].sort();
      } else {
        // Replace last chosen seat if at capacity
        const next = [...prev.slice(0, ticketQuantity - 1), seatId];
        return next.sort();
      }
    });
  };

  const completeCheckout = (paymentMethod = 'KAIPay') => {
    const bookingRef = `KAI-EVT-${Math.floor(10000 + Math.random() * 90000)}`;
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
      ticketType: selectedTicket?.name || 'Reguler',
      seatNumber: selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Free Standing',
      quantity: ticketQuantity,
      totalPrice: calculations.totalPrice,
      selectedAddOns: selectedAddOns.map(id => MOCK_ADDONS.find(a => a.id === id)?.name).filter(Boolean),
      selectedTrain: selectedTrain,
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
    setSelectedTicket(MOCK_EVENTS[0].tickets[0]);
    setTicketQuantity(1);
    setSelectedSeats(['A3']);
    setSelectedAddOns([]);
    setSelectedTrain(null);
    setUseProfileData(false);
    setPassengers([{ name: '', idType: 'KTP', idNumber: '', phone: '', email: '' }]);
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
        setSelectedTicket,
        ticketQuantity,
        setTicketQuantity,
        useProfileData,
        setUseProfileData,
        passengers,
        updatePassenger,
        selectedSeats,
        toggleSeat,
        selectedAddOns,
        toggleAddOn,
        selectedTrain,
        setSelectedTrain,
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
