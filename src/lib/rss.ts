export type Post = { title: string; link: string; description: string; date: string };

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

const decode = (text: string) =>
  text
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&(#\d+|amp|lt|gt|quot|apos);/g, (_, e: string) =>
      e.startsWith("#") ? String.fromCharCode(Number(e.slice(1))) : ENTITIES[e],
    )
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1].trim()) : "";
};

// Reads the blog's RSS 2.0 feed. Items missing a title, link or date are skipped.
export function parseRss(xml: string): Post[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((item) => {
      const time = Date.parse(tag(item, "pubDate"));
      return {
        title: tag(item, "title"),
        link: tag(item, "link"),
        description: tag(item, "description"),
        date: Number.isNaN(time) ? "" : new Date(time).toISOString(),
      };
    })
    .filter((p) => p.title && p.link && p.date)
    .sort((a, b) => b.date.localeCompare(a.date));
}
