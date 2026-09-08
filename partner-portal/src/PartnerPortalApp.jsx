import React from 'react';
import { PartnerPortalProvider, usePartnerPortal } from './context/PartnerPortalContext';
import { PortalLayout } from './components/layout/PortalLayout';

// Pages
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AllEventsPage } from './pages/Events/AllEventsPage';
import { CreateEventPage } from './pages/Events/CreateEventPage';
import { EventDetailPage } from './pages/Events/EventDetailPage';
import { TicketTypesPage } from './pages/Tickets/TicketTypesPage';
import { QuotaPricingPage } from './pages/Tickets/QuotaPricingPage';
import { SeatingPage } from './pages/Tickets/SeatingPage';
import { PromoCodesPage } from './pages/Tickets/PromoCodesPage';
import { AddOnsManagementPage } from './pages/Tickets/AddOnsManagementPage';
import { OrdersPage } from './pages/Sales/OrdersPage';
import { AttendeesPage } from './pages/Sales/AttendeesPage';
import { CheckInPage } from './pages/CheckIn/CheckInPage';
import { FinanceDashboardPage } from './pages/Finance/FinanceDashboardPage';
import { PayoutPage } from './pages/Finance/PayoutPage';
import { SalesReportPage } from './pages/Reports/SalesReportPage';
import { ReconciliationPage } from './pages/Reports/ReconciliationPage';
import { FinalReportPage } from './pages/Reports/FinalReportPage';
import { OrgProfilePage } from './pages/Organization/OrgProfilePage';
import { BankAccountPage } from './pages/Organization/BankAccountPage';
import { TeamManagementPage } from './pages/Organization/TeamManagementPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

function PortalRouter() {
  const { currentNav } = usePartnerPortal();

  switch (currentNav) {
    case 'dashboard':
      return <DashboardPage />;
    case 'events-all':
      return <AllEventsPage />;
    case 'events-detail':
      return <EventDetailPage />;
    case 'events-create':
      return <CreateEventPage />;
    case 'tickets-types':
      return <TicketTypesPage />;
    case 'tickets-quota':
      return <QuotaPricingPage />;
    case 'tickets-seating':
      return <SeatingPage />;
    case 'tickets-promo':
      return <PromoCodesPage />;
    case 'tickets-addons':
      return <AddOnsManagementPage />;
    case 'sales-orders':
      return <OrdersPage />;
    case 'sales-attendees':
      return <AttendeesPage />;
    case 'ops-checkin':
      return <CheckInPage />;
    case 'finance-revenue':
      return <FinanceDashboardPage />;
    case 'finance-payout':
      return <PayoutPage />;
    case 'reports-sales':
      return <SalesReportPage />;
    case 'reports-recon':
      return <ReconciliationPage />;
    case 'reports-final':
      return <FinalReportPage />;
    case 'org-profile':
      return <OrgProfilePage />;
    case 'org-bank':
      return <BankAccountPage />;
    case 'org-team':
      return <TeamManagementPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
}

export function PartnerPortalApp({ onSwitchToConsumer }) {
  return (
    <PartnerPortalProvider>
      <PortalLayout onSwitchToConsumer={onSwitchToConsumer}>
        <PortalRouter />
      </PortalLayout>
    </PartnerPortalProvider>
  );
}

export default PartnerPortalApp;
