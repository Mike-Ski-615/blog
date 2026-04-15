import type { Project, ProjectSlug } from "./types";

export const zhProjects: Record<ProjectSlug, Project> = {
  "nextjs-authentication-scaffold": {
    slug: "nextjs-authentication-scaffold",
    cover: "/images/projects/nextjs-authentication-scaffold.png",
    name: "Next.js-Authentication-Scaffold",
    summary:
      "一个功能完整、模块化的 Next.js 认证系统脚手架，支持邮箱/手机 OTP、Passkey 生物认证与钱包连接。",
    intro:
      "一个功能完整、模块化的 Next.js 认证系统脚手架，集成多种现代认证方式，包括邮箱/手机 OTP、Passkey 生物识别与钱包连接。",
    detail:
      "项目基于 Next.js 16、React 19、TypeScript、Prisma 与 PostgreSQL 构建，可作为生产级应用快速接入安全且可扩展认证流程的起点。",
    status: "online",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Prisma 7",
      "PostgreSQL",
      "Prisma Migrate",
      "Tailwind CSS 4",
      "Shadcn UI",
      "Radix UI",
      "Motion",
      "Tabler Icons",
      "React Hook Form",
      "Zod",
      "Input OTP",
      "Jose",
      "WebAuthn",
      "Server-only",
      "ESLint",
      "Prettier",
    ],
    links: {
      github:
        "https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold",
      readme:
        "https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold#readme",
      issues:
        "https://github.com/Mike-Ski-615/Next.js-Authentication-Scaffold/issues",
    },
  },
  "three-d-face-particles": {
    slug: "three-d-face-particles",
    cover: "/images/projects/3d-face.png",
    name: "3D Face Particles",
    summary:
      "基于深度图与 GLSL 的人脸粒子重建实验，支持多人脸插值切换与噪声驱动形变。",
    intro:
      "项目将人像的颜色图与深度图重建为高密度粒子点云，并通过自定义顶点/片元着色器实现动态过渡。在多张人脸之间切换时，粒子分布和明暗保持连续，减少突兀跳变。",
    detail:
      "核心由 React Three Fiber、Three.js 与 GSAP 驱动，使用 280x280（78,400）粒子进行渲染，包含景深衰减、curl noise 流场、vortex 旋涡参数以及 Leva 实时调参，便于快速进行视觉迭代。",
    status: "online",
    stack: [
      "React 19",
      "TypeScript 5",
      "Three.js",
      "@react-three/fiber",
      "@react-three/drei",
      "GLSL",
      "GSAP",
      "maath",
      "Leva",
      "Vite 8",
    ],
    links: {
      github: "https://github.com/Mike-Ski-615/3D-Face",
      readme: "https://github.com/Mike-Ski-615/3D-Face#readme",
      issues: "https://github.com/Mike-Ski-615/3D-Face/issues",
    },
  },
};
