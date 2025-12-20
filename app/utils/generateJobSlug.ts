export function generateJobSlug(title: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9آ-ی\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return `${cleanTitle}`;
}