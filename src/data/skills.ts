export type SkillGroup = {
  categoryKey: string;
  items: string[];
};

export const skillsData: SkillGroup[] = [
  {
    categoryKey: "skills.languages",
    items: ["TypeScript", "JavaScript", "Python", "Shell Script"],
  },
  {
    categoryKey: "skills.frontend",
    items: [
      "React",
      "React Native",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Accessibility",
    ],
  },
  {
    categoryKey: "skills.desktopBackend",
    items: ["GTK/LibAdwaita", "Node.js", "Django", "PostgreSQL", "SupaBase"],
  },
  {
    categoryKey: "skills.tools",
    items: ["Git", "GitHub Actions", "Linux", "UI/UX Design", "Meson", "Flatpak"],
  },
];
