

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

declare module '*/config.json' {
  interface Config {
    COGNITO_DOMAIN: string;
    CLIENT_ID: string;
    POOL_ID: string;
    REGION: string;
    API: string;
  }
  const exportValue: Config;
  export default exportValue;
}