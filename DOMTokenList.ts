/** The DOMTokenList interface represents a set of space-separated tokens. */
export class DOMTokenList {
  readonly #tokens = new Set<string>();

  /** Is an integer representing the number of objects stored in the object. */
  public get length(): number {
    return this.#tokens.size;
  }

  /** A stringifier property that returns the value of the list as a DOMString. */
  public get value(): string {
    let result = "";
    for (const value of this.#tokens) {
      result += value;
    }
    return result;
  }

  /** A stringifier property that returns the value of the list as a DOMString. */
  public set value(v: string) {
    this.#tokens.clear();
    this.add(...v.split(" "));
  }

  /** Adds the specified token(s) to the list. */
  public add(...tokens: string[]): void {
    for (const token of tokens) {
      this.#tokens.add(token.trim());
    }
  }

  /** Returns true if the list contains the given token, otherwise false. */
  public contains(token: string): boolean {
    return this.#tokens.has(token);
  }

  /** Returns an iterator, allowing you to go through all key/value pairs contained in this object. */
  public entries(): IterableIterator<[string, string]> {
    return this.#tokens.entries();
  }

  /** Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object. */
  public keys(): IterableIterator<string> {
    return this.#tokens.keys();
  }

  /** Executes a provided callback function once per DOMTokenList element. */
  public forEach(callback: (value: string) => void, thisArg = this): void {
    return this.#tokens.forEach(callback, thisArg);
  }

  /**
   * Returns the item in the list by its index, or undefined
   * if index is greater than or equal to the list's length.
   */
  public item(index: number): string {
    return Array.from(this.#tokens.values())[index];
  }

  /** Removes the specified token(s) from the list. */
  public remove(...tokens: string[]): void {
    for (const token of tokens) {
      this.#tokens.delete(token);
    }
  }

  /** Replaces token with newToken. */
  public replace(oldToken: string, newToken: string): void {
    const newValues = Array.from(this.#tokens, (v) => {
      return v === oldToken ? newToken : v;
    });
    this.#tokens.clear();
    this.add(...newValues);
  }

  /** Returns true if a given token is in the associated attribute's supported tokens. */
  public supports(token: string): boolean {
    return true;
  }

  /**
   * Removes token from the list if it exists, or adds token to the list if it doesn't.
   * Returns a boolean indicating whether token is in the list after the operation.
   */
  public toggle(token: string, force?: boolean): boolean {
    if (force ?? !this.contains(token)) {
      this.add(token);
      return true;
    } else {
      this.remove(token);
      return false;
    }
  }

  /** Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object. */
  public values(): IterableIterator<string> {
    return this.#tokens.values();
  }
}
