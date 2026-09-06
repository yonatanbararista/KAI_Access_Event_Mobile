import React from 'react';
import {
  DollarSign,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Building2,
  FileText,
  PieChart,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatCard } from '../../components/shared/StatCard';
import { formatCompactIDR, formatIDR } from '../../utils/currency';

export function FinanceDashboardPage() {
  const { financialSummary, setCurrentNav } = usePartnerPortal();

  // Metrics from prompt Section 20
  const grossSales = financialSummary.grossSales; // 2.84 B
  const discounts = financialSummary.discounts; // -120 M
  const serviceFees = financialSummary.serviceFees; // 84 M
  const refunds = financialSummary.refunds; // -25 M
  const netRevenue = financialSummary.netRevenue; // 2.78 B
  const pendingPayout = financialSummary.pendingPayout; // 2.31 M
  const paidOut = financialSummary.paidOut; // 469 M

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Ikhtisar Keuangan Promotor (Finance Overview)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparansi rincian pendapatan kotor, potongan diskon voucher, biaya layanan, dan estimasi pencairan dana (payout).
          </p>
        </div>

        <button
          onClick={() => setCurrentNav('finance-payout')}
          className="flex items-center gap-1.5 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Lihat Jadwal Payout</span>
        </button>
      </div>

      {/* KPI Financial Cards matching Section 20 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Gross Sales"
          value={formatCompactIDR(grossSales)}
          subtitle="Total Penjualan Bruto"
          icon={DollarSign}
          highlightColor="blue"
        />
        <StatCard
          title="Net Revenue"
          value={formatCompactIDR(netRevenue)}
          subtitle="Pendapatan Bersih"
          icon={DollarSign}
          highlightColor="emerald"
        />
        <StatCard
          title="Pending Payout"
          value={formatCompactIDR(pendingPayout)}
          subtitle="Estimasi Siap Cair"
          icon={CreditCard}
          highlightColor="amber"
        />
        <StatCard
          title="Paid Out"
          value={formatCompactIDR(paidOut)}
          subtitle="Telah Ditransfer"
          icon={Building2}
          highlightColor="purple"
        />
      </div>

      {/* Visual Derivation Formula Card matching Section 20 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Perhitungan Pendapatan & Payout (Financial Derivation)</span>
            <span className="text-[10px] font-bold uppercase bg-blue-50 text-kai-blue px-2 py-0.5 rounded-full">
              Rumus Transparan
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Berikut visualisasi alur perhitungan dari penjualan kotor tiket hingga estimasi saldo pencairan dana ke rekening promotor.
          </p>
        </div>

        {/* Math Breakdown Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs">
          {/* 1. Gross Sales */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Gross Sales
            </span>
            <span className="text-base font-extrabold text-slate-900 block">
              {formatCompactIDR(grossSales)}
            </span>
            <span className="text-[10px] text-slate-500">Harga Tiket Terjual</span>
          </div>

          {/* 2. Discounts (-) */}
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-center space-y-1">
            <span className="text-[10px] text-rose-500 font-bold uppercase block">
              Diskon Voucher (-)
            </span>
            <span className="text-base font-extrabold text-rose-700 block">
              -{formatCompactIDR(discounts)}
            </span>
            <span className="text-[10px] text-rose-600">Kode Promo Promotor</span>
          </div>

          {/* 3. Service Fees (+) */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center space-y-1">
            <span className="text-[10px] text-kai-blue font-bold uppercase block">
              Service Fees KAI
            </span>
            <span className="text-base font-extrabold text-kai-blue block">
              {formatCompactIDR(serviceFees)}
            </span>
            <span className="text-[10px] text-blue-600">Biaya Checkout Pembeli</span>
          </div>

          {/* 4. Refunds (-) */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center space-y-1">
            <span className="text-[10px] text-amber-600 font-bold uppercase block">
              Refunds / Retur (-)
            </span>
            <span className="text-base font-extrabold text-amber-800 block">
              -{formatCompactIDR(refunds)}
            </span>
            <span className="text-[10px] text-amber-700">Pembatalan Resmi</span>
          </div>

          {/* 5. Net Revenue Result */}
          <div className="p-4 bg-emerald-500 text-white rounded-xl shadow-md text-center space-y-1">
            <span className="text-[10px] text-emerald-100 font-bold uppercase block">
              Net Revenue (=)
            </span>
            <span className="text-base font-black text-white block">
              {formatCompactIDR(netRevenue)}
            </span>
            <span className="text-[10px] text-emerald-100">Pendapatan Bersih</span>
          </div>
        </div>

        {/* Detailed Explanation Table */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-800">Kebijakan Biaya Layanan KAI:</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Harga tiket di bawah Rp 110.000: <strong>Rp 7.000 / tiket</strong></li>
              <li>Harga tiket di atas atau sama dengan Rp 110.000: <strong>3% per tiket</strong></li>
              <li>Dihitung per satuan tiket dan langsung dibayarkan oleh pembeli saat checkout.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-800">Status Pencairan Dana (Payout):</h4>
            <p className="text-slate-600 leading-relaxed">
              Pencairan dana dilakukan berkala ke rekening utama BCA (PT Kreasi Musik Nusantara) setelah verifikasi rekonsiliasi gateway H+3 setelah acara.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
