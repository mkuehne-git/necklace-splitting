
const loadSVG = async (path: string) => {
    const imported = await import(/* @vite-ignore */ path + '?raw');
    return imported.default;
};

const PREFIX = 'toggle';
const DIV_ELEMENT = 'div';
const CLICKED = 'clicked';

const DIV_SUFFIX = '-div';
const ICON_SUFFIX ='-icon';
const SHOW ='show';

type ToggleButtonConfiguration = {
    path: string,
    icons: string[],
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
    /**
     * Factory method to create an SVGToggleButton. The method is {@code async} because the SVG
     * icons are imported dynamically.
     * 
     * @param p configuration of the button
     * @returns Promise to SVGToggleButton 
     */
    static async create(p: ToggleButtonConfiguration): Promise<SVGToggleButton> {
        return await new SVGToggleButton().build(p);
    }
    #div: HTMLElement;
    #icons: string[] = [];

    show(index: number): void {
        this.icon(index)?.classList.add(SHOW);
    }

    toggle(): void {
        for (let index = 0; index<this.#icons.length; index++) {
            this.icon(index)?.classList.toggle(SHOW)
        }
    }

    private icon(index: number): Element | null {
        return this.#div.querySelector(`#${this.#icons[index]}${ICON_SUFFIX}`);
    }

    private async build(p: ToggleButtonConfiguration): Promise<SVGToggleButton> {
        const div = document.createElement(DIV_ELEMENT);
        div.classList.add(`${PREFIX}${DIV_SUFFIX}`);
        div.classList.add(p.classToken);
        for await (const icon of p.icons) {
            this.#icons.push(icon)
            const svg = await this.createSVGElement(`${p.path}/${icon}.svg`, `${icon}${ICON_SUFFIX}`, p.classToken);
            div.innerHTML += svg;
        }
        document.body.appendChild(div);

        div.addEventListener('click', () => div.classList.add(CLICKED));
        div.addEventListener('animationend', () => {
            if (div.classList.contains(CLICKED)) {
                // console.log('animationend')
                div.classList.remove(CLICKED);
                const evt = new Event(p.event, { bubbles: true });
                document.body.dispatchEvent(evt);
            }
        });
        this.#div = div;
        return this;
    }
    private async createSVGElement(path: string, id: string, classToken: string): Promise<string> {
        const template = document.createElement('template');
        const svgImport = await loadSVG(path);
        template.innerHTML = svgImport;
        const svg = template.content.firstElementChild as SVGElement;
        svg.id = id;
        svg.classList.add(`${PREFIX}${ICON_SUFFIX}`);
        svg.classList.add(classToken);
        return svg.outerHTML;
    }
}
export { SVGToggleButton };