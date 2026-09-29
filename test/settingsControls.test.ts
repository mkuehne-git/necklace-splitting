// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { checkbox, numberField, range, section, segmented, subheading, textField } from '../src/settings/settingsControls';

let parent: HTMLElement;
beforeEach(() => {
    document.body.innerHTML = '';
    parent = document.createElement('div');
    document.body.appendChild(parent);
});

describe('section', () => {
    it('is a <details> with its title and hint, closed unless asked', () => {
        const content = section(parent, 'Advanced', { hint: 'Geometry' });
        const details = parent.querySelector('details')!;
        expect(details.open).toBe(false);
        expect(details.querySelector('summary')!.textContent).toBe('AdvancedGeometry');
        expect(content.parentElement).toBe(details);
        expect(section(parent, 'Data', { open: true }).parentElement!.hasAttribute('open')).toBe(true);
    });
});

describe('checkbox', () => {
    it('is labelled, writes changes and shows values changed elsewhere', () => {
        let value = true;
        const set = vi.fn((checked: boolean) => { value = checked; });
        const control = checkbox(parent, 'Loop', () => value, set);
        const input = parent.querySelector<HTMLInputElement>('input')!;
        expect(parent.querySelector('label')!.htmlFor).toBe(input.id);
        expect(input.checked).toBe(true);
        input.click();
        expect(set).toHaveBeenCalledWith(false);
        value = true;
        control.update();
        expect(input.checked).toBe(true);
    });
});

describe('range', () => {
    it('shows the formatted value next to the slider', () => {
        let value = 10;
        range(parent, 'Duration', { min: 2, max: 60, step: 1 }, () => value, (v) => { value = v; }, (v) => `${v} s`);
        const input = parent.querySelector<HTMLInputElement>('input')!;
        expect(parent.querySelector('output')!.textContent).toBe('10 s');
        input.value = '20';
        input.dispatchEvent(new Event('input'));
        expect(value).toBe(20);
        expect(parent.querySelector('output')!.textContent).toBe('20 s');
    });
});

describe('segmented', () => {
    it('presses the current option, named by its long title', () => {
        let value = 'a';
        const control = segmented(parent, 'Region', [{ value: 'a', label: 'North', title: 'Northern HS' }, { value: 'b', label: 'South' }], () => value, (v) => { value = v; });
        const buttons = parent.querySelectorAll('button');
        expect(buttons[0].getAttribute('aria-label')).toBe('Northern HS');
        expect([...buttons].map((b) => b.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
        buttons[1].click();
        expect(value).toBe('b');
        expect([...buttons].map((b) => b.getAttribute('aria-pressed'))).toEqual(['false', 'true']);
        value = 'a';
        control.update();
        expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    });
});

describe('numberField', () => {
    const create = (max = 15) => {
        let value = 5;
        const set = vi.fn((next: number) => { value = next; });
        let limit = max;
        const control = numberField(parent, 'Configuration', () => ({ min: 0, max: limit }), () => value, set);
        const input = parent.querySelector<HTMLInputElement>('input')!;
        const enter = (text: string) => {
            input.value = text;
            input.dispatchEvent(new Event('change'));
        };
        return { control, input, set, enter, setLimit: (next: number) => { limit = next; }, setValue: (next: number) => { value = next; } };
    };

    it('is labelled and shows the value with its limits', () => {
        const { input } = create();
        expect(parent.querySelector('label')!.htmlFor).toBe(input.id);
        expect(input.type).toBe('number');
        expect(input.value).toBe('5');
        expect(input.max).toBe('15');
    });

    it('writes whole numbers within the limits', () => {
        const { input, set, enter } = create();
        enter('7.6');
        expect(set).toHaveBeenLastCalledWith(8);
        enter('99');
        expect(set).toHaveBeenLastCalledWith(15);
        expect(input.value).toBe('15');
        enter('-3');
        expect(set).toHaveBeenLastCalledWith(0);
    });

    it('ignores an empty field and shows the value again', () => {
        const { input, set, enter } = create();
        enter('');
        expect(set).not.toHaveBeenCalled();
        expect(input.value).toBe('5');
    });

    it('reads the limits again on update', () => {
        const { control, input, setLimit, setValue } = create();
        setLimit(3);
        setValue(3);
        control.update();
        expect(input.max).toBe('3');
        expect(input.value).toBe('3');
    });
});

describe('textField', () => {
    it('is labelled, writes on change and shows values changed elsewhere', () => {
        let value = 'AB';
        const set = vi.fn((next: string) => { value = next; });
        const control = textField(parent, 'Text', () => value, set);
        const input = parent.querySelector<HTMLInputElement>('input')!;
        expect(parent.querySelector('label')!.htmlFor).toBe(input.id);
        expect(input.value).toBe('AB');
        input.value = 'xyz';
        input.dispatchEvent(new Event('change'));
        expect(set).toHaveBeenCalledWith('xyz');
        value = '';
        control.update();
        expect(input.value).toBe('');
    });
});

describe('explanations', () => {
    const explained = (text: string) => ({ text, info: `What ${text} does.` });

    it('put an ⓘ button behind the label and a hidden call-out below the row', () => {
        checkbox(parent, explained('Discrete'), () => true, () => { });
        const row = parent.querySelector('.settings-row')!;
        const button = row.querySelector<HTMLButtonElement>('.settings-info')!;
        const callout = row.nextElementSibling as HTMLElement;
        expect(row.querySelector('label')!.textContent).toBe('Discrete');
        expect(button.getAttribute('aria-label')).toBe('About Discrete');
        expect(button.getAttribute('aria-controls')).toBe(callout.id);
        expect(callout.textContent).toBe('What Discrete does.');
        expect(callout.hidden).toBe(true);
        button.click();
        expect(callout.hidden).toBe(false);
        expect(button.getAttribute('aria-expanded')).toBe('true');
        button.click();
        expect(callout.hidden).toBe(true);
        expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('open one at a time', () => {
        range(parent, explained('Epsilon'), { min: 0, max: 1 }, () => 0, () => { });
        segmented(parent, explained('Lighting'), [{ value: 'Off', label: 'Off' }], () => 'Off', () => { });
        subheading(parent, explained('Colors'));
        const [epsilon, lighting, colors] = parent.querySelectorAll<HTMLButtonElement>('.settings-info');
        epsilon.click();
        lighting.click();
        expect(epsilon.getAttribute('aria-expanded')).toBe('false');
        expect(document.getElementById(epsilon.getAttribute('aria-controls')!)!.hidden).toBe(true);
        expect(document.getElementById(lighting.getAttribute('aria-controls')!)!.hidden).toBe(false);
        colors.click();
        expect(document.getElementById(lighting.getAttribute('aria-controls')!)!.hidden).toBe(true);
        expect(document.getElementById(colors.getAttribute('aria-controls')!)!.hidden).toBe(false);
    });

    it('leave plain labels as they were', () => {
        textField(parent, 'Text', () => '', () => { });
        numberField(parent, 'Configuration', () => ({ min: 0, max: 9 }), () => 0, () => { });
        expect(parent.querySelector('.settings-info')).toBeNull();
        expect(parent.querySelectorAll('.settings-callout')).toHaveLength(0);
    });
});
