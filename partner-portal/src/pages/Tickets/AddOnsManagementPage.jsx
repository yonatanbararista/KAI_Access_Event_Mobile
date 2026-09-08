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
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export function AddOnsManagementPage() {
  const { currentEvent } = usePartnerPortal();

  // Add-ons list
  const [addOns, setAddOns] = useState([
    {
      id: 'addon-jersey',
      name: 'Official Event Running Jersey',
      category: 'Merchandise Resmi',
      badge: 'Produk Unggulan',
      description: 'Jersey lari micro dry-fit berstandar internasional dengan strip reflektif 3M dan ventilasi optimal.',
      price: 150000,
      enabled: true,
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
      id: 'addon-shuttle',
      name: 'KAI Shuttle Bus (Stasiun ke Venue PP)',
      category: 'Transportasi Lokal',
      badge: 'Praktis',
      description: 'Bus AC eksekutif langsung dari stasiun terdekat ke gerbang masuk venue.',
      price: 45000,
      enabled: true,
      isJersey: false,
      stock: 500,
      sold: 160
    },
    {
      id: 'addon-lokocafe',
      name: 'Paket Makan + Kopi LokoCafe',
      category: 'Makanan & Minuman',
      badge: 'Favorit',
      description: 'Voucher makan khas LokoCafe dan signature iced coffee di area festival.',
      price: 60000,
      enabled: true,
      isJersey: false,
      stock: 400,
      sold: 215
    },
    {
      id: 'addon-merch',
      name: 'Claim Exclusive Merch (Paket Aksesoris)',
      category: 'Merchandise',
      badge: 'Edisi Terbatas',
      description: 'Topi pelari, lanyard edisi kolektor, dan wristband resmi KAI Heritage.',
      price: 120000,
      enabled: true,
      isJersey: false,
      stock: 250,
      sold: 88
    }
  ]);

  // Modal State for editing/adding jersey sizes
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [sizeFormData, setSizeFormData] = useState({
    size: '3XL',
    chestWidth: 58,
    length: 76,
    stock: 50,
    price: 150000
  });

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

  const handleToggleSize = (sizeId) => {
    setAddOns(prev => {
      return prev.map(item => {
        if (!item.isJersey) return item;
        return {
          ...item,
          sizes: item.sizes.map(s => s.id === sizeId ? { ...s, enabled: !s.enabled } : s)
        };
      });
    });
  };

  const handleToggleAddOn = (addonId) => {
    setAddOns(prev => prev.map(a => a.id === addonId ? { ...a, enabled: !a.enabled } : a));
  };

  const jerseyItem = addOns.find(a => a.isJersey);

  return (
    <div className="space-y-6 pb-12">
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
            Kelola produk add-on resmi seperti Official Running Jersey, shuttle bus, makanan, dan ukuran jersey (S, M, L, XL, XXL).
          </p>
        </div>
      </div>

      {/* OFFICIAL RUNNING JERSEY SPECIAL SECTION */}
      {jerseyItem && (
        <div className="bg-white rounded-2xl border-2 border-kai-blue/40 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
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

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleOpenAddSize}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Ukuran Jersey</span>
              </button>
            </div>
          </div>

          {/* Jersey Sizes Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Alokasi Stok & Harga per Ukuran (T-Shirt Sizes)
              </span>
              <span className="text-xs text-slate-400">
                Total Stok: {formatNumber(jerseyItem.sizes.reduce((sum, s) => sum + s.stock, 0))} pcs
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
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-kai-blue border border-blue-200 flex items-center justify-center text-xs">
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
                        title="Edit Ukuran"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSize(sz.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Hapus"
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

      {/* OTHER ADD-ONS LIST */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Layanan Tambahan Lainnya</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {addOns.filter(a => !a.isJersey).map((addon) => (
            <div key={addon.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-kai-blue bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {addon.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {addon.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{addon.name}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{addon.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Harga / Unit</span>
                  <span className="font-black text-sm text-slate-900">{formatIDR(addon.price)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAddOn(addon.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                    addon.enabled
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {addon.enabled ? '✓ Aktif' : 'Non-aktif'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD / EDIT JERSEY SIZE */}
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
