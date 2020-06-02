import { Element } from "./Element.ts";

export class HTMLCollection {
  readonly #elements: readonly Element[];

  public get length(): number {
    return this.#elements.length;
  }

  public constructor(elements: readonly Element[]) {
    this.#elements = elements;
  }

  public item(index: number): Element | null {
    return this.#elements[index] ?? null;
  }

  public namedItem(name: string): Element | null {
    return this.#elements.find((x) => x.getAttribute("name") === name) ?? null;
  }
}
