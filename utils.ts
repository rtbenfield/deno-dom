import { Element } from "./Element.ts";

export function* findChildrenByClassName(
  node: Element,
  className: string,
): Generator<Element, void, void> {
  if (node.className === className) {
    yield node;
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      yield* findChildrenByClassName(child, className);
    }
  }
}

export function* findChildrenByTag(
  node: Element,
  name: string,
): Generator<Element, void, void> {
  if (node.tagName === name) {
    yield node;
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children.item(i)!;
    yield* findChildrenByTag(child, name);
  }
}

export function findChildById(node: Element, id: string): Element | null {
  if (node.id === id) {
    return node;
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const found = findChildById(node.children.item(i)!, id);
      if (found) {
        return found;
      }
    }
    return null;
  }
}
