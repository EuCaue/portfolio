import About from '@/components/About';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import { getScopedI18n } from '@/locales/server';

export default async function Page() {
  const scopedT = await getScopedI18n('header');

  return (
    <>
      <Header />

      <Hero
        key={scopedT('sections.0').toLowerCase()}
        id={scopedT('sections.0').toLowerCase()}
      >
        {/*  TODO: see how make client components work here  */}
        <Intro key="1" />
      </Hero>
      <Hero
        key={scopedT('sections.1').toLowerCase()}
        id={scopedT('sections.1').toLowerCase()}
      >
        <About key="2" />
      </Hero>

      <Hero
        key={scopedT('sections.2').toLowerCase()}
        id={scopedT('sections.2').toLowerCase()}
      >
        <Projects key="3" />
      </Hero>

      <Hero
        key={scopedT('sections.3').toLowerCase()}
        id={scopedT('sections.3').toLowerCase()}
      >
        <Contact key="4" />
      </Hero>
    </>
  );
}
