/**
 * The native controls of the settings panel: each builds its markup (a real
 * `<label>`, `<input>` or `<button>`), writes changes through `set`, and
 * `update()` shows the current value again after it changed elsewhere (the
 * Jewels slider clamps the configuration, Reset rotation, a stored value).
 * A label can come with a short explanation: an ⓘ button behind it opens it
 * as a call-out below the row.
 */

import { t } from '../i18n';

export type Control = { update(): void };

/** A control's label, with an explanation for labels that do not explain themselves. */
export type Label = string | { text: string, info: string };

const labelText = (label: Label) => typeof label === 'string' ? label : label.text;

let nextId = 0;
const uniqueId = (name: string) => `setting-${name}-${++nextId}`;

/** A collapsible section; returns the element its controls go into. */
export function section(parent: HTMLElement, title: string, options: { open?: boolean, hint?: string } = {}): HTMLElement {
    const details = document.createElement('details');
    details.className = 'settings-section';
    details.open = options.open ?? false;
    const summary = document.createElement('summary');
    summary.textContent = title;
    if (options.hint) {
        const hint = document.createElement('span');
        hint.className = 'settings-hint';
        hint.textContent = options.hint;
        summary.appendChild(hint);
    }
    const content = document.createElement('div');
    content.className = 'settings-section-content';
    details.append(summary, content);
    parent.appendChild(details);
    return content;
}

export function subheading(parent: HTMLElement, text: Label): void {
    const heading = document.createElement('h3');
    heading.className = 'settings-subheading';
    const [label, callout] = labelWithInfo(parent, text, document.createElement('span'));
    heading.appendChild(label);
    parent.appendChild(heading);
    if (callout) {
        heading.after(callout);
    }
}

/**
 * The label element with the text, and for a label with an explanation the ⓘ
 * button behind it and the call-out, which goes after the row.
 */
function labelWithInfo(parent: HTMLElement, label: Label, element: HTMLElement): [HTMLElement, HTMLElement?] {
    element.textContent = labelText(label);
    if (typeof label === 'string') {
        return [element];
    }
    const wrapper = document.createElement('span');
    wrapper.className = 'settings-label';
    const callout = document.createElement('p');
    callout.className = 'settings-callout';
    callout.id = uniqueId('info');
    callout.textContent = label.info;
    callout.hidden = true;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'settings-info';
    button.textContent = 'i';
    button.setAttribute('aria-label', t('settings.info', { setting: label.text }));
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', callout.id);
    button.addEventListener('click', () => toggleCallout(parent, button, callout));
    wrapper.append(element, button);
    return [wrapper, callout];
}

/** A settings row: the label (with its ⓘ button, if any) and the control, and the call-out below. */
function labeledRow(parent: HTMLElement, text: Label, label: HTMLElement, control: HTMLElement): HTMLElement {
    const div = document.createElement('div');
    div.className = 'settings-row';
    const [labelElement, callout] = labelWithInfo(parent, text, label);
    div.append(labelElement, control);
    parent.appendChild(div);
    if (callout) {
        div.after(callout);
    }
    return div;
}

/** Opens a call-out, its arrow under the button, and closes any other one in the panel; or closes it. */
function toggleCallout(parent: HTMLElement, button: HTMLButtonElement, callout: HTMLElement): void {
    const open = callout.hidden;
    const panel = parent.closest('.settings-panel') ?? parent;
    panel.querySelectorAll<HTMLButtonElement>('.settings-info[aria-expanded="true"]').forEach((other) => {
        other.setAttribute('aria-expanded', 'false');
        document.getElementById(other.getAttribute('aria-controls')!)!.hidden = true;
    });
    if (open) {
        callout.hidden = false;
        button.setAttribute('aria-expanded', 'true');
        const arrow = button.getBoundingClientRect().left + button.offsetWidth / 2 - callout.getBoundingClientRect().left;
        callout.style.setProperty('--arrow-left', `${arrow}px`);
    }
}

function row(parent: HTMLElement, text: Label, control: HTMLElement, id: string): HTMLElement {
    const label = document.createElement('label');
    label.htmlFor = id;
    return labeledRow(parent, text, label, control);
}

export function checkbox(parent: HTMLElement, text: Label, get: () => boolean, set: (value: boolean) => void): Control {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = uniqueId('checkbox');
    input.addEventListener('change', () => set(input.checked));
    row(parent, text, input, input.id);
    const update = () => { input.checked = get(); };
    update();
    return { update };
}

export function range(
    parent: HTMLElement,
    text: Label,
    limits: { min: number, max: number, step?: number },
    get: () => number,
    set: (value: number) => void,
    format: (value: number) => string = String,
): Control {
    const input = document.createElement('input');
    input.type = 'range';
    input.id = uniqueId('range');
    input.min = String(limits.min);
    input.max = String(limits.max);
    input.step = String(limits.step ?? 'any');
    const output = document.createElement('output');
    output.setAttribute('for', input.id);
    output.className = 'settings-value';
    const wrapper = document.createElement('span');
    wrapper.className = 'settings-range';
    wrapper.append(input, output);
    const show = (value: number) => { output.textContent = format(value); };
    input.addEventListener('input', () => {
        show(Number(input.value));
        set(Number(input.value));
    });
    row(parent, text, wrapper, input.id);
    const update = () => {
        input.value = String(get());
        show(get());
    };
    update();
    return { update };
}

/**
 * A number field for whole numbers, e.g. the necklace configuration. The value
 * applies on Enter or when the field is left; it is clamped to the limits,
 * which are read again on each update (they can depend on another setting).
 */
export function numberField(
    parent: HTMLElement,
    text: Label,
    limits: () => { min: number, max: number },
    get: () => number,
    set: (value: number) => void,
): Control {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = uniqueId('number');
    input.step = '1';
    input.inputMode = 'numeric';
    input.addEventListener('change', () => {
        const { min, max } = limits();
        const value = Math.round(Number(input.value));
        if (input.value.trim() !== '' && Number.isFinite(value)) {
            set(Math.max(min, Math.min(value, max)));
        }
        update();
    });
    row(parent, text, input, input.id);
    const update = () => {
        const { min, max } = limits();
        input.min = String(min);
        input.max = String(max);
        input.value = String(get());
    };
    update();
    return { update };
}

/** A text field; the value applies on Enter or when the field is left. */
export function textField(parent: HTMLElement, text: Label, get: () => string, set: (value: string) => void): Control {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = uniqueId('text');
    input.spellcheck = false;
    input.addEventListener('change', () => set(input.value));
    row(parent, text, input, input.id);
    const update = () => { input.value = get(); };
    update();
    return { update };
}

/** Buttons of which one is pressed, e.g. what to capture; `title` is a longer name, if any. */
export function segmented<T extends string>(
    parent: HTMLElement,
    text: Label,
    options: { value: T, label: string, title?: string }[],
    get: () => T,
    set: (value: T) => void,
): Control {
    const group = document.createElement('div');
    group.className = 'settings-segmented';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', labelText(text));
    const buttons = options.map((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = option.label;
        if (option.title) {
            button.title = option.title;
            button.setAttribute('aria-label', option.title);
        }
        button.addEventListener('click', () => {
            set(option.value);
            update();
        });
        group.appendChild(button);
        return button;
    });
    labeledRow(parent, text, document.createElement('span'), group);
    const update = () => options.forEach((option, index) => buttons[index].setAttribute('aria-pressed', String(option.value === get())));
    update();
    return { update };
}

export function button(parent: HTMLElement, text: string, onClick: () => void): HTMLButtonElement {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'settings-button';
    element.textContent = text;
    element.addEventListener('click', onClick);
    parent.appendChild(element);
    return element;
}
