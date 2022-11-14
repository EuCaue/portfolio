/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { FaGithub, FaGlobe } from 'react-icons/fa';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
}

export const Container = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
`;

export const ContainerProjects = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ImageProject = styled.div<ProjectsBoxProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: ${(props) => props.width} ${(props) => props.height};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1.5px solid ${(props) => props.theme.accentColor};
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

// export const LiveLink = styled.a`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-decoration: none;
// `;
//
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
