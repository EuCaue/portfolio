import React from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Navbar, Ul } from './styled';

export default function Header() {
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

        <MdOutlineDarkMode size={24} color="white" />
      </Ul>
    </Navbar>
  );
}
