import React, { useState } from 'react';
import { Home, Train, Ticket, Tag, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BottomNavigation = () => {
  const { currentStep, setCurrentStep, activeBottomNav, setActiveBottomNav, ticketsHistory } = useBooking();
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const navItems = [
    {
      id: 'Home',
      label: 'Home',
      icon: Home,
      action: () => {
        setActiveBottomNav('Home');
        setCurrentStep('home');
      }
    },
    {
      id: 'Train',
      label: 'Train',
      icon: Train,
      action: () => {
        showToast('Fitur Kereta Reguler adalah placeholder. Buka "Event" untuk alur pemesanan event!');
      }
    },
    {
      id: 'My Tickets',
      label: 'My Tickets',
      icon: Ticket,
      badge: ticketsHistory.length > 0 ? ticketsHistory.length : null,
      action: () => {
        setActiveBottomNav('My Tickets');
        setCurrentStep('my-tickets');
      }
    },
    {
      id: 'Promotion',
      label: 'Promotion',
      icon: Tag,
      action: () => {
        showToast('Halaman Promo adalah placeholder. Nikmati promo 5% di pemesanan event!');
      }
    },
    {
      id: 'Account',
      label: 'Account',
      icon: User,
      action: () => {
        showToast('Akun terhubung: Yonatan Kristian (Premium Member)');
      }
    }
  ];

  // Determine active tab
  const isHomeActive = currentStep === 'home' || currentStep === 'catalog';
  const isTicketsActive = currentStep === 'my-tickets';

  return (
    <>
      {/* Toast alert for placeholder elements */}
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-lg text-center max-w-[320px] animate-bounce">
          {toastMsg}
        </div>
      )}

      <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive =
            (item.id === 'Home' && isHomeActive) ||
            (item.id === 'My Tickets' && isTicketsActive);

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-3 relative tap-active transition-all ${
                isActive ? 'text-kai-blue font-bold' : 'text-slate-500 hover:text-slate-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.75}
                  className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-kai-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
