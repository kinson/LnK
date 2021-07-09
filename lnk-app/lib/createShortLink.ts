function validateLongUrl(long_url: string): boolean {
  return true;
}

export async function createShortLink(long_url: string) {
  console.log("i am here", long_url);
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

    console.log("got response", response);

    return response;
  } catch (err) {
    console.log("failed to get it", err);
    return;
  }
}
