import React from 'react';
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
  return (
    <BookingProvider>
      <MobileContainer>
        <ScreenRouter />
      </MobileContainer>
    </BookingProvider>
  );
}
