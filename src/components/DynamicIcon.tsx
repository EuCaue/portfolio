'use client';

import { TablerIconsProps } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

export default function DynamicIcon({
  name,
  ICON_SIZE
}: {
  name: string;
  ICON_SIZE: number;
}) {
  const [Icon, setIcon] = useState<React.FC<TablerIconsProps> | null>(null);

  useEffect(() => {
    const importIcon = async () => {
      const iconModule = await import('@tabler/icons-react');
      const selectedIcon: (props: TablerIconsProps) => JSX.Element =
        //  FIX: fix this type later
        // @ts-ignore
        iconModule[`IconBrand${name}`];
      setIcon(selectedIcon);
      // console.log('ICON', selectedIcon);
    };
    importIcon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Icon) {
    return <></>;
  }
  return (
    <Icon
      size={ICON_SIZE}
      aria-hidden
    />
  );
}
