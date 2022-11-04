import React from 'react';

import Header from '../../components/Header';

interface Props {
  toggleTheme: () => void;
}

export default function Portfolio({ toggleTheme }: Props) {
  return <Header toggleTheme={toggleTheme} />;
}
