"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, FolderGit } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

type Project = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: string | null;
  tags: string[];
  github?: string;
  preview?: string;
};

export default function Projects() {
  const { t } = useLanguage();

  const projects: Project[] = [
    {
      id: 1,
      titleKey: "projects.quickLofi.title",
      descriptionKey: "projects.quickLofi.description",
      image: null,
      tags: [
        "JavaScript",
        "TypeScript",
        "OOP",
        "GNOME Shell",
        "CSS3",
        "ESBuild",
        "Git",
      ],
      github: "https://github.com/EuCaue/quick-lofi",
    },
    {
      id: 2,
      titleKey: "projects.myMovies.title",
      descriptionKey: "projects.myMovies.description",
      image: "https://github.com/EuCaue/my-movies/blob/master/app.png?raw=true",
      tags: [
        "Python",
        "Django",
        "TypeScript",
        "React",
        "React Hook Form",
        "Next.js",
        "Auth.js",
        "Zod",
        "Vercel",
        "Git"
      ],
      github: "https://github.com/EuCaue/my-movies",
      preview: "https://my-movies-frontend-five.vercel.app/",
    },
    {
      id: 3,
      titleKey: "projects.urlShort.title",
      descriptionKey: "projects.urlShort.description",
      image: "https://github.com/EuCaue/url-short/blob/master/app.png?raw=true",
      tags: ["TypeScript", "React", "Next.js", "TailwindCSS", "Git"],
      github: "https://github.com/EuCaue/url-short",
      preview: "https://url-short-omega.vercel.app/",
    },
    {
      id: 4,
      titleKey: "projects.snapTheWeb.title",
      descriptionKey: "projects.snapTheWeb.description",
      image:
        "https://github.com/EuCaue/snap-the-web/blob/master/preview.png?raw=true",
      tags: ["Angular", "PrimeNG", "TypeScript", "HTML5", "CSS3", "REST API"],
      github: "https://github.com/EuCaue/snap-the-web",
      preview: "https://snap-the-web.vercel.app/",
    },
    {
      id: 5,
      titleKey: "projects.getCat.title",
      descriptionKey: "projects.getCat.description",
      image: "/get-cat.png",
      tags: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
      github: "https://github.com/EuCaue/get-cat",
      preview: "https://get-cat.vercel.app/",
    },
    {
      id: 6,
      titleKey: "projects.nautilusCopy.title",
      descriptionKey: "projects.nautilusCopy.description",
      image: "/nautilus-extension-copy-file-contents.png",
      tags: ["Python", "Nautilus API", "Make"],
      github: "https://github.com/EuCaue/nautilus-extension-copy-file-contents",
    },
    {
      id: 7,
      titleKey: "projects.decomp.title",
      descriptionKey: "projects.decomp.description",
      image: null,
      tags: ["Node.js", "TypeScript", "Jest", "CLI"],
      github: "https://github.com/EuCaue/decomp",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("projects.title")}
          </h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={t(project.titleKey)}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
                      <FolderGit className="h-12 w-12 mb-2" />
                      <p className="text-sm">No preview available</p>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{t(project.titleKey)}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t(project.descriptionKey)}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t("projects.github")}
                      </a>
                    </Button>
                  )}
                  {project.preview && (
                    <Button size="sm" asChild>
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t("projects.liveDemo")}
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
