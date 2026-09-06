import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Send,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Modal } from '../../components/shared/Modal';
import { formatCompactIDR, formatIDR } from '../../utils/currency';

export function PayoutPage() {
  const { payoutRecords, requestPayout, bankAccounts, currentEvent } = usePartnerPortal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestAmount, setRequestAmount] = useState(500000000);

  const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (requestAmount > 0) {
      requestPayout(requestAmount, currentEvent.title);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pencairan Dana (Payout)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar riwayat transfer pencairan hasil penjualan tiket ke rekening bank resmi promotor.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ajukan Pencairan Dana</span>
        </button>
      </div>

      {/* Primary Bank Notice Card */}
      {primaryBank && (
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
              {primaryBank.bank}
            </div>
            <div>
              <span className="text-[10px] text-kai-blue font-bold uppercase tracking-wider block">
                Rekening Pencairan Utama
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {primaryBank.accountName}
              </span>
              <span className="text-slate-500 block font-mono">
                {primaryBank.maskedNumber} • {primaryBank.branch}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terverifikasi KAI</span>
          </span>
        </div>
      )}

      {/* Payout Records Table matching Section 21 */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">
            Daftar Pengajuan & Jadwal Payout
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {payoutRecords.length} catatan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">ID Payout</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3 text-right">Gross Sales</th>
                <th className="px-4 py-3 text-right">Potongan</th>
                <th className="px-4 py-3 text-right">Net Payout</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Estimasi Tanggal</th>
                <th className="px-4 py-3">Rekening Tujuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payoutRecords.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-kai-blue whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 truncate max-w-[180px]">
                    {p.event}
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-600 whitespace-nowrap">
                    {formatIDR(p.grossSales)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-rose-600 whitespace-nowrap">
                    -{formatIDR(p.deductions)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-black text-slate-900 whitespace-nowrap">
                    {formatIDR(p.netPayout)}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap font-medium text-slate-600">
                    {p.payoutDate}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{p.bankName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.accountNumber}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Payout Simulation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajukan Pencairan Dana Payout"
        subtitle="Dana akan dicairkan ke rekening bank utama promotor setelah verifikasi."
        maxWidth="max-w-md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              form="payoutForm"
              className="px-4 py-2 text-xs font-semibold text-white bg-kai-blue hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Kirim Pengajuan
            </button>
          </>
        }
      >
        <form id="payoutForm" onSubmit={handleCreateRequest} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Event Terkait
            </label>
            <input
              type="text"
              readOnly
              value={currentEvent.title}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg font-medium text-slate-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nominal Pengajuan (Rp)
            </label>
            <input
              type="number"
              min="1000000"
              step="1000000"
              required
              value={requestAmount}
              onChange={(e) => setRequestAmount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Estimasi Potongan Administrasi (4%):</span>
              <span className="font-semibold text-rose-600">
                -{formatIDR(Math.round(requestAmount * 0.04))}
              </span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
              <span>Estimasi Bersih Diterima:</span>
              <span className="text-emerald-700">
                {formatIDR(Math.round(requestAmount * 0.96))}
              </span>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
