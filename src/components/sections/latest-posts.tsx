"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Post } from "@/lib/rss";

export default function LatestPosts({ posts, blogUrl }: { posts: Post[]; blogUrl: string }) {
  const { t, language } = useLanguage();
  if (posts.length === 0) return null;
  // Feed dates are midnight UTC; formatting in UTC keeps server and browser on the same day.
  const date = new Intl.DateTimeFormat(language, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section id="writing" aria-labelledby="writing-title" className="border-t py-20 md:py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="writing-title" className="text-3xl font-semibold tracking-[-0.03em]">
            {t("posts.title")}
          </h2>
          <a
            href={blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("posts.all")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-8 divide-y border-y">
          {posts.map((post) => (
            <li key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
                  {date.format(new Date(post.date))}
                </time>
                <span className="min-w-0">
                  <span className="font-medium underline-offset-4 group-hover:underline">
                    {post.title}
                  </span>
                  {post.description && (
                    <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">
                      {post.description}
                    </span>
                  )}
                </span>
                <ArrowUpRight
                  className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none sm:block"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
