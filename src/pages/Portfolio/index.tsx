import React from 'react';

import Header from '../../components/Header';
import Projects from '../../components/Projects';

interface Props {
  toggleTheme: () => void;
}

export default function Portfolio({ toggleTheme }: Props) {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <Projects />
    </>
  );
}
