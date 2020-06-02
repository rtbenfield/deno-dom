import { Attr } from "./Attr.ts";
import { DOMTokenList } from "./DOMTokenList.ts";
import { HTMLCollection } from "./HTMLCollection.ts";
import { NamedNodeMap } from "./NamedNodeMap.ts";
import { Node } from "./Node.ts";
import { findChildrenByClassName, findChildrenByTag } from "./utils.ts";

export interface ParentNode {
  /** Returns the number of children of this ParentNode which are elements. */
  childElementCount: number;

  /** Returns a live HTMLCollection containing all of the Element objects that are children of this ParentNode, omitting all of its non-element nodes. */
  children: HTMLCollection;
}

export class Element extends Node implements ParentNode {
  readonly #attributes = new NamedNodeMap();
  readonly #children: Element[] = [];
  readonly #childrenCollection = new HTMLCollection(this.#children);
  readonly #classList = new DOMTokenList();
  #parentElement: Element | null;

  public get attributes(): NamedNodeMap {
    return this.#attributes;
  }

  public get childElementCount(): number {
    return this.#children.length;
  }

  public get children(): HTMLCollection {
    return this.#childrenCollection;
  }

  public get classList(): DOMTokenList {
    return this.#classList;
  }

  public get className(): string {
    return this.#classList.value;
  }

  public set className(value: string) {
    this.setAttribute("class", value);
    this.#classList.value = value;
  }

  public get clientHeight(): number {
    return 0;
  }

  public get clientLeft(): number {
    return 0;
  }

  public get clientTop(): number {
    return 0;
  }

  public get clientWidth(): number {
    return 0;
  }

  public get id(): string {
    return this.getAttribute("id") ?? "";
  }

  public set id(value: string) {
    this.setAttribute("id", value);
  }

  public get parentElement() {
    return this.#parentElement;
  }

  public constructor(
    public readonly tagName: string,
    parentElement: Element | null,
  ) {
    super(tagName, parentElement);
    this.#parentElement = parentElement;
  }

  public appendChild(element: Element): void {
    super.appendChild(element);
    this.#children.push(element);
    element.#parentElement = this;
  }

  public getAttribute(name: string): string | null {
    return this.attributes.getNamedItem(name)?.value ?? null;
  }

  public getAttributeNames(): string[] {
    return Array.from(
      { length: this.attributes.length },
      (_, i) => this.attributes.item(i)!.name,
    );
  }

  /**
   * Returns a list of elements with the given class name.
   * @param className is a string representing the class name(s) to match; multiple class names are separated by whitespace.
   * @returns is a live HTMLCollection of found elements.
   */
  public getElementsByClassName(className: string): HTMLCollection {
    const elements = Array.from(findChildrenByClassName(this, className));
    return new HTMLCollection(elements);
  }

  /**
   * Returns a list of elements with the given tag name.
   * @param name is a string representing the name of the elements. The special string "*" represents all elements.
   * @returns a live HTMLCollection (but see the note below) of found elements in the order they appear in the tree.
   */
  public getElementsByTagName(name: string): HTMLCollection {
    const elements = Array.from(findChildrenByTag(this, name));
    return new HTMLCollection(elements);
  }

  public hasAttribute(name: string): boolean {
    return this.attributes.getNamedItem(name) !== null;
  }

  public hasAttributes(): boolean {
    return this.attributes.length > 0;
  }

  public removeAttribute(name: string): void {
    this.attributes.removeNamedItem(name);
  }

  public setAttribute(name: string, value: string): void {
    const node = new Attr(this, name, value);
    this.attributes.setNamedItem(node);
  }

  public toggleAttribute(name: string, force?: boolean): boolean {
    const value = force ?? !this.hasAttribute(name);
    if (value) {
      this.setAttribute(name, "");
    } else {
      this.removeAttribute(name);
    }
    return value;
  }
}
