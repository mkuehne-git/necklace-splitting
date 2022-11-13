import html2canvas from "html2canvas";

import { Settings, SETTINGS } from "./Settings";
// This is for the screen capture. Without the WebGL content, i.e. my sphere would not be showing.
//
// https://stackoverflow.com/questions/55760121/html2canvas-captures-everything-except-the-content-of-an-inner-canvas
HTMLCanvasElement.prototype.getContext = (function (origFn) {
  return function (type, attribs) {
    attribs = attribs || {};
    attribs.preserveDrawingBuffer = true;
    return origFn.call(this, type, attribs);
  };
})(HTMLCanvasElement.prototype.getContext);

const CAPTURES = ["All", "Sphere", "Necklace"];

type CaptureControls = {
  all: HTMLElement | undefined,
  sphere: HTMLElement | undefined,
  necklace: HTMLElement | undefined
}

/**
 * Allow to take screen captures of existing DOM elements. Reacts on keyboard key 's'.
 */
class ScreenCapture {
  #fBeforeCapture: () => HTMLElement;
  #optionsArray: any[];
  #captionIndex: number;
  constructor(
    settings: any,
    options: CaptureControls = {
      all: undefined,
      sphere: undefined,
      necklace: undefined,
    }
  ) {
    this.#fBeforeCapture = () => document.body;
    this.#configureSettings(settings, options);
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "#") {
        this.capture();
      }
    });
  }

  #configureSettings(settings, options) {
    this.#optionsArray = [options.all, options.sphere, options.necklace];
    const folder = settings.folder;
    const property = settings.property;
    property.selection = CAPTURES[0];
    this.#captionIndex = 0;
    this.#fBeforeCapture = () => {
      return this.#optionsArray[this.#captionIndex];
    };
    property.on_capture_clicked = () => this.capture();

    Settings.addRadioButtons(
      folder,
      property.selection,
      CAPTURES,
      (obj, prop, index) => {
        this.#captionIndex = index;
      }
    );
    folder.add(property, "on_capture_clicked").name("Click or press 's'");
  }

  capture(fBeforeCapture = this.#fBeforeCapture) {
    console.log(`screenCapture ${fBeforeCapture}`);
    const elementToCapture = fBeforeCapture();
    if (!elementToCapture) {
      throw new Error("No element to capture");
    }
    setTimeout(() => {
      const style = window.getComputedStyle(document.body);
      const backgroundColor = style.getPropertyValue("background-color");
      html2canvas(elementToCapture, { backgroundColor }).then((canvas) => {
        const a = document.createElement("a");
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL();
        a.download = "necklace.png";
        a.click();
      });
    }, 100);
  }
}

export { ScreenCapture };
