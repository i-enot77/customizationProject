import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Loader,
  OrbitControls,
  Preload,
  useProgress,
} from "@react-three/drei";
import { Material } from "../../../services/materialSlice";
import { useLoadGLTF } from "../hooks/useLoadGLTF";
import { useCreateMaterial } from "../hooks/useCreateMaterial";
import Model from "./Model";

interface ModelMaterials {
  baseMtlTextures: Material;
  legsMtlTextures: Material | null;
  glbUrl: string;
}

const Scene = ({
  baseMtlTextures,
  legsMtlTextures,
  glbUrl,
}: ModelMaterials) => {
  const { active } = useProgress();
  const gltf = useLoadGLTF(glbUrl);
  const baseMaterial = useCreateMaterial(baseMtlTextures);
  const legsMaterial = legsMtlTextures
    ? useCreateMaterial(legsMtlTextures)
    : null;

  const style = {
    canvasBlured: `blur-sm `,
    canvas: `transition-[filter] duration-300 ease-in-out `,
  };

  const loaderStyles = {
    containerStyles: {
      position: "absolute" as "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10,
    },
    innerStyles: {
      display: "flex" as "flex",
      flexDirection: "column" as "column",
      justifyContent: "center" as "center",
      alignItems: "center" as "center",
      height: "100%",
    },
    barStyles: {
      width: "50%",
      height: "4px",
      backgroundColor: "#fff",
      margin: "16px 0",
    },
    dataStyles: {
      color: "#fff",
      fontSize: "16px",
    },
  };

  return (
    <>
      <Loader
        containerStyles={loaderStyles.containerStyles}
        innerStyles={loaderStyles.innerStyles}
        barStyles={loaderStyles.barStyles}
        dataStyles={loaderStyles.dataStyles}
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      />
      <Canvas
        data-testid="canvas"
        shadows
        camera={{
          position: [0, 6, 50],
          fov: 45,
          near: 0.1,
          far: 150,
        }}
        className={`${active && style.canvasBlured} ${style.canvas}`}
      >
        <Preload all />
        <ambientLight intensity={4} />
        <directionalLight
          scale={[2, 2, 2]}
          position={[10, 15, 10]}
          intensity={5}
          castShadow
        />
        <directionalLight position={[-11, 15, -10]} intensity={5} castShadow />
        <OrbitControls
          enablePan={false}
          minDistance={0}
          maxDistance={80}
          makeDefault
        />

        <Center position={[0, -10, 0]}>
          {/* <axesHelper args={[5]} /> */}
          <Model
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
  );
};

export default Scene;
