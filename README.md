<div align="center">

# SOLE

### Premium Sneaker E-Commerce Platform

A modern full-stack storefront built for seamless product discovery, secure checkout, and responsive shopping experiences.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

[View Live Store](https://sole-store-ivory.vercel.app) · [Explore Features](#key-features) · [Run Locally](#getting-started)

</div>

---

## Overview

**Sole** is a full-stack sneaker e-commerce application designed around a clean, editorial-style shopping experience.

The application combines the Next.js App Router, server-side functionality, PostgreSQL database management, Stripe payments, Clerk authentication, Prisma ORM, and persistent client-side state.

It covers the core workflow of a production storefront—from browsing and filtering products to authentication, wishlist management, cart persistence, administration, and secure checkout.

---

## Key Features

| Feature | Description |
|---|---|
| **Product Catalogue** | Browse a responsive collection of premium sneakers with detailed product pages. |
| **Search and Filtering** | Discover products using search, brand, category, and price-based filtering. |
| **Dynamic Product Pages** | View product-specific information using dynamic Next.js routes. |
| **Persistent Shopping Cart** | Maintain cart items between sessions using Zustand state persistence. |
| **Wishlist Management** | Save and remove favourite products using a dedicated persistent wishlist store. |
| **Secure Authentication** | Handle account registration and sign-in through Clerk. |
| **Stripe Checkout** | Process payments using Stripe's secure hosted checkout flow. |
| **Admin Dashboard** | Access dedicated routes for adding and managing store products. |
| **Responsive Navigation** | Provide desktop and mobile navigation with touch-friendly interactions. |
| **Modern Storefront UI** | Deliver an editorial, fashion-focused interface with reusable components. |

---

## Store Experience

### Product Discovery

Users can browse the sneaker catalogue, search for specific items, and narrow results using filters designed for a faster shopping experience.

### Cart and Wishlist

Cart and wishlist logic are managed through dedicated Zustand stores. State persistence allows selected products to remain available after refreshing or reopening the application.

### Authentication

Clerk provides secure user registration, login, session management, and protected application functionality.

### Checkout

Stripe Checkout handles payment processing outside the application through Stripe's secure payment interface.

### Administration

The admin area provides dedicated routes for creating and managing product information through the application's database layer.

---

## Tech Stack

### Frontend

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Zustand

### Backend and Data

- Next.js Server Actions
- PostgreSQL
- Neon Database
- Prisma ORM

### Services

- Clerk Authentication
- Stripe Checkout
- Vercel Deployment

---

## Application Architecture

```text
sole-commerce/
│
├── app/
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── add/
│   │   └── page.tsx
│   │
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── wishlist/
│   │   └── page.tsx
│   │
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── AddToCartButton.tsx
│   ├── AnnouncementBar.tsx
│   ├── CartDrawer.tsx
│   ├── FilterSidebar.tsx
│   ├── FilterUI.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MobileFilter.tsx
│   ├── MobileMenu.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductInterface.tsx
│   ├── QuickAddModal.tsx
│   ├── SearchBar.tsx
│   └── WishlistButton.tsx
│
├── lib/
│   ├── db.ts
│   ├── store.ts
│   ├── stripe.ts
│   └── wishlist-store.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 18 or later
- npm
- PostgreSQL or a Neon database
- Clerk account
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/kcdoescode/sole-store.git
cd sole-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

STRIPE_SECRET_KEY="your_stripe_secret_key"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Use the exact environment-variable names expected by your current project files if they differ from this example.

Never commit the `.env` file or expose production credentials publicly.

### 4. Generate the Prisma client

```bash
npx prisma generate
```

### 5. Synchronize the database

```bash
npx prisma db push
```

### 6. Start the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build |
| `npm run lint` | Checks the project for linting issues |
| `npx prisma generate` | Generates the Prisma client |
| `npx prisma studio` | Opens the Prisma database interface |

---

## Deployment

The application is deployed on Vercel:

**Live application:**  
https://sole-store-ivory.vercel.app

For deployment, configure all required database, Clerk, and Stripe environment variables in the Vercel project settings.

---

## Engineering Highlights

- Component-based storefront architecture
- Dynamic routing with the Next.js App Router
- Type-safe development using TypeScript
- Database access through Prisma ORM
- Persistent Zustand stores for cart and wishlist state
- Server-side product operations
- Secure third-party authentication
- Integrated Stripe payment workflow
- Responsive desktop and mobile interfaces
- Production deployment through Vercel

---

<div align="center">

### Built with Next.js, TypeScript, PostgreSQL and Stripe

[Visit the Live Store](https://sole-store-ivory.vercel.app)

</div>

📸 Screenshots
<img width="1901" height="902" alt="image" src="https://github.com/user-attachments/assets/dfc04b34-5922-4cc5-b380-31efa9ea9634" />
<img width="1915" height="912" alt="image" src="https://github.com/user-attachments/assets/f77af7b4-b1ac-4ad7-8a77-b8ab3654bdbd" />
<img width="1903" height="900" alt="image" src="https://github.com/user-attachments/assets/494300b0-2f01-4b9b-b12b-fc57889338ec" />
<img width="1914" height="906" alt="image" src="https://github.com/user-attachments/assets/07b7f04e-4330-4306-9d2b-317a569ff274" />





