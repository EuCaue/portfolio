import React, { useState } from 'react';
import { MdWbSunny, MdOutlineDarkMode } from 'react-icons/md';
import { DarkModeSwitcher, Navbar } from './styled';

interface Props {
  toggleTheme: () => void;
}
export default function Header({ toggleTheme }: Props): JSX.Element {
  // TODO: make the state reminder the last
  const [dark, setDark] = useState<boolean>(true);

  localStorage.setItem('dark', JSON.stringify(dark));

  const darkStorage = JSON.parse(localStorage.getItem('dark'));
  console.log(darkStorage);

  return (
    <Navbar>
      <a href="projects">Projects</a>
      <a href="about">About</a>
      <a href="aaa">Contact</a>

      <DarkModeSwitcher
        onClick={() => {
          toggleTheme();

  setDark(darkStorage);
          if (darkStorage) return setDark(darkStorage);

          return setDark(!dark);
        }}
      >
        {dark ? (
          <MdOutlineDarkMode size={25} color="#e0def4" />
        ) : (
          <MdWbSunny size={25} color="#ea9d34" />
        )}
      </DarkModeSwitcher>
    </Navbar>
  );
}
