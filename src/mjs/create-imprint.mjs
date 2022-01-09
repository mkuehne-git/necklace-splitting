import CryptoJS from "crypto-js";
import fs from 'fs';

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

const content = encrypted() !== undefined ? [
    'import CryptoJS from "crypto-js";',
    `const secret = "${secret()}";`,
    `const encrypted = "${encrypted()}";`,
    'function decryptedAES() {',
    '  return `${CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8)}`;',
    '}',
    'export { decryptedAES };'
] : [
    'function decryptedAES() {',
    '  return undefined;',
    '}',
    'export { decryptedAES };'
];
function secret() {
    return "secret";
}

function encrypted() {
    return config.plainText !== undefined ? CryptoJS.AES.encrypt(config.plainText.join("\n"), secret()) : undefined;
}

fs.writeFile(config.outFile != undefined ? config.outFile : "src/imprint-gen.js", content.join("\n"), err => {
    if (err) {
        console.log(err);
    }
});