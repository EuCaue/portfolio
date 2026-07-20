import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "pt-br"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let locale: string = DEFAULT_LOCALE;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const accept = request.headers.get("accept-language") || "";
    if (accept.toLowerCase().includes("pt")) {
      locale = "pt-br";
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ["/"],
};
