import React from 'react';

import { ArrowDown, LinkArrow } from './styled';

interface Props {
  section: string;
}

export default function ScrollDown({ section }: Props) {
  return (
    <LinkArrow href={section}>
      <ArrowDown />
    </LinkArrow>
  );
}
