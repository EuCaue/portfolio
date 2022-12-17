/* eslint-disable import/extensions */
import React from 'react';

import {
  Container,
  ContainerProjects,
  ImageProject,
  TitleProject,
  ParaProject,
  SpanLinks,
  Github,
  Globe,
  LinkProject,
} from './styled';
import ratingProject from '../../assets/imgs/rating.png';
import advice from '../../assets/imgs/advice.png';
import url from '../../assets/imgs/url.png';
import portfolio from '../../assets/imgs/portfolio.png';
import ScrollDown from '../ScrollDown';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
  title: string;
  para: string;
  github: string;
  site: string;
}
function ProjectsBox({
  image,
  width,
  height,
  title,
  para,
  github,
  site,
}: ProjectsBoxProps): JSX.Element {
  return (
    <ContainerProjects>
      <ImageProject image={image} width={width} height={height} />
      <TitleProject>{title}</TitleProject>
      <ParaProject>{para}</ParaProject>

      <SpanLinks>
        <LinkProject href={github} target="_blank" rel="noreferrer">
          <Github size={28} />
        </LinkProject>

        <LinkProject href={site} target="_blank" rel="noreferrer">
          <Globe size={28} />
        </LinkProject>
      </SpanLinks>
    </ContainerProjects>
  );
}

export default function Projects() {
  return (
    <Container id="projects">
      <ProjectsBox
        image={ratingProject}
        width="250px"
        height="150px"
        title="Rating Component"
        para="It's a component to submit a rating of some service. "
        github="https://github.com/EuCaue/interactive-rating-component"
        site="https://interactive-rating-component-main-six.vercel.app/"
      />
      <ProjectsBox
        image={advice}
        width="250px"
        height="150px"
        title="Advice Generator"
        para="A website for generating random advices."
        github="https://github.com/EuCaue/advice-generator-app"
        site="https://advice-generator-app-rouge.vercel.app/"
      />
      <ProjectsBox
        image={url}
        width="250px"
        height="150px"
        title="Url Shortening"
        para="A website for shorten urls links."
        github="https://github.com/EuCaue/url-shortening-api"
        site="https://url-shortening-api-indol.vercel.app/"
      />
      <ProjectsBox
        image={portfolio}
        width="250px"
        height="150px"
        title="My Portfolio"
        para="My personal portfolio made with ❤."
        github="https://github.com/EuCaue/portfolio"
        site="https://portfolio-caue-souza.vercel.app/"
      />
      <ScrollDown section="#contact" />
    </Container>
  );
}
