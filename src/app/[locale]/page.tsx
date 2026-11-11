import { Suspense } from "react";
import { ResumeDialog } from "@/components/portfolio/resume-dialog";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Intro from "@/components/sections/intro";
import LatestPosts from "@/components/sections/latest-posts";
import Projects from "@/components/sections/projects";
import { BLOG_URL, getLatestPosts } from "@/lib/blog";

// Rebuild hourly so a new blog post shows up without a deploy.
// The blog feed itself is cached by this same TTL, so both must match.
export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getLatestPosts(locale);
  const blogUrl = locale === "pt-br" ? `${BLOG_URL}/pt-BR/` : `${BLOG_URL}/`;

  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Intro />
        <Projects />
        <About />
        <LatestPosts posts={posts} blogUrl={blogUrl} />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ResumeDialog />
      </Suspense>
    </>
  );
}
