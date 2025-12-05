# 📝 Text Encryptor Web

Sebuah aplikasi web enkripsi dan dekripsi teks yang responsif dengan antarmuka yang elegan dan tema gelap/terang.

![Preview Mode Terang](https://raw.githubusercontent.com/SendPain11/Text-Encryptor-Web/main/Light-Mode.png)
![Preview Mode Gelap](https://raw.githubusercontent.com/SendPain11/Text-Encryptor-Web/main/Dark-Mode.png)

## ✨ Fitur Utama

- 🔐 **Enkripsi & Dekripsi** - Algoritma substitusi dengan kustom key
- 🌓 **Dual Theme** - Mode terang dan gelap yang bisa di-toggle
- 📱 **Responsif** - Tampilan optimal di desktop dan mobile
- 📋 **Copy to Clipboard** - Klik hasil untuk langsung menyalin
- ⚡ **Real-time Update** - Hasil langsung terupdate saat mengetik
- 🎨 **UI Modern** - Animasi smooth dan desain yang menarik
- 💾 **Auto-save Theme** - Mengingat preferensi tema pengguna

## 🚀 Cara Menggunakan

1. **Masukkan Pesan** - Ketik atau tempel teks yang ingin dienkripsi/didekripsi
2. **Masukkan Key** - Gunakan kunci rahasia untuk proses enkripsi
3. **Pilih Aksi** - Klik "Encrypt" untuk mengenkripsi atau "Decrypt" untuk mendekripsi
4. **Salin Hasil** - Klik area hasil untuk menyalin ke clipboard

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman web
- **CSS3** - Styling dengan animasi dan gradient
- **JavaScript (ES6)** - Logika enkripsi dan interaksi
- **Font Awesome** - Ikon-ikon elegan
- **Google Fonts** - Font Roboto untuk tampilan yang bersih

## 📦 Algoritma Enkripsi

Aplikasi ini menggunakan algoritma substitusi berbasis karakter dengan formula:

```javascript
// Enkripsi: (textIndex + keyIndex) mod alphabet.length
// Dekripsi: (encryptedIndex - keyIndex + alphabet.length) mod alphabet.length
```

**Karakter yang didukung:**
- Huruf besar dan kecil (A-Z, a-z)
- Angka (0-9)
- Simbol umum (.,?!'_-&@#$%*()/:<>|+= )
- Spasi

## 🎨 Fitur Desain

### Tampilan Visual
- **Gradient Background** - Latar belakang dengan animasi floating
- **Card Design** - Container dengan efek glassmorphism
- **Button Animations** - Efek hover dan klik yang interaktif
- **Loading States** - Indikator saat memproses
- **Character Counter** - Hitung karakter real-time

### Animasi
- **Fade In/Out** - Transisi halus antar elemen
- **Pulse Effect** - Untuk tombol aktif
- **Shimmer Border** - Border dengan efek bergerak
- **Floating Elements** - Elemen latar bergerak lambat

## 📱 Responsif

Aplikasi dirancang untuk bekerja optimal di berbagai ukuran layar:

- **Desktop** (> 1024px) - Tampilan penuh dengan semua fitur
- **Tablet** (768px - 1024px) - Layout yang disesuaikan
- **Mobile** (< 768px) - Tombol toggle menjadi ikon saja, floating elements di-hide

## 🔧 Instalasi Lokal

Jika ingin menjalankan secara lokal:

```bash
# Clone repository
git clone https://github.com/SendPain11/Text-Encryptor-Web.git

# Masuk ke direktori
cd Text-Encryptor-Web

# Buka index.html di browser
# Atau gunakan live server
```

## 📁 Struktur File

```
Text-Encryptor-Web/
├── index.html          # File HTML utama
├── style.css           # Stylesheet dengan semua styling
├── index.js            # JavaScript untuk logika aplikasi
├── Light-Mode.png        # Screenshot mode terang
├── Dark-Mode.png         # Screenshot mode gelap
└── README.md           # Dokumentasi ini
```

## 🎯 Contoh Penggunaan

### Enkripsi
```
Pesan: Hello World!
Key: Secret123
Hasil: &KjqgBqurh'
```

### Dekripsi
```
Pesan: &KjqgBqurh'
Key: Secret123
Hasil: Hello World!
```

## ⚙️ Pengaturan Tema

Tema aplikasi disimpan di localStorage browser, sehingga:
- Pilihan tema akan diingat saat kunjungan berikutnya
- Default: Mode terang
- Bisa di-toggle dengan tombol di pojok kanan atas

## 🔒 Keamanan

⚠️ **Catatan Penting:**
- Aplikasi ini untuk tujuan edukasi dan demonstrasi
- **BUKAN** untuk enkripsi data sensitif yang sebenarnya
- Algoritma ini adalah substitusi sederhana
- Untuk keamanan sebenarnya, gunakan algoritma seperti AES

## 🤝 Berkontribusi

Pull request dipersilakan! Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan apa yang ingin diubah.

### Langkah Berkontribusi:
1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

[MIT License](LICENSE) - Silakan gunakan dan modifikasi sesuai kebutuhan.

## 🙏 Penghargaan

Dibuat dengan ❤️ oleh [SendPain11](https://github.com/SendPain11)

- Ikon oleh [Font Awesome](https://fontawesome.com/)
- Font oleh [Google Fonts](https://fonts.google.com/)
- Gradient inspirasi dari [uiGradients](https://uigradients.com/)

---

⭐ **Jika Anda menyukai proyek ini, jangan lupa beri star di GitHub!** ⭐