/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  align-items: center;

  justify-content: space-evenly;
  position: sticky;
  top: 0;
  padding-top: 20px;
  z-index: 10;
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
      font-size: 24px;
    }
  }
  @media screen and (max-width: 67em) and (min-width: 20em) {
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    a:hover {
      font-size: 20px;
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
