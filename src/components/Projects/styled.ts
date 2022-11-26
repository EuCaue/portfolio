/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FaGithub, FaGlobe } from 'react-icons/fa';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
}

export const ContainerProjects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 4em;
`;

export const ImageProject = styled.div<ProjectsBoxProps>`
  box-shadow: 0px 0px 5px 5px ${(props) => props.theme.highlight};
  -webkit-box-shadow: 0px 0px 5px 5px ${(props) => props.theme.highlight};
  -moz-box-shadow: 0px 0px 5px 5px ${(props) => props.theme.highlight};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: ${(props) => props.width} ${(props) => props.height};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1.8px outset ${(props) => props.theme.accentColor};
`;

export const TitleProject = styled.h1`
  padding: 0.6em;
  font-family: ${(props) => props.theme.fontSans};
  color: ${(props) => props.theme.text};
`;

export const ParaProject = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 15em;
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;

export const LinkProject = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding-top: 1em;
`;

export const SpanLinks = styled.span`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
`;

export const Github = styled(FaGithub)`
  color: ${(props) => props.theme.text};
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.5s all ease;
  }
`;

export const Globe = styled(FaGlobe)`
  color: ${(props) => props.theme.text};
  :hover {
    color: ${(props) => props.theme.accentColor};
    transition: 0.5s all ease;
  }
`;

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
  position: relative;
  a:nth-child(5) {
    position: absolute;
    top: 95vh;
  }

  @media screen and (max-width: 67em) and (min-width: 20em) {
    height: 180vh;
    a:nth-child(5) {
      top: 182vh;
      right: 45vw;
    }
  }
`;
