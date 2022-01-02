import NecklaceModel from "./NecklaceModel";
interface ComponentOptions {
  id: string;
  container: HTMLElement;
}
/** Abstract component class with id, canvas and a NecklaceModel. */
abstract class NecklaceComponent {
  protected model: NecklaceModel;

  private _id: string;
  private _container: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _observer: MutationObserver;

  constructor(
    model: NecklaceModel,
    options: ComponentOptions = { id: "canvas", container: document.body }
  ) {
    this.model = model;
    this._id = options.id;
    this._container = options.container;
    this._canvas = this.domElement;
  }
  get container(): HTMLElement {
    return this._container;
  }
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get domElement() {
    if (this._canvas === undefined) {
      const canvas = this.initializeCanvas();
      if (this._id !== undefined) {
        canvas.setAttribute("id", this._id);
      }

      canvas.classList.add("sphere");
      const componentThis = this;
      let initialized = false;
      this._observer = new MutationObserver((mutations) => {
        if (initialized) {
          mutations.forEach((value, index, array) => {
            componentThis.onMutation(value);
          });
        }
      });
      this._observer.observe(this._container, {
        attributes: true,
        attributeFilter: ["class"],
      });
      this._container.appendChild(canvas);

      initialized = true;
      return canvas;
    }
    return this._canvas;
  }
  /**
   * Set visibility of this component, affects rendering only.
   */
  set visible(visible: boolean) {
    if (this._canvas !== undefined) {
      this._canvas.style.visibility = visible ? "visible" : "hidden";
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
