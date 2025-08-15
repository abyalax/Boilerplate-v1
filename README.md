---
# Fitur Utama Boilerplate v1

Boilerplate ini mencakup **frontend modern** berbasis React dengan **TanStack Router** (highly type-safe) dan **backend modular** berbasis NestJS.
---

## Frontend

### Framework & Library

- **React + TanStack Router** → type-safety penuh untuk routing, loader, dan action.
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

Dokumentasi Frontend

[click](./frontend/README.md)

Dokumentasi Backend

[click](./backend/README.md)
