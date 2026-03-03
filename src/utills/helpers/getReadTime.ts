/** Estimate read time from content (~200 words per minute). */
export function getReadTime(content: string): string {
  const words = content?.split(/\s+/).filter(Boolean).length ?? 0;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}
