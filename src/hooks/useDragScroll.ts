import { useEffect, type RefObject } from 'react';

const DRAG_THRESHOLD = 5; // px before a press counts as a drag, not a click

/** Click-and-drag horizontal scrolling for mouse users (touch and trackpads scroll natively) */
export function useDragScroll(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startLeft = 0;
    let dragged = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      dragged = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!dragged) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragged = true;
        el.setPointerCapture(e.pointerId);
        el.dataset.dragging = 'true';
      }
      el.scrollLeft = startLeft - dx;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      delete el.dataset.dragging;
    };

    // A drag that ends over a button must not also click it
    const onClick = (e: MouseEvent) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    };

    // No native image drag (ghost image)
    const onDragStart = (e: DragEvent) => e.preventDefault();

    const listeners = [
      ['pointerdown', onPointerDown],
      ['pointermove', onPointerMove],
      ['pointerup', onPointerUp],
      ['pointercancel', onPointerUp],
      ['click', onClick],
      ['dragstart', onDragStart],
    ] as [string, EventListener][];
    for (const [type, fn] of listeners) el.addEventListener(type, fn, true);
    return () => {
      for (const [type, fn] of listeners) el.removeEventListener(type, fn, true);
    };
  }, [ref]);
}
