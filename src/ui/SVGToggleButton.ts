import '../css/toggle-buttons.css';

const PREFIX = 'toggle';
const DIV_ELEMENT = 'div';
const CLICKED = 'clicked';

const DIV_SUFFIX = '-div';
const ICON_SUFFIX = '-icon';
const SHOW = 'show';

type IconDescriptor = {
    id: string,
    svg: string
}

type ToggleButtonConfiguration = {
    container?: Element | null,
    icons: IconDescriptor[],
    /** The accessible name per icon, e.g. "Play" and "Pause"; the name of the icon shown applies. */
    labels?: string[],
    classToken: string,
    event: string
}

/**
 * This class creates a button, that toggles between states. 
 * Each state has an associated icon, provided as SVN graphic. Only one icon is visible at any given point in time.
 * The L&F, including position, size and click animations are controlled by {@code toggle-buttons.css}.
 * The visible icon has class attribute {@code SHOW}.
 * The button itself is a {@code <div>}, containing all SVG icons.
 */
class SVGToggleButton {
    #div: HTMLElement;
    #icons: IconDescriptor[] = [];
    #labels: string[];
    #event: string;
    /** The icon shown. */
    #index = 0;

    constructor(p: ToggleButtonConfiguration) {
        this.#event = p.event;
        this.#icons = p.icons;
        const div = document.createElement(DIV_ELEMENT);
        div.classList.add(`${PREFIX}${DIV_SUFFIX}`, p.classToken);
        for (const icon of p.icons) {
            const svg = this.createSVGElement(icon, p.classToken);
            div.innerHTML += svg;
        }
        const container = p.container || document.body;
        container.appendChild(div);

        // A button for assistive technology and the keyboard, too.
        div.setAttribute('role', 'button');
        div.tabIndex = 0;
        div.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                div.click();
            }
        });
        this.#labels = p.labels ?? [];

        div.addEventListener('click', () => div.classList.add(CLICKED));
        div.addEventListener('animationend', () => {
            if (div.classList.contains(CLICKED)) {
                div.classList.remove(CLICKED);
                const evt = new Event(p.event, { bubbles: true });
                div.dispatchEvent(evt);
            }
        });
        this.#div = div;
    }

    show(index: number): void {
        this.icon(index)?.classList.add(SHOW);
        this.setIndex(index);
    }

    /** Shows only the icon at `index`, e.g. to follow a state that changed on its own. */
    select(index: number): void {
        for (let i = 0; i < this.#icons.length; i++) {
            this.icon(i)?.classList.toggle(SHOW, i === index);
        }
        this.setIndex(index);
    }

    toggle(): void {
        for (let index = 0; index < this.#icons.length; index++) {
            this.icon(index)?.classList.toggle(SHOW)
        }
        // Toggling is used with two icons, one of them shown.
        this.setIndex(this.#icons.length === 2 ? 1 - this.#index : this.#index);
    }

    private setIndex(index: number): void {
        this.#index = index;
        const label = this.#labels[index];
        if (label !== undefined) {
            this.#div.setAttribute('aria-label', label);
        }
    }

    private icon(index: number): Element | null {
        return this.#div.querySelector(`#${this.#icons[index].id}${ICON_SUFFIX}`);
    }

    private createSVGElement(icon: IconDescriptor, classToken: string): string {
        const template = document.createElement('template');
        template.innerHTML = icon.svg;
        const svg = template.content.firstElementChild as SVGElement;
        svg.id = `${icon.id}${ICON_SUFFIX}`;
        svg.classList.add(`${PREFIX}${ICON_SUFFIX}`, classToken);
        return svg.outerHTML;
    }

    addOnClickListener(callback: () => void): void {
        this.#div.addEventListener(this.#event, callback);
    }

}
export { SVGToggleButton };