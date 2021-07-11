export async function getLongUrl(path: string): Promise<string> {
  const url = `http://localhost:4000/api/urls/path/${path}`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error('Could not find URL for path');
  }

  if (response.status !== 200) {
    throw new Error('Failed to fetch URL');
  }

  const data = await response.json();

  return data.long_url;
}
