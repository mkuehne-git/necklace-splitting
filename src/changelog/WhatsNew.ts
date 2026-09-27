import type { Changelog } from "./Changelog";
import { compareVersions } from "./changelogFormat";
import type { PersistentState } from "../settings/PersistentState";

/**
 * The version deployed before the modernization (live from 2025 until
 * 2026-09-27): someone who used the app before and has not seen any news yet
 * gets the news since then. v0.7.0 was live for a few hours only.
 */
export const VERSION_BEFORE_WHATS_NEW = "0.4.13";

/**
 * The version whose news someone has already seen, or undefined for a first
 * visit: a new visitor gets the app as it is, without news. A visit before
 * What's new existed shows in stored settings (since v0.7.0) or in a service
 * worker that already controls the page (every deployed version had one).
 */
export function versionSeenBefore(lastSeenVersion: string | undefined, visitedBefore: boolean): string | undefined {
  return lastSeenVersion ?? (visitedBefore ? VERSION_BEFORE_WHATS_NEW : undefined);
}

/** Whether the app was used in this browser before, as far as it can tell at startup. */
export function visitedBefore(state: PersistentState): boolean {
  return state.hadStoredState || (typeof navigator !== "undefined" && !!navigator.serviceWorker?.controller);
}

/**
 * Shows the changes since the version seen last, once: the current version
 * counts as seen as soon as its news are shown. Resolves when they are closed,
 * or at once if there are none.
 */
export async function showWhatsNewOnce(changelog: Changelog, state: PersistentState, currentVersion: string): Promise<void> {
  const since = versionSeenBefore(state.state.lastSeenVersion, visitedBefore(state));
  if (state.state.lastSeenVersion !== currentVersion) {
    state.update({ lastSeenVersion: currentVersion });
    state.flush();
  }
  if (since !== undefined && compareVersions(since, currentVersion) < 0) {
    await changelog.showWhatsNew(since, currentVersion);
  }
}
