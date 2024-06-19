import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import * as THREE from "three";
import { REVISION } from "three";

const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
const ktx2Loader = new KTX2Loader();
ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);
ktx2Loader.detectSupport(new THREE.WebGLRenderer());

export const createMaterial = async (
  materialTextures?: { [key: string]: string },
  repeat?: number
): Promise<THREE.MeshStandardMaterial | null> => {
  if (!materialTextures) {
    return null;
  }

  const newTextures: Record<string, THREE.Texture> = {};
  const loadPromises = Object.entries(materialTextures).map(([key, path]) => {
    if (path) {
      return new Promise<void>((resolve) => {
        ktx2Loader.load(
          path,
          (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            if (repeat) {
              texture.repeat.set(repeat, repeat);
            }
            newTextures[key] = texture;
            resolve();
          },
          undefined,
          (e) => {
            console.error(`Error loading texture ${path}:`, e);
            resolve();
          }
        );
      });
    }
    return Promise.resolve();
  });

  await Promise.all(loadPromises);

  const materialParams: THREE.MeshStandardMaterialParameters | undefined = {};
  if (newTextures.map) materialParams.map = newTextures.map;
  if (newTextures.displacementMap)
    materialParams.displacementMap = newTextures.displacementMap;
  if (newTextures.normalMap) materialParams.normalMap = newTextures.normalMap;
  if (newTextures.roughnessMap)
    materialParams.roughnessMap = newTextures.roughnessMap;
  if (newTextures.aoMap) materialParams.aoMap = newTextures.aoMap;
  if (newTextures.metalnessMap)
    materialParams.metalnessMap = newTextures.metalnessMap;

  return new THREE.MeshStandardMaterial(materialParams);
};

// import { useEffect, useState } from "react";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// import * as THREE from "three";
// import { REVISION } from "three";

// const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
// const ktx2Loader = new KTX2Loader();
// ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);
// ktx2Loader.detectSupport(new THREE.WebGLRenderer());

// export const createMaterial = (
//   materialTextures?: { [key: string]: string },
//   repeat?: number
// ): THREE.MeshStandardMaterial | null => {
//   // const [material, setMaterial] = useState<THREE.MeshStandardMaterial>();

//   // useEffect(() => {
//   let material:THREE.MeshStandardMaterial | null
//   if (!materialTextures) {
//     return material = null
//   }

//   const newTextures: Record<string, THREE.Texture> = {};
//   const loadPromises = Object.entries(materialTextures).map(([key, path]) => {
//     if (path) {
//       return new Promise<void>((resolve) => {
//         ktx2Loader.load(
//           path,
//           (texture) => {
//             texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//             if (repeat) {
//               texture.repeat.set(repeat, repeat);
//             }
//             newTextures[key] = texture;
//             resolve();
//           },
//           undefined,
//           (e) => {
//             console.error(`Error loading texture ${path}:`, e);
//             resolve();
//           }
//         );
//       });
//     }
//     return Promise.resolve();
//   });

//   Promise.all(loadPromises).then(() => {
//     const materialParams: any = {};
//     if (newTextures.map) materialParams.map = newTextures.map;
//     if (newTextures.displacementMap)
//       materialParams.displacementMap = newTextures.displacementMap;
//     if (newTextures.normalMap) materialParams.normalMap = newTextures.normalMap;
//     if (newTextures.roughnessMap)
//       materialParams.roughnessMap = newTextures.roughnessMap;
//     if (newTextures.aoMap) materialParams.aoMap = newTextures.aoMap;
//     if (newTextures.metalnessMap)
//       materialParams.metalnessMap = newTextures.metalnessMap;

//     return(new THREE.MeshStandardMaterial(materialParams));
//   });

//   // Cleanup
//   //   return () => {
//   //     Object.values(newTextures).forEach((texture) => texture.dispose());
//   //   };
//   // }, [materialTextures, repeat]);

//   return material;
// };

// import { useEffect, useState, useMemo } from "react";
// import { useThree } from "@react-three/fiber";
// // import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
// import * as THREE from "three";
// import { REVISION } from "three";

// const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
// const ktx2Loader = new KTX2Loader();
// ktx2Loader.setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`);

// export const useCreateMaterial = (
//   materialTextures?: { [key: string]: string },
//   repeat?: number
// ) => {
//   const { gl } = useThree();
//   const [textures, setTextures] = useState<
//     Record<string, THREE.Texture | null>
//   >({});

//   useEffect(() => {
//     if (!materialTextures) return;

//     ktx2Loader.detectSupport(gl);

//     const newTextures: Record<string, THREE.Texture | null> = {};

//     Object.entries(materialTextures).forEach(([key, path]) => {
//       if (path) {
//         ktx2Loader.load(
//           path,
//           (texture) => {
//             texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//             if (repeat) {
//               texture.repeat.set(repeat, repeat);
//             }
//             newTextures[key] = texture;
//             setTextures((prevTextures) => ({
//               ...prevTextures,
//               [key]: texture,
//             }));
//           },
//           undefined,
//           (e) => {
//             console.error(`Error loading texture ${path}:`, e);
//             newTextures[key] = null;
//             setTextures((prevTextures) => ({
//               ...prevTextures,
//               [key]: null,
//             }));
//           }
//         );
//       } else {
//         newTextures[key] = null;
//         setTextures((prevTextures) => ({
//           ...prevTextures,
//           [key]: null,
//         }));
//       }
//     });

//     return () => {
//       Object.values(newTextures).forEach((texture) => texture?.dispose());
//     };
//   }, [materialTextures, repeat, gl]);

//   const material = useMemo(() => {
//     const params: Record<string, THREE.Texture | null> = {};
//     if (textures.map) params.map = textures.map;
//     if (textures.normalMap) params.normalMap = textures.normalMap;
//     if (textures.roughnessMap) params.roughnessMap = textures.roughnessMap;
//     if (textures.metalnessMap) params.metalnessMap = textures.metalnessMap;
//     if (textures.aoMap) params.aoMap = textures.aoMap;
//     if (textures.displacementMap)
//       params.displacementMap = textures.displacementMap;

//     return new THREE.MeshStandardMaterial(params);
//   }, [textures]);

//   return material;
// };
