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
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { formatIDR } from '../../utils/currency';
import { calculateServiceFee, getFeeUnitInfo } from '../../utils/feeCalculator';

export function CreateEventPage() {
  const { addEvent, setCurrentNav } = usePartnerPortal();

  const [currentStep, setCurrentStep] = useState(1);

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
    addOns: [
      { name: 'KAI Shuttle Bus (Stasiun ke Venue PP)', price: 45000, enabled: true },
      { name: 'Official T-Shirt Merchandise', price: 175000, enabled: true },
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
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Langkah 2: Poster, Banner & Ketentuan (Event Details)
            </h3>

            {/* Poster & Banner Upload Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poster Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Poster Resmi Event (3:4 Ratio)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  {formData.posterUrl ? (
                    <div className="relative group">
                      <img
                        src={formData.posterUrl}
                        alt="Preview Poster"
                        className="h-56 mx-auto rounded-lg object-cover shadow-sm"
                      />
                      <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-opacity">
                        Ganti Gambar Poster
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'posterUrl')}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer py-6">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-kai-blue">Pilih file poster</span>
                      <span className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 5MB (Simulasi Lokal)</span>
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
                  Banner Web / Hero Image (16:9 Ratio)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  {formData.bannerUrl ? (
                    <div className="relative group">
                      <img
                        src={formData.bannerUrl}
                        alt="Preview Banner"
                        className="h-56 w-full rounded-lg object-cover shadow-sm"
                      />
                      <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-opacity">
                        Ganti Banner Web
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'bannerUrl')}
                          className="hidden"
                        />
                      </label>
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

            {/* Terms & Conditions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Syarat & Ketentuan Acara
              </label>
              <textarea
                rows="3"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
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

        {/* Step 5: Seating, Layout, Benefits & Other Info Images */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Langkah 5: Denah Kursi, Manfaat Kategori & Gambar Informasi Acara
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Atur tipe kursi, unggah denah panggung/layout seat, kelola keuntungan tiket (benefits), dan infografis penting.
              </p>
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

            {/* 2. Upload Space for Layout Seat */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Upload Denah Kursi & Panggung (Seat Layout Map)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Unggah denah visual panggung atau rute untuk ditampilkan di aplikasi
                  </span>
                </div>
                <span className="text-[10px] bg-blue-50 text-kai-blue font-bold px-2 py-0.5 rounded">
                  Format PNG / JPG
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center hover:border-kai-blue transition-colors bg-slate-50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-kai-blue block">Pilih File Denah Kursi</span>
                  <span className="text-[10px] text-slate-400">Rekomendasi resolusi tinggi min. 1200x800px</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'seatLayoutUrl')}
                    className="hidden"
                    id="seatLayoutUpload"
                  />
                  <label
                    htmlFor="seatLayoutUpload"
                    className="mt-3 inline-block px-4 py-1.5 bg-kai-blue text-white font-bold text-xs rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Unggah Gambar
                  </label>
                </div>

                <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {formData.seatLayoutUrl ? (
                    <img
                      src={formData.seatLayoutUrl}
                      alt="Denah Kursi"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-3 text-slate-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <span className="text-xs">Belum ada denah diunggah</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Space for Benefits (Keuntungan per Kategori) */}
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

            {/* 4. Space for Upload Gambar Informasi Lain */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Upload Gambar Informasi Tambahan Acara
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Unggah rundown acara, peta akses venue, dan lokasi penukaran tiket / race pack
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Rundown */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
                  <span className="text-xs font-bold text-slate-800 block">1. Rundown Acara</span>
                  <div className="h-28 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                    {formData.rundownUrl ? (
                      <img src={formData.rundownUrl} alt="Rundown" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1 bg-white border border-slate-300 text-[11px] font-bold text-kai-blue rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    Upload Rundown
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'rundownUrl')} className="hidden" />
                  </label>
                </div>

                {/* Akses Venue */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
                  <span className="text-xs font-bold text-slate-800 block">2. Peta Akses Gate</span>
                  <div className="h-28 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                    {formData.venueAccessUrl ? (
                      <img src={formData.venueAccessUrl} alt="Akses Gate" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1 bg-white border border-slate-300 text-[11px] font-bold text-kai-blue rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    Upload Denah Gate
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'venueAccessUrl')} className="hidden" />
                  </label>
                </div>

                {/* Race Pack / Tiket */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
                  <span className="text-xs font-bold text-slate-800 block">3. Panduan Race Pack</span>
                  <div className="h-28 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center">
                    {formData.racePackUrl ? (
                      <img src={formData.racePackUrl} alt="Race Pack" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-slate-400">Belum ada file</span>
                    )}
                  </div>
                  <label className="block w-full py-1 bg-white border border-slate-300 text-[11px] font-bold text-kai-blue rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    Upload Info RPC
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'racePackUrl')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Add-ons & Official Jersey Size Editor */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Langkah 6: Layanan Tambahan (Add-ons) & Official Jersey
                </h3>
                <p className="text-xs text-slate-500">
                  Kelola paket add-on penonton dan alokasi ukuran jersey (S, M, L, XL, XXL).
                </p>
              </div>
            </div>

            {/* Standard Add-ons Toggles */}
            <div className="space-y-3">
              {formData.addOns.map((add, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={add.enabled}
                      onChange={(e) => {
                        const copy = [...formData.addOns];
                        copy[i].enabled = e.target.checked;
                        setFormData({ ...formData, addOns: copy });
                      }}
                      className="w-4 h-4 text-kai-blue rounded"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{add.name}</h4>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {formatIDR(add.price)} / unit
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    add.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {add.enabled ? 'Aktif' : 'Non-aktif'}
                  </span>
                </div>
              ))}
            </div>

            {/* SPECIAL OFFICIAL JERSEY SIZES MANAGEMENT SECTION */}
            <div className="bg-white rounded-2xl p-5 border-2 border-kai-blue/30 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Konfigurasi Ukuran Jersey Resmi (Official Running Jersey)
                    </h4>
                    <span className="text-[10px] font-bold bg-kai-orange text-white px-2 py-0.5 rounded-full">
                      T-Shirt Sizes
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tentukan ukuran, dimensi lebar/panjang dada, kuota stok, dan harga satuan jersey.
                  </p>
                </div>
              </div>

              {/* Sizes Grid Editor */}
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                <div className="grid grid-cols-12 bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  <div className="col-span-2">Ukuran</div>
                  <div className="col-span-3">Lebar / Panjang</div>
                  <div className="col-span-3">Stok Kuota</div>
                  <div className="col-span-3">Harga Satuan</div>
                  <div className="col-span-1 text-right">Status</div>
                </div>

                {[
                  { sz: 'S', w: 48, l: 66, stock: 120, price: 150000 },
                  { sz: 'M', w: 50, l: 68, stock: 300, price: 150000 },
                  { sz: 'L', w: 52, l: 70, stock: 350, price: 150000 },
                  { sz: 'XL', w: 54, l: 72, stock: 180, price: 150000 },
                  { sz: 'XXL', w: 56, l: 74, stock: 80, price: 150000 },
                ].map((item, sIdx) => (
                  <div key={sIdx} className="grid grid-cols-12 px-3 py-2.5 items-center text-xs hover:bg-slate-50 transition-colors">
                    <div className="col-span-2 font-black text-slate-900 flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md bg-blue-50 text-kai-blue border border-blue-200 flex items-center justify-center font-bold text-xs">
                        {item.sz}
                      </span>
                    </div>
                    <div className="col-span-3 text-slate-600 font-medium">
                      {item.w} cm / {item.l} cm
                    </div>
                    <div className="col-span-3 font-bold text-slate-800">
                      {item.stock} pcs
                    </div>
                    <div className="col-span-3 font-extrabold text-kai-blue">
                      {formatIDR(item.price)}
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                        ✓ On
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
}
