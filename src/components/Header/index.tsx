import React, { useState } from 'react';
import { MdWbSunny, MdOutlineDarkMode } from 'react-icons/md';
import { DarkModeSwitcher, Navbar, Ul } from './styled';

interface Props {
  toggleTheme: () => void;
}
export default function Header({ toggleTheme }: Props) {
  const [dark, setDark] = useState<boolean>(true);
  return (
    <Navbar>
      <Ul>
        <li>
          <a href="aaa">Projects</a>
        </li>
        <li>
          <a href="aaa">About</a>
        </li>
        <li>
          <a href="aaa">Contact</a>
        </li>
        <DarkModeSwitcher
          onClick={() => {
            toggleTheme();
            setDark(!dark);
          }}
        >
          {dark ? (
            <MdOutlineDarkMode size={24} color="#e0def4" />
          ) : (
            <MdWbSunny size={24} color="#ea9d34" />
          )}
        </DarkModeSwitcher>
      </Ul>
    </Navbar>
  );
}
