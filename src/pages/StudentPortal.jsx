import React, { useState } from 'react';
import {
  GraduationCap,
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
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentRegistrationPage } from './StudentRegistrationPage';
import { StudentCancelFormPage } from './StudentCancelFormPage';
import { StudentCancelSuccessPage } from './StudentCancelSuccessPage';
import { StudentCancelDetailPage } from './StudentCancelDetailPage';

export const StudentPortal = () => {
  const {
    studentUser,
    loginStudent,
    logoutStudent,
    resetAllData,
    studentView,
    setStudentView,
    authAccounts,
  } = useApp();

  // Login form state (if logged out)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = () => {
    setEmail(authAccounts.student.email);
    setPassword(authAccounts.student.password);
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Masukkan email dan kata sandi.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const res = loginStudent(email, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.message);
      }
    }, 300);
  };

  // If student is logged out on this tab:
  if (!studentUser) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 mb-2">
              <GraduationCap className="w-9 h-9" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Portal Mahasiswa</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              SIMPKN — Masuk ke Tab Akun Mahasiswa
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100 space-y-5">
            {/* Quick Fill Button */}
            <div className="text-center pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Klik di sini untuk mengisi akun Mahasiswa otomatis</span>
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
                <label className="text-xs font-bold text-slate-900 block mb-1">Email Mahasiswa</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="mahasiswa@simpkn.ac.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
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
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
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
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Masuk Portal Mahasiswa</span>
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

  // If student is logged in:
  const renderStudentView = () => {
    switch (studentView) {
      case 'cancel_form':
        return <StudentCancelFormPage />;
      case 'cancel_success':
        return <StudentCancelSuccessPage />;
      case 'cancel_detail':
        return <StudentCancelDetailPage />;
      case 'registration':
      default:
        return <StudentRegistrationPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Dedicated Student Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        {/* Top Sync & Status Bar */}
        <div className="bg-slate-900 text-white px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] bg-blue-600 text-white shadow-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                Tab Khusus Mahasiswa
              </span>
              <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Terhubung & Sinkron Real-time dengan Tab Admin</span>
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
                onClick={logoutStudent}
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
                onClick={() => setStudentView('registration')}
                className="flex items-center gap-3 text-left focus:outline-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-blue-700 block">
                    SIMPKN <span className="text-slate-800 font-semibold text-sm">• Portal Mahasiswa</span>
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-1">
                    Sistem Informasi Praktik Kerja Nyata
                  </span>
                </div>
              </button>
            </div>

            <nav className="flex items-center gap-2">
              <button
                onClick={() => setStudentView('registration')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  studentView === 'registration' || studentView === 'cancel_form' || studentView === 'cancel_success'
                    ? 'bg-blue-50 text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Data Pendaftaran PKN</span>
              </button>
            </nav>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <img
                src={studentUser.avatar}
                alt={studentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">{studentUser.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">NIM: {studentUser.nim}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderStudentView()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500 text-center">
        <p>SIMPKN Portal Mahasiswa • Tab Berjalan Terpisah dari Admin</p>
      </footer>
    </div>
  );
};
