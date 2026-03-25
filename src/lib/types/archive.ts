import type { Cluster } from './cluster';
import type { Interpretation } from './interpretation';
import type { ReturnBundle } from './output';

export interface ArchiveEntry {
  id: string;
  timestamp: string;
  inputSummary: string;
  clusters: Cluster[];
  interpretation: Interpretation;
  returns: ReturnBundle;
  threads: string[];
  contradictions: string[];
  salience: number;
}

export interface MotifIndexRecord {
  motif: string;
  count: number;
  threads: string[];
  lastSeenAt: string;
}
