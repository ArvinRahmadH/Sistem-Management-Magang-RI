import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  Calendar,
  User,
  MapPin,
  FileText,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Info,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RegistrationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  studentName = '',
  studentNim = '',
  isAdmin = false,
}) => {
  const { students } = useApp();
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    student_id: '',
    institution_name: '',
    division: '',
    internship_period: '1 Juli 2026 - 31 Agustus 2026',
    institution_address: '',
    campus_mentor: 'Dr. Ir. Hendra Wijaya, M.T.',
    field_mentor: '',
    registration_status: 'accepted',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        student_id: initialData.student_id || '',
        institution_name: initialData.institution_name || '',
        division: initialData.division || '',
        internship_period: initialData.internship_period || '1 Juli 2026 - 31 Agustus 2026',
        institution_address: initialData.institution_address || '',
        campus_mentor: initialData.campus_mentor || 'Dr. Ir. Hendra Wijaya, M.T.',
        field_mentor: initialData.field_mentor || '',
        registration_status: initialData.registration_status || 'accepted',
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        student_id: students[0]?.student_id || 'std_01',
        institution_name: '',
        division: '',
        internship_period: '1 Juli 2026 - 31 Agustus 2026',
        institution_address: '',
        campus_mentor: 'Dr. Ir. Hendra Wijaya, M.T.',
        field_mentor: '',
        registration_status: 'accepted',
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen, students]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.institution_name.trim()) {
      newErrors.institution_name = 'Nama instansi / perusahaan wajib diisi.';
    }
    if (!formData.division.trim()) {
      newErrors.division = 'Divisi / posisi penempatan magang wajib diisi.';
    }
    if (!formData.internship_period.trim()) {
      newErrors.internship_period = 'Periode pelaksanaan PKN wajib diisi.';
    }
    if (!formData.institution_address.trim()) {
      newErrors.institution_address = 'Alamat instansi wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEdit ? 'Ubah Data Pendaftaran Magang' : 'Pendaftaran Magang PKN Baru'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAdmin ? (
                  <span>Mode Administrator • Sinkron Langsung ke Portal Mahasiswa</span>
                ) : (
                  <span>
                    Mahasiswa: <strong className="text-slate-700">{studentName}</strong> ({studentNim})
                  </span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4.5 max-h-[75vh] overflow-y-auto">
            {/* Quick Demo Info */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/70 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Sinkronisasi Otomatis Antar Peran:</span>
                <p>
                  Data yang Anda daftarkan di sini akan <strong>langsung muncul di akun mahasiswa dan admin</strong> secara real-time.
                </p>
              </div>
            </div>

            {/* If Admin is creating: Student Selector */}
            {isAdmin && !isEdit && (
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-200/70 rounded-xl space-y-1.5">
                <label className="text-xs font-bold text-indigo-950 block flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Pilih Mahasiswa yang Didaftarkan <span className="text-rose-600">*</span>
                </label>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-200 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                >
                  {students.map((std) => (
                    <option key={std.student_id} value={std.student_id}>
                      {std.name} (NIM: {std.nim}) — {std.prodi}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Institution Name */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Nama Instansi / Perusahaan <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                placeholder="Contoh: PT GoTo Gojek Tokopedia Tbk"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                  errors.institution_name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.institution_name && (
                <span className="text-xs text-rose-600 mt-1 block font-medium">{errors.institution_name}</span>
              )}
            </div>

            {/* Division & Period in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Divisi / Posisi Magang <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  placeholder="Contoh: Frontend Engineering"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                    errors.division ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-blue-600'
                  }`}
                />
                {errors.division && (
                  <span className="text-xs text-rose-600 mt-1 block font-medium">{errors.division}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Periode Pelaksanaan PKN <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="internship_period"
                  value={formData.internship_period}
                  onChange={handleChange}
                  placeholder="Contoh: 1 Juli 2026 - 31 Agustus 2026"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                    errors.internship_period ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-blue-600'
                  }`}
                />
                {errors.internship_period && (
                  <span className="text-xs text-rose-600 mt-1 block font-medium">{errors.internship_period}</span>
                )}
              </div>
            </div>

            {/* Institution Address */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Alamat Lokasi Instansi <span className="text-rose-600">*</span>
              </label>
              <textarea
                name="institution_address"
                rows={2}
                value={formData.institution_address}
                onChange={handleChange}
                placeholder="Contoh: Gedung Pasaraya Blok M Lt. 6, Jl. Iskandarsyah II No. 2, Kebayoran Baru, Jakarta Selatan"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                  errors.institution_address ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
              {errors.institution_address && (
                <span className="text-xs text-rose-600 mt-1 block font-medium">{errors.institution_address}</span>
              )}
            </div>

            {/* Mentors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Dosen Pembimbing Kampus
                </label>
                <input
                  type="text"
                  name="campus_mentor"
                  value={formData.campus_mentor}
                  onChange={handleChange}
                  placeholder="Nama dosen pembimbing"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Pembimbing Lapangan (Instansi)
                </label>
                <input
                  type="text"
                  name="field_mentor"
                  value={formData.field_mentor}
                  onChange={handleChange}
                  placeholder="Nama mentor industri"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1.5">
                Status Pendaftaran
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                    formData.registration_status === 'accepted'
                      ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="registration_status"
                    value="accepted"
                    checked={formData.registration_status === 'accepted'}
                    onChange={handleChange}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm block">Diterima (Resmi Aktif)</span>
                    <span className="text-[11px] text-slate-500 block font-normal">
                      Pendaftaran aktif (bisa diajukan pembatalan)
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-colors ${
                    formData.registration_status === 'pending_verification'
                      ? 'border-blue-500 bg-blue-50/60 text-blue-950 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="registration_status"
                    value="pending_verification"
                    checked={formData.registration_status === 'pending_verification'}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-xs sm:text-sm block">Menunggu Verifikasi</span>
                    <span className="text-[11px] text-slate-500 block font-normal">
                      Pendaftaran baru diajukan, menunggu approval admin
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Catatan / Deskripsi Tambahan (Opsional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Catatan tambahan mengenai proposal magang atau penugasan instansi..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEdit ? 'Simpan Perubahan' : 'Daftarkan Magang'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
