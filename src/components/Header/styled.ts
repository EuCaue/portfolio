/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.body};
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
    color: ${(props) => props.theme.text};
    text-decoration: none;
    :hover {
      color: ${(props) => props.theme.accentColor};
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      text-decoration: underline;
    }
  }
`;

export const DarkModeSwitcher = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  align-self: center;
  cursor: pointer;

  :hover {
    path {
      color: ${(props) => props.theme.accentColor};
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
`;
