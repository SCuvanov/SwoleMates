import Image from "next/image";

const heroCards = [
  {
    name: "Aria",
    age: 27,
    city: "Brooklyn",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
    tags: ["Pilates", "Strength", "Smoothie Sundays"],
  },
  {
    name: "Nina",
    age: 31,
    city: "Brooklyn",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    tags: ["Run Club", "Powerlifting", "Brunch"],
  },
  {
    name: "Maya",
    age: 24,
    city: "Manhattan",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    tags: ["Yoga", "Leg Day", "Matcha"],
  },
];

export default function Home() {
  return (
    <main className="pb-28 sm:pb-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-rose-950/60 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
          <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="relative grid min-h-[74vh] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full bg-rose-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
                Fitness Dating, Reimagined
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-6xl">
                Find your person between sets and sunrise runs.
              </h1>
              <p className="mt-5 max-w-2xl text-base text-zinc-300 sm:text-lg">
                SwoleMates combines the swipe speed people love with profile details that actually matter:
                training style, routine consistency, and lifestyle fit.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/discover"
                  className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-7 py-3 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-orange-300"
                >
                  Create Account
                </a>
                <a
                  href="/discover"
                  className="cursor-pointer rounded-full bg-zinc-800/70 px-7 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/80"
                >
                  Try Discover
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-4 text-sm text-zinc-300">
                <p>10M+ matches made</p>
                <p>190 countries</p>
                <p>24/7 moderation</p>
              </div>
            </div>
            <div className="group relative mx-auto grid w-full max-w-md gap-3 sm:max-w-lg">
              <article className="float-slow absolute -left-12 top-6 hidden w-48 rotate-[-12deg] overflow-hidden rounded-2xl bg-zinc-950/80 shadow-2xl ring-1 ring-zinc-700/70 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-rotate-[14deg] motion-reduce:transform-none motion-reduce:transition-none md:block">
                <Image
                  src={heroCards[1].image}
                  alt={`${heroCards[1].name} profile`}
                  width={400}
                  height={460}
                  className="h-56 w-full object-cover"
                />
              </article>
              <article className="float-slow-delayed absolute -right-12 top-10 hidden w-48 rotate-[12deg] overflow-hidden rounded-2xl bg-zinc-950/80 shadow-2xl ring-1 ring-zinc-700/70 transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-[14deg] motion-reduce:transform-none motion-reduce:transition-none md:block">
                <Image
                  src={heroCards[2].image}
                  alt={`${heroCards[2].name} profile`}
                  width={400}
                  height={460}
                  className="h-56 w-full object-cover"
                />
              </article>
              <article className="relative overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl ring-1 ring-zinc-700/80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none">
                <Image
                  src={heroCards[0].image}
                  alt={`${heroCards[0].name} profile`}
                  width={900}
                  height={1000}
                  className="h-[27rem] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
                  <span className="rounded-md border-2 border-emerald-300 bg-emerald-500/20 px-3 py-1 text-xs font-extrabold tracking-[0.25em] text-emerald-200 opacity-0 transition duration-300 group-hover:-rotate-6 group-hover:opacity-100 motion-reduce:transition-none">
                    LIKE
                  </span>
                  <span className="rounded-md border-2 border-rose-300 bg-rose-500/20 px-3 py-1 text-xs font-extrabold tracking-[0.25em] text-rose-200 opacity-0 transition duration-300 group-hover:rotate-6 group-hover:opacity-100 motion-reduce:transition-none">
                    NOPE
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-3 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-5">
                  <h2 className="text-2xl font-semibold text-zinc-50">
                    {heroCards[0].name}, {heroCards[0].age}
                  </h2>
                  <p className="text-sm text-zinc-200">{heroCards[0].city}</p>
                  <div className="flex flex-wrap gap-2">
                    {heroCards[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-900/80 px-3 py-1 text-xs text-zinc-100 ring-1 ring-zinc-500/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl space-y-14 px-4 pt-12 sm:px-8">
        <section className="grid gap-10 border-t border-zinc-800/80 pt-10 md:grid-cols-3">
          <article>
            <h2 className="text-lg font-semibold text-zinc-100">It Starts With a Swipe</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Move quickly through curated profiles and match with people who share your pace and priorities.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold text-zinc-100">Built for Active People</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Add training style, favorite activities, and schedule preferences so every match starts with context.
            </p>
          </article>
          <article>
            <h2 className="text-lg font-semibold text-zinc-100">Safety by Design</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Verification hints, reporting tools, and in-app blocks are available from every core flow.
            </p>
          </article>
        </section>

        <section className="grid gap-8 border-t border-zinc-800/80 pt-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">How it works</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-zinc-50">
              Designed to feel familiar, made for fitness compatibility.
            </h3>
            <ul className="mt-6 space-y-4 text-zinc-300">
              <li className="border-l border-zinc-700 pl-4">
                <p className="font-semibold text-zinc-100">1. Build your identity</p>
                <p className="mt-1 text-sm">Show training habits, goals, and your weekly rhythm.</p>
              </li>
              <li className="border-l border-zinc-700 pl-4">
                <p className="font-semibold text-zinc-100">2. Swipe with intent</p>
                <p className="mt-1 text-sm">See photo-first cards with fitness details where they matter.</p>
              </li>
              <li className="border-l border-zinc-700 pl-4">
                <p className="font-semibold text-zinc-100">3. Match and meet</p>
                <p className="mt-1 text-sm">Use workout-inspired prompts to kick off better conversations.</p>
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroCards.map((profile) => (
              <article
                key={profile.name}
                className="overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-zinc-800/80"
              >
                <Image
                  src={profile.image}
                  alt={`${profile.name} on SwoleMates`}
                  width={600}
                  height={800}
                  className="h-52 w-full object-cover"
                />
                <div className="p-4">
                  <p className="font-semibold text-zinc-100">
                    {profile.name}, {profile.age}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">{profile.city}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-rose-950/40 via-zinc-900 to-orange-950/40 p-8 text-center ring-1 ring-zinc-800/80 sm:p-12">
          <h3 className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Swipe less. Match better.
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
            Join SwoleMates and start meeting people who align with your training lifestyle from day one.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/discover"
              className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-7 py-3 text-sm font-semibold text-white transition hover:from-rose-400 hover:to-orange-300"
            >
              Start Swiping
            </a>
            <a
              href="/safety"
              className="cursor-pointer rounded-full bg-zinc-800/70 px-7 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/80"
            >
              Read Safety Center
            </a>
          </div>
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2">
          <a
            href="/discover"
            className="cursor-pointer flex-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-4 py-3 text-center text-sm font-semibold text-white transition hover:from-rose-400 hover:to-orange-300"
          >
            Start Swiping
          </a>
          <a
            href="/settings"
            className="cursor-pointer rounded-full border border-zinc-600 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Log in
          </a>
        </div>
      </div>
    </main>
  );
}
