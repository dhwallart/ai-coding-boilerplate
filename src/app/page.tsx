const setupSteps = [
  "Open .docs/project/specialization.md",
  "Replace every <PLACEHOLDER> with real project context",
  "Create first feature spec in .features/",
  "Start implementation via CLAUDE.md agent routing",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-16 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Next.js + Tailwind Starter
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          AI Coding Boilerplate
        </h1>
        <p className="max-w-2xl text-zinc-600">
          Minimal base project with reusable agent roles and placeholder-driven
          specialization for new projects.
        </p>
      </header>

      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Kickoff checklist</h2>
        <ol className="space-y-2 text-zinc-700">
          {setupSteps.map((step, idx) => (
            <li key={step}>
              <span className="font-medium">{idx + 1}.</span> {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-2 text-sm text-zinc-600">
        <p>
          Entry docs: <code>CLAUDE.md</code>, <code>.docs/agent/index.md</code>,{" "}
          <code>.docs/ai/workflow.md</code>
        </p>
        <p>
          Agent profiles: <code>.claude/agents/</code>
        </p>
      </section>
    </main>
  );
}
