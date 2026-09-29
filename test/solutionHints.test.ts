import { afterEach, describe, expect, it } from "vitest";

import { SETTINGS, resetSolutionHints, setSolutionHint, solutionHintShown } from "../src/settings/settingsValues";

const defaults = structuredClone(SETTINGS);

afterEach(() => {
  SETTINGS.view.input = defaults.view.input;
  SETTINGS.sphere.show_borsuk_ulam_proof_shape = defaults.sphere.show_borsuk_ulam_proof_shape;
  SETTINGS.necklace.show_solution_band = defaults.necklace.show_solution_band;
  SETTINGS.necklace.show_solutions = defaults.necklace.show_solutions;
  resetSolutionHints();
});

describe("solution hints", () => {
  it("follow the settings when the pointer sets the cuts", () => {
    expect(solutionHintShown("show_solution_band")).toBe(true);
    setSolutionHint("show_solution_band", false);
    expect(SETTINGS.necklace.show_solution_band).toBe(false);
    expect(solutionHintShown("show_solution_band")).toBe(false);
  });

  it("are hidden in the game, without changing the settings", () => {
    SETTINGS.view.input = "Necklace";
    expect(solutionHintShown("show_solution_band")).toBe(false);
    expect(solutionHintShown("show_solutions")).toBe(false);
    expect(SETTINGS.necklace.show_solution_band).toBe(true);
    expect(SETTINGS.necklace.show_solutions).toBe(true);
  });

  it("can be shown in the game, for that game only", () => {
    SETTINGS.view.input = "Necklace";
    setSolutionHint("show_solutions", true);
    expect(solutionHintShown("show_solutions")).toBe(true);
    expect(solutionHintShown("show_solution_band")).toBe(false);
    // Hiding it again in the game leaves the setting alone too.
    setSolutionHint("show_solutions", false);
    expect(SETTINGS.necklace.show_solutions).toBe(true);
    setSolutionHint("show_solutions", true);
    resetSolutionHints();
    expect(solutionHintShown("show_solutions")).toBe(false);
  });

  it("follow the settings with the Borsuk-Ulam shape, where the pointer sets the cuts", () => {
    SETTINGS.view.input = "Necklace";
    SETTINGS.sphere.show_borsuk_ulam_proof_shape = true;
    expect(solutionHintShown("show_solution_band")).toBe(true);
  });
});
