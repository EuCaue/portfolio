import React from 'react';
import { Container, PAboutMe } from './styled';

export default function About() {
  return (
    <Container>
      <h1>About Me</h1>
      <PAboutMe>
        Hi! My name is Cauê! I&apos;m a front-end developer from Brazil. 🇧🇷{' '}
        <br />I become a developer because, since are a kid, always love the
        technology, and it&apos;s my dream now work with that. <br />I currently
        know these technologies:{' '}
        <strong>HTML, CSS, JS, REACTJS, TYPESCRIPT. </strong>
        This is my portfolio, made with Reactjs + TypeScript.
      </PAboutMe>
    </Container>
  );
}
