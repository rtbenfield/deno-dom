import { NodeList } from "./NodeList.ts";

export class Node {
  readonly #children: Node[] = [];
  public textContent: string = "";

  public get childNodes(): NodeList {
    return new NodeList(this.#children);
  }

  public get firstChild(): Node {
    return this.#children[0];
  }

  public get lastChild(): Node {
    return this.#children[this.#children.length - 1];
  }

  public constructor(
    public readonly nodeName: string,
    public readonly parentNode: Node | null,
  ) {}

  public appendChild(node: Node): void {
    this.#children.push(node);
  }
}
