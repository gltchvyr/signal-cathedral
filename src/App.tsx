export default function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Signal Cathedral</p>
        <h1>Pathway Navigator</h1>
        <p className="lede">
          Paste a constellation of fragments and receive a named pathway, motifs, a short reading, and a ritual return.
        </p>
      </header>

      <section className="grid">
        <article className="panel">
          <h2>Offering</h2>
          <p>Fragment input will live here.</p>
        </article>

        <article className="panel">
          <h2>Interpretation</h2>
          <p>Clusters, motifs, tensions, and pathway name will appear here.</p>
        </article>

        <article className="panel">
          <h2>Return</h2>
          <p>Reading, ritual, and prompt will appear here.</p>
        </article>
      </section>
    </main>
  );
}
