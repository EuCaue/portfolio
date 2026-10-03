import { expect, test } from "bun:test";
import { formatTime, nextRate } from "./media-time";

test("formatTime shows m:ss, h:mm:ss past an hour, and 0:00 for bad input", () => {
  expect(formatTime(7.9)).toBe("0:07");
  expect(formatTime(65)).toBe("1:05");
  expect(formatTime(3723)).toBe("1:02:03");
  expect(formatTime(Number.NaN)).toBe("0:00");
  expect(formatTime(Number.POSITIVE_INFINITY)).toBe("0:00");
});

test("nextRate cycles through the speeds", () => {
  expect(nextRate(1)).toBe(1.5);
  expect(nextRate(2)).toBe(0.5);
  expect(nextRate(0.5)).toBe(1);
});
