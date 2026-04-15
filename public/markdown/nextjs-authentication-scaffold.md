# Next.js Authentication Scaffold

> A production-ready authentication scaffold for modern Next.js apps with OTP, passkeys, wallet connections, and a modular server-side architecture.

## Overview

Next.js Authentication Scaffold is a full-stack starter for teams that need secure authentication without starting from an empty project. It combines Next.js App Router, React, TypeScript, Prisma, PostgreSQL, and shadcn/ui into a practical foundation for production applications.

The scaffold focuses on clear boundaries: UI state lives in React components, validation lives in schemas, server mutations live in server actions, and persistence flows through Prisma.

## Highlights

- Supports email OTP, phone OTP, Passkey/WebAuthn, wallet connection, and OAuth-ready flows.
- Uses modular auth states so each method can evolve independently.
- Keeps database access behind a typed Prisma layer.
- Uses server actions for secure server-side mutations.
- Provides reusable UI patterns with shadcn/ui, Radix UI, and Tailwind CSS.
- Includes validation and form handling with Zod and React Hook Form.

## Architecture

- `app/` contains the Next.js App Router route tree and layouts.
- `components/auth/` owns the authentication UI states and shared auth components.
- `lib/actions/` contains server-side mutations for users and verification codes.
- `lib/session.ts` handles JWT-based session creation and validation.
- `lib/prisma.ts` exposes the Prisma client.
- `prisma/schema.prisma` defines users, accounts, sessions, verification records, and passkeys.

## Key Implementation

The auth flow is modeled as a set of focused UI states rather than one large modal body:

```txt
default-state -> email-state -> phone-state -> passkey-state -> wallet-state -> register-state
```

Server actions validate input before touching the database:

```ts
"use server";

export async function createUser(input: CreateUserInput) {
  const data = userSchema.parse(input);

  return prisma.user.create({
    data,
  });
}
```

Session creation is designed to stay server-only:

```ts
export async function createSession(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}
```

The database schema is centered on auth primitives:

```txt
user -> account
user -> session
user -> passkey
verification -> email or phone OTP flow
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Prisma 7
- PostgreSQL
- Tailwind CSS 4
- shadcn/ui
- Radix UI
- Motion
- Tabler Icons
- React Hook Form
- Zod
- Jose
- WebAuthn

## Run Locally

```bash
git clone git@github.com:Mike-Ski-615/Next.js-Authentication-Scaffold.git
cd Next.js-Authentication-Scaffold
bun install
cp .env.example .env
bun run db:generate
bun run db:migrate
bun dev
```

Required environment values:

- `DATABASE_URL`
- `SESSION_SECRET`

## Repository Notes

- The scaffold is designed as a starting point, not a locked product framework.
- Authentication methods can be enabled, removed, or replaced independently.
- Database migrations should be reviewed before production rollout.
- The UI layer intentionally uses reusable shadcn/ui primitives to keep the app themeable.
