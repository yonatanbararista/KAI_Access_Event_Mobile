import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Star,
  Check,
  CreditCard,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { Modal } from '../../components/shared/Modal';

export function BankAccountPage() {
  const {
    bankAccounts,
    addBankAccount,
    setPrimaryBankAccount,
    deleteBankAccount,
  } = usePartnerPortal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bank: 'BCA',
    accountName: 'PT KREASI MUSIK NUSANTARA',
    accountNumber: '',
    branch: 'Jakarta',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.accountNumber.trim()) return;
    addBankAccount(formData);
    setIsModalOpen(false);
    setFormData({
      bank: 'BCA',
      accountName: 'PT KREASI MUSIK NUSANTARA',
      accountNumber: '',
      branch: 'Jakarta',
    });
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Rekening Bank Promotor (Bank Accounts)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar rekening bank penerima pencairan dana (payout) yang telah terverifikasi oleh KAI.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Rekening Baru</span>
        </button>
      </div>

      {/* Bank Account Cards Grid matching Section 28 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bankAccounts.map((b) => (
          <div
            key={b.id}
            className={`p-6 rounded-2xl border-2 transition-all bg-white space-y-4 shadow-sm relative ${
              b.isPrimary
                ? 'border-kai-blue ring-4 ring-blue-50/80'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-kai-blue to-indigo-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  {b.bank}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{b.bank}</h3>
                  <span className="text-xs text-slate-400 font-medium">{b.branch}</span>
                </div>
              </div>

              {/* Status pill */}
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>✓ Verified</span>
              </span>
            </div>

            {/* Account Details matching Section 28 */}
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Account Name
                </span>
                <span className="font-bold text-slate-900">{b.accountName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Account Number
                </span>
                <span className="font-mono text-sm font-extrabold text-slate-900 tracking-wider">
                  {b.maskedNumber || b.accountNumber}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              {b.isPrimary ? (
                <span className="text-kai-blue font-extrabold flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-kai-blue" />
                  <span>Rekening Utama (Primary)</span>
                </span>
              ) : (
                <button
                  onClick={() => setPrimaryBankAccount(b.id)}
                  className="font-bold text-slate-600 hover:text-kai-blue"
                >
                  Jadikan Rekening Utama
                </button>
              )}

              {!b.isPrimary && (
                <button
                  onClick={() => deleteBankAccount(b.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Hapus Rekening"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Bank Account Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Rekening Bank Baru"
        subtitle="Pastikan nama pemilik rekening sama dengan nama badan usaha terdaftar."
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
              form="bankForm"
              className="px-4 py-2 text-xs font-semibold text-white bg-kai-blue hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Simpan Rekening
            </button>
          </>
        }
      >
        <form id="bankForm" onSubmit={handleCreate} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Pilihan Bank
            </label>
            <select
              value={formData.bank}
              onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
            >
              <option value="BCA">BCA (Bank Central Asia)</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="BNI">BNI (Bank Negara Indonesia)</option>
              <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
              <option value="CIMB Niaga">CIMB Niaga</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              required
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor Rekening
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: 8830198211"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Kantor Cabang
            </label>
            <input
              type="text"
              placeholder="Contoh: KCU Thamrin Jakarta"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
