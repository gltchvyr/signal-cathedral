import type { Interpretation } from '@/lib/types/interpretation';
import type { ReturnBundle } from '@/lib/types/output';

function motifPhrase(motifs: string[]): string {
  if (motifs.length === 0) {
    return 'an unresolved field of signal';
  }

  if (motifs.length === 1) {
    return motifs[0];
  }

  if (motifs.length === 2) {
    return `${motifs[0]} and ${motifs[1]}`;
  }

  return `${motifs.slice(0, -1).join(', ')}, and ${motifs[motifs.length - 1]}`;
}

function buildReading(interpretation: Interpretation): string {
  const motifs = motifPhrase(interpretation.motifs);

  return `This pathway is shaped by ${motifs}. Its center of gravity is ${interpretation.centralTension}, suggesting a constellation that wants to become more legible without losing its charge. ${interpretation.plainMeaning}`;
}

function buildRitual(interpretation: Interpretation): string {
  const primary = interpretation.motifs[0] ?? 'signal';
  const secondary = interpretation.motifs[1] ?? 'pattern';

  return `Choose one small act today that lets ${primary} meet ${secondary} in visible form. Name it, make it tangible, and notice what changes when it is given structure.`;
}

function buildPrompt(interpretation: Interpretation): string {
  return `Create a fragment, note, sketch, or interface element inspired by ${interpretation.pathwayName}. Let the tension of ${interpretation.centralTension} remain visible in the result.`;
}

function buildLoreFragment(interpretation: Interpretation): string {
  const primary = interpretation.motifs[0] ?? 'signal';
  const secondary = interpretation.motifs[1] ?? 'pattern';

  return `In the western transept, ${primary} gathers along a hidden lattice until ${secondary} can be seen by oblique light. Offerings brought there do not become simpler. They become legible in a softer, more dangerous way.`;
}

function buildMemoryNote(interpretation: Interpretation): string {
  return `Archive this pathway if ${interpretation.motifs[0] ?? 'the current signal'} feels recurring, unusually charged, or structurally important to an ongoing thread.`;
}

export function narrator(interpretation: Interpretation): ReturnBundle {
  return {
    reading: buildReading(interpretation),
    ritual: buildRitual(interpretation),
    prompt: buildPrompt(interpretation),
    loreFragment: buildLoreFragment(interpretation),
    memoryNote: buildMemoryNote(interpretation),
  };
}
