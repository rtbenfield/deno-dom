import { assert, equal } from "https://deno.land/std/testing/asserts.ts";
import { DOMTokenList } from "./DOMTokenList.ts";

Deno.test("DOMTokenList add/contains", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  values.forEach((v) => {
    assert(x.contains(v));
  });
});

Deno.test("DOMTokenList value/contains", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.value = values.join(" ");
  values.forEach((v) => {
    assert(x.contains(v));
  });
});

Deno.test("DOMTokenList add/entries", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  equal(
    Array.from(x.entries()),
    values.map((v) => [v, v]),
  );
});

Deno.test("DOMTokenList add/item", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  values.forEach((v, i) => {
    equal(x.item(i), v);
  });
});

Deno.test("DOMTokenList add/keys", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  equal(Array.from(x.keys()), values);
});

Deno.test("DOMTokenList add/remove/length", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  equal(x.length, 0);
  x.add(...values);
  equal(x.length, values.length);
  x.remove(...values);
  equal(x.length, 0);
});

Deno.test("DOMTokenList add/replace/item", () => {
  const values = ["value1", "value2", "value3"];
  const replace = "replace";
  const x = new DOMTokenList();
  x.add(...values);
  values.forEach((v, i) => {
    equal(x.item(i), v);
    x.replace(v, replace);
    equal(x.item(i), replace);
  });
});

Deno.test("DOMTokenList supports", () => {
  const x = new DOMTokenList();
  equal(x.supports("value"), true);
});

Deno.test("DOMTokenList toggle/contains", () => {
  const value = "value";
  const x = new DOMTokenList();
  assert(!x.contains(value));
  x.toggle(value);
  assert(x.contains(value));
  x.toggle(value, true);
  assert(x.contains(value));
  x.toggle(value);
  assert(!x.contains(value));
  x.toggle(value, false);
  assert(!x.contains(value));
});

Deno.test("DOMTokenList add/value", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  equal(x.value, values.join(" "));
});

Deno.test("DOMTokenList add/values", () => {
  const values = ["value1", "value2", "value3"];
  const x = new DOMTokenList();
  x.add(...values);
  equal(Array.from(x.values()), values);
});
