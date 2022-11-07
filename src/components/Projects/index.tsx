/* eslint-disable import/extensions */
import React from 'react';

import { Container, ImageProject } from './styled';
import ratingProject from '../../assets/imgs/rating.png';
import advice from '../../assets/imgs/advice.png';
import url from '../../assets/imgs/url.png';

interface ProjectsBoxProps {
  src: string;
  width: string;
  height: string;
  altText: string;
}
function ProjectsBox({
  src,
  width,
  height,
  altText,
}: ProjectsBoxProps): JSX.Element {
  return <ImageProject src={src} width={width} height={height} alt={altText} />;
}

export default function Projects() {
  return (
    <Container id="projects">
      <ProjectsBox
        src={ratingProject}
        width="250"
        height="150"
        altText="rating project"
      />
      <ProjectsBox
        src={advice}
        width="250"
        height="150"
        altText="advice project"
      />
      <ProjectsBox src={url} width="250" height="100" altText="url project" />
    </Container>
  );
}
