"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  makeGlowTexture,
  makeLeafGeometry,
  makePetalGeometry,
  makeDrifters,
  type Drifter,
} from "./forest-lib";

/* ------------------------------------------------------------------ *
 * Lá / cánh hoa rơi xoay 3D
 * ------------------------------------------------------------------ */

function FallingCluster({
  geometry,
  color,
  items,
  opacity = 1,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
  items: Drifter[];
  opacity?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const top = viewport.height / 2 + 10;

    items.forEach((p, i) => {
      p.y -= p.fall * d;
      p.rx += p.sx * d;
      p.ry += p.sy * d;
      if (p.y < -top) {
        p.y = top;
        p.x = (Math.random() - 0.5) * 26;
      }
      const swayX = Math.sin(t * 0.5 + p.sway) * p.swayAmp;
      const swayZ = Math.cos(t * 0.35 + p.sway) * p.swayAmp * 0.4;
      dummy.position.set(p.x + swayX, p.y, p.z + swayZ);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!items.length) return null;
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, items.length]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.1}
        transparent
        opacity={opacity}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ *
 * Đom đóm phát sáng (Points + texture toả sáng, blending cộng)
 * ------------------------------------------------------------------ */

function Fireflies({
  count,
  texture,
  color = "#FFF0B8",
}: {
  count: number;
  texture: THREE.Texture;
  color?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 1;
      seeds[i * 3] = Math.random() * Math.PI * 2;
      seeds[i * 3 + 1] = 0.25 + Math.random() * 0.6;
      seeds[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += Math.sin(t * seeds[i3 + 1] + seeds[i3]) * 0.004;
      arr[i3 + 1] += Math.cos(t * seeds[i3 + 1] * 0.8 + seeds[i3 + 2]) * 0.004;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    // Nhấp nháy nhẹ toàn cụm
    if (matRef.current) matRef.current.opacity = 0.75 + Math.sin(t * 1.6) * 0.2;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={texture}
        size={0.85}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
        toneMapped={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Tia nắng xuyên tán lá (plane kéo dài + blending cộng)
 * ------------------------------------------------------------------ */

function GodRays({ texture, color = "#FFF3C8" }: { texture: THREE.Texture; color?: string }) {
  const group = useRef<THREE.Group>(null);
  const rays = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        x: -10 + i * 4 + Math.random() * 2,
        rot: -0.32 + Math.random() * 0.1,
        w: 1.6 + Math.random() * 1.6,
        h: 22 + Math.random() * 8,
        o: 0.14 + Math.random() * 0.16,
        phase: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = rays[i].o * (0.65 + Math.sin(t * 0.5 + rays[i].phase) * 0.35);
    });
  });

  return (
    <group ref={group} position={[0, 2, -6]}>
      {rays.map((r, i) => (
        <mesh key={i} position={[r.x, 0, 0]} rotation={[0, 0, r.rot]}>
          <planeGeometry args={[r.w, r.h]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={r.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color={color}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Camera trôi nhẹ + parallax theo con trỏ
 * ------------------------------------------------------------------ */

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const tx = pointer.x * 1.6 + Math.sin(t * 0.12) * 0.35;
    const ty = pointer.y * 0.9 + Math.cos(t * 0.16) * 0.25;
    camera.position.x += (tx - camera.position.x) * 0.03;
    camera.position.y += (ty - camera.position.y) * 0.03;
    camera.lookAt(0, 0, -4);
  });
  return null;
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */

type Density = "full" | "light";
export type SceneTheme = "forest" | "blush";

/**
 * Hai thế giới của site — không dựng cây 3D (khối low-poly nhìn thô khi lên khung
 * hình lớn); không gian cổ tích đến từ ánh sáng: tia nắng, đom đóm, lá/cánh hoa rơi.
 *
 * forest — rừng cổ tích của bố mẹ: nắng vàng, đom đóm, lá rơi điểm xanh rêu.
 * blush  — chương của con: mưa cánh hoa hồng dày và bụi lấp lánh trắng hồng.
 */
const THEMES = {
  forest: {
    fog: "#F3EAD3",
    ambient: "#FFF3D9",
    hemi: ["#FFF3C8", "#4F7A5C"] as const,
    directional: "#FFF0C4",
    point: "#9FCBAE",
    ray: "#FFF3C8",
    driftShape: "leaf",
    leaves: ["#5C8A6E", "#D4AF6A"] as const,
    petals: ["#A8834A", "#F1DDA6"] as const,
    firefly: "#FFF0B8",
    sparkle: "#FFF0B8",
  },
  blush: {
    fog: "#FDEBF0",
    ambient: "#FFF4F7",
    hemi: ["#FFF7F9", "#F4A9B8"] as const,
    directional: "#FFE8EE",
    point: "#FBD5DE",
    ray: "#FFE2EA",
    driftShape: "petal",
    // Không có lá; dùng cánh hoa hai sắc hồng cho cả bốn cụm rơi.
    leaves: ["#F4A9B8", "#FBD5DE"] as const,
    petals: ["#E8879B", "#FFF0F4"] as const,
    firefly: "#FFE9F0",
    sparkle: "#FFF7F9",
  },
} as const;

function Scene({ density, theme }: { density: Density; theme: SceneTheme }) {
  const full = density === "full";
  const t = THEMES[theme];

  const glow = useMemo(() => makeGlowTexture(), []);
  const leafGeo = useMemo(() => makeLeafGeometry(), []);
  const petalGeo = useMemo(() => makePetalGeometry(), []);

  // Không còn cây 3D đóng khung nên tăng lượng lá/cánh hoa rơi để khung hình không trống.
  const leavesA = useMemo(() => makeDrifters(full ? 34 : 18), [full]);
  const leavesB = useMemo(() => makeDrifters(full ? 28 : 15), [full]);
  const petalsA = useMemo(() => makeDrifters(full ? 28 : 15), [full]);
  const petalsB = useMemo(() => makeDrifters(full ? 22 : 12), [full]);

  const driftGeo = t.driftShape === "leaf" ? leafGeo : petalGeo;

  useEffect(() => {
    return () => {
      glow.dispose();
      leafGeo.dispose();
      petalGeo.dispose();
    };
  }, [glow, leafGeo, petalGeo]);

  return (
    <>
      <fog attach="fog" args={[t.fog, 12, 44]} />

      <ambientLight intensity={1.15} color={t.ambient} />
      <hemisphereLight args={[t.hemi[0], t.hemi[1], 1.1]} />
      <directionalLight position={[-8, 12, 6]} intensity={2.1} color={t.directional} />
      <pointLight position={[9, 3, 4]} intensity={26} color={t.point} />

      <GodRays texture={glow} color={t.ray} />

      <FallingCluster geometry={driftGeo} color={t.leaves[0]} items={leavesA} />
      <FallingCluster geometry={driftGeo} color={t.leaves[1]} items={leavesB} opacity={0.95} />
      <FallingCluster geometry={petalGeo} color={t.petals[0]} items={petalsA} />
      <FallingCluster geometry={petalGeo} color={t.petals[1]} items={petalsB} opacity={0.9} />

      <Fireflies count={full ? 90 : 45} texture={glow} color={t.firefly} />

      <Sparkles
        count={full ? 140 : 70}
        scale={[28, 16, 12]}
        size={3.5}
        speed={0.35}
        opacity={0.85}
        color={t.sparkle}
      />

      <CameraRig />
    </>
  );
}

export default function ForestCanvas({
  density = "full",
  theme = "forest",
  frameloop = "always",
}: {
  density?: Density;
  theme?: SceneTheme;
  frameloop?: "always" | "never";
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 13], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Scene density={density} theme={theme} />
    </Canvas>
  );
}
