import React from 'react';

import Header from '../../components/Header';
import About from '../../components/About';
import Projects from '../../components/Projects';

interface Props {
  toggleTheme: () => void;
}

export default function Portfolio({ toggleTheme }: Props) {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      {/* <Projects /> */}
      <About />
    </>
  );
}
