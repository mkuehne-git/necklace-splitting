import { Vector2, Vector3 } from "three";

import { EPS, Settings, SETTINGS } from "./Settings";
import { Events } from "./Enums";

function fract(x: number): number {
  return x % 1;
}

class NecklaceModel {
  #necklace: number[];
  /** Vector with total number of jewels per type. */
  #cnt: Vector2;

  /** With two cuts the necklace is split into three segments - represented by this vector. */
  #cuts: Vector3;

  /** Vector representing the number of jewels per type belonging to thief. */
  #thief: Vector2;

  /**
   *
   * @param maxJewels
   */
  constructor() {
    this.initializeStatus(0);
    window.addEventListener(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER, () =>
      this.necklaceFromInt(
        SETTINGS.necklace.configuration,
        SETTINGS.necklace.number_of_jewels
      )
    );
    window.addEventListener(Events.SET_NECKLACE_CONFIGURATION_BY_STRING, () =>
      this.necklaceFromStr(SETTINGS.necklace.string)
    );
  }

  get necklace(): number[] {
    return [...this.#necklace];
  }

  /**
   * Creates necklace configuration from number.
   *
   * @param {number} necklaceAsInt binary representation of number defines the necklace
   * @param {number} numberOfJewels the total number of jewels, needed to fill leading zeroes
   */
  private necklaceFromInt(necklaceAsInt: number, numberOfJewels: number): void {
    this.initializeStatus(numberOfJewels);
    const strVector = necklaceAsInt.toString(2);
    if (necklaceAsInt != 0) {
      const maxIndex = strVector.length - 1;
      for (let i = maxIndex; i >= 0; i--) {
        // console.log(`Necklace index ${i}: ${strVector[i]}`)
        this.#necklace[maxIndex - i] = strVector[i] === "0" ? 0 : 1;
      }
    }
    // console.log(`necklaceAsInt: ${necklaceAsInt}, ${strVector}, ${this.#necklace}`);
    for (const jewel of this.#necklace) {
      if (jewel === 0.0) {
        this.#cnt.x += 1;
      } else {
        this.#cnt.y += 1;
      }
    }
    Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
  }

  private necklaceFromStr(necklaceAsStr: string): void {
    this.initializeStatus(1);
    this.#necklace = [];
    for (let i = 0; i < necklaceAsStr.length; i++) {
      const necklaceAsInt = necklaceAsStr.charCodeAt(i);
      const strVector = necklaceAsInt.toString(2);
      // console.log(`necklaceAsInt: ${necklaceAsInt}, ${strVector}`);
      if (necklaceAsInt != 0) {
        for (const c of strVector) {
          this.#necklace.push(c === "0" ? 0 : 1);
        }
      }
    }
    for (const jewel of this.#necklace) {
      if (jewel === 0.0) {
        this.#cnt.x += 1;
      } else {
        this.#cnt.y += 1;
      }
    }
    // console.log(`necklaceFromString: ${necklaceAsStr}: ${this.#necklace} ${this.#cnt.x},${this.#cnt.y}`);
    Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
  }

  /**
   * @returns number of jewels on necklace
   */
  get size() {
    if (this.cnt.x < 0 || this.cnt.y < 0) {
      throw Error("Necklace not initialized");
    }
    return this.cnt.x + this.cnt.y;
  }

  applyCut(cuts: Vector3): void {
    this.cuts = cuts;
    if (cuts !== undefined) {
      this.#thief = SETTINGS.necklace.discrete
        ? this.applyCutDiscrete(cuts)
        : this.applyCutContinous(cuts);
    }
    Settings.dispatchEvent(Events.NECKLACE_CUT);
  }

  private applyCutDiscrete(p: Vector3): Vector2 {
    this.cuts = p;
    if (p) {
      const size = this.size;
      const xSq = p.x * p.x * size;
      const ySq = p.y * p.y * size;

      const thief = [0, 0];
      for (let i = 0; i < size; i++) {
        const jewel_type = this.necklace[i];
        const q = i;
        if (q < xSq) {
          if (p.x > 0.0) {
            thief[jewel_type]++;
          }
        } else if (q < xSq + ySq) {
          if (p.y > 0.0) {
            thief[jewel_type]++;
          }
        } else if (p.z > 0.0) {
          thief[jewel_type]++;
        }
      }
      return new Vector2(thief[0], thief[1]);
    }
    return new Vector2(0, 0);
  }

  private applyCutContinous(p: Vector3): Vector2 {
    this.cuts = p;
    if (p) {
      const size = this.size;
      const xSq = p.x * p.x * size;
      const ySq = p.y * p.y * size;

      const thief = [0.0, 0.0];
      for (let i = 0; i < size; i++) {
        const jewel_type = this.necklace[i];
        const q = i + 1;
        let dx = 0.0;
        let dy = 0.0;
        let dz = 0.0;
        if (q <= Math.ceil(xSq)) {
          if (q <= Math.floor(xSq)) {
            dx = 1.0;
          } else {
            dx = fract(xSq);
            if (q > xSq + ySq) {
              dy = ySq;
              dz = 1.0 - dx - dy;
            } else {
              dy = 1.0 - dx;
            }
          }
        } else if (q <= Math.ceil(xSq + ySq)) {
          if (q <= Math.floor(xSq + ySq)) {
            dy = 1.0;
          } else {
            dy = fract(xSq + ySq);
            dz = 1.0 - dy;
          }
        } else {
          dz = 1.0;
        }
        if (dx !== 0.0 && p.x > 0.0) {
          thief[jewel_type] += dx;
        }
        if (dy !== 0.0 && p.y > 0.0) {
          thief[jewel_type] += dy;
        }
        if (dz !== 0.0 && p.z > 0.0) {
          thief[jewel_type] += dz;
        }
      }
      return new Vector2(thief[0], thief[1]);
    }
    return new Vector2(0, 0);
  }

  private initializeStatus(numberOfJewels: number): void {
    this.#necklace = Array(numberOfJewels).fill(0);
    this.#cnt = new Vector2(0, 0);
    this.#cuts = new Vector3(0, 0);
    this.#thief = new Vector2(0, 0);
  }

  get cnt(): Vector2 {
    return this.#cnt.clone();
  }
  private set cnt(value: Vector2) {
    this.#cnt = value.clone();
  }

  get count_0(): number {
    return this.#cnt.x;
  }

  get count_1(): number {
    return this.#cnt.y;
  }
  get cuts(): Vector3 | undefined {
    return this.#cuts ? this.#cuts.clone() : undefined;
  }
  private set cuts(cuts: Vector3|undefined) {
    if (cuts !== undefined) {
      this.assertSphere(cuts);
      this.#cuts = cuts.clone();
    }
  }

  private assertSphere(point: Vector3, radius = 1.0): void {
    if (point.length() - radius > EPS) {
      throw new Error(
        `Input vector ${point} not close enough to sphere with radius ${radius}, dist to orgin: ${point.length()}`
      );
    }
  }

  get thief_a(): Vector2 {
    return this.#thief !== undefined ? this.#thief.clone() : new Vector2(0,0);
  }
  private set thief_a(value: Vector2) {
    this.#thief = value.clone();
  }

  get thief_b(): Vector2 {
    return this.#thief !== undefined ? this.cnt.sub(this.#thief) : new Vector2(0,0);
  }

  /**
   * Computes a canonical representation of jewels per type assigned to thief.
   *
   * @param thief {Vector2} number of jewels per type assigned to thief
   * @returns {Vector2} ratio of jewels per type assigned to thief
   */
  canonicalThief(thief: Vector2): Vector2 {
    const x = this.#cnt.x !== 0 ? thief.x / this.#cnt.x : 0.0;
    const y = this.#cnt.y !== 0 ? thief.y / this.#cnt.y : 0.0;
    return new Vector2(x, y);
  }
}
export { NecklaceModel };
