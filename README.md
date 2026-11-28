# PRD – Prototipe SIMPKN

**Product Requirements Document**

## 1. Informasi Produk

| Informasi | Keterangan |
|---|---|
| Nama Produk | SIMPKN – Prototipe Pengajuan Pembatalan Pendaftaran PKN |
| Jenis Produk | Responsive Web Application |
| Mata Kuliah | Rekayasa Interaksi |
| Platform | Web Desktop dan Mobile |
| Target Pengguna | Mahasiswa dan Admin |
| Status Produk | Prototipe |

## 2. Latar Belakang

SIMPKN merupakan sistem informasi yang digunakan mahasiswa dalam proses pendaftaran dan pengelolaan kegiatan Praktik Kerja Nyata (PKN).

Berdasarkan pengalaman penggunaan sistem dan hasil pengumpulan data melalui kuesioner terbuka, ditemukan permasalahan pada proses setelah pendaftaran PKN diterima. Mahasiswa yang ingin membatalkan atau mengundurkan diri dari pendaftaran belum mendapatkan informasi dan alur pengajuan pembatalan yang cukup jelas.

Ketidakjelasan tersebut dapat membuat mahasiswa kebingungan mengenai tindakan yang harus dilakukan, lokasi untuk mengajukan pembatalan, serta bagaimana mengetahui apakah pengajuan mereka telah diproses.

Oleh karena itu, dikembangkan prototipe SIMPKN yang berfokus pada penyediaan alur pengajuan pembatalan pendaftaran PKN yang jelas, mudah dipahami, dan dapat dipantau oleh mahasiswa.

## 3. Permasalahan

Permasalahan utama yang ingin diselesaikan adalah:

1. Mahasiswa kesulitan menemukan informasi mengenai prosedur pembatalan pendaftaran PKN setelah status pendaftaran diterima.
2. Mahasiswa belum memiliki alur pengajuan pembatalan yang jelas melalui sistem.
3. Mahasiswa tidak mengetahui bagaimana memantau status pengajuan pembatalan.
4. Proses pembatalan membutuhkan mekanisme pemeriksaan oleh admin agar keputusan tidak dilakukan secara langsung oleh mahasiswa.

## 4. Tujuan Produk

Tujuan pengembangan prototipe SIMPKN adalah:

1. Menyediakan akses yang jelas untuk mengajukan pembatalan pendaftaran PKN.
2. Mempermudah mahasiswa dalam mengisi dan mengirimkan alasan pembatalan.
3. Memberikan informasi status pengajuan pembatalan secara transparan.
4. Menyediakan fitur bagi admin untuk memeriksa, menyetujui, atau menolak pengajuan.
5. Mengurangi kebingungan mahasiswa ketika ingin mengundurkan diri setelah pendaftaran PKN diterima.

## 5. Target Pengguna

### 5.1 Mahasiswa

Mahasiswa merupakan pengguna utama yang telah memiliki pendaftaran PKN dengan status Diterima dan ingin mengajukan pembatalan.

Kebutuhan mahasiswa:

- Melihat informasi pendaftaran PKN.
- Menemukan fitur pengajuan pembatalan.
- Mengisi alasan pembatalan.
- Mengirimkan pengajuan pembatalan.
- Melihat status dan hasil pengajuan.

### 5.2 Admin

Admin merupakan pengguna yang bertugas memeriksa dan memberikan keputusan terhadap pengajuan pembatalan.

Kebutuhan admin:

- Melihat daftar pengajuan pembatalan.
- Melihat detail dan alasan pengajuan.
- Menyetujui atau menolak pengajuan.
- Memberikan catatan atau keterangan keputusan.

## 6. Ruang Lingkup Produk

### 6.1 Fitur yang Dikembangkan

Prototipe mencakup fitur berikut:

1. Login mahasiswa dan admin.
2. Dashboard mahasiswa.
3. Informasi Data Pendaftaran PKN.
4. Pengajuan pembatalan pendaftaran.
5. Formulir pengisian alasan pembatalan.
6. Konfirmasi pengajuan.
7. Informasi status pengajuan.
8. Riwayat dan detail pengajuan mahasiswa.
9. Dashboard admin.
10. Daftar dan detail pengajuan pembatalan.
11. Persetujuan atau penolakan pengajuan oleh admin.
12. Pencarian atau filter pengajuan admin.

### 6.2 Fitur di Luar Ruang Lingkup

Prototipe tidak mencakup:

- Sistem pendaftaran PKN secara menyeluruh.
- Pengelolaan seluruh data akademik mahasiswa.
- Integrasi dengan sistem akademik kampus.
- Pengiriman notifikasi melalui email atau WhatsApp.
- Pengelolaan pembayaran atau administrasi keuangan.
- Implementasi kebijakan pembatalan PKN secara resmi.
- Sistem produksi dengan backend dan database kampus.

## 7. Kebutuhan Fungsional

| ID | Kebutuhan Fungsional |
|---|---|
| FR-01 | Sistem menyediakan login untuk mahasiswa dan admin. |
| FR-02 | Mahasiswa dapat melihat dashboard dan informasi pendaftaran PKN. |
| FR-03 | Mahasiswa dengan status pendaftaran Diterima dapat mengajukan pembatalan. |
| FR-04 | Mahasiswa wajib mengisi alasan pembatalan sebelum mengirim pengajuan. |
| FR-05 | Sistem menampilkan konfirmasi sebelum pengajuan dikirim. |
| FR-06 | Sistem menyimpan pengajuan dengan status Menunggu. |
| FR-07 | Mahasiswa dapat melihat status dan detail pengajuan. |
| FR-08 | Mahasiswa tidak dapat mengirim pengajuan baru selama pengajuan sebelumnya masih Menunggu. |
| FR-09 | Admin dapat melihat daftar dan detail pengajuan pembatalan. |
| FR-10 | Admin dapat menyetujui atau menolak pengajuan. |
| FR-11 | Admin dapat memberikan catatan atau keterangan keputusan. |
| FR-12 | Sistem memperbarui status pengajuan berdasarkan keputusan admin. |
| FR-13 | Jika disetujui, status pendaftaran berubah menjadi Dibatalkan. |
| FR-14 | Jika ditolak, status pendaftaran tetap Diterima. |

## 8. Kebutuhan Non-Fungsional

| ID | Kebutuhan Non-Fungsional |
|---|---|
| NFR-01 | Aplikasi menggunakan Bahasa Indonesia yang mudah dipahami. |
| NFR-02 | Aplikasi memiliki tampilan responsif pada desktop, tablet, dan smartphone. |
| NFR-03 | Desain antarmuka konsisten dan mudah dipelajari. |
| NFR-04 | Sistem menampilkan pesan yang jelas ketika terjadi kesalahan atau tindakan berhasil. |
| NFR-05 | Data demo dan perubahan status tetap tersimpan setelah halaman dimuat ulang. |
| NFR-06 | Navigasi dan alur pengajuan pembatalan mudah ditemukan oleh pengguna. |

## 9. User Stories

### Mahasiswa

- Sebagai mahasiswa, saya ingin melihat informasi pendaftaran PKN agar mengetahui status pendaftaran saya.
- Sebagai mahasiswa, saya ingin menemukan fitur pengajuan pembatalan agar dapat mengajukan pengunduran diri dengan jelas.
- Sebagai mahasiswa, saya ingin mengisi alasan pembatalan agar admin mengetahui alasan saya mengajukan pembatalan.
- Sebagai mahasiswa, saya ingin melihat status pengajuan agar mengetahui apakah pengajuan saya sedang diproses, disetujui, atau ditolak.

### Admin

- Sebagai admin, saya ingin melihat daftar pengajuan pembatalan agar dapat mengetahui pengajuan yang masuk.
- Sebagai admin, saya ingin melihat alasan pembatalan agar dapat mempertimbangkan keputusan.
- Sebagai admin, saya ingin menyetujui atau menolak pengajuan agar proses pembatalan dapat dikelola dengan jelas.

## 10. Alur Utama Produk

### 10.1 Alur Mahasiswa

1. Mahasiswa login ke aplikasi.
2. Mahasiswa membuka dashboard.
3. Mahasiswa memilih menu Data Pendaftaran.
4. Sistem menampilkan informasi pendaftaran dengan status Diterima.
5. Mahasiswa memilih Ajukan Pembatalan Pendaftaran.
6. Mahasiswa mengisi alasan pembatalan.
7. Mahasiswa memeriksa dan mengonfirmasi pengajuan.
8. Sistem menyimpan pengajuan dengan status Menunggu.
9. Mahasiswa dapat melihat perkembangan pengajuan.

### 10.2 Alur Admin

1. Admin login ke aplikasi.
2. Admin membuka dashboard pengajuan.
3. Admin memilih salah satu pengajuan.
4. Admin memeriksa informasi mahasiswa dan alasan pembatalan.
5. Admin memilih Setujui atau Tolak.
6. Admin dapat menambahkan catatan keputusan.
7. Sistem memperbarui status pengajuan dan status pendaftaran mahasiswa.

## 11. Aturan Bisnis

1. Pengajuan pembatalan hanya dapat dilakukan oleh mahasiswa dengan status pendaftaran Diterima.
2. Mahasiswa harus mengisi alasan pembatalan.
3. Pengajuan baru memiliki status Menunggu.
4. Pengajuan yang masih Menunggu tidak dapat diajukan kembali oleh mahasiswa.
5. Admin hanya dapat memproses pengajuan yang berstatus Menunggu.
6. Jika pengajuan disetujui, status pengajuan menjadi Disetujui dan status pendaftaran menjadi Dibatalkan.
7. Jika pengajuan ditolak, status pengajuan menjadi Ditolak dan status pendaftaran tetap Diterima.
8. Keputusan admin ditampilkan kepada mahasiswa.
9. Prototipe menggunakan data demo dan aturan bisnis untuk kebutuhan pengujian.

## 12. Acceptance Criteria

Produk dinyatakan memenuhi kebutuhan apabila:

1. Mahasiswa dapat login dan melihat data pendaftaran PKN.
2. Mahasiswa dapat menemukan dan menggunakan fitur pengajuan pembatalan.
3. Sistem memvalidasi alasan pembatalan.
4. Pengajuan berhasil disimpan dengan status Menunggu.
5. Mahasiswa dapat melihat status pengajuan.
6. Admin dapat melihat dan memproses pengajuan.
7. Keputusan admin memperbarui status pengajuan dengan benar.
8. Status pendaftaran berubah sesuai keputusan admin.
9. Aplikasi dapat digunakan pada desktop dan smartphone.
10. Alur utama dapat diuji secara fungsional menggunakan akun demo.

Detail acceptance criteria terdapat pada dokumen `ACCEPTANCE.md`.

## 13. Batasan dan Asumsi

1. Produk merupakan prototipe untuk keperluan pembelajaran mata kuliah Rekayasa Interaksi.
2. Sistem menggunakan akun dan data demo.
3. Backend dan database produksi tidak diwajibkan.
4. Penyimpanan lokal dapat digunakan untuk mempertahankan data selama pengujian prototipe.
5. Alur persetujuan admin merupakan asumsi desain prototipe dan bukan pernyataan mengenai kebijakan resmi kampus.
6. Pengembangan difokuskan pada permasalahan UX pengajuan pembatalan pendaftaran PKN, bukan membangun seluruh sistem SIMPKN.

## 14. Dokumen Pendukung

Dokumen berikut digunakan sebagai acuan pengembangan prototipe:

- `UX-SPEC.md` – Spesifikasi pengalaman pengguna dan struktur halaman.
- `DESIGN-SYS.md` – Sistem desain dan komponen antarmuka.
- `INTERACTION.md` – Detail alur dan perilaku interaksi.
- `ACCEPTANCE.md` – Kriteria penerimaan dan pengujian fitur.
- `AGENTS.md` – Instruksi untuk AI Coding Agent dalam mengembangkan aplikasi.
