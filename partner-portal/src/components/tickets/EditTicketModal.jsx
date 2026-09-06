import React, { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { formatIDR } from '../../utils/currency';
import { calculateServiceFee, getFeeUnitInfo } from '../../utils/feeCalculator';

export function EditTicketModal({
  isOpen,
  onClose,
  ticket,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Normal',
    price: 250000,
    quota: 1000,
    salesStart: '2026-09-01',
    salesEnd: '2026-10-10',
    minPurchase: 1,
    maxPurchase: 4,
    description: '',
    status: 'On Sale',
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        name: ticket.name || '',
        tier: ticket.tier || 'Normal',
        price: ticket.price || 0,
        quota: ticket.quota || 0,
        salesStart: ticket.salesStart || '2026-09-01',
        salesEnd: ticket.salesEnd || '2026-10-10',
        minPurchase: ticket.minPurchase || 1,
        maxPurchase: ticket.maxPurchase || 4,
        description: ticket.description || '',
        status: ticket.status || 'On Sale',
      });
    }
  }, [ticket]);

  const feeInfo = getFeeUnitInfo(formData.price);
  const feeAmount = calculateServiceFee(formData.price, 1);
  const netEstimated = Math.max(0, formData.price - feeAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ticket ? 'Edit Kategori Tiket' : 'Tambah Kategori Tiket'}
      subtitle="Atur kuota, harga, dan periode penjualan tiket secara real-time"
      maxWidth="max-w-lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-xs font-semibold text-white bg-kai-blue hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            Simpan Perubahan
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tier & Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tier Tiket
            </label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue"
            >
              <option value="Early Bird">Early Bird</option>
              <option value="Presale">Presale</option>
              <option value="Normal">Normal</option>
              <option value="VIP">VIP</option>
              <option value="VVIP">VVIP</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Tiket
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: VIP Pass Day 1"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue"
            />
          </div>
        </div>

        {/* Price & Quota */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Harga Satuan (Rp)
            </label>
            <input
              type="number"
              min="0"
              step="5000"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Total Kuota Tiket
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.quota}
              onChange={(e) =>
                setFormData({ ...formData, quota: Number(e.target.value) })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue font-semibold"
            />
          </div>
        </div>

        {/* Dynamic Service Fee Simulation Card */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span>Biaya Layanan KAI ({feeInfo.rateDisplay}):</span>
            <span className="font-bold text-slate-900">{formatIDR(feeAmount)} / tiket</span>
          </div>
          <div className="flex items-center justify-between text-slate-700 pt-1 border-t border-blue-200/60 font-medium">
            <span>Estimasi Diterima Promotor (Net):</span>
            <span className="font-extrabold text-emerald-700">{formatIDR(netEstimated)} / tiket</span>
          </div>
          <p className="text-[10px] text-slate-500 pt-1">
            *Dihitung berdasarkan aturan otomatis portal: &lt; Rp 110.000 (flat Rp 7.000), &ge; Rp 110.000 (3%).
          </p>
        </div>

        {/* Sales Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mulai Penjualan
            </label>
            <input
              type="date"
              value={formData.salesStart}
              onChange={(e) =>
                setFormData({ ...formData, salesStart: e.target.value })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Akhir Penjualan
            </label>
            <input
              type="date"
              value={formData.salesEnd}
              onChange={(e) =>
                setFormData({ ...formData, salesEnd: e.target.value })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue"
            />
          </div>
        </div>

        {/* Purchase Limits & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Min. Pembelian
            </label>
            <input
              type="number"
              min="1"
              value={formData.minPurchase}
              onChange={(e) =>
                setFormData({ ...formData, minPurchase: Number(e.target.value) })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Maks. Pembelian
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxPurchase}
              onChange={(e) =>
                setFormData({ ...formData, maxPurchase: Number(e.target.value) })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Status Penjualan
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            >
              <option value="On Sale">On Sale</option>
              <option value="Sold Out">Sold Out</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Keterangan & Fasilitas Tiket
          </label>
          <textarea
            rows="2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Contoh: Akses panggung festival, free exclusive lanyard, gate fast-track."
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kai-blue/20"
          />
        </div>
      </form>
    </Modal>
  );
}
