import type { Fragment, SourceType } from '@/lib/types/input';

function labelForSourceType(sourceType: SourceType): string {
  switch (sourceType) {
    case 'tab_constellation':
      return 'tab constellation';
    case 'notes':
      return 'notes';
    case 'symbols':
      return 'symbol set';
    case 'moods':
      return 'mood trace';
    case 'project_fragments':
      return 'project fragments';
    default:
      return 'offering';
  }
}

export function deriveInputSummary(fragments: Fragment[], sourceType: SourceType): string {
  if (fragments.length === 0) {
    return `empty ${labelForSourceType(sourceType)}`;
  }

  const preview = fragments
    .slice(0, 3)
    .map((fragment) => fragment.text)
    .join(', ');

  const suffix = fragments.length > 3 ? '...' : '';

  return `${labelForSourceType(sourceType)}: ${preview}${suffix}`;
}
