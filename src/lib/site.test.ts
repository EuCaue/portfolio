import { expect, test } from "bun:test";
import { SEO, SITE_URL } from "./site";

test("canonical domain is the one that serves the portfolio", () => {
  expect(SITE_URL).toBe("https://portfolio.eucaue.online");
});

test("titles and descriptions fit search snippets and match the hero role", () => {
  for (const lang of ["en", "pt-br"] as const) {
    expect(SEO[lang].description.length).toBeLessThanOrEqual(160);
    expect(SEO[lang].title.length).toBeLessThanOrEqual(60);
  }
  expect(SEO.en.title).toBe("Cauê Souza | Full Stack Developer");
  expect(SEO["pt-br"].title).toBe("Cauê Souza | Desenvolvedor Full Stack");
});
