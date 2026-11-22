import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const { login, authAccounts } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleTab, setSelectedRoleTab] = useState('student'); // 'student' | 'admin'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = (role) => {
    setSelectedRoleTab(role);
    if (role === 'student') {
      setEmail(authAccounts.student.email);
      setPassword(authAccounts.student.password);
    } else {
      setEmail(authAccounts.admin.email);
      setPassword(authAccounts.admin.password);
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Silakan masukkan email dan kata sandi.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.message || 'Email atau kata sandi tidak sesuai.');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo & Portal Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/30 mb-2">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">SIMPKN</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Sistem Informasi Praktik Kerja Nyata
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100 space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleQuickFill('student')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  selectedRoleTab === 'student'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Mahasiswa</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  selectedRoleTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin PKN</span>
              </button>
            </div>
          </div>

          {/* Quick-fill notification button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => handleQuickFill(selectedRoleTab)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Klik di sini untuk mengisi otomatis akun {selectedRoleTab === 'student' ? 'Mahasiswa' : 'Admin'}
              </span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4.5">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@simpkn.ac.id"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                selectedRoleTab === 'admin'
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
              } disabled:opacity-50`}
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Account Credentials Cheat Sheet */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Akun Login Resmi Sistem
            </span>
            <div className="space-y-2 text-xs">
              {/* Mahasiswa Card */}
              <div
                onClick={() => handleQuickFill('student')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    Akun Mahasiswa
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100/70 px-1.5 py-0.5 rounded">
                    Budi Santoso
                  </span>
                </div>
                <div className="mt-1 text-slate-600 font-mono text-[11px]">
                  Email: <span className="text-slate-900 font-semibold">{authAccounts.student.email}</span>
                </div>
                <div className="text-slate-600 font-mono text-[11px]">
                  Password: <span className="text-slate-900 font-semibold">{authAccounts.student.password}</span>
                </div>
              </div>

              {/* Admin Card */}
              <div
                onClick={() => handleQuickFill('admin')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    Akun Admin PKN
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                    Dra. Sri Wahyuni
                  </span>
                </div>
                <div className="mt-1 text-slate-600 font-mono text-[11px]">
                  Email: <span className="text-slate-900 font-semibold">{authAccounts.admin.email}</span>
                </div>
                <div className="text-slate-600 font-mono text-[11px]">
                  Password: <span className="text-slate-900 font-semibold">{authAccounts.admin.password}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
