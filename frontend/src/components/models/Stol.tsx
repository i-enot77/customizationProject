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

const Stol = (props: JSX.IntrinsicElements["group"]) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  const marble = useTexture({
    map: "/materials/marble01/color.jpg",
    displacementMap: "/materials/marble01/displacement.jpg",
    normalMap: "/materials/marble01/normal.jpg",
    roughnessMap: "/materials/marble01/roughness.jpg",
    aoMap: "/materials/marble01/ambientOcclusion.jpg",
  });

  const { nodes, materials } = useGLTF(
    "/model/stol-transformed.glb"
  ) as GLTFResult;
  return (
    <>
      <color args={["gray"]} attach="background" />
      <ambientLight intensity={2} />
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={7} />
      <OrbitControls />
      <group {...props} dispose={null}>
        <mesh geometry={nodes.AM_138_006_obj_03.geometry}>
          <meshStandardMaterial {...marble} />
        </mesh>
        <mesh
          geometry={nodes.AM_138_006_obj_02.geometry}
          material={materials.Material__26}
        />
      </group>
    </>
  );
};

useGLTF.preload("/model/stol-transformed.glb");

export default Stol;
