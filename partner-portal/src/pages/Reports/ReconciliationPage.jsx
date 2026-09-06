import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  CreditCard,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { formatIDR } from '../../utils/currency';
import { exportToCSV, exportToExcel } from '../../utils/exportHelper';

export function ReconciliationPage() {
  const { orders } = usePartnerPortal();

  // Reconciliation items with payment gateway details matching Section 22
  const reconData = orders.map((o) => {
    const gateway =
      o.paymentMethod.includes('BCA')
        ? 'BCA Snap Direct'
        : o.paymentMethod.includes('Mandiri')
        ? 'Mandiri Bill API'
        : o.paymentMethod.includes('QRIS')
        ? 'ShopeePay/Gopay QRIS'
        : 'KAIPay Wallet Switch';

    const netAmount = o.totalAmount - (o.discount || 0);

    return {
      orderId: o.orderId,
      date: o.date,
      paymentMethod: o.paymentMethod,
      gateway: gateway,
      ticketAmount: o.ticketTotal,
      serviceFee: o.serviceFee,
      discount: o.discount || 0,
      refund: 0,
      netAmount: netAmount,
      paymentStatus: o.paymentStatus,
    };
  });

  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Payment Date',
      'Payment Method',
      'Payment Gateway',
      'Ticket Amount',
      'Service Fee',
      'Discount',
      'Refund',
      'Net Amount',
      'Payment Status',
    ];
    const rows = reconData.map((r) => [
      r.orderId,
      r.date,
      r.paymentMethod,
      r.gateway,
      r.ticketAmount,
      r.serviceFee,
      r.discount,
      r.refund,
      r.netAmount,
      r.paymentStatus,
    ]);
    exportToCSV('Laporan_Rekonsiliasi_Pembayaran_KAI', headers, rows);
  };

  const handleExportExcel = () => {
    const headers = [
      'Order ID',
      'Payment Date',
      'Payment Method',
      'Payment Gateway',
      'Ticket Amount',
      'Service Fee',
      'Discount',
      'Refund',
      'Net Amount',
      'Payment Status',
    ];
    const rows = reconData.map((r) => [
      r.orderId,
      r.date,
      r.paymentMethod,
      r.gateway,
      r.ticketAmount,
      r.serviceFee,
      r.discount,
      r.refund,
      r.netAmount,
      r.paymentStatus,
    ]);
    exportToExcel('Laporan_Rekonsiliasi_Pembayaran_KAI', headers, rows);
  };

  const columns = [
    {
      header: 'Order ID',
      field: 'orderId',
      sortable: true,
      render: (val) => <span className="font-mono font-bold text-kai-blue">{val}</span>,
    },
    {
      header: 'Payment Date',
      field: 'date',
      sortable: true,
    },
    {
      header: 'Payment Method',
      field: 'paymentMethod',
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-800">{val}</span>,
    },
    {
      header: 'Payment Gateway',
      field: 'gateway',
      render: (val) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-600 font-mono">
          {val}
        </span>
      ),
    },
    {
      header: 'Ticket Amount',
      field: 'ticketAmount',
      sortable: true,
      headerClass: 'text-right',
      cellClass: 'text-right font-medium text-slate-700',
      render: (val) => formatIDR(val),
    },
    {
      header: 'Service Fee',
      field: 'serviceFee',
      headerClass: 'text-right',
      cellClass: 'text-right text-slate-500',
      render: (val) => formatIDR(val),
    },
    {
      header: 'Discount',
      field: 'discount',
      headerClass: 'text-right',
      cellClass: 'text-right text-rose-600',
      render: (val) => (val > 0 ? `-${formatIDR(val)}` : '-'),
    },
    {
      header: 'Net Amount',
      field: 'netAmount',
      headerClass: 'text-right',
      cellClass: 'text-right font-extrabold text-slate-900',
      render: (val) => formatIDR(val),
    },
    {
      header: 'Payment Status',
      field: 'paymentStatus',
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Rekonsiliasi Pembayaran & Gateway (Reconciliation)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pencocokan mutasi kas tiket, pemotongan biaya layanan checkout, dan saldo bersih per transaksi.
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

      {/* Table matching Section 22 */}
      <DataTable
        columns={columns}
        data={reconData}
        keyField="orderId"
        searchPlaceholder="Cari Order ID atau metode bayar..."
        searchFields={['orderId', 'paymentMethod', 'gateway']}
        filterOptions={{
          key: 'paymentStatus',
          label: 'Semua Status Pembayaran',
          options: ['Paid', 'Pending', 'Failed', 'Expired', 'Refunded'],
        }}
      />
    </div>
  );
}
