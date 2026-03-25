import { cartographer } from '@/lib/pipeline/cartographer';
import { narrator } from '@/lib/pipeline/narrator';
import { symbolist } from '@/lib/pipeline/symbolist';
import { watcher, type WatcherInput } from '@/lib/pipeline/watcher';
import type { OutputBundle } from '@/lib/types/output';

export function runPipeline(input: WatcherInput): OutputBundle {
  const normalizedInput = watcher(input);
  const clusterResult = cartographer(normalizedInput);
  const interpretation = symbolist(clusterResult);
  const returns = narrator(interpretation);

  return {
    input: normalizedInput,
    clusters: clusterResult.clusters,
    interpretation,
    returns,
  };
}
