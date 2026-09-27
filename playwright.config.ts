import { defineConfig, devices } from '@playwright/test';

const PORT = 4180;

/**
 * End-to-end tests against a fresh production build (see TESTING.md, step 3).
 * Served over HTTP: browsers allow service workers on http://localhost, but
 * reject them behind the self-signed development certificate.
 */
export default defineConfig({
    testDir: 'e2e',
    fullyParallel: true,
    // Each page renders the WebGL sphere in software; more workers mostly cause timeouts.
    workers: 4,
    reporter: 'list',
    use: {
        baseURL: `http://localhost:${PORT}/necklace-splitting/`,
        trace: 'retain-on-failure',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    ],
    webServer: {
        // VITE_E2E: a coarser sphere (32 instead of 128 segments), see settingsValues.ts.
        // Run `npm run build` afterwards, so that dist/ does not keep the test build.
        command: `VITE_E2E=true npm run build && VITE_HTTPS=false npx vite preview --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}/necklace-splitting/`,
        // Always test the current sources, never a stale build that is still being served.
        reuseExistingServer: false,
        timeout: 120_000,
    },
});
