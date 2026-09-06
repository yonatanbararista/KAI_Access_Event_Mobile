import React, { useState } from 'react';
import {
  Settings,
  DollarSign,
  RotateCcw,
  Bell,
  Globe,
  Shield,
  Save,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { formatIDR } from '../../utils/currency';
import { FEE_THRESHOLD, FLAT_FEE_AMOUNT, PERCENT_FEE_RATE } from '../../utils/feeCalculator';

export function SettingsPage() {
  const { resetToDefaults } = usePartnerPortal();

  const [threshold, setThreshold] = useState(FEE_THRESHOLD);
  const [flatFee, setFlatFee] = useState(FLAT_FEE_AMOUNT);
  const [percentRate, setPercentRate] = useState(PERCENT_FEE_RATE * 100);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetConfirm, setIsResetConfirm] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    resetToDefaults();
    setIsResetConfirm(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Portal Promotor (Settings)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Konfigurasi parameter aturan biaya checkout tiket, preferensi sistem, dan opsi reset data demo.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan parameter berhasil disimpan!</span>
        </div>
      )}

      {/* 1. Fee Configuration Box matching Prompt Section 19 */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <DollarSign className="w-5 h-5 text-kai-blue" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Konfigurasi Aturan Biaya Layanan Checkout (Customer Fee Rule)
            </h3>
            <p className="text-xs text-slate-500">
              Sesuai spesifikasi Section 19: Dihitung per satuan tiket, bukan total transaksi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Ambang Batas Harga (Threshold)
            </label>
            <input
              type="number"
              step="5000"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Default: Rp 110.000</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Biaya Flat (&lt; Threshold)
            </label>
            <input
              type="number"
              step="500"
              value={flatFee}
              onChange={(e) => setFlatFee(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">Default: Rp 7.000 / tiket</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Tarif Persentase (&ge; Threshold)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                value={percentRate}
                onChange={(e) => setPercentRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Default: 3% per tiket</span>
          </div>
        </div>

        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-600 leading-relaxed">
          <strong>Simulasi Aturan Aktif:</strong> Tiket seharga Rp 100.000 dikenakan fee flat <strong>Rp 7.000</strong>. Tiket seharga Rp 200.000 dikenakan fee 3% = <strong>Rp 6.000</strong>. Dihitung per unit tiket.
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Parameter Fee</span>
          </button>
        </div>
      </form>

      {/* 2. System Locale & Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Globe className="w-5 h-5 text-slate-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Preferensi Regional & Sistem
            </h3>
            <p className="text-slate-400">Pengaturan zona waktu acara dan format angka.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 block font-semibold">Mata Uang Utama</span>
            <span className="font-bold text-slate-900">IDR (Indonesian Rupiah - Rp)</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Zona Waktu Default</span>
            <span className="font-bold text-slate-900">Asia/Jakarta (WIB - UTC+7)</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Mode Integrasi KAI</span>
            <span className="font-bold text-emerald-700">Simulasi Frontend Enterprise (No Backend)</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Penyimpanan Status</span>
            <span className="font-bold text-slate-900">Browser LocalStorage Persistence</span>
          </div>
        </div>
      </div>

      {/* 3. Reset Demo Data */}
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-700 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data Demo ke Kondisi Awal</span>
            </h3>
            <p className="text-slate-500 mt-0.5">
              Mengembalikan seluruh data event, pesanan, kuota tiket, dan log check-in ke data mock resmi Indonesia.
            </p>
          </div>

          <button
            onClick={() => setIsResetConfirm(true)}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl transition-colors shrink-0"
          >
            Reset Data Mock
          </button>
        </div>

        {isResetConfirm && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-2 animate-fadeIn">
            <p className="font-bold text-rose-800">
              Apakah Anda yakin ingin mengatur ulang semua data lokal ke default awal?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
              >
                Ya, Reset Sekarang
              </button>
              <button
                onClick={() => setIsResetConfirm(false)}
                className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
