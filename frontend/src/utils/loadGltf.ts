import { DRACOLoader, GLTFLoader } from "three-stdlib";

export const loadGLTF = async (url: string): Promise<THREE.Group> => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
  dracoLoader.setDecoderConfig({ type: "js" });

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf.scene), // Resolve with gltf.scene for THREE.Group type
      undefined,
      (error) => reject(error)
    );
  });
};
