import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

export const StatusBadge = ({ type, status, size = 'normal' }) => {
  // size: 'small' | 'normal' | 'large'
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5 gap-1',
    normal: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-medium',
    large: 'text-sm sm:text-base px-3.5 py-1.5 gap-2 font-semibold',
  }[size] || 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-medium';

  if (type === 'registration') {
    if (status === 'accepted') {
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 shadow-xs ${sizeClasses}`}
        >
          <CheckCircle2 className={size === 'large' ? 'w-5 h-5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
          <span>Diterima</span>
        </span>
      );
    }
    if (status === 'pending_verification') {
      return (
        <span
          className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 shadow-xs ${sizeClasses}`}
        >
          <Clock className={size === 'large' ? 'w-5 h-5 text-blue-600 animate-pulse' : 'w-4 h-4 text-blue-600 animate-pulse'} />
          <span>Menunggu Verifikasi</span>
        </span>
      );
    }
    if (status === 'cancelled') {
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 shadow-xs ${sizeClasses}`}
        >
          <XCircle className={size === 'large' ? 'w-5 h-5 text-rose-600' : 'w-4 h-4 text-rose-600'} />
          <span>Dibatalkan</span>
        </span>
      );
    }
    if (status === 'rejected') {
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 shadow-xs ${sizeClasses}`}
        >
          <AlertCircle className={size === 'large' ? 'w-5 h-5 text-rose-600' : 'w-4 h-4 text-rose-600'} />
          <span>Ditolak</span>
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20 ${sizeClasses}`}
      >
        <span>{status}</span>
      </span>
    );
  }

  // Type: 'cancellation'
  if (status === 'pending') {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/30 shadow-xs ${sizeClasses}`}
      >
        <Clock className={size === 'large' ? 'w-5 h-5 text-amber-600 animate-pulse' : 'w-4 h-4 text-amber-600 animate-pulse'} />
        <span>Menunggu</span>
      </span>
    );
  }

  if (status === 'approved') {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/30 shadow-xs ${sizeClasses}`}
      >
        <CheckCircle2 className={size === 'large' ? 'w-5 h-5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
        <span>Disetujui</span>
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-rose-50 text-rose-800 ring-1 ring-inset ring-rose-600/30 shadow-xs ${sizeClasses}`}
      >
        <AlertCircle className={size === 'large' ? 'w-5 h-5 text-rose-600' : 'w-4 h-4 text-rose-600'} />
        <span>Ditolak</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20 ${sizeClasses}`}
    >
      <span>{status || 'Belum Ada'}</span>
    </span>
  );
};
