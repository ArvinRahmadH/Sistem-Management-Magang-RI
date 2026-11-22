import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AUTH_ACCOUNTS,
  INITIAL_STUDENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_CANCELLATIONS,
  ADMIN_PROFILE,
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // LocalStorage keys
  const STORAGE_KEY_STUDENT_AUTH = 'simpkn_auth_student_v4';
  const STORAGE_KEY_ADMIN_AUTH = 'simpkn_auth_admin_v4';
  const STORAGE_KEY_STUDENTS = 'simpkn_students_v4';
  const STORAGE_KEY_REGISTRATIONS = 'simpkn_registrations_v4';
  const STORAGE_KEY_CANCELLATIONS = 'simpkn_cancellations_v4';
  const STORAGE_KEY_ADMIN_TAB = 'simpkn_admin_tab_v4';
  const STORAGE_KEY_SELECTED_REG = 'simpkn_selected_reg_v4';

  // 1. Independent Student Auth (Persisted independently so Admin login doesn't overwrite it)
  const [studentUser, setStudentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT_AUTH);
      return saved ? JSON.parse(saved) : { ...AUTH_ACCOUNTS.student, role: 'student' };
    } catch {
      return { ...AUTH_ACCOUNTS.student, role: 'student' };
    }
  });

  // 2. Independent Admin Auth (Persisted independently so Student login doesn't overwrite it)
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      return saved ? JSON.parse(saved) : { ...AUTH_ACCOUNTS.admin, role: 'admin' };
    } catch {
      return { ...AUTH_ACCOUNTS.admin, role: 'admin' };
    }
  });

  // Shared Students List
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  // Shared Registrations State (Empty by default, updated by student, seen by admin)
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  // Shared Cancellations State (Empty by default, submitted by student, reviewed by admin)
  const [cancellations, setCancellations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CANCELLATIONS);
      return saved ? JSON.parse(saved) : INITIAL_CANCELLATIONS;
    } catch {
      return INITIAL_CANCELLATIONS;
    }
  });

  // Selected registration ID for multi-registration view
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_SELECTED_REG) || null;
  });

  // Admin active tab: 'registrations' (Pendaftaran Mahasiswa) | 'cancellations' (Pengajuan Pembatalan)
  const [adminTab, setAdminTab] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_ADMIN_TAB) || 'registrations';
  });

  // Views within portals
  const [studentView, setStudentView] = useState('registration'); // 'registration' | 'cancel_form' | 'cancel_success' | 'cancel_detail'
  const [adminView, setAdminView] = useState('dashboard'); // 'dashboard' | 'detail'
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Global Toast
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (studentUser) {
      localStorage.setItem(STORAGE_KEY_STUDENT_AUTH, JSON.stringify(studentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_STUDENT_AUTH);
    }
  }, [studentUser]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CANCELLATIONS, JSON.stringify(cancellations));
  }, [cancellations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ADMIN_TAB, adminTab);
  }, [adminTab]);

  useEffect(() => {
    if (selectedRegistrationId) {
      localStorage.setItem(STORAGE_KEY_SELECTED_REG, selectedRegistrationId);
    } else {
      localStorage.removeItem(STORAGE_KEY_SELECTED_REG);
    }
  }, [selectedRegistrationId]);

  // Real-time synchronization across browser tabs (Storage Events)
  useEffect(() => {
    const handleStorageChange = (e) => {
      try {
        if (e.key === STORAGE_KEY_REGISTRATIONS && e.newValue) {
          setRegistrations(JSON.parse(e.newValue));
        }
        if (e.key === STORAGE_KEY_CANCELLATIONS && e.newValue) {
          setCancellations(JSON.parse(e.newValue));
        }
        if (e.key === STORAGE_KEY_STUDENT_AUTH) {
          setStudentUser(e.newValue ? JSON.parse(e.newValue) : null);
        }
        if (e.key === STORAGE_KEY_ADMIN_AUTH) {
          setAdminUser(e.newValue ? JSON.parse(e.newValue) : null);
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Helper getters for Student
  const currentStudentId = studentUser?.student_id || 'std_01';
  const currentStudent = studentUser || students[0];
  const currentStudentRegistrations = registrations.filter((r) => r.student_id === currentStudentId);
  const currentRegistration =
    registrations.find((r) => r.registration_id === selectedRegistrationId && r.student_id === currentStudentId) ||
    currentStudentRegistrations[0] ||
    null;
  const currentCancellation = cancellations.find(
    (c) => c.student_id === currentStudentId && c.registration_id === currentRegistration?.registration_id
  );

  /**
   * Separate Login/Logout functions so tabs remain completely independent
   */
  const loginStudent = (email, password) => {
    if (
      email.trim().toLowerCase() === AUTH_ACCOUNTS.student.email.toLowerCase() &&
      password.trim() === AUTH_ACCOUNTS.student.password
    ) {
      const user = { ...AUTH_ACCOUNTS.student, role: 'student' };
      setStudentUser(user);
      setStudentView('registration');
      showToast(`Selamat datang, ${user.name}! Masuk sebagai Mahasiswa.`, 'success');
      return { success: true };
    }
    showToast('Email atau kata sandi mahasiswa salah.', 'error');
    return { success: false, message: 'Email atau kata sandi salah.' };
  };

  const logoutStudent = () => {
    setStudentUser(null);
    showToast('Mahasiswa telah keluar.', 'info');
  };

  const loginAdmin = (email, password) => {
    if (
      email.trim().toLowerCase() === AUTH_ACCOUNTS.admin.email.toLowerCase() &&
      password.trim() === AUTH_ACCOUNTS.admin.password
    ) {
      const user = { ...AUTH_ACCOUNTS.admin, role: 'admin' };
      setAdminUser(user);
      setAdminView('dashboard');
      showToast(`Selamat datang, ${user.name}! Masuk sebagai Admin PKN.`, 'success');
      return { success: true };
    }
    showToast('Email atau kata sandi admin salah.', 'error');
    return { success: false, message: 'Email atau kata sandi salah.' };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    showToast('Admin telah keluar.', 'info');
  };

  const resetAllData = () => {
    setRegistrations([]);
    setCancellations([]);
    setSelectedRegistrationId(null);
    setSelectedRequestId(null);
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEY_CANCELLATIONS);
    localStorage.removeItem(STORAGE_KEY_SELECTED_REG);
    showToast('Seluruh data pendaftaran dan pembatalan telah dikosongkan.', 'info');
  };

  /**
   * ==========================================
   * CRUD Pendaftaran Magang
   * ==========================================
   */
  const createRegistration = (formData) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
    const formattedDate = `${dateStr} ${timeStr}`;

    const newRegId = `reg_${Date.now()}`;
    const initialStatus = formData.registration_status || 'accepted';
    const targetStudentId = formData.student_id || currentStudentId;
    const targetStudent = students.find((s) => s.student_id === targetStudentId) || currentStudent;

    const newRegistration = {
      registration_id: newRegId,
      student_id: targetStudentId,
      institution_name: formData.institution_name.trim(),
      internship_period: formData.internship_period?.trim() || '1 Juli 2026 - 31 Agustus 2026',
      registration_status: initialStatus,
      division: formData.division?.trim() || 'Software Engineering & IT',
      campus_mentor: formData.campus_mentor?.trim() || 'Dr. Ir. Hendra Wijaya, M.T.',
      field_mentor: formData.field_mentor?.trim() || 'Mentor Instansi',
      institution_address: formData.institution_address?.trim() || 'Alamat Perusahaan Terkait',
      registered_at: formattedDate,
      accepted_at: initialStatus === 'accepted' ? formattedDate : null,
      notes: formData.notes?.trim() || '',
    };

    setRegistrations((prev) => [newRegistration, ...prev]);
    setSelectedRegistrationId(newRegId);
    showToast(
      `Pendaftaran magang untuk ${targetStudent.name} di "${newRegistration.institution_name}" berhasil disimpan & disinkronkan ke Admin!`,
      'success'
    );
    return { success: true, registration: newRegistration };
  };

  const updateRegistration = (registrationId, updatedData) => {
    const target = registrations.find((r) => r.registration_id === registrationId);
    if (!target) {
      showToast('Data pendaftaran tidak ditemukan.', 'error');
      return { success: false };
    }

    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.registration_id === registrationId) {
          return {
            ...reg,
            ...updatedData,
          };
        }
        return reg;
      })
    );

    showToast('Data pendaftaran PKN berhasil diperbarui & disinkronkan!', 'success');
    return { success: true };
  };

  const deleteRegistration = (registrationId) => {
    const target = registrations.find((r) => r.registration_id === registrationId);
    if (!target) {
      showToast('Data pendaftaran tidak ditemukan.', 'error');
      return { success: false };
    }

    setCancellations((prev) => prev.filter((c) => c.registration_id !== registrationId));
    setRegistrations((prev) => prev.filter((reg) => reg.registration_id !== registrationId));

    if (selectedRegistrationId === registrationId) {
      setSelectedRegistrationId(null);
    }

    showToast(`Pendaftaran magang di "${target.institution_name}" berhasil dihapus.`, 'info');
    return { success: true };
  };

  const adminVerifyRegistration = (registrationId, newStatus) => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
    const formattedDate = `${dateStr} ${timeStr}`;

    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.registration_id === registrationId) {
          return {
            ...reg,
            registration_status: newStatus,
            accepted_at: newStatus === 'accepted' ? formattedDate : reg.accepted_at,
          };
        }
        return reg;
      })
    );

    const message =
      newStatus === 'accepted'
        ? 'Pendaftaran PKN mahasiswa diverifikasi & disetujui!'
        : 'Pendaftaran PKN mahasiswa ditolak.';
    showToast(message, newStatus === 'accepted' ? 'success' : 'info');
  };

  /**
   * ==========================================
   * Pengajuan Pembatalan Pendaftaran PKN (PRD)
   * ==========================================
   */
  const submitCancellation = (reason) => {
    if (!currentRegistration) {
      showToast('Data pendaftaran tidak ditemukan.', 'error');
      return { success: false, message: 'Data pendaftaran tidak ditemukan.' };
    }

    if (currentRegistration.registration_status !== 'accepted') {
      showToast('Hanya pendaftaran berstatus Diterima yang dapat diajukan pembatalan.', 'error');
      return { success: false, message: 'Status pendaftaran bukan Diterima.' };
    }

    if (currentCancellation && currentCancellation.request_status === 'pending') {
      showToast('Anda masih memiliki pengajuan pembatalan yang berstatus Menunggu.', 'error');
      return { success: false, message: 'Masih ada pengajuan berstatus Menunggu.' };
    }

    if (!reason || reason.trim().length === 0) {
      showToast('Alasan pembatalan wajib diisi.', 'error');
      return { success: false, message: 'Alasan pembatalan wajib diisi.' };
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    const formattedDate = `${dateStr} ${timeStr}`;

    const newRequestId = `BTL-2026-${String(cancellations.length + 1).padStart(3, '0')}`;

    const newRequest = {
      request_id: newRequestId,
      registration_id: currentRegistration.registration_id,
      student_id: currentStudent.student_id,
      reason: reason.trim(),
      request_status: 'pending',
      admin_note: '',
      submitted_at: formattedDate,
      reviewed_at: null,
      reviewed_by: null,
    };

    setCancellations((prev) => [newRequest, ...prev]);

    setSelectedRequestId(newRequestId);
    setStudentView('cancel_success');
    showToast('Pengajuan pembatalan berhasil dikirim. Silakan menunggu proses pemeriksaan oleh admin.', 'success');

    return { success: true, requestId: newRequestId };
  };

  const reviewCancellation = (requestId, decision, note) => {
    const target = cancellations.find((c) => c.request_id === requestId);
    if (!target) {
      showToast('Data pengajuan tidak ditemukan.', 'error');
      return { success: false };
    }

    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    setCancellations((prev) =>
      prev.map((c) => {
        if (c.request_id === requestId) {
          return {
            ...c,
            request_status: decision,
            admin_note: note ? note.trim() : '',
            reviewed_at: formattedDate,
            reviewed_by: `${ADMIN_PROFILE.name} (${ADMIN_PROFILE.role})`,
          };
        }
        return c;
      })
    );

    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.registration_id === target.registration_id) {
          return {
            ...reg,
            registration_status: decision === 'approved' ? 'cancelled' : 'accepted',
          };
        }
        return reg;
      })
    );

    const message =
      decision === 'approved'
        ? `Pengajuan #${requestId} telah DISETUJUI. Status pendaftaran diubah menjadi Dibatalkan.`
        : `Pengajuan #${requestId} telah DITOLAK. Status pendaftaran tetap Diterima.`;

    showToast(message, decision === 'approved' ? 'success' : 'info');
    return { success: true };
  };

  return (
    <AppContext.Provider
      value={{
        studentUser,
        adminUser,
        currentStudentId,
        currentStudent,
        students,
        registrations,
        cancellations,
        currentRegistration,
        currentStudentRegistrations,
        selectedRegistrationId,
        adminTab,
        studentView,
        adminView,
        selectedRequestId,
        adminProfile: ADMIN_PROFILE,
        authAccounts: AUTH_ACCOUNTS,
        toast,
        loginStudent,
        logoutStudent,
        loginAdmin,
        logoutAdmin,
        resetAllData,
        setAdminTab,
        setStudentView,
        setAdminView,
        // Compatibility aliases
        activeView: studentView,
        setActiveView: setStudentView,
        currentRole: 'student',
        currentUser: studentUser,
        setSelectedRequestId,
        setSelectedRegistrationId,
        createRegistration,
        updateRegistration,
        deleteRegistration,
        adminVerifyRegistration,
        submitCancellation,
        reviewCancellation,
        showToast,
        closeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
