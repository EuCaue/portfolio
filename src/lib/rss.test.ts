import { expect, test } from "bun:test";
import { parseRss } from "./rss";

const FEED = `<?xml version="1.0"?><rss version="2.0"><channel><title>blog</title>
<item><title>first post, let&apos;s see how this goes</title><link>https://blog.eucaue.online/hello-world/</link>
<description><![CDATA[setting up a blog: the stack & the why]]></description><pubDate>Tue, 11 Aug 2026 00:00:00 GMT</pubDate></item>
<item><title>Flexa</title><link>https://blog.eucaue.online/pt-BR/why-flexa/</link><description>cursores &amp; temas</description><pubDate>Fri, 04 Sep 2026 00:00:00 GMT</pubDate></item>
<item><title>broken</title></item>
</channel></rss>`;

test("parseRss reads items newest first, decodes entities and CDATA, skips incomplete items", () => {
  expect(parseRss(FEED)).toEqual([
    {
      title: "Flexa",
      link: "https://blog.eucaue.online/pt-BR/why-flexa/",
      description: "cursores & temas",
      date: "2026-09-04T00:00:00.000Z",
    },
    {
      title: "first post, let's see how this goes",
      link: "https://blog.eucaue.online/hello-world/",
      description: "setting up a blog: the stack & the why",
      date: "2026-08-11T00:00:00.000Z",
    },
  ]);
});

test("parseRss returns an empty list for an empty or invalid feed", () => {
  expect(parseRss("<rss><channel></channel></rss>")).toEqual([]);
  expect(parseRss("not xml")).toEqual([]);
});
