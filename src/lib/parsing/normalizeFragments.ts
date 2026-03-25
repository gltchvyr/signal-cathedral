import type { Fragment, SourceType } from '@/lib/types/input';
import { splitLines } from './splitLines';

function createFragmentId(index: number): string {
  return `fragment-${index + 1}`;
}

export function normalizeFragments(rawInput: string, sourceType: SourceType): Fragment[] {
  return splitLines(rawInput).map((text, index) => ({
    id: createFragmentId(index),
    text,
    sourceType,
    tags: [],
  }));
}
