import { getCurrentLocale } from '@/locales/server';
import Project from './Project';
import fs from 'fs/promises';
import path from 'path';

type Project = {
  name: string;
  description: { en: string; br: string };
  repo: string;
  techs: string[];
};

type TermProject = {
  usageCmd?: string;
} & Project;

type WebProject = {
  preview?: string;
  desktopImage?: string;
  mobileImage?: string;
} & Project;

type ProjectsListJson = {
  webProjects: WebProject[];
  termProjects: TermProject[];
};

type ProjectsList = (WebProject & TermProject)[];

async function getProjectsData(): Promise<ProjectsList> {
  const publicFolderPath = path.join(process.cwd(), 'public');
  const filePath = path.join(publicFolderPath, 'projects.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const projectsJson: ProjectsListJson = JSON.parse(fileContent);
  return [...projectsJson.webProjects, ...projectsJson.termProjects];
}

export default async function Projects(): Promise<JSX.Element> {
  const locale = getCurrentLocale();
  const projects = await getProjectsData();

  return (
    <div className="carousel w-[93vw] h-full flex items-center self-center pr-[2px] lg:h-auto">
      {projects?.map((project, index) => (
        <Project
          id={index}
          length={projects.length - 1}
          key={project.name}
          title={project.name}
          description={project.description[locale]}
          githubUrl={project.repo}
          previewUrl={project.preview}
          mobileImagePreviewBase64={project.mobileImage}
          desktopImagePreviewBase64={project.desktopImage}
          usageCmd={project.usageCmd}
          techs={project.techs.sort()}
        />
      ))}
    </div>
  );
}
