import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Mail, 
  ChevronDown, 
  QrCode, 
  Wallet, 
  History, 
  Train, 
  Sparkles, 
  Ticket, 
  Building2, 
  Car, 
  CreditCard, 
  LayoutGrid, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import { IosStatusBar } from '../components/layout/IosStatusBar';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { useBooking } from '../context/BookingContext';

export const HomePage = () => {
  const { setCurrentStep, USER_PROFILE } = useBooking();
  const [toastMsg, setToastMsg] = useState(null);

  const showPlaceholderToast = (name) => {
    setToastMsg(`${name} adalah placeholder prototipe. Tekan "Event" untuk alur pemesanan event!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 relative pb-20 select-none">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg text-center max-w-[320px] animate-fade-in border border-slate-700">
          {toastMsg}
        </div>
      )}

      {/* HEADER SECTION WITH PURPLE GRADIENT & SKYLINE */}
      <div className="relative bg-gradient-to-b from-[#251978] via-[#3d26a2] to-[#5536b8] pt-1 pb-16 px-4 text-white overflow-hidden">
        {/* Architectural City Skyline Silhouette Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-end">
          <svg viewBox="0 0 400 120" className="w-full h-28 object-cover text-indigo-950 fill-current" preserveAspectRatio="none">
            {/* Skyline silhouettes with Monas-like obelisk and cathedral spires */}
            <path d="M0,120 L0,70 L20,70 L20,120 L40,120 L40,85 L50,85 L55,40 L60,85 L70,85 L70,120 L90,120 L90,60 L110,60 L110,120 L130,120 L130,95 L145,95 L150,15 L155,95 L170,95 L170,120 L200,120 L200,80 L210,80 L220,120 L240,120 L240,55 L260,55 L260,120 L290,120 L290,75 L300,75 L305,25 L310,75 L320,75 L320,120 L350,120 L350,90 L380,90 L380,120 L400,120 Z" />
          </svg>
        </div>

        {/* iOS Status Bar in light mode */}
        <IosStatusBar light={true} />

        {/* User Greeting & Header Actions Bar */}
        <div className="flex items-center justify-between mt-3 relative z-10">
          <div>
            <div className="text-xs text-white/80 font-normal">Good Night</div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-1">
              <span>YONATAN KRISTIAN ...</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Shopping Cart button */}
            <button
              onClick={() => showPlaceholderToast('Keranjang')}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white tap-active transition-colors"
              aria-label="Keranjang"
            >
              <ShoppingCart size={16} />
            </button>

            {/* Messages / Mail button */}
            <button
              onClick={() => showPlaceholderToast('Pesan Masuk')}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white tap-active transition-colors"
              aria-label="Pesan"
            >
              <Mail size={16} />
            </button>

            {/* Language Pill */}
            <button
              onClick={() => showPlaceholderToast('Pilihan Bahasa')}
              className="h-9 px-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center gap-1.5 text-xs font-semibold text-white tap-active transition-colors"
            >
              <span className="text-sm leading-none">🇺🇸</span>
              <span>EN</span>
              <ChevronDown size={14} className="opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING KAIPAY CARD */}
      <div className="px-4 -mt-11 relative z-20">
        <div className="bg-white rounded-3xl p-4 shadow-[0_10px_25px_-5px_rgba(34,22,115,0.08),0_8px_10px_-6px_rgba(34,22,115,0.04)] border border-slate-100">
          {/* Top Row: KAIPay Activation & Quick Actions */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              {/* Logo KAIPay */}
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-400 via-blue-500 to-orange-500 flex items-center justify-center text-white font-black text-[10px] shadow-sm">
                  ⚡
                </div>
                <span className="font-extrabold text-slate-800 text-sm tracking-tight">KAIPay</span>
              </div>

              {/* Activation Pill Button */}
              <button
                onClick={() => showPlaceholderToast('Aktivasi KAIPay')}
                className="text-xs font-bold text-kai-blue border border-kai-blue/80 hover:bg-blue-50/50 px-3.5 py-1.5 rounded-full tap-active transition-colors"
              >
                KAIPay Activation
              </button>
            </div>

            {/* Quick Actions (Scan, Top Up, History) */}
            <div className="flex items-center gap-3 text-slate-700">
              <button
                onClick={() => showPlaceholderToast('Scan QRIS')}
                className="flex flex-col items-center gap-0.5 tap-active"
              >
                <div className="w-6 h-6 flex items-center justify-center text-kai-blue">
                  <QrCode size={19} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-medium text-slate-700">Scan</span>
              </button>

              <button
                onClick={() => showPlaceholderToast('Top Up Saldo')}
                className="flex flex-col items-center gap-0.5 tap-active"
              >
                <div className="w-6 h-6 flex items-center justify-center text-kai-blue">
                  <Wallet size={19} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-medium text-slate-700">Top Up</span>
              </button>

              <button
                onClick={() => showPlaceholderToast('Riwayat Transaksi')}
                className="flex flex-col items-center gap-0.5 opacity-40 cursor-default"
              >
                <div className="w-6 h-6 flex items-center justify-center text-slate-400">
                  <History size={19} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-medium text-slate-400">History</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Railpoints & Premium Gold Badge */}
          <div className="flex items-center justify-between pt-3 text-xs">
            <div
              onClick={() => showPlaceholderToast('Railpoint')}
              className="flex items-center gap-2 cursor-pointer"
            >
              {/* Railpoint coin icon */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-[11px] shadow-sm text-white font-bold">
                🪙
              </div>
              <span className="font-extrabold text-orange-600 text-sm">240</span>
              <span className="text-slate-600 font-medium text-xs">Railpoint</span>
            </div>

            {/* Premium Gold Badge */}
            <button
              onClick={() => showPlaceholderToast('Status Member')}
              className="bg-amber-100 hover:bg-amber-200/70 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 tap-active transition-colors border border-amber-200"
            >
              <Award size={13} className="text-amber-600 fill-amber-500" />
              <span>Premium</span>
              <ChevronDown size={13} className="-rotate-90 text-amber-700" />
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY SERVICES ROW (CIRCULAR GRADIENTS + NEW EVENT ENTRYPOINT!) */}
      <div className="px-4 mt-5">
        <div className="flex items-start justify-between overflow-x-auto no-scrollbar pb-1 gap-2">
          {/* Local Train (Placeholder) */}
          <button
            onClick={() => showPlaceholderToast('Kereta Lokal')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#FF9E2C] to-[#FF6B00] shadow-md shadow-orange-500/20 flex items-center justify-center text-white">
              <Train size={24} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center">Local</span>
          </button>

          {/* Commuter Train (Placeholder) */}
          <button
            onClick={() => showPlaceholderToast('Commuter Line')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#FF6036] to-[#E8281D] shadow-md shadow-red-500/20 flex items-center justify-center text-white">
              <Train size={24} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center">Commuter</span>
          </button>

          {/* LRT (Placeholder) */}
          <button
            onClick={() => showPlaceholderToast('LRT Jabodebek')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#D82488] to-[#87147F] shadow-md shadow-pink-500/20 flex items-center justify-center text-white">
              <Train size={24} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center">LRT</span>
          </button>

          {/* Airport Train (Placeholder) */}
          <button
            onClick={() => showPlaceholderToast('Kereta Bandara')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#2BB5EE] to-[#0D70C9] shadow-md shadow-sky-500/20 flex items-center justify-center text-white">
              <Train size={24} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center">Airport</span>
          </button>

          {/* Whoosh (Placeholder) */}
          <button
            onClick={() => showPlaceholderToast('Kereta Cepat Whoosh')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14"
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-[#EA2B2B] to-[#B91313] shadow-md shadow-red-600/20 flex items-center justify-center text-white font-bold italic text-base">
              ⚡
            </div>
            <span className="text-[11px] font-medium text-slate-700 text-center">Whoosh</span>
          </button>

          {/* ★★★ THE NEW "EVENT" SERVICE BUTTON (PRIMARY FUNCTIONAL ENTRYPOINT) ★★★ */}
          <button
            onClick={() => setCurrentStep('catalog')}
            className="flex flex-col items-center gap-1.5 shrink-0 tap-active w-14 group relative"
          >
            {/* Glowing animated halo */}
            <div className="absolute -top-1 -right-0.5 z-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-white"></span>
              </span>
            </div>

            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-purple-700 shadow-md shadow-indigo-500/30 flex items-center justify-center text-white ring-2 ring-indigo-300 ring-offset-2 transition-transform group-hover:scale-105">
              <Ticket size={24} strokeWidth={2.3} className="text-amber-300" />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-[11px] font-bold text-kai-blue text-center">Event</span>
              <Sparkles size={10} className="text-amber-500 fill-amber-400" />
            </div>
          </button>
        </div>
      </div>

      {/* SECONDARY SERVICES (SOFT BLUE ROUNDED ICONS) */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-4 gap-2 text-center">
          <button
            onClick={() => showPlaceholderToast('Space By KAI')}
            className="flex flex-col items-center gap-2 tap-active"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] hover:bg-blue-100 transition-colors">
              <Building2 size={21} strokeWidth={2.2} />
            </div>
            <span className="text-xs font-medium text-slate-700 leading-tight">Space By KAI</span>
          </button>

          <button
            onClick={() => showPlaceholderToast('Grab Transport')}
            className="flex flex-col items-center gap-2 tap-active"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] hover:bg-blue-100 transition-colors">
              <Car size={21} strokeWidth={2.2} />
            </div>
            <span className="text-xs font-medium text-slate-700">Grab</span>
          </button>

          <button
            onClick={() => showPlaceholderToast('Kartu Multi Trip (KMT)')}
            className="flex flex-col items-center gap-2 tap-active"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] hover:bg-blue-100 transition-colors">
              <CreditCard size={21} strokeWidth={2.2} />
            </div>
            <span className="text-xs font-medium text-slate-700">KMT</span>
          </button>

          <button
            onClick={() => showPlaceholderToast('Layanan Lainnya')}
            className="flex flex-col items-center gap-2 tap-active"
          >
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] hover:bg-blue-100 transition-colors">
              <LayoutGrid size={21} strokeWidth={2.2} />
            </div>
            <span className="text-xs font-medium text-slate-700">Show more</span>
          </button>
        </div>
      </div>

      {/* BANNER 1: LIVE TRACKING BANNER (PURPLE-PINK GRADIENT WITH 3D TRAIN) */}
      <div className="px-4 mt-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#291e7e] via-[#632ca6] to-[#eb3989] p-4 text-white shadow-md">
          <div className="relative z-10 max-w-[210px]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-extrabold text-base tracking-tight">Live Tracking</span>
              <span className="bg-white text-[#eb3989] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                New <Sparkles size={9} className="fill-current text-[#eb3989]" />
              </span>
            </div>
            <p className="text-xs text-white/90 leading-snug mb-3">
              See your train's location and journey status in real-time.
            </p>
            <button
              onClick={() => showPlaceholderToast('Live Tracking Kereta')}
              className="bg-white text-kai-blue font-bold text-xs px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 tap-active transition-colors"
            >
              Open Live Tracking
            </button>
          </div>

          {/* 3D Train Graphic Representation */}
          <div className="absolute -bottom-1 -right-4 w-40 h-28 pointer-events-none flex items-end">
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Stylized Modern Locomotive */}
              <div className="w-36 h-20 bg-gradient-to-t from-slate-900 via-indigo-900 to-indigo-600 rounded-xl rounded-bl-3xl border border-indigo-400/30 p-1 shadow-2xl relative">
                <div className="w-full h-6 bg-cyan-400/30 rounded-t-lg flex items-center justify-end px-2">
                  <div className="w-4 h-3 bg-amber-300 rounded-sm shadow-glow" />
                </div>
                <div className="flex items-center gap-1 mt-2 px-1">
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600" />
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600" />
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600" />
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600" />
                </div>
                <div className="absolute -bottom-1.5 left-0 right-0 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER 2: EXCLUSIVE BENEFITS ADS BANNER */}
      <div className="px-4 mt-3">
        <div
          onClick={() => showPlaceholderToast('Promo Akses Eksklusif')}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 p-4 text-white shadow-sm cursor-pointer tap-active"
        >
          <div className="absolute top-2 right-2 bg-white/90 text-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            Ads
          </div>
          <h2 className="font-extrabold text-sm mb-1">
            Access to Our Exclusive Benefits
          </h2>
          <p className="text-xs text-white/90 line-clamp-1">
            Nikmati berbagai keuntungan dengan membership Railpoint & KAI Access.
          </p>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation />
    </div>
  );
};
