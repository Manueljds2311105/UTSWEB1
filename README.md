# UTS Pemograman Web 1

Nama: Manuel Johansen Dolok Saribu

Nim: 312410493

Kelas: Ti.24.a5

**Ringkasan:** aplikasi frontend pemesanan buku. Data dummy ada di `js/data.js`. Interaksi & logika ada di `js/script.js`. CSS di `css/style.css`. Berikut penjelasan singkat tiap file dalam paket `tugas-uts-web1`.

## Struktur (file utama)
```
tugas-uts-web1/
├─ assets/                     # aset gambar (buku.jpg)
├─ css/
│  └─ style.css                # styling global untuk semua halaman
├─ img/                        # cover gambar buku (beberapa JPG)
├─ js/
│  ├─ data.js                  # data dummy: dataPengguna, dataKatalogBuku, dataTracking
│  └─ script.js                # semua logika JS: login, render, validasi, modal, tracking
├─ login.html                  # halaman login + modal Lupa Password/Daftar
├─ dashboard.html              # menu utama + greeting berdasarkan waktu
├─ stok.html                   # tampilan katalog/stok buku + fitur tambah baris stok
├─ checkout.html               # halaman pemesanan / form checkout + ringkasan pesanan
└─ tracking.html               # halaman tracking berdasarkan Nomor Delivery Order
```

## Penjelasan singkat tiap file

### `login.html`
- Form login (email, password).
- Tombol *Login*, *Lupa Password*, *Daftar* (modal).
- Markup semantik sederhana; ada `id`/`class` yang dipakai `script.js`.

### `dashboard.html`
- Halaman menu utama dengan tombol navigasi ke katalog, tracking, laporan, history.
- Menampilkan greeting dinamis berdasarkan waktu lokal (pagi/siang/sore).

### `stok.html`
- Menampilkan tabel katalog buku yang dirender secara dinamis dari `dataKatalogBuku`.
- Form / tombol untuk menambah data buku/stok baru secara runtime (manipulasi DOM).

### `checkout.html`
- Form pemesanan: input data pemesan (nama, alamat, email, telepon) dan pembayaran.
- Menampilkan ringkasan pesanan (item, qty, subtotal, ongkir, total).
- Validasi form sebelum konfirmasi (JS).

### `tracking.html`
- Input field untuk Nomor Delivery Order (DO).
- Saat tombol *Cari* diklik: mencari data di `dataTracking` dan menampilkan:
  - Nama pemesan, status pengiriman (progress bar/tampil visual), detail ekspedisi, tanggal kirim, jenis paket, total pembayaran.

### `css/style.css`
- Styling global: layout (flex/grid), form, tabel, tombol, modal, progress bar, responsivitas.
- Aturan kelas untuk modal dan custom-alert.

### `js/data.js`
- **Variabel utama:**
  - `dataPengguna` — array objek user (id, nama, email, password, role). Digunakan untuk validasi login/testing.
  - `dataKatalogBuku` — array objek buku (kodeBarang, namaBarang, penulis/jenis, edisi, stok, harga, cover).
  - `dataTracking` — objek/array yang menyimpan entri pengiriman (noDO, namaPemesan, status, timeline, detail ekspedisi, total).
- Data bersifat statis (dummy) untuk keperluan front-end demo.

### `js/script.js`
- **Fungsi / fitur utama (ringkas):**
  - **Login**: menangani `submit` form `loginForm`, validasi non-empty, cari kecocokan di `dataPengguna`. Jika benar → simpan session sederhana (sessionStorage) dan redirect; jika salah → tampilkan alert.
  - **Modal**: logika open/close modal untuk *Lupa Password* dan *Daftar* (manipulasi style/class).
  - **Greeting**: fungsi membaca `new Date().getHours()` lalu set teks greeting di dashboard.
  - **Render Katalog**: fungsi yang merender baris tabel dari `dataKatalogBuku` menggunakan `forEach` dan `document.createElement`.
  - **Tambah Buku / Tambah Baris**: handler yang membuat objek buku baru berdasarkan input dan menambahkan ke DOM (push ke array runtime + re-render).
  - **Checkout**: validasi field (required, email format), hitung subtotal/total, tampilkan ringkasan, konfirmasi.
  - **Tracking**: fungsi yang `find()` entry pada `dataTracking` berdasarkan nomor DO, lalu render detail + timeline + progress visual.
  - **Utility**: `formatRupiah()` (format mata uang), `validateEmail()` (regex), `showAlert()` (custom modal alert), dan pencegahan klik di luar modal untuk menutup.
  - **Console helper**: mencetak kredensial testing ke console untuk memudahkan demo.
  - **Prevent back after logout**: beberapa baris menonaktifkan back button behavior sederhana setelah logout/di index.

## Catatan singkat penggunaan
- Aplikasi ini _statik_ — tidak memanggil server. Cukup buka `login.html` di browser.
- Untuk melihat data yang dipakai, buka `js/data.js`.
- Untuk melihat logika interaktif dan event handlers, buka `js/script.js` (cari `addEventListener`).
