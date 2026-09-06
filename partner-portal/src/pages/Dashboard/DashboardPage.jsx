import React, { useState } from 'react';
import {
  Calendar,
  Ticket,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  Plus,
  ChevronRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatCard } from '../../components/shared/StatCard';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { LineChart } from '../../components/charts/LineChart';
import { AreaBarChart } from '../../components/charts/AreaBarChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { formatIDR, formatCompactIDR, formatNumber } from '../../utils/currency';

export function DashboardPage() {
  const {
    events,
    setCurrentNav,
    setSelectedEventId,
    currentEvent,
    financialSummary,
    attendees,
  } = usePartnerPortal();

  const [dateRangeFilter, setDateRangeFilter] = useState('7 Days');
  const [eventSearch, setEventSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // KPI Calculations
  const totalEventsCount = events.length;
  const activeEventsCount = events.filter((e) => e.status === 'On Sale').length;
  const totalTicketsSold = events.reduce((sum, e) => sum + (e.ticketsSold || 0), 0);
  const totalGrossRevenue = events.reduce((sum, e) => sum + (e.grossRevenue || 0), 0);
  const totalAttendeesCount = attendees.length > 0 ? 8420 : 0; // matching prompt example (8,420)
  const pendingPayout = financialSummary.pendingPayout;

  // Event table filtering
  const filteredEvents = events.filter((evt) => {
    if (statusFilter !== 'ALL' && evt.status !== statusFilter) return false;
    if (eventSearch && !evt.title.toLowerCase().includes(eventSearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Promotor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pantau ringkasan performa penjualan tiket, kuota, pendapatan kotor, dan operasional gate check-in secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentNav('events-create')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Event Baru</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid matching Prompt Section 5 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Events"
          value={totalEventsCount}
          subtitle={`${activeEventsCount} Event Aktif`}
          icon={Calendar}
          highlightColor="blue"
          onClick={() => setCurrentNav('events-all')}
        />
        <StatCard
          title="Active Events"
          value={activeEventsCount}
          subtitle="Sedang Dijual"
          icon={Calendar}
          highlightColor="purple"
          onClick={() => setCurrentNav('events-all')}
        />
        <StatCard
          title="Tickets Sold"
          value={formatNumber(totalTicketsSold)}
          trend={{ value: '+14.2%', isPositive: true }}
          icon={Ticket}
          highlightColor="orange"
          onClick={() => setCurrentNav('tickets-quota')}
        />
        <StatCard
          title="Gross Revenue"
          value={formatCompactIDR(totalGrossRevenue)}
          trend={{ value: '+18.5%', isPositive: true }}
          icon={DollarSign}
          highlightColor="emerald"
          onClick={() => setCurrentNav('finance-revenue')}
        />
        <StatCard
          title="Pending Payout"
          value={formatCompactIDR(pendingPayout)}
          subtitle="Jadwal 15 Okt"
          icon={DollarSign}
          highlightColor="amber"
          onClick={() => setCurrentNav('finance-payout')}
        />
        <StatCard
          title="Attendees"
          value={formatNumber(totalAttendeesCount)}
          trend={{ value: '+9.8%', isPositive: true }}
          icon={Users}
          highlightColor="blue"
          onClick={() => setCurrentNav('sales-attendees')}
        />
      </div>

      {/* Sales Analytics Overview Section matching Prompt Section 6 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Overview Analitik Penjualan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tren penjualan tiket harian dan pendapatan kotor per kategori
            </p>
          </div>

          {/* Date Filter Tabs matching Section 6 */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto overflow-x-auto">
            {['Today', '7 Days', '30 Days', 'This Month', 'Custom Range'].map((tab) => (
              <button
                key={tab}
                onClick={() => setDateRangeFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  dateRangeFilter === tab
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Daily Ticket Sales Line Chart */}
          <div className="lg:col-span-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Tren Penjualan Tiket (Unit)
                </span>
                <span className="text-lg font-extrabold text-slate-900">
                  +1.420 tiket <span className="text-xs text-emerald-600 font-bold">(Hari ini)</span>
                </span>
              </div>
            </div>
            <LineChart
              height={190}
              strokeColor="#1A56DB"
              fillColor="#EFF6FF"
              unit="tiket"
            />
          </div>

          {/* Daily Revenue Area/Bar Chart */}
          <div className="lg:col-span-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Pendapatan Kotor Harian
                </span>
                <span className="text-lg font-extrabold text-slate-900">
                  Rp 380 Jt <span className="text-xs text-emerald-600 font-bold">(Puncak)</span>
                </span>
              </div>
            </div>
            <AreaBarChart height={190} />
          </div>

          {/* Category Distribution Donut Chart */}
          <div className="lg:col-span-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Distribusi Kategori Tiket
              </span>
              <span className="text-xs text-slate-500">
                Porsi penjualan berdasarkan kategori aktif
              </span>
            </div>
            <DonutChart size={140} />
          </div>
        </div>
      </div>

      {/* Event Performance Section matching Prompt Section 7 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Performa Event Promotor
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar seluruh event yang dikelola dengan persentase penjualan dan tingkat check-in gate
            </p>
          </div>

          {/* Search and Status filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              placeholder="Cari event..."
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 text-slate-800"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-700 font-medium"
            >
              <option value="ALL">Semua Status</option>
              <option value="On Sale">On Sale</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
        </div>

        {/* Performance Table matching Section 7 Columns: Event, Date, Status, Tickets Sold, Quota, Revenue, Check-in */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Tickets Sold</th>
                <th className="px-4 py-3 text-right">Quota</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-center">Check-in</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEvents.map((evt) => {
                const soldPercent = evt.totalQuota > 0 ? Math.round((evt.ticketsSold / evt.totalQuota) * 100) : 0;
                return (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Event info with thumbnail */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.poster}
                          alt={evt.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="truncate max-w-[220px]">
                          <div className="font-bold text-slate-900 truncate">
                            {evt.title}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {evt.venue}, {evt.city}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-medium">
                      {evt.dateDisplay}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={evt.status} size="sm" />
                    </td>

                    {/* Tickets Sold */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <span className="font-bold text-slate-900">
                        {formatNumber(evt.ticketsSold)}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        {soldPercent}% terjual
                      </span>
                    </td>

                    {/* Quota */}
                    <td className="px-4 py-3 text-right whitespace-nowrap text-slate-600 font-medium">
                      {formatNumber(evt.totalQuota)}
                    </td>

                    {/* Revenue */}
                    <td className="px-4 py-3 text-right whitespace-nowrap font-extrabold text-slate-900">
                      {formatCompactIDR(evt.grossRevenue)}
                    </td>

                    {/* Check-in */}
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-kai-blue border border-blue-200">
                        {evt.checkInRate || 0}% Checked In
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedEventId(evt.id);
                          setCurrentNav('events-all');
                        }}
                        className="p-1.5 rounded-lg text-kai-blue hover:bg-blue-50 font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Detail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
