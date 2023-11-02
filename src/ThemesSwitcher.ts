import { Events } from "./Enums";
import { SVGToggleButton } from "./SVGToggleButton";
import { icon as lightIcon } from "./icons/themes/lightIcon";
import { icon as darkIcon } from "./icons/themes/darkIcon";

class ThemesSwitcher {
    #theme: boolean;
    #button: SVGToggleButton;

    constructor() {
        this.#button = new SVGToggleButton({ icons: [lightIcon, darkIcon], classToken: 'themes', event: Events.THEME_CHANGED.toString() });
        this.initTheme();
        this.registerOnThemeChange(document.body);
    }

    /**
     * Used to initialize theme with system preferred theme.
     */
    initTheme() {
        this.#theme = this.preferredTheme();
        document.body.classList.add(this.#theme ? 'dark' : 'light');
        this.#button.show(this.#theme ? 0 : 1);
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
        element.addEventListener(Events.THEME_CHANGED.toString(), () => {
            this.onThemeChange(element);
        });
    }

    private onThemeChange(element: HTMLElement) {
        const oldThemeStyle = this.#theme ? 'dark' : 'light';
        const newThemeStyle = this.#theme ? 'light' : 'dark';
        // console.log(`old-theme: ${oldThemeStyle} new-theme: ${newThemeStyle}`);
        if (!element.classList.replace(oldThemeStyle, newThemeStyle)) {
            element.classList.add(newThemeStyle);
        }
        this.#theme = !this.#theme;
        this.#button.toggle();
    }
}

export { ThemesSwitcher };