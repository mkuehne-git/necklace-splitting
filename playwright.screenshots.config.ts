import { defineConfig, devices } from '@playwright/test';

const PORT = 4181;

/**
 * Takes the README screenshots in docs/images/ (`npm run screenshots`), in the
 * dark theme like the original ones, from a production build with the full
 * sphere mesh. Not a test: the images are written over the committed ones, to
 * be reviewed before committing them.
 */
export default defineConfig({
    testDir: 'screenshots',
    workers: 1,
    reporter: 'list',
    timeout: 60_000,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: `http://localhost:${PORT}/necklace-splitting/`,
        // English, whatever the machine's language.
        locale: 'en-US',
        colorScheme: 'dark',
        deviceScaleFactor: 1,
    },
    webServer: {
        command: `npm run build && VITE_HTTPS=false npx vite preview --port ${PORT} --strictPort`,
        url: `http://localhost:${PORT}/necklace-splitting/`,
        reuseExistingServer: false,
        timeout: 120_000,
    },
});
