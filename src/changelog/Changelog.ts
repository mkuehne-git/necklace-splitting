import { Events } from "../Enums";
import { OverlayPage } from "../ui/OverlayPage";
import { t } from "../i18n";
import { parseChangelog, renderEntries, whatsNewEntries, type ChangelogEntry } from "./changelogFormat";

/** CHANGELOG.md is loaded on demand, in its own chunk; the build adds the newest entry's commit (vite.config.ts). */
const loadChangelog = async (): Promise<ChangelogEntry[]> => parseChangelog((await import("../../CHANGELOG.md?raw")).default);

/** Says that the entries are English, in languages that need it. */
const note = (): string => t("changelog.note") ? `<p class="changelog-note">${t("changelog.note")}</p>\n` : "";

/**
 * Shows CHANGELOG.md as a full page, opened from the version label in the
 * lower right corner or from the settings' footer, or only the news since the
 * last visit (What's new).
 * It closes like the imprint: with its X button or Escape.
 */
class Changelog {
  #page = new OverlayPage("changelog", Events.HIDE_CHANGELOG.toString(), () => this.#resolveClosed?.());
  #resolveClosed: (() => void) | undefined;

  constructor() {
    document.body.addEventListener(Events.SHOW_CHANGELOG.toString(), () => void this.show());
    document.body.addEventListener(Events.HIDE_CHANGELOG.toString(), () => this.hide());
  }

  async show(): Promise<void> {
    const entries = await loadChangelog();
    this.renderFull(this.#page.show(), entries);
  }

  /**
   * Shows the changes of the versions after `since`, up to `current`, and
   * resolves once the page is closed - at once if there is nothing to show.
   */
  async showWhatsNew(since: string, current: string): Promise<void> {
    const entries = await loadChangelog();
    const news = whatsNewEntries(entries, since, current);
    if (news.length === 0) {
      return;
    }
    const closed = new Promise<void>((resolve) => this.#resolveClosed = resolve);
    const content = this.#page.show();
    content.innerHTML = `<h1>${t("whatsNew.heading")}</h1>\n${note()}${renderEntries(news)}`;
    const full = document.createElement("button");
    full.type = "button";
    full.className = "changelog-full pwa-update-button secondary";
    full.textContent = t("whatsNew.fullChangelog");
    // Replaces the content rather than reopening the page, which would count as closing it.
    full.addEventListener("click", () => {
      this.renderFull(content, entries);
      content.parentElement?.scrollTo(0, 0);
    });
    content.appendChild(full);
    await closed;
    this.#resolveClosed = undefined;
  }

  hide(): void {
    this.#page.hide();
  }

  private renderFull(content: HTMLElement, entries: ChangelogEntry[]): void {
    content.innerHTML = `<h1>${t("changelog.heading")}</h1>\n${note()}${renderEntries(entries)}`;
  }
}
export { Changelog };
