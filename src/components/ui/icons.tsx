import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** gridicons:cross */
export const CrossIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.36 19.78 12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true" {...props}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const HamburgerIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 24" width="20" height="24" fill="currentColor" aria-hidden="true" {...props}>
    <rect y="5" width="20" height="2" />
    <rect y="11" width="20" height="2" />
    <rect y="17" width="20" height="2" />
  </svg>
);

export const CartIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <path d="M2 3h3l2.4 11.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" />
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
  </svg>
);

export const ExternalIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <rect x="3" y="7" width="14" height="14" />
    <path d="M10 3h11v11" />
  </svg>
);

export const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
