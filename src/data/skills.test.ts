import { expect, test } from "bun:test";
import { en } from "@/locales/en";
import { ptBR } from "@/locales/pt-BR";
import { skillsData } from "./skills";

test("Go and Rust are in the toolbox, next to TypeScript and JavaScript", () => {
  const languages = skillsData.find((g) => g.categoryKey === "skills.languages")?.items;
  expect(languages?.slice(0, 4)).toEqual(["TypeScript", "JavaScript", "Go", "Rust"]);
});

test("the hero role matches the resume title", () => {
  expect(en["intro.role"]).toBe("Full Stack Developer");
  expect(ptBR["intro.role"]).toBe("Desenvolvedor Full Stack");
});
