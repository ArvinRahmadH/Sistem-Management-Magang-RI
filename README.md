# SIMPKN – Sistem Informasi Praktik Kerja Nyata
**Multi-Route Architecture: 2 Tab Terpisah (Mahasiswa & Admin PKN) dengan Sinkronisasi Real-Time**

Aplikasi ini telah dilengkapi dengan arsitektur **multi-route independen** agar Anda dapat membuka **Tab Mahasiswa** dan **Tab Admin PKN** secara berdampingan di 2 tab browser terpisah tanpa perlu keluar-masuk akun.

---

## 🌐 2 Route Resmi Sistem

| Route URL | Peruntukan Tab | Akun Otomatis | Keterangan |
|---|---|---|---|
| **`http://localhost:3000/mahasiswa`** | **Tab 1: Portal Mahasiswa** | `mahasiswa@simpkn.ac.id` / `mahasiswa123` | Mengelola pendaftaran magang (CRUD) dan mengajukan pembatalan PKN |
| **`http://localhost:3000/admin`** | **Tab 2: Portal Admin PKN** | `admin@simpkn.ac.id` / `admin123` | Memantau pendaftaran mahasiswa dan memproses persetujuan pembatalan |
| **`http://localhost:3000/`** | **Halaman Hub & Launcher** | - | Pilihan membuka portal atau klik **1 tombol langsung buka kedua tab** |

---

## 🚀 Cara Menjalankan & Menguji di 2 Tab Sekaligus

1. Buka peramban (*browser*) pada alamat:
   ```
   http://localhost:3000/
   ```
2. Klik tombol warna emas:  
   👉 **"Buka Mahasiswa & Admin Sekaligus di 2 Tab Bersebelahan ↗"**  
   *(Browser akan otomatis membuka 2 tab baru: satu untuk Mahasiswa dan satu untuk Admin).*

   *Atau Anda juga dapat langsung membuka dua tab manual di browser Anda:*
   - **Tab 1**: `http://localhost:3000/mahasiswa`
   - **Tab 2**: `http://localhost:3000/admin`

---

## ⚡ Skenario Demonstrasi Real-Time Antar Tab (Berdampingan)

Letakkan jendela/tab browser **Tab 1 (Mahasiswa)** di sebelah kiri dan **Tab 2 (Admin)** di sebelah kanan:

### 1. Di Tab Mahasiswa (`/mahasiswa`)
1. Klik tombol **"+ Daftarkan Tempat Magang Baru"**.
2. Masukkan nama instansi (misal: *PT GoTo Gojek Tokopedia Tbk*), divisi, dan alamat, lalu klik **"Daftarkan Magang"**.
3. **Lihat ke Tab Admin (`/admin`)**:  
   Secara instan tanpa refresh, data pendaftaran baru tersebut **langsung muncul di baris teratas tabel Admin**!

### 2. Di Tab Mahasiswa (`/mahasiswa`)
1. Pada kartu pendaftaran magang tersebut, klik **"Ajukan Pembatalan Pendaftaran"**.
2. Masukkan alasan pembatalan dan klik **"Kirim Pengajuan"**.
3. Status di Tab Mahasiswa menjadi **Menunggu**.
4. **Lihat ke Tab Admin (`/admin`)**:  
   Di tab *Pengajuan Pembatalan*, permohonan pembatalan dari Budi Santoso **langsung muncul secara real-time** dengan badge *Menunggu Review*.

### 3. Di Tab Admin (`/admin`)
1. Klik tombol **"Tinjau & Putuskan"** pada pengajuan Budi Santoso.
2. Tulis catatan admin (misal: *"Permohonan pembatalan disetujui."*).
3. Klik tombol **"Setujui Pembatalan"** dan konfirmasi.
4. **Lihat kembali ke Tab Mahasiswa (`/mahasiswa`)**:  
   Secara real-time di depan mata Anda, status pendaftaran di Tab Mahasiswa **langsung berubah menjadi Dibatalkan** dan pengajuan menjadi **Disetujui**, lengkap dengan catatan admin tanpa perlu me-refresh halaman!

---

## 🛡️ Keunggulan Arsitektur:
- **Sesi Otentikasi Terpisah**: Login/Logout di Tab Mahasiswa tidak akan mempengaruhi Tab Admin, dan sebaliknya.
- **Penyimpanan Terpusat (*Shared LocalStorage & Storage Events*)**: Sinkronisasi data berlangsung dalam hitungan milidetik antar tab.
- **Bebas Data Dummy**: Data pendaftaran awal dimulai dari kondisi bersih (*clean slate*).
- **Tombol Kosongkan Data (*Reset*)**: Terdapat tombol di bar atas pada kedua tab untuk mengosongkan kembali data ke kondisi nol kapan saja.
