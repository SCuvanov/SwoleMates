const categories = [
  "harassment",
  "spam",
  "fake_profile",
  "hate_speech",
  "nudity",
  "other",
];

const queueRows = [
  { id: "report_1001", target: "u_aria", category: "spam", status: "open" },
  { id: "report_1002", target: "u_demo", category: "fake_profile", status: "reviewing" },
  { id: "report_1003", target: "u_alpha", category: "harassment", status: "actioned" },
];

export default function SafetyPage() {
  return (
    <main className="px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h1 className="text-2xl font-bold">Safety and Moderation</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Dedicated trust surface for report, block, unmatch policy and internal queue visibility.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <h2 className="font-semibold text-emerald-300">Report</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Users can report profiles and messages. Reports are queued as best-effort moderation.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <h2 className="font-semibold text-emerald-300">Block</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Blocked users are excluded from discovery and chat interactions.
            </p>
          </article>
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <h2 className="font-semibold text-emerald-300">Unmatch</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Unmatch removes the active match and closes the conversation thread.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-lg font-semibold text-emerald-300">Moderation Queue (Demo)</h2>
          <p className="mt-1 text-sm text-zinc-400">Categories: {categories.join(", ")}</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-zinc-400">
                <tr>
                  <th className="py-2 pr-3">Report ID</th>
                  <th className="py-2 pr-3">Target User</th>
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {queueRows.map((row) => (
                  <tr key={row.id} className="border-t border-zinc-800">
                    <td className="py-2 pr-3 text-zinc-300">{row.id}</td>
                    <td className="py-2 pr-3 text-zinc-300">{row.target}</td>
                    <td className="py-2 pr-3 text-zinc-300">{row.category}</td>
                    <td className="py-2 pr-3 text-amber-300">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
