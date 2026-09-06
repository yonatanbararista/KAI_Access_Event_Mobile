import React, { useState } from 'react';
import {
  Users,
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Ticket,
  FileSpreadsheet,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { DataTable } from '../../components/shared/DataTable';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Drawer } from '../../components/shared/Drawer';
import { exportToCSV, exportToExcel } from '../../utils/exportHelper';

export function AttendeesPage() {
  const { attendees, currentEvent } = usePartnerPortal();

  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (att) => {
    setSelectedAttendee(att);
    setIsDrawerOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Ticket Type',
      'Ticket ID',
      'Seat',
      'Order ID',
      'Purchase Date',
      'Payment Status',
      'Check-in Status',
    ];
    const rows = attendees.map((a) => [
      a.name,
      a.email,
      a.phone,
      a.ticketType,
      a.ticketId,
      a.seat,
      a.orderId,
      a.purchaseDate,
      a.paymentStatus,
      a.checkInStatus,
    ]);
    exportToCSV('Data_Peserta_Event_KAI', headers, rows);
  };

  const handleExportExcel = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Ticket Type',
      'Ticket ID',
      'Seat',
      'Order ID',
      'Purchase Date',
      'Payment Status',
      'Check-in Status',
    ];
    const rows = attendees.map((a) => [
      a.name,
      a.email,
      a.phone,
      a.ticketType,
      a.ticketId,
      a.seat,
      a.orderId,
      a.purchaseDate,
      a.paymentStatus,
      a.checkInStatus,
    ]);
    exportToExcel('Data_Peserta_Event_KAI', headers, rows);
  };

  const columns = [
    {
      header: 'Attendee Name',
      field: 'name',
      sortable: true,
      render: (val, row) => (
        <div>
          <div className="font-bold text-slate-900">{val}</div>
          <div className="text-[10px] text-slate-400">{row.email}</div>
        </div>
      ),
    },
    {
      header: 'Ticket ID',
      field: 'ticketId',
      sortable: true,
      render: (val) => <span className="font-mono font-bold text-kai-blue">{val}</span>,
    },
    {
      header: 'Ticket Type',
      field: 'ticketType',
      sortable: true,
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-800">{val}</span>
          <span className="text-[10px] text-slate-400 block">{row.ticketTier}</span>
        </div>
      ),
    },
    {
      header: 'Seat',
      field: 'seat',
      render: (val) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-[11px] text-slate-800">
          {val}
        </span>
      ),
    },
    {
      header: 'Order ID',
      field: 'orderId',
      render: (val) => <span className="font-mono text-slate-600">{val}</span>,
    },
    {
      header: 'Payment',
      field: 'paymentStatus',
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
    {
      header: 'Check-in Status',
      field: 'checkInStatus',
      sortable: true,
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Data Peserta (Attendee Management)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar seluruh pemilik tiket, alokasi kursi, dan status kehadiran check-in di gate acara.
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
            <span>Export XLSX</span>
          </button>
        </div>
      </div>

      {/* Attendees Table matching Section 16 */}
      <DataTable
        columns={columns}
        data={attendees}
        keyField="ticketId"
        searchPlaceholder="Cari nama peserta, email, atau ID tiket..."
        searchFields={['name', 'email', 'ticketId', 'orderId', 'seat']}
        filterOptions={{
          key: 'checkInStatus',
          label: 'Semua Status Check-in',
          options: ['Checked In', 'Not Checked In'],
        }}
        onRowClick={handleRowClick}
      />

      {/* Attendee Detail View Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Detail Data Peserta"
        subtitle={selectedAttendee?.ticketId}
        width="max-w-md"
        footer={
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Tutup
          </button>
        }
      >
        {selectedAttendee && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-center space-y-1">
              <span className="font-mono text-base font-black text-kai-blue block">
                {selectedAttendee.ticketId}
              </span>
              <span className="text-slate-600 font-bold block">
                {selectedAttendee.ticketType}
              </span>
              <span className="inline-block mt-2">
                <StatusBadge status={selectedAttendee.checkInStatus} size="sm" />
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Lengkap:</span>
                <span className="font-bold text-slate-900">{selectedAttendee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-800">{selectedAttendee.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telepon:</span>
                <span className="text-slate-800">{selectedAttendee.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Kursi:</span>
                <span className="font-extrabold text-slate-900">{selectedAttendee.seat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono text-kai-blue">{selectedAttendee.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Beli:</span>
                <span className="text-slate-800">{selectedAttendee.purchaseDate}</span>
              </div>
              {selectedAttendee.checkInTime && (
                <div className="flex justify-between pt-1 border-t border-slate-100 text-emerald-700 font-semibold">
                  <span>Waktu Check-in:</span>
                  <span>{selectedAttendee.checkInTime}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
