import { useEffect, useState, type RefObject } from 'react';

/**
 * True once the element is fully visible (threshold 1) and has risen past the bottom 20% of the viewport,
 * so an intro animation starts where the reader is looking. Fires once, then stops observing.
 */
export function useInView(ref: RefObject<Element | null>, threshold = 1, rootMargin = '0px 0px -20% 0px'): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
