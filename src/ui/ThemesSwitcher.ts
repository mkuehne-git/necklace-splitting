import { Events } from "../Enums";
import { SVGToggleButton } from "./SVGToggleButton";
import { persistentState } from "../settings/PersistentState";
import { t } from "../i18n";
import { icon as lightIcon } from "../icons/themes/lightIcon";
import { icon as darkIcon } from "../icons/themes/darkIcon";

// Used by CSS to style dark/light mode
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

/** The system's choice, which the app follows until a theme is chosen with the button. */
const SYSTEM_DARK = '(prefers-color-scheme: dark)';

/**
 * The light and dark theme button. The theme is the one chosen last, which is
 * remembered; until then, the system's, also when it changes while the app runs.
 */
class ThemesSwitcher {
    /** true for the dark theme. */
    #theme: boolean;
    #button: SVGToggleButton;

    constructor(p?: { container: Element }) {
        this.#button = new SVGToggleButton({
            container: p?.container || document.body,
            icons: [lightIcon, darkIcon], labels: [t('button.lightTheme'), t('button.darkTheme')], classToken: 'themes', event: Events.CHANGE_THEME.toString()
        });
        this.#theme = this.preferredTheme();
        document.body.classList.add(this.#theme ? DARK_THEME : LIGHT_THEME);
        this.#button.show(this.#theme ? 0 : 1);
        // The button: a choice, remembered from now on.
        document.body.addEventListener(Events.CHANGE_THEME.toString(), () => {
            this.switchTheme();
            persistentState.update({ theme: this.#theme ? DARK_THEME : LIGHT_THEME });
        });
        // The system: followed as long as no theme was chosen.
        window.matchMedia(SYSTEM_DARK).addEventListener('change', (event) => {
            if (persistentState.state.theme === undefined && event.matches !== this.#theme) {
                this.switchTheme();
            }
        });
    }

    /** Tells the views the theme: those created after the switcher draw with it from the start. */
    initTheme() {
        Events.dispatchEvent(Events.THEME_CHANGED);
    }

    /** The theme chosen last, or else the system's. */
    preferredTheme(): boolean {
        const stored = persistentState.state.theme;
        if (stored !== undefined) {
            return stored === DARK_THEME;
        }
        return window.matchMedia(SYSTEM_DARK).matches;
    }

    private switchTheme() {
        const element = document.body;
        const oldThemeStyle = this.#theme ? DARK_THEME : LIGHT_THEME;
        const newThemeStyle = this.#theme ? LIGHT_THEME : DARK_THEME;
        if (!element.classList.replace(oldThemeStyle, newThemeStyle)) {
            element.classList.add(newThemeStyle);
        }
        this.#theme = !this.#theme;
        this.#button.toggle();
        Events.dispatchEvent(Events.THEME_CHANGED);
    }
}

export { ThemesSwitcher };
