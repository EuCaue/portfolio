import React, { useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

import { Navbar, Ul } from './styled';

interface Props {
  toggleTheme: void;
  isDark: boolean;
}

export default function Header({ toggleTheme, isDark }: Props) {
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
        <div onClick={toggleTheme}>
          {isDark ? (
            <MdDarkMode size={24} color="000" />
          ) : (
            <MdOutlineDarkMode size={24} color="fff" />
          )}
        </div>
      </Ul>
    </Navbar>
  );
}
