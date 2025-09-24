# 📰 Hot Topics Hub

A full-stack web application built with Next.js 14 (App Router), TypeScript, and Drizzle ORM for managing and displaying posts categorized by topics.
It supports powerful search, category-based filtering, and image uploads with Cloudinary.

## 🚀 Features

✅ Next.js 14 (App Router) – Server Components + Client Components

✅ TypeScript for type safety

✅ Drizzle ORM + Neon/Postgres for database management

✅ Categories & Posts with relations

✅ Search (with case-insensitive queries)

✅ Image Uploads via Cloudinary

✅ Server Actions for safe server-side mutations

✅ Seed Script to bootstrap sample data

## 🛠️ Tech Stack

Frontend: Next.js 14, React, TypeScript, TailwindCSS

Backend: Next.js API routes + Server Actions

Database: Neon (Postgres) with Drizzle ORM

Storage: Cloudinary for image uploads

Package Manager: pnpm

## ⚙️ Setup & Installation

1. Clone the repository

```bash
    git clone https://github.com/abhaychauhan8802/hot-topics.git
    cd hot-topics
```

2. Install dependencies

```bash
    pnpm install
```

3. Configure environment variables

```bash
    # Neon Postgres
    DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"

    JWT_SECRET="secret"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
```

4. Run migrations

```bash
    pnpm drizzle-kit generate
    pnpm drizzle-kit push
```

5. Seed the database

```bash
    pnpm dlx tsx src/db/seed.ts
```

6. Run the development server

```bash
    pnpm dev
```

## 👨‍💻 Author

Built by Abhay 🚀
