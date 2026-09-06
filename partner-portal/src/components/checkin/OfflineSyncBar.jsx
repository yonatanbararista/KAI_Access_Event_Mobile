import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';

export function OfflineSyncBar() {
  const {
    isOfflineMode,
    toggleOfflineMode,
    pendingOfflineScans,
    isSyncing,
    syncStatusText,
    syncOfflineScans,
  } = usePartnerPortal();

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-200 ${
        isOfflineMode
          ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm'
          : 'bg-white border-slate-200 text-slate-800 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isOfflineMode
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOfflineMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                }`}
              />
              <span className="font-extrabold text-sm">
                {isOfflineMode ? 'Offline Mode Aktif' : 'Sistem Online & Terhubung'}
              </span>
              {pendingOfflineScans.length > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-amber-200 text-amber-900">
                  {pendingOfflineScans.length} scan tertunda
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-0.5">
              {isOfflineMode
                ? 'Data scan tiket disimpan di memori lokal peramban dan akan disinkronkan saat kembali online.'
                : 'Pemeriksaan tiket terverifikasi langsung dengan data pusat acara.'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {/* Sync status text badge */}
          {syncStatusText && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-kai-blue font-bold text-xs rounded-lg animate-fadeIn">
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{syncStatusText}</span>
            </div>
          )}

          {/* Sync Button if pending scans exist and online */}
          {!isOfflineMode && pendingOfflineScans.length > 0 && !isSyncing && (
            <button
              onClick={syncOfflineScans}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkron Sekarang</span>
            </button>
          )}

          {/* Mode Toggle Button */}
          <button
            onClick={toggleOfflineMode}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
              isOfflineMode
                ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {isOfflineMode ? 'Matikan Mode Offline' : 'Simulasikan Mode Offline'}
          </button>
        </div>
      </div>
    </div>
  );
}
