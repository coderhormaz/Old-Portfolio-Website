"use client";
import React, { Suspense, memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = ({ detail = 48 }: { detail?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, detail, detail]} scale={1.5}>
      <MeshDistortMaterial
        color="#F59E0B"
        attach="material"
        distort={0.4}
        speed={1.2}
        roughness={0.2}
        metalness={0.8}
        emissive="#92400E"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particlesRef = useRef<THREE.Group>(null);
  const particlePositions = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      const radius = 3.5 + (index % 3) * 0.9;
      const height = ((index % 6) - 2.5) * 0.75;

      return [
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      ] as [number, number, number];
    });
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={particlesRef}>
      {particlePositions.map((position, i) => (
        <mesh
          key={i}
          position={position}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
      ))}
    </group>
  );
};

const Hero3D = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reduced motion: render a static gradient orb instead of WebGL —
  // zero GPU cost, zero scroll interference.
  if (prefersReducedMotion) {
    return (
      <div
        className="relative h-full w-full flex items-center justify-center"
        aria-hidden
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-amber-500/40 via-orange-600/20 to-transparent blur-2xl" />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full overflow-visible"
      // Allow vertical page scroll when the gesture starts on the canvas.
      style={{ touchAction: "pan-y" }}
    >
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 6], fov: 65 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.75]}
        // Stop the render loop entirely while the hero is offscreen.
        frameloop={isVisible ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          {/* Lights only — the previous Environment preset="night" fetched a
              remote HDR at runtime, blocking first paint and adding GPU cost. */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#F59E0B" />
          <pointLight position={[-10, -10, -10]} intensity={0.35} color="#3B82F6" />

          {/* 3D Objects (lighter geometry on touch devices) */}
          <AnimatedSphere detail={isCoarsePointer ? 32 : 48} />
          <FloatingParticles count={isCoarsePointer ? 12 : 20} />

          {/* Controls: user rotation disabled so touch-drag scrolls the page
              instead of spinning the scene (the "unable to scroll" culprit).
              Gentle auto-rotation keeps the visual alive. */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(Hero3D);
