// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SVGToggleButton } from "../src/SVGToggleButton";

const icon = (id: string) => ({ id, svg: '<svg xmlns="http://www.w3.org/2000/svg"></svg>' });

let container: HTMLElement;
beforeEach(() => {
  document.body.innerHTML = "";
  container = document.createElement("div");
  document.body.appendChild(container);
});

const create = () => new SVGToggleButton({ container, icons: [icon("open"), icon("close")], classToken: "test", event: "test-clicked" });
const div = () => container.querySelector<HTMLElement>(".toggle-div")!;
const shown = () => [...div().querySelectorAll(".show")].map((svg) => svg.id);

describe("SVGToggleButton", () => {
  it("holds one SVG per icon, tagged with the class token", () => {
    create();
    expect(div().classList.contains("test")).toBe(true);
    const ids = [...div().querySelectorAll("svg")].map((svg) => svg.id);
    expect(ids).toEqual(["open-icon", "close-icon"]);
    expect(div().querySelector("svg")!.classList.contains("test")).toBe(true);
  });

  it("shows the chosen icon and toggles to the other", () => {
    const button = create();
    expect(shown()).toEqual([]);
    button.show(0);
    expect(shown()).toEqual(["open-icon"]);
    button.toggle();
    expect(shown()).toEqual(["close-icon"]);
    button.toggle();
    expect(shown()).toEqual(["open-icon"]);
  });

  it("reports a click once its animation has ended", () => {
    // lil-gui.css runs a short pulse animation on .clicked; the listener is
    // called when it ends, so the animation is visible before anything changes.
    const button = create();
    const listener = vi.fn();
    button.addOnClickListener(listener);
    div().click();
    expect(div().classList.contains("clicked")).toBe(true);
    expect(listener).not.toHaveBeenCalled();
    div().dispatchEvent(new Event("animationend"));
    expect(listener).toHaveBeenCalledOnce();
    expect(div().classList.contains("clicked")).toBe(false);
  });

  it("ignores animations that were not started by a click", () => {
    const button = create();
    const listener = vi.fn();
    button.addOnClickListener(listener);
    div().dispatchEvent(new Event("animationend"));
    expect(listener).not.toHaveBeenCalled();
  });

  it("dispatches its event so that other modules can listen on the page", () => {
    create();
    const listener = vi.fn();
    document.body.addEventListener("test-clicked", listener);
    div().click();
    div().dispatchEvent(new Event("animationend"));
    expect(listener).toHaveBeenCalledOnce();
  });
});
