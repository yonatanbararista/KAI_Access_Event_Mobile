import React, { useState } from 'react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { formatIDR, formatNumber } from '../../utils/currency';
import { 
  ShoppingBag, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Sparkles, 
  Shirt, 
  Tag, 
  Box, 
  Layers, 
  AlertCircle,
  Train,
  Car,
  Building2,
  Utensils,
  Bus,
  CheckCircle2,
  Zap,
  CheckCircle
} from 'lucide-react';

export function AddOnsManagementPage() {
  const { currentEvent } = usePartnerPortal();

  // Add-ons list fully aligned with Consumer View concepts
  const [addOns, setAddOns] = useState([
    {
      id: 'addon-jersey',
      name: 'Official Event Running Jersey',
      category: 'Merchandise Resmi',
      badge: 'Produk Unggulan',
      description: 'Jersey lari micro dry-fit berstandar internasional dengan strip reflektif 3M dan ventilasi optimal.',
      price: 150000,
      stock: 1080,
      sold: 560,
      enabled: true,
      automaticSuggest: true, // Tombol automatic suggest aktif
      isJersey: true,
      material: '100% Micro Dry-Fit Fabric (Breathable, Anti-UV UPF 50+, 120gsm)',
      sizes: [
        { id: 's-1', size: 'S', chestWidth: 48, length: 66, stock: 120, sold: 45, price: 150000, enabled: true },
        { id: 's-2', size: 'M', chestWidth: 50, length: 68, stock: 300, sold: 180, price: 150000, enabled: true },
        { id: 's-3', size: 'L', chestWidth: 52, length: 70, stock: 350, sold: 210, price: 150000, enabled: true },
        { id: 's-4', size: 'XL', chestWidth: 54, length: 72, stock: 180, sold: 95, price: 150000, enabled: true },
        { id: 's-5', size: 'XXL', chestWidth: 56, length: 74, stock: 80, sold: 30, price: 150000, enabled: true },
      ]
    },
    {
      id: 'addon-train',
      name: 'Tiket Kereta Api Bundling KAI (Diskon 5%)',
      category: 'Transportasi Kereta Api',
      badge: 'Diskon 5% Event',
      description: 'Integrasi pemesanan tiket kereta KAI resmi dengan diskon khusus peserta dan pemilihan jadwal per hari keberangkatan.',
      price: 247000,
      stock: 800,
      sold: 340,
      enabled: true,
      automaticSuggest: true,
      isJersey: false,
      unitType: 'Tiket Kereta'
    },
    {
      id: 'addon-rental',
      name: 'Car / Motor Rental (Mitra Pilihan KAI)',
      category: 'Transportasi & Sewa Unit',
      badge: 'Kupon Rp 50K',
      description: 'Sistem voucher/kupon seharga Rp 50.000 untuk sewa mobil & motor mitra KAI. Serah terima unit langsung di stasiun kedatangan.',
      price: 50000,
      stock: 300,
      sold: 115,
      enabled: true,
      automaticSuggest: true,
      isJersey: false,
      unitType: 'Voucher Rental'
    },
    {
      id: 'addon-hotel',
      name: 'Hotel Pilihan & Afiliasi KAI',
      category: 'Akomodasi & Penginapan',
      badge: 'Pemesanan Langsung',
      description: 'Reservasi hotel mitra & transit KAI Living terdekat dari venue event dengan sistem booking langsung terintegrasi.',
      price: 450000,
      stock: 150,
      sold: 65,
      enabled: true,
      automaticSuggest: true,
      isJersey: false,
      unitType: 'Kamar / Malam'
    },
    {
      id: 'addon-lokocafe',
      name: 'Paket Makan + Kopi LokoCafe',
      category: 'Makanan & Minuman',
      badge: 'Favorit',
      description: 'Voucher makan khas LokoCafe dan signature iced coffee di area festival / venue.',
      price: 60000,
      stock: 500,
      sold: 230,
      enabled: true,
      automaticSuggest: true,
      isJersey: false,
      unitType: 'Paket Makanan'
    },
    {
      id: 'addon-merch',
      name: 'Claim Exclusive Merch (Paket Aksesoris)',
      category: 'Merchandise',
      badge: 'Edisi Terbatas',
      description: 'Topi pelari, lanyard edisi kolektor, dan wristband resmi KAI Heritage.',
      price: 120000,
      stock: 250,
      sold: 88,
      enabled: true,
      automaticSuggest: false,
      isJersey: false,
      unitType: 'Paket Merch'
    },
    {
      id: 'addon-shuttle',
      name: 'KAI Shuttle Bus (Stasiun ke Venue PP)',
      category: 'Layanan Antar-Jemput',
      badge: 'Praktis',
      description: 'Bus AC eksekutif langsung pulang pergi dari stasiun terdekat ke gerbang masuk venue.',
      price: 35000,
      stock: 400,
      sold: 140,
      enabled: true,
      automaticSuggest: false,
      isJersey: false,
      unitType: 'Tiket Shuttle'
    }
  ]);

  // Toast / notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Modal 1: Edit Add-on Details (Ukuran, Kuota Stok, Harga Satuan)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    sizesString: 'S, M, L, XL, XXL'
  });

  // Modal 2: Edit / Add Jersey Size
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [sizeFormData, setSizeFormData] = useState({
    size: '3XL',
    chestWidth: 58,
    length: 76,
    stock: 50,
    price: 150000
  });

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

  // Toggle Automatic Suggest
  const handleToggleAutomaticSuggest = (addonId) => {
    setAddOns(prev => prev.map(a => {
      if (a.id === addonId) {
        const nextState = !a.automaticSuggest;
        showToast(`Automatic Suggest untuk "${a.name}" sekarang ${nextState ? 'AKTIF (Direkomendasikan Otomatis)' : 'NONAKTIF'}`);
        return { ...a, automaticSuggest: nextState };
      }
      return a;
    }));
  };

  // Open Edit Modal for any Add-on
  const handleOpenEditAddon = (addon) => {
    setEditingAddon(addon);
    setEditFormData({
      name: addon.name,
      price: addon.price,
      stock: addon.stock,
      description: addon.description,
      sizesString: addon.sizes ? addon.sizes.map(s => s.size).join(', ') : ''
    });
    setIsEditModalOpen(true);
  };

  // Save Edit Add-on (Ukuran, Stok Kuota, Harga Satuan)
  const handleSaveAddon = () => {
    if (!editingAddon) return;

    setAddOns(prev => prev.map(item => {
      if (item.id !== editingAddon.id) return item;

      let updatedSizes = item.sizes;
      if (item.isJersey && editFormData.sizesString) {
        const sizeNames = editFormData.sizesString.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
        updatedSizes = sizeNames.map((szName, idx) => {
          const existing = item.sizes?.find(s => s.size === szName);
          return existing || {
            id: `sz-${Date.now()}-${idx}`,
            size: szName,
            chestWidth: 48 + (idx * 2),
            length: 66 + (idx * 2),
            stock: Math.round(Number(editFormData.stock) / sizeNames.length),
            sold: 0,
            price: Number(editFormData.price),
            enabled: true
          };
        });
      }

      return {
        ...item,
        name: editFormData.name,
        price: Number(editFormData.price),
        stock: Number(editFormData.stock),
        description: editFormData.description,
        sizes: updatedSizes
      };
    }));

    setIsEditModalOpen(false);
    showToast(`Perubahan pada "${editFormData.name}" berhasil disimpan!`);
  };

  // Open Add Size Modal (Jersey)
  const handleOpenAddSize = () => {
    setEditingSize(null);
    setSizeFormData({
      size: '',
      chestWidth: 50,
      length: 70,
      stock: 100,
      price: 150000
    });
    setIsSizeModalOpen(true);
  };

  const handleOpenEditSize = (sz) => {
    setEditingSize(sz);
    setSizeFormData({
      size: sz.size,
      chestWidth: sz.chestWidth,
      length: sz.length,
      stock: sz.stock,
      price: sz.price
    });
    setIsSizeModalOpen(true);
  };

  const handleSaveSize = () => {
    if (!sizeFormData.size.trim()) return;

    setAddOns(prev => {
      return prev.map(item => {
        if (!item.isJersey) return item;
        const currentSizes = [...item.sizes];

        if (editingSize) {
          const updated = currentSizes.map(s => {
            if (s.id === editingSize.id) {
              return {
                ...s,
                size: sizeFormData.size.toUpperCase().trim(),
                chestWidth: Number(sizeFormData.chestWidth),
                length: Number(sizeFormData.length),
                stock: Number(sizeFormData.stock),
                price: Number(sizeFormData.price)
              };
            }
            return s;
          });
          return { ...item, sizes: updated };
        } else {
          const newSizeObj = {
            id: `sz-${Date.now()}`,
            size: sizeFormData.size.toUpperCase().trim(),
            chestWidth: Number(sizeFormData.chestWidth),
            length: Number(sizeFormData.length),
            stock: Number(sizeFormData.stock),
            sold: 0,
            price: Number(sizeFormData.price),
            enabled: true
          };
          return { ...item, sizes: [...currentSizes, newSizeObj] };
        }
      });
    });

    setIsSizeModalOpen(false);
    showToast(`Ukuran ${sizeFormData.size.toUpperCase()} berhasil disimpan!`);
  };

  const handleDeleteSize = (sizeId) => {
    setAddOns(prev => {
      return prev.map(item => {
        if (!item.isJersey) return item;
        return {
          ...item,
          sizes: item.sizes.filter(s => s.id !== sizeId)
        };
      });
    });
  };

  const jerseyItem = addOns.find(a => a.isJersey);

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
            <span>Event:</span>
            <span className="text-kai-blue font-bold">{currentEvent.title}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Layanan Tambahan (Add-ons) & Merchandise
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Konfigurasi opsi add-ons selaras dengan konsep Consumer View. Ubah ukuran varian, kuota stok, harga satuan, dan atur rekomendasi otomatis (*Automatic Suggest*).
          </p>
        </div>

        {/* Global Stats Summary */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            <div>
              <span className="text-[10px] text-amber-700 font-bold block uppercase leading-none">Automatic Suggest</span>
              <span className="font-extrabold text-amber-900">
                {addOns.filter(a => a.automaticSuggest).length} Layanan Aktif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. SPECIAL SECTION: OFFICIAL RUNNING JERSEY WITH SIZE MANAGEMENT */}
      {jerseyItem && (
        <div className="bg-white rounded-2xl border-2 border-kai-blue/40 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-kai-blue flex items-center justify-center shrink-0 shadow-2xs border border-blue-100">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-900">{jerseyItem.name}</h2>
                  <span className="text-[10px] font-black bg-kai-orange text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                    Official Jersey
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{jerseyItem.description}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Bahan: <span className="font-semibold text-slate-700">{jerseyItem.material}</span>
                </div>
              </div>
            </div>

            {/* Top Action Controls: Edit Add-on Button & Automatic Suggest Toggle */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
              {/* Button Ubah Ukuran, Stok, Harga */}
              <button
                type="button"
                onClick={() => handleOpenEditAddon(jerseyItem)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors border border-slate-200 shadow-2xs"
                title="Ubah Nama, Stok Kuota, dan Harga Satuan"
              >
                <Edit2 className="w-3.5 h-3.5 text-kai-blue" />
                <span>Ubah Detail & Stok</span>
              </button>

              {/* Automatic Suggest Button */}
              <button
                type="button"
                onClick={() => handleToggleAutomaticSuggest(jerseyItem.id)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs ${
                  jerseyItem.automaticSuggest
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold ring-2 ring-amber-300/60'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title="Klik untuk mengubah status rekomendasi otomatis di Consumer View"
              >
                <Zap className={`w-3.5 h-3.5 ${jerseyItem.automaticSuggest ? 'fill-slate-950 text-slate-950' : 'text-slate-400'}`} />
                <span>{jerseyItem.automaticSuggest ? '⚡ Automatic Suggest: AKTIF' : 'Automatic Suggest: Nonaktif'}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddSize}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Ukuran</span>
              </button>
            </div>
          </div>

          {/* Jersey Sizes Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Alokasi Stok & Harga per Ukuran (T-Shirt Sizes)
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Total Stok: {formatNumber(jerseyItem.sizes.reduce((sum, s) => sum + s.stock, 0))} pcs • Harga Dasar: {formatIDR(jerseyItem.price)}
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              <div className="grid grid-cols-12 bg-slate-50 px-4 py-2.5 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                <div className="col-span-2">Ukuran</div>
                <div className="col-span-3">Lebar / Panjang</div>
                <div className="col-span-3">Stok / Terjual</div>
                <div className="col-span-2">Harga Satuan</div>
                <div className="col-span-2 text-right">Aksi</div>
              </div>

              {jerseyItem.sizes.map((sz) => {
                const sRem = Math.max(0, sz.stock - sz.sold);
                return (
                  <div key={sz.id} className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-slate-50/80 transition-colors">
                    <div className="col-span-2 font-black text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-kai-blue border border-blue-200 flex items-center justify-center text-xs font-black">
                        {sz.size}
                      </span>
                    </div>

                    <div className="col-span-3 text-slate-600 font-medium">
                      Lebar: <strong className="text-slate-900">{sz.chestWidth} cm</strong> • Panjang: <strong className="text-slate-900">{sz.length} cm</strong>
                    </div>

                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{sz.stock} pcs</span>
                        <span className="text-[11px] text-slate-400">({sz.sold} terjual)</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">Tersisa {sRem} pcs</span>
                    </div>

                    <div className="col-span-2 font-black text-kai-blue">
                      {formatIDR(sz.price)}
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditSize(sz)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-kai-blue hover:bg-blue-50 transition-colors"
                        title="Edit Ukuran Ini"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSize(sz.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus Ukuran"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. ALL OTHER ADD-ONS LIST (KERETA, RENTAL, HOTEL, LOKOCAFE, MERCH, SHUTTLE) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Daftar Layanan Tambahan (Sesuai Konsep Consumer View)
            </h3>
            <p className="text-xs text-slate-500">
              Setiap opsi dapat diubah harga satuan, jumlah stok kuota, dan diaktifkan fitur rekomendasi otomatis (*Automatic Suggest*).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {addOns.filter(a => !a.isJersey).map((addon) => {
            const Icon = getAddonIcon(addon.id);

            return (
              <div
                key={addon.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between space-y-4 ${
                  addon.automaticSuggest
                    ? 'border-amber-300 ring-2 ring-amber-300/30'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-kai-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {addon.category}
                    </span>

                    {/* Automatic Suggest Badge */}
                    {addon.automaticSuggest && (
                      <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <Zap size={10} className="fill-slate-950" />
                        <span>Suggested</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">{addon.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{addon.description}</p>
                    </div>
                  </div>
                </div>

                {/* Quota & Unit Price Information */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Harga Satuan</span>
                    <span className="font-black text-slate-900 text-sm">{formatIDR(addon.price)}</span>
                    <span className="text-[9px] text-slate-400 block">{addon.unitType || 'per unit'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Stok Kuota</span>
                    <span className="font-extrabold text-slate-900 text-sm">{formatNumber(addon.stock)}</span>
                    <span className="text-[9px] text-emerald-600 font-semibold block">{formatNumber(addon.sold)} Terjual</span>
                  </div>
                </div>

                {/* Action Controls: Edit Button & Automatic Suggest Button */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Tombol Merubah Ukuran / Kuota / Harga */}
                    <button
                      type="button"
                      onClick={() => handleOpenEditAddon(addon)}
                      className="flex-1 py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 border border-slate-200"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-kai-blue" />
                      <span>Ubah Kuota & Harga</span>
                    </button>
                  </div>

                  {/* Tombol Automatic Suggest (Aktif / Nonaktif) */}
                  <button
                    type="button"
                    onClick={() => handleToggleAutomaticSuggest(addon.id)}
                    className={`w-full py-1.5 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      addon.automaticSuggest
                        ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${addon.automaticSuggest ? 'fill-slate-950 text-slate-950' : 'text-slate-400'}`} />
                    <span>{addon.automaticSuggest ? '⚡ Automatic Suggest: AKTIF' : 'Automatic Suggest: Nonaktif'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: UBAH DETAIL, KUOTA STOK, DAN HARGA SATUAN ADD-ON */}
      {isEditModalOpen && editingAddon && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-kai-blue flex items-center justify-center font-bold">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Ubah Konfigurasi Add-on</h3>
                  <span className="text-[10px] text-slate-400">{editingAddon.category}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
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
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold focus:border-kai-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Harga Satuan */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Satuan (IDR) *</label>
                  <input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-black text-kai-blue focus:border-kai-blue focus:outline-none text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Harga tampil di Consumer View</span>
                </div>

                {/* Kuota Stok */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah Stok Kuota *</label>
                  <input
                    type="number"
                    value={editFormData.stock}
                    onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-slate-900 focus:border-kai-blue focus:outline-none text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Maksimal pemesanan pembeli</span>
                </div>
              </div>

              {/* Ukuran / Varian (Jika item memiliki ukuran) */}
              {editingAddon.isJersey && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Daftar Ukuran / Varian (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={editFormData.sizesString}
                    onChange={(e) => setEditFormData({ ...editFormData, sizesString: e.target.value })}
                    placeholder="S, M, L, XL, XXL, 3XL"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-semibold uppercase focus:border-kai-blue focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Varian ukuran ini akan otomatis muncul pada form pengisian jersey peserta.
                  </span>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Layanan</label>
                <textarea
                  rows={2}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:border-kai-blue focus:outline-none text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveAddon}
                className="px-5 py-2 text-xs font-bold text-white bg-kai-blue hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT JERSEY SIZE */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingSize ? 'Edit Ukuran Jersey' : 'Tambah Ukuran Jersey Baru'}
              </h3>
              <button
                onClick={() => setIsSizeModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Ukuran (cth: S, M, L, XL, XXL, 3XL) *
                </label>
                <input
                  type="text"
                  value={sizeFormData.size}
                  onChange={(e) => setSizeFormData({ ...sizeFormData, size: e.target.value })}
                  placeholder="cth: 3XL"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold uppercase focus:border-kai-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lebar Dada (cm) *</label>
                  <input
                    type="number"
                    value={sizeFormData.chestWidth}
                    onChange={(e) => setSizeFormData({ ...sizeFormData, chestWidth: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:border-kai-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Panjang Baju (cm) *</label>
                  <input
                    type="number"
                    value={sizeFormData.length}
                    onChange={(e) => setSizeFormData({ ...sizeFormData, length: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-medium focus:border-kai-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kuota Stok (pcs) *</label>
                  <input
                    type="number"
                    value={sizeFormData.stock}
                    onChange={(e) => setSizeFormData({ ...sizeFormData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold focus:border-kai-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Satuan (Rp) *</label>
                  <input
                    type="number"
                    value={sizeFormData.price}
                    onChange={(e) => setSizeFormData({ ...sizeFormData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-bold text-kai-blue focus:border-kai-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveSize}
                className="px-4 py-2 text-xs font-bold text-white bg-kai-blue hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Simpan Ukuran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AddOnsManagementPage;
