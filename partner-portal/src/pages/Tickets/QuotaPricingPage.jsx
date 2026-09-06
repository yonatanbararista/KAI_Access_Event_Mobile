import React, { useState } from 'react';
import {
  Ticket,
  Sliders,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Calendar,
  Lock,
  Unlock,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { formatIDR, formatNumber } from '../../utils/currency';
import { calculateServiceFee, getFeeUnitInfo } from '../../utils/feeCalculator';

export function QuotaPricingPage() {
  const { currentEvent, updateTicketTier } = usePartnerPortal();

  // Selected ticket for inline quick adjustment
  const [selectedTicketId, setSelectedTicketId] = useState(
    currentEvent?.tickets[0]?.id || null
  );

  const [adjustQuotaDelta, setAdjustQuotaDelta] = useState(100);
  const [newPriceInput, setNewPriceInput] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  const tickets = currentEvent?.tickets || [];
  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleIncreaseQuota = (amount) => {
    if (!activeTicket) return;
    const newQuota = (activeTicket.quota || 0) + amount;
    updateTicketTier(currentEvent.id, activeTicket.id, { quota: newQuota });
  };

  const handleApplyPriceChange = () => {
    if (!activeTicket || !newPriceInput) return;
    const p = Number(newPriceInput);
    if (p > 0) {
      updateTicketTier(currentEvent.id, activeTicket.id, { price: p });
      setNewPriceInput('');
    }
  };

  const handleToggleOpenClose = () => {
    if (!activeTicket) return;
    const nextStatus = activeTicket.status === 'On Sale' ? 'Closed' : 'On Sale';
    updateTicketTier(currentEvent.id, activeTicket.id, { status: nextStatus });
  };

  const handleUpdateSalesPeriod = () => {
    if (!activeTicket) return;
    const updates = {};
    if (newStartDate) updates.salesStart = newStartDate;
    if (newEndDate) updates.salesEnd = newEndDate;
    updateTicketTier(currentEvent.id, activeTicket.id, updates);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
          <span>Event:</span>
          <span className="text-kai-blue font-bold">{currentEvent.title}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Alokasi Kuota & Manajemen Harga (Quota & Pricing)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tampilan visual progres penjualan per tingkatan kuota tiket dengan kendali penyesuaian harga dan periode penjualan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Ticket Tiers matching Prompt Section 12 */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Tingkatan Kuota Tiket (Ticket Tiers)
            </h3>
            <span className="text-xs text-slate-500">
              Total {tickets.length} tier terdaftar
            </span>
          </div>

          <div className="space-y-3">
            {tickets.map((tkt) => {
              const sold = tkt.sold || 0;
              const quota = tkt.quota || 0;
              const remaining = Math.max(0, quota - sold);
              const percentage = quota > 0 ? Math.min(100, Math.round((sold / quota) * 100)) : 0;
              const isSelected = selectedTicketId === tkt.id;
              const feeInfo = getFeeUnitInfo(tkt.price);

              return (
                <div
                  key={tkt.id}
                  onClick={() => setSelectedTicketId(tkt.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer bg-white ${
                    isSelected
                      ? 'border-kai-blue shadow-md ring-4 ring-blue-50/80'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs uppercase tracking-wider text-kai-blue">
                          {tkt.tier}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tkt.status === 'On Sale'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tkt.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{tkt.name}</h4>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900">
                        {formatIDR(tkt.price)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">
                        {formatNumber(quota)} quota
                      </div>
                    </div>
                  </div>

                  {/* Visual ASCII / Progress Bar matching prompt */}
                  <div className="mt-4 space-y-2">
                    {/* Visual Bar */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentage >= 100
                            ? 'bg-amber-500'
                            : percentage >= 80
                            ? 'bg-kai-orange'
                            : 'bg-kai-blue'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Numbers */}
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800">
                        <strong>{formatNumber(sold)}</strong> / {formatNumber(quota)} sold
                      </span>
                      <span className="text-slate-500">
                        {percentage}% • Sisa: <strong className="text-emerald-700">{formatNumber(remaining)} tiket</strong>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Periode: {tkt.salesStart} – {tkt.salesEnd}</span>
                      <span>Fee KAI: {feeInfo.rateDisplay}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Simulation Controls matching Prompt */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 sticky top-20">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-kai-blue uppercase">
                <Sliders className="w-4 h-4" />
                <span>Simulasi Kendali Tier</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeTicket ? activeTicket.name : 'Pilih Tier'}
              </h3>
              <p className="text-xs text-slate-500">
                Ubah alokasi kuota secara dinamis, sesuaikan harga, atau tutup/buka penjualan.
              </p>
            </div>

            {activeTicket && (
              <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                {/* 1. Increase Quota Simulation */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-700 block">
                    1. Tambah Alokasi Kuota Tiket
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Kuota saat ini: <strong className="text-slate-900">{activeTicket.quota} tiket</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIncreaseQuota(50)}
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-kai-blue border border-slate-200 rounded-lg font-bold text-slate-700 transition-colors"
                    >
                      +50 Kuota
                    </button>
                    <button
                      onClick={() => handleIncreaseQuota(100)}
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-kai-blue border border-slate-200 rounded-lg font-bold text-slate-700 transition-colors"
                    >
                      +100 Kuota
                    </button>
                    <button
                      onClick={() => handleIncreaseQuota(500)}
                      className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 hover:text-kai-blue border border-slate-200 rounded-lg font-bold text-slate-700 transition-colors"
                    >
                      +500 Kuota
                    </button>
                  </div>
                </div>

                {/* 2. Changing Price Simulation */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-700 block">
                    2. Sesuaikan Harga Tiket
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Harga saat ini: <strong className="text-slate-900">{formatIDR(activeTicket.price)}</strong>
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="10000"
                      value={newPriceInput}
                      onChange={(e) => setNewPriceInput(e.target.value)}
                      placeholder="Harga baru (Rp)..."
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900"
                    />
                    <button
                      onClick={handleApplyPriceChange}
                      className="px-3 py-1.5 bg-kai-blue hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shrink-0"
                    >
                      Terapkan
                    </button>
                  </div>
                </div>

                {/* 3. Sales Period Simulation */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-700 block">
                    3. Ubah Periode Penjualan
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Mulai</span>
                      <input
                        type="date"
                        value={newStartDate || activeTicket.salesStart}
                        onChange={(e) => setNewStartDate(e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Selesai</span>
                      <input
                        type="date"
                        value={newEndDate || activeTicket.salesEnd}
                        onChange={(e) => setNewEndDate(e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-[11px]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleUpdateSalesPeriod}
                    className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors mt-1"
                  >
                    Simpan Periode
                  </button>
                </div>

                {/* 4. Opening / Closing Ticket Sales */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="font-bold text-slate-700 block">
                    4. Buka / Tutup Penjualan Tier Ini
                  </label>
                  <button
                    onClick={handleToggleOpenClose}
                    className={`w-full py-2 px-3 rounded-lg font-extrabold flex items-center justify-center gap-2 transition-all ${
                      activeTicket.status === 'On Sale'
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {activeTicket.status === 'On Sale' ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Tutup Sementara Penjualan</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Buka Penjualan Tiket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
