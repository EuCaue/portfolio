'use client';
import { motion } from 'framer-motion';
import TypeWriterIntro from './TypeWriterIntro';
import { useI18n, useScopedI18n } from '@/locales/client';

export default function Intro() {
  const t = useI18n();
  const scopedT = useScopedI18n('intro');

  return (
    <motion.div
      className="max-w-md flex items-center justify-center flex-col"
      initial={{ opacity: 0, y: -80, x: -40 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <TypeWriterIntro />
      <p className="text-2xl py-6 leading-tight">
        {scopedT('introduction')}{' '}
        <span className="underline capitalize">{scopedT('occupation')} </span>
        {scopedT('occupationDescription')}
      </p>
      <a
        href={`#${t('header.sections.1').toLowerCase()}`}
        title={scopedT('getStartedButtonTitle')}
        aria-label={scopedT('getStartedButtonTitle')}
        className="btn btn-primary hover:scale-110 transition-all duration-200 animate-bounce"
      >
        {scopedT('getStartedButton')}
      </a>
    </motion.div>
  );
}
