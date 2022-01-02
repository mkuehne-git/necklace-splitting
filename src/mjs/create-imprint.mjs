import CryptoJS from "crypto-js";
import fs from 'fs';

const rawdata = fs.readFileSync('./imprint.config.json');
const config = JSON.parse(rawdata);

const content = [
    'import CryptoJS from "crypto-js";',
    `const secret = "${secret()}";`,
    `const encrypted = "${encrypted()}";`,
    'function decryptedAES() {',
    '  return `${CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8)}`;',
    '}',
    'export { decryptedAES };'
];
function secret() {
    return "secret";
}
function encrypted() {
    return CryptoJS.AES.encrypt(config.plainText.join("\n"), secret());
}

fs.writeFile(config.outFile != undefined?config.outFile:"imprint-gen.js", content.join("\n"), err => {
    if (err) {
        console.log(err);
    }
});