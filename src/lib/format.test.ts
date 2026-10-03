import { expect, test } from "bun:test";
import { fill } from "./format";

test("fill replaces named placeholders and leaves unknown ones", () => {
  expect(fill("Showing {shown} of {total}", { shown: 3, total: 15 })).toBe("Showing 3 of 15");
  expect(fill("Open {name}", {})).toBe("Open {name}");
});
