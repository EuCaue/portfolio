import { describe, expect, test } from "bun:test";
import { en } from "./en";
import { ptBR } from "./pt-BR";

const BANNED =
  /passionate|seamless|robust|elevate|leverage|cutting-edge|top-notch|apaixonad|perfeitamente|de primeira linha/i;

describe.each([
  ["en", en as Record<string, string>],
  ["pt-BR", ptBR as Record<string, string>],
])("%s copy", (_name, dict) => {
  test("no em or en dashes", () => {
    for (const [key, value] of Object.entries(dict)) {
      expect({ key, dash: /[–—]/.test(value) }).toEqual({ key, dash: false });
    }
  });
  test("no stock AI phrasing", () => {
    for (const [key, value] of Object.entries(dict)) {
      expect({ key, banned: BANNED.test(value) }).toEqual({ key, banned: false });
    }
  });
});

test("pt-BR has every key with its own text where English was left behind before", () => {
  expect(Object.keys(ptBR).sort()).toEqual(Object.keys(en).sort());
  expect(ptBR["contact.form.error"]).not.toBe(en["contact.form.error"]);
  expect(ptBR["footer.rights"]).not.toBe(en["footer.rights"]);
});
