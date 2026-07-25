"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";

type Shard = {
  position: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  detail: 0 | 1;
  speed: number;
  rot: number;
};

/**
 * Faceted "crystals" weighted to the left / centre-left so they never sit over
 * the portrait. Each drifts (Float) and slowly self-rotates for life.
 */
function Crystal({ shard, reduced }: { shard: Shard; reduced: boolean }) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.x += delta * shard.rot;
    mesh.current.rotation.y += delta * shard.rot * 0.8;
  });

  return (
    <Float
      speed={reduced ? 0 : shard.speed}
      rotationIntensity={reduced ? 0 : 0.6}
      floatIntensity={reduced ? 0 : 1.1}
      position={shard.position}
    >
      <mesh ref={mesh} scale={shard.scale}>
        <icosahedronGeometry args={[1, shard.detail]} />
        <meshStandardMaterial
          color={shard.color}
          emissive={shard.emissive}
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.15}
          flatShading
        />
      </mesh>
    </Float>
  );
}

/** Large, faint wireframe sphere far back for depth. */
function BackShell({ reduced }: { reduced: boolean }) {
  const mesh = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y -= delta * 0.04;
  });
  return (
    <group ref={mesh} position={[-1.2, 0, -3]}>
      <mesh scale={3.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((state) => {
    const { camera } = state;
    camera.position.x += (target.current.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (target.current.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const SHARDS: Shard[] = [
  { position: [-1.25, -0.1, 0.3], scale: 1.25, color: "#7dd3fc", emissive: "#155e75", detail: 0, speed: 1.3, rot: 0.14 },
  { position: [-2.3, 0.7, -0.6], scale: 0.6, color: "#a5b4fc", emissive: "#3730a3", detail: 1, speed: 1.7, rot: 0.22 },
  { position: [-0.5, 1.15, -1.4], scale: 0.55, color: "#67e8f9", emissive: "#0e7490", detail: 0, speed: 2.0, rot: 0.26 },
  { position: [-2.0, -1.05, -1.2], scale: 0.7, color: "#818cf8", emissive: "#312e81", detail: 1, speed: 1.5, rot: 0.18 },
  { position: [0.35, -0.9, -0.8], scale: 0.5, color: "#7dd3fc", emissive: "#155e75", detail: 0, speed: 2.1, rot: 0.24 },
  { position: [-1.7, 1.35, -2.2], scale: 0.4, color: "#c7d2fe", emissive: "#3730a3", detail: 1, speed: 2.3, rot: 0.3 },
  { position: [0.7, 0.75, -2.6], scale: 0.5, color: "#38bdf8", emissive: "#0e7490", detail: 0, speed: 1.9, rot: 0.2 },
];

export default function HeroScene() {
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mb = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduced(rm.matches);
      setIsMobile(mb.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    mb.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      mb.removeEventListener("change", sync);
    };
  }, []);

  // Trim the shard count a touch on mobile.
  const shards = useMemo(() => (isMobile ? SHARDS.slice(0, 4) : SHARDS), [isMobile]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      dpr={[1, isMobile ? 1.3 : 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#0b1626", 6.5, 20]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 6]} intensity={2.0} />
        <pointLight position={[-4, -1, 3]} intensity={2.6} color="#818cf8" />
        <pointLight position={[-2, 3, -2]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[2, -2, 2]} intensity={1.2} color="#22d3ee" />

        <BackShell reduced={reduced} />
        {shards.map((shard, i) => (
          <Crystal key={i} shard={shard} reduced={reduced} />
        ))}

        <Sparkles
          count={isMobile ? 60 : 120}
          scale={[12, 8, 6]}
          size={2}
          speed={reduced ? 0 : 0.3}
          color="#bae6fd"
          opacity={0.7}
        />
        <Stars
          radius={50}
          depth={40}
          count={isMobile ? 800 : 2200}
          factor={3.5}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.7}
        />

        {!reduced && <CameraRig />}
      </Suspense>
    </Canvas>
  );
}
