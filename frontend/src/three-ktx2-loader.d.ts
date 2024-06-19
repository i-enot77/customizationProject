declare module "three/examples/jsm/loaders/KTX2Loader" {
  import { LoadingManager, DataTexture } from "three";

  export class KTX2Loader {
    constructor(manager?: LoadingManager);
    setTranscoderPath(path: string): this;
    detectSupport(renderer: any): this;
    load(
      url: string,
      onLoad: (texture: DataTexture) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
