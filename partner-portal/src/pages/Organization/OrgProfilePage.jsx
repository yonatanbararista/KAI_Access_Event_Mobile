import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Upload,
  Save,
  Mail,
  Phone,
  MapPin,
  FileText,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';

export function OrgProfilePage() {
  const { organization, updateOrganization } = usePartnerPortal();

  const [formData, setFormData] = useState({ ...organization });
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateOrganization(formData);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, logoUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Profil Promotor (Organization Profile)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Informasi identitas hukum, NPWP perusahaan, dan kontak resmi penanggung jawab promotor.
        </p>
      </div>

      {isSavedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Perubahan profil promotor berhasil disimpan ke penyimpanan lokal!</span>
        </div>
      )}

      {/* Form Card matching Section 27 */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Top Avatar / Logo Section */}
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={formData.logoUrl}
              alt="Logo Promotor"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
            />
            <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity">
              Ubah Logo
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900">{formData.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-kai-blue font-bold text-[10px] border border-blue-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                <span>Terverifikasi KAI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{formData.brandName}</p>
            <span className="text-[11px] text-slate-400">Bergabung sejak {formData.joinedDate}</span>
          </div>
        </div>

        {/* Form Fields matching Section 27 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Badan Usaha / Organisasi *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Bentuk Entitas Legal
            </label>
            <select
              value={formData.legalEntity}
              onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
            >
              <option value="Perseroan Terbatas (PT)">Perseroan Terbatas (PT)</option>
              <option value="CV">CV</option>
              <option value="Yayasan">Yayasan</option>
              <option value="Perorangan">Perorangan</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Penanggung Jawab (PIC) *
            </label>
            <input
              type="text"
              required
              value={formData.pic}
              onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor Pokok Wajib Pajak (NPWP)
            </label>
            <input
              type="text"
              value={formData.npwp}
              onChange={(e) => setFormData({ ...formData, npwp: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Email Resmi Kontak
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Alamat Kantor Operasional
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Kota / Kabupaten
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Kode Pos
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>
        </div>

        {/* Footer save */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
}
