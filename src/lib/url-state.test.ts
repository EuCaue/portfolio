import { describe, expect, test } from "bun:test";
import { parseUrlState, writeUrlState } from "./url-state";

const p = (s: string) => new URLSearchParams(s);

describe("parseUrlState", () => {
  test("reads valid values", () => {
    expect(parseUrlState(p("platform=gnome&tech=Python&project=flexa"))).toEqual({
      platform: "gnome",
      tech: "Python",
      project: "flexa",
    });
  });
  test("ignores unknown or badly cased values", () => {
    expect(parseUrlState(p("platform=GNOME&tech=Cobol&project=nope"))).toEqual({
      platform: null,
      tech: null,
      project: null,
    });
  });
  test("empty params", () => {
    expect(parseUrlState(p(""))).toEqual({ platform: null, tech: null, project: null });
  });
});

describe("writeUrlState", () => {
  test("sets and removes keys, keeps unrelated params", () => {
    expect(writeUrlState(p("utm=x"), { platform: "web" })).toBe("?utm=x&platform=web");
    expect(writeUrlState(p("platform=web&project=flexa"), { project: null })).toBe("?platform=web");
    expect(writeUrlState(p("platform=web"), { platform: null })).toBe("");
  });
});
