import { useEffect, useState } from "react";
import * as THREE from "three";
import { loadGLTF } from "../../../utils/loadGltf";

const defaultGlb = new THREE.Group();

export const useLoadGLTF = (glbUrl: string) => {
  const [gltf, setGLTF] = useState<THREE.Group>(defaultGlb);

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

  return gltf;
};
