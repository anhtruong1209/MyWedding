"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.9}>
      <group ref={group} rotation={[0.5, 0, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.55, 0, 0]}>
          <torusGeometry args={[1.15, 0.16, 40, 120]} />
          <meshStandardMaterial color="#c9a96a" metalness={1} roughness={0.18} envMapIntensity={1.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.5, 0]} position={[0.55, 0, 0]}>
          <torusGeometry args={[1.15, 0.16, 40, 120]} />
          <meshStandardMaterial color="#e7c3c4" metalness={0.9} roughness={0.22} envMapIntensity={1.2} />
        </mesh>
        {/* Viên kim cương nhỏ trên nhẫn */}
        <mesh position={[-0.55, 1.28, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0} emissive="#bfe0ff" emissiveIntensity={0.5} envMapIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function RingsCanvas({ frameloop = "always" }: { frameloop?: "always" | "never" }) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} color="#fff3e0" />
      <pointLight position={[-5, -2, 3]} intensity={30} color="#f0b8c1" />
      <spotLight position={[0, 8, 4]} angle={0.6} intensity={40} color="#ffffff" penumbra={1} />

      {/* Môi trường phản chiếu cho kim loại (không cần HDR ngoài — an toàn CSP). */}
      <Environment resolution={64}>
        <Lightformer intensity={2.4} position={[0, 3, 3]} scale={7} color="#fff3e0" />
        <Lightformer intensity={1.4} position={[-4, -1, 2]} scale={5} color="#f0b8c1" />
        <Lightformer intensity={1.2} position={[4, 1, 2]} scale={5} color="#d9c29a" />
      </Environment>

      <Rings />
    </Canvas>
  );
}
