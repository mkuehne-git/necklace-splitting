import { t } from "../i18n";

/**
 * The settings panel: a native side panel on the right (full screen on
 * phones) with a scrolling body for the settings and a fixed footer for the
 * app functions. {@link SettingsButton} opens and closes it.
 */
class SettingsPanel {
    readonly element: HTMLElement;
    /** Scrolls; holds the settings sections. */
    readonly body: HTMLElement;
    /** Stays in view; holds the app functions. */
    readonly footer: HTMLElement;

    constructor(container: Element) {
        const panel = document.createElement("aside");
        panel.id = "settings-panel";
        panel.className = "settings-panel";
        panel.hidden = true;
        panel.setAttribute("aria-label", t("settings.title"));

        const header = document.createElement("div");
        header.className = "settings-header";
        const title = document.createElement("h2");
        title.textContent = t("settings.title");
        header.appendChild(title);

        this.body = document.createElement("div");
        this.body.className = "settings-body";
        this.footer = document.createElement("div");
        this.footer.className = "settings-footer";

        panel.append(header, this.body, this.footer);
        container.appendChild(panel);
        this.element = panel;
    }

    get isOpen(): boolean {
        return !this.element.hidden;
    }

    show(): void {
        this.element.hidden = false;
    }

    hide(): void {
        this.element.hidden = true;
    }
}

export { SettingsPanel };
