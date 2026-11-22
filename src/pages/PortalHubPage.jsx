import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  ExternalLink,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  User,
  Building2,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PortalHubPage = () => {
  const { authAccounts, registrations, cancellations } = useApp();

  const handleOpenBothTabs = () => {
    window.open('/mahasiswa', '_blank');
    window.open('/admin', '_blank');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center pt-4 sm:pt-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Sistem Informasi Praktik Kerja Nyata (SIMPKN)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Pilih Portal Akses SIMPKN
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Sistem mendukung <strong>2 route dan tab terpisah</strong> agar Anda dapat menjalankan peran Mahasiswa dan Admin PKN
          secara bersamaan tanpa perlu keluar-masuk akun.
        </p>

        {/* 1-Click Open Both Tabs Button */}
        <div className="pt-2">
          <button
            onClick={handleOpenBothTabs}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm text-slate-950 bg-linear-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 transition-all hover:scale-102 active:scale-98"
          >
            <Layers className="w-4 h-4 text-slate-950" />
            <span>Buka Mahasiswa & Admin Sekaligus di 2 Tab Bersebelahan ↗</span>
          </button>
        </div>
      </div>

      {/* Two Portal Cards Grid */}
      <div className="max-w-5xl mx-auto w-full my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Portal Mahasiswa */}
        <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl hover:shadow-blue-500/10 group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono">
                /mahasiswa
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                Portal Mahasiswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Gunakan tab ini untuk mendaftarkan magang baru, mengelola data PKN, dan mengajukan permohonan pembatalan pendaftaran.
              </p>
            </div>

            {/* Account Info Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 block">Kredensial Login Mahasiswa:</span>
              <div className="text-slate-400 font-mono">
                Email: <span className="text-blue-300 font-semibold">{authAccounts.student.email}</span>
              </div>
              <div className="text-slate-400 font-mono">
                Password: <span className="text-blue-300 font-semibold">{authAccounts.student.password}</span>
              </div>
              <div className="text-slate-500 text-[11px] pt-0.5">
                Nama: {authAccounts.student.name} (NIM: {authAccounts.student.nim})
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-3">
            <a
              href="/mahasiswa"
              className="py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Buka di Tab Ini</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/mahasiswa"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Buka Tab Baru</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 2: Portal Admin PKN */}
        <div className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all shadow-xl hover:shadow-indigo-500/10 group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-mono">
                /admin
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                Portal Admin PKN
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Gunakan tab ini untuk melihat seluruh pendaftaran magang mahasiswa yang tersinkronisasi serta memproses persetujuan pembatalan PKN.
              </p>
            </div>

            {/* Account Info Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 block">Kredensial Login Admin:</span>
              <div className="text-slate-400 font-mono">
                Email: <span className="text-indigo-300 font-semibold">{authAccounts.admin.email}</span>
              </div>
              <div className="text-slate-400 font-mono">
                Password: <span className="text-indigo-300 font-semibold">{authAccounts.admin.password}</span>
              </div>
              <div className="text-slate-500 text-[11px] pt-0.5">
                Nama: {authAccounts.admin.name} ({authAccounts.admin.role})
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-3">
            <a
              href="/admin"
              className="py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Buka di Tab Ini</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Buka Tab Baru</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto text-center text-xs text-slate-500 pb-4">
        <p>SIMPKN Prototype v1.0 • Rekayasa Interaksi • Sinkronisasi Data Real-time Aktif</p>
      </div>
    </div>
  );
};
