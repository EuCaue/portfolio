import { getI18n, getScopedI18n } from '../locales/server';
export default async function About() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('about');

  return (
    <div className="flex flex-col items-center justify-center prose md:prose-md">
      <span className="text-3xl lg:text-4xl whitespace-pre-line leading-relaxed">
        <p className="text-4xl">
          {scopedT('greeting')}
          <span className="text-success dark:text-info">Cauê Souza.</span>
        </p>
        {scopedT('introduction')}{' '}
        <span className="text-base-content">{scopedT('occupation')}</span>{' '}
        {scopedT('from')}{' '}
        <span className="text-green-400">{scopedT('country.0')}</span>
        <span className="text-yellow-300">{scopedT('country.1')}</span>
        <span className="text-blue-400">{scopedT('country.2')}</span>
        <span className="text-green-400">{scopedT('country.3')}</span>
        <span className="text-yellow-300">{scopedT('country.4')}</span>
        <span className="text-blue-400">{scopedT('country.5')}</span>{' '}
        {scopedT('interests')}{' '}
        <span className="text-base-content">{scopedT('projects')}</span>{' '}
        {scopedT('collaboration')}{' '}
      </span>
      <a
        href={`#${t('header.sections.2').toLowerCase()}`}
        title={scopedT('projectsButtonTitle')}
        aria-label={scopedT('projectsButtonTitle')}
        className="cursor-pointer text-sm hover:scale-125 transition-all duration-75 ease-in mt-2"
      >
        {scopedT('projectsButton')}
      </a>
    </div>
  );
}
