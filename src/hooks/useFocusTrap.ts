import { useCallback, useEffect, type KeyboardEvent, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** While active: focuses the dialog, keeps Tab inside it, and returns focus to the trigger afterwards */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): (e: KeyboardEvent) => void {
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    ref.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [ref, active]);

  return useCallback(
    (e: KeyboardEvent) => {
      const panel = ref.current;
      if (e.key !== 'Tab' || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [ref],
  );
}
