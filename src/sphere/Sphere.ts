import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { Events } from "../Enums";
import { EPS_SQ, MAX_JEWELS, SETTINGS } from "../settings/settingsValues";
import { NecklaceModel } from "../necklace/NecklaceModel";
import { ComponentOptions, NecklaceComponent } from "../necklace/NecklaceComponent";
import { Resizer } from "./Resizer";
import { persistentState } from "../settings/PersistentState";
import { showStats, stats } from "./Stats";
import { createOctantGeometry } from "./octantGeometry";

// The GLSL shaders
import vertexShader from "./shaders/sphere.vert";
import fragmentShader from "./shaders/sphere.frag";


const mouse = {
  x: 0,
  y: 0,
};

/**
 * One eighth of the sphere, as its own meshes: Spread octants moves the group
 * away from the origin, so no triangle ever spans two octants.
 */
type Octant = {
  /** The signs of (x, y, z) in this octant. */
  signs: THREE.Vector3;
  group: THREE.Group;
  faces: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;
  wireframe: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
};

class Sphere extends NecklaceComponent {
  /** The last cut applied from the pointer; any point that is not one to start with. */
  #lastInterSect = new THREE.Vector3(-1.0, 20, -30);
  // Set in initializeCanvas, which the constructor calls (through domElement).
  #scene!: THREE.Scene;
  #raycaster!: THREE.Raycaster;
  #camera!: THREE.PerspectiveCamera;
  #renderer!: THREE.WebGLRenderer;
  #octants!: Octant[];
  #material!: THREE.ShaderMaterial;
  #wireframeMaterial!: THREE.MeshBasicMaterial;
  #orbitControls!: OrbitControls;
  #group!: THREE.Group;
  #axesHelper!: THREE.AxesHelper;
  #resizer!: Resizer;
  #lastRender: DOMHighResTimeStamp | undefined;
  /**
   * The view is drawn only when something changed: the camera, the pointer, the
   * size, the theme, the sphere or its material. Set this when adding anything
   * else that changes the picture. The rotation animation draws every frame.
   */
  #needsRender = true;
  /** Whether the rotation animation ran in the last frame, to draw once more when it stops. */
  #wasRotating = false;
  /**
   * What the octants' geometry was built for: the Borsuk-Ulam shape depends on
   * the necklace and on Discrete, the sphere on neither.
   */
  #geometryKey = "";

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "sphere", container: document.body }
  ) {
    super(model, options);
    this.canvas = this.domElement;
  }

  initializeCanvas(): HTMLCanvasElement {
    this.#scene = new THREE.Scene();

    this.#raycaster = new THREE.Raycaster();
    this.#camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.#renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = this.#renderer.domElement;
    this.container.appendChild(canvas);
    this.#resizer = new Resizer(this.container, this.#camera, this.#renderer);

    this.#material = this.createSphereMaterial();
    this.#wireframeMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.#octants = this.createOctants();

    this.#axesHelper = new THREE.AxesHelper(20);
    this.#axesHelper.visible = SETTINGS.view.axes_visible;

    this.#group = new THREE.Group();
    this.#group.add(...this.#octants.map((octant) => octant.group), this.#axesHelper);
    this.#scene.add(this.#group);
    this.arrangeOctants();

    this.#orbitControls = new OrbitControls(
      this.#camera,
      this.#renderer.domElement
    );
    this.#camera.position.z = 50;
    const stored = persistentState.state.camera;
    if (stored) {
      this.#camera.position.fromArray(stored.position);
      this.#camera.up.fromArray(stored.up);
      this.#orbitControls.target.fromArray(stored.target);
    }
    this.#orbitControls.update();
    this.#orbitControls.addEventListener("change", () => {
      this.#needsRender = true;
      persistentState.update({
        camera: {
          position: this.#camera.position.toArray(),
          target: this.#orbitControls.target.toArray(),
          up: this.#camera.up.toArray(),
        },
      });
    });
    this.#resizer.onResize = () => this.#needsRender = true;
    this.container.addEventListener(Events.CREATE_SPHERE.toString(), () =>
      this.createSphere()
    );

    this.container.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
      this.#needsRender = true;
    });

    this.container.addEventListener(
      Events.UPDATE_SPHERE_MATERIAL.toString(),
      () => this.updateSphereMaterial()
    );
    this.container.addEventListener(Events.UPDATE_VISIBLE.toString(), () =>
      this.updateVisibility()
    );
    this.container.addEventListener(Events.THEME_CHANGED.toString(), () =>
      this.updateVisibility()
    );
    return canvas;
  }

  onMutation(mutation: MutationRecord): void {
    // console.log(`onMutation: ${JSON.stringify(this)}`);
    const style = window.getComputedStyle(this.container);
    const backgroundColor = style.getPropertyValue("background-color");
    this.#scene.background = new THREE.Color(backgroundColor);
    // The wireframe in the theme's color: white, its default, vanishes on the light theme.
    const meshColor = style.getPropertyValue("--mesh-color").trim();
    if (meshColor) {
      this.#wireframeMaterial.color.set(meshColor);
    }
    this.#needsRender = true;
  }

  get captureElement(): HTMLElement {
    return this.#renderer.domElement;
  }

  render() {
    const callback: FrameRequestCallback = (time: DOMHighResTimeStamp) => {
      if (this.#lastRender === undefined) {
        this.#lastRender = time;
      }
      const rotating = SETTINGS.animation.run || SETTINGS.animation.trigger_reset;
      if (this.#needsRender || rotating || this.#wasRotating) {
        this.#needsRender = false;
        this._render(time - this.#lastRender);
      }
      this.#wasRotating = rotating;
      this.#lastRender = time;
      requestAnimationFrame(callback);
    };
    callback((performance || Date).now());
  }

  _render(delta: DOMHighResTimeStamp) {
    stats.begin();

    // required if controls.enableDamping or controls.autoRotate are set to true
    this.#orbitControls.update();
    // The pointer is hit-tested before drawing, so the hover marker is drawn in the same frame.
    if (SETTINGS.view.faces_visible || SETTINGS.view.mesh_visible) {
      this.#raycaster.setFromCamera(mouse as THREE.Vector2, this.#camera);
      // The faces are hit even while only the wireframe is shown; hidden octants are not.
      const shown = this.#octants.filter((octant) => octant.group.visible).map((octant) => octant.faces);
      const intersects = this.#raycaster.intersectObjects(shown, false);
      const uniforms = this.#material.uniforms;
      const hit = intersects[0];
      if (hit && hit.face && hit.barycoord && !SETTINGS.animation.run) {
        // The cuts the hit stands for, from the geometry's `cut` attribute: the
        // point on the sphere, wherever the octant was moved and whatever the shape.
        const cut = (hit.object as THREE.Mesh).geometry.getAttribute("cut") as THREE.BufferAttribute;
        const { a, b, c } = hit.face;
        const point = THREE.Triangle.getInterpolatedAttribute(cut, a, b, c, hit.barycoord, new THREE.Vector3()).normalize();
        uniforms.u_intersect.value = point;
        this._setIntersect(point);
      } else {
        uniforms.u_intersect.value = new THREE.Vector3();
        this.domElement.style.cursor = "auto";
      }
    }
    if (SETTINGS.animation.trigger_reset) {
      SETTINGS.animation.trigger_reset = false;
      this.#group.rotation.x = 0;
      this.#group.rotation.y = 0;
      this.#group.rotation.z = 0;
    } else if (SETTINGS.animation.run) {
      const ROT_FACTOR = (Math.PI * delta) / 500;
      this.#group.rotation.x += SETTINGS.animation.rotation_x * ROT_FACTOR;
      this.#group.rotation.y += SETTINGS.animation.rotation_y * ROT_FACTOR;
      this.#group.rotation.z += SETTINGS.animation.rotation_z * ROT_FACTOR;
    }
    this.#renderer.render(this.#scene, this.#camera);
    stats.end();
  }

  /** Applies the cut at a point of the unit sphere. */
  _setIntersect(point: THREE.Vector3) {
    if (point.distanceToSquared(this.#lastInterSect) > EPS_SQ) {
      this.domElement.style.cursor = "none";
      this.#lastInterSect = point;
      this.model.applyCut(point.clone());
    }
  }

  /** Rebuilds the octants' geometry and the material: after Radius or Segments. */
  createSphere() {
    this.#geometryKey = "";
    this.updateSphereMaterial();
  }

  /**
   * Builds the octants' geometry again if what it depends on changed: with the
   * Borsuk-Ulam shape, the necklace and Discrete; the sphere depends on neither.
   */
  updateGeometry(): void {
    const shape = SETTINGS.sphere.show_borsuk_ulam_proof_shape;
    const key = shape
      ? `shape ${SETTINGS.necklace.discrete} ${this.model.necklace.join("")}`
      : "sphere";
    if (key === this.#geometryKey) {
      return;
    }
    this.#geometryKey = key;
    for (const octant of this.#octants) {
      octant.faces.geometry.dispose();
      const geometry = this.createOctantGeometry(octant.signs);
      octant.faces.geometry = geometry;
      octant.wireframe.geometry = geometry;
    }
  }

  /** The eight octants, each with its faces and its wireframe sharing one geometry and the common materials. */
  createOctants(): Octant[] {
    const octants: Octant[] = [];
    for (const x of [1, -1]) {
      for (const y of [1, -1]) {
        for (const z of [1, -1]) {
          const signs = new THREE.Vector3(x, y, z);
          const geometry = this.createOctantGeometry(signs);
          const faces = new THREE.Mesh(geometry, this.#material);
          const wireframe = new THREE.Mesh(geometry, this.#wireframeMaterial);
          const group = new THREE.Group();
          group.add(faces, wireframe);
          octants.push({ signs, group, faces, wireframe });
        }
      }
    }
    return octants;
  }

  /** An octant of the sphere, or of the Borsuk-Ulam shape when that is shown (see octantGeometry.ts). */
  createOctantGeometry(signs: THREE.Vector3): THREE.BufferGeometry {
    const shares = SETTINGS.sphere.show_borsuk_ulam_proof_shape
      ? (point: THREE.Vector3) => this.model.shares(point)
      : undefined;
    return createOctantGeometry(signs, SETTINGS.sphere.radius, SETTINGS.sphere.segments, shares);
  }

  /**
   * Places the octants: Spread octants moves each one away from the origin, and
   * Undivided octants shows or hides the two where one thief gets everything.
   */
  arrangeOctants(): void {
    const offset = SETTINGS.sphere.offset_octant;
    for (const octant of this.#octants) {
      const { signs } = octant;
      const undivided = signs.x === signs.y && signs.y === signs.z;
      octant.group.position.copy(signs).multiplyScalar(offset);
      octant.group.visible = SETTINGS.view.show_single_thiefs_region || !undivided;
      octant.faces.visible = SETTINGS.view.faces_visible;
      octant.wireframe.visible = SETTINGS.view.mesh_visible;
    }
  }

  /**
   * Creates a new instance of ShaderMaterial.
   *
   * @returns new instance of ShaderMaterial
   */
  createSphereMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,

      side: THREE.DoubleSide,
      transparent: true,

      // pass #define to GLSL files
      defines: this.defines,
      uniforms: this.uniforms,
    });
  }
  get defines() {
    return {
      MAX_JEWELS: Math.max(1, this.model.necklace.length),
    };
  }

  get uniforms() {
    return {
      u_necklace_discrete: {
        type: "b",
        value: SETTINGS.necklace.discrete,
      },
      u_input: { type: "i", value: this.model.necklace },
      u_count_0: { type: "i", value: this.model.count_0 },
      u_count_1: { type: "i", value: this.model.count_1 },
      u_scale_color: {
        type: "v3",
        value: new THREE.Vector3(
          SETTINGS.color.scale_red,
          SETTINGS.color.scale_green,
          SETTINGS.color.scale_blue
        ),
      },
      u_epsilon: { type: "f", value: SETTINGS.necklace.epsilon },
      u_show_solution_band: {
        type: "b",
        value: SETTINGS.necklace.show_solution_band,
      },
      u_show_solutions: { type: "b", value: SETTINGS.necklace.show_solutions },
      u_alpha: { type: "f", value: SETTINGS.color.alpha },
      u_time: { type: "f", value: 1.0 },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2(
          this.#renderer.domElement.width,
          this.#renderer.domElement.height
        ),
      },
      u_intersect: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
    };
  }

  /**
   * Updates the ShaderMaterial of the sphere, based on current settings, and
   * the geometry if the Borsuk-Ulam shape needs it.
   */
  updateSphereMaterial(): void {
    this.updateGeometry();
    this.#material.dispose();
    this.#material = this.createSphereMaterial();
    for (const octant of this.#octants) {
      octant.faces.material = this.#material;
    }
    this.#wireframeMaterial.transparent = SETTINGS.color.alpha != 1.0;
    this.#needsRender = true;
    Events.dispatchEvent(Events.MODEL_CHANGED);
  }

  updateVisibility(): void {
    this.#axesHelper.visible = SETTINGS.view.axes_visible;
    this.arrangeOctants();
    showStats(SETTINGS.view.stats_monitor_visible);
    this.#needsRender = true;
    Events.dispatchEvent(Events.MODEL_CHANGED);
  }
}

export { Sphere };
