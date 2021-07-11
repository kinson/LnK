function validateLongUrl(long_url: string): boolean {
  return !!long_url.match(/http[s]{0,1}:\/\/.*\..+/);
}

export async function createShortLink(long_url: string): Promise<string> {
  if (!validateLongUrl(long_url)) {
    throw new Error("URL must have format http(s)://site.com");
  }

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

  if ([400, 409].includes(response.status)) {
    throw new Error(data.message);
  }

  if (response.status !== 201) {
    throw new Error("Could not shorten URL");
  }

  return formatShortLink(data.path_slug);
}

function formatShortLink(path: string) {
  return process.env.NODE_ENV === "production"
    ? `https://lnk.com/${path}`
    : `http://localhost:8080/${path}`;
}
