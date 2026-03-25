import type { ArchiveEntry } from '@/lib/types/archive';
import type { OutputBundle } from '@/lib/types/output';

const STORAGE_KEY = 'signal-cathedral.archive';

function createArchiveId(timestamp: string): string {
  return `entry-${timestamp.replaceAll(':', '-').replaceAll('.', '-')}`;
}

export function outputToArchiveEntry(output: OutputBundle): ArchiveEntry {
  return {
    id: createArchiveId(output.input.timestamp),
    timestamp: output.input.timestamp,
    inputSummary: output.input.inputSummary ?? 'unsummarized offering',
    clusters: output.clusters,
    interpretation: output.interpretation,
    returns: output.returns,
    threads: output.interpretation.supportingThreads ?? [],
    contradictions: [],
    salience: Math.min(1, 0.35 + output.interpretation.motifs.length * 0.1 + output.clusters.length * 0.08),
  };
}

export function readArchive(): ArchiveEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as ArchiveEntry[];
  } catch {
    return [];
  }
}

export function writeArchive(entries: ArchiveEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function appendArchiveEntry(entry: ArchiveEntry): ArchiveEntry[] {
  const current = readArchive();
  const next = [entry, ...current];
  writeArchive(next);
  return next;
}
