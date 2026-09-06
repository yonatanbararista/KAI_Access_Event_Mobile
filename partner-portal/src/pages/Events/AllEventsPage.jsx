import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Copy,
  Ticket,
  DollarSign,
  Users,
  Trash2,
  MapPin,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { formatCompactIDR, formatNumber } from '../../utils/currency';

export function AllEventsPage() {
  const {
    events,
    setCurrentNav,
    setSelectedEventId,
    duplicateEvent,
    deleteEvent,
  } = usePartnerPortal();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const statuses = [
    'ALL',
    'Draft',
    'Published',
    'On Sale',
    'Sold Out',
    'Ongoing',
    'Completed',
    'Cancelled',
  ];

  const filteredEvents = events.filter((evt) => {
    if (selectedStatus !== 'ALL' && evt.status !== selectedStatus) return false;
    if (search && !evt.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAction = (evtId, targetNav) => {
    setSelectedEventId(evtId);
    setCurrentNav(targetNav);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Semua Event (All Events)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola konser, pameran, dan festival yang diselenggarakan oleh promotor Anda.
          </p>
        </div>

        <button
          onClick={() => setCurrentNav('events-create')}
          className="flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Event Baru</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul event atau lokasi..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 text-slate-800"
          />
        </div>

        {/* Status Pills Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? 'bg-kai-blue text-white shadow-2xs font-bold'
                  : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {status === 'ALL' ? 'Semua Status' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isMenuOpen = activeMenuId === evt.id;
          const soldPct = evt.totalQuota > 0 ? Math.round((evt.ticketsSold / evt.totalQuota) * 100) : 0;

          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative"
            >
              {/* Poster Banner */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={evt.poster}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <StatusBadge status={evt.status} size="sm" />
                </div>

                {/* Date tag */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-kai-orange" />
                  <span>{evt.dateDisplay}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-bold text-kai-orange uppercase tracking-wider">
                    {evt.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.venue}, {evt.city}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      Penjualan Tiket
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {formatNumber(evt.ticketsSold)} / {formatNumber(evt.totalQuota)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      {soldPct}% Terjual
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">
                      Pendapatan Kotor
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {formatCompactIDR(evt.grossRevenue)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      {evt.checkInRate || 0}% Check-in
                    </span>
                  </div>
                </div>

                {/* Action Buttons matching Section 8: View, Edit, Duplicate, Manage Tickets, View Sales, View Attendees */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                  <button
                    onClick={() => handleAction(evt.id, 'tickets-types')}
                    className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-kai-blue font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Tiket</span>
                  </button>

                  <button
                    onClick={() => handleAction(evt.id, 'sales-orders')}
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Sales</span>
                  </button>

                  <button
                    onClick={() => handleAction(evt.id, 'sales-attendees')}
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Peserta</span>
                  </button>

                  {/* More Menu Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(isMenuOpen ? null : evt.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setActiveMenuId(null)}
                        />
                        <div className="absolute right-0 bottom-full mb-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-xs divide-y divide-slate-100">
                          <button
                            onClick={() => duplicateEvent(evt.id)}
                            className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Duplikasi Event</span>
                          </button>
                          <button
                            onClick={() => handleAction(evt.id, 'tickets-seating')}
                            className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Ticket className="w-3.5 h-3.5 text-slate-400" />
                            <span>Atur Seating</span>
                          </button>
                          <button
                            onClick={() => {
                              deleteEvent(evt.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span>Hapus Event</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
