# 3D Face Particles

> 一个基于 React Three Fiber 的粒子人脸实验：把人像深度图重建成高密度粒子人脸，并通过自定义 GLSL shader 在多张人脸之间平滑变形。

## 概览

3D Face Particles 会从成对的颜色贴图和深度贴图中渲染一个 280 x 280 的点云。每张人脸都由一张 color map 和一张 depth map 表示，然后通过 GSAP 驱动的 `transition` uniform 混合到下一张人脸。

这个场景的结构刻意保持紧凑：一个全屏 `Canvas`、一个粒子系统、一个控制 hook，以及两段负责最终视觉效果的 shader。

## 亮点

- 从颜色/深度贴图对中重建人脸几何。
- 使用稳定的 buffer attribute 生成 78,400 个 GPU 粒子。
- 在 vertex shader 中混合两张 color map 和两张 depth map，实现人脸过渡。
- 加入 curl noise、vortex 偏移、景深尺寸变化和亮度控制。
- 通过 Leva 暴露实时视觉调参入口。
- 使用 `maath/easing` 做指针驱动的阻尼旋转。

## 架构

- `App` 挂载 React Three Fiber 的 `Canvas`，并把 Leva 控制参数传给粒子系统。
- `FaceParticles` 负责加载贴图、准备 shader uniforms、管理 GSAP 过渡，并在每帧更新 uniform。
- `useParticleControls` 把可调参数分组到 Face、Particle、Noise、Vortex 和 Display。
- `face.vert.glsl` 负责人脸重建、noise/vortex 位移和粒子尺寸计算。
- `face.frag.glsl` 负责粒子 sprite 着色、亮度和深度淡出。

## 核心实现

粒子数量固定，并且只生成一次，这样 shader 可以接收稳定的 attribute buffer。

```ts
const POINT_AMOUNT = 280;
const POINT_COUNT = POINT_AMOUNT * POINT_AMOUNT;
```

每张人脸都被建模成成对的颜色贴图和深度贴图：

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

几何 attribute 保存了类似 UV 的索引、随机偏移和初始球面位置：

```ts
const vPositions = new Float32Array(POINT_COUNT * 3);
const vIndex = new Float32Array(POINT_COUNT * 2);
const vRandom = new Float32Array(POINT_COUNT * 4);
```

当当前人脸变化时，GSAP 只动画 shader uniforms，不需要重建几何：

```ts
timelineRef.current = gsap
  .timeline()
  .fromTo(u.transition, { value: 0 }, { value: 1.3, duration: 1.6 })
  .to(u.posZ, { value: offset_z, duration: 1.6 }, 0)
  .to(u.zScale, { value: face_scale_z, duration: 1.6 }, 0)
  .to(u.faceSize, { value: face_size, duration: 1.6 }, 0);
```

每帧都会把 Leva 控制参数同步到 shader：

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

vertex shader 会判断粒子是否属于人脸，并应用深度、noise 和类似 vortex 的位移：

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

fragment shader 保证每个点是圆形，并按深度做透明度衰减：

```glsl
vec2 cxy = 2.0 * gl_PointCoord - 1.0;
if (dot(cxy, cxy) > 1.0) discard;

vec3 color = onShading ? vColor * texture2D(particleMap, uv).rgb : vColor;
color *= brightness;

float dofAlpha = 1.04 - clamp(vDistance * 1.5, 0.0, 1.0);
gl_FragColor = vec4(color, dofAlpha);
```

## 技术栈

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

## 本地运行

```bash
bun install
bun run dev
bun run build
```

## 仓库说明

- 项目围绕 shader 驱动动画优化，而不是依赖频繁的 React state 更新。
- public 贴图路径需要存在于 Vite public 根目录。
- 生产环境可以隐藏 Leva，同时保留 `DEFAULT_PARAMS` 中的默认控制参数。
