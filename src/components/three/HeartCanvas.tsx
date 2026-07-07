"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Hình trái tim 3D mỏng, dùng chung cho tất cả các instance. */
function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.5, 0.5);
    shape.bezierCurveTo(0.5, 0.5, 0.4, 0, 0, 0);
    shape.bezierCurveTo(-0.6, 0, -0.6, 0.7, -0.6, 0.7);
    shape.bezierCurveTo(-0.6, 1.1, -0.3, 1.54, 0.5, 1.9);
    shape.bezierCurveTo(1.2, 1.54, 1.6, 1.1, 1.6, 0.7);
    shape.bezierCurveTo(1.6, 0.7, 1.6, 0, 1.0, 0);
    shape.bezierCurveTo(0.7, 0, 0.5, 0.5, 0.5, 0.5);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 3,
      curveSegments: 14,
    });
    geo.center();
    geo.rotateZ(Math.PI); // xoay đỉnh tim lên trên
    geo.scale(0.42, 0.42, 0.42);
    return geo;
  }, []);
}

type Petal = {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  spinX: number;
  spinY: number;
  fall: number;
  sway: number;
  swayAmp: number;
  scale: number;
};

function makePetals(count: number): Petal[] {
  const arr: Petal[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 24 - 6,
      z: (Math.random() - 0.5) * 10 - 2,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      spinX: (Math.random() - 0.5) * 0.5,
      spinY: (Math.random() - 0.5) * 0.5,
      fall: 0.6 + Math.random() * 1.1,
      sway: Math.random() * Math.PI * 2,
      swayAmp: 0.4 + Math.random() * 1.1,
      scale: 0.5 + Math.random() * 0.9,
    });
  }
  return arr;
}

/** Một cụm tim cùng màu (dùng InstancedMesh riêng để màu chắc chắn hiển thị). */
function PetalCluster({
  petals,
  color,
  geometry,
}: {
  petals: Petal[];
  color: string;
  geometry: THREE.ExtrudeGeometry;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const topEdge = viewport.height / 2 + 8;

    petals.forEach((p, i) => {
      p.y -= p.fall * d;
      p.rotX += p.spinX * d;
      p.rotY += p.spinY * d;
      if (p.y < -topEdge) {
        p.y = topEdge;
        p.x = (Math.random() - 0.5) * 20;
      }
      const swayX = Math.sin(t * 0.6 + p.sway) * p.swayAmp;
      dummy.position.set(p.x + swayX, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, petals.length]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        roughness={0.35}
        metalness={0.55}
        emissive={new THREE.Color("#7a3b48")}
        emissiveIntensity={0.16}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}

function HeartField({ count }: { count: number }) {
  const geometry = useHeartGeometry();
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Chia đều số tim thành 3 cụm màu.
  const clusters = useMemo(() => {
    const all = makePetals(count);
    const rose: Petal[] = [];
    const gold: Petal[] = [];
    const petal: Petal[] = [];
    all.forEach((p, i) => (i % 3 === 0 ? gold : i % 3 === 1 ? rose : petal).push(p));
    return { rose, gold, petal };
  }, [count]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.25 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-pointer.y * 0.18 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <PetalCluster petals={clusters.gold} color="#c9a96a" geometry={geometry} />
      <PetalCluster petals={clusters.rose} color="#d98a97" geometry={geometry} />
      <PetalCluster petals={clusters.petal} color="#f0c9cd" geometry={geometry} />
    </group>
  );
}

export default function HeartCanvas({
  count = 60,
  frameloop = "always",
}: {
  count?: number;
  frameloop?: "always" | "never";
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 16], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 10, 8]} intensity={1.4} color="#fff2df" />
      <pointLight position={[-8, -4, 6]} intensity={40} color="#e79aa6" />
      <pointLight position={[8, 6, 4]} intensity={30} color="#d9c29a" />
      <HeartField count={count} />
    </Canvas>
  );
}
