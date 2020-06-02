import { Element } from "./Element.ts";

export class Attr {
  public get namespaceURI(): string | null {
    return null;
  }

  public get prefix(): string | null {
    return null;
  }

  public get specified(): true {
    return true;
  }

  public constructor(
    public readonly ownerElement: Element,
    public readonly name: string,
    public readonly value: string,
  ) {}
}
