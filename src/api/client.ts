import 'server-only'; // build error if a Client Component imports the API layer

const REVALIDATE_SECONDS = 3600; // ISR: re-fetch at most once an hour

function baseUrl(): string {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error('API_BASE_URL is not defined');
  return url.replace(/\/+$/, '');
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return (await res.json()) as T;
}
