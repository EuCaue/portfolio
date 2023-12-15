'use client';

import { TablerIconsProps } from '@tabler/icons-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';

type PropType = {
  name: string;
  ICON_SIZE: number;
};

export default function DynamicIcon({ name, ICON_SIZE }: PropType) {
  const [Icon, setIcon] = useState<React.FC<TablerIconsProps> | null>(null);
  let foundIcon = useRef<boolean>(false);

  const setSelectedIcon = useCallback((icon: string, iconModule: any) => {
    const selectedIcon: (props: TablerIconsProps) => JSX.Element =
      //  FIX: fix this type later @ts-ignore
      iconModule[`${icon}`];
    setIcon(selectedIcon);
  }, []);

  useEffect(() => {
    const importIcon = async () => {
      const iconModule = await import('@tabler/icons-react');
      for (const icon in iconModule) {
        if (icon.toLowerCase().includes(name.toLowerCase())) {
          setSelectedIcon(icon, iconModule);
          foundIcon.current = true;
          break;
        }
      }
      if (name === 'tailwindcss' && foundIcon.current === false) {
        setIcon(iconModule.IconBrandTailwind);
        return;
      }

      if (foundIcon.current === false) {
        setIcon(iconModule.IconIconsOff);
        return;
      }
    };
    importIcon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Icon) {
    return <div className="skeleton w-[30px] h-[30px] bg-base-content"></div>;
  }

  return (
    <Icon
      size={ICON_SIZE}
      aria-hidden
    />
  );
}
