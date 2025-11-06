# README — Tugas UTS Pemrograman Web 1

Dokumentasi ini menjelaskan struktur proyek, fungsi file, dan penjelasan fungsi kode utama yang ada di paket `tugas-uts-web1.zip`.

> **Catatan:** proyek ini adalah aplikasi frontend sederhana (tanpa backend). Data disimpan sebagai variabel JavaScript pada `js/data.js` dalam bentuk array JSON.

---

## Daftar berkas & folder

```
tugas-uts-web1/
├─ assets/ (gambar default)
├─ css/
│  └─ style.css         # gaya global (layout, navbar, tabel, form, progress bar)
├─ img/                 # koleksi gambar sampel buku
├─ js/
│  ├─ data.js           # data dummy: dataPengguna, dataKatalogBuku, dataTracking
│  └─ script.js         # semua logika interaktif (login, render, validation, dll)
├─ login.html
├─ dashboard.html
├─ stok.html
├─ checkout.html
└─ tracking.html
```

---

## Tujuan masing‑masing file

- **`js/data.js`**
  - Menyediakan data dummy yang dipakai seluruh aplikasi.
  - Variabel utama:
    - `dataPengguna` — daftar pengguna (id, nama, email, password, role).
    - `dataKatalogBuku` — katalog buku (id, judul, penulis, harga, stok, gambar, dsb.).
    - `dataTracking` — data pengiriman (nomor DO, nama pemesan, status, detail timeline).

- **`js/script.js`**
  - Berisi semua fungsi JavaScript untuk interaksi UI dan manipulasi DOM.
  - Fitur utama yang diimplementasikan:
    - **Login** — validasi input, cek kredensial terhadap `dataPengguna`, tampilkan pesan error (alert) jika salah, redirect ke `dashboard.html` jika berhasil.
    - **Modal** — logika menampilkan/menutup modal untuk *Lupa Password* dan *Daftar*.
    - **Greeting berdasarkan waktu** — fungsi untuk membaca waktu lokal dan menampilkan salam (Pagi/Siang/Sore) di dashboard.
    - **Render katalog/stok** — fungsi untuk membangun tabel/list katalog dari `dataKatalogBuku` secara dinamis dengan DOM (menggunakan loop seperti `forEach`).
    - **Menambah stok/buku baru** — form untuk menambah baris buku baru yang memodifikasi struktur DOM tanpa reload.
    - **Halaman checkout** — validasi form pemesanan (nama, alamat, email, metode pembayaran), menampilkan ringkasan pesanan sebelum konfirmasi.
    - **Tracking** — pencarian berdasarkan nomor delivery order yang mengambil data dari `dataTracking` dan menampilkan status, detail ekspedisi, tanggal kirim, jenis paket, dan total.
    - **Utility functions** — mis. `formatRupiah()` untuk format mata uang, `validateEmail()` untuk cek format email, `showAlert()` untuk konsisten menampilkan pesan error/konfirmasi.
    - **Behavior tambahan** — mencegah kembali (prevent back) setelah logout, menulis kredensial testing ke console untuk kemudahan cek.

- **`css/style.css`**
  - Mengatur tampilan form, tabel, navbar, tombol, modal, dan progress bar.
  - Menggunakan layout responsif (Flexbox/Grid) agar halaman tampil baik di berbagai ukuran layar.

- **`*.html` (login, dashboard, stok, checkout, tracking)**
  - Setiap file HTML berisi markup semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<form>`, `<table>`) dan elemen dengan `id`/`class` yang digunakan oleh `script.js`.

---

## Penjelasan fungsi kode utama (level per‑fungsi)

> Di bawah ini adalah ringkasan fungsi dan alur berpikir ketika menulis fitur — berguna untuk README dan/atau narasi video.

### 1. Login (di `script.js`)
- **Alur**:
  1. Tangkap event `submit` pada form dengan `id="loginForm"`.
  2. Ambil value `email` dan `password`, lakukan `trim()` dan cek tidak kosong.
  3. Bandingkan terhadap `dataPengguna` (loop/`find`) untuk validasi kredensial.
  4. Jika cocok → simpan state login (mis. ke `sessionStorage`) dan `window.location` ke `dashboard.html`.
  5. Jika tidak cocok → `alert('Email/password yang anda masukkan salah!')` atau panggil `showAlert()`.

- **Alasan desain**: Validasi sisi klien cukup untuk tugas front-end. Menyimpan session sederhana memudahkan demo tanpa server.

### 2. Modal (Lupa Password & Daftar)
- **Alur**:
  - Tombol pemicu punya `data-target` atau `id` yang kemudian men-set class aktif pada elemen modal.
  - Tombol tutup akan menghapus class aktif sehingga modal disembunyikan.
- **Alasan**: Modal dibuat menggunakan manipulasi kelas CSS sehingga tidak perlu library eksternal.

### 3. Greeting waktu (Dashboard)
- **Fungsi**: Membaca `new Date()` → ambil `hours` → tentukan string `Selamat Pagi/Siang/Sore` → masukkan ke elemen DOM.
- **Alasan**: Menambah personalisasi UI dan menunjukkan penggunaan Date API.

### 4. Render Katalog / Stok (Stok.html)
- **Alur**:
  1. Ambil elemen tabel/body tempat menaruh baris.
  2. Loop `dataKatalogBuku.forEach(book => {...})` dan buat elemen `<tr>` / `<td>` menggunakan `document.createElement()`.
  3. Sisipkan gambar, judul, penulis, harga (formatRupiah), dan stok.
  4. Tambahkan juga tombol aksi (edit/hapus) jika diinginkan.
- **Menambah buku**: Form input memicu fungsi yang men-generate objek buku baru dan `push()` ke `dataKatalogBuku` (saat runtime), lalu re-render tabel.

### 5. Checkout (checkout.html)
- **Alur**:
  - Menangani input pemesan & metode pembayaran.
  - Validasi: cek field required, format email & nomor telepon.
  - Tampilkan ringkasan (nama buku, qty, subtotal, ongkir, total) — gunakan `formatRupiah()`.
  - Konfirmasi simpan: bisa berupa alert/ modal sukses.

### 6. Tracking (tracking.html)
- **Alur**:
  - Ambil input nomor DO.
  - Cari di `dataTracking` (mis. `find(entry => entry.noDO === input)`).
  - Jika ditemukan → render detail: nama pemesan, progress/status pengiriman (bisa berupa `progress` element atau bar CSS), daftar timeline event.
  - Jika tidak ditemukan → tampilkan pesan "Nomor Delivery Order tidak ditemukan."

### 7. Utility functions
- `showAlert(message)` — standar menampilkan pesan ke user (bisa via `alert()` atau elemen notifikasi di DOM).
- `formatRupiah(number)` — format angka ke tampilan rupiah (menambahkan `.` sebagai pemisah ribuan dan prefix `Rp`).
- `validateEmail(email)` — regex sederhana memastikan input mirip alamat email.

---

## Tips pembacaan kode (bagian yang patut diperhatikan saat review)

1. **Cari `id`/`class` di HTML** — pelajari bagaimana `script.js` memilih elemen (misal: `document.getElementById('catalogTable')`).
2. **Baca `data.js`** untuk memahami struktur data yang dipakai (field apa saja tiap buku atau tracking entry).
3. **Ikuti alur event** — temukan `addEventListener` pada tombol-tombol utama: login submit, tambah buku, cari tracking, confirm checkout.
4. **Perhatikan modularitas** — `script.js` mengandung fungsi-fungsi utilitas yang bisa dipisah jika dikembangkan.

---

## Saran pengembangan lanjutan

- Simpan data persistent menggunakan `localStorage` agar perubahan (menambah buku, data checkout) tersimpan antar reload.
- Pisahkan `script.js` menjadi beberapa modul: `auth.js`, `catalog.js`, `checkout.js`, `tracking.js` untuk maintainability.
- Tambahkan validasi lebih ketat dan UI feedback non-blocking (toasts atau inline messages) alih-alih `alert()`.
- Buat tampilan mobile-first dan uji pada beberapa resolusi.

---

## Cara menjalankan (untuk dosen / penguji)

1. Ekstrak folder `tugas-uts-web1`.
2. Buka `login.html` di browser (cukup double-click, tidak perlu server karena semua file statis).
3. Gunakan kredensial testing (tersedia di `script.js` console log) atau lihat `data.js` untuk daftar akun.

---

Jika Anda ingin, saya dapat:
- Membuat versi `README.md` yang lebih teknis dengan potongan kode (contoh fungsi utama), atau
- Membuat skrip narasi video singkat berdasarkan README untuk durasi ≤10 menit.

Terima kasih! 🌟

