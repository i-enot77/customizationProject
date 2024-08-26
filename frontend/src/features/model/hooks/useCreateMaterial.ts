import { useEffect, useState } from "react";
import * as THREE from "three";
import { createMaterial } from "../../../utils/createMaterial";
import { Material } from "../../../services/materialSlice";

const defaultMaterial = new THREE.MeshStandardMaterial();

export const useCreateMaterial = (materialTextures: Material) => {
  const [material, setMaterial] =
    useState<THREE.MeshStandardMaterial>(defaultMaterial);

  useEffect(() => {
    if (materialTextures) {
      createMaterial(materialTextures.ref, materialTextures.repeat)
        .then((createdMaterial) => {
          if (createdMaterial) setMaterial(createdMaterial);
        })
        .catch((error) => {
          console.error("Error creating material:", error);
        });
    }

    return () => {
      if (material) material.dispose();
    };
  }, [materialTextures]);

  return material;
};
