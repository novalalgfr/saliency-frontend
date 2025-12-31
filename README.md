# SalientVision - Frontend

Web interface modern untuk sistem **Salient Object Detection** dan **Visual Attention Heatmap Generation**. Aplikasi ini dirancang untuk memvisualisasikan fokus atensi visual pada citra digital menggunakan pendekatan Deep Learning (U-Net).

Dibangun menggunakan **Next.js 16** dengan antarmuka bertema "Elegant Dark".

## 🚀 Fitur Utama

-   **Dual Input Mode:** Mendukung upload file (_Drag & Drop_) dan pengambilan gambar langsung via Webcam.
-   **Smart Validation:** Validasi otomatis format gambar (JPG/PNG) dan pembatasan ukuran file (Max 5MB).
-   **Interactive UI:** Transisi halus dan animasi menggunakan **Framer Motion**.
-   **Visual Feedback:** Notifikasi _popup_ (toast) elegan untuk penanganan error.
-   **Responsive Preview:** Tampilan pratinjau gambar yang menyesuaikan rasio asli citra tanpa terpotong.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animation:** Framer Motion
-   **Icons:** Lucide React
-   **Library Pendukung:**
    -   `react-dropzone` (File handling)
    -   `react-webcam` (Camera integration)
    -   `clsx` & `tailwind-merge` (Utility class)

## 📦 Cara Menjalankan

Pastikan Anda telah menginstal **Node.js** (versi 18+ direkomendasikan).

1.  **Clone repository:**

    ```bash
    git clone [https://github.com/username/project-name.git](https://github.com/username/project-name.git)
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    ```

3.  **Jalankan server development:**

    ```bash
    npm run dev
    ```

4.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Folder

```text
frontend/
├── app/                  # App Router (Pages, Layout, Globals CSS)
├── components/           # Komponen Modular
│   ├── home/             # Hero Section
│   ├── input/            # InputArea (Logika Upload & Kamera)
│   └── layout/           # Navbar & Footer
├── public/               # Aset statis
└── tailwind.config.ts    # Konfigurasi Tema (jika ada)
```
