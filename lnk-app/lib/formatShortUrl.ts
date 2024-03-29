export function formatShortLink(path: string): string {
  return process.env.NODE_ENV === 'production'
    ? `https://lnk.samwhunter.com/${path}`
    : `http://localhost:8080/${path}`;
}
