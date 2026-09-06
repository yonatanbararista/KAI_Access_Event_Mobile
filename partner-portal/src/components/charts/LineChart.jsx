import React, { useState } from 'react';
import { formatNumber } from '../../utils/currency';

export function LineChart({
  data = [
    { label: '01 Sep', value: 340 },
    { label: '02 Sep', value: 480 },
    { label: '03 Sep', value: 620 },
    { label: '04 Sep', value: 590 },
    { label: '05 Sep', value: 890 },
    { label: '06 Sep', value: 1120 },
    { label: '07 Sep', value: 1420 },
  ],
  height = 240,
  strokeColor = '#1A56DB',
  fillColor = '#EFF6FF',
  unit = 'tiket',
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) return null;

  const paddingX = 40;
  const paddingY = 30;
  const width = 600;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const minVal = 0;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        style={{ maxHeight: height }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = height - paddingY - ratio * (height - paddingY * 2);
          const gridVal = Math.round(minVal + ratio * (maxVal - minVal));
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
                {gridVal > 1000 ? `${(gridVal / 1000).toFixed(1)}k` : gridVal}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#lineGrad)" />

        {/* Line stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points & Interactive hovers */}
        {points.map((p, i) => (
          <g key={i} className="cursor-pointer">
            {/* Guide line when hovered */}
            {hoverIndex === i && (
              <line
                x1={p.x}
                y1={paddingY}
                x2={p.x}
                y2={height - paddingY}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            )}

            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 6 : 4}
              className={`transition-all duration-150 ${
                hoverIndex === i
                  ? 'fill-kai-orange stroke-white stroke-2'
                  : 'fill-white stroke-kai-blue stroke-2'
              }`}
            />

            {/* Invisible large hit target */}
            <circle
              cx={p.x}
              cy={p.y}
              r={20}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />

            {/* X-axis label */}
            <text
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              className={`text-[11px] font-medium transition-colors ${
                hoverIndex === i ? 'fill-slate-900 font-bold' : 'fill-slate-400'
              }`}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating HTML tooltip */}
      {hoverIndex !== null && points[hoverIndex] && (
        <div
          className="absolute z-10 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900/90 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-150"
          style={{
            left: `${(points[hoverIndex].x / width) * 100}%`,
            top: `${(points[hoverIndex].y / height) * 100}%`,
          }}
        >
          <div className="text-[10px] text-slate-300 font-normal">{points[hoverIndex].label}</div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-kai-orange"></span>
            <span className="text-white font-bold">{formatNumber(points[hoverIndex].value)} {unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}
