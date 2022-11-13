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
      camera.updateProjectionMatrix();
    }

    if (renderer !== undefined) {
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
    }
  }

  onResize() {}
}

export { Resizer };
