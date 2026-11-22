import React from 'react';
import {
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Calendar,
  Building2,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export const StudentCancelSuccessPage = () => {
  const {
    currentStudent,
    currentRegistration,
    selectedRequestId,
    cancellations,
    setActiveView,
    setSelectedRequestId,
  } = useApp();

  // Find the created request
  const request =
    cancellations.find((c) => c.request_id === selectedRequestId) ||
    cancellations.find((c) => c.student_id === currentStudent.student_id) ||
    cancellations[0];

  const handleGoToDetail = () => {
    if (request) {
      setSelectedRequestId(request.request_id);
      setActiveView('cancel_detail');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-10 space-y-6">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-10">
        {/* Animated Success Badge */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Success Message as required by PRD FR-04 */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengajuan Berhasil Dikirim
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
          “Pengajuan pembatalan berhasil dikirim. Silakan menunggu proses pemeriksaan oleh admin.”
        </p>

        {/* Submission Details Box */}
        <div className="mt-8 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 text-left space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Nomor Identitas Pengajuan</span>
            <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-sm">
              #{request?.request_id || 'BTL-2026-NEW'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Status Pengajuan</span>
            <StatusBadge type="cancellation" status={request?.request_status || 'pending'} size="normal" />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Waktu Pengiriman</span>
            <span className="font-semibold text-slate-800">{request?.submitted_at || 'Hari ini'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Instansi PKN</span>
            <span className="font-semibold text-slate-900 truncate max-w-[220px]">
              {currentRegistration?.institution_name}
            </span>
          </div>
        </div>

        {/* Process Info Note */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-blue-900 text-xs text-left flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Catatan Penting:</span>
            <p>
              Status pendaftaran Anda saat ini masih <span className="font-semibold">Diterima</span> dan belum berubah menjadi
              batal. Keputusan resmi akan diterbitkan setelah peninjauan oleh Tim Koordinator PKN.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleGoToDetail}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Lihat Status Pengajuan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveView('registration')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Kembali ke Data Pendaftaran
          </button>
        </div>
      </div>
    </div>
  );
};
