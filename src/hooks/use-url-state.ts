"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { parseUrlState, type UrlState, writeUrlState } from "@/lib/url-state";

// Filters and the open project live in the query string, so every view can be linked and restored.
export function useUrlState() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state = useMemo(() => parseUrlState(new URLSearchParams(params.toString())), [params]);

  const set = useCallback(
    (patch: Partial<UrlState>) => {
      const next = writeUrlState(new URLSearchParams(window.location.search), patch);
      router.replace(`${pathname}${next}`, { scroll: false });
    },
    [pathname, router],
  );

  return [state, set] as const;
}
