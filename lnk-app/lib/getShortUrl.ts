import { formatShortLink } from './formatShortUrl';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://lnk-api.samwhunter.com'
    : 'http://localhost:4000';

export async function getShortUrl(longUrl: string): Promise<string> {
  const url = `${baseUrl}/api/urls/long_url/${encodeURIComponent(longUrl)}`;
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
