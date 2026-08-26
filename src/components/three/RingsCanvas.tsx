"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Rings() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.32;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={group} rotation={[0.5, 0, 0.2]}>
        {/* Nhẫn vàng */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.55, 0, 0]}>
          <torusGeometry args={[1.15, 0.16, 40, 120]} />
          <meshStandardMaterial color="#E8C88A" metalness={1} roughness={0.14} envMapIntensity={1.8} />
        </mesh>
        {/* Nhẫn ngọc lục bảo (rừng) */}
        <mesh rotation={[Math.PI / 2.4, 0.5, 0]} position={[0.55, 0, 0]}>
          <torusGeometry args={[1.15, 0.16, 40, 120]} />
          <meshStandardMaterial color="#4F8F6C" metalness={0.95} roughness={0.18} envMapIntensity={1.6} />
        </mesh>
        {/* Viên đá quý */}
        <mesh position={[-0.55, 1.28, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.15}
            roughness={0}
            emissive="#FFF0B8"
            emissiveIntensity={0.9}
            envMapIntensity={2.4}
          />
        </mesh>
      </group>
      <Sparkles count={26} scale={[3.6, 3.6, 3.6]} size={3} speed={0.5} color="#FFF0B8" />
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
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#FFF3E0" />
      <pointLight position={[-5, -2, 3]} intensity={28} color="#8FC7A5" />
      <spotLight position={[0, 8, 4]} angle={0.6} intensity={45} color="#FFFFFF" penumbra={1} />

      {/* Môi trường phản chiếu (tự dựng — không cần HDR ngoài) */}
      <Environment resolution={64}>
        <Lightformer intensity={3} position={[0, 3, 3]} scale={8} color="#FFF6DC" />
        <Lightformer intensity={1.8} position={[-4, -1, 2]} scale={5} color="#8FC7A5" />
        <Lightformer intensity={1.6} position={[4, 1, 2]} scale={5} color="#F1DDA6" />
      </Environment>

      <Rings />
    </Canvas>
  );
}
