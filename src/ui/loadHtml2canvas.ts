import type html2canvasType from "html2canvas";

let loading: Promise<typeof html2canvasType> | undefined;

/**
 * Loads html2canvas (about 200 kB) on first use instead of at startup, for the
 * screen capture and the imprint. Every caller shares the one import.
 */
export function loadHtml2canvas(): Promise<typeof html2canvasType> {
  loading ??= import("html2canvas").then((module) => module.default);
  return loading;
}
