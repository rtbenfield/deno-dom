import parse from "https://denopkg.com/nekobato/deno-xml-parser/index.ts";
import { Document } from "./Document.ts";
import { Element } from "./Element.ts";
import { XMLDocument } from "./XMLDocument.ts";

function parseElement(node: any, parent: Element | null): Element {
  const element = new Element(node.name, parent);
  if (node.content) {
    element.textContent = node.content;
  }
  for (const [key, value] of Object.entries(node.attributes)) {
    element.setAttribute(key, value as string);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      parseElement(child, element);
    }
  }
  parent?.appendChild(element);
  return element;
}

export type XMLMimeType =
  | "text/xml"
  | "application/xml"
  | "application/xhtml+xml"
  | "image/svg+xml";

export class DOMParser {
  public parseFromString(value: string, mimeType: "text/html"): Document;
  public parseFromString(value: string, mimeType: XMLMimeType): XMLDocument;
  parseFromString(
    value: string,
    mimeType: "text/html" | XMLMimeType,
  ): Document | XMLDocument {
    const document = parse(value);
    if (!document.root) {
      // TODO: implement spec for errors
      throw new Error();
    }
    const root = parseElement(document.root, null);
    if (mimeType === "text/html") {
      return new Document(root);
    } else {
      return new XMLDocument(root);
    }
  }
}
