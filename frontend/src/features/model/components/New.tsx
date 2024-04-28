import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { Material } from "../../../services/materialSlice";

interface ModelTextures {
  baseMaterialTextures: Material["ref"];
  legsMaterialTextures?: Material["ref"];
}

type GLTFResult = GLTF & {
  nodes: {
    Archmodels_112_098_005: THREE.Mesh;
    Archmodels_112_098_003: THREE.Mesh;
  };
  materials: {
    Material__26: THREE.MeshStandardMaterial;
    Material__25: THREE.MeshStandardMaterial;
  };
};

const New = (props: JSX.IntrinsicElements["group"] & ModelTextures) => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  const createTexture = (materialTextures: Material["ref"]) => {
    const textureParams: Record<string, string> = {};
    if (materialTextures) {
      if (materialTextures.map) textureParams.map = materialTextures.map;
      if (materialTextures.displacementMap)
        textureParams.displacementMap = materialTextures.displacementMap;
      if (materialTextures.normalMap)
        textureParams.normalMap = materialTextures.normalMap;
      if (materialTextures.roughnessMap)
        textureParams.roughnessMap = materialTextures.roughnessMap;
      if (materialTextures.aoMap) textureParams.aoMap = materialTextures.aoMap;
      if (materialTextures.metalnessMap)
        textureParams.metalnessMap = materialTextures.metalnessMap;
    }
    const texture = useTexture(textureParams);

    // Set texture repeat and wrapping
    texture.map?.repeat.set(12, 12);
    texture.displacementMap?.repeat.set(12, 12);
    texture.normalMap?.repeat.set(12, 12);
    texture.roughnessMap?.repeat.set(12, 12);
    texture.aoMap?.repeat.set(12, 12);

    texture.map.wrapS =
      texture.map.wrapT =
      texture.displacementMap.wrapS =
      texture.displacementMap.wrapT =
      texture.normalMap.wrapS =
      texture.normalMap.wrapT =
      texture.roughnessMap.wrapS =
      texture.roughnessMap.wrapT =
        THREE.RepeatWrapping;
    if (texture.aoMap)
      texture.aoMap.wrapS = texture.aoMap.wrapT = THREE.RepeatWrapping;

    return texture;
  };

  const baseMtl = props.baseMaterialTextures
    ? createTexture(props.baseMaterialTextures)
    : undefined;
  const legsMtl = props.legsMaterialTextures
    ? createTexture(props.legsMaterialTextures)
    : undefined;

  const { nodes } = useGLTF("/new/112_098.gltf") as GLTFResult;
  return (
    props.baseMaterialTextures && (
      <>
        <color args={["gray"]} attach="background" />
        <ambientLight intensity={2} />
        <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={7} />
        <OrbitControls />

        <group {...props} dispose={null}>
          <mesh geometry={nodes.Archmodels_112_098_005.geometry}>
            <meshStandardMaterial {...legsMtl} />
          </mesh>
          <mesh geometry={nodes.Archmodels_112_098_003.geometry}>
            <meshStandardMaterial {...baseMtl} />
          </mesh>
        </group>
      </>
    )
  );
};

useGLTF.preload("/112_098.gltf");
export default New;
// const fabric10 = useTexture({
//   map: "/materials/fabric/fabric10/color.png",
//   displacementMap: "/materials/fabric/fabric10/displacement.png",
//   normalMap: "/materials/fabric/fabric10/normal.png",
//   roughnessMap: "/materials/fabric/fabric10/roughness.png",
//   aoMap: "/materials/fabric/fabric10/ambientOcclusion.png",
// });

// fabric10.map.repeat.set(12, 12);
// fabric10.displacementMap.repeat.set(12, 12);
// fabric10.normalMap.repeat.set(12, 12);
// fabric10.roughnessMap.repeat.set(12, 12);
// fabric10.aoMap.repeat.set(12, 12);

// fabric10.map.wrapS =
//   fabric10.map.wrapT =
//   fabric10.displacementMap.wrapS =
//   fabric10.displacementMap.wrapT =
//   fabric10.normalMap.wrapS =
//   fabric10.normalMap.wrapT =
//   fabric10.roughnessMap.wrapS =
//   fabric10.roughnessMap.wrapT =
//   fabric10.aoMap.wrapS =
//   fabric10.aoMap.wrapT =
//     THREE.RepeatWrapping;

// const leather06 = useTexture({
//   map: "/materials/leather/leather06/color.jpg",
//   displacementMap: "/materials/leather/leather06/displacement.jpg",
//   normalMap: "/materials/leather/leather06/normal.jpg",
//   roughnessMap: "/materials/leather/leather06/roughness.jpg",
//   aoMap: "/materials/leather/leather06/ambientOcclusion.jpg",
// });

// leather06.map.repeat.set(6, 6);
// leather06.displacementMap.repeat.set(6, 6);
// leather06.normalMap.repeat.set(6, 6);
// leather06.roughnessMap.repeat.set(6, 6);
// leather06.aoMap.repeat.set(6, 6);

// leather06.map.wrapS =
//   leather06.map.wrapT =
//   leather06.displacementMap.wrapS =
//   leather06.displacementMap.wrapT =
//   leather06.normalMap.wrapS =
//   leather06.normalMap.wrapT =
//   leather06.roughnessMap.wrapS =
//   leather06.roughnessMap.wrapT =
//   leather06.aoMap.wrapS =
//   leather06.aoMap.wrapT =
//     THREE.RepeatWrapping;

// const metal07 = useTexture({
//   map: "/materials/metal/metal07/color.png",
//   displacementMap: "/materials/metal/metal07/displacement.png",
//   normalMap: "/materials/metal/metal07/normal.png",
//   roughnessMap: "/materials/metal/metal07/roughness.png",
//   metalnessMap: "/materials/metal/metal07/metalness.png",
//   // aoMap: "/materials/marble01/ambientOcclusion.jpg",
// });

// metal07.map.repeat.set(1, 1);
// metal07.displacementMap.repeat.set(1, 1);
// metal07.normalMap.repeat.set(1, 1);
// metal07.roughnessMap.repeat.set(1, 1);
// marble.aoMap.repeat.set(4, 4);

// metal07.map.wrapS =
//   metal07.map.wrapT =
//   metal07.displacementMap.wrapS =
//   metal07.displacementMap.wrapT =
//   metal07.normalMap.wrapS =
//   metal07.normalMap.wrapT =
//   metal07.roughnessMap.wrapS =
//   metal07.roughnessMap.wrapT =
//   marble.aoMap.wrapS =
//   marble.aoMap.wrapT =
// THREE.RepeatWrapping;
