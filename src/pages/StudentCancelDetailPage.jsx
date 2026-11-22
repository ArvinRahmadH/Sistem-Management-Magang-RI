import React from 'react';
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
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export const StudentCancelDetailPage = () => {
  const {
    currentStudent,
    currentRegistration,
    selectedRequestId,
    cancellations,
    students,
    registrations,
    setActiveView,
    currentRole,
  } = useApp();

  // Find request by selectedRequestId or current student's cancellation
  const request =
    cancellations.find((c) => c.request_id === selectedRequestId) ||
    cancellations.find((c) => c.student_id === currentStudent.student_id) ||
    cancellations[0];

  if (!request) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800">Detail Pengajuan Tidak Ditemukan</h2>
          <p className="text-slate-500 mt-1 text-sm">
            Data pengajuan pembatalan yang Anda tuju belum terdaftar di sistem.
          </p>
          <button
            onClick={() => setActiveView(currentRole === 'admin' ? 'admin_dashboard' : 'registration')}
            className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </div>
      </div>
    );
  }

  // Associated student and registration
  const student = students.find((s) => s.student_id === request.student_id) || currentStudent;
  const registration = registrations.find((r) => r.registration_id === request.registration_id) || currentRegistration;

  const isPending = request.request_status === 'pending';
  const isApproved = request.request_status === 'approved';
  const isRejected = request.request_status === 'rejected';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => setActiveView(currentRole === 'admin' ? 'admin_dashboard' : 'registration')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke {currentRole === 'admin' ? 'Daftar Pengajuan Admin' : 'Data Pendaftaran'}</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
          <span>{currentRole === 'admin' ? 'Portal Admin' : 'Portal Mahasiswa'}</span>
          <span>/</span>
          <span>Pengajuan Pembatalan</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold font-mono">#{request.request_id}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Detail Pengajuan Pembatalan
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              ID Pengajuan: <span className="font-mono font-bold text-slate-800">#{request.request_id}</span> • Diajukan pada {request.submitted_at}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold text-slate-500">Status Pengajuan:</span>
            <StatusBadge type="cancellation" status={request.request_status} size="large" />
          </div>
        </div>
      </div>

      {/* Visual Stepper / Status Timeline */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
          Alur & Progres Pengajuan
        </h3>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {/* Step 1 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-emerald-600/20 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">1. Pengajuan Dikirim</span>
                <span className="text-[11px] text-slate-500 block">{request.submitted_at}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md shrink-0 transition-colors ${
                  isPending
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                    : 'bg-emerald-600 text-white shadow-emerald-600/20'
                }`}
              >
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">2. Peninjauan Admin</span>
                <span className="text-[11px] text-slate-500 block">
                  {isPending ? 'Sedang diverifikasi' : 'Selesai ditinjau'}
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md shrink-0 transition-colors ${
                  isPending
                    ? 'bg-slate-200 text-slate-400'
                    : isApproved
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-rose-600 text-white shadow-rose-600/20'
                }`}
              >
                {isPending ? (
                  <span className="text-xs">3</span>
                ) : isApproved ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">3. Keputusan Resmi</span>
                <span className="text-[11px] text-slate-500 block">
                  {isPending
                    ? 'Menunggu keputusan'
                    : isApproved
                    ? 'Disetujui Admin'
                    : 'Ditolak Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Summary Card (If already reviewed) */}
      {!isPending && (
        <div
          className={`p-5 sm:p-6 rounded-2xl border shadow-xs ${
            isApproved
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                isApproved ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {isApproved ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div className="space-y-2 flex-1">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider block opacity-75">
                  Hasil Keputusan Admin PKN
                </span>
                <h3 className="text-lg font-bold mt-0.5">
                  Permohonan Pembatalan {isApproved ? 'DISETUJUI' : 'DITOLAK'}
                </h3>
              </div>

              {/* Status explanation FR-08 */}
              <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/60 text-xs sm:text-sm text-slate-800 space-y-1">
                <div className="font-semibold text-slate-900">
                  Dampak pada Status Pendaftaran PKN:
                </div>
                <div className="flex items-center gap-2">
                  <span>Status Pendaftaran Saat Ini:</span>
                  <StatusBadge
                    type="registration"
                    status={isApproved ? 'cancelled' : 'accepted'}
                    size="small"
                  />
                  <span className="text-xs text-slate-500">
                    ({isApproved ? 'Pendaftaran Dibatalkan' : 'Pendaftaran Tetap Diterima'})
                  </span>
                </div>
              </div>

              {/* Admin note (BR-10) */}
              {request.admin_note && (
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider block text-slate-600 mb-1">
                    Catatan / Alasan Keputusan Admin:
                  </span>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                    “{request.admin_note}”
                  </div>
                </div>
              )}

              <div className="pt-1 text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Ditinjau oleh: <strong className="text-slate-700">{request.reviewed_by}</strong></span>
                <span>Waktu Keputusan: <strong className="text-slate-700">{request.reviewed_at}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Cards Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* Student & Registration Overview */}
        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" /> Data Mahasiswa & Instansi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Nama Mahasiswa</span>
              <span className="font-bold text-slate-900 block mt-0.5">{student.name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">NIM / Program Studi</span>
              <span className="font-bold text-slate-900 font-mono block mt-0.5">
                {student.nim} • {student.prodi}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Instansi Tempat PKN</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {registration?.institution_name}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Periode Pelaksanaan</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                {registration?.internship_period}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Box */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-600" /> Alasan Pengajuan Pembatalan
          </h3>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
            {request.reason}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setActiveView(currentRole === 'admin' ? 'admin_dashboard' : 'registration')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke {currentRole === 'admin' ? 'Daftar Pengajuan' : 'Data Pendaftaran'}</span>
        </button>
      </div>
    </div>
  );
};
