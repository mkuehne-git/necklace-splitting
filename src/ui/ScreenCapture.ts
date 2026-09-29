import { Events } from "../Enums";
import { SETTINGS, type CaptureTarget } from "../settings/settingsValues";
import { loadHtml2canvas } from "./loadHtml2canvas";
import { showPwaStatus } from "./PwaUpdate";
import { t } from "../i18n";
// This is for the screen capture. Without the WebGL content, i.e. my sphere would not be showing.
// It must run before the renderer is created, so it stays in this module, which main.ts loads
// at startup; only html2canvas itself is loaded on first use.
//
// https://stackoverflow.com/questions/55760121/html2canvas-captures-everything-except-the-content-of-an-inner-canvas
type GetContext = (this: HTMLCanvasElement, type: string, attribs?: Record<string, unknown>) => RenderingContext | null;
HTMLCanvasElement.prototype.getContext = (function (origFn: GetContext): GetContext {
  return function (type, attribs) {
    return origFn.call(this, type, { ...attribs, preserveDrawingBuffer: true });
  };
})(HTMLCanvasElement.prototype.getContext as GetContext) as typeof HTMLCanvasElement.prototype.getContext;

/**
 * Saves a screen capture of the page, the sphere or the necklace as a PNG,
 * whichever the Screen capture setting chooses. Alt+S or the settings'
 * button (the SCREEN_CAPTURE event) take one.
 */
class ScreenCapture {
  #elements: Record<CaptureTarget, HTMLElement>;

  constructor(elements: Record<CaptureTarget, HTMLElement>) {
    this.#elements = elements;
    // The key, not the character: on macOS, Alt+S types "ß".
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.code === "KeyS") {
        e.stopPropagation();
        e.preventDefault();
        this.capture();
      }
    });
    document.body.addEventListener(Events.SCREEN_CAPTURE.toString(), () => this.capture());
  }

  capture(target: CaptureTarget = SETTINGS.capture): void {
    const elementToCapture = this.#elements[target];
    setTimeout(() => {
      const style = window.getComputedStyle(document.body);
      const backgroundColor = style.getPropertyValue("background-color");
      // The settings panel is not part of the picture.
      loadHtml2canvas().then((html2canvas) => html2canvas(elementToCapture, {
        backgroundColor,
        ignoreElements: (element) => element.id === "settings-panel",
      })).then((canvas) => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "necklace.png";
        a.click();
      }).catch((error: unknown) => {
        // html2canvas stops at CSS it cannot parse, e.g. color-mix() (gotchas.md).
        showPwaStatus(t("capture.failed"), "warning");
        console.error(error);
      });
    }, 100);
  }
}

export { ScreenCapture };
