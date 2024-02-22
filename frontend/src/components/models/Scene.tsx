import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Stol from "./Stol";

function Scene() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  return (
    <Canvas shadows style={{ width: "500px", height: "500px" }}>
      <color args={["gray"]} attach="background" />
      <ambientLight intensity={2} />
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={7} />
      <Stol />
    </Canvas>
  );
}

export default Scene;
