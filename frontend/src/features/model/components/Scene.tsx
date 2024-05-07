import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Stol from "./Stol";
import New from "./New";
import { Material } from "../../../services/materialSlice";

interface ModelMaterials {
  baseMaterial: Material;
  legsMaterial?: Material;
}

// function Scene() {
//   const lightRef = useRef<THREE.DirectionalLight>(null!);
//   return (
//     <Canvas shadows style={{ width: "100%", height: "800px" }}>
//       <color args={["white"]} attach="background" />
//       <ambientLight intensity={5} />
//       <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={9} />
//       {/* <directionalLight ref={lightRef} position={[-5, 10, 10]} intensity={9} /> */}
//       <Stol />
//     </Canvas>
//   );
// }

//fix z-index
function Scene({ baseMaterial, legsMaterial }: ModelMaterials) {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  return (
    <Canvas shadows style={{ width: "100%", height: "800px" }}>
      <color args={["white"]} attach="background" />
      <ambientLight intensity={5} />
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={9} />
      {baseMaterial && (
        <New baseMaterial={baseMaterial} legsMaterial={legsMaterial} />
      )}
    </Canvas>
  );
}

export default Scene;
