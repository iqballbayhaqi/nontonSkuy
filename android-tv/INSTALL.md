# Panduan Install nontonSkuy di Android TV / Google TV

## Daftar Isi
- [Persiapan](#persiapan)
- [Cara 1: ADB via WiFi (Satu Jaringan)](#cara-1-adb-via-wifi-satu-jaringan)
- [Cara 2: ADB via USB](#cara-2-adb-via-usb)
- [Cara 3: USB Flash Drive](#cara-3-usb-flash-drive)
- [Cara 4: Download Langsung di TV](#cara-4-download-langsung-di-tv)
- [Setelah Install](#setelah-install)
- [Troubleshooting](#troubleshooting)

---

## Persiapan

### Aktifkan Developer Mode di TV
1. Buka **Settings**
2. Scroll ke **About** (atau **Device Preferences → About**)
3. Pilih **Build** → tekan **OK / Enter 7 kali** berturut-turut
4. Muncul notifikasi *"You are now a developer"*
5. Kembali ke **Settings → Developer Options**
6. Aktifkan **USB Debugging** dan **ADB Debugging**

### Aktifkan Install dari Sumber Tidak Dikenal
1. Buka **Settings → Device Preferences → Security & Restrictions**
2. Aktifkan **Unknown Sources** (atau izinkan per aplikasi)

---

## Cara 1: ADB via WiFi (Satu Jaringan)

> Laptop/PC dan TV harus terhubung ke WiFi yang sama.

### Langkah 1 — Cari IP TV
- **Google TV:** Settings → Network & Internet → klik nama WiFi → lihat **IP address**
- **Android TV:** Settings → About → Status → **IP address**
- Atau cek di router: login ke `http://192.168.1.1` → Connected Devices

### Langkah 2 — Konek ADB
```bash
adb connect <IP_TV>
# contoh: adb connect 192.168.1.105
```

Jika muncul prompt di TV, pilih **Allow**.

### Langkah 3 — Install APK
```bash
adb install "D:\workspace\nontonSkuy\android-tv\app\build\outputs\apk\release\app-release.apk"
```

### Langkah 4 — Verifikasi
```bash
adb devices
# TV harus muncul sebagai "device"
```

---

## Cara 2: ADB via USB

> Gunakan jika TV tidak terhubung ke WiFi yang sama dengan PC.

### Langkah 1 — Siapkan Kabel
- Gunakan kabel USB-A ke USB-A (atau sesuai port TV)
- Colok dari TV ke laptop/PC

### Langkah 2 — Cek Device Terdeteksi
```bash
adb devices
# Harus muncul serial number TV
```

Jika ada prompt di TV, pilih **Allow**.

### Langkah 3 — Install APK
```bash
adb install "D:\workspace\nontonSkuy\android-tv\app\build\outputs\apk\release\app-release.apk"
```

---

## Cara 3: USB Flash Drive

> Cara termudah, tidak perlu PC/laptop terhubung ke TV.

### Langkah 1 — Siapkan Flash Drive
1. Format flash drive ke **FAT32**
2. Copy file APK ke flash drive:
   ```
   app-release.apk
   ```

### Langkah 2 — Install File Manager di TV
Buka **Play Store** di TV dan install salah satu:
- **Cx File Explorer**
- **X-plore File Manager**
- **FX File Explorer**

### Langkah 3 — Install APK
1. Colok flash drive ke port USB TV
2. Buka aplikasi file manager
3. Navigasi ke flash drive
4. Tap / klik file `app-release.apk`
5. Pilih **Install**
6. Jika diminta izin Unknown Sources → **Allow** → lanjut install

---

## Cara 4: Download Langsung di TV

> Gunakan jika tidak punya flash drive dan TV tidak satu jaringan dengan PC.

### Langkah 1 — Upload APK ke Cloud
Upload file `app-release.apk` ke salah satu:
- **Google Drive** → klik kanan → Get shareable link
- **Telegram** → kirim ke Saved Messages → copy link
- **GitHub Releases** → upload sebagai release asset

### Langkah 2 — Install Downloader di TV
1. Buka **Play Store** di TV
2. Cari dan install **Downloader by AFTVnews**

### Langkah 3 — Download & Install
1. Buka **Downloader**
2. Masukkan link download APK
3. Tunggu download selesai
4. Tap **Install**

### Alternatif — via Browser TV
1. Buka browser bawaan TV
2. Akses link download APK
3. Download → Install

---

## Setelah Install

Aplikasi **nontonSkuy** akan muncul di:
- **Home screen TV** (di bagian Apps)
- **App Drawer**

### Navigasi Remote
| Tombol | Fungsi |
|--------|--------|
| D-pad (↑↓←→) | Navigasi antar elemen |
| OK / Enter | Klik / pilih |
| Back | Kembali halaman sebelumnya |
| Home | Keluar ke home TV |

---

## Troubleshooting

### APK tidak bisa diinstall
- Pastikan **Unknown Sources** sudah diaktifkan
- Coba uninstall versi lama dulu: `adb uninstall com.nontonskuy.tv`

### ADB tidak terdeteksi
```bash
# Restart ADB server
adb kill-server
adb start-server
adb devices
```

### TV tidak muncul di `adb devices`
- Pastikan ADB Debugging aktif di TV
- Pastikan satu jaringan WiFi
- Coba ping IP TV dulu: `ping <IP_TV>`
- Coba port 5555 secara eksplisit: `adb connect <IP_TV>:5555`

### Aplikasi crash saat dibuka
- Pastikan TV terhubung ke internet
- Cek koneksi ke `https://movie.balee.web.id` via browser TV

### Video tidak bisa diputar
- Pastikan koneksi internet stabil (minimal 5 Mbps untuk streaming)
- Coba ganti server streaming di halaman detail film

---

## Info Aplikasi

| Item | Detail |
|------|--------|
| Package | `com.nontonskuy.tv` |
| Min Android | 5.0 (API 21) |
| Target | Android TV / Google TV |
| URL | https://movie.balee.web.id |
| Ukuran APK | ~700KB |
