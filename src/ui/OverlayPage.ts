import { SVGToggleButton } from "./SVGToggleButton";
import close from "../icons/settings/close.svg?raw";
import { t } from "../i18n";

/** The settings' X, under an id of its own: the settings button has an icon "close" too. */
const closeIcon = { id: "overlay-close", svg: close };

/**
 * A full-page overlay above the app, as used by the imprint: it covers the
 * sphere, the necklace and the buttons, and closes with the X button fixed at
 * the settings button's position or with Escape.
 */
class OverlayPage {
    #div: HTMLDivElement | undefined;
    #classToken: string;
    #hideEvent: string;
    #onHide: () => void;

    /**
     * @param classToken added to the overlay's div, e.g. "imprint"
     * @param hideEvent dispatched by the X button (after its click animation)
     * @param onHide called whenever the overlay closes
     */
    constructor(classToken: string, hideEvent: string, onHide: () => void = () => undefined) {
        this.#classToken = classToken;
        this.#hideEvent = hideEvent;
        this.#onHide = onHide;
        // Capture phase on window: a focused control may stop key events from propagating,
        // and the button that opened the overlay keeps the focus.
        window.addEventListener("keydown", (e) => {
            if ((e.key === "Esc" || e.key === "Escape") && this.isOpen) {
                // Handled: nothing below reacts to it.
                e.preventDefault();
                this.hide();
            }
        }, { capture: true });
    }

    get isOpen(): boolean {
        return this.#div !== undefined;
    }

    /**
     * Opens the overlay and returns its (empty) content element. The close
     * button is added right away, next to the content, so it is available
     * while the content is still being prepared.
     */
    show(): HTMLDivElement {
        this.hide();
        const div = document.createElement("div");
        div.classList.add("overlay-page", this.#classToken);
        const content = document.createElement("div");
        content.classList.add("overlay-content");
        div.appendChild(content);
        this.appendCloseButton(div);
        document.body.appendChild(div);
        // Focused, so the arrow and page keys scroll it.
        div.tabIndex = -1;
        div.focus({ preventScroll: true });
        this.#div = div;
        return content;
    }

    /**
     * The close button is fixed at the settings button's position (see
     * .overlay-close in overlays.css), so the overlay can be closed without
     * scrolling to its end. It closes on the click itself rather than after
     * SVGToggleButton's click animation: the overlay disappears anyway, and a
     * redraw during the animation would otherwise swallow the click.
     */
    private appendCloseButton(div: HTMLDivElement) {
        new SVGToggleButton({
            container: div,
            icons: [closeIcon], labels: [t("button.close")], classToken: "overlay-close", event: this.#hideEvent
        }).show(0);
        div.querySelector(":scope > .toggle-div.overlay-close")?.addEventListener("click", () => this.hide());
    }

    hide() {
        if (this.#div !== undefined) {
            this.#div.remove();
            this.#div = undefined;
            this.#onHide();
        }
    }
}
export { OverlayPage };
