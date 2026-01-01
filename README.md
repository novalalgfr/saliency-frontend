# SalientVision - Frontend

Web interface untuk sistem **Salient Object Detection** dan **Visual Attention Heatmap Generation**. Aplikasi ini dirancang untuk memvisualisasikan fokus atensi visual pada citra digital menggunakan pendekatan Deep Learning (U-Net).

## 🧠 Tech Stack

-   **Framework:** Next.js 16 (App Router)
-   **Styling:** Tailwind CSS
-   **Animation:** Framer Motion
-   **Icons:** Lucide React
-   **Library Pendukung:** react-dropzone, react-webcam, clsx, tailwind-merge

## 📂 Struktur Folder

```text
frontend/
├── app/                  # App Router (Pages, Layout, Globals CSS)
├── components/           # Komponen Modular
│   ├── home/             # Hero Section
│   ├── input/            # InputArea (Logika Upload & Kamera)
│   └── layout/           # Navbar & Footer
├── public/               # Aset statis
└── tailwind.config.ts    # Konfigurasi Tema
```

## 🚀 Cara Menjalankan (Local)

Pastikan Node.js sudah terinstal di komputer Anda (versi 18+ direkomendasikan).

### 1. Clone Repository

```bash
git clone https://github.com/username/project-name.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

Atau gunakan package manager lain:

```bash
yarn install
# atau
pnpm install
```

### 3. Jalankan Server Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

## ✨ Fitur Utama

-   **Dual Input Mode:** Upload file (Drag & Drop) dan pengambilan gambar via Webcam
-   **Smart Validation:** Validasi format gambar (JPG/PNG) dan ukuran file (Max 5MB)
-   **Interactive UI:** Transisi halus dengan Framer Motion
-   **Visual Feedback:** Notifikasi toast untuk penanganan error
-   **Responsive Preview:** Tampilan pratinjau yang menyesuaikan rasio asli citra

## 📝 Lisensi

Project ini dikembangkan untuk keperluan edukasi dan penelitian.

---

**© 2026 SalientVision**
