import React from 'react';
import {
  QrCode,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { ScannerSimulation } from '../../components/checkin/ScannerSimulation';
import { OfflineSyncBar } from '../../components/checkin/OfflineSyncBar';
import { StatCard } from '../../components/shared/StatCard';
import { formatNumber } from '../../utils/currency';

export function CheckInPage() {
  const { currentEvent, checkInActivities } = usePartnerPortal();

  // Metrics matching Section 24 Example
  const totalTickets = 10000;
  const checkedIn = 7820;
  const remaining = 2180;
  const checkInRate = 78.2;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
          <span>Event Aktif:</span>
          <span className="text-kai-blue font-bold">{currentEvent.title}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Operasional Pintu Masuk (Event Check-in Dashboard)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Pantau laju kedatangan peserta, scan barcode tiket fisik/elektronik, dan kelola antrean offline.
        </p>
      </div>

      {/* Offline Simulation Banner matching Section 26 */}
      <OfflineSyncBar />

      {/* KPI Metrics matching Section 24 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tickets"
          value={formatNumber(totalTickets)}
          subtitle="Kapasitas Gate"
          icon={Users}
          highlightColor="blue"
        />
        <StatCard
          title="Checked In"
          value={formatNumber(checkedIn)}
          subtitle="Peserta Masuk"
          icon={CheckCircle2}
          highlightColor="emerald"
        />
        <StatCard
          title="Remaining"
          value={formatNumber(remaining)}
          subtitle="Belum Hadir"
          icon={Clock}
          highlightColor="amber"
        />
        <StatCard
          title="Check-in Rate"
          value={`${checkInRate}%`}
          trend={{ value: '+18.4%', isPositive: true }}
          icon={Activity}
          highlightColor="orange"
        />
      </div>

      {/* Real-time Scanner Component matching Section 25 */}
      <ScannerSimulation />

      {/* Real-time Activity Stream matching Section 24 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-kai-blue" />
            <h3 className="text-sm font-bold text-slate-900">
              Aktivitas Check-in Langsung (Live Feed Gate)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Memperbarui otomatis
          </span>
        </div>

        <div className="space-y-2">
          {checkInActivities.map((act) => (
            <div
              key={act.id}
              className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                act.status === 'valid'
                  ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950'
                  : act.status === 'already_used'
                  ? 'bg-rose-50/50 border-rose-100 text-rose-950'
                  : 'bg-amber-50/50 border-amber-100 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 font-bold">
                  {act.time}
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">
                    {act.attendeeName}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {act.ticketTier} • {act.seat} • {act.ticketId}
                  </span>
                </div>
              </div>

              <div className="text-right font-bold text-xs">
                {act.status === 'valid' && (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Checked In</span>
                  </span>
                )}
                {act.status === 'already_used' && (
                  <span className="text-rose-600 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>✕ Sudah Digunakan</span>
                  </span>
                )}
                {act.status === 'invalid' && (
                  <span className="text-rose-600 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>✕ Invalid</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
