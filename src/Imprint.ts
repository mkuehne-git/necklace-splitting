import html2canvas from "html2canvas";

import { Events } from "./Enums";
import { ClassMutationObserver } from "./ClassMutationObserver";

const loadModule = async () => {
  return await import(/* @vite-ignore */ "./imprint-gen");
};

const trailer = `<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>`;
const closeBtn = `<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${Events.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;

/**
 * This class generates an imprint, if the file './imprint-gen.js' can be imported. The imprint will
 * be displayed as resizable image - instead of plain text. This is a little protection against
 * agents reading the HTML source.
 */
class Imprint {
  private decryptedAES: () => string;
  private div: HTMLDivElement;
  constructor() {
    window.addEventListener("resize", () => this.redraw());
    new ClassMutationObserver(document.body, () => this.redraw());
    document.body.addEventListener(Events.SHOW_IMPRINT.toString(), (e) => this.show());
    document.body.addEventListener(Events.HIDE_IMPRINT.toString(), (e) => this.hide());
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.hide();
      }
    });
  }
  private redraw() {
    if (this.div !== undefined) {
      this.hide();
      this.show();
    }
  }

  async isAvailable(): Promise<boolean> {
    const m = await loadModule();
    this.decryptedAES = m.decryptedAES;
    return this.decryptedAES() !== undefined;
  }
  show() {
    if (this.div === undefined) {
      this.div = document.createElement("div");
      const div = this.div;
      div.classList.add("imprint");
      div.innerHTML = this.decryptedAES();
      document.body.appendChild(div);
      const style = window.getComputedStyle(document.body);
      const width = div.scrollWidth;
      const height = div.scrollHeight;
      const backgroundColor = style.getPropertyValue("background-color");
      html2canvas(div, {
        backgroundColor,
        windowWidth: width,
        windowHeight: height,
      }).then((canvas) => {
        canvas.classList.add("padding");
        div.innerHTML = "";
        div.appendChild(canvas);
        const p = document.createElement("p");
        p.classList.add("padding");
        p.innerHTML = trailer + closeBtn;
        div.appendChild(p);
      });
    }
  }
  hide() {
    if (this.div !== undefined) {
      document.body.removeChild(this.div);
      this.div = undefined as any;
    }
  }
}
export { Imprint };
