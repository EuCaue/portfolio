import React from 'react';

import { Container, H1, P, ArrowDown } from './styled';

export default function Welcome() {
  return (
    <Container id="welcome">
      <H1>Welcome to my portfolio!! :)</H1>
      <P>See below more information about me. :)</P>
      <a href="#about">
        <ArrowDown />
      </a>
    </Container>
  );
}
