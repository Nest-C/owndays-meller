// SVGR (next.config.ts) turns each .svg import into a component; committed so `tsc` works before next-env.d.ts exists
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}
