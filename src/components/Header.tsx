import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import ToggleTheme from './ToggleTheme';

export default function Header() {
  type SectionsNav = {
    name: string;
    sectionId: string;
  };

  const sectionsNav: SectionsNav[] = [
    {
      name: 'Home',
      sectionId: '#home'
    },
    {
      name: 'About',
      sectionId: '#about'
    },
    {
      name: 'Projects',
      sectionId: '#projects'
    },
    {
      name: 'Contact',
      sectionId: '#contact'
    }
  ];

  return (
    <div className="relative">
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content bg-transparent fixed bottom-0">
          <label
            htmlFor="my-drawer"
            aria-label="Open sidebar"
            title="Open sidebar"
            className="ml-4 mb-2 btn btn-success drawer-button shadow-md text-base-content"
          >
            <IconMenu2 size={40} />
          </label>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu relative  p-4 w-80 min-h-full bg-base-200 text-base-content text-2xl text-center flex flex-col items-center justify-center">
            {sectionsNav.map((nav) => (
              <li
                key={nav.name}
                title={`Go to ${nav.name} section.`}
                aria-label={`Go to ${nav.name} section.`}
                className="text-base-900 mb-2 link-hover"
              >
                <a href={nav.sectionId}>{nav.name}</a>
              </li>
            ))}
            <li>
              <label
                htmlFor="my-drawer"
                title="Close sidebar"
                aria-label="Close sidebar"
                className="btn-wide flex items-center justify-center"
              >
                <IconX size={32} />
              </label>
            </li>

            <footer className="absolute bottom-0 mb-4 footer w-2/4 items-center p-4 bg-base-300 text-neutral-content mt-4">
              <nav className="grid-cols-2 gap-4 md:place-self-center md:justify-self-center text-primary-content dark:text-neutral-content">
                <a
                  className="hover:scale-125 hover:text-primary text-2xl transition-colors duration-500"
                  title="Go to my GitHub profile"
                  aria-label="Go to my GitHub profile"
                  href="https://www.github.com/EuCaue/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconBrandGithub size={36} />
                </a>

                <a
                  className="hover:scale-125 hover:text-primary text-2xl transition-colors duration-500"
                  href="http://www.linkedin.com/in/caue-souza/"
                  title="Go to my Linkedin profile"
                  aria-label="Go to my Linkedin profile"
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconBrandLinkedin size={36} />
                </a>
                <ToggleTheme />
              </nav>
            </footer>
          </ul>
        </div>
      </div>
    </div>
  );
}
