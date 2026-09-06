import React, { useState } from 'react';
import { formatCompactIDR, formatIDR } from '../../utils/currency';

export function AreaBarChart({
  data = [
    { label: '01 Sep', value: 85000000 },
    { label: '02 Sep', value: 120000000 },
    { label: '03 Sep', value: 155000000 },
    { label: '04 Sep', value: 140000000 },
    { label: '05 Sep', value: 230000000 },
    { label: '06 Sep', value: 295000000 },
    { label: '07 Sep', value: 380000000 },
  ],
  height = 240,
  barColor = '#1A56DB',
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const chartHeight = height - paddingY * 2;
  const availableWidth = width - paddingX * 2;
  const barWidth = Math.min(36, (availableWidth / data.length) * 0.6);
  const step = availableWidth / data.length;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241A78" />
            <stop offset="100%" stopColor="#1A56DB" />
          </linearGradient>
          <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = height - paddingY - ratio * chartHeight;
          const gridVal = maxVal * ratio;
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingX - 8}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {formatCompactIDR(gridVal)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = Math.max(4, (d.value / maxVal) * chartHeight);
          const x = paddingX + i * step + (step - barWidth) / 2;
          const y = height - paddingY - barH;
          const isHovered = hoverIndex === i;

          return (
            <g
              key={i}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Highlight background column */}
              {isHovered && (
                <rect
                  x={paddingX + i * step}
                  y={paddingY}
                  width={step}
                  height={chartHeight}
                  fill="#EFF6FF"
                  rx="4"
                />
              )}

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx="4"
                fill={isHovered ? 'url(#barGradHover)' : 'url(#barGrad)'}
                className="transition-all duration-200"
              />

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className={`text-[11px] font-medium transition-colors ${
                  isHovered ? 'fill-slate-900 font-bold' : 'fill-slate-400'
                }`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          className="absolute z-10 px-3 py-2 text-xs font-semibold text-white bg-slate-900/95 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-150"
          style={{
            left: `${((paddingX + hoverIndex * step + step / 2) / width) * 100}%`,
            top: `${((height - paddingY - (data[hoverIndex].value / maxVal) * chartHeight) / height) * 100}%`,
          }}
        >
          <div className="text-[10px] text-slate-300 font-normal">{data[hoverIndex].label}</div>
          <div className="text-amber-400 font-bold text-sm">
            {formatIDR(data[hoverIndex].value)}
          </div>
        </div>
      )}
    </div>
  );
}
