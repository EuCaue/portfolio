import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMenu2,
  IconX
} from '@tabler/icons-react';
import ToggleTheme from './ToggleTheme';
import ToggleLanguage from './ToggleLanguage';
import { getScopedI18n } from '@/locales/server';
import HeaderSections from './HeaderSections';

export default async function Header() {
  const scopedT = await getScopedI18n('header');

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content bg-transparent fixed bottom-0 z-10">
        <label
          htmlFor="my-drawer"
          title={scopedT('titleMenuButton')}
          aria-label={scopedT('titleMenuButton')}
          className="ml-4 mb-2 btn btn-success drawer-button shadow-md text-white"
        >
          <IconMenu2 size={40} aria-hidden/>
        </label>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
        ></label>
        <ul className="menu relative  p-4 w-80 min-h-full bg-base-200 text-base-content text-2xl text-center flex flex-col items-center justify-center">
          <HeaderSections />
          <li>
            <label
              htmlFor="my-drawer"
              title={scopedT('titleXButton')}
              aria-label={scopedT('titleXButton')}
              className="btn-wide flex items-center justify-center"
            >
              <IconX size={32} aria-hidden/>
            </label>
          </li>

          <footer className="absolute bottom-0 mb-4 footer w-2/4 p-4  bg-neutral-500 dark:bg-neutral-900 text-neutral-content mt-4 rounded-lg">
            <nav className="grid-cols-2 gap-4 place-self-center justify-self-center text-neutral-200">
              <a
                className="hover:scale-125 hover:text-primary text-2xl transition-colors duration-500"
                title={scopedT('titleGithubButton')}
                aria-label={scopedT('titleGithubButton')}
                href="https://www.github.com/EuCaue/"
                rel="noreferrer"
                target="_blank"
              >
                <IconBrandGithub size={36} aria-hidden />
              </a>

              <a
                className="hover:scale-125 hover:text-primary text-2xl transition-colors duration-500"
                href="http://www.linkedin.com/in/caue-souza/"
                title={scopedT('titleLinkedinButton')}
                aria-label={scopedT('titleLinkedinButton')}
                rel="noreferrer"
                target="_blank"
              >
                <IconBrandLinkedin size={36} aria-hidden/>
              </a>
              <ToggleTheme />
              <ToggleLanguage />
            </nav>
          </footer>
        </ul>
      </div>
    </div>
  );
}
