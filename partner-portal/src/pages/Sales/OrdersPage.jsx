import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Download,
  Filter,
  Eye,
  Calendar,
  CreditCard,
  User,
  Ticket,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Drawer } from '../../components/shared/Drawer';
import { formatIDR, formatCompactIDR } from '../../utils/currency';
import { exportToCSV, exportToExcel } from '../../utils/exportHelper';

export function OrdersPage() {
  const { orders } = usePartnerPortal();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Tanggal',
      'Pembeli',
      'Email',
      'Telepon',
      'Event',
      'Tiket',
      'Qty',
      'Harga Satuan',
      'Biaya Layanan KAI',
      'Diskon',
      'Total Transaksi',
      'Metode Bayar',
      'Status',
    ];
    const rows = orders.map((o) => [
      o.orderId,
      o.date,
      o.buyerName,
      o.buyerEmail,
      o.buyerPhone,
      o.eventName,
      o.ticketName,
      o.quantity,
      o.ticketPrice,
      o.serviceFee,
      o.discount,
      o.totalAmount,
      o.paymentMethod,
      o.paymentStatus,
    ]);
    exportToCSV('Laporan_Pesanan_KAI_Partner', headers, rows);
  };

  const columns = [
    {
      header: 'Order ID',
      field: 'orderId',
      sortable: true,
      render: (val) => (
        <span className="font-mono font-bold text-kai-blue">{val}</span>
      ),
    },
    {
      header: 'Date',
      field: 'dateDisplay',
      sortable: true,
    },
    {
      header: 'Buyer',
      field: 'buyerName',
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900">{val}</div>
          <div className="text-[10px] text-slate-400">{row.buyerEmail}</div>
        </div>
      ),
    },
    {
      header: 'Event',
      field: 'eventName',
      sortable: true,
      render: (val) => <span className="truncate max-w-[150px] block">{val}</span>,
    },
    {
      header: 'Ticket',
      field: 'ticketName',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-800">{val}</span>
          <span className="text-[10px] text-slate-500 block">Tier: {row.ticketTier}</span>
        </div>
      ),
    },
    {
      header: 'Qty',
      field: 'quantity',
      headerClass: 'text-center',
      cellClass: 'text-center font-bold',
    },
    {
      header: 'Amount',
      field: 'totalAmount',
      sortable: true,
      headerClass: 'text-right',
      cellClass: 'text-right font-extrabold text-slate-900',
      render: (val) => formatIDR(val),
    },
    {
      header: 'Payment',
      field: 'paymentMethod',
      render: (val) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[11px] text-slate-700">
          {val}
        </span>
      ),
    },
    {
      header: 'Status',
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
            Manajemen Pesanan (Orders)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar transaksi pemesanan tiket masuk, rincian biaya layanan checkout, dan status pembayaran.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV Pesanan</span>
        </button>
      </div>

      {/* Orders Data Table matching Section 15 */}
      <DataTable
        columns={columns}
        data={orders}
        keyField="orderId"
        searchPlaceholder="Cari Order ID atau nama pembeli..."
        searchFields={['orderId', 'buyerName', 'buyerEmail', 'ticketName']}
        filterOptions={{
          key: 'paymentStatus',
          label: 'Semua Status Pembayaran',
          options: ['Paid', 'Pending', 'Failed', 'Refunded'],
        }}
        onRowClick={handleRowClick}
      />

      {/* Detail Drawer matching Section 15 */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`Rincian Pesanan #${selectedOrder?.orderId}`}
        subtitle={`Dibuat pada ${selectedOrder?.date}`}
        width="max-w-md"
        footer={
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Tutup Rincian
          </button>
        }
      >
        {selectedOrder && (
          <div className="space-y-5 text-xs">
            {/* Status Pill & Total */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Status Pembayaran
                </span>
                <StatusBadge status={selectedOrder.paymentStatus} size="md" />
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Total Dibayar
                </span>
                <span className="text-base font-black text-slate-900">
                  {formatIDR(selectedOrder.totalAmount)}
                </span>
              </div>
            </div>

            {/* Buyer Details */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Informasi Pembeli
              </h4>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama:</span>
                  <span className="font-bold text-slate-900">{selectedOrder.buyerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-800">{selectedOrder.buyerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Telepon:</span>
                  <span className="text-slate-800">{selectedOrder.buyerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="font-semibold text-kai-blue">{selectedOrder.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Itemized Breakdown & Fee Rule (Prompt Section 19) */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Rincian Tagihan & Biaya Layanan KAI
              </h4>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-700">
                    {selectedOrder.ticketName} ({selectedOrder.quantity}x)
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatIDR(selectedOrder.ticketTotal)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500">
                  <span>Biaya Layanan KAI (per unit):</span>
                  <span className="font-semibold text-slate-700">
                    +{formatIDR(selectedOrder.serviceFee)}
                  </span>
                </div>

                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Potongan Kode Promo:</span>
                    <span>-{formatIDR(selectedOrder.discount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Tagihan:</span>
                  <span>{formatIDR(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Issued Ticket IDs & Assigned Seats */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Tiket & Kursi Diterbitkan
              </h4>
              <div className="space-y-1.5">
                {selectedOrder.ticketIds?.map((tid, idx) => (
                  <div
                    key={tid}
                    className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-kai-blue block">{tid}</span>
                      <span className="text-[10px] text-slate-500">
                        Kursi: <strong>{selectedOrder.seats[idx] || selectedOrder.seats[0] || 'Standing'}</strong>
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-slate-600 border border-slate-200">
                      E-Ticket Terbit
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
