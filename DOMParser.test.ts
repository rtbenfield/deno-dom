import { assert, equal } from "https://deno.land/std/testing/asserts.ts";
import { DOMParser } from "./DOMParser.ts";

Deno.test("appendChild", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body></body></html>",
    "text/html",
  );

  const element = document.createElement("div");
  document.body!.appendChild(element);
  equal(element.parentElement, document.body);
  equal(document.body!.childElementCount, 1);
  equal(document.body!.children.item(0), element);

  const element2 = document.createElement("div");
  element.appendChild(element2);
  equal(element2.parentElement, element);
  equal(element.childElementCount, 1);
  equal(element.children.item(0), element2);

  document.body!.appendChild(element2);
  equal(element2.parentElement, document.body);
  equal(document.body!.childElementCount, 2);
  equal(document.body!.children.item(0), element);
  equal(document.body!.children.item(1), element2);
  equal(element.childElementCount, 0);
  equal(element.childNodes.length, 0);
});

Deno.test("body", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body></body></html>",
    "text/html",
  );
  assert(document.body !== null);
  equal(document.body.tagName, "body");
});

Deno.test("getElementById", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body><span id='hello'>Hello, <span id='world'>World</span></span></body></html>",
    "text/html",
  );
  const element = document.getElementById("hello");
  assert(element !== null);
  equal(element.getAttribute("id"), "hello");
});

Deno.test("getElementsByClassName", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body><span class='hello'><span class='world'></span></span><div class='world'></div></body></html>",
    "text/html",
  );
  const elements = document.getElementsByClassName("world");
  assert(elements !== null);
  equal(elements.length, 2);
  for (let i = 0; i < elements.length; i++) {
    const element = elements.item(i);
    assert(element !== null);
    equal(element.className, "world");
    equal(element.getAttribute("class"), "world");
  }
});

Deno.test("getElementsByTagName", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body><span id='hello'><span id='world'></span></span><div id='other'></div></body></html>",
    "text/html",
  );
  const elements = document.getElementsByTagName("span");
  assert(elements !== null);
  equal(elements.length, 2);
  for (let i = 0; i < elements.length; i++) {
    const element = elements.item(i);
    assert(element !== null);
    equal(element.tagName, "span");
  }
});

Deno.test("textContent", () => {
  const parser = new DOMParser();
  const document = parser.parseFromString(
    "<html><body><span id='hello'>Hello, World!</span></body></html>",
    "text/html",
  );
  const element = document.getElementById("hello");
  assert(element !== null);
  equal(element.textContent, "Hello, World!");
  element.textContent = "World, Hello!";
  equal(element.textContent, "World, Hello!");
});
