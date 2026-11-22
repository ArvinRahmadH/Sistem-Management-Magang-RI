import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  MapPin,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const AdminReviewPage = () => {
  const {
    selectedRequestId,
    cancellations,
    students,
    registrations,
    setActiveView,
    setAdminView,
    reviewCancellation,
    adminProfile,
  } = useApp();

  const request = cancellations.find((c) => c.request_id === selectedRequestId);

  const [adminNote, setAdminNote] = useState(request?.admin_note || '');
  const [noteError, setNoteError] = useState('');
  const [pendingDecision, setPendingDecision] = useState(null); // 'approved' | 'rejected'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!request) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Pengajuan Tidak Ditemukan</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Data pengajuan yang Anda pilih tidak tersedia atau telah dihapus.
          </p>
          <button
            onClick={() => (setAdminView ? setAdminView('dashboard') : setActiveView('admin_dashboard'))}
            className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Pengajuan</span>
          </button>
        </div>
      </div>
    );
  }

  const student = students.find((s) => s.student_id === request.student_id) || {};
  const registration = registrations.find((r) => r.registration_id === request.registration_id) || {};

  const isPending = request.request_status === 'pending';
  const isApproved = request.request_status === 'approved';
  const isRejected = request.request_status === 'rejected';

  const handleDecisionTrigger = (decision) => {
    // If rejecting, strongly recommend/require reason so student understands (BR-10)
    if (decision === 'rejected' && (!adminNote || adminNote.trim().length === 0)) {
      setNoteError('Harap cantumkan alasan atau pertimbangan penolakan pada catatan admin.');
      return;
    }
    setNoteError('');
    setPendingDecision(decision);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!pendingDecision) return;
    setIsProcessing(true);

    setTimeout(() => {
      reviewCancellation(request.request_id, pendingDecision, adminNote);
      setIsProcessing(false);
      setIsConfirmModalOpen(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => (setAdminView ? setAdminView('dashboard') : setActiveView('admin_dashboard'))}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Daftar Pengajuan Admin</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
          <span>Portal Administrasi</span>
          <span>/</span>
          <span>Verifikasi Pengajuan</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold font-mono">#{request.request_id}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tinjau Pengajuan Pembatalan PKN
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              ID Pengajuan: <span className="font-mono font-bold text-slate-800">#{request.request_id}</span> • Masuk pada {request.submitted_at}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-slate-500">Status Saat Ini:</span>
            <StatusBadge type="cancellation" status={request.request_status} size="large" />
          </div>
        </div>
      </div>

      {/* Decision History Notice if already reviewed */}
      {!isPending && (
        <div
          className={`p-5 rounded-2xl border shadow-xs ${
            isApproved
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                isApproved ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {isApproved ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-base">
                Pengajuan ini telah diproses sebagai: {isApproved ? 'DISETUJUI' : 'DITOLAK'}
              </h4>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                Diputuskan oleh <strong>{request.reviewed_by}</strong> pada{' '}
                <strong>{request.reviewed_at}</strong>.
              </p>
              {request.admin_note && (
                <div className="mt-2 p-3 rounded-xl bg-white/90 border border-slate-200 text-xs sm:text-sm text-slate-800 italic">
                  “{request.admin_note}”
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid of Student and Internship Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Informasi Mahasiswa</h3>
              <p className="text-xs text-slate-500">Data pemohon pembatalan</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Nama Lengkap</span>
              <span className="font-bold text-slate-900 text-base">{student.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-slate-400 font-medium block">NIM</span>
                <span className="font-mono font-bold text-slate-900">{student.nim}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Angkatan</span>
                <span className="font-bold text-slate-900">{student.angkatan}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Program Studi</span>
              <span className="font-semibold text-slate-800">{student.prodi}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Email Kontak</span>
              <span className="text-slate-700">{student.email}</span>
            </div>
          </div>
        </div>

        {/* Registration Info Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Informasi Pendaftaran PKN</h3>
              <p className="text-xs text-slate-500">Instansi dan jadwal magang</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Instansi Tempat PKN</span>
              <span className="font-bold text-slate-900 text-base">{registration.institution_name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Divisi Penempatan</span>
              <span className="text-slate-800">{registration.division || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Periode Pelaksanaan</span>
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                {registration.internship_period}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 font-medium">Status Pendaftaran Sekarang:</span>
              <StatusBadge type="registration" status={registration.registration_status} size="small" />
            </div>
          </div>
        </div>
      </div>

      {/* Student's Reason Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Alasan Pembatalan dari Mahasiswa
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
          {request.reason}
        </div>
      </div>

      {/* Admin Action & Review Card (FR-07, Screen 6) */}
      <div className="bg-white rounded-2xl border-2 border-indigo-100 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Formulir Keputusan Admin PKN
            </h3>
            <p className="text-xs text-slate-500">
              {isPending
                ? 'Tentukan persetujuan atau penolakan terhadap permohonan pembatalan ini.'
                : 'Anda dapat memperbarui keputusan atau catatan bila terdapat penyesuaian baru.'}
            </p>
          </div>
        </div>

        {/* Admin Note Input */}
        <div className="space-y-2">
          <label htmlFor="adminNote" className="text-xs sm:text-sm font-bold text-slate-900 block">
            Catatan / Keterangan Keputusan Admin
            <span className="text-xs font-normal text-slate-500 ml-1">
              (Wajib jika menolak, sangat dianjurkan jika menyetujui)
            </span>
          </label>
          <textarea
            id="adminNote"
            rows={3}
            value={adminNote}
            onChange={(e) => {
              setAdminNote(e.target.value);
              if (noteError) setNoteError('');
            }}
            placeholder="Tuliskan catatan verifikasi, nomor surat rekomendasi, atau alasan keputusan penolakan/persetujuan..."
            className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all ${
              noteError
                ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                : 'border-slate-300 focus:border-indigo-600 bg-white'
            }`}
          />
          {noteError && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{noteError}</span>
            </div>
          )}
        </div>

        {/* Business Rule Reminder Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-800 block">Konsekuensi Aturan Bisnis (PRD FR-08):</span>
          <p>
            • Jika <strong>Disetujui</strong>: Status pengajuan menjadi <span className="font-semibold text-emerald-700">Disetujui</span> dan status pendaftaran mahasiswa diubah menjadi <span className="font-semibold text-rose-700">Dibatalkan</span>.
          </p>
          <p>
            • Jika <strong>Ditolak</strong>: Status pengajuan menjadi <span className="font-semibold text-rose-700">Ditolak</span> dan status pendaftaran mahasiswa tetap <span className="font-semibold text-emerald-700">Diterima</span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => (setAdminView ? setAdminView('dashboard') : setActiveView('admin_dashboard'))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Kembali
          </button>

          {/* Reject Button */}
          <button
            type="button"
            onClick={() => handleDecisionTrigger('rejected')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border border-rose-300 transition-all flex items-center justify-center gap-2 shadow-2xs"
          >
            <XCircle className="w-4 h-4" />
            <span>Tolak Pembatalan</span>
          </button>

          {/* Approve Button */}
          <button
            type="button"
            onClick={() => handleDecisionTrigger('approved')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/30"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Setujui Pembatalan</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal before saving decision (FR-07) */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDecision}
        title={
          pendingDecision === 'approved'
            ? 'Konfirmasi Persetujuan Pembatalan'
            : 'Konfirmasi Penolakan Pembatalan'
        }
        message={
          pendingDecision === 'approved'
            ? `Apakah Anda yakin ingin MENYETUJUI permohonan pembatalan PKN untuk mahasiswa ${student.name} (${student.nim})?\n\nSesuai aturan sistem, status pendaftaran PKN mahasiswa akan resmi diubah menjadi "Dibatalkan".`
            : `Apakah Anda yakin ingin MENOLAK permohonan pembatalan PKN untuk mahasiswa ${student.name} (${student.nim})?\n\nSesuai aturan sistem, status pendaftaran PKN mahasiswa akan tetap aktif "Diterima". Catatan Anda akan disampaikan kepada mahasiswa.`
        }
        confirmText={
          pendingDecision === 'approved' ? 'Ya, Setujui Pembatalan' : 'Ya, Tolak Pembatalan'
        }
        cancelText="Batal & Tinjau Ulang"
        type={pendingDecision === 'approved' ? 'success' : 'danger'}
        isLoading={isProcessing}
      />
    </div>
  );
};
