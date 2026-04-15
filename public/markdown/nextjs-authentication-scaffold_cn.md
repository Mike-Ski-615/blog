# Next.js Authentication Scaffold

> 一个面向现代 Next.js 应用的生产级认证脚手架，覆盖 OTP、Passkey、钱包连接，并采用模块化服务端架构。

## 概览

Next.js Authentication Scaffold 是一个全栈认证起点，适合需要快速搭建安全认证流程、但不想从空项目开始的场景。它把 Next.js App Router、React、TypeScript、Prisma、PostgreSQL 与 shadcn/ui 组合成一个可继续扩展的生产基础。

这个脚手架关注清晰边界：界面状态放在 React 组件里，数据校验放在 schema 里，服务端变更放在 server actions 里，持久化通过 Prisma 完成。

## 亮点

- 支持邮箱 OTP、手机 OTP、Passkey/WebAuthn、钱包连接，以及可扩展的 OAuth 登录流程。
- 通过模块化 auth state 管理不同认证方式，每种方式都可以独立演进。
- 使用 Prisma 封装类型安全的数据访问。
- 使用 server actions 承载安全的服务端变更。
- 使用 shadcn/ui、Radix UI 与 Tailwind CSS 提供可复用的界面模式。
- 使用 Zod 与 React Hook Form 处理表单校验和交互。

## 架构

- `app/` 存放 Next.js App Router 路由树和布局。
- `components/auth/` 承载认证 UI 状态和共享认证组件。
- `lib/actions/` 存放用户、验证码等服务端变更逻辑。
- `lib/session.ts` 负责 JWT 会话创建和校验。
- `lib/prisma.ts` 暴露 Prisma client。
- `prisma/schema.prisma` 定义用户、账号、会话、验证码和 passkey 等认证模型。

## 核心实现

认证流程被拆成多个聚焦的 UI 状态，而不是写在一个大型 modal 中：

```txt
default-state -> email-state -> phone-state -> passkey-state -> wallet-state -> register-state
```

Server action 会先校验输入，再访问数据库：

```ts
"use server";

export async function createUser(input: CreateUserInput) {
  const data = userSchema.parse(input);

  return prisma.user.create({
    data,
  });
}
```

会话创建逻辑保持在服务端：

```ts
export async function createSession(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}
```

数据库模型围绕认证原语组织：

```txt
user -> account
user -> session
user -> passkey
verification -> email or phone OTP flow
```

## 技术栈

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

## 本地运行

```bash
git clone git@github.com:Mike-Ski-615/Next.js-Authentication-Scaffold.git
cd Next.js-Authentication-Scaffold
bun install
cp .env.example .env
bun run db:generate
bun run db:migrate
bun dev
```

必要环境变量：

- `DATABASE_URL`
- `SESSION_SECRET`

## 仓库说明

- 这个脚手架更像一个认证起点，而不是固定形态的产品框架。
- 不同认证方式可以独立启用、移除或替换。
- 上生产前需要审查数据库迁移和会话密钥配置。
- UI 层使用可复用的 shadcn/ui primitives，方便继续调整主题和交互。
