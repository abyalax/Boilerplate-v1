# Fitur Utama Boilerplate v1

## Boilerplate ini mencakup **frontend modern** berbasis React dengan **TanStack Router** (highly type-safe) dan **backend modular** berbasis NestJS.

## Frontend

<p align="center">
  <a href="https://react.dev/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://vitejs.dev/" target="blank">
    <img src="https://vitejs.dev/logo.svg" width="100" alt="Vite Logo" />
  </a>
</p>

---

### Framework & Library

- **React Vite + TanStack Router** → type-safety penuh untuk routing, loader, dan action dengan build tool modern.
- **TanStack Query** → data fetching, caching, dan invalidation terintegrasi.
- **State Management** → Zustand.
- **UI Library Ant Design** → komponen siap pakai dengan konsistensi desain.
- **TypeScript by default** → semua komponen dan hooks strongly typed.

### Fitur Utama

- **File-based routing**: Semua rute terdefinisi otomatis sesuai struktur folder.
- **Loader & action API**: Ambil data dan handle mutation langsung di rute.
- **Code splitting otomatis** → bundle ringan per halaman.
- **Client-side rendering (CSR) only** → tidak ada SSR native.
- **Hot Module Replacement (HMR)** untuk pengembangan cepat.
- **Integrasi penuh dengan TanStack Query** untuk data sync realtime dan caching.
- **Error boundaries & not-found boundaries** bawaan dari TanStack Router.

---

## Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

---

### Framework & Library

- **NestJS** → modular, scalable, dan terstruktur.
- **TypeORM (MySQL)** → ORM dengan migrasi, seeding, dan repository pattern.
- **Class Validator & Transformer** → validasi dan transformasi data otomatis di DTO.
- **Comprehensive Error Handling** → global filters dan custom exception handling bawaan.
- **TypeScript by default** → type safety end-to-end.
- **Testing-ready** → struktur siap untuk unit test dan integration test.

### Fitur Utama

- **Modular architecture** → setiap domain (auth, product, user) terpisah rapi.
- **Global Guards & Decorators** → proteksi endpoint dengan role-based dan JWT.
- **Configurable Database Layer** → koneksi, migration, seeding, dan mock data dalam folder `infrastructure/database`.
- **DTO dan Entity terpisah** → mudah di-maintain dan di-test.
- **Centralized Constants & Types** → konsisten di seluruh project (`src/common`).
- **Comprehensive filters** → error handler terpusat (`src/common/filters`).
- **Ready for production** → environment-based configuration via `.env`.

---

## Struktur Project (Backend)

```
└── 📁src
    ├── 📁common
    │   ├── 📁constants
    │   ├── 📁decorators
    │   ├── 📁dto
    │   ├── 📁filters
    │   ├── 📁guards
    │   └── 📁types
    ├── 📁infrastructure
    │   └── 📁database
    │       ├── 📁migrations
    │       ├── 📁mock
    │       ├── 📁seeds
    │       ├── database.module.ts
    │       └── database.provider.ts
    ├── 📁modules
    │   ├── 📁auth
    │   ├── 📁product
    │   └── 📁user
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── index.ts
    └── main.ts
```

---

# How To Set Up

---

## Prasyarat

1. **Node.js ≥ 22**
   Disarankan menggunakan [nvm](https://github.com/nvm-sh/nvm) atau [fnm](https://github.com/Schniz/fnm) untuk manajemen versi Node.

2. **pnpm@10.14.0**
   Aktifkan Corepack agar versi sesuai otomatis:

   ```bash
   corepack enable
   ```

3. **Database MySQL**
   - Buat database: `db_point_of_sales`
   - Jalankan service database (disarankan [Laragon](https://laragon.org/) di Windows atau MySQL lokal di Linux/Mac).

---

## Setup

1. Clone repository

   ```bash
   git clone https://github.com/abyalax/point-of-sales.git
   cd point-of-sales
   ```

2. Install Node.js via nvm

   ```bash
   nvm install 22
   nvm use 22

   ```

3. Install dependencies

   ```bash
   pnpm install
   ```

   > Pastikan `pnpm --version` sesuai `10.14.0`.

4. Setup database (migration & seed)

   ```bash
   pnpm migrate:generate
   pnpm migrate:run
   pnpm seed
   ```

5. Jalankan development server

   Frontend dan backend akan berjalan **concurrently** di satu terminal:

   ```bash
   pnpm dev
   ```

   - Frontend dev server: [http://localhost:5173](http://localhost:5173) (Vite default)
   - Backend dev server: [http://localhost:3000](http://localhost:3000) (NestJS default)

---

## Script Utama

Dijalankan di **root project**:

| Perintah                | Deskripsi                                          |
| ----------------------- | -------------------------------------------------- |
| `pnpm dev`              | Jalankan frontend & backend sekaligus (hot reload) |
| `pnpm build`            | Build frontend & backend sekaligus                 |
| `pnpm migrate:generate` | Generate migration baru (backend)                  |
| `pnpm migrate:run`      | Jalankan semua migration (backend)                 |
| `pnpm migrate:show`     | Lihat daftar migration (backend)                   |
| `pnpm migrate:revert`   | Rollback migration terakhir (backend)              |
| `pnpm schema:drop`      | Drop schema database (backend)                     |
| `pnpm seed`             | Jalankan database seeding (backend)                |
| `pnpm seed:create`      | Buat seed baru (backend)                           |
| `pnpm test`             | Jalankan test backend (Jest)                       |
| `pnpm lint`             | Jalankan ESLint untuk frontend & backend           |
| `pnpm format`           | Jalankan Prettier untuk seluruh project            |

---

Dokumentasi Frontend

[click](./frontend/README.md)

Dokumentasi Backend

[click](./backend/README.md)
