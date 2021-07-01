interface CssModule { 
  [key: string]: string;
}

const css = new Proxy({} as CssModule, {
  get(target, prop) {
    return prop;
  }
});

export default css;
