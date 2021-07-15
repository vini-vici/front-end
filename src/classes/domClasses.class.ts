
/**
 * @description a utility class to assist with chaining HTML class names back and forth.
 * 
 * We cannot create a DOMTokenList directly, and creating an entire DOMNode just to hijack it's
 * classList operator seems silly.
 */
export default class DomClasses {
  #classes = new Set<string>();

  /**
   * 
   * @param initialClasses the initial classes for our item to contain
   */
  constructor(...initialClasses: string[]) {
    const flattened = initialClasses.flatMap(item => item.split(' '));
    this.#classes = new Set(flattened);
  }
  /**
   * 
   * @param className the name of the class(es) we want to check for.
   * @returns if a single class was provided, true if present. If multiple classes were
   * provided returns true if every single class is present.
   */
  contains(className: string): boolean {
    return className.split(' ').every(cn => this.#classes.has(cn));
  }
  /**
   * 
   * @param className classes to be added to this list.
   * @returns the current instance of the DomClasses object to allow for chaining.
   */
  add(className: string): DomClasses {
    className.split(' ').forEach(cn => this.#classes.add(cn));
    return this;
  }
  /**
   * 
   * @param className the classes to be removed from the list.
   * @returns the current instance of the DomClasses object to allow for chaining.
   */
  remove(className: string): DomClasses {
    className.split(' ').forEach(cn => this.#classes.delete(cn));
    return this;
  }

  /**
   * 
   * @param className the classes we want to toggle.
   * @param force if true, will forcibly add all the values of `className`; similarly will remove
   * all of the classNames if false. 
   * 
   * If not specified does a quick check to determine if the class is present and adds/removes it accordingly.
   * @returns 
   */
  toggle(className: string, force?: boolean): DomClasses {

    if (force !== undefined) {
      if (force) {
        // Set.add does not duplicate if you add an already-present item.
        return this.add(className);
      } else {
        // ditto for removing something that is not there.
        return this.remove(className);
      }
    }

    if (this.contains(className)) 
      this.remove(className);
    else 
      this.add(className);

    return this;
  }
  /**
   * @param currentClass the class to be removed
   * @param newClass the class to be added.
   * @description if `currentClass` is not found, then `newClass` will not be added.
   * @returns the current instance of the DomClasses object.
   */
  replace(currentClass: string, newClass: string): DomClasses {
    if (this.contains(currentClass)) {

      this.remove(currentClass);
      this.add(newClass);
    }
    return this;
  }
  /**
   * returns the size of the classes we have currently
   */
  get count(): number {
    return this.#classes.size;
  }

  /**
   * 
   * @param other Another DomClasses instance
   * @returns returns the current DomClasses instance after the classes from `other` have been merged in.
   */
  combine(other: DomClasses): DomClasses {
    other.#classes.forEach(cls => this.add(cls));
    return this;
  }
  /**
   * 
   * @returns returns a string representation of the object for HTML consumption. 
   * **NOTE:** order is not guaranteed.
   */
  toString(): string {
    return Array.from(this.#classes.values()).join(' ');
  }

  toJSON(): string {
    return this.toString();
  }

  /**
   * 
   * @returns Returns a query string selector that can be used for `document.querySelector()` calls. Mostly used for testing purposes.
   */
  toQuery(): string {
    const classes = Array.from(this.#classes);
    return classes.reduce((queryString, current) => queryString += `.${current}`, '');
  }
}
