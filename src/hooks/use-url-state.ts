"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { historyAction, parseUrlState, type UrlState, writeUrlState } from "@/lib/url-state";

// Whether the open dialog added its own history entry. Shared by every caller, so a dialog
// opened from the navbar can still be closed with history.back() by the dialog itself.
let pushedOverlay = false;

// Writes go through the History API: instant, no server round trip, and Next keeps
// useSearchParams in sync. Opening a dialog pushes an entry, so Back closes it.
export function updateUrlState(patch: Partial<UrlState>) {
  const search = new URLSearchParams(window.location.search);
  const action = historyAction(parseUrlState(search), patch, pushedOverlay);
  if (action === "back") {
    pushedOverlay = false;
    window.history.back();
    return;
  }
  const url = `${window.location.pathname}${writeUrlState(search, patch)}${window.location.hash}`;
  if (action === "push") {
    pushedOverlay = true;
    window.history.pushState(null, "", url);
  } else {
    window.history.replaceState(null, "", url);
  }
}

// Filters and open dialogs live in the query string, so every view can be linked and restored.
export function useUrlState() {
  const params = useSearchParams();
  usePathname();
  const state = useMemo(() => parseUrlState(new URLSearchParams(params.toString())), [params]);

  useEffect(() => {
    if (!state.project && !state.resume) pushedOverlay = false;
  }, [state.project, state.resume]);

  return [state, updateUrlState] as const;
}
