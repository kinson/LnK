function validateLongUrl(long_url: string): boolean {
  return true;
}

export async function createShortLink(long_url: string): Promise<string> {
  if (!validateLongUrl(long_url)) {
    throw new Error("URL must have format http(s)://website.com");
  }

  try {
    const response = await fetch("http://localhost:4000/api/urls", {
      method: "POST",
      body: JSON.stringify({
        long_url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return formatShortLink(data.path_slug);
  } catch (err) {
    console.log("failed to get it", err);
    throw new Error('Error');
  }
}

function formatShortLink(path: string) {
  return process.env.NODE_ENV === 'production' ? `https://lnk.com/${path}` : `http://localhost:8080/${path}`;
}
