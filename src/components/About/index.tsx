import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import ScrollDown from '../ScrollDown';
import { Container, H1, PAboutMe, ProfilePicture } from './styled';

export default function About() {
  return (
    <Container id="about">
      <ProfilePicture />
      <H1>About Me</H1>
      <PAboutMe>
        Hi! My name is Cauê! I&apos;m a front-end developer from Brazil. 🇧🇷{' '}
        <br />I become a developer because, since are a kid, always love the
        technology, and it&apos;s my dream now work with that. <br />I currently
        know these technologies:{' '}
        <strong>HTML, CSS, JS, REACTJS, TYPESCRIPT. </strong>
        This is my portfolio, made with{' '}
        <FaReact
          fill="#61dafb"
          style={{ backgroundColor: 'transparent', marginLeft: 10 }}
        />{' '}
        + <SiTypescript fill="#31748f" />
      </PAboutMe>
      <ScrollDown section="#projects" />
    </Container>
  );
}
