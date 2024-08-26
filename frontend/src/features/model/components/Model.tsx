import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

interface ModelProps {
  baseMaterial: THREE.MeshStandardMaterial;
  legsMaterial: THREE.MeshStandardMaterial | null;
  gltf: THREE.Group;
}

const Model = ({ baseMaterial, legsMaterial, gltf, ...props }: ModelProps) => {
  const ref = useRef<THREE.Group>(null);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    gltf.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        if (child.name.includes("Base")) {
          child.material = baseMaterial;
          child.material.displacementScale = 0.1;
        } else if (child.name.includes("Legs") && legsMaterial) {
          child.material = legsMaterial;
          child.material.displacementScale = 0.1;
        } else {
          //  default material from .glb file
          child.material.displacementScale = 0.1;
        }
      }
    });

    const timer = setTimeout(() => {
      setRotate(true);
    }, 0.5); //value for a longer or shorter delay of model rotation (after init load)

    return () => {
      clearTimeout(timer);
    };
  }, [gltf, baseMaterial, legsMaterial]);

  // useFrame(() => {
  //   if (ref.current && rotate) {
  //     ref.current.rotation.y += 0.001; //value for slower or faster rotation
  //   }
  // });

  return (
    <group ref={ref} scale={[0.2, 0.2, 0.2]} {...props}>
      <primitive object={gltf} />
    </group>
  );
};

export default Model;
