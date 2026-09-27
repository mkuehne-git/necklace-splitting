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
    title.textContent = 'Update available';

    const message = document.createElement('p');
    message.textContent = 'A new version of Necklace Splitting is ready. Reload to apply the update?';

    const actions = document.createElement('div');
    actions.className = 'pwa-update-actions';

    const reloadButton = document.createElement('button');
    reloadButton.type = 'button';
    reloadButton.textContent = 'Reload';
    reloadButton.className = 'pwa-update-button primary';
    reloadButton.addEventListener('click', async () => {
        if (updateServiceWorker) {
            await updateServiceWorker();
        }
    });

    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.textContent = 'Later';
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
            console.info('Necklace Splitting is ready for offline use.');
        }
    });
}

export async function checkForPwaUpdates(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
        // Browsers offer service workers only on HTTPS and localhost, and not in private windows.
        const message = window.isSecureContext
            ? 'Updates are turned off in this browser window, for example in a private window.'
            : 'Updates need HTTPS or localhost; this page was opened over plain HTTP.';
        showPwaStatus(message, 'warning');
        console.info(message);
        return false;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length === 0) {
        showPwaStatus('No service worker is registered yet.', 'warning');
        console.info('No service worker is currently registered.');
        return false;
    }

    let hasWaiting = false;
    await Promise.all(registrations.map(async (registration) => {
        await registration.update();
        if (registration.waiting) {
            hasWaiting = true;
        }
    }));

    if (hasWaiting) {
        showPwaStatus('Update ready. Reload to apply it.', 'success');
        showPwaUpdatePrompt();
        return true;
    }

    showPwaStatus('No update available.', 'info');
    return false;
}
