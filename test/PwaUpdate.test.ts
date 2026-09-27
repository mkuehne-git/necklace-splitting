// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The service worker registration of vite-plugin-pwa; the tests call its callbacks.
const pwa = vi.hoisted(() => ({
  options: undefined as undefined | { onNeedRefresh?: () => void; onOfflineReady?: () => void },
  updateServiceWorker: vi.fn(async () => { }),
}));
vi.mock("virtual:pwa-register", () => ({
  registerSW: (options: typeof pwa.options) => {
    pwa.options = options;
    return pwa.updateServiceWorker;
  },
}));

import { checkForPwaUpdates, initPwaUpdate } from "../src/ui/PwaUpdate";

const dialog = () => document.getElementById("pwa-update-dialog")!;
const status = () => document.getElementById("pwa-status");
const button = (text: string) => [...dialog().querySelectorAll("button")].find((b) => b.textContent === text)!;

/** Replaces navigator.serviceWorker for one test. */
function serviceWorkers(registrations: { update: () => Promise<void>; waiting: unknown }[] | undefined) {
  Object.defineProperty(navigator, "serviceWorker", {
    configurable: true,
    value: registrations && { getRegistrations: async () => registrations },
  });
  if (!registrations) {
    delete (navigator as unknown as Record<string, unknown>).serviceWorker;
  }
}

/** Sets window.isSecureContext for one test (happy-dom has none). */
function secureContext(secure: boolean) {
  Object.defineProperty(window, "isSecureContext", { configurable: true, value: secure });
}

beforeEach(() => {
  document.body.innerHTML = "";
  pwa.updateServiceWorker.mockClear();
  initPwaUpdate();
});

afterEach(() => {
  delete (navigator as unknown as Record<string, unknown>).serviceWorker;
  delete (window as unknown as Record<string, unknown>).isSecureContext;
});

describe("PWA update prompt", () => {
  it("stays hidden until a new version is waiting", () => {
    expect(dialog().classList.contains("hidden")).toBe(true);
    pwa.options!.onNeedRefresh!();
    expect(dialog().classList.contains("hidden")).toBe(false);
  });

  it("reloads into the new version on Reload", async () => {
    pwa.options!.onNeedRefresh!();
    button("Reload").click();
    expect(pwa.updateServiceWorker).toHaveBeenCalledOnce();
  });

  it("closes on Later without updating", () => {
    pwa.options!.onNeedRefresh!();
    button("Later").click();
    expect(dialog().classList.contains("hidden")).toBe(true);
    expect(pwa.updateServiceWorker).not.toHaveBeenCalled();
  });

  it("is created once, however often it is shown", () => {
    pwa.options!.onNeedRefresh!();
    pwa.options!.onNeedRefresh!();
    expect(document.querySelectorAll("#pwa-update-dialog")).toHaveLength(1);
  });
});

describe("Check for updates", () => {
  it("offers the update when one is waiting", async () => {
    const update = vi.fn(async () => { });
    serviceWorkers([{ update, waiting: {} }]);
    expect(await checkForPwaUpdates()).toBe(true);
    expect(update).toHaveBeenCalledOnce();
    expect(status()!.textContent).toBe("Update ready. Reload to apply it.");
    expect(dialog().classList.contains("hidden")).toBe(false);
  });

  it("says so when there is no update", async () => {
    serviceWorkers([{ update: async () => { }, waiting: null }]);
    expect(await checkForPwaUpdates()).toBe(false);
    expect(status()!.textContent).toBe("No update available.");
    expect(dialog().classList.contains("hidden")).toBe(true);
  });

  it("says so when no service worker is registered", async () => {
    serviceWorkers([]);
    expect(await checkForPwaUpdates()).toBe(false);
    expect(status()!.textContent).toBe("No service worker is registered yet.");
  });

  it("names plain HTTP as the reason when the page is not secure", async () => {
    serviceWorkers(undefined);
    secureContext(false);
    expect(await checkForPwaUpdates()).toBe(false);
    expect(status()!.textContent).toBe("Updates need HTTPS or localhost; this page was opened over plain HTTP.");
  });

  it("names the browser window when the page is secure but has no service workers", async () => {
    serviceWorkers(undefined);
    secureContext(true);
    expect(await checkForPwaUpdates()).toBe(false);
    expect(status()!.textContent).toBe("Updates are turned off in this browser window, for example in a private window.");
  });

  it("shows one status message at a time, and removes it after a while", async () => {
    vi.useFakeTimers();
    serviceWorkers([{ update: async () => { }, waiting: null }]);
    await checkForPwaUpdates();
    await checkForPwaUpdates();
    expect(document.querySelectorAll("#pwa-status")).toHaveLength(1);
    vi.advanceTimersByTime(3500);
    expect(status()).toBeNull();
    vi.useRealTimers();
  });
});
