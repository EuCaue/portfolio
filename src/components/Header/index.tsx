import React, { useState } from 'react';
import { MdWbSunny, MdOutlineDarkMode } from 'react-icons/md';
import { DarkModeSwitcher, Navbar } from './styled';

interface Props {
  toggleTheme: () => void;
}
export default function Header({ toggleTheme }: Props): JSX.Element {
  // NOTE: Darktheme
  const storedDarkMode = JSON.parse(localStorage.getItem('DarkMode') || '{}');
  const [dark, setDark] = useState<boolean>(storedDarkMode);

  localStorage.setItem('DarkMode', JSON.stringify(dark));

  return (
    <Navbar>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>

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
    </Navbar>
  );
}
