import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  DollarSign,
  Users,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  ZoomIn,
  Sparkles,
  ArrowRight,
  Edit,
  Tag,
  FileText,
  ShieldCheck,
  Building2,
  ChevronLeft
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { formatCompactIDR, formatIDR, formatNumber } from '../../utils/currency';

export function EventDetailPage() {
  const {
    currentEvent,
    setCurrentNav,
    setSelectedEventId
  } = usePartnerPortal();

  // Active sub-tab in Event Detail
  const [activeTab, setActiveTab] = useState('layout'); // 'layout' | 'info-images' | 'benefits' | 'overview'

  // State for Seat Layout Map Image
  const [layoutImage, setLayoutImage] = useState(
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop'
  );
  const [isUploadingLayout, setIsUploadingLayout] = useState(false);

  // State for Additional Event Informational Images
  const [infoImages, setInfoImages] = useState({
    rundown: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    gateAccess: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    racePack: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop',
    termsDoc: null
  });

  // Modal for previewing images full size
  const [previewModalImg, setPreviewModalImg] = useState(null);

  // Category Benefits State
  const [benefitsList, setBenefitsList] = useState([
    { tier: 'VIP Diamond', perk: 'Akses Gate Fast Track & Baris Terdepan Kursi A1-A10', badge: 'VIP' },
    { tier: 'VIP Diamond', perk: 'Official High-Performance Dry-Fit Running Jersey & Goodie Bag', badge: 'Merch' },
    { tier: 'CAT 1', perk: 'Kursi bernomor pandangan tengah panggung & Lanyard resmi KAI', badge: 'Cat 1' },
    { tier: 'CAT 2', perk: 'Kursi bernomor sayap tribun & Akses gate reguler', badge: 'Cat 2' },
    { tier: 'Festival (Standing)', perk: 'Area berdiri bebas bibir panggung & atmosfer maksimal', badge: 'General' },
  ]);
  const [newPerkTier, setNewPerkTier] = useState('VIP Diamond');
  const [newPerkText, setNewPerkText] = useState('');

  // Handle file uploads
  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (field === 'layout') {
          setLayoutImage(ev.target.result);
          setIsUploadingLayout(false);
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

  if (!currentEvent) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-base font-bold text-slate-700">Event tidak ditemukan</h2>
        <button
          onClick={() => setCurrentNav('events-all')}
          className="mt-3 px-4 py-2 bg-kai-blue text-white font-bold text-xs rounded-xl"
        >
          Kembali ke Semua Event
        </button>
      </div>
    );
  }

  const soldPct = currentEvent.totalQuota > 0 
    ? Math.round((currentEvent.ticketsSold / currentEvent.totalQuota) * 100) 
    : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentNav('events-all')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Kembali"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <span>All Events</span>
              <span>/</span>
              <span className="text-kai-blue">{currentEvent.category}</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
              <span>{currentEvent.title}</span>
              <StatusBadge status={currentEvent.status} size="sm" />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentNav('tickets-addons')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-200 transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            <span>Kelola Add-ons</span>
          </button>
          <button
            onClick={() => setCurrentNav('tickets-types')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Kelola Tiket</span>
          </button>
        </div>
      </div>

      {/* HERO EVENT SUMMARY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden">
          <img
            src={currentEvent.poster || currentEvent.banner}
            alt={currentEvent.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-3 text-xs text-white/90">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-kai-orange" />
                  {currentEvent.dateDisplay || currentEvent.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-kai-orange" />
                  {currentEvent.venue}, {currentEvent.city}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 max-w-2xl">
                {currentEvent.description || 'Penyelenggaraan event terpadu bersama jaringan Kereta Api Indonesia (Persero).'}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 shrink-0">
              <div>
                <span className="text-[10px] text-slate-300 block uppercase font-bold">Penjualan Tiket</span>
                <span className="text-sm font-extrabold text-white">
                  {formatNumber(currentEvent.ticketsSold)} / {formatNumber(currentEvent.totalQuota)}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {soldPct}%
              </span>
            </div>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border-t border-slate-100 p-3 bg-slate-50/60 text-xs">
          <div className="p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Pendapatan Kotor</span>
            <span className="font-extrabold text-slate-900 text-sm">{formatCompactIDR(currentEvent.grossRevenue)}</span>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tiket Terjual</span>
            <span className="font-extrabold text-slate-900 text-sm">{formatNumber(currentEvent.ticketsSold)} pcs</span>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Tingkat Check-in</span>
            <span className="font-extrabold text-slate-900 text-sm">{currentEvent.checkInRate || 0}%</span>
          </div>
          <div className="p-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Penyelenggara</span>
            <span className="font-bold text-slate-800 text-xs truncate block">{currentEvent.organizer || 'KAI Partner Promoter'}</span>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'layout'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Denah Kursi (Seat Layout Map)</span>
        </button>

        <button
          onClick={() => setActiveTab('info-images')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'info-images'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Informasi Tambahan Acara</span>
        </button>

        <button
          onClick={() => setActiveTab('benefits')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'benefits'
              ? 'bg-kai-blue text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Manfaat Kategori Tiket</span>
        </button>
      </div>

      {/* TAB 1: UPLOAD & KELOLA DENAH SEAT LAYOUT MAP */}
      {activeTab === 'layout' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Upload & Kelola Denah Kursi (Seat Layout Map)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Unggah denah blueprint lokasi kursi dan panggung. Denah ini akan ditampilkan sebagai referensi visual nomor tempat duduk dan panduan bagi penonton.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentNav('tickets-seating')}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                <span>Buka Visual Seat Editor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-kai-blue rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              id="layoutFileInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'layout')}
            />
            <label
              htmlFor="layoutFileInput"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-kai-blue flex items-center justify-center shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-bold text-xs text-slate-800">
                Klik untuk unggah gambar denah atau drag and drop
              </div>
              <p className="text-[11px] text-slate-400">
                Mendukung file PNG, JPG, WEBP hingga 10MB. Disarankan format landscape (16:9 atau 4:3).
              </p>
            </label>
          </div>

          {/* Current Layout Preview */}
          {layoutImage ? (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gambar Denah Kursi Saat Ini</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewModalImg(layoutImage)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </button>
                  <label
                    htmlFor="layoutFileInput"
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-kai-blue bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Ganti Denah</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setLayoutImage(null)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                <img
                  src={layoutImage}
                  alt="Denah Kursi Event"
                  className="w-full h-80 object-contain mx-auto"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setPreviewModalImg(layoutImage)}
                    className="px-4 py-2 bg-white/90 text-slate-900 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-xs"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span>Klik untuk Melihat Fullscreen</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kai-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Informasi Nomor Tempat Duduk:</strong> Kategori Cat 1, Cat 2, Cat 3, Cat 4, dan Cat 5 merupakan kategori duduk bernomor (numbered seating). Nomor tempat duduk dikirimkan mendekati tanggal acara melalui WhatsApp & Email pengunjung.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400">
              Belum ada denah kursi yang diunggah untuk event ini.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INFORMASI TAMBAHAN ACARA (RUNDOWN, GATE ACCESS, RACE PACK) */}
      {activeTab === 'info-images' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Upload Gambar Informasi Tambahan Acara
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Unggah infografis jadwal rundown acara, peta pintu masuk (gate access), panduan penukaran tiket fisik / race pack, dan berkas syarat ketentuan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Rundown Acara */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-kai-blue" />
                    <span>Jadwal Rundown Acara</span>
                  </span>
                  <span className="text-[10px] bg-blue-100 text-kai-blue font-bold px-1.5 py-0.5 rounded">
                    Infografis
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Timeline jam open gate, sesi penampilan artis, dan waktu selesai acara.
                </p>
              </div>

              {infoImages.rundown ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-900 group">
                  <img
                    src={infoImages.rundown}
                    alt="Rundown Acara"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewModalImg(infoImages.rundown)}
                      className="p-1.5 bg-white text-slate-900 rounded-lg shadow-sm"
                      title="Lihat"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setInfoImages(prev => ({ ...prev, rundown: null }))}
                      className="p-1.5 bg-rose-600 text-white rounded-lg shadow-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center h-44 flex flex-col items-center justify-center">
                  <Clock className="w-8 h-8 text-slate-300 mb-1" />
                  <span className="text-[11px] text-slate-400">Belum diunggah</span>
                </div>
              )}

              <input
                type="file"
                id="uploadRundown"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'rundown')}
              />
              <label
                htmlFor="uploadRundown"
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center cursor-pointer transition-colors shadow-2xs block"
              >
                {infoImages.rundown ? 'Ganti Gambar Rundown' : 'Unggah Rundown'}
              </label>
            </div>

            {/* 2. Peta Akses Gate & Pintu Masuk */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-kai-orange" />
                    <span>Peta Akses Gate & Pintu</span>
                  </span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded">
                    Lokasi
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Denah jalur penonton dari stasiun KAI, drop-off shuttle, dan pintu VIP/Reguler.
                </p>
              </div>

              {infoImages.gateAccess ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-900 group">
                  <img
                    src={infoImages.gateAccess}
                    alt="Akses Gate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewModalImg(infoImages.gateAccess)}
                      className="p-1.5 bg-white text-slate-900 rounded-lg shadow-sm"
                      title="Lihat"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setInfoImages(prev => ({ ...prev, gateAccess: null }))}
                      className="p-1.5 bg-rose-600 text-white rounded-lg shadow-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center h-44 flex flex-col items-center justify-center">
                  <MapPin className="w-8 h-8 text-slate-300 mb-1" />
                  <span className="text-[11px] text-slate-400">Belum diunggah</span>
                </div>
              )}

              <input
                type="file"
                id="uploadGate"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'gateAccess')}
              />
              <label
                htmlFor="uploadGate"
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center cursor-pointer transition-colors shadow-2xs block"
              >
                {infoImages.gateAccess ? 'Ganti Peta Gate' : 'Unggah Peta Gate'}
              </label>
            </div>

            {/* 3. Panduan Penukaran Race Pack / Tiket Fisik */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Panduan Penukaran Tiket</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    Race Pack / Wristband
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Jadwal dan syarat penukaran wristband fisik atau pengambilan Race Pack jersey lari.
                </p>
              </div>

              {infoImages.racePack ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-900 group">
                  <img
                    src={infoImages.racePack}
                    alt="Panduan Penukaran Tiket"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewModalImg(infoImages.racePack)}
                      className="p-1.5 bg-white text-slate-900 rounded-lg shadow-sm"
                      title="Lihat"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setInfoImages(prev => ({ ...prev, racePack: null }))}
                      className="p-1.5 bg-rose-600 text-white rounded-lg shadow-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center h-44 flex flex-col items-center justify-center">
                  <Ticket className="w-8 h-8 text-slate-300 mb-1" />
                  <span className="text-[11px] text-slate-400">Belum diunggah</span>
                </div>
              )}

              <input
                type="file"
                id="uploadRacePack"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'racePack')}
              />
              <label
                htmlFor="uploadRacePack"
                className="w-full py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center cursor-pointer transition-colors shadow-2xs block"
              >
                {infoImages.racePack ? 'Ganti Panduan Penukaran' : 'Unggah Panduan'}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANFAAT KATEGORI TIKET (BENEFITS MANAGER) */}
      {activeTab === 'benefits' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Manfaat & Keuntungan Kategori Tiket (Tier Perks)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Daftar fasilitas yang akan diperoleh pemegang tiket untuk masing-masing kategori (misal: Fast Track, Jersey Lari, Lanyard Eksklusif, dsb).
              </p>
            </div>
          </div>

          {/* Add New Perk Form */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-bold text-xs text-slate-800 block">Tambah Fasilitas / Manfaat Kategori:</span>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <select
                value={newPerkTier}
                onChange={(e) => setNewPerkTier(e.target.value)}
                className="px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
              >
                <option value="VIP Diamond">VIP Diamond</option>
                <option value="CAT 1">CAT 1</option>
                <option value="CAT 2">CAT 2</option>
                <option value="CAT 3">CAT 3</option>
                <option value="Festival (Standing)">Festival (Standing)</option>
              </select>

              <input
                type="text"
                value={newPerkText}
                onChange={(e) => setNewPerkText(e.target.value)}
                placeholder="Contoh: Gratis Official Running Jersey Micro Dry-Fit & Goodie Bag..."
                className="flex-1 px-3 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-kai-blue"
              />

              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {/* Benefits List Table */}
          <div className="space-y-2">
            {benefitsList.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg font-extrabold text-[11px] bg-slate-100 text-slate-800 shrink-0 border border-slate-200">
                    {item.tier}
                  </span>
                  <span className="font-medium text-slate-700">{item.perk}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveBenefit(idx)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW MODAL */}
      {previewModalImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewModalImg(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewModalImg}
              alt="Pratinjau Gambar"
              className="max-h-[82vh] w-auto mx-auto object-contain rounded-xl"
            />
            <div className="p-2 text-center">
              <button
                onClick={() => setPreviewModalImg(null)}
                className="px-5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default EventDetailPage;
