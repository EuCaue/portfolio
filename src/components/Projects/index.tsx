/* eslint-disable import/extensions */
import React from 'react';

import { Container, ImageProject } from './styled';
import ratingProject from '../../assets/imgs/rating.png';
import advice from '../../assets/imgs/advice.png';
import url from '../../assets/imgs/url.png';

interface ProjectsBoxProps {
  image: string;
  width: string;
  height: string;
}
function ProjectsBox({ image, width, height }: ProjectsBoxProps): JSX.Element {
  return <ImageProject image={image} width={width} height={height} />;
}

export default function Projects() {
  return (
    <Container id="projects">
      <ProjectsBox image={ratingProject} width="250px" height="150px" />
      <ProjectsBox image={advice} width="250px" height="150px" />
      <ProjectsBox image={url} width="250px" height="300px" />
    </Container>
  );
}
