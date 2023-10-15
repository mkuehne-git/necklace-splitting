import { Events } from "./Enums";
import svgLightAsString from './icons/themes/light.svg?raw';
import svgDarkAsString from './icons/themes/dark.svg?raw';

class ThemesSwitcher {
    #theme: boolean;
    #lightIcon: HTMLElement;
    #darkIcon: HTMLElement;

    constructor() {
        const div = document.createElement('DIV');
        div.innerHTML = svgLightAsString + svgDarkAsString;
        this.#lightIcon = div.querySelector('#light-icon') as HTMLElement;
        this.#darkIcon = div.querySelector('#dark-icon') as HTMLElement;
        document.body.appendChild(div);

        div.addEventListener('click', () => Events.dispatchEvent(Events.THEME_CHANGED))
    }

    initTheme() {
        this.#theme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // console.log(`Preferred theme: ${this.#theme ? 'dark' : 'light'}`)
        document.body.classList.add(this.#theme ? 'dark' : 'light');
        const icon = this.#theme ? this.#lightIcon : this.#darkIcon;
        icon.classList.add('show');
    }

    registerOnThemeChange(element: HTMLElement) {
        element.addEventListener(Events.THEME_CHANGED.toString(), () => {
            this.onThemeChange(element);
        });
    }

    private onThemeChange(element: HTMLElement) {
        const oldThemeStyle = this.#theme ? 'dark' : 'light';
        const newThemeStyle = this.#theme ? 'light' : 'dark';
        console.log(`old-theme: ${oldThemeStyle} new-theme: ${newThemeStyle}`);
        if (!element.classList.replace(oldThemeStyle, newThemeStyle)) {
            element.classList.add(newThemeStyle);
        }
        this.#theme = !this.#theme;
        this.#lightIcon.classList.toggle('show');
        this.#darkIcon.classList.toggle('show');
    }
}

export { ThemesSwitcher };