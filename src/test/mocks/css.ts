interface CssModule { 
  [key: string]: string;
}

const css = new Proxy({} as CssModule, {
  get(target, prop, receiver) {
    return prop;
  }
})

export default css;