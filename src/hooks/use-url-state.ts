"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { historyAction, parseUrlState, type UrlState, writeUrlState } from "@/lib/url-state";

// Filters and the open project live in the query string, so every view can be linked and restored.
// Writes go through the History API: instant, no server round trip, and Next keeps
// useSearchParams in sync. Opening a project pushes an entry, so Back closes the dialog.
export function useUrlState() {
  const params = useSearchParams();
  const pathname = usePathname();
  const pushed = useRef(false);

  const state = useMemo(() => parseUrlState(new URLSearchParams(params.toString())), [params]);

  useEffect(() => {
    if (!state.project) pushed.current = false;
  }, [state.project]);

  const set = useCallback(
    (patch: Partial<UrlState>) => {
      const search = new URLSearchParams(window.location.search);
      const action = historyAction(parseUrlState(search), patch, pushed.current);
      if (action === "back") {
        pushed.current = false;
        window.history.back();
        return;
      }
      const url = `${pathname}${writeUrlState(search, patch)}${window.location.hash}`;
      if (action === "push") {
        pushed.current = true;
        window.history.pushState(null, "", url);
      } else {
        window.history.replaceState(null, "", url);
      }
    },
    [pathname],
  );

  return [state, set] as const;
}
