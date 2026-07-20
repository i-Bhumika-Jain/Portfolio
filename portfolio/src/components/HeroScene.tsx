"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

function Knot() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1.1}>
      <group ref={group}>
        <mesh castShadow>
          <torusKnotGeometry args={[1.05, 0.32, 220, 32]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0e7490"
            emissiveIntensity={0.35}
            roughness={0.18}
            metalness={0.55}
            distort={0.28}
            speed={1.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 45 }} dpr={[1, 1.8]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 6]} intensity={2.4} />
        <pointLight position={[-4, -2, 2]} intensity={2.2} color="#a855f7" />
        <pointLight position={[3, 3, -3]} intensity={1.4} color="#22d3ee" />
        <Knot />
        <Sparkles count={60} scale={8} size={2.5} speed={0.3} color="#a5f3fc" opacity={0.7} />
        <Stars radius={40} depth={30} count={1200} factor={3} saturation={0} fade speed={0.6} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Suspense>
    </Canvas>
  );
}