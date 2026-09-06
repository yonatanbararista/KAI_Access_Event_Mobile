import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ORGANIZATION,
  INITIAL_BANK_ACCOUNTS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_PROMO_CODES,
  INITIAL_EVENTS,
  INITIAL_ORDERS,
  INITIAL_ATTENDEES,
  INITIAL_CHECKIN_ACTIVITIES,
  INITIAL_FINANCIAL_SUMMARY,
  INITIAL_PAYOUT_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SEAT_MAP,
} from '../data/portalMockData';
import { calculateServiceFee } from '../utils/feeCalculator';

const STORAGE_KEY = 'KAI_B2B_PORTAL_STATE_V1';

const PartnerPortalContext = createContext(null);

export function PartnerPortalProvider({ children }) {
  // Navigation & Application Mode
  const [appMode, setAppMode] = useState('partner-portal'); // 'partner-portal' | 'consumer-mobile'
  const [currentNav, setCurrentNav] = useState('dashboard'); // 'dashboard', 'events-all', 'events-create', 'tickets-types', 'tickets-quota', 'tickets-seating', 'tickets-promo', 'sales-orders', 'sales-attendees', 'ops-checkin', 'finance-revenue', 'finance-payout', 'reports-sales', 'reports-recon', 'reports-final', 'org-profile', 'org-bank', 'org-team', 'settings'
  const [selectedEventId, setSelectedEventId] = useState('evt-01');

  // Core Data States with LocalStorage fallback
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [attendees, setAttendees] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_attendees`);
      return saved ? JSON.parse(saved) : INITIAL_ATTENDEES;
    } catch {
      return INITIAL_ATTENDEES;
    }
  });

  const [checkInActivities, setCheckInActivities] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_checkin_act`);
      return saved ? JSON.parse(saved) : INITIAL_CHECKIN_ACTIVITIES;
    } catch {
      return INITIAL_CHECKIN_ACTIVITIES;
    }
  });

  const [promoCodes, setPromoCodes] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_promo`);
      return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
    } catch {
      return INITIAL_PROMO_CODES;
    }
  });

  const [organization, setOrganization] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_org`);
      return saved ? JSON.parse(saved) : INITIAL_ORGANIZATION;
    } catch {
      return INITIAL_ORGANIZATION;
    }
  });

  const [bankAccounts, setBankAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bank`);
      return saved ? JSON.parse(saved) : INITIAL_BANK_ACCOUNTS;
    } catch {
      return INITIAL_BANK_ACCOUNTS;
    }
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_team`);
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [payoutRecords, setPayoutRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_payouts`);
      return saved ? JSON.parse(saved) : INITIAL_PAYOUT_RECORDS;
    } catch {
      return INITIAL_PAYOUT_RECORDS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_notifs`);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [seatMap, setSeatMap] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_seatmap`);
      return saved ? JSON.parse(saved) : INITIAL_SEAT_MAP;
    } catch {
      return INITIAL_SEAT_MAP;
    }
  });

  // Scanner & Offline Simulation State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [pendingOfflineScans, setPendingOfflineScans] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('');

  // Persist key collections
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORAGE_KEY}_attendees`, JSON.stringify(attendees));
      localStorage.setItem(`${STORAGE_KEY}_checkin_act`, JSON.stringify(checkInActivities));
      localStorage.setItem(`${STORAGE_KEY}_promo`, JSON.stringify(promoCodes));
      localStorage.setItem(`${STORAGE_KEY}_org`, JSON.stringify(organization));
      localStorage.setItem(`${STORAGE_KEY}_bank`, JSON.stringify(bankAccounts));
      localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(teamMembers));
      localStorage.setItem(`${STORAGE_KEY}_payouts`, JSON.stringify(payoutRecords));
      localStorage.setItem(`${STORAGE_KEY}_notifs`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY}_seatmap`, JSON.stringify(seatMap));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [events, orders, attendees, checkInActivities, promoCodes, organization, bankAccounts, teamMembers, payoutRecords, notifications, seatMap]);

  // Derived selected event
  const currentEvent = events.find((e) => e.id === selectedEventId) || events[0] || INITIAL_EVENTS[0];

  // Helper functions
  const addEvent = (newEvent) => {
    const created = {
      ...newEvent,
      id: `evt-${Date.now()}`,
      status: 'On Sale',
      ticketsSold: 0,
      grossRevenue: 0,
      checkInCount: 0,
      checkInRate: 0,
    };
    setEvents((prev) => [created, ...prev]);
    setSelectedEventId(created.id);
    return created;
  };

  const updateEvent = (id, updates) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt))
    );
  };

  const duplicateEvent = (id) => {
    const original = events.find((e) => e.id === id);
    if (!original) return;
    const clone = {
      ...original,
      id: `evt-${Date.now()}`,
      title: `${original.title} (Copy)`,
      status: 'Draft',
      ticketsSold: 0,
      grossRevenue: 0,
      checkInCount: 0,
      checkInRate: 0,
    };
    setEvents((prev) => [clone, ...prev]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updateTicketTier = (eventId, ticketId, updates) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const updatedTickets = evt.tickets.map((t) =>
          t.id === ticketId ? { ...t, ...updates } : t
        );
        return { ...evt, tickets: updatedTickets };
      })
    );
  };

  const addTicketToEvent = (eventId, ticketData) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const newTicket = {
          id: `tkt-${Date.now()}`,
          sold: 0,
          status: 'On Sale',
          ...ticketData,
        };
        return { ...evt, tickets: [...evt.tickets, newTicket] };
      })
    );
  };

  // Check-In Simulation Engine
  const simulateCheckIn = (ticketIdInput) => {
    const trimmedId = (ticketIdInput || '').trim().toUpperCase();
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    // Find attendee
    const attendee = attendees.find(
      (a) => a.ticketId.toUpperCase() === trimmedId
    );

    if (!attendee) {
      const invalidLog = {
        id: `chk-${Date.now()}`,
        time: timeStr,
        attendeeName: 'Unknown Ticket',
        ticketTier: '-',
        seat: '-',
        ticketId: trimmedId,
        status: 'invalid',
        message: 'Tiket Tidak Ditemukan',
      };
      setCheckInActivities((prev) => [invalidLog, ...prev]);
      return {
        success: false,
        status: 'invalid',
        title: 'TIKET TIDAK VALID',
        message: 'Nomor tiket tidak terdaftar dalam basis data sistem.',
      };
    }

    // Check if already used
    if (attendee.checkInStatus === 'Checked In') {
      const duplicateLog = {
        id: `chk-${Date.now()}`,
        time: timeStr,
        attendeeName: `${attendee.name} (Duplikat)`,
        ticketTier: attendee.ticketTier,
        seat: attendee.seat,
        ticketId: attendee.ticketId,
        status: 'already_used',
        message: `Tiket Sudah Digunakan pada ${attendee.checkInTime || 'sesi sebelumnya'}`,
      };
      setCheckInActivities((prev) => [duplicateLog, ...prev]);
      return {
        success: false,
        status: 'already_used',
        title: 'TIKET SUDAH DIGUNAKAN',
        attendee,
        checkInTime: attendee.checkInTime,
        message: `Tiket ini telah di-check-in sebelumnya pada ${attendee.checkInTime || 'sesi sebelumnya'}.`,
      };
    }

    // Valid case
    if (isOfflineMode) {
      // Queue offline
      const offlineRecord = {
        ticketId: attendee.ticketId,
        attendeeName: attendee.name,
        ticketTier: attendee.ticketTier,
        seat: attendee.seat,
        timestamp: timeStr,
      };
      setPendingOfflineScans((prev) => [...prev, offlineRecord]);
      // Mark attendee locally
      setAttendees((prev) =>
        prev.map((a) =>
          a.ticketId === attendee.ticketId
            ? { ...a, checkInStatus: 'Checked In', checkInTime: `${timeStr} WIB (Offline)` }
            : a
        )
      );
      return {
        success: true,
        status: 'offline_queued',
        title: 'DISIMPAN SECARA OFFLINE',
        attendee,
        message: 'Scan berhasil dicatat dalam antrean lokal offline.',
      };
    }

    // Online valid check-in
    setAttendees((prev) =>
      prev.map((a) =>
        a.ticketId === attendee.ticketId
          ? { ...a, checkInStatus: 'Checked In', checkInTime: `${timeStr} WIB` }
          : a
      )
    );

    const validLog = {
      id: `chk-${Date.now()}`,
      time: timeStr,
      attendeeName: attendee.name,
      ticketTier: attendee.ticketTier,
      seat: attendee.seat,
      ticketId: attendee.ticketId,
      status: 'valid',
      message: 'Check-in Berhasil',
    };
    setCheckInActivities((prev) => [validLog, ...prev]);

    // Update event check-in count
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === attendee.eventId || evt.id === selectedEventId) {
          const newCount = (evt.checkInCount || 0) + 1;
          const rate = evt.totalQuota > 0 ? Math.round((newCount / evt.totalQuota) * 100) : 0;
          return { ...evt, checkInCount: newCount, checkInRate: rate };
        }
        return evt;
      })
    );

    return {
      success: true,
      status: 'valid',
      title: 'VALID TICKET',
      attendee,
      message: 'Check-in berhasil. Silakan masuk ke area acara.',
    };
  };

  // Offline Sync Simulation
  const syncOfflineScans = () => {
    if (pendingOfflineScans.length === 0) return;
    setIsSyncing(true);
    setSyncStatusText(`Menyinkronkan ${pendingOfflineScans.length} data scan...`);

    setTimeout(() => {
      const count = pendingOfflineScans.length;
      setCheckInActivities((prev) => [
        {
          id: `sync-${Date.now()}`,
          time: new Date().toTimeString().split(' ')[0],
          attendeeName: `SINKRONISASI BATCH (${count} scan)`,
          ticketTier: 'SYSTEM',
          seat: '-',
          ticketId: 'BATCH-SYNC',
          status: 'valid',
          message: `${count} / ${count} scan tersinkronisasi sempurna`,
        },
        ...prev,
      ]);
      setPendingOfflineScans([]);
      setIsSyncing(false);
      setSyncStatusText(`✓ Semua ${count} scan tersinkronisasi!`);
      setTimeout(() => setSyncStatusText(''), 4000);
    }, 1800);
  };

  const toggleOfflineMode = () => {
    if (isOfflineMode) {
      // Switching back online -> auto-sync
      setIsOfflineMode(false);
      if (pendingOfflineScans.length > 0) {
        syncOfflineScans();
      }
    } else {
      setIsOfflineMode(true);
    }
  };

  // Promo Codes CRUD
  const addPromoCode = (codeData) => {
    const newCode = {
      id: `prm-${Date.now()}`,
      usedCount: 0,
      status: 'Active',
      ...codeData,
    };
    setPromoCodes((prev) => [newCode, ...prev]);
  };

  const togglePromoStatus = (id) => {
    setPromoCodes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Disabled' : 'Active' } : p
      )
    );
  };

  const deletePromoCode = (id) => {
    setPromoCodes((prev) => prev.filter((p) => p.id !== id));
  };

  // Bank Accounts CRUD
  const addBankAccount = (accountData) => {
    const newAccount = {
      id: `bank-${Date.now()}`,
      status: 'Verified',
      maskedNumber: `•••• •••• ${accountData.accountNumber.slice(-4)}`,
      isPrimary: bankAccounts.length === 0,
      ...accountData,
    };
    setBankAccounts((prev) => [...prev, newAccount]);
  };

  const setPrimaryBankAccount = (id) => {
    setBankAccounts((prev) =>
      prev.map((b) => ({ ...b, isPrimary: b.id === id }))
    );
  };

  const deleteBankAccount = (id) => {
    setBankAccounts((prev) => prev.filter((b) => b.id !== id));
  };

  // Team Management CRUD
  const addTeamMember = (memberData) => {
    const newMember = {
      id: `usr-${Date.now()}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      status: 'Active',
      lastActive: 'Baru saja',
      ...memberData,
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamRole = (id, newRole) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
  };

  const removeTeamMember = (id) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Organization update
  const updateOrganization = (updates) => {
    setOrganization((prev) => ({ ...prev, ...updates }));
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Payout request
  const requestPayout = (amount, eventName) => {
    const primaryBank = bankAccounts.find((b) => b.isPrimary) || bankAccounts[0];
    const newPayout = {
      id: `PO-${Date.now().toString().slice(-6)}`,
      event: eventName || currentEvent.title,
      grossSales: amount,
      deductions: Math.round(amount * 0.04), // ~4% total fee/deduction
      netPayout: Math.round(amount * 0.96),
      status: 'Scheduled',
      payoutDate: '15 Okt 2026',
      bankName: `${primaryBank.bank} (${primaryBank.accountName})`,
      accountNumber: primaryBank.maskedNumber,
    };
    setPayoutRecords((prev) => [newPayout, ...prev]);
  };

  // Reset to original mock data
  const resetToDefaults = () => {
    setEvents(INITIAL_EVENTS);
    setOrders(INITIAL_ORDERS);
    setAttendees(INITIAL_ATTENDEES);
    setCheckInActivities(INITIAL_CHECKIN_ACTIVITIES);
    setPromoCodes(INITIAL_PROMO_CODES);
    setOrganization(INITIAL_ORGANIZATION);
    setBankAccounts(INITIAL_BANK_ACCOUNTS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setPayoutRecords(INITIAL_PAYOUT_RECORDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSeatMap(INITIAL_SEAT_MAP);
    setIsOfflineMode(false);
    setPendingOfflineScans([]);
    localStorage.clear();
  };

  return (
    <PartnerPortalContext.Provider
      value={{
        appMode,
        setAppMode,
        currentNav,
        setCurrentNav,
        selectedEventId,
        setSelectedEventId,
        currentEvent,
        events,
        addEvent,
        updateEvent,
        duplicateEvent,
        deleteEvent,
        updateTicketTier,
        addTicketToEvent,
        orders,
        attendees,
        checkInActivities,
        simulateCheckIn,
        isOfflineMode,
        toggleOfflineMode,
        pendingOfflineScans,
        isSyncing,
        syncStatusText,
        syncOfflineScans,
        promoCodes,
        addPromoCode,
        togglePromoStatus,
        deletePromoCode,
        organization,
        updateOrganization,
        bankAccounts,
        addBankAccount,
        setPrimaryBankAccount,
        deleteBankAccount,
        teamMembers,
        addTeamMember,
        updateTeamRole,
        removeTeamMember,
        financialSummary: INITIAL_FINANCIAL_SUMMARY,
        payoutRecords,
        requestPayout,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        seatMap,
        setSeatMap,
        resetToDefaults,
      }}
    >
      {children}
    </PartnerPortalContext.Provider>
  );
}

export function usePartnerPortal() {
  const context = useContext(PartnerPortalContext);
  if (!context) {
    throw new Error('usePartnerPortal must be used within a PartnerPortalProvider');
  }
  return context;
}
