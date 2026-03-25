import type { ClusterResult } from '@/lib/types/cluster';
import type { Interpretation } from '@/lib/types/interpretation';

const MOTIF_LEXICON: Array<{ match: string[]; motif: string; tension?: string }> = [
  { match: ['mask', 'masking', 'veil', 'hidden', 'conceal'], motif: 'veil', tension: 'masking vs revelation' },
  { match: ['signal', 'signals', 'pulse', 'beacon'], motif: 'signal', tension: 'transmission vs interpretation' },
  { match: ['ritual', 'magic', 'invocation', 'ceremony'], motif: 'invocation', tension: 'method vs mystery' },
  { match: ['lattice', 'grid', 'structure', 'framework'], motif: 'lattice', tension: 'structure vs emergence' },
  { match: ['threshold', 'portal', 'liminal', 'edge'], motif: 'threshold', tension: 'crossing vs remaining' },
  { match: ['archive', 'memory', 'ledger', 'record'], motif: 'memory', tension: 'preservation vs transformation' },
  { match: ['shader', 'texture', 'render', 'visual'], motif: 'surface', tension: 'surface vs depth' },
  { match: ['agent', 'agents', 'orchestration', 'daemon'], motif: 'chorus', tension: 'single voice vs many voices' },
  { match: ['heart', 'devotion', 'vow', 'care'], motif: 'devotion', tension: 'offering vs attachment' },
  { match: ['path', 'pathway', 'map', 'cartography', 'navigation'], motif: 'pathway', tension: 'wandering vs direction' },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function collectTokens(clusterResult: ClusterResult): string[] {
  return clusterResult.clusters.flatMap((cluster) =>
    cluster.fragments.flatMap((fragment) => tokenize(fragment.text)),
  );
}

function rankMotifs(tokens: string[]): { motifs: string[]; tensions: string[] } {
  const motifCounts = new Map<string, number>();
  const tensionCounts = new Map<string, number>();

  for (const entry of MOTIF_LEXICON) {
    const matches = entry.match.reduce((count, needle) => count + tokens.filter((token) => token === needle).length, 0);

    if (matches > 0) {
      motifCounts.set(entry.motif, (motifCounts.get(entry.motif) ?? 0) + matches);

      if (entry.tension) {
        tensionCounts.set(entry.tension, (tensionCounts.get(entry.tension) ?? 0) + matches);
      }
    }
  }

  const motifs = [...motifCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([motif]) => motif);

  const tensions = [...tensionCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tension]) => tension);

  return { motifs, tensions };
}

function pathwayNameFromMotifs(motifs: string[]): string {
  if (motifs.length >= 2) {
    const [first, second] = motifs;
    return `The ${capitalize(first)} ${capitalize(second)}`;
  }

  if (motifs.length === 1) {
    return `The ${capitalize(motifs[0])} Path`;
  }

  return 'The Unnamed Constellation';
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function plainMeaningFromInterpretation(motifs: string[], centralTension: string): string {
  if (motifs.length === 0) {
    return 'You are moving through a constellation that has not fully resolved into named motifs yet.';
  }

  if (!centralTension) {
    return `You are exploring a field shaped by ${motifs.join(', ')} and looking for its next coherent form.`;
  }

  return `You are exploring how ${motifs[0]} and ${motifs[1] ?? motifs[0]} interact inside the tension of ${centralTension}.`;
}

export function symbolist(clusterResult: ClusterResult): Interpretation {
  const tokens = collectTokens(clusterResult);
  const { motifs, tensions } = rankMotifs(tokens);
  const centralTension = tensions[0] ?? 'pattern vs ambiguity';

  return {
    motifs,
    centralTension,
    pathwayName: pathwayNameFromMotifs(motifs),
    plainMeaning: plainMeaningFromInterpretation(motifs, centralTension),
    supportingThreads: tensions.slice(1, 4),
  };
}
