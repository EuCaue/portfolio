/* eslint-disable import/extensions */
import React from 'react';

import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import {
  Container,
  ContainerProjects,
  ImageProject,
  TitleProject,
  ParaProject,
} from './styled';
import ratingProject from '../../assets/imgs/rating.png';
import advice from '../../assets/imgs/advice.png';
import url from '../../assets/imgs/index.png';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
  title: string;
  para: string;
}
function ProjectsBox({
  image,
  width,
  height,
  title,
  para,
}: ProjectsBoxProps): JSX.Element {
  return (
    <ContainerProjects>
      <ImageProject image={image} width={width} height={height} />
      <TitleProject>{title}</TitleProject>
      <ParaProject>{para}</ParaProject>
      <a
        href="https://github.com/EuCaue/interactive-rating-component"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
        <a
          href="https://interactive-rating-component-main-six.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          <CgWebsite />
        </a>
      </a>
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
      />
      <ProjectsBox
        image={advice}
        width="250px"
        height="150px"
        title="Advice Generator"
        para="A website for generating random advices."
      />
      <ProjectsBox
        image={url}
        width="250px"
        height="150px"
        title="Url Shortening"
        para="A website for shorten urls links."
      />
    </Container>
  );
}
