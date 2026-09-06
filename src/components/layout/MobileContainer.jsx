import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export const MobileContainer = ({ children }) => {
  const [deviceFrame, setDeviceFrame] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Top desktop helper toolbar */}
      <aside aria-label="Device simulation toolbar" className="hidden sm:flex items-center justify-between w-full max-w-[420px] mb-3 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono font-medium text-slate-300">iPhone 13 • 390 × 844 px</span>
        </div>
        <button
          onClick={() => setDeviceFrame(!deviceFrame)}
          className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md text-[11px] transition-colors"
        >
          {deviceFrame ? <Smartphone size={13} /> : <Monitor size={13} />}
          <span>{deviceFrame ? 'Frame: ON' : 'Frame: OFF'}</span>
        </button>
      </aside>

      {/* Main Container */}
      <div
        className={`w-full bg-white relative flex flex-col transition-all duration-300 ${
          deviceFrame
            ? 'sm:w-[390px] sm:min-h-[844px] sm:max-w-[390px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[10px] sm:border-slate-800 overflow-hidden'
            : 'sm:w-[480px] sm:min-h-screen sm:rounded-2xl sm:shadow-2xl overflow-hidden'
        }`}
      >
        {/* Dynamic Island / iPhone Speaker notch for frame mode */}
        {deviceFrame && (
          <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-800 rounded-b-2xl z-50 items-center justify-center pointer-events-none">
            <div className="w-12 h-1 bg-slate-700 rounded-full mb-1" />
            <div className="w-3 h-3 bg-slate-900 rounded-full ml-3 mb-1 border border-slate-700/50" />
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 flex flex-col w-full relative bg-slate-50 min-h-screen sm:min-h-full">
          {children}
        </div>

        {/* iOS Home indicator bar */}
        <div className="w-full flex justify-center py-1.5 bg-white shrink-0 pointer-events-none">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
