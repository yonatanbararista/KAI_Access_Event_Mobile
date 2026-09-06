import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Ticket,
  MapPin,
  Camera,
  Search,
  Sparkles,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';

export function ScannerSimulation() {
  const { simulateCheckIn, isOfflineMode, attendees } = usePartnerPortal();
  const [ticketInput, setTicketInput] = useState('');
  const [lastScanResult, setLastScanResult] = useState(null);

  const handleScan = (e) => {
    if (e) e.preventDefault();
    if (!ticketInput.trim()) return;

    const result = simulateCheckIn(ticketInput);
    setLastScanResult(result);
  };

  const handleQuickSelect = (id) => {
    setTicketInput(id);
    const result = simulateCheckIn(id);
    setLastScanResult(result);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Scan className="w-5 h-5 text-kai-blue" />
          <span>Simulasi Pemindai Tiket (QR / Barcode Scanner)</span>
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Simulasikan proses validasi tiket masuk di pintu masuk (gate). Masukkan ID tiket atau klik salah satu tiket contoh di bawah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Camera Scanner Viewfinder Simulation */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[340px] text-white relative overflow-hidden shadow-inner border border-slate-800">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Scanning Box Reticle */}
          <div className="relative w-56 h-56 border-2 border-dashed border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center p-4">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>

            {/* Red Laser Sweep Line Animation */}
            <div className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_#f43f5e] animate-bounce top-1/2 -translate-y-1/2"></div>

            <QrCode className="w-20 h-20 text-slate-600 opacity-60" />
            <div className="text-[10px] text-slate-400 font-medium mt-3 text-center">
              Arahkan kamera ke QR tiket peserta
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <Camera className="w-3.5 h-3.5" />
            <span>Kamera Siap • Mode Simulasi Frontend</span>
          </div>
        </div>

        {/* Right Side: Manual Input & Scan Results */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <form onSubmit={handleScan} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Input Kode / ID Tiket Manual
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
                  placeholder="Contoh: EVT-92831"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kai-blue/20 focus:border-kai-blue font-mono font-bold tracking-wider uppercase text-slate-900"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Scan className="w-4 h-4" />
                <span>Scan Tiket</span>
              </button>
            </div>

            {/* Preset Ticket Chips for testing */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">
                Pilih Sampel Tiket untuk Pengujian:
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickSelect('EVT-92831')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-kai-blue border border-slate-200 text-slate-700 font-mono font-semibold transition-colors"
                >
                  EVT-92831 (Andi / VIP)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect('EVT-92826')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-kai-blue border border-slate-200 text-slate-700 font-mono font-semibold transition-colors"
                >
                  EVT-92826 (Siti / Reguler)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect('EVT-92823')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-kai-blue border border-slate-200 text-slate-700 font-mono font-semibold transition-colors"
                >
                  EVT-92823 (Reza / VVIP)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect('INV-99999')}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-mono font-semibold transition-colors"
                >
                  INV-99999 (Tiket Palsu)
                </button>
              </div>
            </div>
          </form>

          {/* Result Banner matching Prompt Section 25 */}
          <div className="flex-1 min-h-[160px] flex items-center">
            {lastScanResult ? (
              lastScanResult.status === 'valid' ? (
                /* Valid Result Card */
                <div className="w-full p-4 rounded-xl bg-emerald-500 text-white shadow-lg space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <h4 className="text-base font-black tracking-wide uppercase">
                        🟩 VALID TICKET
                      </h4>
                      <p className="text-xs text-emerald-100">Check-in Berhasil (Gate Terbuka)</p>
                    </div>
                  </div>

                  <div className="bg-emerald-600/60 p-3 rounded-lg text-xs space-y-1">
                    <div className="text-sm font-extrabold text-white">
                      {lastScanResult.attendee?.name}
                    </div>
                    <div className="flex items-center gap-3 text-emerald-100 font-medium">
                      <span>Tier: <strong className="text-white">{lastScanResult.attendee?.ticketTier}</strong></span>
                      <span>Kursi: <strong className="text-white">{lastScanResult.attendee?.seat}</strong></span>
                      <span>ID: <strong className="text-white">{lastScanResult.attendee?.ticketId}</strong></span>
                    </div>
                  </div>
                </div>
              ) : lastScanResult.status === 'already_used' ? (
                /* Already Used Card */
                <div className="w-full p-4 rounded-xl bg-rose-600 text-white shadow-lg space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <h4 className="text-base font-black tracking-wide uppercase">
                        🟥 TICKET ALREADY USED
                      </h4>
                      <p className="text-xs text-rose-100">Tiket Telah Digunakan Sebelumnya!</p>
                    </div>
                  </div>

                  <div className="bg-rose-700/60 p-3 rounded-lg text-xs space-y-1">
                    <div className="text-sm font-extrabold text-white">
                      {lastScanResult.attendee?.name}
                    </div>
                    <div className="text-rose-200">
                      Waktu check-in pertama: <strong className="text-white">{lastScanResult.checkInTime || 'Sesi Sebelumnya'}</strong>
                    </div>
                  </div>
                </div>
              ) : lastScanResult.status === 'offline_queued' ? (
                /* Offline Queued Card */
                <div className="w-full p-4 rounded-xl bg-amber-500 text-white shadow-lg space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <h4 className="text-base font-black tracking-wide uppercase">
                        🟨 OFFLINE TICKET ACCEPTED
                      </h4>
                      <p className="text-xs text-amber-100">Disimpan ke Antrean Offline Lokal</p>
                    </div>
                  </div>
                  <div className="bg-amber-600/60 p-3 rounded-lg text-xs">
                    <div className="text-sm font-extrabold text-white">{lastScanResult.attendee?.name}</div>
                    <div className="text-amber-100">{lastScanResult.attendee?.seat} • {lastScanResult.attendee?.ticketTier}</div>
                  </div>
                </div>
              ) : (
                /* Invalid Result Card */
                <div className="w-full p-4 rounded-xl bg-rose-600 text-white shadow-lg space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-white shrink-0" />
                    <div>
                      <h4 className="text-base font-black tracking-wide uppercase">
                        🟥 INVALID TICKET
                      </h4>
                      <p className="text-xs text-rose-100">Tiket Tidak Ditemukan</p>
                    </div>
                  </div>
                  <p className="text-xs text-rose-200">
                    ID tiket yang dimasukkan tidak terdaftar pada acara ini. Mohon periksa kembali bukti pembelian.
                  </p>
                </div>
              )
            ) : (
              <div className="w-full p-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Ticket className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">Menunggu scan tiket...</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Hasil scan tiket (Valid, Sudah Digunakan, atau Tidak Valid) akan langsung tampil di sini.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
