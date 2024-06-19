import * as THREE from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useTexture } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    AM_138_006_obj_03: THREE.Mesh;
    AM_138_006_obj_02: THREE.Mesh;
  };
  materials: {
    Material__25: THREE.MeshStandardMaterial;
    Material__26: THREE.MeshStandardMaterial;
  };
};
// type GLTFResult = GLTF & {
//   nodes: {
//     Archmodels_112_054_002: THREE.Mesh;
//   };
//   materials: {
//     Table_2: THREE.MeshStandardMaterial;
//   };
// };

const Stol = (props: JSX.IntrinsicElements["group"]) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  const fabric10 = useTexture({
    map: "/materials/wood/wood11/color.jpg",
    displacementMap: "/materials/wood/wood11/displacement.jpg",
    normalMap: "/materials/wood/wood11/normal.jpg",
    roughnessMap: "/materials/wood/wood11/roughness.jpg",
    aoMap: "/materials/wood/wood11/ambientOcclusion.jpg",
    // metalnessMap: "/materials/wood/wood11/metalness.jpg",
  });

  fabric10.map.repeat.set(1, 1);
  fabric10.displacementMap.repeat.set(1, 1);
  fabric10.normalMap.repeat.set(1, 1);
  fabric10.roughnessMap.repeat.set(1, 1);
  fabric10.aoMap.repeat.set(1, 1);

  fabric10.map.wrapS =
    fabric10.map.wrapT =
    fabric10.displacementMap.wrapS =
    fabric10.displacementMap.wrapT =
    fabric10.normalMap.wrapS =
    fabric10.normalMap.wrapT =
    fabric10.roughnessMap.wrapS =
    fabric10.roughnessMap.wrapT =
    fabric10.aoMap.wrapS =
    fabric10.aoMap.wrapT =
      THREE.RepeatWrapping;

  const { nodes } = useGLTF("/model/stol-transformed.glb") as GLTFResult;
  // const { nodes, materials } = useGLTF(
  //   "/models/112_054_table-transformed.glb"
  // ) as GLTFResult;
  return (
    <>
      <color args={["gray"]} attach="background" />
      <ambientLight intensity={2} />
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={7} />
      <OrbitControls />
      <group {...props} dispose={null}>
        <mesh geometry={nodes.AM_138_006_obj_03.geometry}>
          <meshStandardMaterial
            {...fabric10}
            displacementScale={0.1}
            // normalScale={new THREE.Vector2(0.5, 0.5)}
          />
        </mesh>
        <mesh geometry={nodes.AM_138_006_obj_02.geometry}>
          <meshStandardMaterial {...fabric10} displacementScale={0.1} />
        </mesh>
      </group>
      {/* <group {...props} dispose={null}>
        <mesh geometry={nodes.Archmodels_112_054_002.geometry}>
          <meshStandardMaterial {...fabric10} displacementScale={0.1} />
        </mesh>
      </group> */}
    </>
  );
};

useGLTF.preload("/models/112_054_table-transformed.glb");

export default Stol;
// const marble = useTexture({
//   map: "/materials/marble01/color.jpg",
//   displacementMap: "/materials/marble01/displacement.jpg",
//   normalMap: "/materials/marble01/normal.jpg",
//   roughnessMap: "/materials/marble01/roughness.jpg",
//   aoMap: "/materials/marble01/ambientOcclusion.jpg",
// });
