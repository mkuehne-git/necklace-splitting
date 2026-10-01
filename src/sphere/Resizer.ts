import type * as THREE from "three";

/**
 * How far the sphere is drawn above the middle, as a part of the height: the
 * necklace covers the bottom. Shifts the projection only, so the camera and
 * the orbit's target (both remembered) stay as they are, and the raycast,
 * which goes through the projection, follows.
 */
const VIEW_SHIFT = 0.1;

class Resizer {
  constructor(
    container: HTMLElement,
    camera: THREE.PerspectiveCamera = undefined as any,
    renderer: THREE.WebGLRenderer = undefined as any
  ) {
    // set initial size on load
    this.setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set the size again if a resize occurs
      this.setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }
  private setSize(
    container: HTMLElement,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    const width = Math.min(innerWidth, container.clientWidth);
    const height = Math.min(innerHeight, container.clientHeight);

    // console.log(`setSize width: ${width}, height: ${height}`);
    if (camera !== undefined) {
      camera.aspect = width / height;
      camera.setViewOffset(width, height, 0, VIEW_SHIFT * height, width, height);
    }

    if (renderer !== undefined) {
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
    }
  }

  onResize() {}
}

export { Resizer };
