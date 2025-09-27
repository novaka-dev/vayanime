# QWEN Project Guide

## Tech Stack

- Next.js 14
- TypeScript
- TailwindCSS
- Shadcn UI components

## Coding Style

- Gunakan TypeScript secara ketat.
- Ikuti aturan eslint + prettier dari config project.
- Gunakan class Tailwind untuk styling, hindari inline style.
- Komponen UI diambil dari Shadcn UI, modifikasi seperlunya.

## Rules

- Semua komponen disimpan di folder `src/components`.
- Jangan pakai `any` di TypeScript kecuali sangat terpaksa.
- Ikuti struktur folder yang sudah ada, jangan bikin folder aneh.
- Jika menulis API call, gunakan fetch wrapper di `src/lib/api.ts`.

## Notes

Project ini untuk anime website (vayanime).
Fokus ke performance, code clean, dan konsistensi UI.
