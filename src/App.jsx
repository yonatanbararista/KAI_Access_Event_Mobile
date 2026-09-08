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

// Error Boundary to prevent full application white-screen crash
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 text-2xl font-bold">
            ⚠️
          </div>
          <h1 className="text-xl font-bold mb-2">Terjadi Kendala Memuat Tampilan</h1>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            {this.state.error?.message || 'Gagal memuat komponen aplikasi.'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-kai-blue hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg cursor-pointer"
            >
              Muat Ulang (Reload)
            </button>
            <a
              href="#portal"
              onClick={() => {
                this.setState({ hasError: false, error: null });
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-colors border border-slate-700 cursor-pointer"
            >
              Buka Portal B2B
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeApp, setActiveApp] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('mobile') || search.includes('app=mobile') || path.includes('mobile')) {
        return 'mobile';
      }
    }
    return 'portal'; // Default to B2B Partner Portal
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('mobile') || search.includes('app=mobile') || path.includes('mobile')) {
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
