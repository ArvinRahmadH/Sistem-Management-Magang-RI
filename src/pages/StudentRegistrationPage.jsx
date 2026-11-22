import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  FileText,
  User,
  GraduationCap,
  AlertCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Plus,
  Edit3,
  Trash2,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { ProcedureInfoCard } from '../components/ProcedureInfoCard';
import { RegistrationDetailModal } from '../components/RegistrationDetailModal';
import { RegistrationFormModal } from '../components/RegistrationFormModal';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const StudentRegistrationPage = () => {
  const {
    currentStudent,
    currentRegistration,
    currentStudentRegistrations,
    selectedRegistrationId,
    setSelectedRegistrationId,
    currentCancellation,
    setActiveView,
    setSelectedRequestId,
    createRegistration,
    updateRegistration,
    deleteRegistration,
  } = useApp();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState('create'); // 'create' | 'edit'
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // If no registrations at all for this student (Empty State)
  if (!currentRegistration || currentStudentRegistrations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Belum Ada Pendaftaran Magang PKN
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto leading-relaxed">
            Anda belum mendaftarkan diri pada program Praktik Kerja Nyata (PKN). Daftarkan instansi tempat magang
            Anda untuk memulai kegiatan.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setFormModalMode('create');
                setIsFormModalOpen(true);
              }}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Daftarkan Tempat Magang Baru</span>
            </button>
          </div>
        </div>

        {/* Procedure Card */}
        <ProcedureInfoCard />

        {/* Form Modal */}
        <RegistrationFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={(data) => createRegistration(data)}
          initialData={null}
          studentName={currentStudent.name}
          studentNim={currentStudent.nim}
        />
      </div>
    );
  }

  const isAccepted = currentRegistration.registration_status === 'accepted';
  const isCancelled = currentRegistration.registration_status === 'cancelled';
  const isPendingVerification = currentRegistration.registration_status === 'pending_verification';
  const hasPendingCancellation = currentCancellation?.request_status === 'pending';
  const hasApprovedCancellation = currentCancellation?.request_status === 'approved';
  const hasRejectedCancellation = currentCancellation?.request_status === 'rejected';

  const handleViewCancellationDetail = () => {
    if (currentCancellation) {
      setSelectedRequestId(currentCancellation.request_id);
      setActiveView('cancel_detail');
    }
  };

  const handleOpenEdit = () => {
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (formModalMode === 'create') {
      createRegistration(data);
    } else {
      updateRegistration(currentRegistration.registration_id, data);
    }
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteRegistration(currentRegistration.registration_id);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Breadcrumb & Action Button */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
          <span>Portal Mahasiswa</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Data Pendaftaran PKN</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Data Pendaftaran PKN
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kelola informasi pendaftaran tempat Praktik Kerja Nyata Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Create New Registration Button */}
            <button
              onClick={() => {
                setFormModalMode('create');
                setIsFormModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xs transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Daftar Magang Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Registration Switcher Tabs (If student has more than 1 registration) */}
      {currentStudentRegistrations.length > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Daftar Magang Terdaftar ({currentStudentRegistrations.length})
            </span>
            <span className="text-xs text-slate-400">Pilih untuk mengelola:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {currentStudentRegistrations.map((reg, idx) => {
              const isSelected = reg.registration_id === currentRegistration.registration_id;
              return (
                <button
                  key={reg.registration_id}
                  onClick={() => setSelectedRegistrationId(reg.registration_id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span className="max-w-[160px] truncate">{reg.institution_name}</span>
                  <StatusBadge type="registration" status={reg.registration_status} size="small" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Cancellation Status Notification Banner (if any) */}
      {hasPendingCancellation && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0 mt-0.5">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-amber-950">
                  Pengajuan Pembatalan Sedang Diproses
                </h4>
                <StatusBadge type="cancellation" status="pending" size="small" />
              </div>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                Anda telah mengajukan permohonan pembatalan pendaftaran pada{' '}
                <span className="font-semibold">{currentCancellation.submitted_at}</span>. Mohon menunggu hasil
                verifikasi dan persetujuan dari Koordinator PKN.
              </p>
            </div>
          </div>
          <button
            onClick={handleViewCancellationDetail}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors shrink-0"
          >
            <span>Lihat Status Pengajuan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {hasApprovedCancellation && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-rose-200/80 rounded-xl text-rose-900 shrink-0 mt-0.5">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-rose-950">
                  Pendaftaran Telah Dibatalkan Resmi
                </h4>
                <StatusBadge type="cancellation" status="approved" size="small" />
              </div>
              <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                Permohonan pembatalan PKN Anda telah disetujui oleh admin. Pendaftaran di instansi ini sudah tidak berlaku.
              </p>
            </div>
          </div>
          <button
            onClick={handleViewCancellationDetail}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-xs transition-colors shrink-0"
          >
            <span>Lihat Riwayat Pembatalan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {hasRejectedCancellation && isAccepted && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-300 text-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-rose-100 rounded-xl text-rose-700 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  Pengajuan Pembatalan Sebelumnya Ditolak
                </h4>
                <StatusBadge type="cancellation" status="rejected" size="small" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Permohonan pembatalan yang diajukan sebelumnya ditolak oleh admin. Status pendaftaran Anda tetap aktif
                berstatus <span className="font-semibold text-emerald-700">Diterima</span>.
              </p>
            </div>
          </div>
          <button
            onClick={handleViewCancellationDetail}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition-colors shrink-0"
          >
            <span>Lihat Catatan Admin</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Registration Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Card Header with CRUD Controls */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Instansi Tempat PKN
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {currentRegistration.institution_name}
              </h2>
            </div>
          </div>

          {/* Action Buttons: Detail, Edit, Delete */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Detail Button */}
            <button
              onClick={() => setIsDetailModalOpen(true)}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Detail</span>
            </button>

            {/* Edit Button */}
            <button
              onClick={handleOpenEdit}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Ubah data pendaftaran magang"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>Ubah</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Hapus pendaftaran magang ini"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Hapus</span>
            </button>
          </div>
        </div>

        {/* Card Body - Registration Info Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Nama Mahasiswa
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 block">{currentStudent.name}</span>
            <span className="text-xs text-slate-500 block">{currentStudent.prodi}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Nomor Induk Mahasiswa (NIM)
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 font-mono block">
              {currentStudent.nim}
            </span>
            <span className="text-xs text-slate-500 block">Angkatan {currentStudent.angkatan}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Periode PKN
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              {currentRegistration.internship_period}
            </span>
            <span className="text-xs text-slate-500 block">{currentRegistration.division || 'Umum'}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Status Pendaftaran
            </span>
            <div className="pt-1">
              <StatusBadge type="registration" status={currentRegistration.registration_status} size="normal" />
            </div>
            <span className="text-xs text-slate-500 block mt-1">
              {isAccepted
                ? 'Pendaftaran resmi aktif'
                : isPendingVerification
                ? 'Menunggu persetujuan admin'
                : 'Pendaftaran nonaktif'}
            </span>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-5 sm:p-6 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600 max-w-xl">
            {isAccepted && !hasPendingCancellation && (
              <p>
                Jika Anda berhalangan atau mengalami kendala mendesak sehingga tidak dapat melaksanakan PKN pada
                instansi ini, Anda dapat mengajukan permohonan pembatalan resmi.
              </p>
            )}
            {hasPendingCancellation && (
              <p className="text-amber-800 font-medium">
                Permohonan pembatalan Anda saat ini sedang diperiksa admin. Tombol pengajuan baru dinonaktifkan hingga
                proses peninjauan selesai.
              </p>
            )}
            {isCancelled && (
              <p className="text-rose-800 font-medium">
                Pendaftaran PKN pada instansi ini telah dibatalkan resmi. Anda dapat mendaftarkan instansi PKN baru
                menggunakan tombol <strong>"+ Daftar Magang Baru"</strong> di atas.
              </p>
            )}
            {isPendingVerification && (
              <p className="text-blue-800 font-medium">
                Pendaftaran magang ini baru diajukan dan sedang menunggu verifikasi oleh Tim Admin PKN. Anda dapat mengubah
                rincian data atau menghapusnya jika terjadi kesalahan input.
              </p>
            )}
            {hasRejectedCancellation && isAccepted && (
              <p className="text-slate-700">
                Pengajuan pembatalan sebelumnya ditolak. Jika terdapat alasan darurat baru yang sah, Anda dapat mengajukan permohonan kembali.
              </p>
            )}
          </div>

          {/* Cancellation Action Button (FR-02) */}
          <div>
            {isAccepted && !hasPendingCancellation && (
              <button
                onClick={() => setActiveView('cancel_form')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm shadow-rose-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Ajukan Pembatalan Pendaftaran</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}

            {hasPendingCancellation && (
              <button
                onClick={handleViewCancellationDetail}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Lihat Status Pengajuan (Menunggu)</span>
              </button>
            )}

            {isCancelled && (
              <button
                onClick={handleViewCancellationDetail}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Lihat Detail Pembatalan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Procedure Information Card (FR-01) */}
      <ProcedureInfoCard />

      {/* Registration Detail Modal */}
      <RegistrationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        student={currentStudent}
        registration={currentRegistration}
      />

      {/* Form Modal for Create & Edit */}
      <RegistrationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={formModalMode === 'edit' ? currentRegistration : null}
        studentName={currentStudent.name}
        studentNim={currentStudent.nim}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus Pendaftaran Magang"
        message={`Apakah Anda yakin ingin menghapus pendaftaran PKN di "${currentRegistration.institution_name}"?\n\nData pendaftaran dan riwayat terkait akan dihapus secara permanen.`}
        confirmText="Ya, Hapus Pendaftaran"
        cancelText="Batal"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};
