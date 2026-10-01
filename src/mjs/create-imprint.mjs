import fs from 'fs';

/**
 * Writes src/imprint-gen.js (or `outFile`) from imprint.config.json, whose
 * `plainText` holds the imprint's HTML lines; without the file, a stub whose
 * imprintHtml() returns undefined, and the app shows no imprint.
 *
 * The text is obfuscated, not encrypted: its UTF-8 bytes are XOR-ed with a key
 * and Base64-encoded, and the key travels with it. It only keeps the imprint
 * out of plain sight in the bundle (src/imprint/Imprint.ts shows it as an
 * image), as the AES of crypto-js did before, with the key in the bundle too.
 */
const config = readConfig('./imprint.config.json');
function readConfig(fname) {
    try {
        const data = fs.readFileSync(fname,
            { encoding: 'utf8', flag: 'r' });
        return JSON.parse(data);
    } catch (err) {
        console.log(`File: ${fname} not found, using default`);
        return {};
    }
}

const KEY = 'necklace-splitting';

function encode(text) {
    const bytes = Buffer.from(text, 'utf8');
    const key = Buffer.from(KEY, 'utf8');
    return Buffer.from(bytes.map((byte, i) => byte ^ key[i % key.length])).toString('base64');
}

const content = config.plainText !== undefined ? [
    `const key = new TextEncoder().encode(${JSON.stringify(KEY)});`,
    `const encoded = ${JSON.stringify(encode(config.plainText.join("\n")))};`,
    'function imprintHtml() {',
    '  const bytes = Uint8Array.from(atob(encoded), (c, i) => c.charCodeAt(0) ^ key[i % key.length]);',
    '  return new TextDecoder().decode(bytes);',
    '}',
    'export { imprintHtml };'
] : [
    'function imprintHtml() {',
    '  return undefined;',
    '}',
    'export { imprintHtml };'
];

fs.writeFile(config.outFile != undefined ? config.outFile : "src/imprint-gen.js", content.join("\n"), err => {
    if (err) {
        console.log(err);
    }
});
