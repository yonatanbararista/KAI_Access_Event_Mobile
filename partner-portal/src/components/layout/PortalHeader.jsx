import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Building2,
  CheckCircle,
  ChevronDown,
  Smartphone,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { NotificationDrawer } from './NotificationDrawer';

export function PortalHeader({
  isCollapsed,
  onToggleCollapse,
  onToggleMobileMenu,
  onSwitchToConsumer,
}) {
  const {
    events,
    selectedEventId,
    setSelectedEventId,
    setCurrentNav,
    organization,
    notifications,
  } = usePartnerPortal();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEventMenuOpen, setIsEventMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
        {/* Left Side: Hamburger, Desktop Toggle & Event Selector */}
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            title="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
              title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-slate-700" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-slate-600" />
              )}
            </button>
          )}

          {/* Divider on desktop */}
          <div className="hidden lg:block h-5 w-px bg-slate-200 shrink-0"></div>

          {/* Event Context Switcher */}
          <div className="relative min-w-0">
            <button
              onClick={() => setIsEventMenuOpen(!isEventMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="truncate max-w-[140px] sm:max-w-[240px]">
                {currentEvent ? currentEvent.title : 'Pilih Event'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>

            {isEventMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsEventMenuOpen(false)}
                />
                <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 divide-y divide-slate-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Pilih Event untuk Dikelola
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {events.map((evt) => (
                      <button
                        key={evt.id}
                        onClick={() => {
                          setSelectedEventId(evt.id);
                          setIsEventMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          evt.id === selectedEventId
                            ? 'bg-blue-50 text-kai-blue font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate font-medium">{evt.title}</div>
                          <div className="text-[10px] text-slate-400">{evt.dateDisplay}</div>
                        </div>
                        {evt.id === selectedEventId && (
                          <span className="w-1.5 h-1.5 rounded-full bg-kai-blue shrink-0"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switch to Consumer App View (Only appears on B2B) */}
          {onSwitchToConsumer && (
            <button
              onClick={onSwitchToConsumer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors shadow-2xs"
              title="Buka Pratinjau Tampilan Consumer Mobile App"
            >
              <Smartphone className="w-3.5 h-3.5 text-kai-orange" />
              <span className="hidden md:inline">Consumer View</span>
            </button>
          )}

          {/* Quick Create Event CTA */}
          <button
            onClick={() => setCurrentNav('events-create')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kai-blue hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buat Event</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Organization Pill */}
          <div
            onClick={() => setCurrentNav('org-profile')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1 leading-none">
                <span className="truncate max-w-[140px]">{organization.name}</span>
                <CheckCircle className="w-3 h-3 text-blue-600 shrink-0" />
              </div>
              <span className="text-[10px] text-slate-400">Promoter Terverifikasi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Drawer Popover */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </>
  );
}
