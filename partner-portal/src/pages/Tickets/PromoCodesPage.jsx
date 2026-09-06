import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Search,
  Power,
  Trash2,
  Edit2,
  Calendar,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Modal } from '../../components/shared/Modal';
import { formatIDR, formatNumber } from '../../utils/currency';

export function PromoCodesPage() {
  const { promoCodes, addPromoCode, togglePromoStatus, deletePromoCode } = usePartnerPortal();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage', // 'percentage' | 'fixed'
    value: 20,
    maxDiscount: 100000,
    minPurchase: 200000,
    quota: 250,
    startDate: '2026-09-01',
    endDate: '2026-10-31',
    applicableTickets: 'Semua Tiket',
  });

  const filteredCodes = promoCodes.filter((p) =>
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!formData.code.trim()) return;
    addPromoCode({
      ...formData,
      code: formData.code.toUpperCase().replace(/\s+/g, ''),
    });
    setIsModalOpen(false);
    setFormData({
      code: '',
      type: 'percentage',
      value: 20,
      maxDiscount: 100000,
      minPurchase: 200000,
      quota: 250,
      startDate: '2026-09-01',
      endDate: '2026-10-31',
      applicableTickets: 'Semua Tiket',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Kode Promo & Voucher (Promo Codes)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola kupon diskon persentase dan potongan nominal tetap untuk meningkatkan penjualan tiket.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kode Promo</span>
        </button>
      </div>

      {/* Search toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kode promo..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
          />
        </div>
      </div>

      {/* Promo Cards Grid matching Section 14 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCodes.map((promo) => {
          const used = promo.usedCount || 0;
          const quota = promo.quota || 0;
          const pct = quota > 0 ? Math.min(100, Math.round((used / quota) * 100)) : 0;

          return (
            <div
              key={promo.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-base font-extrabold text-slate-900 tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    {promo.code}
                  </span>
                  <div className="text-sm font-black text-kai-orange mt-2">
                    {promo.type === 'percentage'
                      ? `${promo.value}% OFF`
                      : `${formatIDR(promo.value)} OFF`}
                  </div>
                </div>

                <StatusBadge status={promo.status} size="sm" />
              </div>

              {/* Usage Progress matching Section 14 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Terpakai</span>
                  <span className="text-slate-900 font-bold">
                    {used} / {quota} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-kai-blue rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Maks. Potongan:</span>
                  <strong className="text-slate-800">{formatIDR(promo.maxDiscount)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Min. Belanja:</span>
                  <strong className="text-slate-800">{formatIDR(promo.minPurchase)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Masa Berlaku:</span>
                  <span className="text-slate-700">{promo.startDate} s/d {promo.endDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => togglePromoStatus(promo.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    promo.status === 'Active'
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  }`}
                >
                  {promo.status === 'Active' ? 'Nonaktifkan' : 'Aktifkan'}
                </button>

                <button
                  onClick={() => deletePromoCode(promo.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Hapus Promo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Promo Code Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buat Kode Promo Baru"
        subtitle="Atur persentase diskon, kuota pemakaian, dan batas minimum transaksi."
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
              form="promoForm"
              className="px-4 py-2 text-xs font-semibold text-white bg-kai-blue hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Simpan Kode Promo
            </button>
          </>
        }
      >
        <form id="promoForm" onSubmit={handleCreatePromo} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kode Promo (Uppercase)
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="Contoh: MERDEKA50"
              className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipe Diskon
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Nominal Tetap (Rp)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nilai Diskon ({formData.type === 'percentage' ? '%' : 'Rp'})
              </label>
              <input
                type="number"
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Maksimal Potongan (Rp)
              </label>
              <input
                type="number"
                value={formData.maxDiscount}
                onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Batas Kuota Pemakaian
              </label>
              <input
                type="number"
                value={formData.quota}
                onChange={(e) => setFormData({ ...formData, quota: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Mulai Berlaku
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Berakhir
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
