import { Events } from '../Enums';
import type { SettingsPanel } from './SettingsPanel';
import { button, checkbox, numberField, range, section, segmented, subheading, textField, type Control, type Label } from './settingsControls';
import { LIMITS, SETTINGS, maxConfiguration, resetAnimation, setSolutionHint, solutionHintShown, type CaptureTarget, type Lighting, type SolutionHint } from './settingsValues';
import { collectSettings, persistentState } from './PersistentState';
import { Imprint } from '../imprint/Imprint';
import { necklaceFromText } from '../necklace/NecklaceModel';
import { checkForPwaUpdates, showPwaStatus } from '../ui/PwaUpdate';
import { LANGUAGE_NAMES, LANGUAGES, formatNumber, t, type Language, type MessageKey } from '../i18n';

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

/** A label with its explanation behind an ⓘ button, for labels that do not explain themselves. */
const explained = (text: MessageKey, info: MessageKey): Label => ({ text: t(text), info: t(info) });

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

/**
 * A note below the text field when the text is too long for the necklace: it
 * takes only the characters that fit (MAX_NECKLACE_JEWELS, NecklaceModel.ts).
 */
function textLengthNote(content: HTMLElement): Control {
    const note = document.createElement('p');
    note.className = 'settings-note';
    note.setAttribute('aria-live', 'polite');
    const update = () => {
        const text = SETTINGS.necklace.string;
        const { characters } = necklaceFromText(text);
        note.hidden = characters === text.length;
        note.textContent = note.hidden ? '' : t('settings.textTooLong', { count: characters });
    };
    content.appendChild(note);
    update();
    return { update };
}

/** Necklace: the jewels and how the solutions are shown. */
function necklaceSection(body: HTMLElement, refresh: () => void): Control[] {
    const content = section(body, t('settings.necklace'), { open: true });
    const necklace = SETTINGS.necklace;
    // Built right after the text field, below it; the field updates it.
    let textNote: Control | undefined;
    const flag = (text: Label, key: 'discrete' | 'discrete_necklace') =>
        checkbox(content, text, () => necklace[key], (value) => { necklace[key] = value; material(); });
    // The game hides the solutions; ticking them during the game shows them for this game only.
    const hint = (text: Label, key: SolutionHint) =>
        checkbox(content, text, () => solutionHintShown(key), (value) => { setSolutionHint(key, value); material(); });
    return [
        range(content, t('settings.jewels'), LIMITS.number_of_jewels, () => necklace.number_of_jewels, (value) => {
            necklace.number_of_jewels = value;
            // Fewer jewels leave room for fewer configurations.
            necklace.configuration = Math.min(necklace.configuration, maxConfiguration());
            persistentState.update({ necklaceSource: 'number' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
            refresh();
        }),
        numberField(content, explained('settings.configuration', 'info.configuration'), () => ({ min: 0, max: maxConfiguration() }), () => necklace.configuration, (value) => {
            necklace.configuration = value;
            persistentState.update({ necklaceSource: 'number' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
        }),
        textField(content, explained('settings.text', 'info.text'), () => necklace.string, (value) => {
            necklace.string = value;
            persistentState.update({ necklaceSource: 'string' });
            changed(Events.SET_NECKLACE_CONFIGURATION_BY_STRING);
            textNote?.update();
        }),
        textNote = textLengthNote(content),
        flag(explained('settings.discreteNecklace', 'info.discreteNecklace'), 'discrete_necklace'),
        flag(explained('settings.discreteSphere', 'info.discreteSphere'), 'discrete'),
        hint(explained('settings.solutionBand', 'info.solutionBand'), 'show_solution_band'),
        hint(explained('settings.solutions', 'info.solutions'), 'show_solutions'),
        range(content, explained('settings.epsilon', 'info.epsilon'), LIMITS.epsilon, () => necklace.epsilon,
            (value) => { necklace.epsilon = value; material(); }, formatStep(LIMITS.epsilon.step)),
    ];
}

/** View: what is shown of the sphere and the necklace. */
function viewSection(body: HTMLElement): Control[] {
    const content = section(body, t('settings.view'));
    const view = SETTINGS.view;
    const shown = (text: string, key: 'axes_visible' | 'necklace_visible' | 'gauge_visible') =>
        checkbox(content, text, () => view[key], (value) => { view[key] = value; visibility(); });
    return [
        checkbox(content, explained('settings.undividedOctants', 'info.undividedOctants'), () => view.show_single_thiefs_region,
            (value) => { view.show_single_thiefs_region = value; visibility(); }),
        shown(t('settings.axes'), 'axes_visible'),
        shown(t('settings.necklaceVisible'), 'necklace_visible'),
        shown(t('settings.fairnessMeter'), 'gauge_visible'),
        // Moves the octants' meshes; nothing is rebuilt.
        range(content, explained('settings.spreadOctants', 'info.spreadOctants'), LIMITS.offset_octant, () => SETTINGS.sphere.offset_octant,
            (value) => { SETTINGS.sphere.offset_octant = value; visibility(); }, formatStep(LIMITS.offset_octant.step)),
        segmented<Lighting>(content, explained('settings.lighting', 'info.lighting'),
            [
                { value: 'Off', label: t('settings.lightingOff') },
                { value: 'Shape', label: t('settings.lightingShape') },
                { value: 'Always', label: t('settings.lightingAlways') },
            ],
            () => view.lighting,
            (value) => { view.lighting = value; material(); }),
    ];
}

/** Animation: the rotation of the sphere; the render loop reads these every frame. */
function animationSection(body: HTMLElement, refresh: () => void): Control[] {
    const content = section(body, t('settings.animation'));
    const animation = SETTINGS.animation;
    const speed = (text: string, key: 'rotation_x' | 'rotation_y' | 'rotation_z') =>
        range(content, text, LIMITS.rotation, () => animation[key], (value) => { animation[key] = value; changed(); },
            formatStep(LIMITS.rotation.step));
    const controls = [
        checkbox(content, explained('settings.rotate', 'info.rotate'), () => animation.run, (value) => { animation.run = value; }),
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

/** Advanced, collapsed: the sphere's mesh and colors and the frame rate monitor - the defaults suit most devices. */
function advancedSection(body: HTMLElement): Control[] {
    const content = section(body, t('settings.advanced'), { hint: t('settings.advancedHint') });
    const note = document.createElement('p');
    note.className = 'settings-note';
    note.textContent = t('settings.advancedNote');
    content.appendChild(note);
    const sphere = SETTINGS.sphere;
    const view = SETTINGS.view;
    const shown = (text: string, key: 'mesh_visible' | 'faces_visible' | 'stats_monitor_visible') =>
        checkbox(content, text, () => view[key], (value) => { view[key] = value; visibility(); });
    const controls = [
        range(content, t('settings.radius'), LIMITS.radius, () => sphere.radius, (value) => { sphere.radius = value; rebuild(); }),
        range(content, t('settings.segments'), LIMITS.segments, () => sphere.segments, (value) => { sphere.segments = value; rebuild(); }),
        shown(t('settings.mesh'), 'mesh_visible'),
        shown(t('settings.faces'), 'faces_visible'),
        shown(t('settings.fpsMonitor'), 'stats_monitor_visible'),
    ];
    subheading(content, explained('settings.colors', 'info.colors'));
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

function footerButton(label: string, onClick: () => void): HTMLButtonElement {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'settings-button';
    element.textContent = label;
    element.addEventListener('click', onClick);
    return element;
}

/**
 * The app functions, in the panel's footer: Language (Automatic follows the
 * browser; a change is stored at once and reloads the app, because the texts
 * are set when things are built), Imprint (shown once the private imprint has
 * loaded, see Imprint.ts), Check for updates, Restore defaults, and the version
 * with the changelog.
 */
function appFunctions(footer: HTMLElement): void {
    const imprint = new Imprint();
    const languageRow = document.createElement('div');
    languageRow.className = 'settings-row';
    const languageLabel = document.createElement('label');
    languageLabel.htmlFor = 'settings-language';
    languageLabel.textContent = t('settings.language');
    const select = document.createElement('select');
    select.id = 'settings-language';
    const choices: [Language | 'auto', string][] = [['auto', t('settings.languageAuto')], ...LANGUAGES.map((language): [Language, string] => [language, LANGUAGE_NAMES[language]])];
    for (const [value, label] of choices) {
        select.add(new Option(label, value, false, value === (persistentState.state.language ?? 'auto')));
    }
    select.addEventListener('change', () => {
        const value = select.value as Language | 'auto';
        persistentState.update({ language: value === 'auto' ? undefined : value });
        persistentState.flush();
        window.location.reload();
    });
    languageRow.append(languageLabel, select);

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

    const version = document.createElement('div');
    version.className = 'settings-version';
    const changelog = footerButton(`v${APP_VERSION} · ${t('changelog.heading')}`, () => Events.dispatchEvent(Events.SHOW_CHANGELOG));
    changelog.className = 'settings-link';
    version.appendChild(changelog);

    footer.append(languageRow, buttons, restore, version);
}
