
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
    classToken: string,
    event: string
}

/**
 * This class creates a button, that toggles between states. 
 * Each state has an associated icon, provided as SVN graphic. Only one icon is visible at any given point in time.
 * The L&F, including position, size and click animations are controlled by {@code lil-gui.css}.
 * The visible icon has class attribute {@code SHOW}.
 * The button itself is a {@code <div>}, containing all SVG icons.
 */
class SVGToggleButton {
    #div: HTMLElement;
    #icons: IconDescriptor[] = [];
    #event: string;

    constructor(p: ToggleButtonConfiguration) {
        this.#event = p.event;
        this.#icons = p.icons;
        const div = document.createElement(DIV_ELEMENT);
        div.classList.add(`${PREFIX}${DIV_SUFFIX}`);
        div.classList.add(p.classToken);
        for (const icon of p.icons) {
            const svg = this.createSVGElement(icon, p.classToken);
            div.innerHTML += svg;
        }
        const container = p.container || document.body;
        container.appendChild(div);

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
    }

    toggle(): void {
        for (let index = 0; index < this.#icons.length; index++) {
            this.icon(index)?.classList.toggle(SHOW)
        }
    }

    private icon(index: number): Element | null {
        return this.#div.querySelector(`#${this.#icons[index].id}${ICON_SUFFIX}`);
    }

    private createSVGElement(icon:IconDescriptor, classToken: string): string {
        const template = document.createElement('template');
        template.innerHTML = icon.svg;
        const svg = template.content.firstElementChild as SVGElement;
        svg.id = `${icon.id}${ICON_SUFFIX}`;
        svg.classList.add(`${PREFIX}${ICON_SUFFIX}`);
        svg.classList.add(classToken);
        return svg.outerHTML;
    }

    addOnClickListener(callback: () => void): void {
        this.#div.addEventListener(this.#event, callback);
    }

}
export { SVGToggleButton };