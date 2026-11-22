import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Clock,
  LogOut,
  RotateCcw,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdminDashboardPage } from './AdminDashboardPage';
import { AdminReviewPage } from './AdminReviewPage';

export const AdminPortal = () => {
  const {
    adminUser,
    loginAdmin,
    logoutAdmin,
    resetAllData,
    adminView,
    setAdminView,
    adminTab,
    setAdminTab,
    authAccounts,
    registrations,
    cancellations,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = () => {
    setEmail(authAccounts.admin.email);
    setPassword(authAccounts.admin.password);
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Masukkan email dan kata sandi admin.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const res = loginAdmin(email, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 300);
  };

  // If admin is logged out on this tab:
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 mb-2">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Portal Admin PKN</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              SIMPKN — Masuk ke Tab Administrator
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100 space-y-5">
            {/* Quick Fill Button */}
            <div className="text-center pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Klik di sini untuk mengisi akun Admin otomatis</span>
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">Email Administrator</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="admin@simpkn.ac.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Masuk Portal Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center">
              <a href="/" className="text-xs text-slate-500 hover:text-slate-800">
                ← Kembali ke Halaman Utama
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Count metrics
  const totalRegCount = registrations.length;
  const pendingCount = cancellations.filter((c) => c.request_status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Dedicated Admin Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        {/* Top Sync & Status Bar */}
        <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-indigo-600 text-white shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tab Khusus Admin PKN
              </span>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Terhubung & Sinkron Real-time dengan Tab Mahasiswa</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Kosongkan semua data pendaftaran & pembatalan?')) {
                    resetAllData();
                  }
                }}
                className="px-2 py-1 rounded-md bg-slate-800 hover:bg-rose-950/70 hover:text-rose-300 text-slate-400 border border-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                title="Kosongkan data"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Kosongkan Data</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1 text-[11px] font-semibold"
              >
                <LogOut className="w-3 h-3 text-rose-400" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAdminView('dashboard');
                  setAdminTab('registrations');
                }}
                className="flex items-center gap-3 text-left focus:outline-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-indigo-800 block">
                    SIMPKN <span className="text-slate-800 font-semibold text-sm">• Portal Admin PKN</span>
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-1">
                    Sistem Informasi Praktik Kerja Nyata
                  </span>
                </div>
              </button>
            </div>

            <nav className="flex items-center gap-2">
              {/* Tab Nav 1: Registrations */}
              <button
                onClick={() => {
                  setAdminView('dashboard');
                  setAdminTab('registrations');
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  adminView === 'dashboard' && adminTab === 'registrations'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Data Pendaftaran Mahasiswa</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                  {totalRegCount}
                </span>
              </button>

              {/* Tab Nav 2: Cancellations */}
              <button
                onClick={() => {
                  setAdminView('dashboard');
                  setAdminTab('cancellations');
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  (adminView === 'dashboard' && adminTab === 'cancellations') || adminView === 'detail'
                    ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Pengajuan Pembatalan</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                    {pendingCount} Baru
                  </span>
                )}
              </button>
            </nav>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">{adminUser.name}</div>
                <div className="text-[11px] text-slate-500">{adminUser.role}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {adminView === 'detail' ? <AdminReviewPage /> : <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500 text-center">
        <p>SIMPKN Portal Admin PKN • Tab Berjalan Terpisah dari Mahasiswa</p>
      </footer>
    </div>
  );
};
