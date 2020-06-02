import { Element } from "./Element.ts";
import { HTMLCollection } from "./HTMLCollection.ts";
import { Node } from "./Node.ts";
import { findChildById } from "./utils.ts";

export class Document extends Node {
  readonly #root: Element;

  public get body(): Element | null {
    return this.getElementsByTagName("body").item(0);
  }

  public get documentElement(): Element {
    return this.#root;
  }

  public constructor(root: Element) {
    super("#document", null);
    this.#root = root;
  }

  public createElement(tagName: string): Element {
    return new Element(tagName, null);
  }

  public getElementById(id: string): Element | null {
    return findChildById(this.#root, id);
  }

  /**
   * Returns a list of elements with the given class name.
   * @param className is a string representing the class name(s) to match; multiple class names are separated by whitespace.
   * @returns is a live HTMLCollection of found elements.
   */
  public getElementsByClassName(className: string): HTMLCollection {
    return this.#root.getElementsByClassName(className);
  }

  /**
   * Returns a list of elements with the given tag name.
   * @param name is a string representing the name of the elements. The special string "*" represents all elements.
   * @returns a live HTMLCollection (but see the note below) of found elements in the order they appear in the tree.
   */
  public getElementsByTagName(name: string): HTMLCollection {
    return this.#root.getElementsByTagName(name);
  }

  // querySelector(value: string): Element | null;
  // querySelectorAll(value: string): Element[];
}
