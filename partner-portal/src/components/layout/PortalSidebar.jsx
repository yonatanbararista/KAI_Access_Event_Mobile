import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  DollarSign,
  QrCode,
  Landmark,
  FileBarChart2,
  Building2,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Users,
  CreditCard,
  Percent,
  Sliders,
  Maximize2,
  ChevronLeft,
  Layers,
  Sparkles,
  TicketPercent,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';

export function PortalSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const { currentNav, setCurrentNav, currentEvent } = usePartnerPortal();

  // Accordion state for expandable sections
  const [openSections, setOpenSections] = useState({
    events: true,
    tickets: true,
    sales: true,
    finance: true,
    reports: true,
    org: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      children: [
        { id: 'events-all', label: 'All Events' },
        { id: 'events-create', label: 'Create Event' },
      ],
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: Ticket,
      children: [
        { id: 'tickets-types', label: 'Ticket Types' },
        { id: 'tickets-quota', label: 'Quota & Pricing' },
        { id: 'tickets-seating', label: 'Seating & Denah' },
        { id: 'tickets-addons', label: 'Add-ons & Jersey' },
        { id: 'tickets-promo', label: 'Promo Codes' },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: DollarSign,
      children: [
        { id: 'sales-orders', label: 'Orders' },
        { id: 'sales-attendees', label: 'Attendees' },
      ],
    },
    {
      id: 'ops-checkin',
      label: 'Check-in',
      icon: QrCode,
      badge: 'Live',
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: Landmark,
      children: [
        { id: 'finance-revenue', label: 'Revenue' },
        { id: 'finance-payout', label: 'Payout' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileBarChart2,
      children: [
        { id: 'reports-sales', label: 'Sales Report' },
        { id: 'reports-recon', label: 'Payment Reconciliation' },
        { id: 'reports-final', label: 'Final Sales Report' },
      ],
    },
    {
      id: 'org',
      label: 'Organization',
      icon: Building2,
      children: [
        { id: 'org-profile', label: 'Profile' },
        { id: 'org-bank', label: 'Bank Account' },
        { id: 'org-team', label: 'Team' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const handleSelectNav = (id) => {
    setCurrentNav(id);
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-slate-900 text-slate-300 border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div
          className={`h-16 flex items-center border-b border-slate-800 transition-all ${
            isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={() => isCollapsed && setIsCollapsed(false)}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-kai-orange to-kai-orangeDark flex items-center justify-center font-black text-white text-base shadow-md shrink-0 transition-transform hover:scale-105 active:scale-95"
              title={isCollapsed ? 'KAI Partner Portal (Klik untuk memperluas)' : 'KAI Partner Portal'}
            >
              KAI
            </button>
            {!isCollapsed && (
              <div className="truncate">
                <span className="font-extrabold text-white text-sm tracking-tight block">
                  PARTNER PORTAL
                </span>
                <span className="text-[10px] text-kai-orange font-semibold block uppercase tracking-wider">
                  Event Promoter
                </span>
              </div>
            )}
          </div>

          {/* Collapse toggle (Desktop only, visible when expanded) */}
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Ciutkan Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selected Event Context Pill */}
        {!isCollapsed && currentEvent && (
          <div className="mx-3 my-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
              <span>Event Aktif</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-xs font-semibold text-white truncate mt-0.5">
              {currentEvent.title}
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div
          className={`flex-1 overflow-y-auto py-3 space-y-1 text-xs ${
            isCollapsed ? 'px-2' : 'px-3'
          }`}
        >
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children);
            const isParentActive =
              currentNav === item.id ||
              (hasChildren && item.children.some((c) => c.id === currentNav));
            const isOpen = openSections[item.id] ?? false;
            const Icon = item.icon;

            if (!hasChildren) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full flex items-center rounded-xl font-medium transition-all relative ${
                    isCollapsed
                      ? 'justify-center h-10 px-0'
                      : 'gap-3 px-3 py-2.5'
                  } ${
                    currentNav === item.id
                      ? 'bg-kai-blue text-white shadow-md shadow-blue-900/40 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute top-2 right-3.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
                  )}
                </button>
              );
            }

            // Accordion group
            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  onClick={() => {
                    if (isCollapsed) {
                      setIsCollapsed(false);
                      setOpenSections((prev) => ({ ...prev, [item.id]: true }));
                    } else {
                      toggleSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center rounded-xl font-medium transition-all relative ${
                    isCollapsed
                      ? 'justify-center h-10 px-0'
                      : 'justify-between px-3 py-2.5'
                  } ${
                    isParentActive
                      ? 'text-white font-semibold bg-slate-800/60'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                  title={item.label}
                >
                  <div
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center' : 'gap-3 truncate'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isParentActive ? 'text-kai-blue' : ''}`}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {isCollapsed && isParentActive && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-kai-blue"></span>
                  )}
                </button>

                {/* Sub items */}
                {!isCollapsed && isOpen && (
                  <div className="pl-9 pr-1 py-1 space-y-1">
                    {item.children.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSelectNav(sub.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[11px] transition-all flex items-center justify-between ${
                          currentNav === sub.id
                            ? 'bg-kai-blue text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <span className="truncate">{sub.label}</span>
                        {currentNav === sub.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info & Quick Action */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0">
                AP
              </div>
              <div className="truncate text-xs">
                <div className="font-semibold text-white truncate">Andi Prasetyo</div>
                <div className="text-[10px] text-slate-400 truncate">Event Organizer</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="Andi Prasetyo (Event Organizer)">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white cursor-pointer hover:ring-2 hover:ring-kai-blue transition-all">
                AP
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
