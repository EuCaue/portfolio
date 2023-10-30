'use client';
import { useScopedI18n } from '@/locales/client';
import { useCallback, useEffect } from 'react';

type SectionsNav = {
  name: string;
  sectionId: string;
};

export default function HeaderSections() {
  const scopedT = useScopedI18n('header');
  const updateCurrentHighlightSection = useCallback((): void => {
    const sections: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.hero');
    const headersLinks: NodeListOf<HTMLLinkElement> = document.querySelectorAll(
      '.menu .link-hover a'
    );

    let mostVisibleSection: HTMLDivElement | null = null;
    let maxVisibleArea: number = 0;

    sections.forEach((section: HTMLDivElement) => {
      const rect: DOMRect = section.getBoundingClientRect();
      const visibleArea: number =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        mostVisibleSection = section;
      }
    });

    headersLinks.forEach((headerLink: HTMLLinkElement) => {
      if (mostVisibleSection!.id === headerLink.href.split('#')[1]) {
        headerLink.classList.add('bg-error');
      } else {
        headerLink.classList.remove('bg-error');
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateCurrentHighlightSection);
    return () =>
      window.removeEventListener('scroll', updateCurrentHighlightSection);
  }, [updateCurrentHighlightSection]);

  useEffect(() => {
    updateCurrentHighlightSection();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sectionsNav: SectionsNav[] = [
    {
      name: scopedT('sections.0'),
      sectionId: `#${scopedT('sections.0').toLowerCase()}`
    },
    {
      name: scopedT('sections.1'),
      sectionId: `#${scopedT('sections.1').toLowerCase()}`
    },
    {
      name: scopedT('sections.2'),
      sectionId: `#${scopedT('sections.2').toLowerCase()}`
    },
    {
      name: scopedT('sections.3'),
      sectionId: `#${scopedT('sections.3').toLowerCase()}`
    }
  ];

  return sectionsNav.map((nav) => (
    <li
      key={nav.name}
      title={scopedT('sectionGoto', { section: nav.name })}
      aria-label={scopedT('sectionGoto', { section: nav.name })}
      className="text-base-900 mb-2 link-hover"
    >
      <a href={nav.sectionId}>{nav.name}</a>
    </li>
  ));
}
