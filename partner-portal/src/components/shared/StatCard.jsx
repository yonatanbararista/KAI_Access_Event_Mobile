import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // e.g. { value: '+12.4%', isPositive: true, label: 'vs minggu lalu' }
  highlightColor = 'blue', // 'blue' | 'orange' | 'emerald' | 'amber' | 'purple'
  onClick,
}) {
  const colorStyles = {
    blue: {
      bgIcon: 'bg-blue-50 text-kai-blue',
      border: 'hover:border-blue-300',
      glow: 'group-hover:shadow-blue-50',
    },
    orange: {
      bgIcon: 'bg-orange-50 text-kai-orange',
      border: 'hover:border-orange-300',
      glow: 'group-hover:shadow-orange-50',
    },
    emerald: {
      bgIcon: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-300',
      glow: 'group-hover:shadow-emerald-50',
    },
    amber: {
      bgIcon: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-300',
      glow: 'group-hover:shadow-amber-50',
    },
    purple: {
      bgIcon: 'bg-indigo-50 text-indigo-600',
      border: 'hover:border-indigo-300',
      glow: 'group-hover:shadow-indigo-50',
    },
  }[highlightColor] || {
    bgIcon: 'bg-blue-50 text-kai-blue',
    border: 'hover:border-blue-300',
    glow: 'group-hover:shadow-blue-50',
  };

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
      } ${colorStyles.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${colorStyles.bgIcon} shrink-0 transition-transform group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-bold text-[11px] ${
                  trend.isPositive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {trend.value}
              </span>
              {trend.label && (
                <span className="text-slate-400 text-[11px]">{trend.label}</span>
              )}
            </div>
          )}
          {subtitle && (
            <span className="text-slate-500 text-[11px] font-medium ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
