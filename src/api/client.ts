/** Re-fetch at most once an hour (ISR) */
const REVALIDATE_SECONDS = 3600;

function baseUrl(): string {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error('API_BASE_URL is not set — copy .env.example to .env.local (or add it in Vercel)');
  return url.replace(/\/+$/, '');
}

/**
 * Server-only GET. Throws on failure on purpose: at build time the build fails
 * loudly, and during revalidation Next.js keeps serving the last good page
 * instead of caching an empty one.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return (await res.json()) as T;
}
