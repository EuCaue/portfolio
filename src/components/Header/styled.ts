/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import * as colors from '../../assets/styles/colors';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.surface};
  /* text-align: center; */

  height: 4em;
`;

export const Ul = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 5em;
  a {
    font-family: 'Merriweather', serif;
    display: flex;
    color: ${colors.text};
    text-decoration: none;
    :hover {
      color: ${colors.pine};
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      text-decoration: underline;
    }
  }
`;
