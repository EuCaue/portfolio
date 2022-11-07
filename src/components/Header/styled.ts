/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.body};
  height: 4em;
  flex-wrap: wrap;
  a {
    margin: auto;
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
  display: inline-flex;
  justify-content: right;
  align-items: right;
  margin-right: 0.5em;
  align-self: right;
  cursor: pointer;

  :hover {
    path {
      color: ${(props) => props.theme.accentColor};
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
`;
