import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  Building2,
  Calendar,
  User,
  ArrowRight,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Layers,
  GraduationCap,
  MapPin,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { RegistrationDetailModal } from '../components/RegistrationDetailModal';
import { RegistrationFormModal } from '../components/RegistrationFormModal';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const AdminDashboardPage = () => {
  const {
    cancellations,
    students,
    registrations,
    setActiveView,
    setAdminView,
    setSelectedRequestId,
    adminProfile,
    adminTab,
    setAdminTab,
    createRegistration,
    updateRegistration,
    deleteRegistration,
    adminVerifyRegistration,
  } = useApp();

  // Search & Filter for Cancellations
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'

  // Search & Filter for Registrations
  const [regSearchTerm, setRegSearchTerm] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState('all'); // 'all' | 'accepted' | 'pending_verification' | 'cancelled'
  const [studentFilter, setStudentFilter] = useState('all'); // 'all' | student_id

  // Modal states for registration CRUD
  const [selectedRegForDetail, setSelectedRegForDetail] = useState(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState('create');
  const [editingRegistration, setEditingRegistration] = useState(null);

  const [deletingRegistration, setDeletingRegistration] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Counters for Cancellations
  const totalCount = cancellations.length;
  const pendingCount = cancellations.filter((c) => c.request_status === 'pending').length;
  const approvedCount = cancellations.filter((c) => c.request_status === 'approved').length;
  const rejectedCount = cancellations.filter((c) => c.request_status === 'rejected').length;

  // Counters for Registrations
  const totalRegCount = registrations.length;
  const acceptedRegCount = registrations.filter((r) => r.registration_status === 'accepted').length;
  const pendingVerifRegCount = registrations.filter((r) => r.registration_status === 'pending_verification').length;
  const cancelledRegCount = registrations.filter((r) => r.registration_status === 'cancelled').length;

  // Filtered Cancellations list
  const filteredCancellations = cancellations.filter((req) => {
    const student = students.find((s) => s.student_id === req.student_id) || {};
    const reg = registrations.find((r) => r.registration_id === req.registration_id) || {};

    const matchesStatus =
      statusFilter === 'all' ? true : req.request_status === statusFilter;

    const term = searchTerm.toLowerCase();
    const matchesSearch =
      req.request_id.toLowerCase().includes(term) ||
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.nim && student.nim.toLowerCase().includes(term)) ||
      (reg.institution_name && reg.institution_name.toLowerCase().includes(term));

    return matchesStatus && matchesSearch;
  });

  // Filtered Registrations list
  const filteredRegistrations = registrations.filter((reg) => {
    const student = students.find((s) => s.student_id === reg.student_id) || {};

    const matchesStatus =
      regStatusFilter === 'all' ? true : reg.registration_status === regStatusFilter;

    const matchesStudent =
      studentFilter === 'all' ? true : reg.student_id === studentFilter;

    const term = regSearchTerm.toLowerCase();
    const matchesSearch =
      (reg.institution_name && reg.institution_name.toLowerCase().includes(term)) ||
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.nim && student.nim.toLowerCase().includes(term)) ||
      (reg.division && reg.division.toLowerCase().includes(term));

    return matchesStatus && matchesStudent && matchesSearch;
  });

  const handleReviewCancellation = (requestId) => {
    setSelectedRequestId(requestId);
    if (setAdminView) setAdminView('detail');
    else setActiveView('admin_detail');
  };

  const handleOpenDetailReg = (reg) => {
    const std = students.find((s) => s.student_id === reg.student_id) || students[0];
    setSelectedRegForDetail(reg);
    setSelectedStudentForDetail(std);
    setIsDetailModalOpen(true);
  };

  const handleOpenEditReg = (reg) => {
    setEditingRegistration(reg);
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleOpenCreateReg = () => {
    setEditingRegistration(null);
    setFormModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleRegFormSubmit = (data) => {
    if (formModalMode === 'create') {
      createRegistration(data);
    } else if (editingRegistration) {
      updateRegistration(editingRegistration.registration_id, data);
    }
  };

  const handleOpenDeleteReg = (reg) => {
    setDeletingRegistration(reg);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteReg = () => {
    if (!deletingRegistration) return;
    setIsDeleting(true);
    setTimeout(() => {
      deleteRegistration(deletingRegistration.registration_id);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setDeletingRegistration(null);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
          <span>Portal Administrasi</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">
            {adminTab === 'cancellations' ? 'Kelola Pembatalan PKN' : 'Data Pendaftaran Magang Mahasiswa'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dasbor Administrasi PKN
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Kelola dan pantau seluruh pendaftaran magang mahasiswa yang tersinkronisasi secara real-time.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200/80 text-xs font-semibold self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Admin: {adminProfile.name}</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {/* Tab 1: Data Pendaftaran Mahasiswa */}
        <button
          onClick={() => setAdminTab('registrations')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            adminTab === 'registrations'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Data Pendaftaran Mahasiswa ({totalRegCount})</span>
        </button>

        {/* Tab 2: Pengajuan Pembatalan PKN */}
        <button
          onClick={() => setAdminTab('cancellations')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
            adminTab === 'cancellations'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pengajuan Pembatalan ({pendingCount} Menunggu)</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: DATA PENDAFTARAN MAGANG MAHASISWA (SINKRON)   */}
      {/* ==================================================== */}
      {adminTab === 'registrations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Synchronized Banner Info */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-950 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">
                    Sinkronisasi Data Pendaftaran Magang Mahasiswa
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Real-time Sync
                  </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Semua pendaftaran tempat magang yang didaftarkan atau diubah oleh mahasiswa (misal: Budi Santoso,
                  Siti Rahmawati, dll.) otomatis langsung tampil dan tersinkronisasi di tabel admin berikut.
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenCreateReg}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Daftarkan Magang Baru</span>
            </button>
          </div>

          {/* Quick Metrics Bar for Registrations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Terdaftar</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">{totalRegCount}</span>
              <span className="text-[11px] text-slate-500">Pendaftaran magang</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider block">Diterima (Aktif)</span>
              <span className="text-2xl font-extrabold text-emerald-700 font-mono mt-1 block">{acceptedRegCount}</span>
              <span className="text-[11px] text-slate-500">Siap / sedang PKN</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block">Menunggu Verifikasi</span>
              <span className="text-2xl font-extrabold text-blue-700 font-mono mt-1 block">{pendingVerifRegCount}</span>
              <span className="text-[11px] text-slate-500">Perlu persetujuan admin</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-rose-600 font-bold uppercase tracking-wider block">Dibatalkan</span>
              <span className="text-2xl font-extrabold text-rose-700 font-mono mt-1 block">{cancelledRegCount}</span>
              <span className="text-[11px] text-slate-500">Telah disetujui batal</span>
            </div>
          </div>

          {/* Action Bar: Search, Status Filter & Student Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berdasarkan NIM, Nama Mahasiswa, Instansi, atau Divisi..."
                value={regSearchTerm}
                onChange={(e) => setRegSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              {regSearchTerm && (
                <button
                  onClick={() => setRegSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Filter by Student Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-indigo-600"
              >
                <option value="all">Semua Mahasiswa ({students.length})</option>
                {students.map((std) => (
                  <option key={std.student_id} value={std.student_id}>
                    {std.name} ({std.nim})
                  </option>
                ))}
              </select>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                <button
                  onClick={() => setRegStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    regStatusFilter === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setRegStatusFilter('accepted')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    regStatusFilter === 'accepted'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  Diterima ({acceptedRegCount})
                </button>
                <button
                  onClick={() => setRegStatusFilter('pending_verification')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    regStatusFilter === 'pending_verification'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}
                >
                  Verifikasi ({pendingVerifRegCount})
                </button>
                <button
                  onClick={() => setRegStatusFilter('cancelled')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    regStatusFilter === 'cancelled'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  Dibatalkan ({cancelledRegCount})
                </button>
              </div>
            </div>
          </div>

          {/* Registrations CRUD Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {filteredRegistrations.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">Tidak Ada Data Pendaftaran</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Tidak ditemukan pendaftaran magang yang sesuai dengan kriteria pencarian atau filter mahasiswa.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="px-5 py-3.5">Mahasiswa Pemohon</th>
                      <th className="px-5 py-3.5">Instansi Tempat PKN</th>
                      <th className="px-5 py-3.5">Divisi & Periode</th>
                      <th className="px-5 py-3.5">Status Pendaftaran</th>
                      <th className="px-5 py-3.5">Status Pengajuan Batal</th>
                      <th className="px-5 py-3.5 text-right">Aksi Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredRegistrations.map((reg) => {
                      const student = students.find((s) => s.student_id === reg.student_id) || {};
                      const isPendingVerif = reg.registration_status === 'pending_verification';

                      // Check if there is an associated cancellation request
                      const linkedCancel = cancellations.find(
                        (c) => c.registration_id === reg.registration_id
                      );

                      return (
                        <tr key={reg.registration_id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={student.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80'}
                                alt="avatar"
                                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{student.name}</div>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  NIM: {student.nim} • {student.prodi}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-bold text-slate-900 block">{reg.institution_name}</span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate max-w-xs">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              {reg.institution_address}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-800 block">{reg.division || 'Umum'}</span>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-indigo-600 shrink-0" />
                              {reg.internship_period}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge type="registration" status={reg.registration_status} size="normal" />
                          </td>
                          <td className="px-5 py-4">
                            {linkedCancel ? (
                              <button
                                onClick={() => handleReviewCancellation(linkedCancel.request_id)}
                                className="inline-flex items-center gap-1.5 hover:underline text-left group"
                                title="Klik untuk meninjau pengajuan pembatalan ini"
                              >
                                <StatusBadge type="cancellation" status={linkedCancel.request_status} size="small" />
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400">-</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* If pending verification: Quick Accept / Reject */}
                              {isPendingVerif && (
                                <>
                                  <button
                                    onClick={() => adminVerifyRegistration(reg.registration_id, 'accepted')}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                                    title="Setujui pendaftaran magang ini"
                                  >
                                    Terima
                                  </button>
                                  <button
                                    onClick={() => adminVerifyRegistration(reg.registration_id, 'rejected')}
                                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300"
                                    title="Tolak pendaftaran magang ini"
                                  >
                                    Tolak
                                  </button>
                                </>
                              )}

                              {/* Detail Button */}
                              <button
                                onClick={() => handleOpenDetailReg(reg)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 flex items-center gap-1"
                                title="Lihat detail lengkap seperti mahasiswa"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>Detail</span>
                              </button>

                              {/* Edit Button */}
                              <button
                                onClick={() => handleOpenEditReg(reg)}
                                className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-200"
                                title="Ubah data pendaftaran"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleOpenDeleteReg(reg)}
                                className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-rose-200"
                                title="Hapus pendaftaran"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: PENGELOLAAN PEMBATALAN PKN (PRD Screen 5)     */}
      {/* ==================================================== */}
      {adminTab === 'cancellations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* KPI Statistic Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <button
              onClick={() => setStatusFilter('all')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'all' ? 'text-slate-300' : 'text-slate-400'}`}>
                  Total Pengajuan
                </span>
                <FileText className={`w-4 h-4 ${statusFilter === 'all' ? 'text-slate-300' : 'text-slate-400'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold mt-2 font-mono">{totalCount}</div>
              <span className={`text-xs mt-1 block ${statusFilter === 'all' ? 'text-slate-400' : 'text-slate-500'}`}>
                Seluruh berkas masuk
              </span>
            </button>

            <button
              onClick={() => setStatusFilter('pending')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                statusFilter === 'pending'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'pending' ? 'text-amber-100' : 'text-amber-600'}`}>
                  Menunggu Review
                </span>
                <Clock className={`w-4 h-4 ${statusFilter === 'pending' ? 'text-amber-100' : 'text-amber-500 animate-pulse'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold mt-2 font-mono">{pendingCount}</div>
              <span className={`text-xs mt-1 block ${statusFilter === 'pending' ? 'text-amber-100' : 'text-slate-500'}`}>
                Perlu tindakan admin
              </span>
            </button>

            <button
              onClick={() => setStatusFilter('approved')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                statusFilter === 'approved'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'approved' ? 'text-emerald-100' : 'text-emerald-600'}`}>
                  Disetujui
                </span>
                <CheckCircle2 className={`w-4 h-4 ${statusFilter === 'approved' ? 'text-emerald-100' : 'text-emerald-500'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold mt-2 font-mono">{approvedCount}</div>
              <span className={`text-xs mt-1 block ${statusFilter === 'approved' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Pendaftaran dibatalkan
              </span>
            </button>

            <button
              onClick={() => setStatusFilter('rejected')}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                statusFilter === 'rejected'
                  ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-600/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-rose-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'rejected' ? 'text-rose-100' : 'text-rose-600'}`}>
                  Ditolak
                </span>
                <XCircle className={`w-4 h-4 ${statusFilter === 'rejected' ? 'text-rose-100' : 'text-rose-500'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold mt-2 font-mono">{rejectedCount}</div>
              <span className={`text-xs mt-1 block ${statusFilter === 'rejected' ? 'text-rose-100' : 'text-slate-500'}`}>
                Pendaftaran tetap aktif
              </span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berdasarkan NIM, Nama Mahasiswa, atau Nama Instansi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua ({totalCount})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Menunggu ({pendingCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('approved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === 'approved'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Disetujui ({approvedCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  statusFilter === 'rejected'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Ditolak ({rejectedCount})</span>
              </button>
            </div>
          </div>

          {/* Cancellations Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {filteredCancellations.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-800">Tidak Ada Data Pengajuan</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tidak ditemukan pengajuan pembatalan yang sesuai dengan filter pencarian.'
                    : 'Belum ada mahasiswa yang mengajukan permohonan pembatalan.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="px-5 py-3.5">ID & Waktu</th>
                      <th className="px-5 py-3.5">NIM</th>
                      <th className="px-5 py-3.5">Nama Mahasiswa</th>
                      <th className="px-5 py-3.5">Instansi Tempat PKN</th>
                      <th className="px-5 py-3.5">Status Pengajuan</th>
                      <th className="px-5 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredCancellations.map((req) => {
                      const student = students.find((s) => s.student_id === req.student_id) || {};
                      const reg = registrations.find((r) => r.registration_id === req.registration_id) || {};
                      const isPending = req.request_status === 'pending';

                      return (
                        <tr
                          key={req.request_id}
                          className={`hover:bg-slate-50/80 transition-colors ${isPending ? 'bg-amber-50/20' : ''}`}
                        >
                          <td className="px-5 py-4">
                            <span className="font-mono font-bold text-slate-900 block">
                              #{req.request_id}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              {req.submitted_at}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-800">
                            {student.nim || '-'}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900">{student.name}</div>
                            <div className="text-[11px] text-slate-500">{student.prodi}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-900 max-w-xs truncate">
                              {reg.institution_name}
                            </div>
                            <div className="text-[11px] text-slate-500">{reg.internship_period}</div>
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge type="cancellation" status={req.request_status} size="normal" />
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => handleReviewCancellation(req.request_id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs ${
                                isPending
                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                              }`}
                            >
                              <span>{isPending ? 'Tinjau & Putuskan' : 'Lihat Detail'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Registration Detail Modal */}
      <RegistrationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={selectedStudentForDetail}
        registration={selectedRegForDetail}
      />

      {/* Registration Form Modal (Create / Edit) */}
      <RegistrationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleRegFormSubmit}
        initialData={editingRegistration}
        studentName={students[0].name}
        studentNim={students[0].nim}
        isAdmin={true}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteReg}
        title="Hapus Pendaftaran PKN Mahasiswa"
        message={`Apakah Anda yakin ingin menghapus data pendaftaran di "${deletingRegistration?.institution_name}"?\n\nTindakan ini akan menghapus data pendaftaran serta riwayat pengajuan pembatalan terkait secara permanen.`}
        confirmText="Ya, Hapus Data"
        cancelText="Batal"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};
