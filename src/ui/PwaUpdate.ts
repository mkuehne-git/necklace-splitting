import { t } from '../i18n';
import { registerSW } from 'virtual:pwa-register';

let updateServiceWorker: (() => Promise<void>) | undefined;

export function showPwaStatus(message: string, variant: 'info' | 'success' | 'warning' = 'info'): void {
    const existingStatus = document.getElementById('pwa-status');
    existingStatus?.remove();

    const status = document.createElement('div');
    status.id = 'pwa-status';
    status.className = `pwa-status ${variant}`;
    status.textContent = message;
    document.body.appendChild(status);

    window.clearTimeout((status as any)._dismissTimer);
    (status as any)._dismissTimer = window.setTimeout(() => {
        status.remove();
    }, 3500);
}

function createPwaUpdateDialog(): void {
    const existingDialog = document.getElementById('pwa-update-dialog');
    if (existingDialog) {
        return;
    }

    const dialog = document.createElement('div');
    dialog.id = 'pwa-update-dialog';
    dialog.className = 'pwa-update-dialog hidden';

    const content = document.createElement('div');
    content.className = 'pwa-update-content';

    const title = document.createElement('h2');
    title.textContent = t('pwa.updateTitle');

    const message = document.createElement('p');
    message.textContent = t('pwa.updateMessage');

    const actions = document.createElement('div');
    actions.className = 'pwa-update-actions';

    const reloadButton = document.createElement('button');
    reloadButton.type = 'button';
    reloadButton.textContent = t('pwa.reload');
    reloadButton.className = 'pwa-update-button primary';
    reloadButton.addEventListener('click', async () => {
        if (updateServiceWorker) {
            await updateServiceWorker();
        }
    });

    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.textContent = t('pwa.later');
    dismissButton.className = 'pwa-update-button secondary';
    dismissButton.addEventListener('click', () => {
        dialog.classList.add('hidden');
    });

    actions.append(reloadButton, dismissButton);
    content.append(title, message, actions);
    dialog.appendChild(content);
    document.body.appendChild(dialog);
}

export function showPwaUpdatePrompt(): void {
    createPwaUpdateDialog();
    const dialog = document.querySelector('#pwa-update-dialog');
    dialog?.classList.remove('hidden');
}

export function initPwaUpdate(): void {
    createPwaUpdateDialog();
    updateServiceWorker = registerSW({
        immediate: true,
        onNeedRefresh() {
            showPwaUpdatePrompt();
        },
        onOfflineReady() {
            console.info(t('pwa.offlineReady'));
        }
    });
}

export async function checkForPwaUpdates(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
        // Browsers offer service workers only on HTTPS and localhost, and not in private windows.
        const message = window.isSecureContext
            ? t('pwa.unavailable')
            : t('pwa.insecure');
        showPwaStatus(message, 'warning');
        console.info(message);
        return false;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length === 0) {
        showPwaStatus(t('pwa.notRegistered'), 'warning');
        console.info('No service worker is currently registered.');
        return false;
    }

    let hasWaiting = false;
    try {
        await Promise.all(registrations.map(async (registration) => {
            await registration.update();
            if (registration.waiting) {
                hasWaiting = true;
            }
        }));
    } catch (error) {
        // Offline, or the server cannot be reached: say so rather than nothing.
        showPwaStatus(t('pwa.checkFailed'), 'warning');
        console.info(error);
        return false;
    }

    if (hasWaiting) {
        showPwaStatus(t('pwa.updateReady'), 'success');
        showPwaUpdatePrompt();
        return true;
    }

    showPwaStatus(t('pwa.noUpdate'), 'info');
    return false;
}
