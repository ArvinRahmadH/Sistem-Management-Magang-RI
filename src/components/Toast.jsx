import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toast, closeToast } = useApp();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      closeToast();
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast, closeToast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  const bgColor = isSuccess
    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
    : isError
    ? 'bg-rose-50 border-rose-300 text-rose-900'
    : 'bg-blue-50 border-blue-300 text-blue-900';

  const Icon = isSuccess ? CheckCircle : isError ? AlertCircle : Info;
  const iconColor = isSuccess ? 'text-emerald-600' : isError ? 'text-rose-600' : 'text-blue-600';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${bgColor}`}>
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
        <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>
        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          title="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
