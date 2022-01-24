import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

import { Events, Showcase } from "./Enums";
import { EPS_SQ, MAX_JEWELS, Settings, SETTINGS } from "./Settings";
import NecklaceModel from "./NecklaceModel";
import { Resizer } from "./Resizer";

// The GLSL shaders
/// <reference path="./glsl.d.ts"/>
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { NecklaceComponent, ComponentOptions } from "./NecklaceComponent";

// The little statistics box at the upper left corner
const stats = Stats();
stats["visible"] = (visible: boolean) => {
  stats.domElement.style.visibility = visible ? "visible" : "hidden";
};
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
stats["visible"](SETTINGS.view.stats_monitor_visible);

const mouse = {
  x: 0,
  y: 0,
};

class Sphere extends NecklaceComponent {
  // Just any vector
  private _lastInterSect: THREE.Vector3;
  private _scene: THREE.Scene;
  private _raycaster: THREE.Raycaster;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _sphere: THREE.Mesh;
  private _orbitControls: OrbitControls;
  private _sphereMesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshBasicMaterial
  >;
  private _group: THREE.Group;
  private _axesHelper: THREE.AxesHelper;
  private _resizer: Resizer;
  private _lastRender: DOMHighResTimeStamp;

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "sphere", container: document.body }
  ) {
    super(model, options);
    // Make sure that initial theme is propagated into the scene.
    // Use .body background-color for 3D scene
    this.onThemeChange();
  }

  initializeCanvas(): HTMLCanvasElement {
    // Just any vector
    this._lastInterSect = new THREE.Vector3(-1.0, 20, -30);
    this._scene = new THREE.Scene();

    this._raycaster = new THREE.Raycaster();
    this._camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = this._renderer.domElement;
    this.container.appendChild(canvas);
    this._resizer = new Resizer(this.container, this._camera, this._renderer);

    this._sphere = new THREE.Mesh(
      this.createSphereGeometry(),
      this.createSphereMaterial()
    );
    this._sphere.visible = SETTINGS.view.faces_visible;

    this._sphereMesh = new THREE.Mesh(
      this.createSphereGeometry(),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    this._sphereMesh.visible = SETTINGS.view.mesh_visible;

    this._axesHelper = new THREE.AxesHelper(20);
    this._axesHelper.visible = SETTINGS.view.axes_visible;

    this._group = new THREE.Group();
    this._group.add(this._sphere, this._sphereMesh, this._axesHelper);
    this._scene.add(this._group);

    this._orbitControls = new OrbitControls(
      this._camera,
      this._renderer.domElement
    );
    this._camera.position.z = 50;
    this._orbitControls.update();
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
    this._scene.background = new THREE.Color(backgroundColor);
  }

  get captureElement(): HTMLElement {
    return this._renderer.domElement;
  }

  render() {
    const callback: FrameRequestCallback = (time: DOMHighResTimeStamp) => {
      if (this._lastRender === undefined) {
        this._lastRender = time;
      }
      this._render(time - this._lastRender);
      this._lastRender = time;
      requestAnimationFrame(callback);
    };
    callback((performance || Date).now());
  }

  _render(delta: DOMHighResTimeStamp) {
    stats.begin();

    // required if controls.enableDamping or controls.autoRotate are set to true
    this._orbitControls.update();
    this._renderer.render(this._scene, this._camera);
    if (this._sphere.visible || this._sphereMesh.visible) {
      this._raycaster.setFromCamera(mouse, this._camera);
      const intersects = this._raycaster.intersectObject(this._sphere);
      const uniforms = (this._sphere.material as THREE.ShaderMaterial).uniforms;
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
      this._group.rotation.x = 0;
      this._group.rotation.y = 0;
      this._group.rotation.z = 0;
    } else if (SETTINGS.animation.run) {
      const ROT_FACTOR = (Math.PI * delta) / 500;
      this._group.rotation.x += SETTINGS.animation.rotation_x * ROT_FACTOR;
      this._group.rotation.y += SETTINGS.animation.rotation_y * ROT_FACTOR;
      this._group.rotation.z += SETTINGS.animation.rotation_z * ROT_FACTOR;
    }
    stats.end();
  }

  _setIntersect(point: THREE.Vector3) {
    if (point.distanceToSquared(this._lastInterSect) > EPS_SQ) {
      this.domElement.style.cursor = "none";
      this._lastInterSect = point;
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
    this._sphere.geometry.dispose();
    this._sphereMesh.geometry.dispose();

    const geometry = this.createSphereGeometry();
    this._sphere.geometry = geometry;
    this._sphereMesh.geometry = geometry;

    this.updateSphereMaterial();
  }

  createSphereGeometry() {
    const segments = SETTINGS.sphere.segments;
    // console.log(`Radius: ${config.sphere.radius}, Segments: ${segments}`)
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
          this._renderer.domElement.width,
          this._renderer.domElement.height
        ),
      },
      u_intersect: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
    };
  }

  /**
   * Updates the ShaderMaterial of the sphere, based on current settings.
   */
  updateSphereMaterial(): void {
    if (this._sphere !== undefined) {
      (this._sphere.material as THREE.ShaderMaterial).dispose();
    }
    this._sphere.material = this.createSphereMaterial();
    this._sphereMesh.material.transparent = SETTINGS.color.alpha != 1.0;
    Settings.dispatchEvent(Events.MODEL_CHANGED);
  }

  updateVisibility(): void {
    this._axesHelper.visible = SETTINGS.view.axes_visible;
    this._sphereMesh.visible = SETTINGS.view.mesh_visible;
    this._sphere.visible = SETTINGS.view.faces_visible;
    stats["visible"](SETTINGS.view.stats_monitor_visible);
    Settings.dispatchEvent(Events.MODEL_CHANGED);
  }
}

export { Sphere };
