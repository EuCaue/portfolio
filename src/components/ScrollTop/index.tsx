import React, { useEffect, useState } from 'react';
import { ArrowUp, LinkTop } from './styled';

export default function ScrollTop() {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = (): void => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect((): (() => void) => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (scrollPosition >= 699) setShowButton(true);
    else setShowButton(false);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <LinkTop
      href="#welcome"
      style={{ visibility: showButton ? 'visible' : 'hidden' }}
    >
      {' '}
      <ArrowUp style={{ visibility: showButton ? 'visible' : 'hidden' }} />{' '}
    </LinkTop>
  );
}
