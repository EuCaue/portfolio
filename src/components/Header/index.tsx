import React, { useState } from 'react';
import { MdWbSunny, MdOutlineDarkMode } from 'react-icons/md';
import { DarkModeSwitcher, Navbar, Ul } from './styled';

interface Props {
  toggleTheme: () => void;
}
export default function Header({ toggleTheme }: Props): JSX.Element {
  const [dark, setDark] = useState<boolean>(true);
  return (
    <Navbar>
      <Ul>
        <li>
          <a href="projects">Projects</a>
        </li>
        <li>
          <a href="about">About</a>
        </li>
        <li>
          <a href="contact">Contact</a>
        </li>

        <DarkModeSwitcher
          onClick={() => {
            toggleTheme();
            setDark(!dark);
          }}
        >
          {dark ? (
            <MdOutlineDarkMode size={25} color="#e0def4" />
          ) : (
            <MdWbSunny size={25} color="#ea9d34" />
          )}
        </DarkModeSwitcher>
      </Ul>
    </Navbar>
  );
}
