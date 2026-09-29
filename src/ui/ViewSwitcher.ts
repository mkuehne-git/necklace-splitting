import '../css/switcher.css';

import { Events } from "../Enums";
import { SETTINGS } from "../settings/settingsValues";
import { collectSettings, persistentState } from "../settings/PersistentState";
import { t } from "../i18n";
import { icon as shapeIcon } from "../icons/shape/shapeIcon";

/** How long the morph between sphere and shape takes, in ms, all the way. */
const MORPH_DURATION = 1000;

const easeInOut = (x: number) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

/**
 * The buttons in the lower left corner, modeled on Climate Helix's scene
 * switcher. The Borsuk-Ulam toggle morphs the sphere into
 * the shape of g and back, and hides the necklace and the gauge while it is on;
 * the slider beside it, shown with the shape, scrubs the morph by hand. Both
 * write SETTINGS.sphere.morph and dispatch MORPH_CHANGED, which the sphere follows.
 */
class ViewSwitcher {
  #shapeButton: HTMLButtonElement;
  #slider: HTMLInputElement;
  /** The running morph animation's frame request. */
  #frame: number | undefined;

  constructor(container: Element = document.body) {
    SETTINGS.sphere.morph = SETTINGS.sphere.show_borsuk_ulam_proof_shape ? 1 : 0;

    const div = document.createElement("div");
    div.className = "view-switcher";
    this.#shapeButton = this.createButton(t("view.borsukUlam"), shapeIcon.svg, () => this.toggleShape());
    this.#slider = document.createElement("input");
    this.#slider.type = "range";
    this.#slider.className = "view-morph";
    this.#slider.min = "0";
    this.#slider.max = "1";
    this.#slider.step = "0.01";
    this.#slider.setAttribute("aria-label", t("view.morph"));
    this.#slider.title = t("view.morph");
    this.#slider.addEventListener("input", () => {
      this.stopMorph();
      this.setMorph(Number(this.#slider.value));
    });
    div.append(this.#shapeButton, this.#slider);
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

  /** Switches the Borsuk-Ulam shape on or off, remembers it, and morphs there. */
  toggleShape(): void {
    const shape = !SETTINGS.sphere.show_borsuk_ulam_proof_shape;
    SETTINGS.sphere.show_borsuk_ulam_proof_shape = shape;
    persistentState.update({ settings: collectSettings() });
    // The sphere builds the shape if it lacks it; the necklace and the gauge hide or show.
    Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
    this.update();
    this.morphTo(shape ? 1 : 0);
  }

  /** Animates the morph from where it is to `target`, eased, in up to MORPH_DURATION. */
  private morphTo(target: number): void {
    this.stopMorph();
    const from = SETTINGS.sphere.morph;
    const duration = MORPH_DURATION * Math.abs(target - from);
    const start = performance.now();
    const step = (now: DOMHighResTimeStamp) => {
      const progress = duration > 0 ? Math.min(1, (now - start) / duration) : 1;
      this.setMorph(from + (target - from) * easeInOut(progress));
      this.#frame = progress < 1 ? requestAnimationFrame(step) : undefined;
    };
    this.#frame = requestAnimationFrame(step);
  }

  private stopMorph(): void {
    if (this.#frame !== undefined) {
      cancelAnimationFrame(this.#frame);
      this.#frame = undefined;
    }
  }

  private setMorph(value: number): void {
    SETTINGS.sphere.morph = value;
    this.#slider.value = String(value);
    Events.dispatchEvent(Events.MORPH_CHANGED);
  }

  private update(): void {
    const shape = SETTINGS.sphere.show_borsuk_ulam_proof_shape;
    this.#shapeButton.setAttribute("aria-pressed", String(shape));
    this.#shapeButton.classList.toggle("active", shape);
    this.#slider.hidden = !shape;
    this.#slider.value = String(SETTINGS.sphere.morph);
  }
}

export { ViewSwitcher };
