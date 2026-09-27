// @vitest-environment happy-dom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The real imprint text is private (and gitignored); html2canvas needs a real browser.
vi.mock("../src/imprint-gen", () => ({ decryptedAES: () => "<h1>Impressum</h1>" }));
const html2canvas = vi.hoisted(() => vi.fn());
vi.mock("html2canvas", () => ({ default: html2canvas }));

import { Imprint } from "../src/Imprint";
import { Events } from "../src/Enums";

let imprint: Imprint;
/** Resolves the pending html2canvas render(s), as if rendering finished. */
let finishRendering: () => void;

beforeAll(async () => {
  imprint = new Imprint();
  expect(await imprint.isAvailable()).toBe(true);
});

beforeEach(() => {
  const pending: ((canvas: HTMLCanvasElement) => void)[] = [];
  html2canvas.mockReset();
  html2canvas.mockImplementation(() => new Promise((resolve) => pending.push(resolve)));
  finishRendering = () => pending.splice(0).forEach((resolve) => resolve(document.createElement("canvas")));
});

afterEach(() => {
  imprint.hide();
});

const overlay = () => document.querySelector(".imprint");

describe("Imprint", () => {
  it("renders the decrypted text as an image", async () => {
    imprint.show();
    expect(overlay()!.innerHTML).toContain("Impressum");
    expect(html2canvas).toHaveBeenCalledOnce();
    expect(html2canvas.mock.calls[0][0]).toBe(overlay());
    finishRendering();
    await vi.waitFor(() => expect(overlay()!.querySelector("canvas")).not.toBeNull());
    // The text itself is gone from the page, only the image and the trailer remain.
    expect(overlay()!.querySelector("h1")).toBeNull();
    expect(overlay()!.textContent).toContain("impressum-generator.de");
    expect(overlay()!.querySelector("#hide-imprint")).not.toBeNull();
  });

  it("opens only once", () => {
    imprint.show();
    imprint.show();
    expect(document.querySelectorAll(".imprint")).toHaveLength(1);
    expect(html2canvas).toHaveBeenCalledOnce();
  });

  it("opens and closes through the application events", () => {
    Events.dispatchEvent(Events.SHOW_IMPRINT);
    expect(overlay()).not.toBeNull();
    Events.dispatchEvent(Events.HIDE_IMPRINT);
    expect(overlay()).toBeNull();
  });

  it("closes with Escape", () => {
    imprint.show();
    document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(overlay()).toBeNull();
  });

  it("closes with Escape while the settings panel has the focus (v0.4.25)", () => {
    // lil-gui stops key events inside its panel from bubbling, and its Imprint
    // button keeps the focus after opening the imprint.
    imprint.show();
    const gui = document.createElement("div");
    gui.addEventListener("keydown", (event) => event.stopPropagation());
    const button = document.createElement("button");
    gui.appendChild(button);
    document.body.appendChild(gui);
    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(overlay()).toBeNull();
    gui.remove();
  });

  it("ignores other keys", () => {
    imprint.show();
    document.body.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(overlay()).not.toBeNull();
  });

  it("redraws on resize while open, and not while closed", () => {
    window.dispatchEvent(new Event("resize"));
    expect(html2canvas).not.toHaveBeenCalled();
    imprint.show();
    window.dispatchEvent(new Event("resize"));
    expect(html2canvas).toHaveBeenCalledTimes(2);
    expect(document.querySelectorAll(".imprint")).toHaveLength(1);
  });
});
