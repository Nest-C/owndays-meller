// Static image imports give next/image the file's width/height; committed so `tsc` works before next-env.d.ts exists
declare module '*.jpg' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}
