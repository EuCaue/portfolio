import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Intro from "@/components/sections/intro";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Intro />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
