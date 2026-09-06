import React from 'react';
import {
  FileCheck2,
  Download,
  Calendar,
  Ticket,
  DollarSign,
  Users,
  CheckCircle2,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatCard } from '../../components/shared/StatCard';
import { formatCompactIDR, formatIDR, formatNumber } from '../../utils/currency';
import { exportToCSV, exportToExcel } from '../../utils/exportHelper';

export function FinalReportPage() {
  const { currentEvent } = usePartnerPortal();

  // Metrics matching Section 23
  const totalTickets = 5000;
  const ticketsSold = 4280;
  const ticketsRemaining = 720;
  const grossSales = 1820000000;
  const discounts = 48000000;
  const serviceFees = 54600000;
  const refunds = 12000000;
  const netRevenue = grossSales - discounts + serviceFees - refunds;
  const checkInRate = 32;

  const handleExportCSV = () => {
    const headers = ['Metrik', 'Nilai'];
    const rows = [
      ['Nama Event', currentEvent.title],
      ['Tanggal Pelaksanaan', currentEvent.dateDisplay],
      ['Total Alokasi Tiket', String(totalTickets)],
      ['Tiket Terjual', String(ticketsSold)],
      ['Tiket Sisa', String(ticketsRemaining)],
      ['Penjualan Bruto (Gross Sales)', String(grossSales)],
      ['Total Diskon', String(discounts)],
      ['Biaya Layanan KAI', String(serviceFees)],
      ['Total Refund', String(refunds)],
      ['Pendapatan Bersih (Net Revenue)', String(netRevenue)],
      ['Persentase Kehadiran Check-in', `${checkInRate}%`],
    ];
    exportToCSV('Laporan_Evaluasi_Akhir_Event_KAI', headers, rows);
  };

  const handleExportExcel = () => {
    const headers = ['Metrik', 'Nilai'];
    const rows = [
      ['Nama Event', currentEvent.title],
      ['Tanggal Pelaksanaan', currentEvent.dateDisplay],
      ['Total Alokasi Tiket', String(totalTickets)],
      ['Tiket Terjual', String(ticketsSold)],
      ['Tiket Sisa', String(ticketsRemaining)],
      ['Penjualan Bruto (Gross Sales)', String(grossSales)],
      ['Total Diskon', String(discounts)],
      ['Biaya Layanan KAI', String(serviceFees)],
      ['Total Refund', String(refunds)],
      ['Pendapatan Bersih (Net Revenue)', String(netRevenue)],
      ['Persentase Kehadiran Check-in', `${checkInRate}%`],
    ];
    exportToExcel('Laporan_Evaluasi_Akhir_Event_KAI', headers, rows);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
            <span>Event Evaluasi:</span>
            <span className="text-kai-blue font-bold">{currentEvent.title}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laporan Evaluasi Akhir Event (Final Sales Report)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ringkasan menyeluruh performa pasca-acara untuk keperluan evaluasi internal dan arsip akuntansi promotor.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid matching Section 23 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tiket"
          value={formatNumber(totalTickets)}
          subtitle={`${ticketsRemaining} Tiket Sisa`}
          icon={Ticket}
          highlightColor="blue"
        />
        <StatCard
          title="Tiket Terjual"
          value={formatNumber(ticketsSold)}
          trend={{ value: '85.6%', isPositive: true, label: 'Sold Rate' }}
          icon={Ticket}
          highlightColor="emerald"
        />
        <StatCard
          title="Gross Sales"
          value={formatCompactIDR(grossSales)}
          subtitle="Penjualan Kotor"
          icon={DollarSign}
          highlightColor="purple"
        />
        <StatCard
          title="Net Revenue"
          value={formatCompactIDR(netRevenue)}
          subtitle="Pendapatan Bersih"
          icon={DollarSign}
          highlightColor="emerald"
        />
      </div>

      {/* Detailed Post-Event Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Rincian Neraca Keuangan & Operasional Acara
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Financial Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              1. Rekapitulasi Finansial
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Penjualan Kotor (Gross Sales):</span>
                <span className="font-bold text-slate-900">{formatIDR(grossSales)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Diskon Kode Promo Promotor:</span>
                <span>-{formatIDR(discounts)}</span>
              </div>
              <div className="flex justify-between text-blue-700">
                <span>Biaya Layanan KAI (Checkout Fee):</span>
                <span>+{formatIDR(serviceFees)}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>Pengembalian Dana (Refunds):</span>
                <span>-{formatIDR(refunds)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Pendapatan Bersih Akhir:</span>
                <span className="text-emerald-700">{formatIDR(netRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Operational Check-in Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              2. Statistik Check-in & Kehadiran Gate
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Kuota Tiket Terbit:</span>
                <span className="font-bold text-slate-900">{formatNumber(totalTickets)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Peserta Berhasil Masuk (Checked In):</span>
                <span className="font-bold text-emerald-700">1.370 Peserta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tingkat Kehadiran (Attendance Rate):</span>
                <span className="font-bold text-slate-900">{checkInRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Waktu Puncak Kepadatan Gate:</span>
                <span className="font-bold text-slate-900">18:00 - 19:30 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
