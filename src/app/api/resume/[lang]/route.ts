import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

const VALID_LANGS = ["pt", "en"];

function htmlFallback(message: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>Resume</title></head><body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;color:#444"><div style="text-align:center"><h1 style="font-weight:500">${message}</h1><p><a href="/" style="color:#444">Back to portfolio</a></p></div></body></html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!VALID_LANGS.includes(lang)) {
    return htmlFallback("Invalid language");
  }

  const filename = `CAUE-SOUZA-RESUME-${lang.toUpperCase()}.pdf`;
  const pathname = `resume/${filename}`;

  try {
    const { blobs } = await list({ prefix: pathname });

    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    )[0];

    if (!latest) {
      return htmlFallback("Resume not uploaded yet");
    }

    const downloadFilename = `CAUE-SOUZA-RESUME-${lang.toUpperCase()}.pdf`;
    return NextResponse.redirect(latest.url, {
      headers: {
        "Content-Disposition": `attachment; filename="${downloadFilename}"`,
      },
    });
  } catch (error) {
    console.error("Resume route error:", error);
    return htmlFallback("Resume service unavailable");
  }
}
