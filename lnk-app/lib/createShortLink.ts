import { formatShortLink } from './formatShortUrl';
import { getShortUrl } from './getShortUrl';

function validateLongUrl(longUrl: string): boolean {
  return !!longUrl.match(/http[s]{0,1}:\/\/.*\..+/);
}

export async function createShortLink(longUrl: string): Promise<string> {
  if (!validateLongUrl(longUrl)) {
    throw new Error('URL must have format http(s)://site.com');
  }

  const response = await fetch('http://localhost:4000/api/urls', {
    method: 'POST',
    body: JSON.stringify({
      long_url: longUrl,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.status === 409) {
    return getShortUrl(longUrl);
  }

  if (response.status === 400) {
    throw new Error(data.message);
  }

  if (response.status !== 201) {
    throw new Error('Could not shorten URL');
  }

  return formatShortLink(data.path_slug);
}
