import '../css/switcher.css';

import { Events } from "../Enums";
import { SETTINGS, resetSolutionHints } from "../settings/settingsValues";
import { collectSettings, persistentState } from "../settings/PersistentState";
import { t, type MessageKey } from "../i18n";
import { icon as shapeIcon } from "../icons/shape/shapeIcon";
import { icon as pointerIcon } from "../icons/pointer/pointerIcon";
import { icon as cutIcon } from "../icons/cut/cutIcon";

/** The app's scenes: pointing at the sphere, cutting the necklace (the game), the Borsuk-Ulam shape. */
const SCENES = ["Sphere", "Necklace", "BorsukUlam"] as const;
type Scene = (typeof SCENES)[number];

const SCENE_BUTTONS: Record<Scene, { label: MessageKey, svg: string }> = {
  Sphere: { label: "view.inputSphere", svg: pointerIcon.svg },
  Necklace: { label: "view.inputNecklace", svg: cutIcon.svg },
  BorsukUlam: { label: "view.borsukUlam", svg: shapeIcon.svg },
};

/** The morph's player buttons: play into the shape, play back to the sphere, pause. */
const PLAY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 5v14l11-7z" fill="currentColor"/></svg>';
const BACK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 5v14l-11-7z" fill="currentColor"/></svg>';
const PAUSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>';

/** A player button of the morph: its direction, icon and name when it would start the morph. */
type Player = { button: HTMLButtonElement, direction: 1 | -1, icon: string, label: MessageKey };

/** How long the morph between sphere and shape takes, in ms, all the way. */
const MORPH_DURATION = 1000;

const easeInOut = (x: number) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

/**
 * The buttons in the upper left corner, modeled on Climate Helix's scene
 * switcher: three exclusive scenes. *Sphere* and *Necklace* choose what sets
 * the cuts, the pointer on the sphere or the handles on the necklace
 * (SETTINGS.view.input, INPUT_CHANGED). *Borsuk-Ulam* morphs the sphere into
 * the shape of g and hides the necklace and the gauge; the pointer sets the
 * cuts there. The slider, shown in that scene, scrubs the morph; the player
 * buttons around it play the morph back to the sphere (◀) or into the shape
 * (▶), each turning into pause (⏸) while it plays its way. Both write SETTINGS.sphere.morph and
 * dispatch MORPH_CHANGED, which the sphere follows. Each scene is entered and
 * left through `enter` and `leave`: leaving the shape restores the sphere at
 * once, so the next scene starts without waiting for the morph.
 */
class ViewSwitcher {
  #buttons = new Map<Scene, HTMLButtonElement>();
  #slider: HTMLInputElement;
  #players: Player[];
  /** The running morph animation's frame request. */
  #frame: number | undefined;
  /** Where the morph is playing: into the shape (1), back to the sphere (-1), or paused (0). */
  #direction: 1 | -1 | 0 = 0;

  constructor(container: Element = document.body) {
    SETTINGS.sphere.morph = SETTINGS.sphere.show_borsuk_ulam_proof_shape ? 1 : 0;

    const div = document.createElement("div");
    div.className = "view-switcher";
    const scenes = document.createElement("div");
    scenes.className = "view-scenes";
    scenes.setAttribute("role", "group");
    for (const scene of SCENES) {
      const button = this.createButton(t(SCENE_BUTTONS[scene].label), SCENE_BUTTONS[scene].svg, () => this.select(scene));
      this.#buttons.set(scene, button);
      scenes.appendChild(button);
    }

    const morph = document.createElement("div");
    morph.className = "view-morph";
    this.#slider = document.createElement("input");
    this.#slider.type = "range";
    this.#slider.min = "0";
    this.#slider.max = "1";
    this.#slider.step = "0.01";
    this.#slider.setAttribute("aria-label", t("view.morph"));
    this.#slider.title = t("view.morph");
    this.#slider.addEventListener("input", () => {
      this.stopMorph();
      this.setMorph(Number(this.#slider.value));
    });
    const player = (direction: 1 | -1, icon: string, label: MessageKey): Player => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "view-morph-button";
      // Plays its way, or pauses if it already does; the other way turns the morph around.
      button.addEventListener("click", () => this.#direction === direction ? this.stopMorph() : this.morphTo(direction > 0 ? 1 : 0));
      return { button, direction, icon, label };
    };
    this.#players = [player(-1, BACK_ICON, "view.morphBack"), player(1, PLAY_ICON, "view.morphPlay")];
    morph.append(this.#players[0].button, this.#slider, this.#players[1].button);

    div.append(scenes, morph);
    container.appendChild(div);
    this.update();
  }

  private createButton(label: string, svg: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "view-button";
    button.setAttribute("aria-label", label);

    const template = document.createElement("template");
    template.innerHTML = svg;
    const icon = template.content.querySelector("svg");
    if (icon) {
      icon.classList.add("view-icon");
      button.appendChild(icon);
    }

    const tooltip = document.createElement("span");
    tooltip.className = "view-tooltip";
    tooltip.textContent = label;
    button.appendChild(tooltip);

    button.addEventListener("click", onClick);
    return button;
  }

  /** The scene shown: the shape, or else what sets the cuts. */
  get scene(): Scene {
    return SETTINGS.sphere.show_borsuk_ulam_proof_shape ? "BorsukUlam" : SETTINGS.view.input;
  }

  /** Leaves the scene shown for another one, and remembers it. */
  private select(scene: Scene): void {
    if (scene === this.scene) {
      return;
    }
    this.leave(this.scene);
    this.enter(scene);
    persistentState.update({ settings: collectSettings() });
    this.update();
    // A new game hides the solutions again; the views follow what sets the cuts.
    resetSolutionHints();
    Events.dispatchEvent(Events.INPUT_CHANGED);
  }

  /** Leaving the shape restores the sphere at once: no morph to wait for. */
  private leave(scene: Scene): void {
    if (scene === "BorsukUlam") {
      this.stopMorph();
      this.setMorph(0);
      SETTINGS.sphere.show_borsuk_ulam_proof_shape = false;
      // The sphere drops the shape; the necklace and the gauge show again.
      Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
    }
  }

  private enter(scene: Scene): void {
    if (scene === "BorsukUlam") {
      SETTINGS.sphere.show_borsuk_ulam_proof_shape = true;
      // The sphere builds the shape; the necklace and the gauge hide.
      Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
      this.morphTo(1);
    } else {
      SETTINGS.view.input = scene;
    }
  }

  /** Animates the morph from where it is to `target`, eased, in up to MORPH_DURATION. */
  private morphTo(target: number): void {
    this.stopMorph();
    const from = SETTINGS.sphere.morph;
    const duration = MORPH_DURATION * Math.abs(target - from);
    const start = performance.now();
    this.#direction = target > from ? 1 : -1;
    const step = (now: DOMHighResTimeStamp) => {
      const progress = duration > 0 ? Math.min(1, (now - start) / duration) : 1;
      if (progress >= 1) {
        this.#frame = undefined;
        this.#direction = 0;
      } else {
        this.#frame = requestAnimationFrame(step);
      }
      this.setMorph(from + (target - from) * easeInOut(progress));
    };
    this.#frame = requestAnimationFrame(step);
    this.updatePlayers();
  }

  /** Stops the morph where it is: a pause, or before the slider or another scene takes over. */
  private stopMorph(): void {
    if (this.#frame !== undefined) {
      cancelAnimationFrame(this.#frame);
      this.#frame = undefined;
    }
    this.#direction = 0;
    this.updatePlayers();
  }

  private setMorph(value: number): void {
    SETTINGS.sphere.morph = value;
    this.#slider.value = String(value);
    this.updatePlayers();
    Events.dispatchEvent(Events.MORPH_CHANGED);
  }

  /** Pause on the button playing, play on the other; each disabled at the end it plays to. */
  private updatePlayers(): void {
    const morph = SETTINGS.sphere.morph;
    for (const { button, direction, icon, label } of this.#players) {
      const playing = this.#direction === direction;
      const action = playing ? "pause" : "play";
      if (button.dataset.action !== action) {
        button.dataset.action = action;
        button.innerHTML = playing ? PAUSE_ICON : icon;
        const name = t(playing ? "view.morphPause" : label);
        button.setAttribute("aria-label", name);
        button.title = name;
      }
      button.disabled = !playing && (direction > 0 ? morph >= 1 : morph <= 0);
    }
  }

  private update(): void {
    const current = this.scene;
    this.#buttons.forEach((button, scene) => {
      const active = scene === current;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
    });
    (this.#slider.parentElement as HTMLElement).hidden = current !== "BorsukUlam";
    this.#slider.value = String(SETTINGS.sphere.morph);
    this.updatePlayers();
  }
}

export { ViewSwitcher };
