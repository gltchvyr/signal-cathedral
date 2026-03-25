import type { Fragment } from './input';

export interface Cluster {
  id: string;
  name: string;
  fragments: Fragment[];
  confidence?: number;
}

export interface ClusterResult {
  clusters: Cluster[];
}
