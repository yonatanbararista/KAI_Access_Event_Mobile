import React from 'react';
import { formatIDR, formatNumber } from '../../utils/currency';
import { StatusBadge } from '../shared/StatusBadge';
import { Edit2, Copy, Trash2, Power, Users, Calendar, AlertCircle } from 'lucide-react';
import { getFeeUnitInfo } from '../../utils/feeCalculator';

export function TicketTierCard({
  ticket,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleStatus,
}) {
  const sold = ticket.sold || 0;
  const quota = ticket.quota || 0;
  const remaining = Math.max(0, quota - sold);
  const percentage = quota > 0 ? Math.min(100, Math.round((sold / quota) * 100)) : 0;
  const feeInfo = getFeeUnitInfo(ticket.price);

  // Determine progress bar color
  const progressColor =
    percentage >= 100
      ? 'bg-amber-500'
      : percentage >= 75
      ? 'bg-kai-orange'
      : 'bg-kai-blue';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {ticket.tier || 'Standard'}
            </span>
            <StatusBadge status={ticket.status || 'On Sale'} size="sm" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mt-1.5">{ticket.name}</h4>
          {ticket.description && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
              {ticket.description}
            </p>
          )}
        </div>

        {/* Price & Fee tag */}
        <div className="text-right shrink-0">
          <div className="text-lg font-extrabold text-slate-900">
            {formatIDR(ticket.price)}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
            Biaya layanan: <span className="text-slate-600 font-semibold">{feeInfo.rateDisplay}</span>
          </div>
        </div>
      </div>

      {/* Visual Quota Progress Bar */}
      <div className="mt-5 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            {formatNumber(sold)} / {formatNumber(quota)} terjual
          </span>
          <span className="font-bold text-slate-900">{percentage}%</span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} transition-all duration-500 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span>Tersisa: <strong className="text-slate-700">{formatNumber(remaining)} tiket</strong></span>
          <span>Batas: {ticket.minPurchase || 1} - {ticket.maxPurchase || 4} tiket/transaksi</span>
        </div>
      </div>

      {/* Sales Period and Perks */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Periode: <strong className="text-slate-700">{ticket.salesStart || '1 Sep'} – {ticket.salesEnd || '10 Okt'}</strong></span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(ticket)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-kai-blue hover:bg-blue-50 transition-colors"
            title="Edit Tiket"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDuplicate(ticket)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Duplikasi Tiket"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onToggleStatus(ticket)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="Ubah Status Tiket"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(ticket.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Hapus Tiket"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
