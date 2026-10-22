import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function webglAvailable() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

function Sculpture({ reduce, small }) {
  const group = useRef();
  const ring = useRef();
  useFrame((state, dt) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.05;
    if (!reduce && ring.current) { ring.current.rotation.z += dt * 0.25; ring.current.rotation.x += dt * 0.1; }
  });
  return (
    <group ref={group} scale={small ? 0.8 : 1}>
      <Float speed={reduce ? 0 : 1.4} floatIntensity={reduce ? 0 : 1.2} rotationIntensity={reduce ? 0 : 0.6}>
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial color="#b9a7ff" metalness={0.6} roughness={0.25} flatShading />
        </mesh>
        <mesh scale={1.35}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#7c8cff" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh ref={ring} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[2.1, 0.012, 8, 96]} />
          <meshBasicMaterial color="#f1eee8" transparent opacity={0.6} />
        </mesh>
      </Float>
      {!small && !reduce && <Sparkles count={30} scale={6} size={2} speed={0.3} color="#b9a7ff" />}
    </group>
  );
}

export default function Scene3D() {
  const [ok] = useState(webglAvailable);
  const [visible, setVisible] = useState(true);
  const reduce = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const small = useMemo(() => window.innerWidth < 600, []);

  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  if (!ok) {
    return <div role="img" aria-label="Decorative abstract shape" style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #b9a7ff, #3b3470 60%, transparent 72%)", opacity: 0.8 }} />;
  }
  return (
    <Canvas aria-hidden="true" camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, small ? 1.25 : 1.75]} frameloop={visible ? "always" : "never"} gl={{ antialias: !small, powerPreference: "low-power" }} style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={2} />
      <pointLight position={[-4, -2, 2]} intensity={8} color="#7c8cff" />
      <Sculpture reduce={reduce} small={small} />
    </Canvas>
  );
}
