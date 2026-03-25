import { deriveInputSummary } from '@/lib/parsing/deriveInputSummary';
import { normalizeFragments } from '@/lib/parsing/normalizeFragments';
import type { InputBundle, SourceType } from '@/lib/types/input';

export interface WatcherInput {
  rawInput: string;
  sourceType: SourceType;
  userTags?: string[];
  contextNote?: string;
}

function createBundleId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `bundle-${Date.now()}`;
}

export function watcher(input: WatcherInput): InputBundle {
  const fragments = normalizeFragments(input.rawInput, input.sourceType);

  return {
    id: createBundleId(),
    timestamp: new Date().toISOString(),
    sourceType: input.sourceType,
    fragments,
    userTags: input.userTags ?? [],
    contextNote: input.contextNote,
    inputSummary: deriveInputSummary(fragments, input.sourceType),
  };
}
