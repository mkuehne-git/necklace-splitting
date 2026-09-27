import { Events } from "../Enums";
import { OverlayPage } from "../ui/OverlayPage";
import { SVGToggleButton } from "../ui/SVGToggleButton";
import { language, t, type Language } from "../i18n";
import { icon as infoIcon } from "../icons/info/infoIcon";
import infoEn from "../i18n/info/info.html?raw";
import infoDe from "../i18n/info/info.de.html?raw";

const INFO: Record<Language, string> = { en: infoEn, de: infoDe };

/**
 * The explanation of the app (the README's, for the app): opened with the info
 * button next to the theme button, shown as a full page that closes with its X
 * or Escape, like the changelog. The text exists per language in src/i18n/info/.
 */
class Info {
  #page = new OverlayPage("info", Events.HIDE_INFO.toString());

  constructor() {
    const button = new SVGToggleButton({
      icons: [infoIcon], labels: [t("button.showInfo")], classToken: "info-button", event: Events.SHOW_INFO.toString(),
    });
    button.show(0);
    document.body.addEventListener(Events.SHOW_INFO.toString(), () => this.show());
    document.body.addEventListener(Events.HIDE_INFO.toString(), () => this.hide());
  }

  show(): void {
    this.#page.show().innerHTML = INFO[language()];
  }

  hide(): void {
    this.#page.hide();
  }
}

export { Info };
