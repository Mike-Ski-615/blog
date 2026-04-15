import type { Project, ProjectSlug } from "./types";

export const enProjects: Record<ProjectSlug, Project> = {
  "nextjs-authentication-scaffold": {
    slug: "nextjs-authentication-scaffold",
    cover: "/images/projects/nextjs-authentication-scaffold.png",
    name: "Next.js-Authentication-Scaffold",
    summary:
      "A full-featured, modular Next.js authentication system scaffold with Email/Phone OTP, passkeys, and wallet connections.",
    intro:
      "A full-featured, modular Next.js authentication system scaffold with multiple modern authentication methods including Email/Phone OTP, Passkey biometrics, and wallet connections.",
    detail:
      "Built with Next.js 16, React 19, TypeScript, Prisma, and PostgreSQL, this scaffold provides a practical starting point for secure, extensible authentication flows in production apps.",
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
      "A GPU particle-face experiment driven by depth maps, shader noise fields, and smooth face-to-face morph transitions.",
    intro:
      "This project reconstructs portrait depth textures into a dense point cloud and animates them with custom GLSL vertex/fragment shaders. It blends between multiple faces over time and preserves visual continuity during transitions.",
    detail:
      "Built with React Three Fiber, Three.js, and GSAP, it renders 78,400 particles (280x280) with DOF shading, curl-noise deformation, vortex controls, and live parameter tuning via Leva for rapid art-direction.",
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
