import { Node } from "./Node.ts";

export class NodeList {
  public get length(): number {
    return this.nodes.length;
  }

  public constructor(private readonly nodes: readonly Node[]) {}

  public entries(): Iterator<[number, Node]> {
    return this.nodes.entries();
  }

  public forEach(callback: (item: Node) => void): void {
    return this.nodes.forEach(callback);
  }

  public item(index: number): Node | null {
    return this.nodes[index] ?? null;
  }

  public keys(): Iterator<number> {
    return this.nodes.keys();
  }

  public values(): Iterator<Node> {
    return this.nodes.values();
  }
}
