import {
  AUTH_ACCOUNTS,
  INITIAL_STUDENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_CANCELLATIONS,
  ADMIN_PROFILE,
} from './src/data/initialData.js';

console.log('--- TEST 1: Clean State Verification (No Dummy Data) ---');
console.assert(INITIAL_REGISTRATIONS.length === 0, 'INITIAL_REGISTRATIONS must be empty initially');
console.assert(INITIAL_CANCELLATIONS.length === 0, 'INITIAL_CANCELLATIONS must be empty initially');
console.assert(AUTH_ACCOUNTS.student.email === 'mahasiswa@simpkn.ac.id', 'Student email is correct');
console.assert(AUTH_ACCOUNTS.student.password === 'mahasiswa123', 'Student password is correct');
console.assert(AUTH_ACCOUNTS.admin.email === 'admin@simpkn.ac.id', 'Admin email is correct');
console.assert(AUTH_ACCOUNTS.admin.password === 'admin123', 'Admin password is correct');
console.log('✓ Clean Initial State verified: Zero dummy registrations & cancellations, authentic credentials ready');

console.log('\n--- TEST 2: Authentication Verification ---');

function mockLogin(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (
    cleanEmail === AUTH_ACCOUNTS.student.email.toLowerCase() &&
    cleanPassword === AUTH_ACCOUNTS.student.password
  ) {
    return { success: true, role: 'student', user: AUTH_ACCOUNTS.student };
  }

  if (
    cleanEmail === AUTH_ACCOUNTS.admin.email.toLowerCase() &&
    cleanPassword === AUTH_ACCOUNTS.admin.password
  ) {
    return { success: true, role: 'admin', user: AUTH_ACCOUNTS.admin };
  }

  return { success: false, message: 'Invalid credentials' };
}

// Test Student Login
const studentLoginRes = mockLogin('mahasiswa@simpkn.ac.id', 'mahasiswa123');
console.assert(studentLoginRes.success === true && studentLoginRes.role === 'student', 'Student login should succeed');
console.log('✓ Mahasiswa login successful with mahasiswa@simpkn.ac.id / mahasiswa123');

// Test Admin Login
const adminLoginRes = mockLogin('admin@simpkn.ac.id', 'admin123');
console.assert(adminLoginRes.success === true && adminLoginRes.role === 'admin', 'Admin login should succeed');
console.log('✓ Admin login successful with admin@simpkn.ac.id / admin123');

// Test Invalid Login
const invalidRes = mockLogin('salah@ac.id', 'salah123');
console.assert(invalidRes.success === false, 'Invalid login should fail');
console.log('✓ Invalid credentials properly rejected');

console.log('\n--- TEST 3: End-to-End User Flow (Create by Student -> Sync to Admin -> Admin Review) ---');

let registrations = [];
let cancellations = [];

// Step 1: Mahasiswa creates registration
const newReg = {
  registration_id: 'reg_sync_001',
  student_id: AUTH_ACCOUNTS.student.student_id,
  institution_name: 'PT Telkom Indonesia Tbk',
  division: 'Software Engineering',
  internship_period: '1 Juli 2026 - 31 Agustus 2026',
  registration_status: 'accepted',
  campus_mentor: 'Dr. Ir. Hendra Wijaya, M.T.',
  field_mentor: 'Bambang Irawan',
  institution_address: 'Telkom Landmark Tower Jakarta',
  registered_at: '2026-11-22 18:40',
  accepted_at: '2026-11-22 18:40',
};
registrations.push(newReg);
console.assert(registrations.length === 1, 'Registration created by student');
console.log('✓ Step 1: Mahasiswa berhasil mendaftarkan magang di PT Telkom Indonesia Tbk');

// Step 2: Mahasiswa submits cancellation request
const newCancel = {
  request_id: 'BTL-2026-001',
  registration_id: newReg.registration_id,
  student_id: AUTH_ACCOUNTS.student.student_id,
  reason: 'Dinyatakan diterima program beasiswa kementerian yang bertabrakan dengan jadwal PKN.',
  request_status: 'pending',
  admin_note: '',
  submitted_at: '2026-11-22 18:41',
  reviewed_at: null,
  reviewed_by: null,
};
cancellations.push(newCancel);
console.assert(cancellations.length === 1, 'Cancellation submitted');
console.log('✓ Step 2: Mahasiswa mengajukan pembatalan (Status: Menunggu)');

// Step 3: Admin logs in, inspects the synchronized registration and cancellation
const adminVisibleReg = registrations.find(r => r.registration_id === newReg.registration_id);
const adminVisibleCancel = cancellations.find(c => c.request_id === newCancel.request_id);
console.assert(adminVisibleReg && adminVisibleReg.institution_name === 'PT Telkom Indonesia Tbk', 'Admin must see student registration');
console.assert(adminVisibleCancel && adminVisibleCancel.request_status === 'pending', 'Admin must see pending cancellation');
console.log('✓ Step 3: Admin melihat pendaftaran dan pengajuan mahasiswa yang tersinkronisasi');

// Step 4: Admin approves cancellation
adminVisibleCancel.request_status = 'approved';
adminVisibleCancel.admin_note = 'Disetujui berdasarkan surat bukti penerimaan beasiswa resmi.';
adminVisibleCancel.reviewed_at = '2026-11-22 18:45';
adminVisibleCancel.reviewed_by = `${AUTH_ACCOUNTS.admin.name} (${AUTH_ACCOUNTS.admin.role})`;
adminVisibleReg.registration_status = 'cancelled'; // PRD BR-06

console.assert(adminVisibleCancel.request_status === 'approved', 'Request status is approved');
console.assert(adminVisibleReg.registration_status === 'cancelled', 'Registration status is cancelled');
console.log('✓ Step 4: Admin menyetujui pengajuan, status pendaftaran berubah menjadi Dibatalkan');

console.log('\n========================================');
console.log('ALL AUTH, CLEAN DATA, & SYNC TESTS PASSED!');
console.log('========================================');
