import { Events } from "../Enums";
import { SVGToggleButton } from "../ui/SVGToggleButton";
import { t } from "../i18n";
import type { SettingsPanel } from "./SettingsPanel";

import { icon as openIcon } from "../icons/settings/openIcon";
import { icon as closeIcon } from "../icons/settings/closeIcon";

/**
 * The gear button in the top-right corner: opens and closes the settings
 * panel. The `h` key does the same, and Escape closes it.
 */
class SettingsButton {
    #button: SVGToggleButton;
    #panel: SettingsPanel;

    constructor(panel: SettingsPanel) {
        this.#panel = panel;
        this.#button = new SVGToggleButton({ icons: [openIcon, closeIcon], labels: [t('button.openSettings'), t('button.closeSettings')], classToken: 'settings', event: Events.SETTINGS_CHANGED });
        this.#button.show(0);
        this.#button.addOnClickListener(() => this.setOpen(!this.#panel.isOpen));
        window.addEventListener('keydown', (e) => {
            if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (e.key === 'Escape' && this.#panel.isOpen) {
                this.setOpen(false);
            } else if ((e.key === 'h' || e.key === 'H') && !isTextInput(e.target)) {
                this.setOpen(!this.#panel.isOpen);
            }
        });
    }

    setOpen(open: boolean): void {
        if (open === this.#panel.isOpen) {
            return;
        }
        if (open) {
            this.#panel.show();
        } else {
            this.#panel.hide();
        }
        this.#button.select(open ? 1 : 0);
    }
}

/** Typing into a field must not toggle the panel. */
function isTextInput(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
        && !(target instanceof HTMLInputElement && ['checkbox', 'radio', 'range', 'button', 'color'].includes(target.type)));
}

export { SettingsButton };
