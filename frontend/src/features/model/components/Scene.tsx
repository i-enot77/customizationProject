import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useTransition } from "react";
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

  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
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
    });

    return () => {
      if (baseMaterial) baseMaterial.dispose();
    };
  }, [baseMtlTextures]);

  useEffect(() => {
    startTransition(() => {
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
    });

    return () => {
      if (legsMaterial) legsMaterial.dispose();
    };
  }, [legsMtlTextures]);

  const style = {
    canvasBlured: `blur-sm `,
    canvas: `transition-[filter] duration-300 ease-in-out `,
  };

  return (
    <>
      {(!gltf || !baseMaterial) && (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {gltf && baseMaterial && (
        <>
          {isPending && (
            <div className="absolute inset-0 flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
          <Canvas
            shadows
            camera={{
              position: [0, 16, 50],
              fov: 45,
              near: 0.1,
              far: 150,
            }}
            className={`${progress < 100 && style.canvasBlured} ${
              style.canvas
            }`}
          >
            <Preload all />
            <ambientLight intensity={4} />
            <directionalLight
              scale={[2, 2, 2]}
              position={[10, 15, 10]}
              intensity={5}
              castShadow
            />
            <directionalLight
              position={[-11, 15, -10]}
              intensity={5}
              castShadow
            />
            <OrbitControls minDistance={0} maxDistance={80} makeDefault />
            <axesHelper args={[5]} />
            <Center position={[0, 0, 0]}>
              <New
                baseMaterial={baseMaterial}
                legsMaterial={legsMaterial}
                gltf={gltf}
              />
              <ContactShadows
                frames={1}
                position={[0, -0.01, 0]}
                opacity={0.25}
                scale={[50, 50]}
                blur={3}
                far={20}
                resolution={256}
                color="#000000"
              />
            </Center>
          </Canvas>
        </>
      )}
    </>
  );
};

export default Scene;
