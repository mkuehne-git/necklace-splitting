declare const APP_VERSION: string;

declare module '*.md?raw' {
    const content: string;
    export default content;
}

declare module '*.html?raw' {
    const content: string;
    export default content;
}
