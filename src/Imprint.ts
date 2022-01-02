import html2canvas from "html2canvas";

import { Events } from "./Enums";

const loadModule = async () => {
  try {
    return await import(/* @vite-ignore */ './imprint-gen')
  } catch (e) {
    return "Nothing";
  }
}

const trailer = `<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>`;
const closeBtn = `<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${Events.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;

/** 
 * This class generates an imprint, if the file './imprint-gen.js' can be imported. The imprint will
 * be displayed as resizable image - instead of plain text. This is a little protection against
 * agents reading the HTML sourc.
 */
class Imprint {
  private _decryptedAES: any;
  private _div: HTMLDivElement;
  constructor() {
    window.addEventListener("resize", () => {
      const imprintThis = this;
      if (this._div !== undefined) {
        this.hide();
        this.show();
      }
    });
    document.body.addEventListener(Events.SHOW_IMPRINT.toString(), () => {
      this.show();
    });
    document.body.addEventListener(Events.HIDE_IMPRINT.toString(), () => {
      this.hide();
    });
    document.body.addEventListener("keydown", e => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.hide();
      }
    });
  }
  async isAvailable(): Promise<boolean> {
    const m = await loadModule();
    this._decryptedAES = m.decryptedAES;
    return this._decryptedAES !== undefined;
  }
  show() {
    this._div = document.createElement("div");
    this._div.classList.add("imprint");
    this._div.classList.add("padding");
    this._div.innerHTML = this._decryptedAES();
    const div = this._div;
    document.body.appendChild(div);
    const style = window.getComputedStyle(document.body);
    const width = div.scrollWidth - 10;
    const height = div.scrollHeight;
    const backgroundColor = style.getPropertyValue("background-color");
    html2canvas(div, {
      backgroundColor,
      windowWidth: width,
      windowHeight: height,
    }).then((canvas) => {
      div.classList.remove("padding");
      div.innerHTML = "";
      div.appendChild(canvas);
      const p = document.createElement("p");
      p.classList.add("padding");
      p.innerHTML = trailer + closeBtn;
      div.appendChild(p);
    });
  }
  hide() {
    if (this._div !== undefined) {
      document.body.removeChild(this._div);
      this._div = undefined;
    }
  }
}
export { Imprint };
