import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

interface NewProps {
  baseMaterial: THREE.MeshStandardMaterial;
  legsMaterial?: THREE.MeshStandardMaterial | null;
  gltf: THREE.Group;
}

const New = ({ baseMaterial, legsMaterial, gltf, ...props }: NewProps) => {
  const ref = useRef<THREE.Group>(null);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    gltf.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        // child.receiveShadow = true;
        if (child.name.includes("Base")) {
          child.material = baseMaterial;
          child.material.displacementScale = 0.1;
        } else if (legsMaterial) {
          child.material = legsMaterial;
          child.material.displacementScale = 0.1;
        }
      }
    });

    const timer = setTimeout(() => {
      setRotate(true);
    }, 2000); //value for a longer or shorter delay

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
    <group ref={ref} scale={[0.2, 0.2, 0.2]} position={[0, 0, 0]} {...props}>
      <primitive object={gltf} />
    </group>
  );
};

export default New;

// interface ModelTextures {
//   baseMtlTextures: Material;
//   legsMtlTextures?: Material | null;
//   glbUrl: string;
// }

// type GLTFResult = GLTF & {
//   nodes: Record<string, THREE.Mesh>;
//   materials: Record<string, THREE.MeshStandardMaterial>;
// };

// const New = (props: JSX.IntrinsicElements["group"] & ModelTextures) => {
//   const gltf = useLoader(GLTFLoader, props.glbUrl, (loader) => {
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("/draco/");
//     loader.setDRACOLoader(dracoLoader);
//     dracoLoader.setDecoderConfig({ type: "js" });
//   });

//   const baseMtl = useCreateMaterial(
//     props.baseMtlTextures.ref,
//     props.baseMtlTextures.repeat
//   );
//   const legsMtl = props.legsMtlTextures
//     ? useCreateMaterial(props.legsMtlTextures.ref, props.legsMtlTextures.repeat)
//     : null;

//   return (
//     <group {...props} dispose={null}>
//       {gltf.scene.children.map((child: THREE.Object3D) => {
//         if (child instanceof THREE.Mesh) {
//           const material = child.name.includes("Base") ? baseMtl : legsMtl;
//           return (
//             <mesh
//               key={child.uuid}
//               geometry={child.geometry}
//               rotation={child.rotation}
//             >
//               <meshStandardMaterial {...material} displacementScale={0.1} />
//             </mesh>
//           );
//         }
//       })}
//     </group>
//   );
// };

// export default New;
