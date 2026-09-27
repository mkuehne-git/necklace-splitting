import { Events } from "../Enums";
import { ClassMutationObserver } from "../ui/ClassMutationObserver";
import { OverlayPage } from "../ui/OverlayPage";
import { loadHtml2canvas } from "../ui/loadHtml2canvas";

const loadModule = async () => {
    return await import("../imprint-gen");
};

const trailer = `<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>`;

/**
 * This class generates an imprint, if the file './imprint-gen.js' can be imported. The imprint will
 * be displayed as resizable image - instead of plain text. This is a little protection against
 * agents reading the HTML source.
 */
class Imprint {
    private decryptedAES: () => string;
    private page = new OverlayPage("imprint", Events.HIDE_IMPRINT.toString(),
        () => window.clearTimeout(this.resizeTimer));
    private loading: Promise<boolean> | undefined;
    private resizeTimer: number | undefined;
    constructor() {
        // Debounced: dragging a window edge fires a burst of resize events, and
        // each redraw starts a full html2canvas render.
        window.addEventListener("resize", () => {
            window.clearTimeout(this.resizeTimer);
            this.resizeTimer = window.setTimeout(() => this.redraw(), 250);
        });
        new ClassMutationObserver(document.body, () => this.redraw());
        document.body.addEventListener(Events.SHOW_IMPRINT.toString(), (e) => this.show());
        document.body.addEventListener(Events.HIDE_IMPRINT.toString(), (e) => this.hide());
    }
    private redraw() {
        if (this.page.isOpen) {
            this.hide();
            this.show();
        }
    }

    async isAvailable(): Promise<boolean> {
        if (this.decryptedAES !== undefined) {
            return true;
        }
        if (this.loading !== undefined) {
            return this.loading;
        }
        this.loading = loadModule().then((m) => {
            this.decryptedAES = m.decryptedAES;
            return this.decryptedAES() !== undefined;
        });
        return this.loading;
    }
    show() {
        if (this.decryptedAES === undefined) {
            void this.isAvailable().then((available) => {
                if (available) {
                    this.show();
                }
            });
            return;
        }
        if (!this.page.isOpen) {
            // The page's close button is available while html2canvas is still
            // rendering (or if it fails).
            const content = this.page.show();
            const imprintHTML = this.decryptedAES();
            content.innerHTML = imprintHTML;
            const style = window.getComputedStyle(document.body);
            const width = content.scrollWidth;
            const height = content.scrollHeight;
            const backgroundColor = style.getPropertyValue("background-color");
            loadHtml2canvas().then((html2canvas) => html2canvas(content, {
                backgroundColor,
                windowWidth: width,
                windowHeight: height,
            })).then((canvas) => {
                canvas.classList.add("padding");
                content.innerHTML = "";
                content.appendChild(canvas);
                this.appendTrailer(content);
            }).catch(() => {
                content.innerHTML = imprintHTML;
                this.appendTrailer(content);
            });
        }
    }
    private appendTrailer(div: HTMLDivElement) {
        const p = document.createElement("p");
        p.classList.add("padding");
        p.innerHTML = trailer;
        div.appendChild(p);
    }
    hide() {
        this.page.hide();
    }
}
export { Imprint };
