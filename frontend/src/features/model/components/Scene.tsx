import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import {
  Center,
  ContactShadows,
  OrbitControls,
  Preload,
  useProgress,
} from "@react-three/drei";
import CircularProgress from "@mui/material/CircularProgress";
import New from "./New";
import * as THREE from "three";
import { Material } from "../../../services/materialSlice";
import { loadGLTF } from "../../../utils/loadGltf";
import { createMaterial } from "../../../utils/createMaterial";

interface ModelMaterials {
  baseMtlTextures: Material;
  legsMtlTextures?: Material | null;
  glbUrl: string;
}

const Scene = ({
  baseMtlTextures,
  legsMtlTextures,
  glbUrl,
}: ModelMaterials) => {
  const { progress } = useProgress();
  const [gltf, setGLTF] = useState<THREE.Group | null>(null);
  const [baseMaterial, setBaseMaterial] =
    useState<THREE.MeshStandardMaterial | null>(null);
  const [legsMaterial, setLegsMaterial] =
    useState<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const loadGroup = async () => {
      const group = await loadGLTF(glbUrl);
      setGLTF(group);
    };
    if (glbUrl) loadGroup();

    return () => {
      if (gltf) {
        gltf.traverse((child: any) => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      }
    };
  }, [glbUrl]);

  useEffect(() => {
    const loadMaterial = async () => {
      if (baseMtlTextures) {
        const baseMtl = await createMaterial(
          baseMtlTextures.ref,
          baseMtlTextures.repeat
        );
        setBaseMaterial(baseMtl);
      }
    };
    loadMaterial();

    return () => {
      if (baseMaterial) baseMaterial.dispose();
    };
  }, [baseMtlTextures]);

  useEffect(() => {
    const loadMaterial = async () => {
      if (legsMtlTextures) {
        const legsMtl = await createMaterial(
          legsMtlTextures.ref,
          legsMtlTextures.repeat
        );
        setLegsMaterial(legsMtl);
      }
    };
    loadMaterial();

    return () => {
      if (legsMaterial) legsMaterial.dispose();
    };
  }, [legsMtlTextures]);

  const backgroundColor = "#f0f0f0";

  const style = {
    canvasBlured: `blur-sm `,
    canvas: `transition-[filter] duration-300 ease-in-out `,
  };

  return (
    <>
      {gltf && baseMaterial ? (
        <Canvas
          shadows
          camera={{
            position: [10, 5, 50],
            fov: 30,
            near: 0.1,
            far: 150,
          }}
          className={`${progress < 100 && style.canvasBlured} ${style.canvas}`}
        >
          <Preload all />
          <ambientLight intensity={4} />

          <OrbitControls minDistance={0} maxDistance={80} makeDefault />
          <Center>
            <directionalLight
              scale={[2, 2, 2]}
              position={[10, 15, 10]}
              intensity={5}
              castShadow
              shadow-mapSize-width={512}
              shadow-mapSize-height={512}
            />
            <directionalLight
              position={[-11, 15, -10]}
              intensity={5}
              castShadow
              shadow-mapSize-width={512}
              shadow-mapSize-height={512}
            />

            <New
              baseMaterial={baseMaterial}
              legsMaterial={legsMaterial}
              gltf={gltf}
            />
            <ContactShadows
              frames={1}
              position={[0, -0.01, 0]}
              opacity={0.25}
              scale={[20, 20]}
              blur={2}
              far={20}
              resolution={256}
              color="#000000"
            />
          </Center>
        </Canvas>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Scene;

// //fix z-index
// function Scene({ baseMtlTextures, legsMtlTextures, glbUrl }: ModelMaterials) {
//   const { progress } = useProgress();

//   const backgroundColor = "#f0f0f0";

//   const style = {
//     canvasBlured: `blur-sm `,
//     canvas: `transition-[filter] duration-300 ease-in-out w-full h-[800px]`,
//   };
//   return (
//     <>
//       {progress < 100 && (
//         <>
//           <div>Loading....</div>
//           <CircularProgress />
//         </>
//       )}
//       <Canvas
//         frameloop="demand"
//         camera={{ position: [0, 20, 100] }}
//         // style={{ width: "100%", height: "800px" }}
//         className={`${progress < 100 ? style.canvasBlured : style.canvas} ${
//           style.canvas
//         }`}
//       >
//         <Preload all />
//         <color args={[backgroundColor]} attach="background" />
//         <ambientLight intensity={5} />
//         <directionalLight position={new Vector3(-0.6, 1.5, 1)} intensity={4} />
//         <OrbitControls />
//         {baseMtlTextures && (
//           <New
//             position={new Vector3(0, -40, 0)}
//             baseMtlTextures={baseMtlTextures}
//             legsMtlTextures={legsMtlTextures}
//             glbUrl={glbUrl}
//           />
//         )}
//       </Canvas>
//     </>
//   );
// }

// export default Scene;
// function Scene() {
//   const lightRef = useRef<THREE.DirectionalLight>(null!);
//   const backgroundColor = "#f0f0f0";
//   return (
//     <Canvas shadows style={{ width: "100%", height: "800px" }}>
//       <color args={[backgroundColor]} attach="background" />
//       <ambientLight intensity={15} />
//       <directionalLight ref={lightRef} position={[15, 15, -15]} intensity={5} />
//       <directionalLight ref={lightRef} position={[15, 15, 15]} intensity={5} />
//       <OrbitControls />
//       <Model />
//     </Canvas>
//   );
// }
