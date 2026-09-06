import React from 'react';

export function StatusBadge({ status, size = 'md' }) {
  if (!status) return null;

  const statusMap = {
    // Event Statuses
    'On Sale': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'Published': { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    'Draft': { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' },
    'Sold Out': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    'Ongoing': { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
    'Completed': { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
    'Cancelled': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },

    // Payment Statuses
    'Paid': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'Pending': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    'Failed': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
    'Expired': { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
    'Refunded': { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },

    // Check-in Statuses
    'Checked In': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'Not Checked In': { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },

    // Payout Statuses
    'Scheduled': { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    'Processing': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },

    // Promo / Team / Generic
    'Active': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'Disabled': { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
    'Verified': { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    'Invited': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },

    // Seating states
    'Available': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'Sold': { bg: 'bg-slate-100 text-slate-700 border-slate-300', dot: 'bg-slate-500' },
    'Reserved': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    'Blocked': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
  };

  const current = statusMap[status] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
  };

  const sizeClass =
    size === 'sm'
      ? 'px-2 py-0.5 text-[10px] gap-1'
      : size === 'lg'
      ? 'px-3 py-1.5 text-xs gap-2'
      : 'px-2.5 py-1 text-[11px] gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${current.bg} ${sizeClass} transition-colors whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot} shrink-0`} />
      <span>{status}</span>
    </span>
  );
}
