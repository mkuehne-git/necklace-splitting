import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Events, Showcase } from "./Enums";
import { EPS_SQ, MAX_JEWELS, Settings, SETTINGS } from "./Settings";
import { NecklaceModel } from "./NecklaceModel";
import { ComponentOptions, NecklaceComponent } from "./NecklaceComponent";
import { Resizer } from "./Resizer";
import { stats } from "./Stats";

// The GLSL shaders
import vertexShader from "./shaders/sphere.vert";
import fragmentShader from "./shaders/sphere.frag";


const mouse = {
  x: 0,
  y: 0,
};

class Sphere extends NecklaceComponent {
  // Just any vector
  #lastInterSect: THREE.Vector3;
  #scene: THREE.Scene;
  #raycaster: THREE.Raycaster;
  #camera: THREE.PerspectiveCamera;
  #renderer: THREE.WebGLRenderer;
  #sphere: THREE.Mesh;
  #orbitControls: OrbitControls;
  #sphereMesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshBasicMaterial
  >;
  #group: THREE.Group;
  #axesHelper: THREE.AxesHelper;
  #resizer: Resizer;
  #lastRender: DOMHighResTimeStamp;

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "sphere", container: document.body }
  ) {
    super(model, options);
    this.canvas = this.domElement;
    // Make sure that initial theme is propagated into the scene.
    // Use .body background-color for 3D scene
    this.onThemeChange();
  }

  initializeCanvas(): HTMLCanvasElement {
    this.#lastInterSect = new THREE.Vector3(-1.0, 20, -30);;
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

    this.#sphere = new THREE.Mesh(
      this.createSphereGeometry(),
      this.createSphereMaterial()
    );
    this.#sphere.visible = SETTINGS.view.faces_visible;

    this.#sphereMesh = new THREE.Mesh(
      this.createSphereGeometry(),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    this.#sphereMesh.visible = SETTINGS.view.mesh_visible;

    this.#axesHelper = new THREE.AxesHelper(20);
    this.#axesHelper.visible = SETTINGS.view.axes_visible;

    this.#group = new THREE.Group();
    this.#group.add(this.#sphere, this.#sphereMesh, this.#axesHelper);
    this.#scene.add(this.#group);

    this.#orbitControls = new OrbitControls(
      this.#camera,
      this.#renderer.domElement
    );
    this.#camera.position.z = 50;
    this.#orbitControls.update();
    this.container.addEventListener(Events.CREATE_SPHERE.toString(), () =>
      this.createSphere()
    );

    this.container.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
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
  }

  get captureElement(): HTMLElement {
    return this.#renderer.domElement;
  }

  render() {
    const callback: FrameRequestCallback = (time: DOMHighResTimeStamp) => {
      if (this.#lastRender === undefined) {
        this.#lastRender = time;
      }
      this._render(time - this.#lastRender);
      this.#lastRender = time;
      requestAnimationFrame(callback);
    };
    callback((performance || Date).now());
  }

  _render(delta: DOMHighResTimeStamp) {
    stats.begin();

    // required if controls.enableDamping or controls.autoRotate are set to true
    this.#orbitControls.update();
    this.#renderer.render(this.#scene, this.#camera);
    if (this.#sphere.visible || this.#sphereMesh.visible) {
      this.#raycaster.setFromCamera(mouse, this.#camera);
      const intersects = this.#raycaster.intersectObject(this.#sphere);
      const uniforms = (this.#sphere.material as THREE.ShaderMaterial).uniforms;
      if (intersects.length > 0 && !SETTINGS.animation.run) {
        const point = intersects[0].point.clone();
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
    stats.end();
  }

  _setIntersect(point: THREE.Vector3) {
    if (point.distanceToSquared(this.#lastInterSect) > EPS_SQ) {
      this.domElement.style.cursor = "none";
      this.#lastInterSect = point;
      const radius = SETTINGS.sphere.radius || 1.0;
      this.model.applyCut(point.clone().divideScalar(radius));
    }
  }

  onThemeChange() {
    const oldThemeStyle = SETTINGS.view.dark_theme ? "light" : "dark";
    const newThemeStyle = SETTINGS.view.dark_theme ? "dark" : "light";
    if (this.container.classList.contains(oldThemeStyle)) {
      this.container.classList.remove(oldThemeStyle);
    }
    this.container.classList.add(newThemeStyle);
  }

  createSphere() {
    this.#sphere.geometry.dispose();
    this.#sphereMesh.geometry.dispose();

    const geometry = this.createSphereGeometry();
    this.#sphere.geometry = geometry;
    this.#sphereMesh.geometry = geometry;

    this.updateSphereMaterial();
  }

  createSphereGeometry() {
    const segments = SETTINGS.sphere.segments;
    return new THREE.SphereGeometry(
      SETTINGS.sphere.radius,
      segments,
      segments / 2
    );
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
      MODE_STOLEN_NECKLACE: Showcase.STOLEN_NECKLACE,
      MODE_SHADER_LAMP: Showcase.SHADER_LAMP,
      MODE_SPACE_COLOR: Showcase.SPACE_COLOR,
      MODE_SINUSOID: Showcase.SINUSOID,
    };
  }

  get uniforms() {
    const offset = SETTINGS.sphere.offset_octant / SETTINGS.sphere.radius;
    return {
      u_mode: { type: "i", value: SETTINGS.int_mode },
      u_necklace_discrete: {
        type: "b",
        value: SETTINGS.necklace.discrete,
      },
      u_input: { type: "i", value: this.model.necklace },
      u_count_0: { type: "i", value: this.model.count_0 },
      u_count_1: { type: "i", value: this.model.count_1 },
      u_offset_sphere_octant: {
        type: "f",
        value: SETTINGS.sphere.offset_octant,
      },
      u_use_bad_on_sphere_check: {
        type: "b",
        value: SETTINGS.sphere.use_bad_on_sphere_check,
      },
      u_show_borsuk_ulam_proof_shape: {
        type: "b",
        value: SETTINGS.sphere.show_borsuk_ulam_proof_shape,
      },
      u_radius_vector: {
        type: "v3",
        value: new THREE.Vector3(
          SETTINGS.sphere.radius,
          SETTINGS.sphere.radius,
          SETTINGS.sphere.radius
        ),
      },
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
      u_show_single_thiefs_region: {
        type: "b",
        value: SETTINGS.view.show_single_thiefs_region,
      },
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
   * Updates the ShaderMaterial of the sphere, based on current settings.
   */
  updateSphereMaterial(): void {
    if (this.#sphere !== undefined) {
      (this.#sphere.material as THREE.ShaderMaterial).dispose();
    }
    this.#sphere.material = this.createSphereMaterial();
    this.#sphereMesh.material.transparent = SETTINGS.color.alpha != 1.0;
    Settings.dispatchEvent(Events.MODEL_CHANGED);
  }

  updateVisibility(): void {
    this.#axesHelper.visible = SETTINGS.view.axes_visible;
    this.#sphereMesh.visible = SETTINGS.view.mesh_visible;
    this.#sphere.visible = SETTINGS.view.faces_visible;
    stats["visible"](SETTINGS.view.stats_monitor_visible);
    Settings.dispatchEvent(Events.MODEL_CHANGED);
  }
}

export { Sphere };
