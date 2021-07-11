declare interface CssModule {
    [key: string]: string;
}

declare module '*.module.css' {
    const exp: CssModule;
    export default exp;
}