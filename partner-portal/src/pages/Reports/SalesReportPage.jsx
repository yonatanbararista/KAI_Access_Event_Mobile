import React, { useState } from 'react';
import {
  FileBarChart2,
  Download,
  Calendar,
  Filter,
  Ticket,
  DollarSign,
  PieChart,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatCard } from '../../components/shared/StatCard';
import { LineChart } from '../../components/charts/LineChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { formatCompactIDR, formatIDR, formatNumber } from '../../utils/currency';
import { exportToCSV } from '../../utils/exportHelper';

export function SalesReportPage() {
  const { orders, currentEvent } = usePartnerPortal();
  const [selectedBreakdown, setSelectedBreakdown] = useState('category'); // 'category' | 'payment' | 'date'

  // Calculations matching Section 18
  const totalSold = 4280;
  const grossRevenue = 1820000000;
  const discount = 48000000;
  const serviceFee = 54600000;
  const netRevenue = grossRevenue - discount + serviceFee - 12000000;
  const failedPayments = 8;
  const refundedTransactions = 5;

  const handleExport = () => {
    const headers = ['Kategori', 'Tiket Terjual', 'Pendapatan Kotor', 'Porsi'];
    const rows = [
      ['Early Bird', '420', '63000000', '10%'],
      ['Presale Regular', '620', '124000000', '14%'],
      ['Normal Standard', '720', '180000000', '17%'],
      ['VIP Numbered', '284', '213000000', '7%'],
      ['VVIP Royal', '96', '144000000', '2%'],
    ];
    exportToCSV('Laporan_Penjualan_KAI_Partner', headers, rows);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
            <span>Event:</span>
            <span className="text-kai-blue font-bold">{currentEvent.title}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laporan Penjualan Tiket (Sales Report)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis penjualan tiket komprehensif berdasarkan tanggal, kategori tiket, dan metode pembayaran.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Laporan CSV</span>
        </button>
      </div>

      {/* KPI Overview Cards matching Section 18 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard
          title="Tiket Terjual"
          value={formatNumber(totalSold)}
          highlightColor="blue"
        />
        <StatCard
          title="Gross Revenue"
          value={formatCompactIDR(grossRevenue)}
          highlightColor="emerald"
        />
        <StatCard
          title="Total Diskon"
          value={formatCompactIDR(discount)}
          highlightColor="orange"
        />
        <StatCard
          title="Service Fee"
          value={formatCompactIDR(serviceFee)}
          highlightColor="purple"
        />
        <StatCard
          title="Net Revenue"
          value={formatCompactIDR(netRevenue)}
          highlightColor="emerald"
        />
        <StatCard
          title="Gagal Bayar"
          value={failedPayments}
          subtitle="Transaksi"
          highlightColor="amber"
        />
        <StatCard
          title="Refund"
          value={refundedTransactions}
          subtitle="Transaksi"
          highlightColor="amber"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Tren Penjualan Harian
          </h3>
          <LineChart height={220} />
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Porsi Kategori Tiket
          </h3>
          <DonutChart size={150} />
        </div>
      </div>

      {/* Breakdown Tables matching Section 18 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Rincian Penjualan per Kategori Tiket
          </h3>
          <span className="text-xs text-slate-500">Mata Uang: IDR (Rupiah)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Kategori Tiket</th>
                <th className="px-4 py-3 text-right">Harga Satuan</th>
                <th className="px-4 py-3 text-right">Terjual</th>
                <th className="px-4 py-3 text-right">Total Bruto</th>
                <th className="px-4 py-3 text-right">Biaya Layanan KAI</th>
                <th className="px-4 py-3 text-right">Net Promotor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900">Early Bird Festival Pass</td>
                <td className="px-4 py-3 text-right">{formatIDR(150000)}</td>
                <td className="px-4 py-3 text-right font-bold">420</td>
                <td className="px-4 py-3 text-right font-bold">{formatIDR(63000000)}</td>
                <td className="px-4 py-3 text-right text-slate-500">+{formatIDR(1890000)}</td>
                <td className="px-4 py-3 text-right font-extrabold text-emerald-700">{formatIDR(61110000)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900">Presale Regular Pass</td>
                <td className="px-4 py-3 text-right">{formatIDR(200000)}</td>
                <td className="px-4 py-3 text-right font-bold">620</td>
                <td className="px-4 py-3 text-right font-bold">{formatIDR(124000000)}</td>
                <td className="px-4 py-3 text-right text-slate-500">+{formatIDR(3720000)}</td>
                <td className="px-4 py-3 text-right font-extrabold text-emerald-700">{formatIDR(120280000)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900">Normal Standard Entry</td>
                <td className="px-4 py-3 text-right">{formatIDR(250000)}</td>
                <td className="px-4 py-3 text-right font-bold">720</td>
                <td className="px-4 py-3 text-right font-bold">{formatIDR(180000000)}</td>
                <td className="px-4 py-3 text-right text-slate-500">+{formatIDR(5400000)}</td>
                <td className="px-4 py-3 text-right font-extrabold text-emerald-700">{formatIDR(174600000)}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900">VIP Numbered Seat Pass</td>
                <td className="px-4 py-3 text-right">{formatIDR(750000)}</td>
                <td className="px-4 py-3 text-right font-bold">284</td>
                <td className="px-4 py-3 text-right font-bold">{formatIDR(213000000)}</td>
                <td className="px-4 py-3 text-right text-slate-500">+{formatIDR(6390000)}</td>
                <td className="px-4 py-3 text-right font-extrabold text-emerald-700">{formatIDR(206610000)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
