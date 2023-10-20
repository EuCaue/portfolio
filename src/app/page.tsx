import About from '@/components/About';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';

export default function Home() {
  return (
    <>
      <Header />

      <Hero
        key="home"
        id="home"
      >
        <Intro key="1" />
      </Hero>
      <Hero
        key="2"
        id="about"
      >
        <About key="2" />
      </Hero>
      <Hero
        key="3"
        id="projects"
      >
        <Intro key="3" />
      </Hero>
    </>
  );
}
