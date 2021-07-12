import { formatShortLink } from './formatShortUrl';

export async function getShortUrl(longUrl: string): Promise<string> {
  const url = `http://localhost:4000/api/urls/long_url/${encodeURIComponent(
    longUrl
  )}`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error('Could not find short URL');
  }

  if (response.status !== 200) {
    throw new Error('Failed to fetch URL');
  }

  const data = await response.json();

  return formatShortLink(data.path_slug);
}
