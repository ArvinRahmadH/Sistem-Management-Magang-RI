import React from 'react';
import { X, Building2, Calendar, User, Mail, MapPin, FileCheck2, GraduationCap } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const RegistrationDetailModal = ({ isOpen, onClose, student, registration }) => {
  if (!isOpen || !registration || !student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Detail Pendaftaran PKN</h3>
              <p className="text-xs text-slate-500">ID Registrasi: #{registration.registration_id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Status Pendaftaran Saat Ini</span>
              <span className="text-sm font-semibold text-slate-900 mt-0.5 block">
                {registration.registration_status === 'accepted' ? 'Pendaftaran Aktif & Disetujui' : 'Pendaftaran Telah Dibatalkan'}
              </span>
            </div>
            <StatusBadge type="registration" status={registration.registration_status} size="normal" />
          </div>

          {/* Student Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Informasi Mahasiswa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-slate-50/60 p-4 rounded-xl border border-slate-200/70">
              <div>
                <span className="text-xs text-slate-500 block">Nama Lengkap</span>
                <span className="font-semibold text-slate-900">{student.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">NIM (Nomor Induk Mahasiswa)</span>
                <span className="font-semibold text-slate-900 font-mono">{student.nim}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Program Studi & Angkatan</span>
                <span className="text-slate-800">{student.prodi} ({student.angkatan})</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Email Mahasiswa</span>
                <span className="text-slate-800">{student.email}</span>
              </div>
            </div>
          </div>

          {/* Institution Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" /> Informasi Instansi / Tempat PKN
            </h4>
            <div className="space-y-3 bg-slate-50/60 p-4 rounded-xl border border-slate-200/70 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Nama Perusahaan / Instansi</span>
                <span className="font-semibold text-slate-900 text-base">{registration.institution_name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Divisi / Penempatan Unit</span>
                <span className="text-slate-800">{registration.division || '-'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Alamat Instansi</span>
                <span className="text-slate-700 flex items-start gap-1 mt-0.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  {registration.institution_address}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                <div>
                  <span className="text-xs text-slate-500 block">Periode Pelaksanaan PKN</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                    {registration.internship_period}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Waktu Diterima</span>
                  <span className="text-slate-700 block mt-0.5">{registration.accepted_at || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" /> Informasi Pembimbing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/60 p-4 rounded-xl border border-slate-200/70 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Dosen Pembimbing Kampus</span>
                <span className="font-semibold text-slate-800">{registration.campus_mentor}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Pembimbing Lapangan (Instansi)</span>
                <span className="font-semibold text-slate-800">{registration.field_mentor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
