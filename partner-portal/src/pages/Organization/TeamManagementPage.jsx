import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  Edit2,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { StatusBadge } from '../../components/shared/StatusBadge';
import { Modal } from '../../components/shared/Modal';

export function TeamManagementPage() {
  const {
    teamMembers,
    addTeamMember,
    updateTeamRole,
    removeTeamMember,
  } = usePartnerPortal();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Event Manager',
  });

  const roles = [
    { name: 'Owner', desc: 'Akses penuh seluruh fitur finansial, payout, dan organisasi' },
    { name: 'Event Manager', desc: 'Membuat dan mengedit event, tiket, kuota, dan harga' },
    { name: 'Finance', desc: 'Melihat laporan penjualan, rekonsiliasi, dan mengajukan payout' },
    { name: 'Check-in Staff', desc: 'Hanya memiliki akses ke pemindai tiket di gate check-in' },
    { name: 'Viewer', desc: 'Hanya dapat melihat ringkasan dashboard tanpa aksi edit' },
  ];

  const handleInvite = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return;
    addTeamMember(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Event Manager',
    });
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Tim & Hak Akses (Team Management)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur anggota staf operasional, tim keuangan, dan petugas gate scanner check-in acara.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Undang Anggota Tim</span>
        </button>
      </div>

      {/* Role Descriptions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {roles.map((r) => (
          <div key={r.name} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="font-extrabold text-slate-900 block">{r.name}</span>
            <p className="text-[10px] text-slate-500 leading-tight">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Team Members List Table matching Section 29 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">
            Daftar Anggota Tim ({teamMembers.length} Orang)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Nama Anggota</th>
                <th className="px-4 py-3">Email & Kontak</th>
                <th className="px-4 py-3">Peran / Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aktivitas Terakhir</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {teamMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-bold text-slate-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-medium text-slate-800">{m.email}</div>
                    <div className="text-[10px] text-slate-400">{m.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <select
                      value={m.role}
                      onChange={(e) => updateTeamRole(m.id, e.target.value)}
                      disabled={m.role === 'Owner'}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-slate-800 font-semibold text-xs disabled:bg-slate-100 disabled:opacity-70"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Event Manager">Event Manager</option>
                      <option value="Finance">Finance</option>
                      <option value="Check-in Staff">Check-in Staff</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={m.status} size="sm" />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-medium">
                    {m.lastActive}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    {m.role !== 'Owner' && (
                      <button
                        onClick={() => removeTeamMember(m.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Undang Anggota Tim Baru"
        subtitle="Undangan akan dikirimkan ke email anggota tim untuk bergabung ke portal promotor."
        maxWidth="max-w-md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              form="inviteForm"
              className="px-4 py-2 text-xs font-semibold text-white bg-kai-blue hover:bg-blue-700 rounded-lg shadow-xs"
            >
              Kirim Undangan
            </button>
          </>
        }
      >
        <form id="inviteForm" onSubmit={handleInvite} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Dimas Wahyu"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Email Anggota
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="nama@organizer.id"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0812xxxxxxxx"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Pilih Peran (Role)
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
            >
              <option value="Event Manager">Event Manager</option>
              <option value="Finance">Finance</option>
              <option value="Check-in Staff">Check-in Staff</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
