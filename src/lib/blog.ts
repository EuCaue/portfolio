import { type Post, parseRss } from "./rss";

// Override with BLOG_URL to preview against a local blog (drafts show up in its dev feed).
export const BLOG_URL = process.env.BLOG_URL ?? "https://blog.eucaue.online";

// Latest posts for the page, fetched at build time and refreshed once a day.
// Any failure means no section, never a broken page.
export async function getLatestPosts(locale: string, limit = 3): Promise<Post[]> {
  const feed = locale === "pt-br" ? "/pt-BR/rss.xml" : "/rss.xml";
  try {
    const res = await fetch(`${BLOG_URL}${feed}`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    return parseRss(await res.text()).slice(0, limit);
  } catch {
    return [];
  }
}
