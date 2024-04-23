import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Stol from "./Stol";
import New from "./New";

function Scene() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  return (
    <Canvas shadows style={{ width: "1400px", height: "800px" }}>
      <color args={["white"]} attach="background" />
      <ambientLight intensity={5} />
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={9} />
      {/* <directionalLight ref={lightRef} position={[-5, 10, 10]} intensity={9} /> */}
      <Stol />
      {/* <New /> */}
    </Canvas>
  );
}

export default Scene;
