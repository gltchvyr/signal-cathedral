import { useMemo, useState } from 'react';
import { appendArchiveEntry, outputToArchiveEntry } from '@/lib/pipeline/archivist';
import { runPipeline } from '@/lib/pipeline/runPipeline';
import type { SourceType } from '@/lib/types/input';
import type { OutputBundle } from '@/lib/types/output';

const DEFAULT_INPUT = `tensor lattice
css masking tutorial
William Gray ritual magic
shader texture noise
agent orchestration notes`;

const SOURCE_TYPES: Array<{ value: SourceType; label: string }> = [
  { value: 'tab_constellation', label: 'Tab constellation' },
  { value: 'notes', label: 'Notes' },
  { value: 'symbols', label: 'Symbols' },
  { value: 'moods', label: 'Moods' },
  { value: 'project_fragments', label: 'Project fragments' },
];

function formatList(values: string[]): string {
  return values.length > 0 ? values.join(', ') : '—';
}

export default function App() {
  const [rawInput, setRawInput] = useState(DEFAULT_INPUT);
  const [sourceType, setSourceType] = useState<SourceType>('tab_constellation');
  const [tagInput, setTagInput] = useState('liminal, recursive, ritual');
  const [contextNote, setContextNote] = useState('research spiral, playful but focused');
  const [result, setResult] = useState<OutputBundle | null>(null);
  const [archiveMessage, setArchiveMessage] = useState('');

  const parsedTags = useMemo(
    () => tagInput.split(',').map((tag) => tag.trim()).filter(Boolean),
    [tagInput],
  );

  function handleInterpret(): void {
    const next = runPipeline({
      rawInput,
      sourceType,
      userTags: parsedTags,
      contextNote: contextNote.trim() || undefined,
    });

    setResult(next);
    setArchiveMessage('');
  }

  function handleArchive(): void {
    if (!result) {
      return;
    }

    const entry = outputToArchiveEntry(result);
    const archive = appendArchiveEntry(entry);
    setArchiveMessage(
      `${result.interpretation.pathwayName} archived — ${archive.length} entr${
        archive.length === 1 ? 'y' : 'ies'
      } stored.`,
    );
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Signal Cathedral</p>
        <h1>Pathway Navigator</h1>
        <p className="lede">
          Feed the Cathedral a constellation of fragments and receive motifs, a named pathway, a reading, and a ritual return.
        </p>
      </header>

      <section className="grid">
        <article className="panel">
          <h2>Offering</h2>

          <label className="field">
            <span>Source type</span>
            <select value={sourceType} onChange={(event) => setSourceType(event.target.value as SourceType)}>
              {SOURCE_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Fragments</span>
            <textarea rows={10} value={rawInput} onChange={(event) => setRawInput(event.target.value)} />
          </label>

          <label className="field">
            <span>Tags</span>
            <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} />
          </label>

          <label className="field">
            <span>Context note</span>
            <input value={contextNote} onChange={(event) => setContextNote(event.target.value)} />
          </label>

          <div className="button-row">
            <button onClick={handleInterpret}>Interpret</button>
          </div>
        </article>

        <article className="panel">
          <h2>Interpretation</h2>
          {result ? (
            <div className="stack">
              <div>
                <p className="label">Summary</p>
                <p>{result.input.inputSummary}</p>
              </div>

              <div>
                <p className="label">Pathway</p>
                <p className="pathway">{result.interpretation.pathwayName}</p>
              </div>

              <div>
                <p className="label">Motifs</p>
                <p>{formatList(result.interpretation.motifs)}</p>
              </div>

              <div>
                <p className="label">Central tension</p>
                <p>{result.interpretation.centralTension}</p>
              </div>

              <div>
                <p className="label">Plain meaning</p>
                <p>{result.interpretation.plainMeaning}</p>
              </div>

              <div>
                <p className="label">Clusters</p>
                <ul className="cluster-list">
                  {result.clusters.map((cluster) => (
                    <li key={cluster.id}>
                      <strong>{cluster.name}</strong>
                      <div className="cluster-fragments">
                        {cluster.fragments.map((fragment) => fragment.text).join(' · ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Interpretation will appear here.</p>
          )}
        </article>

        <article className="panel">
          <h2>Return</h2>
          {result ? (
            <div className="stack">
              <div>
                <p className="label">Reading</p>
                <p>{result.returns.reading}</p>
              </div>

              <div>
                <p className="label">Ritual</p>
                <p>{result.returns.ritual}</p>
              </div>

              <div>
                <p className="label">Prompt</p>
                <p>{result.returns.prompt}</p>
              </div>

              <div>
                <p className="label">Lore fragment</p>
                <p>{result.returns.loreFragment}</p>
              </div>

              <div>
                <p className="label">Memory note</p>
                <p>{result.returns.memoryNote}</p>
              </div>

              <div className="button-row">
                <button onClick={handleArchive}>Archive this return</button>
              </div>

              {archiveMessage ? <p className="archive-message">{archiveMessage}</p> : null}
            </div>
          ) : (
            <p>Reading, ritual, and lore will appear here.</p>
          )}
        </article>
      </section>
    </main>
  );
}
