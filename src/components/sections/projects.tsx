"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderGit, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/language-context";
import { type Project, projects } from "@/data/projects";

export default function Projects() {
  const { t } = useLanguage();

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("projects.title")}</h2>
          <div className="mt-1 h-1 w-12 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Featured Projects Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold border-b pb-2 text-foreground/90">
            ⭐ {t("projects.featured")}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.map((project, index) => {
              return (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.titleKey}
                  isFeatured={true}
                />
              );
            })}
          </div>
        </div>

        {/* Other Projects Section */}
        <div className="space-y-8 pt-6">
          <h3 className="text-2xl font-bold border-b pb-2 text-foreground/90">
            📁 {t("projects.other")}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, index) => {
              return (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.titleKey}
                  isFeatured={false}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type ProjectProps = {
  project: Project;
  index: number;
  isFeatured: boolean;
};

function ProjectCard({ project, index, isFeatured }: ProjectProps) {
  const { t } = useLanguage();
  return (
    <Dialog>
      <motion.div
        key={project.titleKey}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <Card
          className={`h-full overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between ${
            isFeatured ? "border-primary/20 bg-card/60" : "border-border/60"
          }`}
        >
          <div>
            <div className="aspect-video overflow-hidden bg-muted flex items-center justify-center relative">
              {project.image || project.video ? (
                <DialogTrigger asChild>
                  <button type="button" className="w-full h-full cursor-zoom-in text-left">
                    {project.video ? (
                      <video
                        controls={false}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      >
                        {project.video.sources.map(({ type, url }) => {
                          return <source src={url} type={`video/${type}`} key={url} />;
                        })}
                      </video>
                    ) : (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={t(project.titleKey)}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    )}
                  </button>
                </DialogTrigger>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
                  <FolderGit className="h-12 w-12 mb-2" />
                  <p className="text-sm">No preview available</p>
                </div>
              )}
            </div>
            <CardHeader className="p-5">
              <CardTitle className="text-xl">{t(project.titleKey)}</CardTitle>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-4 pt-0">
              <CardDescription className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                {t(project.descriptionKey)}
              </CardDescription>
            </CardContent>
          </div>
          <CardFooter className="p-5 pt-0 flex gap-2">
            {project.github && (
              <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                  {t("projects.github")}
                </a>
              </Button>
            )}
            {project.preview && (
              <Button size="sm" asChild className="h-8 text-xs">
                <a href={project.preview} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  {t("projects.liveDemo")}
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Dialog for details preview */}
      <DialogContent className="max-w-4xl w-[90vw] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">{t(project.titleKey)}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-foreground/80 mb-4">
            {t(project.descriptionKey)}
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden bg-muted rounded-lg border border-border flex items-center justify-center">
          {project.video ? (
            <video controls autoPlay loop muted className="w-full h-full object-contain">
              {project.video.sources.map(({ type, url }) => {
                return <source src={url} type={`video/${type}`} key={url} />;
              })}
            </video>
          ) : (
            <img
              src={project.image || "/placeholder.svg"}
              alt={t(project.titleKey)}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
