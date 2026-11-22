import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Calendar,
  GraduationCap,
  AlertTriangle,
  Send,
  HelpCircle,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const StudentCancelFormPage = () => {
  const {
    currentStudent,
    currentRegistration,
    setActiveView,
    submitCancellation,
  } = useApp();

  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAttempt = (e) => {
    e.preventDefault();
    if (!reason || reason.trim().length === 0) {
      setError('Alasan pembatalan wajib diisi.');
      return;
    }
    if (reason.trim().length < 15) {
      setError('Mohon jelaskan alasan pembatalan lebih rinci (minimal 15 karakter).');
      return;
    }
    setError('');
    // Open confirmation modal as per FR-04
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    // Simulate brief processing for realistic UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      submitCancellation(reason);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Navigation / Back Button */}
      <div>
        <button
          onClick={() => setActiveView('registration')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Data Pendaftaran</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
          <span>Portal Mahasiswa</span>
          <span>/</span>
          <span>Data Pendaftaran</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Formulir Pembatalan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengajuan Pembatalan Pendaftaran PKN
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Lengkapi formulir di bawah ini dengan alasan yang jelas dan dapat dipertanggungjawabkan.
        </p>
      </div>

      {/* Important Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 shadow-xs flex items-start gap-3.5">
        <div className="p-2 bg-amber-200/80 rounded-xl text-amber-900 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm space-y-1">
          <h4 className="font-bold text-amber-950">Perhatian Sebelum Mengirim Pengajuan:</h4>
          <ul className="list-disc pl-4 space-y-0.5 text-amber-900">
            <li>Pengajuan pembatalan <span className="font-semibold">tidak langsung</span> membatalkan status pendaftaran Anda.</li>
            <li>Pengajuan harus ditinjau dan disetujui terlebih dahulu oleh Tim Koordinator PKN fakultas.</li>
            <li>Pastikan alasan yang Anda berikan valid sesuai pedoman akademik yang berlaku.</li>
          </ul>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmitAttempt} className="space-y-6">
        {/* Registration Summary Card (Read-only as per FR-03) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Info className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Ringkasan Data Pendaftaran (Otomatis)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">Nama Mahasiswa</span>
              <span className="font-bold text-slate-900 block mt-0.5">{currentStudent.name}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">Nomor Induk Mahasiswa (NIM)</span>
              <span className="font-bold text-slate-900 font-mono block mt-0.5">{currentStudent.nim}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">Instansi Tempat PKN</span>
              <span className="font-bold text-slate-900 block mt-0.5">
                {currentRegistration.institution_name}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block">Periode Pelaksanaan PKN</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                {currentRegistration.internship_period}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Textarea (FR-03 & BR-03) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <label htmlFor="reason" className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Alasan Pengajuan Pembatalan</span>
                <span className="text-rose-600 font-bold">* (Wajib diisi)</span>
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Jelaskan secara rinci alasan mengapa Anda mengajukan pembatalan atau pengunduran diri.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              {reason.length} karakter
            </span>
          </div>

          <div>
            <textarea
              id="reason"
              rows={5}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: Saya mendapatkan panggilan beasiswa program mobilitas internasional dari kementerian yang jadwal kegiatannya bentrok dengan periode PKN ini..."
              className={`w-full p-4 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
                error
                  ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20'
                  : 'border-slate-300 focus:border-blue-600 bg-white'
              }`}
            />

            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Tips: Berikan alasan yang jelas dan terperinci. Admin akan membaca alasan ini untuk menentukan
              apakah permohonan pembatalan dapat disetujui atau ditolak.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveView('registration')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Batal & Kembali
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Pengajuan</span>
          </button>
        </div>
      </form>

      {/* Confirmation Modal as explicitly required by FR-04 */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="Konfirmasi Pengiriman Pengajuan"
        message={`Pengajuan akan dikirim kepada admin.\n\nPengajuan belum berarti pendaftaran langsung dibatalkan. Mahasiswa perlu menunggu hasil pemeriksaan admin.`}
        confirmText="Ya, Kirim Pengajuan"
        cancelText="Periksa Kembali"
        type="warning"
        isLoading={isSubmitting}
      />
    </div>
  );
};
