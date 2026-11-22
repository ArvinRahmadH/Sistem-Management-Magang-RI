export const AUTH_ACCOUNTS = {
  student: {
    email: 'mahasiswa@simpkn.ac.id',
    password: 'mahasiswa123',
    student_id: 'std_01',
    name: 'Budi Santoso',
    nim: '2110511001',
    prodi: 'S1 Informatika',
    angkatan: '2021',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  admin: {
    email: 'admin@simpkn.ac.id',
    password: 'admin123',
    admin_id: 'adm_01',
    name: 'Dra. Sri Wahyuni, M.Kom',
    nip: '197804122003122001',
    role: 'Koordinator Unit PKN & Magang',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
  },
};

export const INITIAL_STUDENTS = [
  AUTH_ACCOUNTS.student,
];

// Clean state: No dummy registrations initially
export const INITIAL_REGISTRATIONS = [];

// Clean state: No dummy cancellation requests initially
export const INITIAL_CANCELLATIONS = [];

export const ADMIN_PROFILE = AUTH_ACCOUNTS.admin;
