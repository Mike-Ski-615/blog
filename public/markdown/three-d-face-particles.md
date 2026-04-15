# 3D Face Particles

> A React Three Fiber experiment that reconstructs portrait depth maps into a dense particle face and morphs between multiple faces with custom GLSL shaders.

## Overview

3D Face Particles renders a 280 by 280 point cloud from paired color and depth textures. Each face is represented by a color map and a depth map, then blended into the next face with a GSAP-driven transition uniform.

The scene is intentionally compact: one full-screen `Canvas`, one particle system, one control hook, and two shaders that own the final look.

## Highlights

- Rebuilds face geometry from color/depth texture pairs.
- Uses 78,400 GPU particles generated from stable buffer attributes.
- Blends faces by mixing two color maps and two depth maps in the vertex shader.
- Adds curl noise, vortex offsets, depth-of-field sizing, and brightness controls.
- Exposes live art-direction parameters through Leva.
- Uses pointer-driven rotation damping from `maath/easing`.

## Architecture

- `App` mounts the React Three Fiber `Canvas` and passes Leva controls into the particle system.
- `FaceParticles` loads textures, prepares shader uniforms, owns GSAP transitions, and updates uniforms each frame.
- `useParticleControls` groups editable parameters into Face, Particle, Noise, Vortex, and Display folders.
- `face.vert.glsl` reconstructs the face, applies noise/vortex displacement, and computes point size.
- `face.frag.glsl` shades each particle with the particle sprite, brightness, and depth fade.

## Key Implementation

The particle count is fixed and generated once so the shader receives stable attribute buffers.

```ts
const POINT_AMOUNT = 280;
const POINT_COUNT = POINT_AMOUNT * POINT_AMOUNT;
```

Face sources are modeled as paired color/depth textures:

```ts
const FACES = [
  {
    color: "/adrian-teague-colour-256.webp",
    depth: "/adrian-teague-depth-256.webp",
    offset_z: 0,
    face_scale_z: 1,
    face_size: 1.0,
  },
  {
    color: "/alex-holland-colour-256.webp",
    depth: "/alex-holland-depth-256.webp",
    offset_z: 0,
    face_scale_z: 1,
    face_size: 1.0,
  },
  {
    color: "/andy-thomas-colour-256.webp",
    depth: "/andy-thomas-depth-256.webp",
    offset_z: 0,
    face_scale_z: 1,
    face_size: 1.0,
  },
];
```

The geometry attributes carry UV-like indexes, random offsets, and initial spherical positions:

```ts
const vPositions = new Float32Array(POINT_COUNT * 3);
const vIndex = new Float32Array(POINT_COUNT * 2);
const vRandom = new Float32Array(POINT_COUNT * 4);
```

When the active face changes, GSAP animates the shader uniforms instead of rebuilding geometry:

```ts
timelineRef.current = gsap
  .timeline()
  .fromTo(u.transition, { value: 0 }, { value: 1.3, duration: 1.6 })
  .to(u.posZ, { value: offset_z, duration: 1.6 }, 0)
  .to(u.zScale, { value: face_scale_z, duration: 1.6 }, 0)
  .to(u.faceSize, { value: face_size, duration: 1.6 }, 0);
```

The frame loop keeps shader parameters in sync with Leva controls:

```ts
useFrame((state, delta) => {
  const u = materialRef.current?.uniforms;
  const pts = pointsRef.current;
  if (!u || !pts) return;

  u.time.value = state.clock.elapsedTime * params.noiseSpeed;
  u.faceSize.value = params.faceSize;
  u.zScale.value = params.zScale;
  u.totalScale.value = params.totalScale;

  if (params.autoRotate) {
    easing.damp(pts.rotation, "y", state.pointer.x * 0.2 * Math.PI, 0.25, delta);
    easing.damp(pts.rotation, "x", -state.pointer.y * 0.2 * Math.PI, 0.25, delta);
  }
});
```

The vertex shader decides whether a particle belongs to the face and applies depth, noise, and vortex-style displacement:

```glsl
float density = (mainColorTexture.x + mainColorTexture.y + mainColorTexture.z) / 3.;
float zDepth = (1. - depthValue.z);

if ((zDepth > 0.3) && (density > 0.015)) {
  pos.xy = vIndex * 2.0 - 1.0;
  pos.z = (zDepth * 2.0 - 1.0) * zScale;
  pos *= faceSize;
  pos += curlNoise(pos * curlFreq1 + t) * noiseScale * 0.1;
} else {
  vColor = vec3(-1.);
}
```

The fragment shader keeps each rendered point circular and fades it by depth:

```glsl
vec2 cxy = 2.0 * gl_PointCoord - 1.0;
if (dot(cxy, cxy) > 1.0) discard;

vec3 color = onShading ? vColor * texture2D(particleMap, uv).rgb : vColor;
color *= brightness;

float dofAlpha = 1.04 - clamp(vDistance * 1.5, 0.0, 1.0);
gl_FragColor = vec4(color, dofAlpha);
```

## Tech Stack

- React 19
- TypeScript 5
- Vite
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- GSAP
- Leva
- maath
- GLSL shaders

## Run Locally

```bash
bun install
bun run dev
bun run build
```

## Repository Notes

- The project is optimized around shader-driven animation rather than React state updates.
- The public texture paths are expected to exist at the Vite public root.
- Leva can be hidden in production while keeping the same control defaults in `DEFAULT_PARAMS`.
