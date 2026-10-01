import * as THREE from "three";

import { SETTINGS, cutsFromNecklace } from "../settings/settingsValues";
import { Events } from "../Enums";
import { t } from "../i18n";
import { NecklaceComponent, ComponentOptions } from "./NecklaceComponent";
import { NecklaceModel } from "./NecklaceModel";
import { DEFAULT_SIGNS, cutFromHandles, handlesFromCut, partAt, snap, type Handles } from "./handles";

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
const Y_GAP_BETWEEN_THIEVES = 28;
const Y_GAP_BETWEEN_LINE_SEGMENTS = 5;
const Y_GAP_THIEF_LINE_SEGMENT = 7;

/** How far the handles reach beyond the jewels' rows; the necklace starts this far down. */
const OVERHANG = 6;
/** The jewels' two rows, where parts are tapped. */
const ROWS_HEIGHT = 2 * JEWEL_HEIGHT + Y_GAP_BETWEEN_THIEVES;
/** Where the handles are drawn and grabbed, from the top of the canvas. */
const HANDLES_HEIGHT = ROWS_HEIGHT + 2 * OVERHANG;
/** Where the fairness meter's space starts: below the handles, with a gap. */
const GAUGE_TOP = HANDLES_HEIGHT + 12;
/** The fairness meter's share of its space. */
const GAUGE_SCALE = 0.95;
/** How far from a handle, in px, a pointer still grabs it: at least 24 px wide for fingers. */
const HANDLE_REACH = 14;
/**
 * Handles on the gaps between jewels, snapped exactly: the model takes the
 * squares of the cut's coordinates, and √a squared may land a hair beyond a
 * gap and take the next jewel. The cut is set this much before the handles.
 */
const NUDGE = 1e-9;
/** How long the fair split message shows, in ms. */
const FAIR_MESSAGE_DURATION = 2500;

type HandleKey = "a" | "b";

/**
 * The necklace, the current cuts and the fairness meter, on a 2D canvas. The
 * cuts are shown as two handles; when they set the cuts (the view switcher's
 * necklace mode), they can be dragged, and tapping a part gives it to the
 * other thief. Hidden sliders and buttons do the same from the keyboard and
 * for screen readers; the canvas shows which one has the focus.
 */
class Necklace extends NecklaceComponent {
  /** The cuts as handles; the thieves of parts of length 0 are kept here, the cut does not tell them. */
  #handles: Handles = { a: 0, b: 0, signs: DEFAULT_SIGNS.clone() };
  #dragging: HandleKey | undefined;
  #sliders = new Map<HandleKey, HTMLInputElement>();
  #partButtons: HTMLButtonElement[] = [];
  #controls!: HTMLElement;
  #fairMessage!: HTMLElement;
  #fairTimer: number | undefined;
  #wasFair = false;
  /** Set while the handles apply their cut: the handles, not the nudged cut, stay as they are. */
  #applying = false;

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "necklace", container: document.body }
  ) {
    super(model, options);
    this.canvas = this.domElement;
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
    this.container.addEventListener(Events.NECKLACE_CUT.toString(), () => {
      this.syncHandles();
      this.render();
    });
    this.container.addEventListener(Events.MODEL_CHANGED.toString(), () => {
      this.startCutting();
      this.render();
    });
    this.container.addEventListener(Events.INPUT_CHANGED.toString(), () => {
      this.startCutting();
      this.render();
    });
    canvas.addEventListener("pointerdown", (event) => this.onPointerDown(event));
    canvas.addEventListener("pointermove", (event) => this.onPointerMove(event));
    canvas.addEventListener("pointerup", () => this.letGo());
    canvas.addEventListener("pointercancel", () => this.letGo());
    this.createControls();
    return canvas;
  }

  /** The hidden sliders for the handles and buttons for the parts, and the fair split message. */
  private createControls(): void {
    this.#controls = document.createElement("div");
    this.#controls.className = "necklace-controls visually-hidden";
    for (const [key, label] of [["a", t("necklace.firstCut")], ["b", t("necklace.secondCut")]] as const) {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "1";
      slider.setAttribute("aria-label", label);
      slider.addEventListener("input", () => this.moveHandle(key, Number(slider.value), false));
      slider.addEventListener("change", () => Events.dispatchEvent(Events.SHOW_CUT));
      this.#sliders.set(key, slider);
      this.#controls.appendChild(slider);
    }
    for (const part of [0, 1, 2] as const) {
      const button = document.createElement("button");
      button.type = "button";
      button.addEventListener("click", () => this.togglePart(part));
      this.#partButtons.push(button);
      this.#controls.appendChild(button);
    }
    for (const control of this.#controls.children) {
      control.addEventListener("focus", () => this.render());
      control.addEventListener("blur", () => this.render());
    }
    this.#fairMessage = document.createElement("div");
    this.#fairMessage.className = "fair-split";
    this.#fairMessage.setAttribute("role", "status");
    this.container.append(this.#controls, this.#fairMessage);
    // The rest follows with the necklace (MODEL_CHANGED): the canvas is not set yet.
    this.#controls.hidden = !cutsFromNecklace();
  }

  /** Whether the model holds a cut: a point of the unit sphere. */
  private get hasCut(): boolean {
    const cut = this.model.cuts;
    return cut !== undefined && cut.lengthSq() > 0.5;
  }

  /**
   * When the handles set the cuts: starts from a first cut if there is none.
   * The model keeps its cut across necklace changes and applies it again.
   */
  private startCutting(): void {
    this.updateControls();
    if (!cutsFromNecklace() || this.model.size === 0) {
      return;
    }
    if (!this.hasCut) {
      const jewels = SETTINGS.necklace.discrete_necklace ? this.model.size : 0;
      this.#handles = { a: snap(1 / 3, jewels), b: snap(2 / 3, jewels), signs: DEFAULT_SIGNS.clone() };
      this.applyHandles();
    }
  }

  /** The handles for the model's cut, however it was set. */
  private syncHandles(): void {
    if (this.hasCut && !this.#applying) {
      this.#handles = handlesFromCut(this.model.cuts!, this.#handles.signs);
    }
    this.updateControls();
  }

  private updateControls(): void {
    const enabled = cutsFromNecklace();
    this.#controls.hidden = !enabled;
    this.canvas.style.cursor = "";
    const step = SETTINGS.necklace.discrete_necklace && this.model.size > 0 ? 1 / this.model.size : 0.01;
    this.#sliders.forEach((slider, key) => {
      slider.step = String(step);
      slider.value = String(this.#handles[key]);
    });
    const signs = this.#handles.signs.toArray();
    this.#partButtons.forEach((button, part) => {
      button.textContent = t("necklace.part", { part: part + 1, thief: signs[part] > 0 ? "A" : "B" });
    });
  }

  private applyHandles(): void {
    const { a, b, signs } = this.#handles;
    this.#applying = true;
    this.model.applyCut(cutFromHandles({ a: a - NUDGE, b: b - NUDGE, signs }));
    this.#applying = false;
    this.celebrateFairSplit();
  }

  /** Moves a handle; one dragged past the other takes its place. Returns the handle moved. */
  private moveHandle(key: HandleKey, position: number, swap = true): HandleKey {
    const jewels = SETTINGS.necklace.discrete_necklace ? this.model.size : 0;
    const value = snap(Math.min(1, Math.max(0, position)), jewels);
    const handles = this.#handles;
    if (key === "a") {
      if (value <= handles.b) {
        handles.a = value;
      } else if (swap) {
        [handles.a, handles.b, key] = [handles.b, value, "b"];
      } else {
        handles.a = handles.b;
      }
    } else if (value >= handles.a) {
      handles.b = value;
    } else if (swap) {
      [handles.b, handles.a, key] = [handles.a, value, "a"];
    } else {
      handles.b = handles.a;
    }
    this.applyHandles();
    return key;
  }

  /** Gives a part to the other thief, and shows the new point on the sphere. */
  private togglePart(part: 0 | 1 | 2): void {
    const signs = this.#handles.signs;
    signs.setComponent(part, -signs.getComponent(part));
    this.applyHandles();
    Events.dispatchEvent(Events.SHOW_CUT);
  }

  /** The handle within reach of x, the nearer one if both are. */
  private handleAt(x: number): HandleKey | undefined {
    const distance = (key: HandleKey) => Math.abs(this.#handles[key] * this.width - x);
    const nearest: HandleKey = distance("a") < distance("b") || (distance("a") === distance("b") && x < this.#handles.a * this.width) ? "a" : "b";
    return distance(nearest) <= HANDLE_REACH ? nearest : undefined;
  }

  private onPointerDown(event: PointerEvent): void {
    if (!cutsFromNecklace() || !this.hasCut || event.offsetY > HANDLES_HEIGHT + HANDLE_REACH) {
      return;
    }
    const handle = this.handleAt(event.offsetX);
    if (handle) {
      this.#dragging = handle;
      this.canvas.setPointerCapture(event.pointerId);
      this.render();
    } else {
      this.togglePart(partAt(event.offsetX / this.width, this.#handles));
    }
    event.preventDefault();
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.#dragging) {
      this.#dragging = this.moveHandle(this.#dragging, event.offsetX / this.width);
    } else if (cutsFromNecklace() && this.hasCut) {
      const onRows = event.offsetY <= HANDLES_HEIGHT + HANDLE_REACH;
      this.canvas.style.cursor = !onRows ? "" : this.handleAt(event.offsetX) ? "ew-resize" : "pointer";
    }
  }

  /** Ends a drag: the sphere turns to the point if it is out of sight. */
  private letGo(): void {
    if (this.#dragging) {
      this.#dragging = undefined;
      this.render();
      Events.dispatchEvent(Events.SHOW_CUT);
    }
  }

  /** Whether the split is fair: thief A's share of each kind is the target (1/2, or 0 without that kind). */
  private get fair(): boolean {
    const shares = this.model.canonicalThief(this.model.thief_a);
    const target = new THREE.Vector2(this.model.count_0 > 0 ? 0.5 : 0, this.model.count_1 > 0 ? 0.5 : 0);
    return shares.distanceTo(target) <= Math.max(SETTINGS.necklace.epsilon, 1e-6);
  }

  /** Shows the fair split message when a change of the handles makes the split fair. */
  private celebrateFairSplit(): void {
    const fair = this.fair;
    if (fair && !this.#wasFair) {
      this.#fairMessage.textContent = t("necklace.fair");
      this.#fairMessage.classList.add("show");
      clearTimeout(this.#fairTimer);
      this.#fairTimer = window.setTimeout(() => {
        this.#fairMessage.classList.remove("show");
        this.#fairMessage.textContent = "";
      }, FAIR_MESSAGE_DURATION);
    }
    this.#wasFair = fair;
  }

  /**
   * @returns number of jewels on necklace
   */
  private get size(): number {
    return this.model.size;
  }

  get width(): number {
    return this.canvas.width;
  }

  get height(): number {
    return this.canvas.height;
  }

  get jewelWidth(): number {
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

  get between_jewels_color(): string {
    return getComputedStyle(document.body).getPropertyValue(
      BETWEEN_JEWELS_COLOR
    );
  }
  get jewel_a_color(): string {
    return getComputedStyle(document.body).getPropertyValue(JEWEL_A_COLOR);
  }
  get jewel_b_color(): string {
    return getComputedStyle(document.body).getPropertyValue(JEWEL_B_COLOR);
  }
  get gauge_color(): string {
    return getComputedStyle(document.body).getPropertyValue(GAUGE_COLOR);
  }
  get captureElement(): HTMLCanvasElement {
    return this.domElement;
  }

  /** The Borsuk-Ulam view is about the sphere morphing into the shape: it hides necklace and gauge. */
  get showNecklace(): boolean {
    return SETTINGS.view.necklace_visible && !SETTINGS.sphere.show_borsuk_ulam_proof_shape;
  }

  get showGauge(): boolean {
    return SETTINGS.view.gauge_visible && !SETTINGS.sphere.show_borsuk_ulam_proof_shape;
  }

  render(): void {
    this._render();
  }
  private _render(): void {
    // console.log("Necklace.render");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    const ctxOrNull: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
    if (ctxOrNull !== null) {
      const ctx: CanvasRenderingContext2D = ctxOrNull;
      const xOffset = 0;
      const yOffset = OVERHANG;
      let xPos = xOffset;

      const cuts = this.model.cuts;

      if (this.showNecklace) {
        this.drawNecklace(ctx, xPos, yOffset, cuts);

        // Render line segments for x*x, y*y, z*z
        if (cuts !== undefined) {
          ctx.save();
          ctx.translate(0, yOffset);
          this.drawSegments(ctx, cuts);
          ctx.restore();
        }
        if (this.hasCut) {
          this.drawHandles(ctx);
        }
      }

      // render textual result
      if (this.model.thief_a !== undefined && this.showGauge) {
        const thief_a = this.model.canonicalThief(this.model.thief_a);
        const thief_b = this.model.canonicalThief(this.model.thief_b);
        this.drawGauge(ctx, GAUGE_TOP, thief_a, thief_b);
      }
    }

  }

  private drawNecklace(
    ctx: CanvasRenderingContext2D,
    x0: number,
    y0: number,
    cuts: THREE.Vector3 | undefined
  ): void {
    const X_GAP = 2;
    const Y_GAP = JEWEL_HEIGHT + Y_GAP_BETWEEN_THIEVES;

    // White rectangle as background, if no cuts
    if (cuts === undefined) {
      ctx.fillStyle = this.between_jewels_color;
      ctx.fillRect(x0, y0, this.width, JEWEL_HEIGHT);
    }

    // Draw jewels for each thief of different horizontal lines.
    const JEWEL_A_COLOR = this.jewel_a_color;
    const JEWEL_B_COLOR = this.jewel_b_color;
    // Continuous: a cut splits a jewel, and each thief gets the part on its
    // side, as in the model. Discrete: a jewel goes whole with the part it starts in.
    const split = !SETTINGS.necklace.discrete_necklace && cuts !== undefined && cuts.lengthSq() > 0.5;
    const xSq = cuts ? cuts.x * cuts.x : 0;
    const parts = cuts ? [[0, xSq, cuts.x], [xSq, xSq + cuts.y * cuts.y, cuts.y], [xSq + cuts.y * cuts.y, 1, cuts.z]] : [];
    for (let i = 0; i < this.size; i++) {
      const v = this.model.necklace[i];
      ctx.fillStyle = v === 0 ? JEWEL_A_COLOR : JEWEL_B_COLOR;
      const start = x0 + i * this.jewelWidth;
      // The gap between jewels is taken from each jewel's end.
      const end = start + this.jewelWidth - X_GAP;
      if (!split) {
        ctx.fillRect(start, y0 + this.yOffset(cuts, i / this.size, Y_GAP), end - start, JEWEL_HEIGHT);
        continue;
      }
      for (const [from, to, sign] of parts) {
        const left = Math.max(start, x0 + from * this.width);
        const right = Math.min(end, x0 + to * this.width);
        if (right > left) {
          ctx.fillRect(left, y0 + (sign < 0 ? Y_GAP : 0), right - left, JEWEL_HEIGHT);
        }
      }
    }
  }

  /**
   * Draws the cuts as handles across the jewels' rows: thin lines while the
   * pointer on the sphere sets the cuts, with grips when they can be dragged.
   * The handle or part whose hidden control has the focus is marked.
   */
  private drawHandles(ctx: CanvasRenderingContext2D): void {
    const interactive = cutsFromNecklace();
    const color = getComputedStyle(document.body).getPropertyValue("--text-color");
    const focused = document.activeElement;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    for (const key of ["a", "b"] as const) {
      const x = Math.min(this.width - 1, Math.max(1, this.#handles[key] * this.width));
      const active = this.#dragging === key || focused === this.#sliders.get(key);
      ctx.globalAlpha = interactive ? 1 : 0.6;
      ctx.lineWidth = interactive ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HANDLES_HEIGHT);
      ctx.stroke();
      if (interactive) {
        // The grip, in the gap between the rows.
        const width = active ? 12 : 8;
        const height = Y_GAP_BETWEEN_THIEVES - 4;
        // Whole at the ends of the necklace too.
        const grip = Math.min(this.width - width / 2, Math.max(width / 2, x));
        ctx.beginPath();
        ctx.roundRect(grip - width / 2, OVERHANG + JEWEL_HEIGHT + 2, width, height, 3);
        ctx.fill();
      }
    }
    const part = this.#partButtons.findIndex((button) => button === focused);
    if (interactive && part >= 0) {
      const bounds = [0, this.#handles.a, this.#handles.b, 1];
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(bounds[part] * this.width + 1, 1, (bounds[part + 1] - bounds[part]) * this.width - 2, HANDLES_HEIGHT - 2);
    }
    ctx.restore();
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
    const radius = GAUGE_SCALE * (height - vgap);

    if (radius >= 10) {
      /** The real circle radius, scaled by sqrt(0.5), because the largest vector can be [1,1]. */
      const rradius = Math.SQRT1_2 * radius;
      const center = new THREE.Vector2(this.width / 2, this.height - vgap);

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

      // Draw the gauge outer circle - 1st part
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

      // Draw the gauge outer circle - 2nd part
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = GAUGE_COLOR;
      ctx.arc(center.x, center.y, radius, -Math.PI * (1.0 - dist), 0.0, false);
      ctx.stroke();
    }
  }

  private yOffset(cuts: THREE.Vector3 | undefined, x: number, yGap: number): number {
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
