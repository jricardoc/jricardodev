import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingParticles } from "./FloatingParticles";
import { HeroShape } from "./HeroShape";

export function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient Light */}
          <ambientLight intensity={0.3} />

          {/* Directional Light */}
          <directionalLight position={[10, 10, 5]} intensity={0.5} />

          {/* Floating Particles */}
          <FloatingParticles count={150} />

          {/* Hero Shape */}
          <HeroShape />

          {/* Fog for depth */}
          <fog attach="fog" args={["#0A0A0A", 8, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
