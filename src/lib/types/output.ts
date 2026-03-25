import type { Cluster } from './cluster';
import type { InputBundle } from './input';
import type { Interpretation } from './interpretation';

export interface ReturnBundle {
  reading: string;
  ritual: string;
  prompt: string;
  loreFragment?: string;
  memoryNote?: string;
}

export interface OutputBundle {
  input: InputBundle;
  clusters: Cluster[];
  interpretation: Interpretation;
  returns: ReturnBundle;
}
