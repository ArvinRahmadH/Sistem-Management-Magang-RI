import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Menu,
  X,
  FileText,
  Building2,
  Clock,
  LogOut,
  User,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const {
    currentUser,
    logout,
    resetAllData,
    activeView,
    setActiveView,
    adminTab,
    setAdminTab,
    cancellations,
    registrations,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  if (!currentUser) return null;

  const isStudent = currentUser.role === 'student';
  const isAdmin = currentUser.role === 'admin';

  // Count pending cancellation requests
  const pendingCount = cancellations.filter((c) => c.request_status === 'pending').length;
  // Count total registrations
  const totalRegCount = registrations.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Status Bar with Realtime Sync & Reset */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                isStudent ? 'bg-blue-600/30 text-blue-300 border border-blue-400/30' : 'bg-indigo-600/30 text-indigo-300 border border-indigo-400/30'
              }`}
            >
              {isStudent ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  Portal Mahasiswa
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Portal Administrator PKN
                </>
              )}
            </span>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sinkronisasi Data Real-time Aktif</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reset All Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mengosongkan seluruh data pendaftaran dan pembatalan?')) {
                  resetAllData();
                }
              }}
              className="px-2 py-1 rounded-md bg-slate-800 hover:bg-rose-950/70 hover:text-rose-300 text-slate-400 border border-slate-700 hover:border-rose-800 transition-colors flex items-center gap-1 text-[11px]"
              title="Kosongkan seluruh data untuk memulai dari nol"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Kosongkan Data</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 text-[11px] font-semibold"
            >
              <LogOut className="w-3 h-3 text-rose-400" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isStudent) setActiveView('registration');
                else {
                  setActiveView('admin_dashboard');
                  setAdminTab('registrations');
                }
              }}
              className="flex items-center gap-3 text-left focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent block">
                  SIMPKN
                </span>
                <span className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-1">
                  Sistem Informasi Praktik Kerja Nyata
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {isStudent ? (
              <button
                onClick={() => setActiveView('registration')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeView === 'registration' || activeView === 'cancel_form' || activeView === 'cancel_success'
                    ? 'bg-blue-50 text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                Data Pendaftaran PKN
              </button>
            ) : (
              <>
                {/* Admin Nav 1: Data Pendaftaran Mahasiswa */}
                <button
                  onClick={() => {
                    setActiveView('admin_dashboard');
                    setAdminTab('registrations');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeView === 'admin_dashboard' && adminTab === 'registrations'
                      ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Data Pendaftaran Mahasiswa
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                    {totalRegCount}
                  </span>
                </button>

                {/* Admin Nav 2: Pengajuan Pembatalan PKN (PRD) */}
                <button
                  onClick={() => {
                    setActiveView('admin_dashboard');
                    setAdminTab('cancellations');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    (activeView === 'admin_dashboard' && adminTab === 'cancellations') || activeView === 'admin_detail'
                      ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Pengajuan Pembatalan
                  {pendingCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                      {pendingCount} Baru
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {cancellations.length}
                    </span>
                  )}
                </button>
              </>
            )}
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {isStudent ? `NIM: ${currentUser.nim}` : currentUser.role}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 md:hidden rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
              <div className="text-[11px] text-slate-500">
                {isStudent ? `NIM ${currentUser.nim} • ${currentUser.prodi}` : currentUser.role}
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-xs font-bold text-rose-700 bg-rose-50 rounded-lg border border-rose-200 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>

          {isStudent ? (
            <button
              onClick={() => {
                setActiveView('registration');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 bg-blue-50 text-blue-700"
            >
              <FileText className="w-4 h-4" />
              Data Pendaftaran PKN
            </button>
          ) : (
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveView('admin_dashboard');
                  setAdminTab('registrations');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  adminTab === 'registrations' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Data Pendaftaran Mahasiswa
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                  {totalRegCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveView('admin_dashboard');
                  setAdminTab('cancellations');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  adminTab === 'cancellations' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pengajuan Pembatalan
                </span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
