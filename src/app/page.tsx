import Intro from "@/components/intro"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

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
  )
}

