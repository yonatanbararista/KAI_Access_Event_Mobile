import React, { useState } from 'react';
import {
  Ticket,
  Plus,
  Search,
  Filter,
  Layers,
  Sparkles,
  DollarSign,
  Users,
} from 'lucide-react';
import { usePartnerPortal } from '../../context/PartnerPortalContext';
import { TicketTierCard } from '../../components/tickets/TicketTierCard';
import { EditTicketModal } from '../../components/tickets/EditTicketModal';

export function TicketTypesPage() {
  const {
    currentEvent,
    updateTicketTier,
    addTicketToEvent,
  } = usePartnerPortal();

  const [search, setSearch] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState('ALL');
  const [editingTicket, setEditingTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tickets = currentEvent?.tickets || [];

  const filteredTickets = tickets.filter((tkt) => {
    if (selectedTierFilter !== 'ALL' && tkt.tier !== selectedTierFilter) return false;
    if (search && !tkt.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleOpenAdd = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tkt) => {
    setEditingTicket(tkt);
    setIsModalOpen(true);
  };

  const handleSaveTicket = (data) => {
    if (editingTicket) {
      updateTicketTier(currentEvent.id, editingTicket.id, data);
    } else {
      addTicketToEvent(currentEvent.id, data);
    }
  };

  const handleDuplicate = (tkt) => {
    const clone = {
      ...tkt,
      name: `${tkt.name} (Copy)`,
      sold: 0,
      status: 'On Sale',
    };
    addTicketToEvent(currentEvent.id, clone);
  };

  const handleToggleStatus = (tkt) => {
    const nextStatus = tkt.status === 'On Sale' ? 'Closed' : 'On Sale';
    updateTicketTier(currentEvent.id, tkt.id, { status: nextStatus });
  };

  const handleDelete = (ticketId) => {
    const remaining = tickets.filter((t) => t.id !== ticketId);
    // update in context
    currentEvent.tickets = remaining;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-1">
            <span>Event:</span>
            <span className="text-kai-blue font-bold">{currentEvent.title}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Kategori Tiket (Ticket Types)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola tingkatan tiket (Early Bird, Presale, Normal, VIP, VVIP) dengan batas pembelian dan periode penjualan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-kai-blue hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori Tiket</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama kategori tiket..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400">Filter Tier:</span>
          {['ALL', 'Early Bird', 'Presale', 'Normal', 'VIP', 'VVIP'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTierFilter(tier)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedTierFilter === tier
                  ? 'bg-kai-blue text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTickets.map((tkt) => (
          <TicketTierCard
            key={tkt.id}
            ticket={tkt}
            onEdit={handleOpenEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {/* Add / Edit Modal */}
      <EditTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={editingTicket}
        onSave={handleSaveTicket}
      />
    </div>
  );
}
