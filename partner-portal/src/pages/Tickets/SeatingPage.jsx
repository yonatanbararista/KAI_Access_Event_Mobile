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
  const { currentEvent, seatMap, setSeatMap } = usePartnerPortal();

  // Local state for uploaded layout image & info graphics
  const [layoutImage, setLayoutImage] = useState(
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop'
  );
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'layout-upload' | 'benefits' | 'info-images'
  const [previewModalImg, setPreviewModalImg] = useState(null);

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

  // Other Informational Images
  const [infoImages, setInfoImages] = useState({
    rundown: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    gateAccess: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    racePack: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop'
  });

  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (field === 'layout') {
          setLayoutImage(ev.target.result);
        } else {
          setInfoImages(prev => ({ ...prev, [field]: ev.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
          Denah, Manfaat Kategori & Informasi Acara
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola denah kursi (seat layout), keuntungan kategori tiket (benefits), dan unggah gambar informasi penting (rundown, akses pintu masuk, penukaran tiket).
        </p>
      </div>

      {/* Notice Banner: Upload Denah & Informasi Tambahan Dipindahkan ke Detail Event */}
      <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-950">
              Upload Denah Kursi & Gambar Informasi Acara Telah Dipindahkan ke Detail Event
            </div>
            <p className="text-amber-800 text-[11px] mt-0.5">
              Untuk kemudahan pengelolaan, upload gambar layout denah, rundown, akses gate, dan panduan race pack kini terintegrasi di halaman Detail Event.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentNav('events-detail')}
          className="px-3.5 py-1.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Buka di Detail Event</span>
          <Eye className="w-3.5 h-3.5" />
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
          onClick={() => setActiveTab('layout-upload')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'layout-upload'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Upload Layout Denah Kursi
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
        <button
          onClick={() => setActiveTab('info-images')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'info-images'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Gambar Informasi Lain (Rundown, Gate & RPC)
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SEAT MAP EDITOR */}
      {activeTab === 'editor' && (
        <SeatMapEditor
          seatMap={seatMap}
          onUpdateSeatMap={(newMap) => setSeatMap(newMap)}
        />
      )}

      {/* TAB 2: UPLOAD LAYOUT SEAT */}
      {activeTab === 'layout-upload' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Upload Layout Denah Kursi & Panggung (Seat Layout Map)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Unggah denah visual panggung atau stadion untuk panduan pengunjung saat memilih tiket. File akan ditampilkan di aplikasi mobile dan portal verifikasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Upload Dropzone */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-kai-blue transition-colors bg-slate-50/70">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-kai-blue flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Unggah File Layout Kursi Baru</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Format PNG, JPG, atau SVG beresolusi tinggi (Maks. 10MB). Pastikan penomoran kursi dan panggung terbaca jelas.
              </p>

              <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Pilih File Dari Komputer</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'layout')}
                  className="hidden"
                />
              </label>
            </div>

            {/* Live Layout Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Pratinjau Denah Aktif</span>
                <button
                  onClick={() => setPreviewModalImg(layoutImage)}
                  className="text-xs font-semibold text-kai-blue flex items-center gap-1 hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Ukuran Penuh</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group h-64 flex items-center justify-center">
                <img
                  src={layoutImage}
                  alt="Seat Layout Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewModalImg(layoutImage)}
                    className="px-3 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow"
                  >
                    Perbesar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* TAB 4: UPLOAD GAMBAR INFORMASI LAIN */}
      {activeTab === 'info-images' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Upload Gambar Informasi Tambahan Acara
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Unggah infografis pendukung penting untuk pengunjung seperti rundown acara, denah akses pintu masuk venue, serta panduan lokasi penukaran tiket & race pack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Rundown Acara */}
            <div className="p-4 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">1. Rundown Acara</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Aktif
                </span>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <img
                  src={infoImages.rundown}
                  alt="Rundown Acara"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="w-full py-1.5 bg-white border border-slate-300 hover:border-kai-blue text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                <Upload className="w-3.5 h-3.5 text-kai-blue" />
                <span>Ganti Gambar Rundown</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'rundown')}
                  className="hidden"
                />
              </label>
            </div>

            {/* 2. Denah Akses Pintu Masuk / Gate Access */}
            <div className="p-4 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">2. Akses Venue & Gate</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Aktif
                </span>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <img
                  src={infoImages.gateAccess}
                  alt="Akses Gate Venue"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="w-full py-1.5 bg-white border border-slate-300 hover:border-kai-blue text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                <Upload className="w-3.5 h-3.5 text-kai-blue" />
                <span>Ganti Denah Pintu Masuk</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'gateAccess')}
                  className="hidden"
                />
              </label>
            </div>

            {/* 3. Panduan Penukaran Tiket / Race Pack */}
            <div className="p-4 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">3. Penukaran Tiket / RPC</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Aktif
                </span>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <img
                  src={infoImages.racePack}
                  alt="Panduan Race Pack"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="w-full py-1.5 bg-white border border-slate-300 hover:border-kai-blue text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                <Upload className="w-3.5 h-3.5 text-kai-blue" />
                <span>Ganti Info Penukaran Tiket</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'racePack')}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewModalImg && (
        <div 
          onClick={() => setPreviewModalImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-3 border-b flex justify-between items-center">
              <span className="font-bold text-xs text-slate-800">Pratinjau Gambar Penuh</span>
              <button 
                onClick={() => setPreviewModalImg(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Tutup ✕
              </button>
            </div>
            <img src={previewModalImg} alt="Full view" className="w-full h-auto max-h-[80vh] object-contain bg-slate-900" />
          </div>
        </div>
      )}
    </div>
  );
}
