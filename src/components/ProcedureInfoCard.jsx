import React from 'react';
import { Info, ShieldAlert, Clock, CheckSquare } from 'lucide-react';

export const ProcedureInfoCard = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50/70 via-white to-indigo-50/40 p-5 sm:p-6 shadow-xs">
      <div className="flex items-start gap-3.5 mb-4">
        <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Informasi Prosedur Pembatalan Pendaftaran PKN
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Harap membaca panduan berikut sebelum mengajukan permohonan pembatalan atau pengunduran diri.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4 text-xs sm:text-sm">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Pengajuan Melalui Sistem:</span> Seluruh permohonan pembatalan harus diajukan resmi melalui formulir pada sistem SIMPKN.
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Peninjauan oleh Admin:</span> Pengajuan akan diperiksa dan diverifikasi oleh Tim Koordinator PKN fakultas.
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Tidak Batal Otomatis:</span> Pengiriman pengajuan tidak langsung membatalkan pendaftaran sampai keputusan resmi admin diterbitkan.
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Transparansi Status:</span> Mahasiswa dapat memantau status pengajuan (Menunggu, Disetujui, Ditolak) beserta catatan admin secara real-time.
          </div>
        </div>
      </div>
    </div>
  );
};
