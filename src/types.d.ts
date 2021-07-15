declare interface CssModule {
    [key: string]: string;
}

declare module '*.module.css' {
    const exp: CssModule;
    export default exp;
}

interface ImportMeta {
  env: 'production' | 'development'
}