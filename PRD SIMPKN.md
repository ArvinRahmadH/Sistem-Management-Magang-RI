# **PRODUCT REQUIREMENTS DOCUMENT (PRD)**

## **SIMPKN – Fitur Pengajuan Pembatalan Pendaftaran PKN**

**Versi:** 1.0  
**Platform:** Responsive Web Application  
**Dokumen:** Product Requirements Document  
**Status:** Draft untuk pengembangan menggunakan Antigravity

---

## **1\. Ringkasan Produk**

SIMPKN merupakan sistem informasi yang digunakan mahasiswa untuk mengelola proses pendaftaran dan kegiatan Praktik Kerja Nyata (PKN).

Berdasarkan hasil observasi dan kuesioner terhadap lima responden pengguna SIMPKN, ditemukan bahwa mahasiswa belum mendapatkan informasi atau mekanisme yang jelas untuk mengajukan pembatalan atau pengunduran diri setelah pendaftaran PKN berstatus diterima.

Saat mahasiswa mengalami perubahan rencana, mahasiswa cenderung mencari informasi melalui buku panduan, menu website, atau menghubungi admin secara langsung.

Produk yang dikembangkan adalah prototipe sistem SIMPKN yang berfokus pada penambahan fitur **Pengajuan Pembatalan Pendaftaran PKN**.

Fitur ini memungkinkan mahasiswa mengajukan permohonan pembatalan melalui sistem, memberikan alasan pembatalan, melihat status pengajuan, serta memperoleh informasi mengenai hasil pengajuan.

Pengajuan pembatalan tidak langsung membatalkan pendaftaran secara otomatis. Pengajuan perlu ditinjau dan diproses oleh admin atau pihak yang berwenang.

## **2\. Latar Belakang dan Permasalahan**

Permasalahan utama yang ditemukan:

1. Mahasiswa tidak menemukan informasi yang jelas mengenai prosedur pembatalan pendaftaran PKN setelah status diterima.  
2. Halaman Data Pendaftaran hanya menampilkan informasi pendaftaran dan tombol Detail, tanpa informasi pembatalan yang mudah ditemukan.  
3. Mahasiswa tidak mengetahui tindakan yang harus dilakukan apabila ingin mengundurkan diri atau mengubah rencana setelah pendaftaran diterima.  
4. Mahasiswa harus mencari informasi melalui buku panduan atau menghubungi admin.  
5. Terdapat ketidaksesuaian informasi antara buku panduan, sosialisasi, dan tampilan website yang membuat pengguna semakin bingung.

### **Problem Statement**

Mahasiswa membutuhkan informasi dan mekanisme yang jelas untuk mengajukan pembatalan atau pengunduran diri dari pendaftaran PKN setelah status pendaftaran diterima, karena pada halaman Data Pendaftaran belum tersedia informasi atau alur pengajuan pembatalan yang mudah dipahami.

## **3\. Tujuan Produk**

Tujuan pengembangan sistem:

* Menyediakan fitur pengajuan pembatalan pendaftaran PKN yang mudah ditemukan.  
* Membantu mahasiswa memahami prosedur pembatalan pendaftaran.  
* Memungkinkan mahasiswa menyampaikan alasan pembatalan melalui sistem.  
* Menampilkan status pengajuan pembatalan secara transparan.  
* Mengurangi kebingungan mahasiswa dalam mencari prosedur pembatalan.  
* Membantu admin mengelola dan meninjau permohonan pembatalan.

### **Indikator Keberhasilan**

Produk dianggap berhasil apabila:

* Mahasiswa dapat menemukan fitur pengajuan pembatalan dari halaman Data Pendaftaran.  
* Mahasiswa dapat mengirim pengajuan dengan mengisi alasan pembatalan.  
* Sistem menampilkan konfirmasi setelah pengajuan berhasil dikirim.  
* Mahasiswa dapat melihat status pengajuan.  
* Admin dapat melihat dan memproses pengajuan.  
* Pengajuan tidak langsung membatalkan pendaftaran sebelum ditinjau admin.

## **4\. Target Pengguna**

### **4.1 Mahasiswa**

Mahasiswa yang telah mendaftar PKN melalui SIMPKN dan ingin mengajukan pembatalan atau pengunduran diri.

Kebutuhan mahasiswa:

* Mengetahui apakah pendaftaran dapat diajukan pembatalan.  
* Mengetahui prosedur pengajuan.  
* Mengirim permohonan pembatalan.  
* Menyampaikan alasan pembatalan.  
* Melihat status dan hasil pengajuan.

### **4.2 Admin PKN**

Admin yang bertugas memeriksa dan memproses permohonan pembatalan pendaftaran PKN.

Kebutuhan admin:

* Melihat daftar pengajuan pembatalan.  
* Melihat detail pengajuan dan alasan mahasiswa.  
* Menyetujui atau menolak pengajuan.  
* Memberikan catatan atau keterangan keputusan.  
* Memperbarui status pengajuan.

## **5\. Ruang Lingkup Produk**

### **5.1 In Scope**

Fitur yang harus dikembangkan:

1. Halaman Data Pendaftaran PKN.  
2. Informasi prosedur pembatalan pendaftaran.  
3. Tombol Ajukan Pembatalan Pendaftaran.  
4. Formulir pengajuan pembatalan.  
5. Konfirmasi pengajuan.  
6. Halaman atau bagian Status Pengajuan Pembatalan.  
7. Detail pengajuan pembatalan.  
8. Halaman admin untuk melihat pengajuan.  
9. Fitur admin menyetujui atau menolak pengajuan.  
10. Catatan atau alasan keputusan admin.  
11. Notifikasi atau informasi hasil pengajuan.

### **5.2 Out of Scope**

Fitur berikut tidak termasuk dalam pengembangan:

* Seluruh fitur SIMPKN secara lengkap.  
* Pengelolaan kegiatan PKN harian.  
* Pengajuan penilaian dosen pembimbing.  
* Pengelolaan laporan akhir PKN.  
* Integrasi dengan sistem akademik universitas.  
* Integrasi dengan sistem autentikasi SIMPKN asli.  
* Pengiriman email atau WhatsApp otomatis, kecuali diperlukan dan disepakati pada tahap pengembangan berikutnya.

## **6\. User Flow**

### **6.1 Alur Mahasiswa**

1. Mahasiswa membuka sistem SIMPKN.  
2. Mahasiswa masuk ke halaman Data Pendaftaran.  
3. Mahasiswa melihat informasi pendaftaran PKN.  
4. Jika status pendaftaran sudah diterima, sistem menampilkan informasi mengenai prosedur pembatalan.  
5. Mahasiswa memilih tombol Ajukan Pembatalan Pendaftaran.  
6. Sistem menampilkan formulir pengajuan.  
7. Mahasiswa mengisi alasan pembatalan.  
8. Mahasiswa membaca informasi bahwa pengajuan akan ditinjau admin.  
9. Mahasiswa menekan tombol Kirim Pengajuan.  
10. Sistem menampilkan konfirmasi bahwa pengajuan berhasil dikirim.  
11. Mahasiswa dapat melihat status pengajuan pada halaman Data Pendaftaran atau Detail Pengajuan.

### **6.2 Alur Admin**

1. Admin membuka halaman pengelolaan pengajuan pembatalan.  
2. Admin melihat daftar pengajuan mahasiswa.  
3. Admin memilih salah satu pengajuan.  
4. Sistem menampilkan detail data pendaftaran dan alasan pembatalan.  
5. Admin memilih tindakan Setujui atau Tolak.  
6. Admin dapat menambahkan catatan keputusan.  
7. Admin mengonfirmasi keputusan.  
8. Sistem memperbarui status pengajuan.  
9. Mahasiswa dapat melihat hasil pengajuan melalui sistem.

## **7\. Functional Requirements**

### **FR-01: Menampilkan Informasi Pembatalan**

Sistem harus menampilkan informasi mengenai prosedur pengajuan pembatalan pendaftaran PKN pada halaman Data Pendaftaran.

Informasi minimal:

* Pengajuan pembatalan harus melalui sistem.  
* Pengajuan akan ditinjau admin.  
* Pendaftaran tidak langsung dibatalkan setelah pengajuan dikirim.  
* Mahasiswa dapat melihat status pengajuan.

### **FR-02: Menampilkan Tombol Pengajuan Pembatalan**

Sistem harus menyediakan tombol **Ajukan Pembatalan Pendaftaran** pada halaman Data Pendaftaran.

Tombol hanya ditampilkan apabila pendaftaran berada pada status yang memungkinkan pengajuan pembatalan.

Untuk prototipe ini, tombol tersedia ketika status pendaftaran adalah Diterima.

### **FR-03: Formulir Pengajuan Pembatalan**

Formulir harus memiliki:

* Nama mahasiswa.  
* NIM.  
* Nama instansi tempat PKN.  
* Periode PKN.  
* Alasan pembatalan.  
* Tombol Kirim Pengajuan.  
* Tombol Kembali atau Batal.

Data mahasiswa dan pendaftaran ditampilkan secara otomatis dan tidak perlu diisi ulang.

Alasan pembatalan wajib diisi oleh mahasiswa.

### **FR-04: Konfirmasi Pengajuan**

Sebelum pengajuan dikirim, sistem harus menampilkan konfirmasi yang menjelaskan bahwa:

* Pengajuan akan dikirim kepada admin.  
* Pengajuan belum berarti pendaftaran langsung dibatalkan.  
* Mahasiswa perlu menunggu hasil pemeriksaan admin.

Setelah berhasil dikirim, sistem menampilkan pesan:

“Pengajuan pembatalan berhasil dikirim. Silakan menunggu proses pemeriksaan oleh admin.”

### **FR-05: Status Pengajuan**

Sistem harus menyediakan status pengajuan berikut:

* Menunggu: pengajuan telah dikirim dan belum diproses admin.  
* Disetujui: admin menyetujui permohonan pembatalan.  
* Ditolak: admin menolak permohonan pembatalan.

Status pengajuan harus ditampilkan secara jelas pada halaman Data Pendaftaran dan Detail Pengajuan.

### **FR-06: Detail Pengajuan**

Mahasiswa dapat melihat:

* Tanggal pengajuan.  
* Alasan pembatalan.  
* Status pengajuan.  
* Catatan admin.  
* Tanggal keputusan, jika sudah diproses.

### **FR-07: Pengelolaan Pengajuan oleh Admin**

Admin dapat:

* Melihat daftar pengajuan.  
* Melihat detail pengajuan.  
* Menyetujui pengajuan.  
* Menolak pengajuan.  
* Menambahkan catatan keputusan.

Admin harus melakukan konfirmasi sebelum keputusan disimpan.

### **FR-08: Pembaruan Status Pendaftaran**

Apabila pengajuan disetujui, sistem prototipe harus menampilkan status pendaftaran sebagai Dibatalkan.

Apabila pengajuan ditolak, status pendaftaran tetap Diterima.

Status pengajuan pembatalan dan status pendaftaran harus dibedakan agar pengguna tidak salah memahami proses.

## **8\. Business Rules**

1. Mahasiswa hanya dapat mengajukan pembatalan apabila status pendaftaran adalah Diterima.  
2. Mahasiswa tidak dapat mengirim pengajuan pembatalan berulang ketika masih terdapat pengajuan berstatus Menunggu.  
3. Mahasiswa wajib mengisi alasan pembatalan.  
4. Pengajuan yang sudah dikirim tidak langsung membatalkan pendaftaran.  
5. Admin merupakan pihak yang memproses keputusan pengajuan.  
6. Jika pengajuan disetujui, status pendaftaran berubah menjadi Dibatalkan.  
7. Jika pengajuan ditolak, status pendaftaran tetap Diterima.  
8. Sistem harus menyimpan riwayat status dan keputusan pengajuan.  
9. Pengajuan yang sudah diproses tidak dapat diubah oleh mahasiswa.  
10. Jika pengajuan ditolak, sistem menampilkan catatan admin apabila tersedia.

## **9\. Non-Functional Requirements**

### **NFR-01: Usability**

Antarmuka harus mudah dipahami oleh mahasiswa yang belum pernah menggunakan fitur pembatalan.

Gunakan bahasa Indonesia yang sederhana dan hindari istilah teknis yang membingungkan.

### **NFR-02: Responsive Design**

Sistem harus dapat digunakan melalui:

* Desktop atau laptop.  
* Tablet.  
* Smartphone.

### **NFR-03: Consistency**

Tampilan tombol, status, formulir, dan pesan sistem harus konsisten pada seluruh halaman.

### **NFR-04: Feedback**

Setiap tindakan penting harus memberikan umpan balik, seperti:

* Pengajuan berhasil dikirim.  
* Formulir belum lengkap.  
* Pengajuan sedang menunggu pemeriksaan.  
* Pengajuan disetujui atau ditolak.

### **NFR-05: Data Integrity**

Sistem harus menjaga agar data pengajuan tidak hilang ketika status berubah dan memastikan keputusan admin tercatat.

## **10\. Data Model**

### **Student**

* student\_id  
* name  
* nim

### **Registration**

* registration\_id  
* student\_id  
* institution\_name  
* internship\_period  
* registration\_status

### **CancellationRequest**

* request\_id  
* registration\_id  
* student\_id  
* reason  
* request\_status  
* admin\_note  
* submitted\_at  
* reviewed\_at  
* reviewed\_by

Contoh nilai request\_status:

* pending  
* approved  
* rejected

Contoh nilai registration\_status:

* accepted  
* cancelled

## **11\. UI Requirements**

### **Screen 1: Data Pendaftaran**

Menampilkan informasi pendaftaran mahasiswa.

Komponen:

* Nama mahasiswa.  
* NIM.  
* Nama instansi.  
* Periode PKN.  
* Status pendaftaran.  
* Tombol Detail.  
* Informasi prosedur pembatalan.  
* Tombol Ajukan Pembatalan Pendaftaran.

### **Screen 2: Form Pengajuan Pembatalan**

Komponen:

* Ringkasan data pendaftaran.  
* Text area alasan pembatalan.  
* Informasi proses pengajuan.  
* Tombol Kirim Pengajuan.  
* Tombol Kembali.

### **Screen 3: Konfirmasi Pengajuan**

Menampilkan:

* Pesan pengajuan berhasil.  
* Nomor atau identitas pengajuan.  
* Status Menunggu.  
* Tombol Lihat Status Pengajuan.

### **Screen 4: Detail Pengajuan**

Menampilkan:

* Data pendaftaran.  
* Alasan pembatalan.  
* Tanggal pengajuan.  
* Status pengajuan.  
* Catatan admin.  
* Tanggal keputusan.

### **Screen 5: Admin – Daftar Pengajuan**

Menampilkan tabel pengajuan dengan kolom:

* NIM.  
* Nama mahasiswa.  
* Instansi.  
* Tanggal pengajuan.  
* Status.  
* Aksi Detail.

### **Screen 6: Admin – Detail Pengajuan**

Menampilkan:

* Data mahasiswa.  
* Data pendaftaran.  
* Alasan pembatalan.  
* Status pengajuan.  
* Input catatan admin.  
* Tombol Setujui.  
* Tombol Tolak.

## **12\. Acceptance Criteria**

Fitur dinyatakan selesai apabila:

1. Mahasiswa dapat membuka halaman Data Pendaftaran.  
2. Mahasiswa dengan status Diterima dapat melihat tombol Ajukan Pembatalan Pendaftaran.  
3. Mahasiswa dapat membuka formulir pengajuan.  
4. Sistem menolak pengajuan apabila alasan pembatalan kosong.  
5. Mahasiswa dapat mengirim pengajuan pembatalan.  
6. Sistem menampilkan pesan sukses setelah pengajuan dikirim.  
7. Status pengajuan berubah menjadi Menunggu.  
8. Mahasiswa tidak dapat mengirim pengajuan kedua ketika pengajuan sebelumnya masih Menunggu.  
9. Admin dapat melihat pengajuan mahasiswa.  
10. Admin dapat menyetujui atau menolak pengajuan.  
11. Status pengajuan diperbarui setelah admin memprosesnya.  
12. Jika disetujui, status pendaftaran berubah menjadi Dibatalkan.  
13. Jika ditolak, status pendaftaran tetap Diterima.  
14. Mahasiswa dapat melihat hasil keputusan admin.  
15. Sistem dapat digunakan pada desktop dan smartphone.

## **13\. Development Instructions for Antigravity**

Berdasarkan PRD ini, bangun sebuah responsive web application berupa prototipe SIMPKN dengan fokus pada fitur Pengajuan Pembatalan Pendaftaran PKN.

Instruksi pengembangan:

1. Jika tersedia repository atau project code yang sudah ada, periksa struktur project terlebih dahulu sebelum melakukan perubahan.  
2. Jangan menghapus atau merusak fitur yang sudah ada.  
3. Jika tidak tersedia project code, buat project baru dengan struktur yang sederhana dan mudah dikembangkan.  
4. Gunakan bahasa Indonesia untuk seluruh label, tombol, pesan, dan konten antarmuka.  
5. Buat antarmuka yang rapi, sederhana, profesional, dan sesuai konteks sistem akademik.  
6. Prioritaskan pengalaman pengguna mahasiswa.  
7. Implementasikan alur mahasiswa dan admin sesuai PRD.  
8. Gunakan data dummy apabila backend atau database asli belum tersedia.  
9. Jika menggunakan data dummy, pastikan interaksi tetap berfungsi dan perubahan status dapat terlihat.  
10. Jangan mengimplementasikan pembatalan otomatis tanpa persetujuan admin.  
11. Pastikan setiap tombol memiliki fungsi yang sesuai.  
12. Jangan membuat fitur di luar ruang lingkup PRD tanpa alasan yang jelas.  
13. Setelah implementasi, lakukan pengujian terhadap acceptance criteria.  
14. Perbaiki error yang ditemukan dan berikan ringkasan fitur yang telah dibuat.

## **14\. Assumptions and Open Questions**

Hal-hal berikut masih perlu dikonfirmasi kepada pihak pengelola SIMPKN:

* Apakah mahasiswa memang diperbolehkan mengajukan pembatalan setelah status diterima?  
* Siapa pihak yang berwenang menyetujui atau menolak pembatalan?  
* Apakah status pendaftaran benar-benar harus berubah menjadi Dibatalkan setelah pengajuan disetujui?  
* Apakah mahasiswa perlu mengunggah dokumen pendukung?  
* Apakah pengajuan dapat dibatalkan kembali oleh mahasiswa sebelum diproses admin?

Untuk pengembangan prototipe, gunakan aturan yang sudah dijelaskan pada PRD ini. Jangan menganggap aturan prototipe sebagai kebijakan resmi SIMPKN sebelum dikonfirmasi.

---

**End of PRD**

