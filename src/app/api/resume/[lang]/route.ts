import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: { lang: string } }) {
  const { lang } = params;

  if (lang !== "pt" && lang !== "en") {
    return NextResponse.json({ error: "lang must be 'pt' or 'en'" }, { status: 400 });
  }

  const filename = `CAUE-SOUZA-RESUME-${lang.toUpperCase()}.pdf`;
  const { blobs } = await list({ prefix: `resume/${filename}` });

  const latest = blobs.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  )[0];

  if (!latest) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.redirect(latest.url);
}
