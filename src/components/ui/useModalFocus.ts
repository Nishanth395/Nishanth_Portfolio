"use client";

import { useEffect, type RefObject } from "react";

export function useModalFocus(
  open: boolean,
  onClose: () => void,
  dialog: RefObject<HTMLDivElement | null>,
  initialFocus: RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    initialFocus.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [open, onClose, dialog, initialFocus]);
}
