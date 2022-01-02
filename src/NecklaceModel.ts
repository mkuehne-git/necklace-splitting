import { Vector2, Vector3 } from "three";

import { EPS, Settings, SETTINGS } from "./Settings";
import { Events } from "./Enums";

function fract(x: number): number {
  return x % 1;
}

class NecklaceModel {
  private _necklace: number[] = undefined;
  /** Vector with total number of jewels per type. */
  private _cnt: Vector2 = undefined;

  /** With two cuts the necklace is split into three segments - represented by this vector. */
  private _cuts: Vector3 = undefined;

  /** Vector representing the number of jewels per type belonging to thief. */
  private _thief: Vector2 = undefined;

  /**
   *
   * @param maxJewels
   */
  constructor() {
    this.initializeStatus(0);
  }

  get necklace(): number[] {
    return [...this._necklace];
  }

  necklaceAsInt(necklaceAsInt: number, numberOfJewels: number): void {
    this.initializeStatus(numberOfJewels);
    const strVector = necklaceAsInt.toString(2);
    // console.log(`necklaceAsInt: ${necklaceAsInt}, ${strVector}`);
    if (necklaceAsInt != 0) {
      let i = 0;
      for (const c of strVector) {
        this._necklace[i++] = c === "0" ? 0 : 1;
      }
    }
    for (const jewel of this._necklace) {
      if (jewel === 0.0) {
        this._cnt.x += 1;
      } else {
        this._cnt.y += 1;
      }
    }
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
      this.thief_a = SETTINGS.necklace.discrete
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
    return undefined;
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
    return undefined;
  }

  private initializeStatus(numberOfJewels: number): void {
    this._necklace = Array(numberOfJewels).fill(0);
    this._cnt = new Vector2(0, 0);
    this._cuts = undefined;
    this._thief = undefined;
  }

  get cnt(): Vector2 {
    return this._cnt.clone();
  }
  private set cnt(value: Vector2) {
    this._cnt = value.clone();
  }

  get count_0(): number {
    return this._cnt.x;
  }

  get count_1(): number {
    return this._cnt.y;
  }
  get cuts(): Vector3 {
    return this._cuts ? this._cuts.clone() : undefined;
  }
  private set cuts(cuts: Vector3) {
    if (cuts !== undefined) {
      this.assertSphere(cuts);
      this._cuts = cuts.clone();
    } else {
      this._cuts = undefined;
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
    return this._thief !== undefined ? this._thief.clone() : undefined;
  }
  private set thief_a(value: Vector2) {
    this._thief = value.clone();
  }

  get thief_b(): Vector2 {
    return this._thief !== undefined ? this.cnt.sub(this._thief) : undefined;
  }

  /**
   * Computes a canonical representation of jewels per type assigned to thief.
   *
   * @param thief {Vector2} number of jewels per type assigned to thief
   * @returns {Vector2} ratio of jewels per type assigned to thief
   */
  canonicalThief(thief: Vector2): Vector2 {
    const x = this._cnt.x !== 0 ? thief.x / this._cnt.x : 0.0;
    const y = this._cnt.y !== 0 ? thief.y / this._cnt.y : 0.0;
    return new Vector2(x, y);
  }
}
export default NecklaceModel;
