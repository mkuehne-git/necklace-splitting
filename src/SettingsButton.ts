import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Events } from "./Enums";
import { SVGToggleButton } from "./SVGToggleButton";

import { icon as openIcon } from "./icons/settings/openIcon";
import { icon as closeIcon } from "./icons/settings/closeIcon";

class SettingsButton {
    #status: boolean;
    #button: SVGToggleButton;
    #gui: GUI;

    constructor(gui: GUI) {
        this.#status = true;
        this.#button = new SVGToggleButton({ icons: [openIcon, closeIcon], classToken: 'settings', event: Events.SETTINGS_CHANGED });
        this.#gui = gui;
        this.#gui.hide();
        this.#button.show(this.#status ? 0 : 1);
        this.#button.addOnClickListener(() => this.guiShowHide());
    }

    guiShowHide() {
        if (this.#status) {
            this.toggle();
            this.#gui.show();
            this.#gui.open();
        } else {
            this.#gui.$title.click();
        }
    }

    toggle(): void {
        this.#status = !this.#status;
        this.#button.toggle();
    }
}

export { SettingsButton };