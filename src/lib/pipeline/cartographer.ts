import type { Cluster, ClusterResult } from '@/lib/types/cluster';
import type { InputBundle, Fragment } from '@/lib/types/input';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'the',
  'of',
  'to',
  'for',
  'in',
  'on',
  'with',
  'by',
  'from',
  'is',
  'are',
  'or',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function overlapScore(a: Fragment, b: Fragment): number {
  const aTokens = new Set(tokenize(a.text));
  const bTokens = new Set(tokenize(b.text));

  let overlap = 0;

  for (const token of aTokens) {
    if (bTokens.has(token)) {
      overlap += 1;
    }
  }

  return overlap;
}

function clusterNameFromFragments(fragments: Fragment[]): string {
  const counts = new Map<string, number>();

  for (const fragment of fragments) {
    for (const token of tokenize(fragment.text)) {
      counts.set(token, (counts.get(token) ?? 0) + 1);
    }
  }

  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([token]) => token);

  return ranked.length > 0 ? ranked.join(' / ') : 'constellation';
}

function createCluster(id: string, fragments: Fragment[]): Cluster {
  return {
    id,
    name: clusterNameFromFragments(fragments),
    fragments,
    confidence: Math.min(1, 0.5 + fragments.length * 0.1),
  };
}

export function cartographer(input: InputBundle): ClusterResult {
  const working = [...input.fragments];
  const clusters: Cluster[] = [];
  let clusterIndex = 1;

  while (working.length > 0) {
    const seed = working.shift();

    if (!seed) {
      break;
    }

    const grouped: Fragment[] = [seed];
    const remaining: Fragment[] = [];

    for (const fragment of working) {
      if (overlapScore(seed, fragment) > 0) {
        grouped.push(fragment);
      } else {
        remaining.push(fragment);
      }
    }

    working.splice(0, working.length, ...remaining);
    clusters.push(createCluster(`cluster-${clusterIndex}`, grouped));
    clusterIndex += 1;
  }

  const limited = clusters.slice(0, 4);

  return {
    clusters: limited,
  };
}
