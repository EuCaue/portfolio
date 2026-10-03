"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { forwardRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { updateUrlState } from "@/hooks/use-url-state";

// A link to the PDF that opens the in-page preview instead. Without JavaScript, or with a
// modifier key (new tab, save link), it still behaves like the plain PDF link.
export const ResumeLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function ResumeLink({ onClick, ...props }, ref) {
    const { t } = useLanguage();
    const open = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      updateUrlState({ resume: "open" });
    };
    return (
      <a ref={ref} href={t("nav.resumeUrl")} aria-haspopup="dialog" onClick={open} {...props} />
    );
  },
);
