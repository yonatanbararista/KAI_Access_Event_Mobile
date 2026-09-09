import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  DollarSign,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Zap,
  Edit2,
  Shirt,
  Train,
  Car,
  Building2,
  Utensils,
  Bus,
  ShoppingBag,
  Eye,
  ZoomIn,
  FileText
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { formatIDR, formatNumber } from '../../utils/currency';
import { calculateServiceFee, getFeeUnitInfo } from '../../utils/feeCalculator';

export function CreateEventPage() {
  const { addEvent, setCurrentNav } = usePartnerPortal();

  const [currentStep, setCurrentStep] = useState(1);

  // Modal State for Image Fullscreen Zoom
  const [previewModalImg, setPreviewModalImg] = useState(null);

  // Modal State for Add-on Editing (Ukuran, Kuota Stok, Harga Satuan, Automatic Suggest)
  const [isEditAddonModalOpen, setIsEditAddonModalOpen] = useState(false);
  const [editingAddonIndex, setEditingAddonIndex] = useState(null);
  const [editAddonFormData, setEditAddonFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    sizesString: '',
    automaticSuggest: true,
    description: ''
  });

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Konser Musik',
    organizer: 'PT Kreasi Musik Nusantara',
    description: '',
    venue: '',
    address: '',
    city: 'Jakarta',
    date: '2026-11-15',
    timeStart: '16:00',
    timeEnd: '23:00',
    contactPerson: 'Andi Prasetyo',
    contactEmail: 'partner@nusantaralive.id',
    contactPhone: '081198726310',
    posterUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    seatLayoutUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop',
    rundownUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    venueAccessUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=800&auto=format&fit=crop',
    racePackUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop',
    hasSeating: true,
    seatingType: 'Assigned Seating',
    terms: 'Tiket yang sudah dibeli tidak dapat ditukarkan atau diuangkan kembali.',
    tickets: [
      {
        id: 'tkt-c1',
        tier: 'Early Bird',
        name: 'Early Bird Festival Pass',
        price: 150000,
        quota: 500,
        sold: 0,
        salesStart: '2026-09-01',
        salesEnd: '2026-09-15',
        status: 'On Sale',
      },
      {
        id: 'tkt-c2',
        tier: 'Normal',
        name: 'General Admission',
        price: 250000,
        quota: 1500,
        sold: 0,
        salesStart: '2026-09-16',
        salesEnd: '2026-11-14',
        status: 'On Sale',
      },
    ],
    // 7 Add-ons fully aligned with Consumer View concepts
    addOns: [
      {
        id: 'addon-jersey',
        name: 'Official Event Running Jersey',
        category: 'Merchandise Resmi',
        badge: 'Official Jersey',
        description: 'Jersey lari micro dry-fit berstandar internasional dengan strip reflektif 3M dan ventilasi optimal.',
        price: 150000,
        stock: 1080,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: true,
        unitType: 'Pcs Jersey',
        sizesString: 'S, M, L, XL, XXL, 3XL',
        sizes: [
          { id: 's-1', size: 'S', chestWidth: 48, length: 66, stock: 120, price: 150000 },
          { id: 's-2', size: 'M', chestWidth: 50, length: 68, stock: 300, price: 150000 },
          { id: 's-3', size: 'L', chestWidth: 52, length: 70, stock: 350, price: 150000 },
          { id: 's-4', size: 'XL', chestWidth: 54, length: 72, stock: 180, price: 150000 },
          { id: 's-5', size: 'XXL', chestWidth: 56, length: 74, stock: 80, price: 150000 },
        ]
      },
      {
        id: 'addon-train',
        name: 'Tiket Kereta Api Bundling KAI (Diskon 5%)',
        category: 'Transportasi Kereta Api',
        badge: 'Diskon 5%',
        description: 'Integrasi pemesanan tiket kereta KAI resmi dengan diskon khusus peserta dan pemilihan jadwal per hari keberangkatan.',
        price: 247000,
        stock: 800,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Tiket Kereta',
        sizesString: 'Jadwal H-1 Event, Jadwal Hari H (Pagi), Jadwal H+1 Event'
      },
      {
        id: 'addon-rental',
        name: 'Car / Motor Rental (Mitra Pilihan KAI)',
        category: 'Transportasi & Sewa Unit',
        badge: 'Kupon Rp 50K',
        description: 'Sistem voucher/kupon seharga Rp 50.000 untuk sewa mobil & motor mitra KAI. Serah terima unit langsung di stasiun kedatangan.',
        price: 50000,
        stock: 300,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Voucher Rental',
        sizesString: 'Motor Matic 125cc, Motor Matic 150cc, Mobil 7-Seater'
      },
      {
        id: 'addon-hotel',
        name: 'Hotel Pilihan & Afiliasi KAI',
        category: 'Akomodasi & Penginapan',
        badge: 'Pemesanan Langsung',
        description: 'Reservasi hotel mitra & transit KAI Living terdekat dari venue event dengan sistem booking langsung terintegrasi.',
        price: 450000,
        stock: 150,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Kamar / Malam',
        sizesString: 'Transit Standard Room, Superior Double, Deluxe Twin'
      },
      {
        id: 'addon-lokocafe',
        name: 'Paket Makan + Kopi LokoCafe',
        category: 'Makanan & Minuman',
        badge: 'Favorit',
        description: 'Voucher makan khas LokoCafe dan signature iced coffee di area festival / venue.',
        price: 60000,
        stock: 500,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Paket Makanan',
        sizesString: 'Paket Nasi Bogana + Es Kopi, Paket Sei Sapi + Lemon Tea'
      },
      {
        id: 'addon-merch',
        name: 'Claim Exclusive Merch (Paket Aksesoris)',
        category: 'Merchandise',
        badge: 'Edisi Terbatas',
        description: 'Topi pelari, lanyard edisi kolektor, dan wristband resmi KAI Heritage.',
        price: 120000,
        stock: 250,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Paket Merch',
        sizesString: 'Standard Pack, Collector Edition, Full VIP Merch'
      },
      {
        id: 'addon-shuttle',
        name: 'KAI Shuttle Bus (Stasiun ke Venue PP)',
        category: 'Layanan Antar-Jemput',
        badge: 'Praktis',
        description: 'Bus AC eksekutif langsung pulang pergi dari stasiun terdekat ke gerbang masuk venue.',
        price: 35000,
        stock: 400,
        sold: 0,
        enabled: true,
        automaticSuggest: true, // Tombol automatic suggest aktif
        isJersey: false,
        unitType: 'Tiket Shuttle',
        sizesString: 'Trip Pagi (07:00), Trip Siang (12:00), Trip Sore (16:00)'
      }
    ],
  });

  const steps = [
    '1. Basic Info',
    '2. Event Details',
    '3. Tickets',
    '4. Quota & Pricing',
    '5. Seating',
    '6. Add-ons',
    '7. Review',
    '8. Publish',
  ];

  // Local image simulation handler
  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormData((prev) => ({ ...prev, [field]: uploadEvent.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getAddonIcon = (id) => {
    switch (id) {
      case 'addon-jersey':
        return Shirt;
      case 'addon-train':
        return Train;
      case 'addon-rental':
        return Car;
      case 'addon-hotel':
        return Building2;
      case 'addon-lokocafe':
        return Utensils;
      case 'addon-shuttle':
        return Bus;
      default:
        return ShoppingBag;
    }
  };

  // Open Edit Modal for any Add-on (Ukuran, Kuota Stok, Harga Satuan)
  const handleOpenEditAddon = (index) => {
    const item = formData.addOns[index];
    if (!item) return;
    setEditingAddonIndex(index);
    setEditAddonFormData({
      name: item.name,
      price: item.price,
      stock: item.stock || 500,
      sizesString: item.sizesString || (item.sizes ? item.sizes.map(s => s.size).join(', ') : ''),
      automaticSuggest: item.automaticSuggest ?? true,
      description: item.description || ''
    });
    setIsEditAddonModalOpen(true);
  };

  // Save Edit Add-on
  const handleSaveEditAddon = () => {
    if (editingAddonIndex === null) return;
    setFormData(prev => {
      const updatedAddOns = [...prev.addOns];
      const target = updatedAddOns[editingAddonIndex];
      if (!target) return prev;

      let updatedSizes = target.sizes;
      if (target.isJersey && editAddonFormData.sizesString) {
        const sizeNames = editAddonFormData.sizesString.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
        updatedSizes = sizeNames.map((szName, idx) => {
          const existing = target.sizes?.find(s => s.size === szName);
          return existing || {
            id: `sz-${Date.now()}-${idx}`,
            size: szName,
            chestWidth: 48 + (idx * 2),
            length: 66 + (idx * 2),
            stock: Math.round(Number(editAddonFormData.stock) / sizeNames.length),
            price: Number(editAddonFormData.price)
          };
        });
      }

      updatedAddOns[editingAddonIndex] = {
        ...target,
        name: editAddonFormData.name,
        price: Number(editAddonFormData.price),
        stock: Number(editAddonFormData.stock),
        sizesString: editAddonFormData.sizesString,
        automaticSuggest: editAddonFormData.automaticSuggest,
        description: editAddonFormData.description,
        sizes: updatedSizes
      };

      return { ...prev, addOns: updatedAddOns };
    });
    setIsEditAddonModalOpen(false);
  };

  // Toggle Automatic Suggest directly
  const handleToggleAddonAutomaticSuggest = (index) => {
    setFormData(prev => {
      const updatedAddOns = [...prev.addOns];
      if (updatedAddOns[index]) {
        updatedAddOns[index] = {
          ...updatedAddOns[index],
          automaticSuggest: !updatedAddOns[index].automaticSuggest
        };
      }
      return { ...prev, addOns: updatedAddOns };
    });
  };

  const handleAddTicket = () => {
    const newTkt = {
      id: `tkt-${Date.now()}`,
      tier: 'VIP',
      name: 'VIP Category',
      price: 650000,
      quota: 300,
      sold: 0,
      salesStart: formData.date,
      salesEnd: formData.date,
      status: 'On Sale',
    };
    setFormData((prev) => ({ ...prev, tickets: [...prev.tickets, newTkt] }));
  };

  const handleRemoveTicket = (index) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateTicket = (index, updates) => {
    setFormData((prev) => {
      const copy = [...prev.tickets];
      copy[index] = { ...copy[index], ...updates };
      return { ...prev, tickets: copy };
    });
  };

  const totalQuota = formData.tickets.reduce((acc, t) => acc + (Number(t.quota) || 0), 0);
  const potentialRevenue = formData.tickets.reduce(
    (acc, t) => acc + (Number(t.price) || 0) * (Number(t.quota) || 0),
    0
  );

  const handleFinishPublish = () => {
    const newCreated = addEvent({
      title: formData.title || 'Event Musik Baru 2026',
      slug: (formData.title || 'event-musik-baru').toLowerCase().replace(/\s+/g, '-'),
      category: formData.category,
      organizer: formData.organizer,
      date: formData.date,
      dateDisplay: `${formData.date}`,
      time: `${formData.timeStart} - ${formData.timeEnd} WIB`,
      venue: formData.venue || 'Istora Gelora Bung Karno',
      address: formData.address || 'Kawasan GBK Senayan',
      city: formData.city,
      status: 'On Sale',
      totalQuota: totalQuota || 2000,
      ticketsSold: 0,
      grossRevenue: 0,
      checkInCount: 0,
      checkInRate: 0,
      poster: formData.posterUrl,
      banner: formData.bannerUrl,
      description: formData.description || 'Deskripsi acara resmi.',
      contactPerson: formData.contactPerson,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      hasSeating: formData.hasSeating,
      tickets: formData.tickets,
    });
    setCurrentStep(8);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Buat Event Baru (Create Event Wizard)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ikuti 8 langkah wizard di bawah ini untuk menerbitkan event dan konfigurasi tiket promotor Anda.
        </p>
      </div>

      {/* Stepper Progress Bar matching Prompt Section 9 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[720px] gap-2">
          {steps.map((label, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div
                key={label}
                onClick={() => isDone && setCurrentStep(stepNum)}
                className={`flex-1 flex flex-col items-center cursor-pointer transition-all ${
                  isDone ? 'opacity-90' : isCurrent ? 'opacity-100 font-bold' : 'opacity-40'
                }`}
              >
                <div className="flex items-center w-full">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all mx-auto ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-kai-blue text-white ring-4 ring-blue-100 shadow-sm'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : stepNum}
                  </div>
                </div>
                <span className="text-[11px] mt-1.5 text-center truncate max-w-[90px] font-semibold text-slate-700">
                  {label.split('. ')[1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Form Panels */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Langkah 1: Informasi Dasar Event (Basic Info)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama / Judul Event *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Nusantara Symphony Fest 2026"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-kai-blue/20 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Event
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium"
                >
                  <option value="Konser Musik">Konser Musik</option>
                  <option value="Pameran & Expo">Pameran & Expo</option>
                  <option value="Festival Budaya">Festival Budaya</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Seminar & Teater">Seminar & Teater</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Penyelenggara / Organizer
                </label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Lengkap Acara
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan daya tarik acara, susunan pengisi acara, dan kemudahan akses transportasi KAI..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Venue / Lokasi
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Contoh: Istora Gelora Bung Karno"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kota Pelaksanaan
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Contoh: Jakarta Pusat"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Venue
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Alamat jalan, patokan stasiun KAI terdekat"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tanggal Pelaksanaan
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jam Mulai
                  </label>
                  <input
                    type="time"
                    value={formData.timeStart}
                    onChange={(e) => setFormData({ ...formData, timeStart: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jam Selesai
                  </label>
                  <input
                    type="time"
                    value={formData.timeEnd}
                    onChange={(e) => setFormData({ ...formData, timeEnd: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Event Details (Uploads & Rules) */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Langkah 2: Poster, Banner, Denah Kursi & Informasi Tambahan (Event Details)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Unggah poster promosi, denah layout kursi & panggung, infografis rundown, akses gate, dan panduan penukaran tiket.
              </p>
            </div>

            {/* 1. Poster & Banner Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poster Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Poster Resmi Event (3:4 Ratio) *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  {formData.posterUrl ? (
                    <div className="relative group">
                      <img
                        src={formData.posterUrl}
                        alt="Preview Poster"
                        className="h-56 mx-auto rounded-lg object-cover shadow-sm"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg(formData.posterUrl)}
                          className="px-2.5 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat</span>
                        </button>
                        <label className="px-2.5 py-1.5 bg-kai-blue text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'posterUrl')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer py-6">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-kai-blue">Pilih file poster</span>
                      <span className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'posterUrl')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Banner Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Banner Web / Hero Image (16:9 Ratio) *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  {formData.bannerUrl ? (
                    <div className="relative group">
                      <img
                        src={formData.bannerUrl}
                        alt="Preview Banner"
                        className="h-56 w-full rounded-lg object-cover shadow-sm"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg(formData.bannerUrl)}
                          className="px-2.5 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat</span>
                        </button>
                        <label className="px-2.5 py-1.5 bg-kai-blue text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'bannerUrl')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer py-6">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-kai-blue">Pilih file banner</span>
                      <span className="text-[10px] text-slate-400 mt-1">1920x1080px direkomendasikan</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'bannerUrl')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Upload Denah Kursi & Panggung (Seat Layout Map) - DIPINDAHKAN DARI LANGKAH 5 */}
            <div className="bg-white rounded-2xl p-5 border-2 border-kai-blue/30 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Upload Denah Kursi & Panggung (Seat Layout Map)
                    </h4>
                    <span className="text-[10px] bg-kai-blue text-white font-bold px-2 py-0.5 rounded-full">
                      Dipusatkan di Step 2
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Unggah visual blueprint panggung, denah tribun, atau rute lari untuk panduan pengunjung di aplikasi KAI Access
                  </span>
                </div>
                <span className="text-[10px] bg-blue-50 text-kai-blue font-bold px-2 py-0.5 rounded border border-blue-200 self-start sm:self-auto">
                  Format PNG / JPG / WEBP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-kai-blue block">Pilih File Denah Layout</span>
                  <span className="text-[10px] text-slate-400">Rekomendasi resolusi tinggi min. 1200x800px</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'seatLayoutUrl')}
                    className="hidden"
                    id="step2SeatLayoutUpload"
                  />
                  <label
                    htmlFor="step2SeatLayoutUpload"
                    className="mt-3 inline-block px-4 py-1.5 bg-kai-blue text-white font-bold text-xs rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-2xs"
                  >
                    Unggah Gambar Denah
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600">Pratinjau Denah Kursi:</span>
                    {formData.seatLayoutUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewModalImg(formData.seatLayoutUrl)}
                        className="text-[11px] font-bold text-kai-blue hover:underline flex items-center gap-1"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Perbesar Layar Penuh</span>
                      </button>
                    )}
                  </div>
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group">
                    {formData.seatLayoutUrl ? (
                      <>
                        <img
                          src={formData.seatLayoutUrl}
                          alt="Denah Kursi"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewModalImg(formData.seatLayoutUrl)}
                            className="px-3 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Lihat</span>
                          </button>
                          <label
                            htmlFor="step2SeatLayoutUpload"
                            className="px-3 py-1.5 bg-kai-blue text-white font-bold text-xs rounded-lg shadow cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Ganti</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, seatLayoutUrl: null }))}
                            className="px-3 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-lg shadow flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-3 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-xs">Belum ada denah diunggah</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Numbered Seating Guidance Notice */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-kai-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Informasi Nomor Tempat Duduk:</strong> Kategori Cat 1, Cat 2, Cat 3, Cat 4, dan Cat 5 merupakan kategori duduk bernomor (numbered seating). Nomor tempat duduk penonton akan otomatis dikirimkan mendekati hari H pertunjukan melalui WhatsApp & Email.
                </p>
              </div>
            </div>

            {/* 3. Upload Gambar Informasi Tambahan Acara - DIPINDAHKAN DARI LANGKAH 5 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Upload Gambar Informasi Tambahan Acara
                    </h4>
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                      Dipusatkan di Step 2
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Unggah infografis rundown acara, peta pintu masuk (gate access), dan panduan penukaran tiket / race pack
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Rundown Acara */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-center">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-kai-blue" />
                      <span>1. Rundown Acara</span>
                    </span>
                    <span className="text-[10px] font-bold text-kai-blue bg-blue-50 px-1.5 py-0.5 rounded">
                      Timeline
                    </span>
                  </div>
                  <div className="h-32 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden relative group flex items-center justify-center">
                    {formData.rundownUrl ? (
                      <>
                        <img src={formData.rundownUrl} alt="Rundown" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewModalImg(formData.rundownUrl)}
                            className="p-1.5 bg-white text-slate-900 rounded-lg shadow text-xs font-bold"
                            title="Lihat"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, rundownUrl: null }))}
                            className="p-1.5 bg-rose-600 text-white rounded-lg shadow text-xs font-bold"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1.5 bg-white border border-slate-300 text-xs font-bold text-kai-blue rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shadow-2xs">
                    {formData.rundownUrl ? 'Ganti Rundown' : 'Upload Rundown'}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'rundownUrl')} className="hidden" />
                  </label>
                </div>

                {/* 2. Akses Venue & Gate */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-center">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-kai-orange" />
                      <span>2. Peta Akses Gate</span>
                    </span>
                    <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-1.5 py-0.5 rounded">
                      Pintu Masuk
                    </span>
                  </div>
                  <div className="h-32 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden relative group flex items-center justify-center">
                    {formData.venueAccessUrl ? (
                      <>
                        <img src={formData.venueAccessUrl} alt="Akses Gate" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewModalImg(formData.venueAccessUrl)}
                            className="p-1.5 bg-white text-slate-900 rounded-lg shadow text-xs font-bold"
                            title="Lihat"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, venueAccessUrl: null }))}
                            className="p-1.5 bg-rose-600 text-white rounded-lg shadow text-xs font-bold"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1.5 bg-white border border-slate-300 text-xs font-bold text-kai-blue rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shadow-2xs">
                    {formData.venueAccessUrl ? 'Ganti Peta Gate' : 'Upload Peta Gate'}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'venueAccessUrl')} className="hidden" />
                  </label>
                </div>

                {/* 3. Panduan Penukaran Tiket / Race Pack */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-center">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Penukaran Tiket / RPC</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Wristband / Jersey
                    </span>
                  </div>
                  <div className="h-32 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden relative group flex items-center justify-center">
                    {formData.racePackUrl ? (
                      <>
                        <img src={formData.racePackUrl} alt="Race Pack" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewModalImg(formData.racePackUrl)}
                            className="p-1.5 bg-white text-slate-900 rounded-lg shadow text-xs font-bold"
                            title="Lihat"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, racePackUrl: null }))}
                            className="p-1.5 bg-rose-600 text-white rounded-lg shadow text-xs font-bold"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1.5 bg-white border border-slate-300 text-xs font-bold text-kai-blue rounded-xl cursor-pointer hover:bg-slate-100 transition-colors shadow-2xs">
                    {formData.racePackUrl ? 'Ganti Panduan RPC' : 'Upload Panduan RPC'}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'racePackUrl')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* 4. Terms & Conditions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Syarat & Ketentuan Acara
              </label>
              <textarea
                rows="3"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl leading-relaxed font-medium"
              />
            </div>
          </div>
        )}

        {/* Step 3: Tickets */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Langkah 3: Konfigurasi Kategori Tiket (Tickets)
                </h3>
                <p className="text-xs text-slate-500">
                  Tambahkan kategori tiket yang akan dijual (Early Bird, Presale, Normal, VIP, VVIP).
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddTicket}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kategori</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.tickets.map((tkt, idx) => (
                <div
                  key={tkt.id || idx}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">
                      Tier
                    </label>
                    <select
                      value={tkt.tier}
                      onChange={(e) => handleUpdateTicket(idx, { tier: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
                    >
                      <option value="Early Bird">Early Bird</option>
                      <option value="Presale">Presale</option>
                      <option value="Normal">Normal</option>
                      <option value="VIP">VIP</option>
                      <option value="VVIP">VVIP</option>
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">
                      Nama Tiket
                    </label>
                    <input
                      type="text"
                      value={tkt.name}
                      onChange={(e) => handleUpdateTicket(idx, { name: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-medium"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block">
                      Harga Satuan (Rp)
                    </label>
                    <input
                      type="number"
                      value={tkt.price}
                      onChange={(e) => handleUpdateTicket(idx, { price: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-bold text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveTicket(idx)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Tiket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Quota & Pricing */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Langkah 4: Alokasi Kuota & Simulasi Biaya Layanan KAI
            </h3>

            <div className="space-y-4">
              {formData.tickets.map((tkt, idx) => {
                const feePerUnit = calculateServiceFee(tkt.price, 1);
                const feeInfo = getFeeUnitInfo(tkt.price);
                const netPerUnit = tkt.price - feePerUnit;

                return (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-kai-blue uppercase tracking-wider">
                          {tkt.tier}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{tkt.name}</h4>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatIDR(tkt.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          Total Kuota Disediakan
                        </label>
                        <input
                          type="number"
                          value={tkt.quota}
                          onChange={(e) => handleUpdateTicket(idx, { quota: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
                        />
                      </div>

                      <div className="bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 text-xs">
                        <span className="text-[10px] text-slate-500 font-medium block">
                          Biaya Layanan KAI ({feeInfo.rateDisplay})
                        </span>
                        <span className="font-bold text-slate-800">
                          {formatIDR(feePerUnit)} / tiket
                        </span>
                      </div>

                      <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-xs">
                        <span className="text-[10px] text-slate-500 font-medium block">
                          Pendapatan Bersih Promotor (Est.)
                        </span>
                        <span className="font-extrabold text-emerald-700">
                          {formatIDR(netPerUnit)} / tiket
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Potential Summary Box */}
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Total Akumulasi Kuota:</span>
                <span className="text-base font-extrabold text-white">{totalQuota} Tiket</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block font-medium">Potensi Bruto Penjualan:</span>
                <span className="text-base font-extrabold text-kai-orange">{formatIDR(potentialRevenue)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Konfigurasi Tipe Kursi & Manfaat Kategori Tiket */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Langkah 5: Konfigurasi Tipe Kursi & Manfaat Kategori Tiket
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih format penomoran kursi (assigned seating atau free standing) dan atur fasilitas keuntungan tiket (benefits).
              </p>
            </div>

            {/* Notice Banner: Upload Denah & Informasi Tambahan Telah Dipindahkan ke Langkah 2 */}
            <div className="bg-gradient-to-r from-blue-50 via-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <span>Upload Denah Kursi & Gambar Informasi Acara Telah Dipindahkan ke Langkah 2</span>
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      Terpusat
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                    Pengunggahan gambar denah layout panggung (Seat Layout Map), infografis Rundown Acara, Peta Akses Gate, dan Panduan Race Pack kini terpusat pada <strong>Langkah 2: Event Details</strong>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-3.5 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Buka di Langkah 2 (Event Details)</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 1. Seating Type Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setFormData({ ...formData, hasSeating: true, seatingType: 'Assigned Seating' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.hasSeating
                    ? 'border-kai-blue bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">
                    Assigned Seating (Kursi Bernomor)
                  </h4>
                  <input
                    type="radio"
                    checked={formData.hasSeating}
                    onChange={() => {}}
                    className="text-kai-blue"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Peserta mendapatkan nomor baris dan kursi bernomor. Dilengkapi visual seat map editor di portal promotor.
                </p>
              </div>

              <div
                onClick={() => setFormData({ ...formData, hasSeating: false, seatingType: 'Free Standing' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  !formData.hasSeating
                    ? 'border-kai-blue bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">
                    Free Standing (Festival / Lari Tanpa Nomor Duduk)
                  </h4>
                  <input
                    type="radio"
                    checked={!formData.hasSeating}
                    onChange={() => {}}
                    className="text-kai-blue"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Akses umum festival berdiri bebas atau event lari. Kuota tiket diatur per tier tanpa alokasi nomor kursi statis.
                </p>
              </div>
            </div>

            {/* 2. Space for Benefits (Keuntungan per Kategori) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Keuntungan & Fasilitas Tiket (Category Benefits)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Fasilitas eksklusif yang didapatkan penonton untuk tiap kategori
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {formData.tickets.map((tkt, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-kai-blue" />
                        {tkt.tier} — {tkt.name}
                      </span>
                      <span className="text-[11px] text-kai-blue font-extrabold">{formatIDR(tkt.price)}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="cth: Free Official Dry-Fit Jersey, Free LokoCafe Box & Jalur Fast Track"
                      defaultValue={idx === 0 ? "Akses Fast Track Gate, Kursi Nomor Terbaik, Official Merch" : "Akses Gate Reguler, Wristband Resmi"}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-kai-blue"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Add-ons & Official Jersey Configuration */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Langkah 6: Layanan Tambahan (Add-ons) & Official Jersey
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Konfigurasi opsi add-ons selaras dengan konsep Consumer View. Ubah ukuran varian, kuota stok, harga satuan, dan atur rekomendasi otomatis (*Automatic Suggest*).
                </p>
              </div>

              {/* Automatic Suggest Summary */}
              <div className="flex items-center gap-2">
                <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <div>
                    <span className="text-[10px] text-amber-700 font-bold block uppercase leading-none">Automatic Suggest</span>
                    <span className="font-extrabold text-amber-900">
                      {formData.addOns.filter(a => a.automaticSuggest).length} Layanan Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* List of Add-ons with Edit & Automatic Suggest Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.addOns.map((add, i) => {
                const Icon = getAddonIcon(add.id);
                return (
                  <div
                    key={add.id || i}
                    className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between space-y-4 ${
                      add.automaticSuggest
                        ? 'border-amber-300 ring-2 ring-amber-300/30'
                        : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-1.5 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-kai-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {add.category}
                        </span>

                        {add.automaticSuggest && (
                          <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <Zap size={10} className="fill-slate-950" />
                            <span>Suggested</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-sm text-slate-900 leading-snug">{add.name}</h4>
                            <input
                              type="checkbox"
                              checked={add.enabled}
                              onChange={(e) => {
                                const copy = [...formData.addOns];
                                copy[i].enabled = e.target.checked;
                                setFormData({ ...formData, addOns: copy });
                              }}
                              className="w-4 h-4 text-kai-blue rounded"
                              title="Aktifkan / Nonaktifkan layanan ini"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{add.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quota & Unit Price Information */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Harga Satuan</span>
                        <span className="font-black text-slate-900 text-sm">{formatIDR(add.price)}</span>
                        <span className="text-[9px] text-slate-400 block">{add.unitType || 'per unit'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Stok Kuota</span>
                        <span className="font-extrabold text-slate-900 text-sm">{formatNumber(add.stock || 500)}</span>
                        <span className="text-[9px] text-emerald-600 font-semibold block">Tersedia</span>
                      </div>
                    </div>

                    {/* Varian / Ukuran Chips Preview */}
                    {add.sizesString && (
                      <div className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">
                          Pilihan Ukuran / Varian:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {add.sizesString.split(',').map((v, idxV) => (
                            <span key={idxV} className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {v.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Controls: Ubah Ukuran, Stok & Harga AND Tombol Automatic Suggest */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditAddon(i)}
                        className="w-full py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-kai-blue" />
                        <span>Ubah Ukuran, Stok & Harga</span>
                      </button>

                      {/* Tombol Automatic Suggest (Aktif / Nonaktif) */}
                      <button
                        type="button"
                        onClick={() => handleToggleAddonAutomaticSuggest(i)}
                        className={`w-full py-1.5 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                          add.automaticSuggest
                            ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        <Zap className={`w-3.5 h-3.5 ${add.automaticSuggest ? 'fill-slate-950 text-slate-950' : 'text-slate-400'}`} />
                        <span>{add.automaticSuggest ? '⚡ Automatic Suggest: AKTIF' : 'Automatic Suggest: Nonaktif'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SPECIAL OFFICIAL JERSEY SIZES BREAKDOWN TABLE */}
            {formData.addOns.find(a => a.isJersey) && (
              <div className="bg-white rounded-2xl p-5 border-2 border-kai-blue/30 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Alokasi Stok per Ukuran Jersey Resmi (Official Running Jersey)
                      </h4>
                      <span className="text-[10px] font-bold bg-kai-orange text-white px-2 py-0.5 rounded-full">
                        T-Shirt Sizes
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ukuran dan dimensi lebar/panjang dada yang tersedia untuk dipilih peserta lari pada saat pemesanan tiket.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const jerseyIdx = formData.addOns.findIndex(a => a.isJersey);
                      if (jerseyIdx !== -1) handleOpenEditAddon(jerseyIdx);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-kai-blue" />
                    <span>Ubah Alokasi Jersey</span>
                  </button>
                </div>

                {/* Sizes Grid Editor */}
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  <div className="grid grid-cols-12 bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    <div className="col-span-2">Ukuran</div>
                    <div className="col-span-4">Lebar / Panjang Dada</div>
                    <div className="col-span-3">Stok Kuota</div>
                    <div className="col-span-3">Harga Satuan</div>
                  </div>

                  {(formData.addOns.find(a => a.isJersey)?.sizes || [
                    { size: 'S', chestWidth: 48, length: 66, stock: 120, price: 150000 },
                    { size: 'M', chestWidth: 50, length: 68, stock: 300, price: 150000 },
                    { size: 'L', chestWidth: 52, length: 70, stock: 350, price: 150000 },
                    { size: 'XL', chestWidth: 54, length: 72, stock: 180, price: 150000 },
                    { size: 'XXL', chestWidth: 56, length: 74, stock: 80, price: 150000 },
                  ]).map((item, sIdx) => (
                    <div key={sIdx} className="grid grid-cols-12 px-3 py-2.5 items-center text-xs hover:bg-slate-50 transition-colors">
                      <div className="col-span-2 font-black text-slate-900 flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-md bg-blue-50 text-kai-blue border border-blue-200 flex items-center justify-center font-bold text-xs">
                          {item.size}
                        </span>
                      </div>
                      <div className="col-span-4 text-slate-600 font-medium">
                        Lebar: <strong className="text-slate-800">{item.chestWidth} cm</strong> • Panjang: <strong className="text-slate-800">{item.length} cm</strong>
                      </div>
                      <div className="col-span-3 font-bold text-slate-800">
                        {item.stock} pcs
                      </div>
                      <div className="col-span-3 font-extrabold text-kai-blue">
                        {formatIDR(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 7: Review */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Langkah 7: Tinjau Kembali Data Event (Review)
            </h3>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-bold block">Judul Event:</span>
                  <span className="text-sm font-bold text-slate-900">{formData.title || 'Event Baru'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Kategori & Penyelenggara:</span>
                  <span className="font-semibold text-slate-800">{formData.category} • {formData.organizer}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Jadwal & Waktu:</span>
                  <span className="font-semibold text-slate-800">{formData.date} ({formData.timeStart} - {formData.timeEnd} WIB)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Lokasi & Venue:</span>
                  <span className="font-semibold text-slate-800">{formData.venue}, {formData.city}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 font-bold block mb-2">Kategori Tiket Diterbitkan:</span>
                <div className="space-y-1.5">
                  {formData.tickets.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                      <div>
                        <strong className="text-slate-900">{t.name}</strong> ({t.tier})
                      </div>
                      <div className="font-bold text-kai-blue">
                        {formatIDR(t.price)} • {t.quota} tiket
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Publish Success Confirmation */}
        {currentStep === 8 && (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Event Berhasil Diterbitkan!
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Event Anda sekarang telah aktif dengan status <strong>"On Sale"</strong> dan dapat langsung dipantau melalui Dashboard serta menu Tiket & Penjualan.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentNav('events-all')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Lihat di Daftar Event
              </button>
              <button
                onClick={() => setCurrentNav('dashboard')}
                className="px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        {currentStep < 8 && (
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="flex items-center gap-1 px-5 py-2 rounded-xl bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <span>Lanjut: {steps[currentStep].split('. ')[1]}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishPublish}
                className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Terbitkan Event Sekarang</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* MODAL: UBAH DETAIL, UKURAN, KUOTA STOK, DAN HARGA SATUAN ADD-ON */}
      {isEditAddonModalOpen && editingAddonIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-kai-blue flex items-center justify-center font-bold">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Ubah Konfigurasi Add-on</h3>
                  <span className="text-[10px] text-slate-400">
                    {formData.addOns[editingAddonIndex]?.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditAddonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Layanan Tambahan *</label>
                <input
                  type="text"
                  value={editAddonFormData.name}
                  onChange={(e) => setEditAddonFormData({ ...editAddonFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold focus:border-kai-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Harga Satuan */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Satuan (IDR) *</label>
                  <input
                    type="number"
                    value={editAddonFormData.price}
                    onChange={(e) => setEditAddonFormData({ ...editAddonFormData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-black text-kai-blue focus:border-kai-blue focus:outline-none text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Harga tampil di Consumer View</span>
                </div>

                {/* Kuota Stok */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah Stok Kuota *</label>
                  <input
                    type="number"
                    value={editAddonFormData.stock}
                    onChange={(e) => setEditAddonFormData({ ...editAddonFormData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 focus:border-kai-blue focus:outline-none text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Maksimal pemesanan pembeli</span>
                </div>
              </div>

              {/* Ukuran / Varian Produk */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">
                    Pilihan Ukuran / Varian (Pisahkan dengan koma)
                  </label>
                  <span className="text-[10px] text-kai-blue font-bold">
                    {formData.addOns[editingAddonIndex]?.isJersey ? 'T-Shirt Sizes' : 'Opsi Varian Produk'}
                  </span>
                </div>
                <input
                  type="text"
                  value={editAddonFormData.sizesString}
                  onChange={(e) => setEditAddonFormData({ ...editAddonFormData, sizesString: e.target.value })}
                  placeholder={formData.addOns[editingAddonIndex]?.isJersey ? "S, M, L, XL, XXL, 3XL" : "Varian 1, Varian 2, Varian 3"}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold uppercase focus:border-kai-blue focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {formData.addOns[editingAddonIndex]?.isJersey
                    ? "Varian ukuran ini akan otomatis muncul pada form pilihan jersey peserta."
                    : "Pilihan ukuran/varian yang dapat dipilih peserta saat memesan tiket di aplikasi mobile."}
                </span>
              </div>

              {/* Automatic Suggest Toggle in Modal */}
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="font-extrabold text-slate-900 block text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span>Automatic Suggest (Rekomendasi Otomatis)</span>
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Layanan ini otomatis disorot dan direkomendasikan pada alur pemesanan tiket Consumer View.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditAddonFormData(prev => ({ ...prev, automaticSuggest: !prev.automaticSuggest }))}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1 shrink-0 ${
                    editAddonFormData.automaticSuggest
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 ring-2 ring-amber-300/80 shadow-xs'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
                  }`}
                >
                  <Zap className={`w-3 h-3 ${editAddonFormData.automaticSuggest ? 'fill-slate-950' : 'text-slate-400'}`} />
                  <span>{editAddonFormData.automaticSuggest ? 'AKTIF' : 'NONAKTIF'}</span>
                </button>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Layanan</label>
                <textarea
                  rows={2}
                  value={editAddonFormData.description}
                  onChange={(e) => setEditAddonFormData({ ...editAddonFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:border-kai-blue focus:outline-none text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditAddonModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEditAddon}
                className="px-5 py-2 text-xs font-bold text-white bg-kai-blue hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW GAMBAR FULLSCREEN */}
      {previewModalImg && (
        <div
          onClick={() => setPreviewModalImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-3 border-b flex justify-between items-center bg-slate-50">
              <span className="font-bold text-xs text-slate-800">Pratinjau Gambar Penuh</span>
              <button
                onClick={() => setPreviewModalImg(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 p-1"
              >
                Tutup ✕
              </button>
            </div>
            <div className="bg-slate-950 p-2 flex items-center justify-center max-h-[80vh]">
              <img
                src={previewModalImg}
                alt="Full preview"
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
