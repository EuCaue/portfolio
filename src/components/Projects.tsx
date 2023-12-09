'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import DynamicIcon from './DynamicIcon';
import {
  IconBrandGithub,
  IconChevronLeft,
  IconChevronRight,
  IconSwipe,
  IconWorldWww
} from '@tabler/icons-react';

//  TODO: make better types for this
type ProjectProps = {
  title: string;
  id: number;
  length: number;
  description: string;
  techs: {
    iconName: string;
    tooltipName: string;
  }[];
  githubUrl: string;
  previewUrl?: string;
  desktopImagePreviewBase64?: string;
  mobileImagePreviewBase64?: string;
  usageCmd?: string;
};

type Project = {
  name: string;
  description: { en: string; br: string };
  repo: string;
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

function ProjectCard({
  title,
  description,
  length,
  id,
  techs,
  githubUrl,
  previewUrl,
  desktopImagePreviewBase64,
  mobileImagePreviewBase64,
  usageCmd
}: ProjectProps): JSX.Element {
  //  TODO: make more accessible
  //  TODO: TRANSLATE
  const iconSize = 24;
  const isMobile = useMemo(() => window.innerWidth < 768, []);
  const [showAltImage, setShowAltImage] = useState(isMobile);
  const titleFormated = useMemo(() => title.replace(/-/g, ' '), [title]);
  const desktopImage = `data:image/png;base64,${desktopImagePreviewBase64}`;
  const mobileImage = `data:image/png;base64,${mobileImagePreviewBase64}`;

  //  FIX: not working on min on the first go, simply not finding the elements (min issue)
  const changeCarouselItem = useCallback(
    (op: string) => {
      if (id === length && op === 'next') {
        // last item going forward
        return 0;
      } else if (id === 0 && op === 'prev') {
        // first item going backwards
        return length;
      } else {
        // normal moviment
        return op === 'next' ? id + 1 : id - 1;
      }
    },
    [id, length]
  );

  return (
    <div
      className="card card-bordered border-neutral-content rounded-md w-full h-5/6 carousel-item"
      id={`slide${id.toString()}`}
    >
      {!usageCmd ? (
        <figure className="w-full h-full">
          <Image
            src={showAltImage ? mobileImage : desktopImage}
            className={`w-full ${
              //  TODO: find a way to get this "700px" dinamically (fixed i guess)
              showAltImage ? 'lg:max-h-[700px]' : 'h-[95%]'
            } object-contain`}
            quality={100}
            height={0}
            width={0}
            title={titleFormated}
            alt={titleFormated}
          />
        </figure>
      ) : (
        <div className="mockup-code h-full lg:h-[700px]">
          <pre
            data-prefix="$"
            className="text-info"
          >
            <code>{usageCmd}</code>
          </pre>
        </div>
      )}

      <ul className="card-actions menu menu-horizontal self-center bg-base-200 rounded-box">
        <li>
          <a
            href={`#slide${changeCarouselItem('prev')}`}
            aria-label="Previous carousel item"
            title="Previous carousel item"
            role="button"
          >
            <IconChevronLeft
              size={iconSize}
              aria-hidden
            />
          </a>
        </li>

        {!usageCmd && (
          <li>
            <button
              onClick={() => setShowAltImage(!showAltImage)}
              title="Change image preview"
              aria-label="Change image preview"
            >
              <IconSwipe
                size={iconSize}
                aria-hidden
              />
            </button>
          </li>
        )}

        <li>
          <a
            href={`#slide${changeCarouselItem('next')}`}
            aria-label="Next carousel item"
            title="Next carousel item"
            role="button"
          >
            <IconChevronRight
              size={iconSize}
              aria-hidden
            />
          </a>
        </li>
      </ul>

      <div
        className="card-body"
        role="region"
        aria-label={`Project Details: ${titleFormated}`}
      >
        <h2 className="card-title lg:self-center capitalize">
          {titleFormated}
        </h2>
        <p>{description}</p>

        <ul className="inline-flex justify-center items-center">
          <li className="flex flex-wrap justify-start items-center gap-4">
            {techs.map((tech) => (
              <span
                key={tech.iconName}
                className="tooltip tooltip-secondary"
                aria-label="Tech tooltip"
                data-tip={tech.tooltipName}
              >
                <DynamicIcon
                  name={tech.iconName}
                  ICON_SIZE={iconSize}
                />
              </span>
            ))}
          </li>

          <div
            className="divider divider-horizontal"
            aria-hidden
          />

          <li className="flex gap-4 items-center justify-center">
            <a
              href={githubUrl}
              target="_blank"
              title={`Project: ${titleFormated} GitHub Repository`}
              aria-label={`Project: ${titleFormated} GitHub Repository`}
              rel="noreferrer"
            >
              <IconBrandGithub
                size={24}
                aria-hidden
              />
            </a>

            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                title={`Live Demo for the project: ${titleFormated}`}
                aria-label={`Live Demo for the project: ${titleFormated}`}
                rel="noreferrer"
              >
                <IconWorldWww
                  size={24}
                  aria-hidden
                />
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectsList>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/projects.json');
      const projectsJson: ProjectsListJson = await response.json();
      setProjects([...projectsJson.webProjects, ...projectsJson.termProjects]);
    };

    fetchProjects();
  }, []);

  return (
    <div className="carousel w-[93vw] h-full flex items-center self-center pr-[2px] lg:h-auto">
      {projects?.map((project, index) => (
        <ProjectCard
          id={index}
          length={projects.length - 1}
          key={project.name}
          title={project.name}
          description={project.description.en}
          githubUrl={project.repo}
          previewUrl={project.preview}
          mobileImagePreviewBase64={project.mobileImage}
          desktopImagePreviewBase64={project.desktopImage}
          usageCmd={project.usageCmd}
          techs={[
            { tooltipName: 'TypeScript', iconName: 'Typescript' },
            { tooltipName: 'TailwindCSS', iconName: 'Tailwind' },
            { tooltipName: 'SvelteKit', iconName: 'Svelte' }
          ]}
        />
      ))}
    </div>
  );
}
