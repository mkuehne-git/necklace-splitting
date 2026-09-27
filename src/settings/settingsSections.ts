import { Events } from '../Enums';
import type { SettingsPanel } from './SettingsPanel';
import { button, checkbox, numberField, range, section, segmented, subheading, textField, type Control } from './settingsControls';
import { LIMITS, SETTINGS, SHOWCASES, maxConfiguration, resetAnimation, type CaptureTarget } from './settingsValues';
import { collectSettings, persistentState } from './PersistentState';
import { Imprint } from '../imprint/Imprint';
import { checkForPwaUpdates, showPwaStatus } from '../ui/PwaUpdate';
import { formatNumber, t } from '../i18n';

/**
 * Fills the settings panel: the sections in its body and the app functions in
 * its footer. Returns the controls, to show values that changed elsewhere.
 */
export function buildSettingsPanel(panel: SettingsPanel): Control[] {
    const controls: Control[] = [];
    // Controls that show values another control changes (the configuration after Jewels, the speeds after Reset rotation).
    const refresh = () => controls.forEach((control) => control.update());
    controls.push(
        ...necklaceSection(panel.body, refresh),
        ...viewSection(panel.body),
        ...animationSection(panel.body, refresh),
        ...captureSection(panel.body),
        ...advancedSection(panel.body),
    );
    appFunctions(panel.footer);
    return controls;
}

/** Applies a change: tells the views, and remembers the settings. */
function changed(event?: Events): void {
    if (event !== undefined) {
        Events.dispatchEvent(event);
    }
    persistentState.update({ settings: collectSettings() });
}

const material = () => changed(Events.UPDATE_SPHERE_MATERIAL);
const visibility = () => changed(Events.UPDATE_VISIBLE);
const rebuild = () => changed(Events.CREATE_SPHERE);

const decimals = (step: number) => (String(step).split('.')[1] ?? '').length;
const formatStep = (step: number) => (value: number) => formatNumber(value, decimals(step));

/** Necklace: the showcase, the jewels and how the solutions are shown. */
function necklaceSection(body: HTMLElement, refresh: () => void): Control[] {
    const content = section(body, t('settings.necklace'), { open: true });
    const necklace = SETTINGS.necklace;
    const flag = (text: string, key: 'discrete' | 'show_solution_band' | 'show_solutions') =>
        checkbox(content, text, () => necklace[key], (value) => { necklace[key] = value; material(); });
    return [
        segmented(content, t('settings.showcase'),
            SHOWCASES.map((showcase) => ({ value: String(showcase.showcase), label: t(showcase.short), title: t(showcase.name) })),
            () => String(SETTINGS.int_mode),
            (value) => { SETTINGS.int_mode = Number(value); rebuild(); },
            { stacked: true }),
        range(content, t('settings.jewels'), LIMITS.number_of_jewels, () => necklace.number_of_jewels, (value) => {
            necklace.number_of_jewels = value;
            // Fewer jewels leave room for fewer configurations.
            necklace.configuration = Math.min(necklace.configuration, maxConfiguration());
            persistentState.update({ necklaceSource: 'number' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
            refresh();
        }),
        numberField(content, t('settings.configuration'), () => ({ min: 0, max: maxConfiguration() }), () => necklace.configuration, (value) => {
            necklace.configuration = value;
            persistentState.update({ necklaceSource: 'number' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
        }),
        textField(content, t('settings.text'), () => necklace.string, (value) => {
            necklace.string = value;
            persistentState.update({ necklaceSource: 'string' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_STRING);
        }),
        flag(t('settings.discrete'), 'discrete'),
        flag(t('settings.solutionBand'), 'show_solution_band'),
        flag(t('settings.solutions'), 'show_solutions'),
        range(content, t('settings.epsilon'), LIMITS.epsilon, () => necklace.epsilon,
            (value) => { necklace.epsilon = value; material(); }, formatStep(LIMITS.epsilon.step)),
    ];
}

/** View: what is shown of the sphere and the necklace, and the sphere's colors. */
function viewSection(body: HTMLElement): Control[] {
    const content = section(body, t('settings.view'));
    const view = SETTINGS.view;
    const shown = (text: string, key: 'axes_visible' | 'necklace_visible' | 'gauge_visible' | 'mesh_visible' | 'faces_visible') =>
        checkbox(content, text, () => view[key], (value) => { view[key] = value; visibility(); });
    const controls = [
        checkbox(content, t('settings.singleThiefsArea'), () => view.show_single_thiefs_region,
            (value) => { view.show_single_thiefs_region = value; material(); }),
        shown(t('settings.axes'), 'axes_visible'),
        shown(t('settings.necklaceVisible'), 'necklace_visible'),
        shown(t('settings.gauge'), 'gauge_visible'),
        shown(t('settings.mesh'), 'mesh_visible'),
        shown(t('settings.faces'), 'faces_visible'),
        range(content, t('settings.octantOffset'), LIMITS.offset_octant, () => SETTINGS.sphere.offset_octant,
            (value) => { SETTINGS.sphere.offset_octant = value; rebuild(); }, formatStep(LIMITS.offset_octant.step)),
        checkbox(content, t('settings.borsukUlam'), () => SETTINGS.sphere.show_borsuk_ulam_proof_shape,
            (value) => { SETTINGS.sphere.show_borsuk_ulam_proof_shape = value; material(); }),
    ];
    subheading(content, t('settings.colors'));
    const color = SETTINGS.color;
    const scale = (text: string, key: 'scale_red' | 'scale_green' | 'scale_blue' | 'alpha', apply: () => void) =>
        range(content, text, LIMITS.scale, () => color[key], (value) => { color[key] = value; apply(); }, formatStep(LIMITS.scale.step));
    controls.push(
        scale(t('settings.red'), 'scale_red', material),
        scale(t('settings.green'), 'scale_green', material),
        scale(t('settings.blue'), 'scale_blue', material),
        // Opacity changes the wireframe's transparency too, which needs a rebuild.
        scale(t('settings.alpha'), 'alpha', rebuild),
    );
    return controls;
}

/** Animation: the rotation of the sphere; the render loop reads these every frame. */
function animationSection(body: HTMLElement, refresh: () => void): Control[] {
    const content = section(body, t('settings.animation'));
    const animation = SETTINGS.animation;
    const speed = (text: string, key: 'rotation_x' | 'rotation_y' | 'rotation_z') =>
        range(content, text, LIMITS.rotation, () => animation[key], (value) => { animation[key] = value; changed(); },
            formatStep(LIMITS.rotation.step));
    const controls = [
        checkbox(content, t('settings.rotate'), () => animation.run, (value) => { animation.run = value; }),
        speed(t('settings.rotationX'), 'rotation_x'),
        speed(t('settings.rotationY'), 'rotation_y'),
        speed(t('settings.rotationZ'), 'rotation_z'),
    ];
    button(content, t('settings.resetRotation'), () => {
        resetAnimation();
        changed();
        refresh();
    }).classList.add('wide');
    return controls;
}

/** Screen capture: what to save, and the button (Alt+S does the same, see ScreenCapture.ts). */
function captureSection(body: HTMLElement): Control[] {
    const content = section(body, t('settings.capture'));
    const target = segmented<CaptureTarget>(content, t('settings.captureWhat'),
        [
            { value: 'All', label: t('settings.captureAll') },
            { value: 'Sphere', label: t('settings.captureSphere') },
            { value: 'Necklace', label: t('settings.captureNecklace') },
        ],
        () => SETTINGS.capture,
        (value) => { SETTINGS.capture = value; });
    button(content, t('settings.captureButton'), () => Events.dispatchEvent(Events.SCREEN_CAPTURE)).classList.add('wide');
    return [target];
}

/** Advanced, collapsed: the sphere's mesh and the frame rate monitor - the defaults suit most devices. */
function advancedSection(body: HTMLElement): Control[] {
    const content = section(body, t('settings.advanced'), { hint: t('settings.advancedHint') });
    const note = document.createElement('p');
    note.className = 'settings-note';
    note.textContent = t('settings.advancedNote');
    content.appendChild(note);
    const sphere = SETTINGS.sphere;
    return [
        range(content, t('settings.radius'), LIMITS.radius, () => sphere.radius, (value) => { sphere.radius = value; rebuild(); }),
        range(content, t('settings.segments'), LIMITS.segments, () => sphere.segments, (value) => { sphere.segments = value; rebuild(); }),
        checkbox(content, t('settings.badCheck'), () => sphere.use_bad_on_sphere_check,
            (value) => { sphere.use_bad_on_sphere_check = value; material(); }),
        checkbox(content, t('settings.fpsMonitor'), () => SETTINGS.view.stats_monitor_visible,
            (value) => { SETTINGS.view.stats_monitor_visible = value; Events.dispatchEvent(Events.UPDATE_VISIBLE); }),
    ];
}

function footerButton(label: string, onClick: () => void): HTMLButtonElement {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'settings-button';
    element.textContent = label;
    element.addEventListener('click', onClick);
    return element;
}

/**
 * The app functions, in the panel's footer: Imprint (shown once the private
 * imprint has loaded, see Imprint.ts), Check for updates, and Restore defaults.
 */
function appFunctions(footer: HTMLElement): void {
    const imprint = new Imprint();
    const buttons = document.createElement('div');
    buttons.className = 'settings-buttons';
    const imprintButton = footerButton(t('settings.imprint'), () => Events.dispatchEvent(Events.SHOW_IMPRINT));
    imprintButton.hidden = true;
    void imprint.isAvailable().then((available) => { imprintButton.hidden = !available; });
    buttons.append(
        imprintButton,
        footerButton(t('settings.checkForUpdates'), async () => {
            showPwaStatus(t('pwa.checking'), 'info');
            await checkForPwaUpdates();
        }),
    );

    // Forgets the stored settings and state and reloads: the simplest way to reset everything, including the camera.
    const restore = footerButton(t('settings.restoreDefaults'), () => {
        if (window.confirm(t('settings.restoreDefaultsConfirm'))) {
            persistentState.clear();
            window.location.reload();
        }
    });
    restore.classList.add('danger');

    footer.append(buttons, restore);
}
