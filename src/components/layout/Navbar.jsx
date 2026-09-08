import React from 'react';
import { ArrowLeft, Home, Share2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar = ({ title, subtitle, showBack = true, stepNumber, totalSteps = 5, onBack }) => {
  const { currentStep, setCurrentStep } = useBooking();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    switch (currentStep) {
      case 'catalog':
        setCurrentStep('home');
        break;
      case 'detail':
        setCurrentStep('catalog');
        break;
      case 'tickets':
        setCurrentStep('detail');
        break;
      case 'passengers':
        setCurrentStep('tickets');
        break;
      case 'addons':
        setCurrentStep('passengers');
        break;
      case 'checkout':
        setCurrentStep('addons');
        break;
      case 'confirmation':
      case 'my-tickets':
        setCurrentStep('home');
        break;
      default:
        setCurrentStep('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 tap-active transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-base leading-tight">
                {title}
              </h1>
              {stepNumber && (
                <span className="bg-blue-50 text-kai-blue text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">
                  {stepNumber}/{totalSteps}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 line-clamp-1 max-w-[220px]">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentStep('home')}
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 tap-active transition-colors"
            title="Kembali ke Beranda"
          >
            <Home size={18} />
          </button>
        </div>
      </div>
      
      {/* Visual Step Indicator bar */}
      {stepNumber && (
        <div className="w-full bg-slate-100 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-kai-blue h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};
