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
 * Cây rừng — thân + tán lá low-poly, dựng ở hai bên để "đóng khung"
 * ------------------------------------------------------------------ */

type Tree = { x: number; z: number; h: number; r: number };

function useTrees(count: number): Tree[] {
  return useMemo(() => {
    const trees: Tree[] = [];
    for (let i = 0; i < count; i++) {
      // Chỉ mọc ở rìa trái/phải để giữa khung hình vẫn sáng, thoáng.
      const side = i % 2 === 0 ? -1 : 1;
      const x = side * (6.5 + Math.random() * 8);
      const z = -2 - Math.random() * 14;
      trees.push({
        x,
        z,
        h: 6 + Math.random() * 5,
        r: 0.14 + Math.random() * 0.12,
      });
    }
    return trees;
  }, [count]);
}

function Trees({ trees }: { trees: Tree[] }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Mỗi cây có 3 khối tán lá → gom thành 2 cụm màu để tránh instanceColor.
  const blobs = useMemo(() => {
    const a: { x: number; y: number; z: number; s: number; tint: number }[] = [];
    trees.forEach((t) => {
      for (let k = 0; k < 3; k++) {
        a.push({
          x: t.x + (Math.random() - 0.5) * 2.2,
          y: -6 + t.h + k * 1.15 + Math.random() * 0.6,
          z: t.z + (Math.random() - 0.5) * 1.8,
          s: 2.4 - k * 0.45 + Math.random() * 0.5,
          tint: Math.random(),
        });
      }
    });
    return a;
  }, [trees]);

  const light = useMemo(() => blobs.filter((b) => b.tint > 0.5), [blobs]);
  const dark = useMemo(() => blobs.filter((b) => b.tint <= 0.5), [blobs]);

  useEffect(() => {
    const mesh = trunkRef.current;
    if (!mesh) return;
    trees.forEach((t, i) => {
      dummy.position.set(t.x, -6 + t.h / 2, t.z);
      dummy.rotation.set(0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.08);
      dummy.scale.set(t.r / 0.16, t.h / 8, t.r / 0.16);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [trees, dummy]);

  return (
    <group>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, trees.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.16, 0.26, 8, 7]} />
        <meshStandardMaterial color="#6b5a44" roughness={0.95} flatShading />
      </instancedMesh>

      <FoliageCluster blobs={light} color="#5FAE83" />
      <FoliageCluster blobs={dark} color="#37805F" />
    </group>
  );
}

function FoliageCluster({
  blobs,
  color,
}: {
  blobs: { x: number; y: number; z: number; s: number }[];
  color: string;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    blobs.forEach((b, i) => {
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(Math.random(), Math.random(), Math.random());
      dummy.scale.setScalar(b.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [blobs, dummy]);

  if (!blobs.length) return null;
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, blobs.length]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading transparent opacity={0.95} />
    </instancedMesh>
  );
}

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

function Fireflies({ count, texture }: { count: number; texture: THREE.Texture }) {
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
        color="#FFF0B8"
        toneMapped={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Tia nắng xuyên tán lá (plane kéo dài + blending cộng)
 * ------------------------------------------------------------------ */

function GodRays({ texture }: { texture: THREE.Texture }) {
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
            color="#FFF3C8"
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

function Scene({ density }: { density: Density }) {
  const full = density === "full";
  const glow = useMemo(() => makeGlowTexture(), []);
  const leafGeo = useMemo(() => makeLeafGeometry(), []);
  const petalGeo = useMemo(() => makePetalGeometry(), []);

  const trees = useTrees(full ? 16 : 8);

  const leavesA = useMemo(() => makeDrifters(full ? 22 : 12), [full]);
  const leavesB = useMemo(() => makeDrifters(full ? 18 : 10), [full]);
  const petalsA = useMemo(() => makeDrifters(full ? 18 : 10), [full]);
  const petalsB = useMemo(() => makeDrifters(full ? 14 : 8), [full]);

  useEffect(() => {
    return () => {
      glow.dispose();
      leafGeo.dispose();
      petalGeo.dispose();
    };
  }, [glow, leafGeo, petalGeo]);

  return (
    <>
      {/* Sương rừng — vật thể xa tan dần vào màn sương sáng */}
      <fog attach="fog" args={["#E6F1E4", 12, 44]} />

      <ambientLight intensity={1.15} color="#EAF6E6" />
      <hemisphereLight args={["#FFF3C8", "#88B79A", 1.1]} />
      <directionalLight position={[-8, 12, 6]} intensity={2.1} color="#FFF0C4" />
      <pointLight position={[9, 3, 4]} intensity={26} color="#CFE8D4" />

      <GodRays texture={glow} />
      <Trees trees={trees} />

      <FallingCluster geometry={leafGeo} color="#5FAE83" items={leavesA} />
      <FallingCluster geometry={leafGeo} color="#D4AF6A" items={leavesB} opacity={0.95} />
      <FallingCluster geometry={petalGeo} color="#E39BA0" items={petalsA} />
      <FallingCluster geometry={petalGeo} color="#F6DAD6" items={petalsB} opacity={0.9} />

      <Fireflies count={full ? 90 : 45} texture={glow} />

      {/* Bụi phép thuật lấp lánh */}
      <Sparkles
        count={full ? 140 : 70}
        scale={[28, 16, 12]}
        size={3.5}
        speed={0.35}
        opacity={0.85}
        color="#FFF0B8"
      />

      <CameraRig />
    </>
  );
}

export default function ForestCanvas({
  density = "full",
  frameloop = "always",
}: {
  density?: Density;
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
      <Scene density={density} />
    </Canvas>
  );
}
