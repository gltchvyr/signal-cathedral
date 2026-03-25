export function splitLines(input: string): string[] {
  return input
    .split('\n')
    .map((line) => line.replace('\r', '').trim())
    .filter(Boolean);
}
