import { textShadow } from "html2canvas/dist/types/css/property-descriptors/text-shadow";
import * as THREE from "three";
import { Vector2 } from "three";

import { SETTINGS, EPS, EPS_SQ, Settings } from "./Settings";
import { Events, Showcase } from "./Enums";
import { ComponentOptions, NecklaceComponent } from "./NecklaceComponent";
import NecklaceModel from "./NecklaceModel";

let counter = 0;
const JEWEL_A_COLOR = "--jewel-a-color";
const JEWEL_B_COLOR = "--jewel-b-color";

const THIEF_A_COLOR = "--thief-a-color";
const THIEF_B_COLOR = "--thief-b-color";
const THIEF_A_COLOR_LIGHT = `${THIEF_A_COLOR}-light`;
const THIEF_B_COLOR_LIGHT = `${THIEF_B_COLOR}-light`;

const BETWEEN_JEWELS_COLOR = "--between-jewels-color";

const GAUGE_COLOR = "--gauge-color";
const SEGMENT_X_COLOR = "red";
const SEGMENT_Y_COLOR = "green";
const SEGMENT_Z_COLOR = "rgb(0,191,255)";

const JEWEL_HEIGHT = 10;
const Y_GAP_BETWEEN_THIEVES = 20;
const Y_GAP_BETWEEN_LINE_SEGMENTS = 5;
const Y_GAP_THIEF_LINE_SEGMENT = 7;

class Necklace extends NecklaceComponent {
  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "necklace", container: document.body }
  ) {
    super(model, options);
    window.addEventListener("resize", () => {
      const width = Math.min(innerWidth, this.container.clientWidth);
      const height = Math.min(innerHeight, this.container.clientHeight);

      this.canvas.width = width;
      this.canvas.height = height;
      this.render();
    });
  }

  onMutation(mutation: MutationRecord): void {
    this.render();
  }

  initializeCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "necklace");
    canvas.classList.add("necklace");
    this.container.addEventListener(Events.NECKLACE_CUT.toString(), () =>
      this.render()
    );
    this.container.addEventListener(Events.MODEL_CHANGED.toString(), () =>
      this.render()
    );
    return canvas;
  }

  /**
   * @returns number of jewels on necklace
   */
  private get size() {
    return this.model.size;
  }

  get scaledKnife() {
    if (this.model.cuts !== undefined) {
      return undefined;
    }
    return this.model.cuts.clone().multiplyScalar(this.size);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  get jewelWidth() {
    return this.width / this.size;
  }
  get thief_a_color() {
    return getComputedStyle(document.body).getPropertyValue(THIEF_A_COLOR);
  }
  get thief_b_color() {
    return getComputedStyle(document.body).getPropertyValue(THIEF_B_COLOR);
  }
  get thief_a_color_light() {
    return getComputedStyle(document.body).getPropertyValue(
      THIEF_A_COLOR_LIGHT
    );
  }
  get thief_b_color_light() {
    return getComputedStyle(document.body).getPropertyValue(
      THIEF_B_COLOR_LIGHT
    );
  }

  get between_jewels_color() {
    return getComputedStyle(document.body).getPropertyValue(
      BETWEEN_JEWELS_COLOR
    );
  }
  get jewel_a_color() {
    return getComputedStyle(document.body).getPropertyValue(JEWEL_A_COLOR);
  }
  get jewel_b_color() {
    return getComputedStyle(document.body).getPropertyValue(JEWEL_B_COLOR);
  }
  get gauge_color() {
    return getComputedStyle(document.body).getPropertyValue(GAUGE_COLOR);
  }
  get captureElement() {
    return this.domElement;
  }

  get showNecklace(): boolean {
    return (
      SETTINGS.int_mode === Showcase.STOLEN_NECKLACE &&
      SETTINGS.view.necklace_visible
    );
  }

  get showGauge(): boolean {
    return (
      (SETTINGS.int_mode === Showcase.STOLEN_NECKLACE ||
        SETTINGS.int_mode === Showcase.SEGMENTS) &&
      SETTINGS.view.gauge_visible
    );
  }

  render() {
    if (this.canvas !== undefined) {
      this._render();
    }
  }
  private _render() {
    // console.log("Necklace.render");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const ctx = this.canvas.getContext("2d");

    const xOffset = 0;
    const yOffset = 0;
    let xPos = xOffset;

    const cuts = this.model.cuts;

    if (this.showNecklace) {
      this.drawNecklace(ctx, xPos, yOffset, cuts);

      // Render line segments for x*x, y*y, z*z
      if (cuts !== undefined) {
        this.drawSegments(ctx, cuts);
      }
    }

    // render textual result
    if (this.model.thief_a !== undefined && this.showGauge) {
      const thief_a = this.model.canonicalThief(this.model.thief_a);
      const thief_b = this.model.canonicalThief(this.model.thief_b);
      this.drawGauge(ctx, 50, thief_a, thief_b);
    }

    // Some debug output
    if (SETTINGS.text) {
      ctx.font = "12px";
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.fillText(SETTINGS.text, 0, 150);
    }
  }

  private drawNecklace(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    cuts: THREE.Vector3
  ): void {
    const X_GAP = 2;
    const Y_GAP = JEWEL_HEIGHT + Y_GAP_BETWEEN_THIEVES;

    // White rectangle as background, if no cuts
    if (!cuts) {
      ctx.fillStyle = this.between_jewels_color;
      ctx.fillRect(x0, y0, this.width, JEWEL_HEIGHT);
    }

    // Draw jewels for each thief of different horizontal lines.
    const JEWEL_A_COLOR = this.jewel_a_color;
    const JEWEL_B_COLOR = this.jewel_b_color;
    let jewelStart = x0;
    for (let i = 0; i < this.size; i++) {
      const v = this.model.necklace[Math.floor(i)];
      //console.log(`#${i}: ${v}`);
      ctx.fillStyle = v === 0 ? JEWEL_A_COLOR : JEWEL_B_COLOR;
      ctx.fillRect(
        jewelStart,
        y0 + this.yOffset(cuts, i / this.size, Y_GAP),
        this.jewelWidth - X_GAP,
        JEWEL_HEIGHT
      );
      jewelStart += this.jewelWidth;
    }
  }

  /**
   * Renders the line segments in the area between the jewels.
   *
   * @param ctx {CanvasRenderingContext2D}
   * @param cuts {THREE.Vector3}
   */
  private drawSegments(
    ctx: CanvasRenderingContext2D,
    cuts: THREE.Vector3
  ): void {
    let x0 = 0;

    ctx.save();
    ctx.lineWidth = this.showNecklace ? 1 : JEWEL_HEIGHT;

    // render x
    ctx.strokeStyle = SEGMENT_X_COLOR;
    x0 = this.drawSegment(ctx, x0, cuts.x);

    // render y
    ctx.strokeStyle = SEGMENT_Y_COLOR;
    x0 = this.drawSegment(ctx, x0, cuts.y);

    // render z
    ctx.strokeStyle = SEGMENT_Z_COLOR;
    x0 = this.drawSegment(ctx, x0, cuts.z);

    ctx.restore();
  }

  private drawSegment(
    ctx: CanvasRenderingContext2D,
    x0: number,
    segmentLength: number
  ): number {
    ctx.beginPath();

    const y0 = this.yOffsetSegment(segmentLength) + ctx.lineWidth;
    ctx.moveTo(x0, y0);
    const x1 = x0 + Math.ceil(segmentLength * segmentLength * this.width);
    ctx.lineTo(x1, y0);
    ctx.stroke();
    return x1;
  }

  private yOffsetSegment(sign: number): number {
    const Y_GAP = this.showNecklace
      ? Y_GAP_BETWEEN_LINE_SEGMENTS
      : Y_GAP_BETWEEN_THIEVES + JEWEL_HEIGHT;
    return (
      (sign < 0 ? Y_GAP : 0) +
      (this.showNecklace ? JEWEL_HEIGHT + Y_GAP_THIEF_LINE_SEGMENT : 0)
    );
  }

  /**
   * Draws a little gauge, indicating the progress towards equal distribution of the jewels between the two thiefs.
   *
   * @param {*} ctx canvas context
   * @param {*} y0 y-value of upper-left corner of drawing area
   * @param {*} thief_aAbs values for thief_a
   * @param {*} thief_bAbs values for thief_b
   */
  private drawGauge(
    ctx: CanvasRenderingContext2D,
    y0: number,
    thief_a: THREE.Vector2,
    thief_b: THREE.Vector2
  ): void {
    const height = this.height - y0;
    const lineWidth = 3.0;
    const vgap = 2;
    const radius = height - vgap;

    if (radius >= 10) {
      /** The real circle radius, scaled by sqrt(0.5), because the largest vector can be [1,1]. */
      const rradius = Math.SQRT1_2 * radius;
      const x0 = this.width / 2 - radius;
      const center = new THREE.Vector2(x0 + radius, y0 + radius);

      const THIEF_A_COLOR = this.thief_a_color;
      const THIEF_B_COLOR = this.thief_b_color;

      const GAUGE_COLOR = this.gauge_color;
      // Area of thief_a (left circle quarter)
      ctx.beginPath();
      ctx.fillStyle = this.thief_a_color_light;
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, radius, -Math.PI, -Math.PI / 2);
      ctx.lineTo(center.x, center.y);
      ctx.closePath();
      ctx.fill();

      // Area of thief_b (right circle quarter)
      ctx.beginPath();
      ctx.fillStyle = this.thief_b_color_light;
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, radius, -Math.PI / 2, 0);
      ctx.lineTo(center.x, center.y);
      ctx.closePath();
      ctx.fill();

      // Circle with 1/2 radius, marks the length of target vectors, where both thiefs own the same amount of jewels.
      ctx.beginPath();
      ctx.lineWidth = 1;
      // ctx.strokeStyle = GAUGE_COLOR;
      ctx.setLineDash([1, 1]);
      ctx.arc(center.x, center.y, radius / 2, 0, -Math.PI, true);
      ctx.stroke();

      // Draw vector for thief_a
      ctx.beginPath();
      ctx.strokeStyle = THIEF_A_COLOR;
      ctx.setLineDash([]);
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(
        center.x - thief_a.x * rradius,
        center.y - thief_a.y * rradius
      );
      ctx.stroke();
      // Draw vector for thief_b
      ctx.beginPath();
      ctx.strokeStyle = THIEF_B_COLOR;
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(
        center.x + thief_b.x * rradius,
        center.y - thief_b.y * rradius
      );
      ctx.stroke();

      // Draw progress bar based on difference between thief_a and thief_b
      const dist = 1 - Math.SQRT1_2 * thief_a.distanceTo(thief_b);
      // console.log(`dist: ${dist}`);
      const red = 255 + (0 - 255) * dist;
      const green = 0 + (255 - 0) * dist;

      // Draw the gauge outer circle
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgb(${red},${green}, 0)`;
      ctx.arc(
        center.x,
        center.y,
        radius,
        -Math.PI,
        -Math.PI * (1.0 - dist),
        false
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = GAUGE_COLOR;
      ctx.arc(center.x, center.y, radius, -Math.PI * (1.0 - dist), 0.0, false);
      ctx.stroke();
    }
  }

  private yOffset(cuts: THREE.Vector3, x: number, yGap: number): number {
    if (cuts === undefined) {
      return 0;
    }

    const xSq = cuts.x * cuts.x;
    const ySq = cuts.y * cuts.y;

    if (x < xSq) {
      return cuts.x < 0 ? yGap : 0;
    } else if (x < xSq + ySq) {
      return cuts.y < 0 ? yGap : 0;
    }
    return cuts.z < 0 ? yGap : 0;
  }
}
export { Necklace };
