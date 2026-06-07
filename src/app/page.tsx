import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Intro from "@/components/sections/intro";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Intro />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
