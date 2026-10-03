import { describe, expect, test } from "bun:test";
import { historyAction, localePath, parseUrlState, writeUrlState } from "./url-state";

const p = (s: string) => new URLSearchParams(s);

describe("parseUrlState", () => {
  test("reads valid values", () => {
    expect(parseUrlState(p("platform=gnome&tech=Python&project=flexa"))).toEqual({
      platform: "gnome",
      tech: "Python",
      project: "flexa",
      resume: null,
    });
  });
  test("ignores unknown or badly cased values", () => {
    expect(parseUrlState(p("platform=GNOME&tech=Cobol&project=nope"))).toEqual({
      platform: null,
      tech: null,
      project: null,
      resume: null,
    });
  });
  test("a platform with no projects is ignored", () => {
    expect(parseUrlState(p("platform=mobile")).platform).toBeNull();
  });
  test("empty params", () => {
    expect(parseUrlState(p(""))).toEqual({
      platform: null,
      tech: null,
      project: null,
      resume: null,
    });
  });
});

describe("writeUrlState", () => {
  test("sets and removes keys, keeps unrelated params", () => {
    expect(writeUrlState(p("utm=x"), { platform: "web" })).toBe("?utm=x&platform=web");
    expect(writeUrlState(p("platform=web&project=flexa"), { project: null })).toBe("?platform=web");
    expect(writeUrlState(p("platform=web"), { platform: null })).toBe("");
  });
});

describe("historyAction", () => {
  const closed = { platform: null, tech: null, project: null, resume: null };
  const open = { ...closed, project: "flexa" };
  test("opening a project pushes, so Back closes it", () => {
    expect(historyAction(closed, { project: "flexa" }, false)).toBe("push");
  });
  test("moving between projects replaces", () => {
    expect(historyAction(open, { project: "harbor" }, true)).toBe("replace");
  });
  test("closing goes back when we pushed, replaces after a shared link", () => {
    expect(historyAction(open, { project: null }, true)).toBe("back");
    expect(historyAction(open, { project: null }, false)).toBe("replace");
  });
  test("filters replace", () => {
    expect(historyAction(closed, { platform: "web" }, false)).toBe("replace");
  });
});

describe("localePath", () => {
  test("switching language keeps filters and the open project", () => {
    expect(localePath("pt-br", "?platform=web&project=flexa")).toBe(
      "/pt-br?platform=web&project=flexa",
    );
    expect(localePath("en", "")).toBe("/en");
  });
});

describe("resume preview state", () => {
  const closed = { platform: null, tech: null, project: null, resume: null };
  test("?resume=open opens the preview, anything else is ignored", () => {
    expect(parseUrlState(p("resume=open")).resume).toBe("open");
    expect(parseUrlState(p("resume=yes")).resume).toBeNull();
  });
  test("opening the resume pushes, closing goes back", () => {
    expect(historyAction(closed, { resume: "open" }, false)).toBe("push");
    expect(historyAction({ ...closed, resume: "open" }, { resume: null }, true)).toBe("back");
  });
});
