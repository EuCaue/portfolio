'use client';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DynamicIcon from './DynamicIcon';
import { useScopedI18n } from '@/locales/client';
import {
  IconBrandGithub,
  IconChevronLeft,
  IconChevronRight,
  IconSwipe,
  IconWorldWww
} from '@tabler/icons-react';

type ProjectProps = {
  title: string;
  id: number;
  length: number;
  description: string;
  techs: string[];
  githubUrl: string;
  previewUrl?: string;
  desktopImagePreviewBase64?: string;
  mobileImagePreviewBase64?: string;
  usageCmd?: string;
};

export default function Project({
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
  const iconSize = 24;
  const [showAltImage, setShowAltImage] = useState<boolean>();
  const titleFormated = useMemo(() => title.replace(/-/g, ' '), [title]);
  const desktopImage = `data:image/png;base64,${desktopImagePreviewBase64}`;
  const mobileImage = `data:image/png;base64,${mobileImagePreviewBase64}`;
  const scopedT = useScopedI18n('project');

  useEffect(() => {
    setShowAltImage(window.innerWidth < 768);
    const handleResize = () => setShowAltImage(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      className="card card-bordered border-base-content rounded-md w-full h-5/6 carousel-item"
      id={`slide${id.toString()}`}
    >
      {!usageCmd ? (
        <figure className="w-full h-full">
          <Image
            src={showAltImage ? mobileImage : desktopImage}
            className={`w-full ${
              showAltImage ? 'lg:max-h-[65vh] h-full' : 'h-[95%]'
            } object-contain rounded-md`}
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
            aria-label={scopedT('slideButton.left')}
            title={scopedT('slideButton.left')}
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
              title={scopedT('slideButton.imagePreview')}
              aria-label={scopedT('slideButton.imagePreview')}
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
            aria-label={scopedT('slideButton.right')}
            title={scopedT('slideButton.right')}
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
        aria-label={scopedT('ariaLabelDetails', { projectName: titleFormated })}
      >
        <h2 className="card-title lg:self-center capitalize">
          {titleFormated}
        </h2>
        <p>{description}</p>

        <ul className="inline-flex justify-center items-center">
          <li className="flex flex-wrap justify-start items-center gap-4">
            {techs.map((tech) => (
              <span
                key={tech}
                className="tooltip tooltip-secondary"
                aria-label={scopedT('techAriaLabel', {
                  tech: tech
                })}
                data-tip={tech}
              >
                <DynamicIcon
                  name={tech}
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
              title={scopedT('githubButton', {
                projectName: titleFormated
              })}
              aria-label={scopedT('githubButton', {
                projectName: titleFormated
              })}
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
                title={scopedT('previewButton', {
                  projectName: titleFormated
                })}
                aria-label={scopedT('previewButton', {
                  projectName: titleFormated
                })}
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
