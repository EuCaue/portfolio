'use client';
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n
} from '@/locales/client';
import { IconLanguage } from '@tabler/icons-react';

export default function ToggleLanguage() {
  const changeLocalte = useChangeLocale();
  const scopedT = useScopedI18n('header');
  const currentLocale = useCurrentLocale();

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={scopedT('titleToggleLanguage')}
    >
      <label className="swap swap-flip hover:scale-125 hover:text-primary">
        <input type="checkbox" />

        <div
          className={`indicator ${
            currentLocale === 'en' ? 'swap-on' : 'swap-off'
          }`}
          role="button"
          onClick={() => {
            changeLocalte('en');
          }}
        >
          <span className="indicator-item badge">PT-BR</span>
          <IconLanguage className="w-10 h-10" />
        </div>

        <div
          className={`indicator ${
            currentLocale === 'br' ? 'swap-on' : 'swap-off'
          }`}
          role="button"
          onClick={() => changeLocalte('br')}
        >
          <span className="indicator-item badge">EN-US</span>
          <IconLanguage className="w-10 h-10" />
        </div>
      </label>
    </div>
  );
}
