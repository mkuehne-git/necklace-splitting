import { NecklaceModel } from "./NecklaceModel";
interface ComponentOptions {
  id: string;
  container: HTMLElement;
}
/** Abstract component class with id, canvas and a NecklaceModel. */
abstract class NecklaceComponent {
  protected model: NecklaceModel;

  #id: string;
  #container: HTMLElement;
  #canvas: HTMLCanvasElement;
  #observer: MutationObserver;

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "canvas", container: document.body }
  ) {
    this.model = model;
    this.#id = options.id;
    this.#container = options.container;
  }
  get container(): HTMLElement {
    return this.#container;
  }
  get canvas(): HTMLCanvasElement {
    return this.#canvas;
  }

  set canvas(c: HTMLCanvasElement) {
    if (this.#canvas !== undefined) {
      throw Error("Canvas already set")
    }
    this.#canvas = c;
  }

  get domElement(): HTMLCanvasElement {
    if (this.#canvas === undefined) {
      const canvas = this.initializeCanvas();
      if (this.#id !== undefined) {
        canvas.setAttribute("id", this.#id);
      }

      canvas.classList.add("sphere");
      const componentThis = this;
      let initialized = false;
      this.#observer = new MutationObserver((mutations) => {
        if (initialized) {
          mutations.forEach((value, index, array) => {
            componentThis.onMutation(value);
          });
        }
      });
      this.#observer.observe(this.#container, {
        attributes: true,
        attributeFilter: ["class"],
      });
      this.#container.appendChild(canvas);

      initialized = true;
      return canvas;
    }
    return this.#canvas;
  }
  /**
   * Set visibility of this component, affects rendering only.
   */
  set visible(visible: boolean) {
    if (this.#canvas !== undefined) {
      this.#canvas.style.visibility = visible ? "visible" : "hidden";
    }
  }

  abstract onMutation(mutation: MutationRecord): void;

  /**
   * Creates and initializes the canvas element.
   *
   * @return {HTMLCanvasElement} the initialized canvas
   */
  abstract initializeCanvas(): HTMLCanvasElement;

  abstract render(): void;
}

export { NecklaceComponent, ComponentOptions };
