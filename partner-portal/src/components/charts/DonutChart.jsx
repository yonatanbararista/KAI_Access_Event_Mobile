import React, { useState } from 'react';
import { formatNumber } from '../../utils/currency';

export function DonutChart({
  data = [
    { label: 'VIP Pass', value: 284, color: '#FF7A00' },
    { label: 'VVIP Royal', value: 96, color: '#D97706' },
    { label: 'Normal Standard', value: 720, color: '#1A56DB' },
    { label: 'Presale Regular', value: 620, color: '#38289F' },
    { label: 'Early Bird', value: 420, color: '#10B981' },
  ],
  size = 180,
  strokeWidth = 24,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = -90;

  const slices = data.map((item) => {
    const percentage = item.value / total;
    const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
    const angle = accumulatedAngle;
    accumulatedAngle += percentage * 360;

    return {
      ...item,
      percentage: Math.round(percentage * 100),
      strokeDasharray,
      angle,
    };
  });

  const activeSlice = hoverIndex !== null ? slices[hoverIndex] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
      {/* SVG Donut */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="transform -rotate-90 overflow-visible"
        >
          {slices.map((slice, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={hoverIndex === i ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={-circumference * (slices.slice(0, i).reduce((acc, curr) => acc + curr.value, 0) / total)}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11px] font-medium text-slate-400">
            {activeSlice ? activeSlice.label : 'Total Tiket'}
          </span>
          <span className="text-base font-bold text-slate-900">
            {activeSlice ? `${activeSlice.percentage}%` : formatNumber(total)}
          </span>
          {activeSlice && (
            <span className="text-[10px] text-slate-500 font-medium">
              {formatNumber(activeSlice.value)} tiket
            </span>
          )}
        </div>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-1.5 w-full sm:w-auto min-w-[160px]">
        {slices.map((slice, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`flex items-center justify-between text-xs py-1 px-2 rounded-md transition-colors cursor-pointer ${
              hoverIndex === i ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-slate-700 truncate max-w-[110px]">{slice.label}</span>
            </div>
            <span className="text-slate-500 font-medium ml-3">
              {slice.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
