declare module '*.module.css' {
    interface CssModule {
        [key: string]: string;
    }
    const exp: CssModule;
    export default exp;
}