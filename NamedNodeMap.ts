import { Attr } from "./Attr.ts";

export class NamedNodeMap {
  readonly #attributes = new Map<string, Attr>();

  public get length(): number {
    return this.#attributes.size;
  }

  public getNamedItem(name: string): Attr | null {
    return this.#attributes.get(name) ?? null;
  }

  public item(index: number): Attr | null {
    return Array.from(this.#attributes.values())[index] ?? null;
  }

  public removeNamedItem(name: string): void {
    this.#attributes.delete(name);
  }

  public setNamedItem(node: Attr): void {
    this.#attributes.set(node.name, node);
  }
}
