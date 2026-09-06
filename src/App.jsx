import React, { useState, useEffect } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { HomePage } from './pages/HomePage';
import { EventCatalogPage } from './pages/EventCatalogPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { TicketSelectionPage } from './pages/TicketSelectionPage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { AddOnsPage } from './pages/AddOnsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TicketConfirmationPage } from './pages/TicketConfirmationPage';
import { DashboardPage } from './pages/DashboardPage';

// Import B2B Partner Portal
import { PartnerPortalApp } from '../partner-portal/src/PartnerPortalApp';

import { Smartphone } from 'lucide-react';

const ScreenRouter = () => {
  const { currentStep } = useBooking();

  switch (currentStep) {
    case 'home':
      return <HomePage />;
    case 'catalog':
      return <EventCatalogPage />;
    case 'detail':
      return <EventDetailPage />;
    case 'tickets':
      return <TicketSelectionPage />;
    case 'passengers':
      return <PassengerFormPage />;
    case 'seats':
      return <SeatSelectionPage />;
    case 'addons':
      return <AddOnsPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'confirmation':
      return <TicketConfirmationPage />;
    case 'my-tickets':
      return <DashboardPage />;
    default:
      return <HomePage />;
  }
};

export default function App() {
  const [activeApp, setActiveApp] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.includes('mobile') || search.includes('app=mobile')) {
        return 'mobile';
      }
    }
    return 'portal'; // Default to B2B Partner Portal
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('mobile')) {
        setActiveApp('mobile');
      } else {
        setActiveApp('portal');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const switchApp = (target) => {
    setActiveApp(target);
    if (typeof window !== 'undefined') {
      if (target === 'mobile') {
        window.history.pushState({ app: 'mobile' }, '', '#mobile');
      } else {
        window.history.pushState({ app: 'portal' }, '', '#portal');
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Active App Renderer */}
      {activeApp === 'portal' ? (
        <PartnerPortalApp onSwitchToConsumer={() => switchApp('mobile')} />
      ) : (
        <BookingProvider>
          <MobileContainer>
            <ScreenRouter />
          </MobileContainer>
        </BookingProvider>
      )}

      {/* Switch only appears on B2B view; completely disabled on consumer view */}
      {activeApp === 'portal' && (
        <div className="fixed bottom-4 right-4 z-50 select-none animate-fadeIn">
          <button
            onClick={() => switchApp('mobile')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs bg-slate-900/95 hover:bg-slate-900 text-white shadow-2xl border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105"
            title="Buka Tampilan Consumer App (Mobile)"
          >
            <Smartphone className="w-4 h-4 text-kai-orange" />
            <span>Switch to Consumer View</span>
          </button>
        </div>
      )}
    </div>
  );
}
