import { Events } from "./Enums";
import { SVGToggleButton } from "./SVGToggleButton";
import { icon as lightIcon } from "./icons/themes/lightIcon";
import { icon as darkIcon } from "./icons/themes/darkIcon";

// Used by CSS to style dark/light mode
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

class ThemesSwitcher {
    #theme: boolean;
    #button: SVGToggleButton;

    constructor(p?: { container: Element }) {
        this.#button = new SVGToggleButton({
            container: p?.container || document.body,
            icons: [lightIcon, darkIcon], classToken: 'themes', event: Events.CHANGE_THEME.toString()
        });
        this.initTheme();
        this.registerOnThemeChange(document.body);
    }

    /**
     * Used to initialize theme with system preferred theme.
     */
    initTheme() {
        this.#theme = this.preferredTheme();
        document.body.classList.add(this.#theme ? DARK_THEME : LIGHT_THEME);
        this.#button.show(this.#theme ? 0 : 1);

        Events.dispatchEvent(Events.THEME_CHANGED);
    }

    /**
     * Determine the system preferred theme.
     * 
     * @returns {@code false} is dark mode, {@code true} light mode
     */
    preferredTheme(): boolean {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    registerOnThemeChange(element: HTMLElement) {
        element.addEventListener(Events.CHANGE_THEME.toString(), () => {
            this.onThemeChange(element);
        });
    }

    private onThemeChange(element: HTMLElement) {
        const oldThemeStyle = this.#theme ? DARK_THEME : LIGHT_THEME;
        const newThemeStyle = this.#theme ? LIGHT_THEME : DARK_THEME;
        // console.log(`old-theme: ${oldThemeStyle} new-theme: ${newThemeStyle}`);
        if (!element.classList.replace(oldThemeStyle, newThemeStyle)) {
            element.classList.add(newThemeStyle);
        }
        this.#theme = !this.#theme;
        this.#button.toggle();

        Events.dispatchEvent(Events.THEME_CHANGED);
    }
}

export { ThemesSwitcher };