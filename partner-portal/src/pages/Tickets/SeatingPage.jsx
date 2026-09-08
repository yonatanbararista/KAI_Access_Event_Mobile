import React, { useState } from 'react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { SeatMapEditor } from '../../components/seating/SeatMapEditor';
import { 
  Upload, 
  Image as ImageIcon, 
  CheckCircle, 
  Sparkles, 
  Calendar, 
  MapPin, 
  FileText, 
  Check, 
  Plus, 
  Trash2,
  ZoomIn,
  Eye
} from 'lucide-react';

export function SeatingPage() {
  const { currentEvent, seatMap, setSeatMap, setCurrentNav } = usePartnerPortal();

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'benefits'

  // Category Benefits State
  const [benefitsList, setBenefitsList] = useState([
    { tier: 'VIP Diamond', perk: 'Akses Gate Fast Track & Baris Terdepan A1-A10', badge: 'VIP' },
    { tier: 'VIP Diamond', perk: 'Official High-Performance Dry-Fit Running Jersey & Goodie Bag', badge: 'Merch' },
    { tier: 'CAT 1', perk: 'Kursi bernomor pandangan tengah panggung & Lanyard resmi', badge: 'Cat 1' },
    { tier: 'CAT 2', perk: 'Kursi bernomor sayap panggung & Akses gate reguler', badge: 'Cat 2' },
    { tier: 'Festival (Standing)', perk: 'Area berdiri bebas bibir panggung & atmosfer maksimal', badge: 'General' },
  ]);
  const [newPerkTier, setNewPerkTier] = useState('VIP Diamond');
  const [newPerkText, setNewPerkText] = useState('');

  const handleAddBenefit = () => {
    if (!newPerkText.trim()) return;
    setBenefitsList(prev => [
      ...prev,
      { tier: newPerkTier, perk: newPerkText.trim(), badge: newPerkTier.split(' ')[0] }
    ]);
    setNewPerkText('');
  };

  const handleRemoveBenefit = (idx) => {
    setBenefitsList(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
          <span>Event:</span>
          <span className="text-kai-blue font-bold">{currentEvent.title}</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Visual Seating & Manfaat Kategori Tiket
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola matriks denah kursi interaktif (Seat Map Editor) dan fasilitas keuntungan kategori tiket (Tier Benefits).
        </p>
      </div>

      {/* Notice Banner: Upload Denah & Informasi Tambahan Dipusatkan di Event Detail */}
      <div className="bg-gradient-to-r from-blue-50 via-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span>Upload Gambar Denah Kursi & Info Tambahan Acara Dipindahkan ke Event Detail</span>
              <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                Terpusat
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
              Pengunggahan gambar blueprint denah (Seat Layout Map), infografis Rundown Acara, Peta Akses Pintu Masuk / Gate, dan Panduan Penukaran Tiket / Race Pack kini telah dipindahkan ke <strong>Halaman Event Detail</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentNav('events-detail')}
          className="px-4 py-2.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center justify-center gap-2 transition-all group"
        >
          <span>Buka di Halaman Event Detail</span>
          <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'editor'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Interactive Seat Map Editor
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'benefits'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Manfaat Kategori (Benefits)
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SEAT MAP EDITOR */}
      {activeTab === 'editor' && (
        <SeatMapEditor
          seatMap={seatMap}
          onUpdateSeatMap={(newMap) => setSeatMap(newMap)}
        />
      )}



      {/* TAB 3: CATEGORY BENEFITS MANAGEMENT */}
      {activeTab === 'benefits' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Manajemen Keuntungan Kategori Tiket (Ticket Benefits)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tentukan fasilitas dan keuntungan khusus untuk masing-masing kategori tiket yang dapat dibaca calon pembeli di aplikasi mobile.
            </p>
          </div>

          {/* Form to Add New Benefit */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-800 block">Tambah Keuntungan Baru</span>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Pilih Kategori Tiket</label>
                <select
                  value={newPerkTier}
                  onChange={(e) => setNewPerkTier(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-bold text-slate-800"
                >
                  <option value="VIP Diamond">VIP Diamond</option>
                  <option value="CAT 1">CAT 1</option>
                  <option value="CAT 2">CAT 2</option>
                  <option value="Festival (Standing)">Festival (Standing)</option>
                  <option value="21K Half Marathon">21K Half Marathon</option>
                  <option value="10K Race">10K Race</option>
                  <option value="5K Fun Run">5K Fun Run</option>
                </select>
              </div>

              <div className="sm:col-span-6">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Deskripsi Keuntungan</label>
                <input
                  type="text"
                  placeholder="cth: Free Official Jersey Micro Dry-Fit & Akses Fast Track Gate"
                  value={newPerkText}
                  onChange={(e) => setNewPerkText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-medium"
                />
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="w-full py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Benefits List Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">Daftar Keuntungan Aktif</span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {benefitsList.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-kai-blue font-black text-[10px] border border-blue-200">
                      {item.tier}
                    </span>
                    <span className="font-semibold text-slate-800">{item.perk}</span>
                  </div>

                  <button
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
